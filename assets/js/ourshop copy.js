import { categories } from "./Data.js";

const categoryContainer = document.querySelector(".category-item");
const categoriesBox = document.querySelector(".our-Shop");


let count = 0;
let cart = [];

// Charger le panier depuis localStorage s'il existe


// Enregistrer le panier dans localStorage
const saveCartToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fonction pour afficher les produits et récupérer leur ID et catégorie
const ourShop = () => {
  categories.forEach((category) => {
    categoriesBox.innerHTML += `
        <div class="categori" data-id="${category._id}" data-category="${category.category}">
          <img src="${category.imageUrl}" alt="maquette de site e commerce">
          <h3>${category.title}</h3>
        </div>`;
  });
};

// Fonction pour ajouter des écouteurs d'événements aux produits
const addEventListenersToCategories = () => {
  const categoryItems = document.querySelectorAll(".categori");
  categoryItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const id = event.currentTarget.getAttribute("data-id");
      const category = event.currentTarget.getAttribute("data-category");
      showProductDetails(id, category);
    });
  });
};

// Fonction pour afficher les détails du produit cliqué et les autres produits de la même catégorie
const showProductDetails = (id, category) => {
  const product = categories.find((cat) => cat._id == id);

  if (product) {
    // Vider categoryContainer et ajouter la classe active
    categoryContainer.innerHTML = "";

    // Afficher les détails du produit cliqué
    categoryContainer.innerHTML = `
      <div class="categoryDetailsBox">
        <div class="product-details">
          <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.title}">
          </div>
          <div class="product-info">
            <h2>${product.category}</h2>
            <span>$${product.price}</span>
            <p>${product.desc}</p>
            <div class="cta">
              <div class="quantity">
                <span class="minus">-</span>
                <span class="count">${count}</span>
                <span class="plus">+</span>
              </div>
              <div class="addTocart">
                ADD TO CART
              </div>
            </div>
          </div>
        </div>
        <h3>Other products in the same category:</h3>
      </div>
    `;

    // Filtrer et afficher les autres produits de la même catégorie
    const sameCategoryProducts = categories.filter(
      (cat) => cat.category === category && cat._id != id
    );

    sameCategoryProducts.forEach((cat) => {
      document.querySelector(".categoryDetailsBox").innerHTML += `
        <div class="relative-categori" data-id="${cat._id}" data-category="${cat.category}">
          <img src="${cat.imageUrl}" alt="${cat.title}">
          <h3>${cat.title}</h3>
        </div>`;
    });

    // Ajouter les écouteurs pour les boutons plus et moins
    document.querySelector(".plus").addEventListener("click", () => {
      count++;
      updateQuantityDisplay();
    });

    document.querySelector(".minus").addEventListener("click", () => {
      count--;
      if (count < 0) count = 0;
      updateQuantityDisplay();
    });

    // Ajouter l'écouteur pour le bouton "ADD TO CART"
    document.querySelector(".addTocart").addEventListener("click", () => {
      addtoCart(product, count); // Passer count comme paramètre pour ajouter au panier
    });
  }
};
const updateQuantityDisplay = () => {
  document.querySelector(".count").textContent = count;
};

// Fonction pour mettre à jour l'affichage de la quantité


// Fonction pour mettre à jour l'affichage du panier


// Fonction pour afficher les articles du panier dans cartContents



// Gestionnaire d'événement pour l'icône du panier


// Fonction pour ajouter un produit au panier
const addtoCart = (product, quantity) => {
  const existingProductIndex = cart.findIndex(
    (item) => item._id === product._id
  );

  if (existingProductIndex !== -1) {
    // Mettre à jour la quantité du produit existant dans le panier
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Ajouter un nouveau produit avec sa quantité
    cart.push({ ...product, quantity });
  }

  // Enregistrer le panier dans localStorage
  saveCartToStorage();

  // Mettre à jour l'affichage du panier
  updateCartDisplay();

  // Réinitialiser le compteur de quantité
  count = 0;
  updateQuantityDisplay();
};

// Charger le panier depuis localStorage au chargement de la page


// Appel de la fonction ourShop
ourShop();

// Appel de la fonction addEventListenersToCategories
addEventListenersToCategories();
