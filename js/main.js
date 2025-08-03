// ATARAH Luxury Fashion Store - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link for same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Navigation Link Based on Scroll Position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Throttled scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveNavLink();
                handleNavbarBackground();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Navbar background change on scroll
    function handleNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject');
            const message = formData.get('message').trim();

            // Validation
            const errors = [];

            if (name.length < 2) {
                errors.push('Please enter a valid name (at least 2 characters)');
            }

            if (!isValidEmail(email)) {
                errors.push('Please enter a valid email address');
            }

            if (!subject) {
                errors.push('Please select a subject');
            }

            if (message.length < 10) {
                errors.push('Please enter a message with at least 10 characters');
            }

            // Show results
            if (errors.length > 0) {
                showFormMessage(errors.join('<br>'), 'error');
            } else {
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // Add success animation
                contactForm.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    contactForm.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show form message with enhanced styling
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;

        // Styling
        Object.assign(messageDiv.style, {
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginTop: '1.5rem',
            fontWeight: '500',
            textAlign: 'center',
            opacity: '0',
            transform: 'translateY(-10px)',
            transition: 'all 0.3s ease'
        });

        if (type === 'success') {
            Object.assign(messageDiv.style, {
                backgroundColor: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb'
            });
        } else {
            Object.assign(messageDiv.style, {
                backgroundColor: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
            });
        }

        // Insert after form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);

        // Animate in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 6 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 6000);
    }

    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-outline')) {
                this.style.transform = 'translateY(0)';
            }
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Product Card Interactions (for collections page)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const button = card.querySelector('.btn');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productTitle = card.querySelector('h3').textContent;
                const productCategory = card.querySelector('.product-category').textContent;
                
                showProductModal(productTitle, productCategory);
            });
        }
    });

    // Product Modal for demo
    function showProductModal(title, category) {
        // Create modal backdrop
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <div class="image-placeholder">Product Image</div>
                    </div>
                    <div class="modal-info">
                        <span class="modal-category">${category}</span>
                        <p class="modal-description">This is a demo website showcasing ATARAH's luxury fashion collection. In the full version, this would display detailed product information, sizing options, materials, care instructions, and purchase functionality.</p>
                        <div class="modal-features">
                            <h4>Features:</h4>
                            <ul>
                                <li>Premium materials and construction</li>
                                <li>Expert tailoring and fit</li>
                                <li>Exclusive design elements</li>
                                <li>Professional styling consultation included</li>
                            </ul>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary">Contact for Details</button>
                            <button class="btn btn-outline">Schedule Consultation</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Modal styles
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '2000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        const backdrop = modal.querySelector('.modal-backdrop');
        Object.assign(backdrop.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)'
        });

        const content = modal.querySelector('.modal-content');
        Object.assign(content.style, {
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            transform: 'scale(0.9)',
            transition: 'transform 0.3s ease'
        });

        const header = modal.querySelector('.modal-header');
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 2rem 1rem',
            borderBottom: '1px solid #E5E5E5'
        });

        const closeBtn = modal.querySelector('.modal-close');
        Object.assign(closeBtn.style, {
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#666',
            padding: '0',
            lineHeight: '1'
        });

        const body = modal.querySelector('.modal-body');
        Object.assign(body.style, {
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start'
        });

        const modalImage = modal.querySelector('.modal-image .image-placeholder');
        Object.assign(modalImage.style, {
            height: '300px',
            backgroundColor: '#F5F5F5',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '1.1rem'
        });

        const category = modal.querySelector('.modal-category');
        Object.assign(category.style, {
            color: '#D4AF37',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '1rem',
            display: 'block'
        });

        const actions = modal.querySelector('.modal-actions');
        Object.assign(actions.style, {
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
        });

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);

        // Close functionality
        function closeModal() {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 300);
        }

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        // Demo button functionality
        modal.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function() {
                closeModal();
                setTimeout(() => {
                    showFormMessage('Thank you for your interest! Please use the contact form to get in touch with our team.', 'success');
                    
                    // Scroll to contact section if on homepage
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 400);
            });
        });

        // Mobile responsive modal
        if (window.innerWidth <= 768) {
            body.style.gridTemplateColumns = '1fr';
            content.style.margin = '1rem';
            content.style.width = 'calc(100% - 2rem)';
        }
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.collection-item, .service-item, .testimonial, .product-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced form focus effects
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }

    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });

    // Initialize everything
    console.log('ATARAH website initialized successfully');
    
    // Add some interactive polish
    addHoverEffects();
    addKeyboardNavigation();
});

// Additional interactive effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.collection-item, .service-item, .testimonial');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Keyboard navigation enhancement
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('.product-modal');
            if (modal) {
                modal.querySelector('.modal-close').click();
            }
        }
        
        // Navigate sections with arrow keys (when not in form inputs)
        if (!e.target.matches('input, textarea, select')) {
            const sections = document.querySelectorAll('section[id]');
            const currentSection = Array.from(sections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = Array.from(sections).indexOf(currentSection);
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
}