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

renderDishes();
