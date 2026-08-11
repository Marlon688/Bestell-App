function createDishTemplate(dish) {
    return `
        < div class="menu-item" >
         <img class="menu-item_image" src="${dish.image}" alt="${dish.name}" />

           <div class="menu-item-info">
        <div class="menu-item_header">
            <h3 class="menu-item_name">${dish.name}</h3>
            <span class="menu-item_price">${dish.price.toFixed(2)}€</span>
        </div>
        <p class="menu-item_description">${dish.description}</p>

        <button class="menu-item_btn" onclick="addTocart(dish)">
            Add to basket
        </button>


    </div>
    </div>


    `;



}
