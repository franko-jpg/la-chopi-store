// Global cart array to hold product items with quantity
var cart = [];

// Save/Load the cart to/from localStorage for persistence
function saveCart() {
  localStorage.setItem("eduCart", JSON.stringify(cart));
}

function loadCart() {
  var savedCart = localStorage.getItem("eduCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Update the cart count in the nav bar
function updateCartCount() {
  let count = 0;
  cart.forEach(function(item) {
    count += item.quantity;
  });
  // Assuming "cartCount" exists in your HTML
  document.getElementById("cartCount").textContent = count;
}

// Render the list of products (from your external products.js) into the catalog
function renderproduct(filterText = "") {
  let productList = document.getElementById("product-list"); // Ensure your HTML container's id is "product-list"
  if (!productList) return;
  productList.innerHTML = ""; // Clear previous products

  products.forEach(function(product) {
    if (!product) {
      console.error("Undefined product");
      return;
    }

    // Filter products by name/distributor (case insensitive)
    if (
      product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 &&
      product.distributor.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return; // Skip this product
    }

    // Create a productCard string (using Bootstrap 5 classes as needed)
    let productCard = `
      <div class="col-md-4 product-card" data-id="${product.id}">
        <div class="card h-100 bg-custom-cream">
          <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description.substring(0, 100)}...</p>
            <p><strong>Distributor:</strong> ${product.distributor}</p>
            <p><strong>Price:</strong> $${product.price}</p>
          </div>
          <div class="card-footer d-flex justify-content-between bg-custom-light-gray">
            <button class="btn btn-sm bg-custom-light-brown view-details">Details</button>
            <button class="btn bg-custom-light-brown btn-sm add-to-cart">Add To Cart</button>
          </div>
        </div>
      </div>
    `;
    productList.insertAdjacentHTML("beforeend", productCard);
  });
}

// When a user clicks on "Details", populate and show the product modal
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("view-details")) {
    let prodId = event.target.closest(".product-card").dataset.id;
    let product = products.find(p => p.id == prodId);
    if (product) {
      document.getElementById("modalProductImg").src = product.image;
      document.getElementById("modalProductName").textContent = product.name;
      document.getElementById("modalDistributor").textContent = product.distributor;
      document.getElementById("modalProductType").textContent = product.productType;
      document.getElementById("modalDescription").textContent = product.description;
      document.getElementById("modalPrice").textContent = product.price;
      document.getElementById("modalStock").textContent = product.stock;
      // Attach product id to the Add Cart button in modal so we know what to add later
      document.getElementById("modalAddCart").dataset.id = product.id;

      // Show the product modal using Bootstrap 5 API
      let productModalEl = document.getElementById("productModal");
      let productModal = new bootstrap.Modal(productModalEl);
      productModal.show();
    } else {
      console.error("No se encontró producto con el ID:", prodId);
    }
  }
});

// Add product to cart function
function addToCart(productId) {
  let product = products.find(p => p.id == productId);
  if (!product) return;

  let existing = cart.find(item => item.id == productId);
  if (existing) {
    // Check if we have stock remaining
    if (existing.quantity < product.stock) {
      existing.quantity++;
    } else {
      alert("No queda más de este producto en almacén.");
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      distributor: product.distributor,
      price: product.price,
      quantity: 1,
      stock: product.stock
    });
  }
  saveCart();
  updateCartCount();
  renderCart();
}

// When "Add To Cart" is clicked from the product card
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart")) {
    let prodId = event.target.closest(".product-card").dataset.id;
    addToCart(prodId);
  }
});

// When "Add To Cart" is clicked in the modal
document.getElementById("modalAddCart").addEventListener("click", function() {
  let prodId = this.dataset.id;
  addToCart(prodId);
  // Hide the product modal via Bootstrap 5 API
  let productModalEl = document.getElementById("productModal");
  let productModal = bootstrap.Modal.getInstance(productModalEl);
  productModal.hide();
});

// Render the cart table inside the cart modal
function renderCart() {
  let tbody = document.querySelector("#cartTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(function(item, index) {
    let subtotal = item.price * item.quantity;
    total += subtotal;
    let row = `
      <tr data-index="${index}">
        <td>${item.name}</td>
        <td>${item.distributor}</td>
        <td>$${item.price}</td>
        <td>
          <input type="number" min="1" max="${item.stock}" class="form-control quantity-input" value="${item.quantity}" style="width:80px;">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-item">Remove</button>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

// Update quantity when changed in the cart modal
document.addEventListener("change", function(event) {
  if (event.target.classList.contains("quantity-input")) {
    let newQty = parseInt(event.target.value);
    let index = event.target.closest("tr").dataset.index;
    if (newQty < 1) newQty = 1;
    if (newQty > cart[index].stock) newQty = cart[index].stock;
    cart[index].quantity = newQty;
    saveCart();
    updateCartCount();
    renderCart();
  }
});

// Remove item from cart
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-item")) {
    let index = event.target.closest("tr").dataset.index;
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
  }
});

// Checkout form submission handling (simulate order processing)
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let orderNum = "EDU" + Math.floor(Math.random() * 1000000);
  document.getElementById("orderNumber").textContent = orderNum;
  document.getElementById("orderConfirmation").classList.remove("d-none");

  // Clear cart after order is placed
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();

  setTimeout(function() {
    let checkoutModalEl = document.getElementById("checkoutModal");
    let checkoutModal = bootstrap.Modal.getInstance(checkoutModalEl);
    checkoutModal.hide();
    document.getElementById("orderConfirmation").classList.add("d-none");
    document.getElementById("checkoutForm").reset();
  }, 3000);
});

// Search functionality: filtering product list as user types
document.getElementById("productSearch").addEventListener("keyup", function() {
  let searchText = this.value;
  renderproduct(searchText);
});

// (Optional) Set up the event listener for the cart button to open the cart modal
document.getElementById("cartBtn").addEventListener("click", function(event) {
  event.preventDefault();
  let cartModalEl = document.getElementById("cartModal");
  let cartModal = new bootstrap.Modal(cartModalEl);
  cartModal.show();
});

// Initialize page when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  loadCart();
  updateCartCount();
  renderproduct();
  renderCart();
});


document.addEventListener("hidden.bs.modal", function () {
  document.body.classList.remove("modal-open");
});

document.addEventListener("hidden.bs.modal", function () {
  document.body.classList.remove("modal-open"); // Ensure scrolling is restored
  document.body.style.overflow = "auto"; // Fix stuck scrolling

  // Remove any remaining modal backdrops
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.remove();
  });
});

