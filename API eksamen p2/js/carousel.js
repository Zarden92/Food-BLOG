const carousel = document.querySelector(".carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let startIndex = 0;
const itemsPerPage = 4;
let data = []; // Store the fetched data

async function fetchImages() {
  try {
    if (data.length === 0) {
      const response = await fetch("https://www.johanf.no/wp-json/wp/v2/media");
      data = await response.json();
    }

    // Clear existing images
    carousel.innerHTML = "";

    for (
      let i = startIndex;
      i < startIndex + itemsPerPage && i < data.length;
      i++
    ) {
      const imageUrl = data[i].source_url;
      const altText = data[i].alt_text;

      const slide = document.createElement("div");
      slide.classList.add("carousel_slide");
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = altText;

      slide.appendChild(img);
      carousel.appendChild(slide);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Initial fetch
fetchImages();

nextBtn.addEventListener("click", () => {
  startIndex = (startIndex + itemsPerPage) % data.length;
  fetchImages();
});

prevBtn.addEventListener("click", () => {
  startIndex = (startIndex - itemsPerPage + data.length) % data.length;
  fetchImages();
});
