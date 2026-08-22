// ============================
// State & Config
// ============================

let basket = [];
let hasOrdered = false;
const DELIVERY_FEE = 4.99;

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + "€";
}

function getAmount(id) {
  const entry = basket.find((item) => item.id === id);
  return entry ? entry.amount : 0;
}

// ============================
// Basket Logic
// ============================

function addToBasket(id) {
  hasOrdered = false;
  const entry = basket.find((item) => item.id === id);
  if (entry) entry.amount++;
  else basket.push({ id: id, amount: 1 });
  render();
}

function removeFromBasket(id) {
  basket = basket.filter((item) => item.id !== id);
  render();
}

function decreaseAmount(id) {
  const entry = basket.find((item) => item.id === id);
  if (entry.amount > 1) entry.amount--;
  render();
}

function calculateSubtotal() {
  let sum = 0;
  for (let entry of basket) {
    const dish = myDishes.find((item) => item.id === entry.id);
    sum += dish.price * entry.amount;
  }
  return sum;
}

// ============================
// Rendering
// ============================

function renderDishes() {
  const htmlByCategory = {};

  for (let dish of myDishes) {
    if (!htmlByCategory[dish.category]) htmlByCategory[dish.category] = "";
    htmlByCategory[dish.category] += createDishTemplate(dish);
  }
  for (let category in htmlByCategory) {
    document.getElementById(`${category}-items`).innerHTML =
      htmlByCategory[category];
  }
}

function renderBasket() {
  const cart = document.querySelector(".cart");
  cart.classList.toggle("d-none", hasOrdered);
  if (basket.length === 0) return renderEmptybasket();
  renderBasketItems();
  renderBasketSummary();
}

function renderEmptybasket() {
  document.getElementById("cart_items").innerHTML = getEmptyBasketTemplate();
  document.getElementById("cart_summary").innerHTML = "";
}

function renderBasketItems() {
  let html = "";
  for (let entry of basket) {
    const dish = myDishes.find((item) => item.id === entry.id);
    html += getBasketItemTemplate(dish, entry.amount);
  }
  document.getElementById("cart_items").innerHTML = html;
}

function renderBasketSummary() {
  const subtotal = calculateSubtotal();
  document.getElementById("cart_summary").innerHTML = getBasketSummaryTemplate(
    subtotal,
    DELIVERY_FEE,
    subtotal + DELIVERY_FEE,
  );
}

// ============================
// Checkout
// ============================

function buyNow() {
  basket = [];
  hasOrdered = true;
  render();
  showconfirmation();
}

function showconfirmation() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("confirmation").classList.remove("d-none");
  setTimeout(closeConfirmation, 2500);
}

function closeConfirmation() {
  document.getElementById("overlay").classList.add("d-none");
  document.getElementById("confirmation").classList.add("d-none");
}

function render() {
  renderDishes();
  renderBasket();
}

render();
