// Wait for the DOM to be fully loaded
// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
    
    // Coffee beans animation
    createCoffeeBeans();



    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Menu tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabBtns.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding section
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Coffee customizer functionality
    const optionBtns = document.querySelectorAll('.option-btn');
    const customDrinkText = document.getElementById('custom-drink');
    const coffeeVisual = document.getElementById('coffee-visual');
    const priceElement = document.querySelector('.customizer-result .price');
    
    // Prices for different options
    const prices = {
        base: {
            espresso: 3.50,
            americano: 4.00,
            coldbrew: 4.50,
            drip: 3.00
        },
        milk: {
            whole: 0.50,
            skim: 0.50,
            oat: 0.75,
            almond: 0.75,
            soy: 0.75,
            none: 0
        },
        sweetener: {
            none: 0,
            sugar: 0.25,
            honey: 0.50,
            vanilla: 0.50,
            caramel: 0.75
        },
        extras: {
            none: 0,
            whipped: 1.00,
            cinnamon: 0.25,
            chocolate: 0.75,
            ice: 0.50
        }
    };
    
    // Current selections
    let currentSelections = {
        base: 'espresso',
        milk: 'whole',
        sweetener: 'none',
        extras: 'none'
    };
    
    // Update price based on selections
    function updatePrice() {
        const basePrice = prices.base[currentSelections.base];
        const milkPrice = prices.milk[currentSelections.milk];
        const sweetenerPrice = prices.sweetener[currentSelections.sweetener];
        const extrasPrice = prices.extras[currentSelections.extras];
        
        const totalPrice = basePrice + milkPrice + sweetenerPrice + extrasPrice;
        priceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
    
    // Update drink description
    function updateDrinkDescription() {
        let description = '';
        
        // Base coffee
        switch(currentSelections.base) {
            case 'espresso':
                description = 'Espresso';
                break;
            case 'americano':
                description = 'Americano';
                break;
            case 'coldbrew':
                description = 'Cold Brew';
                break;
            case 'drip':
                description = 'Drip Coffee';
                break;
        }
        
        // Milk
        if (currentSelections.milk !== 'none') {
            description += ` with ${currentSelections.milk.charAt(0).toUpperCase() + currentSelections.milk.slice(1)} Milk`;
        }
        
        // Sweetener
        if (currentSelections.sweetener !== 'none') {
            description += ` and ${currentSelections.sweetener.charAt(0).toUpperCase() + currentSelections.sweetener.slice(1)}`;
        }
        
        // Extras
        if (currentSelections.extras !== 'none') {
            if (currentSelections.extras === 'ice') {
                description += ', Iced';
            } else {
                description += `, with ${currentSelections.extras.charAt(0).toUpperCase() + currentSelections.extras.slice(1)}`;
            }
        }
        
        customDrinkText.textContent = description;
    }
    
    // Update visual representation
    function updateCoffeeVisual() {
        // Clear all classes
        const cupBase = coffeeVisual.querySelector('.cup-base');
        const milk = coffeeVisual.querySelector('.milk');
        const topping = coffeeVisual.querySelector('.topping');
        
        // Remove all classes
        cupBase.className = 'cup-base';
        milk.className = 'milk';
        topping.className = 'topping';
        
        // Add current selection classes
        cupBase.classList.add(currentSelections.base);
        milk.classList.add(currentSelections.milk);
        topping.classList.add(currentSelections.extras);
        
        // Special case for iced - need to add ice cubes visual
        if (currentSelections.extras === 'ice') {
            topping.innerHTML = '<div class="ice-cubes"></div>';
        }
    }
    
    // Handle option button clicks
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const optionType = this.parentElement.parentElement.getAttribute('data-option-type') || 
                              this.closest('.option-group').querySelector('h4').textContent.toLowerCase();
            const optionValue = this.getAttribute('data-option');
            
            // Remove active class from all buttons in this group
            const optionGroup = this.closest('.options');
            optionGroup.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current selections
            if (optionType.includes('base')) {
                currentSelections.base = optionValue;
            } else if (optionType.includes('milk')) {
                currentSelections.milk = optionValue;
            } else if (optionType.includes('sweetener')) {
                currentSelections.sweetener = optionValue;
            } else if (optionType.includes('extras')) {
                currentSelections.extras = optionValue;
            }
            
            // Update UI
            updateDrinkDescription();
            updatePrice();
            updateCoffeeVisual();
        });
    });
    
    // Initialize customizer
    updateDrinkDescription();
    updatePrice();
    updateCoffeeVisual();
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 50);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // In a real application, you would send this to a newsletter service
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add floating coffee beans dynamically
    function createFloatingBeans() {
        const floatingBeans = document.querySelector('.floating-beans');
        const beanCount = 10;
        
        for (let i = 0; i < beanCount; i++) {
            const bean = document.createElement('div');
            bean.className = 'floating-bean';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const color = `hsl(${Math.random() * 30 + 20}, 50%, 50%)`;
            
            // Apply styles
            bean.style.width = `${size}px`;
            bean.style.height = `${size}px`;
            bean.style.left = `${posX}%`;
            bean.style.top = `${posY}%`;
            bean.style.animationDelay = `${delay}s`;
            bean.style.animationDuration = `${duration}s`;
            bean.style.backgroundColor = color;
            
            floatingBeans.appendChild(bean);
        }
    }
    
    createFloatingBeans();
});