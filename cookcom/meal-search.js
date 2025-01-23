// Meal Search API Integration
const searchBtn = document.getElementById('food-search-btn');
const menuDish = document.getElementById('menu-dish');
const mealDetailsContent = document.querySelector('.meal-details-content');

// Event Listeners
searchBtn.addEventListener('click', getMealList);

// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('food-search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-lg-4 col-sm-6 dish-box-wp breakfast" data-id="${meal.idMeal}">
                            <div class="dish-box text-center">
                                <div class="dist-img">
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                </div>
                                <div class="dish-rating">
                                    <div class="dish-title">
                                        <h3 class="h3-title">${meal.strMeal}</h3>
                                    </div>
                                </div>
                                <div class="dist-bottom-row">
                                    <ul>
                                     <li>
                                        <button class="add-to-cart" onclick="addToCart(${meal.idMeal})">
                                            <i class="fas fa-plus"></i> <!-- Font Awesome Plus Icon -->
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
                });
            } else {
                html = `
                    <div class="col-lg-12">
                        <div class="sec-title text-center">
                            <h3 class="h3-title">Sorry, we didn't find any meal with that ingredient!</h3>
                        </div>
                    </div>
                `;
            }
            menuDish.innerHTML = html;
            // Force a layout update after a short delay
            setTimeout(() => {
                window.dispatchEvent(new Event('resize')); // Trigger resize event
            }, 300); // Adjust the delay as needed
        })
        .catch(error => {
            console.error('Error:', error);
            menuDish.innerHTML = `
                <div class="col-lg-12">
                    <div class="sec-title text-center">
                        <h3 class="h3-title">Error fetching recipes. Please try again.</h3>
                    </div>
                </div>
            `;
        });
}

// Get Recipe Details
function getMealRecipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const html = `
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
            `;
            mealDetailsContent.innerHTML = html;
            mealDetailsContent.parentElement.classList.add('showRecipe');
        });
}

// Close Recipe Modal
const recipeCloseBtn = document.getElementById('recipe-close-btn');
if (recipeCloseBtn) {
    recipeCloseBtn.addEventListener('click', () => {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });
}
