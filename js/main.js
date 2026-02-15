// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    navMenu.classList.remove('active');
                    
                    // Get header height for offset
                    const headerHeight = document.querySelector('#header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // ============================================
    // Sticky Header on Scroll
    // ============================================
    
    const header = document.querySelector('#header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // Fade-in Animation on Scroll
    // ============================================
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Olá! Meu nome é ${name}.\n\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = '5511999999999'; // Placeholder number
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Show success message
            alert('Obrigado pelo contato! Você será redirecionado para o WhatsApp.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ============================================
    // Smooth Page Load Animation
    // ============================================
    
    document.body.style.opacity = '0';
    
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // ============================================
    // Add CSS for active nav link
    // ============================================
    
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// Scroll to Top on Page Load
// ============================================

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});
