const toggleBtn = document.querySelector(".toggle_nav");
const toggleBtnIcon = document.querySelector(".toggle_nav i");
const dropDown = document.querySelector(".dropdown");

toggleBtn.onclick = function () {
  dropDown.classList.toggle("open");
  const isOpen = dropDown.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
