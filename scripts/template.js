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
    <button class="menu-item_btn" onclick="addToBasket(${dish.id})">Add to basket</button>
  </div>
</div>`;
}
