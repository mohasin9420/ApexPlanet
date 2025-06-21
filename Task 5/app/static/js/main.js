// Use strict mode for better performance and error catching
'use strict';

// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.setAttribute('data-count', count);
            // Add animation when count changes
            cartBadge.style.animation = 'none';
            setTimeout(() => {
                cartBadge.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
        console.log('Cart count updated to:', count);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            ${message}
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Initialize cart
const cart = new Cart();

// Add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add to cart buttons with enhanced animations
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Add loading state
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="bi bi-arrow-repeat"></i> Adding...';
            button.disabled = true;
            button.classList.add('loading');

            const productId = parseInt(button.dataset.productId);
            console.log('Adding product to cart:', productId);

            fetch(`/api/products/${productId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Product not found');
                    }
                    return response.json();
                })
                .then(product => {
                    console.log('Product fetched:', product);
                    cart.addItem(product);

                    // Success animation
                    button.innerHTML = '<i class="bi bi-check"></i> Added!';
                    button.classList.remove('loading');
                    button.classList.add('added');

                    // Reset button after delay
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        button.classList.remove('added');
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('loading');
                    cart.showNotification('Error adding product to cart');
                });
        });
    });

    // Update quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = input.dataset.productId;
            cart.updateQuantity(productId, e.target.value);
            updateCartTotal();
        });
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update cart total
function updateCartTotal() {
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = `$${cart.getTotal().toFixed(2)}`;
    }
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize events with debounce
const handleResize = debounce(() => {
    // Add responsive adjustments here if needed
}, 250);
