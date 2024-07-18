import { categories } from "./Data.js";


var menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
const categoryContainer = document.querySelector(".category-item");
// console.log(categoryContainer);
const categoryList = document.querySelector(".category-list");
console.log(categoryList);

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

document.querySelector("#search-icon").onclick = () => {
  document.querySelector(".search-input-items").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector(".search-input-items").classList.remove("active");
};

//function display category-item


export const displayCategories = () => {
  const categoryList = document.querySelector(".category-list");
  if (!categoryList) {
    console.error("categoryList n'existe pas dans le DOM");
    return;
  }

  categoryList.innerHTML = "";
  categories.map((category) => {
    categoryList.innerHTML += ` 
      <div class="categori1">
        <img src="${category.imageUrl}" alt="maquette de site e commerce">
        <h3>${category.title}</h3>
      </div>`;
  });
};




