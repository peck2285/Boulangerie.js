

const cartContents = document.querySelector(".cartContents"); // Sélectionnez cartContents
const cartModal = document.getElementById("cartModal"); // Sélectionnez cartModal
const cartIcon = document.querySelector(".info-market");
let cart = [];

 const loadCartFromStorage = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      cart = JSON.parse(cartData);
      updateCartDisplay();
    }
  };
  const saveCartToStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  const updateCartDisplay = () => {
    document.querySelector("#count").textContent = cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    document.querySelector("#count").style.display =
      cart.length > 0 ? "flex" : "none";
  };
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
        const id = event.target.dataset.id
        console.log("Delete button clicked, id:", id); // Debug: Affiche l'ID de l'élément à supprimer
        removeFromCart(id)
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

  cartIcon.addEventListener("click", () => {
    displayCartItems();
    cartModal.classList.toggle("active");
  });

  window.addEventListener("load", () => {
    loadCartFromStorage();
  });