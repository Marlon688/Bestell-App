let basket = [];
const DELIVERY_FEE = 4.99;

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + "€";
}

function getAmount(id) {
  const entry = basket.find((item) => item.id === id);
  return entry ? entry.amount : 0;
}

function addToBasket(id) {
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
  const itemContainer = document.getElementById("cart_items");
  const summaryContainer = document.getElementById("cart_summary");

  let html = "";
  for (let entry of basket) {
    const dish = myDishes.find((item) => item.id === entry.id);
    html += getBasketItemTemplate(dish, entry.amount);
  }
  itemContainer.innerHTML = html;

  const subtotal = calculateSubtotal();
  summaryContainer.innerHTML = getBasketSummaryTemplate(
    subtotal,
    DELIVERY_FEE,
    subtotal + DELIVERY_FEE,
  );
}

function render() {
  renderDishes();
  renderBasket();
}

render();
