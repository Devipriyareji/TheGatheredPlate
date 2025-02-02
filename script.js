document.addEventListener("DOMContentLoaded", function () {
    const book = document.getElementById("recipeBook");

    // Initialize the flipbook with new dimensions
    const flipBook = new St.PageFlip(book, {
        width: 600,  // Keep width the same
        height: 500, // Adjusted height to make it longer
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
            const newRecipe = { name, ingredients, steps };

            let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            addRecipePage(newRecipe);

            // Clear input fields after adding the recipe
            document.getElementById("recipe-name").value = "";
            document.getElementById("recipe-ingredients").value = "";
            document.getElementById("recipe-steps").value = "";
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Function to create a new page in the flipbook with delete button
    function addRecipePage(recipe) {
        let newPage = document.createElement("div");
        newPage.classList.add("page");
        newPage.innerHTML = `
            <h2>${recipe.name}</h2>
            <div>
                <h3>Ingredients</h3>
                <p>${recipe.ingredients}</p>
            </div>
            <div>
                <h3>Steps</h3>
                <p>${recipe.steps}</p>
            </div>
            <button class="delete-btn">Delete</button>
        `;

        // Add event listener for delete button
        const deleteButton = newPage.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function() {
            deleteRecipe(recipe.name, newPage);
        });

        document.getElementById("recipeBook").appendChild(newPage);
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }

    // Function to load saved recipes from localStorage
    function loadRecipes() {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.forEach(recipe => addRecipePage(recipe));
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }

    // Function to delete a recipe (from both the flipbook and localStorage)
    function deleteRecipe(recipeName, pageElement) {
        // Remove the page from the flipbook
        pageElement.remove();

        // Get current recipes from localStorage
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // Filter out the deleted recipe
        recipes = recipes.filter(recipe => recipe.name !== recipeName);

        // Update the localStorage with the remaining recipes
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Reload the recipes to ensure they persist across page reloads
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }
});
