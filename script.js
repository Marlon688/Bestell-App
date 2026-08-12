function renderDishes() {
  for (let dish of myDishes) {
    let dishHTML = createDishTemplate(dish);

    let container = document.getElementById(`${dish.category}-items`);

    container.innerHTML += dishHTML;
  }
}

renderDishes();
