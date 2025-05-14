// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization - check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Add class to body for CSS optimizations
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Utility functions for performance optimization
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };
    
    // Get Started / Consultation buttons
    const consultationButtons = document.querySelectorAll('.consultation-btn');
    
    if (consultationButtons.length > 0) {
        consultationButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Scroll to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Show a custom message indicating this is for a free consultation
                const contactIntro = document.querySelector('.contact-intro h3 span');
                if (contactIntro) {
                    // Store original text to restore it later
                    const originalText = contactIntro.textContent;
                    const currentLang = i18n.currentLanguage;
                    
                    // Change the text based on language
                    let consultationText;
                    if (currentLang === 'fr') {
                        consultationText = 'Consultation Gratuite';
                    } else if (currentLang === 'ar') {
                        consultationText = 'استشارة مجانية';
                    } else {
                        consultationText = 'Free Consultation';
                    }
                    
                    contactIntro.textContent = consultationText;
                    
                    // Highlight effect
                    contactIntro.classList.add('highlight-pulse');
                    
                    // Reset after a few seconds
                    setTimeout(() => {
                        if (i18n && i18n.translations && i18n.translations[i18n.currentLanguage]) {
                            contactIntro.textContent = i18n.translations[i18n.currentLanguage]['contact_intro'] || originalText;
                        } else {
                            contactIntro.textContent = originalText;
                        }
                        contactIntro.classList.remove('highlight-pulse');
                    }, 3000);
                }
            });
        });
    }
    
    // Split text animation for headings - only run if not reduced motion
    if (!prefersReducedMotion) {
        const splitHeadings = document.querySelectorAll('.split-heading');
        
        // Use DocumentFragment for better performance
        splitHeadings.forEach(heading => {
            const text = heading.textContent;
            
            // Skip for elements that already have HTML inside
            if (heading.innerHTML !== heading.textContent) return;
            
            const fragment = document.createDocumentFragment();
            
            // Create spans for each letter
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    const space = document.createTextNode(' ');
                    fragment.appendChild(space);
                } else {
                    const span = document.createElement('span');
                    span.style.animationDelay = `${i * 0.05}s`;
                    span.textContent = text[i];
                    fragment.appendChild(span);
                }
            }
            
            heading.innerHTML = '';
            heading.appendChild(fragment);
            heading.classList.add('split-text');
        });
    }
    
    // Add service tags
    const serviceTags = document.querySelectorAll('.service-tag');
    if (serviceTags.length > 0) {
        // Create a stylesheet instead of inline styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .service-tag {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 3px 8px;
                font-size: 0.7rem;
                font-weight: bold;
                text-transform: uppercase;
                background-color: var(--primary-color);
                color: white;
                border-radius: 4px;
                opacity: 0.8;
            }
            
            /* Style for the highlight pulse effect */
            .highlight-pulse {
                animation: pulse 1.5s 1;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); color: var(--primary-color); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Navigation menu toggle for mobile - using event delegation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (navToggle) {
        // Toggle menu when burger icon is clicked
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            // Toggle icon between burger and close
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.matches('a')) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links - with improved performance
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            e.preventDefault();
            
            const targetId = target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Use native scrollIntoView with smooth behavior
                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Header scroll effect - throttle scroll events
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    const handleScroll = throttle(() => {
        const currentScrollPosition = window.pageYOffset;
        
        // Add class when scrolling down
        if (currentScrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollPosition > 200) {
            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollPosition = currentScrollPosition;
    }, 100); // Throttle to 100ms
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animated background shapes - only initialize if they're visible
    if (!prefersReducedMotion) {
        const animatedBgs = document.querySelectorAll('.animated-bg');
        
        animatedBgs.forEach(bg => {
            const shapes = bg.querySelectorAll('.shape');
            
            // Randomize initial positions - use less expensive operations
            shapes.forEach(shape => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                shape.style.setProperty('--random-x', `${randomX}%`);
                shape.style.setProperty('--random-y', `${randomY}%`);
            });
        });
    }
    
    // Reveal elements on scroll using Intersection Observer for better performance
    const revealElements = document.querySelectorAll('.service-card, .step, .feature, .about-content > *, .hero-content > *');
    
    // Add CSS class for animation
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });
    
    // Use Intersection Observer API instead of scroll event
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations in groups of 3
                const delay = 100 * (index % 3);
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, delay);
                
                // Stop observing after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    // Observe each element
    if (!prefersReducedMotion) {
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // If reduced motion is preferred, just show everything
        revealElements.forEach(element => {
            element.classList.add('reveal');
        });
    }
    
    // Parallax effect using Intersection Observer and requestAnimationFrame
    const parallaxSections = document.querySelectorAll('.hero, .about, .services, .why-us, .contact');
    
    if (!prefersReducedMotion) {
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('parallax-active');
                } else {
                    entry.target.classList.remove('parallax-active');
                }
            });
        }, { threshold: 0.1 });
        
        parallaxSections.forEach(section => {
            parallaxObserver.observe(section);
        });
        
        // Throttled scroll handler for parallax
        window.addEventListener('scroll', throttle(() => {
            const scrollPosition = window.pageYOffset;
            
            document.querySelectorAll('.parallax-active').forEach(section => {
                const shapes = section.querySelectorAll('.shape');
                const sectionTop = section.offsetTop;
                const distance = scrollPosition - sectionTop;
                
                shapes.forEach((shape, index) => {
                    const speed = 0.2 + (index * 0.1);
                    shape.style.transform = `translate3d(0, ${distance * speed}px, 0)`;
                });
            });
        }, 20), { passive: true });
    }
    
    // 3D tilt effect for service cards - throttled and optimized
    if (!prefersReducedMotion) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Store card dimensions to avoid reflow
            let rect;
            
            card.addEventListener('mouseenter', () => {
                rect = card.getBoundingClientRect();
                card.classList.add('tilt-active');
            });
            
            card.addEventListener('mousemove', throttle((e) => {
                if (!card.classList.contains('tilt-active')) return;
                
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position
                const rotateX = (mouseY / (rect.height / 2)) * -5;
                const rotateY = (mouseX / (rect.width / 2)) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            }, 10));
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('tilt-active');
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // Form validation and submission - no changes needed as it's not performance critical
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation
        const validateForm = (form) => {
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            let isValid = true;
            
            // Reset previous error states
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim() || message.value.length < 10) {
                message.parentElement.classList.add('error');
                isValid = false;
            }
            
            return isValid;
        };
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                // Show error message
                const formGroups = this.querySelectorAll('.form-group.error');
                if (formGroups.length > 0) {
                    formGroups[0].querySelector('input, textarea').focus();
                }
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual API call in production)
            setTimeout(() => {
                // Show success message
                this.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for contacting us!</h3>
                        <p>We've received your message and will get back to you shortly.</p>
                        <button type="button" class="btn-primary reset-form" style="margin-top: 1.5rem;">Send Another Message</button>
                    </div>
                `;
                
                // Add event listener to reset form button
                const resetBtn = this.querySelector('.reset-form');
                if (resetBtn) {
                    resetBtn.addEventListener('click', () => {
                        contactForm.innerHTML = `
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input type="text" id="name" name="name" placeholder="Your name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="your@email.com" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number (optional)</label>
                                <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567">
                            </div>
                            <div class="form-group">
                                <label for="message">Your Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." required></textarea>
                            </div>
                            <button type="submit" class="btn-primary">Send Message</button>
                        `;
                    });
                }
                
                // In a real application, you would send the form data to a server
                console.log('Form submitted with data:', formEntries);
            }, 1500);
        });
    }
    
    // Add CSS for animations - consolidate in a single style block
    const style = document.createElement('style');
    style.textContent = `
        /* Header scroll effect */
        header.scrolled {
            padding: 0.7rem 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.98);
        }
        
        header.header-hidden {
            transform: translateY(-100%);
        }
        
        /* Optimized cursor styles */
        .cursor-hover {
            width: 25px !important;
            height: 25px !important;
            opacity: 0.9 !important;
        }
        
        .follower-hover {
            width: 40px !important;
            height: 40px !important;
            opacity: 0.7 !important;
            background-color: rgba(139, 90, 43, 0.1) !important;
        }
        
        .cursor-click {
            transform: translate3d(0, 0, 0) translate(-50%, -50%) scale(0.7) !important;
        }
        
        .follower-click {
            transform: translate3d(0, 0, 0) translate(-50%, -50%) scale(0.7) !important;
        }
        
        /* Shape positioning using CSS vars */
        .shape {
            left: var(--random-x, 0);
            top: var(--random-y, 0);
        }
        
        /* Form validation */
        .form-group.error input,
        .form-group.error textarea {
            border-color: #e74c3c;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
        
        .form-group.error::after {
            content: '⚠️ This field is required';
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            display: block;
        }
        
        .form-group.error:has(#email.invalid)::after {
            content: '⚠️ Please enter a valid email address';
        }
        
        .form-group.error:has(#message.invalid)::after {
            content: '⚠️ Message must be at least 10 characters';
        }
        
        /* Button loading state */
        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Hero section animations - optimized with RAF
    const heroSection = document.querySelector('.hero');
    const cube = document.querySelector('.cube');
    const floatingElements = document.querySelectorAll('.float-item');
    
    if (!prefersReducedMotion && heroSection && (cube || floatingElements.length > 0)) {
        let x = 0, y = 0;
        let targetX = 0, targetY = 0;
        
        // Parallax effect for floating elements - optimized
        heroSection.addEventListener('mousemove', throttle((e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = heroSection.getBoundingClientRect();
            
            targetX = (clientX - left) / width - 0.5;
            targetY = (clientY - top) / height - 0.5;
        }, 50));
        
        function updateHeroParallax() {
            // Smooth easing
            x += (targetX - x) * 0.1;
            y += (targetY - y) * 0.1;
            
            // Only update DOM if there's significant movement
            if (Math.abs(x) > 0.001 || Math.abs(y) > 0.001) {
                floatingElements.forEach(element => {
                    const speed = element.getAttribute('data-speed');
                    const moveX = x * 100 * speed;
                    const moveY = y * 100 * speed;
                    element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                });
                
                // Subtle cube rotation on mouse move
                if (cube) {
                    cube.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
                }
            }
            
            requestAnimationFrame(updateHeroParallax);
        }
        
        requestAnimationFrame(updateHeroParallax);
        
        // Reset transforms when mouse leaves hero section
        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });
    }
    
    // Stats counter animation with Intersection Observer
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const statsGrid = document.querySelector('.stats-grid');
        
        const animateStats = () => {
            stats.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-value') || stat.textContent);
                const hasPlusSign = stat.textContent.includes('+');
                let currentValue = 0;
                
                // Store original text to preserve plus sign
                stat.setAttribute('data-value', targetValue);
                
                // Use less DOM updates
                const duration = 2000;
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = targetValue / totalFrames;
                
                let frame = 0;
                
                const counter = () => {
                    frame++;
                    currentValue = Math.min(Math.ceil(increment * frame), targetValue);
                    stat.textContent = currentValue + (hasPlusSign ? '+' : '');
                    
                    if (frame < totalFrames) {
                        requestAnimationFrame(counter);
                    }
                };
                
                requestAnimationFrame(counter);
            });
        };
        
        // Use Intersection Observer for better performance
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !prefersReducedMotion) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (statsGrid) {
            statsObserver.observe(statsGrid);
        }
    }

    // View More Projects functionality
    const viewMoreBtn = document.getElementById('view-more-projects');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const hiddenProjects = document.querySelectorAll('.hidden-project');
            
            hiddenProjects.forEach(project => {
                project.classList.remove('hidden-project');
                project.classList.add('project-card-reveal');
            });
            
            // Hide the view more button
            viewMoreBtn.style.display = 'none';
            
            // Show the view less button
            const viewLessContainer = document.querySelector('.view-less-container');
            if (viewLessContainer) {
                viewLessContainer.style.display = 'block';
            }
        });
    }
    
    // View Less Projects functionality
    const viewLessBtn = document.getElementById('view-less-projects');
    if (viewLessBtn) {
        viewLessBtn.addEventListener('click', function() {
            const additionalProjects = document.querySelectorAll('.project-card-reveal');
            
            additionalProjects.forEach(project => {
                project.classList.add('hidden-project');
                project.classList.remove('project-card-reveal');
            });
            
            // Show the view more button
            if (viewMoreBtn) {
                viewMoreBtn.style.display = 'block';
            }
            
            // Hide the view less button
            const viewLessContainer = document.querySelector('.view-less-container');
            if (viewLessContainer) {
                viewLessContainer.style.display = 'none';
            }
            
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}); 