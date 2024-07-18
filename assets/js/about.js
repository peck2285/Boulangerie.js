import {slides } from "./Data.js";


let currentIndex = 0

const showArticle = (index) => {
  const slider = document.querySelector(".slider"); // Sélectionne l'élément slider dans le DOM
  slider.innerHTML = ""; // Vide le contenu précédent du slider

  slides.forEach((slide, i) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("slide");

    if (i === index) {
      slideElement.classList.add("active");
    }

    slideElement.innerHTML = `
            <img src="${slide.imgSrc}" alt="image de slide ">
            <div class="content">
                <h2>${slide.name}</h2>
                <h3>${slide.description}</h3>
            </div>
        `;

    slider.appendChild(slideElement); // Ajoute le slide à l'élément slider
  });
};

 
const rotateArticles = () => {
  showArticle(currentIndex);
  currentIndex = (currentIndex + 1) % slides.length;
};


setInterval(rotateArticles, 2000);
