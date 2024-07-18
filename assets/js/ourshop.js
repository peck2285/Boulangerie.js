import { categories } from "./Data.js";

const categoryContainer = document.querySelector(".category-item");
const categoriesBox = document.querySelector(".our-Shop");
const cartContents = document.querySelector(".cartContents"); // Sélectionnez cartContents
const cartModal = document.getElementById("cartModal"); // Sélectionnez cartModal
const cartIcon = document.querySelector(".info-market");

let count = 0;
let cart = [];

// Charger le panier depuis localStorage s'il existe
const loadCartFromStorage = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCartDisplay();
  }
};

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
        </div>
      `;
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

    // Ajouter les écouteurs d'événements pour les produits de la même catégorie
    addEventListenersToSameCategoryProducts();
  }
};

// Fonction pour ajouter des écouteurs d'événements aux produits de la même catégorie
const addEventListenersToSameCategoryProducts = () => {
  const sameCategoryItems = document.querySelectorAll(".relative-categori");
  sameCategoryItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const id = event.currentTarget.getAttribute("data-id");
      const category = event.currentTarget.getAttribute("data-category");
      showProductDetails(id, category);
    });
  });
};

// Fonction pour mettre à jour l'affichage de la quantité
const updateQuantityDisplay = () => {
  document.querySelector(".count").textContent = count;
};

// Fonction pour mettre à jour l'affichage du panier
const updateCartDisplay = () => {
  document.querySelector("#count").textContent = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  document.querySelector("#count").style.display =
    cart.length > 0 ? "flex" : "none";
};

// Fonction pour afficher les articles du panier dans cartContents
const displayCartItems = () => {
  cartContents.innerHTML = "";
  cart.forEach((item) => {
    cartContents.innerHTML += `
      <div>
        <div class="div">
          <img src="${item.imageUrl}" alt="Product Image" height="40" />
          <div class="desc">
            <p>${item.title}</p>
            <p>$${item.price} * ${item.quantity} <strong>$${
      item.price * item.quantity
    }</strong></p>
          </div>
          <div class="delete" data-id="${item._id}">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="pointer-events: none;">
              <defs>
                <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"></path>
              </defs>
              <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"></use>
            </svg>
          </div>
        </div>
      </div>`;
  });

  // Ajouter les écouteurs d'événements pour les boutons de suppression
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      console.log("Delete button clicked, id:", id); // Debug: Affiche l'ID de l'élément à supprimer
      removeFromCart(id);
    });
  });
};

const removeFromCart = (id) => {
  console.log(cart);
  console.log("removeFromCart called with id:", id); // Debug: Vérifier l'ID passé à removeFromCart
  cart = cart.filter((item) => item._id !== Number(id));
  console.log("Updated cart:", cart); // Debug: Affiche l'état du panier après suppression
  saveCartToStorage();
  updateCartDisplay();
  displayCartItems();
};

// Gestionnaire d'événement pour l'icône du panier
cartIcon.addEventListener("click", () => {
  displayCartItems();
  cartModal.classList.toggle("active");
});

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
window.addEventListener("load", () => {
  loadCartFromStorage();
});

// Appel de la fonction ourShop
ourShop();

// Appel de la fonction addEventListenersToCategories
addEventListenersToCategories();
