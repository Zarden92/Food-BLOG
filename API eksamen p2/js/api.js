const url = "https://www.johanf.no/wp-json/wp/v2/recipe";
const productContainer = document.querySelector(".product_container");

async function getProducts(url) {
  const response = await fetch(url);
  const products = await response.json();
  console.log(products);
}

getProducts(url);
