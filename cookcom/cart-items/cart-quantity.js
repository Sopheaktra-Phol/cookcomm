// cart-quantity.js

// Initialize the cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let quantity = cartItems.length; // Set quantity based on the number of items in the cart

// Function to update the quantity display
function updateQuantityDisplay() {
    const quantityDisplay = document.querySelector('.cart-number'); // Select the existing cart number element
    if (quantityDisplay) {
        quantityDisplay.textContent = quantity; // Update the displayed quantity
    }
}

// Function to handle adding to cart
function addToCart(mealId) {
    quantity++; // Increase the quantity
    cartItems.push(mealId); // Add the meal ID to the cart items
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store cart items in local storage
    updateQuantityDisplay(); // Update the display
}

// Event listener for the "Add to Cart" button
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const mealId = this.getAttribute('data-meal-id'); // Get the meal ID from the button
        addToCart(mealId);
    });
});

// Initialize the display on page load
document.addEventListener('DOMContentLoaded', updateQuantityDisplay);