$(document).ready(function () {
    // ========== Theme Toggle ==========
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // ========== Custom Cursor ==========
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        if(cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            // Add a slight delay to the outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });


    // ========== Sticky Navbar ==========
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // ========== Scroll Up ==========
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

    // ========== Mobile Menu Toggle ==========
    $('#menuToggle').click(function () {
        $('#navMenu').toggleClass("active");
        $(this).find('i').toggleClass("active");
    });

    $('.navbar .menu li a').click(function () {
        $('#navMenu').removeClass("active");
        $('#menuToggle i').removeClass("active");
    });

    // ========== Typed.js ==========
    new Typed(".typing", {
        strings: ["Designer", "Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    new Typed(".typing-2", {
        strings: ["Designer", "Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // ========== Scroll Reveal Animations ==========
    function revealOnScroll() {
        const reveals = document.querySelectorAll('section, .reveal, .reveal-left, .reveal-right');
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ========== Parallax Effect ==========
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const speed = parseFloat(bg.dataset.speed) || 0.2;
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const offset = (scrolled - sectionTop) * speed;
            bg.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener('scroll', parallaxScroll);

    // ========== Timeline Fill on Scroll ==========
    function updateTimelineFill() {
        const timeline = document.querySelector('.timeline');
        const fill = document.getElementById('timeline-fill');
        if (!timeline || !fill) return;

        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;

        // How much of the timeline is above the bottom of the viewport
        const scrolledInto = windowHeight - timelineTop;
        const fillPercent = Math.max(0, Math.min(1, scrolledInto / (timelineHeight + windowHeight * 0.3)));
        fill.style.height = (fillPercent * timelineHeight) + 'px';
    }

    window.addEventListener('scroll', updateTimelineFill);
    updateTimelineFill();

    // ========== Particle Background ==========
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', function (e) {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.35 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        this.x -= dx * 0.008;
                        this.y -= dy * 0.008;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        const opacity = (1 - dist / 140) * 0.12;
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ========== 3D Tilt on Cards ==========
    function applyTilt(selector) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 18;
                const rotateY = (centerX - x) / 18;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    applyTilt('.services .card');
    applyTilt('.skill-category-card');
    applyTilt('.timeline-card');
    applyTilt('.portfolio-item');

    // ========== Interactive Cube Mouse Tilt ==========
    const cubeWrapper = document.querySelector('.hero-3d-wrapper');
    const cube = document.getElementById('hero-cube');
    
    if (cubeWrapper && cube) {
        let isCubeHovered = false;
        
        cubeWrapper.addEventListener('mouseenter', function() {
            isCubeHovered = true;
            cube.style.animationPlayState = 'paused';
        });
        
        cubeWrapper.addEventListener('mousemove', function(e) {
            if (!isCubeHovered) return;
            const rect = cubeWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotX = -(y - centerY) / 4;
            const rotY = (x - centerX) / 4;
            cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });
        
        cubeWrapper.addEventListener('mouseleave', function() {
            isCubeHovered = false;
            cube.style.transform = '';
            cube.style.animationPlayState = 'running';
        });
    }

    // ========== Skill Tags Stagger Animation ==========
    const skillCards = document.querySelectorAll('.skill-category-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, i * 100 + 200);
                });
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => {
        card.querySelectorAll('.skill-tag').forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'all 0.4s ease';
        });
        skillObserver.observe(card);
    });

    // ========== Counter Animation for Timeline Dots ==========
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'dotPulse 0.6s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    timelineDots.forEach(dot => dotObserver.observe(dot));

    // Add CSS for dot pulse
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes dotPulse {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(pulseStyle);

});