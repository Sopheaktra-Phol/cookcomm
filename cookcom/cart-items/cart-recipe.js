// cart-recipe.js

// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const container = document.getElementById('cart-items-container');

    if (cartItems.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Clear the container before displaying items
    container.innerHTML = '';

    // Fetch meal details for each item in the cart
    cartItems.forEach(mealId => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                const mealCard = `
                    <div class="col-lg-4 col-sm-6 dish-box">
                        <div class="dish">
                            <div class="dish-img">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            </div>
                            <div class="dish-rating">
                                <div class="dish-title">
                                    <h3 class="h3-title">${meal.strMeal}</h3>
                                </div>
                            </div>
                            <div class="dish-bottom-row">
                                <ul>
                                    <li>
                                        <button class="remove-from-cart" onclick="removeFromCart(${meal.idMeal})">
                                            Remove from Cart
                                        </button>
                                    </li>
                                    <li>
                                        <button class="see-recipe" onclick="getMealRecipe(${meal.idMeal})">
                                            See Recipe
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += mealCard; // Append the meal card to the container
            })
            .catch(error => {
                console.error('Error fetching meal details:', error);
            });
    });
}

// Function to get and display the meal recipe
function getMealRecipe(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const meal = data.meals[0];
            if (!meal) {
                console.error('No meal found');
                return;
            }
            // Display the recipe details in a modal
            const recipeDetails = `
                <div class="recipe-modal showRecipe"> <!-- Ensure the modal is shown -->
                    <button type="button" class="btn recipe-close-btn" onclick="closeRecipe()">
                        <i class="uil uil-times"></i>
                    </button>
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Video</a>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', recipeDetails); // Append the recipe details to the body
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
}

// Function to close the recipe modal
function closeRecipe() {
    const modal = document.querySelector('.recipe-modal');
    if (modal) {
        modal.remove(); // Remove the modal from the DOM
    }
}

// Function to remove an item from the cart
function removeFromCart(mealId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(id => id !== mealId); // Remove the item
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    displayCartItems(); // Refresh the cart display
}

// Call the function to display cart items on page load
document.addEventListener('DOMContentLoaded', displayCartItems);