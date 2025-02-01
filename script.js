document.addEventListener("DOMContentLoaded", function () {
    const book = document.getElementById("recipeBook");

    // Initialize the flipbook
    const flipBook = new St.PageFlip(book, {
        width: 550,
        height: 300,
        maxShadowOpacity: 0.5,
        showCover: true,
    });

    // Load recipes from localStorage on page load
    loadRecipes();

    // Function to add a new recipe to the flipbook and localStorage
    window.addRecipe = function() {
        let name = document.getElementById("recipe-name").value;
        let ingredients = document.getElementById("recipe-ingredients").value;
        let steps = document.getElementById("recipe-steps").value;

        if (name && ingredients && steps) {
            // Create a new recipe object
            const newRecipe = {
                name: name,
                ingredients: ingredients,
                steps: steps
            };

            // Get existing recipes from localStorage, or start with an empty array
            let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

            // Add the new recipe to the list
            recipes.push(newRecipe);

            // Save the updated recipe list back to localStorage
            localStorage.setItem('recipes', JSON.stringify(recipes));

            // Add the new recipe as a page in the flipbook
            addRecipePage(newRecipe);

            // Clear the input fields
            document.getElementById("recipe-name").value = "";
            document.getElementById("recipe-ingredients").value = "";
            document.getElementById("recipe-steps").value = "";
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Function to create a new page for the recipe in the flipbook
    function addRecipePage(recipe) {
        // Create a new page
        let newPage = document.createElement("div");
        newPage.classList.add("page");
        newPage.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Steps:</strong><br>${recipe.steps}</p>
        `;

        // Append the new page to the flipbook container
        document.getElementById("recipeBook").appendChild(newPage);

        // Re-load the pages in the flipbook to include the new one
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }

    // Function to load all recipes from localStorage and add them to the flipbook
    function loadRecipes() {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // For each recipe, add it to the flipbook as a page
        recipes.forEach(recipe => {
            addRecipePage(recipe);
        });

        // After adding the pages, reinitialize the flipbook (re-loading the pages)
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }
});
