const recipeApiUrl = "https://johanf.no/wp-json/wp/v2/recipe";
const mediaApiUrl = "https://www.johanf.no/wp-json/wp/v2/media";
let currentPage = 1;

const perPage = 10;
const recipeList = document.querySelector(".recipe-list");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

let recipes = [];

// Function to fetch and display recipes
async function fetchAndDisplayRecipes(page) {
  const recipeResponse = await fetch(
    `${recipeApiUrl}?per_page=${perPage}&page=${page}`
  );
  const newRecipes = await recipeResponse.json();

  for (let i = 0; i < newRecipes.length; i++) {
    const recipe = newRecipes[i];

    // Fetch the image URL from the media API
    const mediaId = recipe.featured_media;
    const mediaResponse = await fetch(`${mediaApiUrl}/${mediaId}`);
    const mediaData = await mediaResponse.json();
    const imageUrl = mediaData.source_url;

    // Create the recipe item and populate it with data
    const recipeItem = document.createElement("div");
    recipeItem.className = "recipe-item";

    const title = document.createElement("div");
    title.className = "recipe-title";
    title.textContent = recipe.title.rendered;
    recipeItem.appendChild(title);

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = recipe.title.rendered; // Add alt text for accessibility
    recipeItem.appendChild(img);

    const ctaButton = document.createElement("a");
    ctaButton.className = "cta-button";
    ctaButton.href = "/html/blog-spesific.html";
    ctaButton.textContent = "Learn More";
    recipeItem.appendChild(ctaButton);

    recipeList.appendChild(recipeItem);
    recipes.push(recipeItem);
  }

  // Hide the first 9 recipes
  hideRecipes();
}

// Function to hide the recipes
function hideRecipes() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  for (let i = 0; i < recipes.length; i++) {
    if (i >= start && i < end) {
      recipes[i].style.display = "block";
    } else {
      recipes[i].style.display = "none";
    }
  }
}

// Initial load
fetchAndDisplayRecipes(currentPage);

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  currentPage++;
  fetchAndDisplayRecipes(currentPage);
});

// Event listener for the "Back" button
backButton.addEventListener("click", () => {
  currentPage = 1; // Reset to the first page
  hideRecipes(); // Hide recipes on other pages
});
