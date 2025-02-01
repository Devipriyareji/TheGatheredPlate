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

            document.getElementById("recipe-name").value = "";
            document.getElementById("recipe-ingredients").value = "";
            document.getElementById("recipe-steps").value = "";
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Function to create a new page in the flipbook
    function addRecipePage(recipe) {
        let newPage = document.createElement("div");
        newPage.classList.add("page");
        newPage.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Steps:</strong><br>${recipe.steps}</p>
        `;

        document.getElementById("recipeBook").appendChild(newPage);
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }

    // Function to load saved recipes from localStorage
    function loadRecipes() {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.forEach(recipe => addRecipePage(recipe));
        flipBook.loadFromHTML(document.querySelectorAll(".page"));
    }
});
