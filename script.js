const products = [
  { id: 1, name: "Snake Plant", price: 200, image: "images/snake.jpg" },
  { id: 2, name: "Peace Lily", price: 300, image: "images/lily.jpg" },
  { id: 3, name: "Aloe Vera", price: 150, image: "images/aloe.jpg" },
  { id: 4, name: "Spider Plant", price: 180, image: "images/spider.jpg" },
  { id: 5, name: "Succulent", price: 100, image: "images/succulent.jpg" },
  { id: 6, name: "Pothos", price: 220, image: "images/pothos.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count")?.textContent = count;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";
  products.forEach(product => {
    container.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" width="150" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  if (!items || !total) return;
  items.innerHTML = "";
  let totalCost = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalCost += itemTotal;
    items.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="50" />
        <div>${item.name} (₹${item.price} x ${item.quantity})</div>
        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">🗑️</button>
        </div>
      </div>
    `;
  });
  total.textContent = `Total: ₹${totalCost}`;
}

function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

// Run on page load
renderProducts();
renderCart();
updateCartCount();