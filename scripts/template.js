function createDishTemplate(dish) {
  return `
    <div class="menu-item">
  <img class="menu-item_image" src="${dish.image}" alt="${dish.name}" />
  <div class="menu-item_info">
    <div class="menu-item_header">
      <span class="menu-item_name">${dish.name}</span>
      <span class="menu-item_price">${formatPrice(dish.price)}</span> 
    </div>
    <p class="menu-item_description">${dish.description}</p>
    ${getButtonTemplate(dish)}
   
  </div>
</div>`;
}

function getButtonTemplate(dish) {
  const amount = getAmount(dish.id);
  if (amount > 0) {
    return `<button class="menu-item_btn menu-item_btn--added" onclick="addToBasket(${dish.id})">Added ${amount}</button>`;
  }
  return `<button class="menu-item_btn" onclick="addToBasket(${dish.id})">Add to basket</button>`;
}

function getBasketItemTemplate(dish, amount) {
  return `
<div class="basket-item">
  ${getDeleteCornerTemplate(dish, amount)}
  <p class="basket-item_name">${amount} x ${dish.name}</p>
  <div class="basket-item_footer">
    <div class="basket-item_stepper">
      ${getStepperLeftTemplate(dish, amount)}
      <span>${amount}</span>
      <button onclick="addToBasket(${dish.id})">+</button>
    </div>
    <span class="basket-item_price">${formatPrice(dish.price * amount)}</span>
  </div>
</div>`;
}

function getDeleteCornerTemplate(dish, amount) {
  if (amount < 2) return "";
  return ` <button class="basket-item_delete" onclick="removeFromBasket(${dish.id})">
  <img src="./assets/icons/trash.svg" alt="Entfernen"/></button>`;
}

function getStepperLeftTemplate(dish, amount) {
  if (amount === 1) {
    return ` <button onclick="removeFromBasket(${dish.id})">
  <img src="./assets/icons/trash.svg" alt="Entfernen"/></button>`;
  }

  return ` <button onclick="decreaseAmount(${dish.id})">-</button>`;
}

function getBasketSummaryTemplate(subtotal, deliveryFee, total) {
  return `
  <div class="summary-row">
<span>Subtotal</span><span>${formatPrice(subtotal)}</span>
</div>
<div class="summary-row">
<span>Delivery fee</span><span>${formatPrice(deliveryFee)}</span>
</div>
<div class="summary-row summary-row--total">
<span>Total</span><span>${formatPrice(total)}</span>
</div>
<button class="buy-btn" onclick="buyNow()">Buy now (${formatPrice(total)})</button>`;
}
