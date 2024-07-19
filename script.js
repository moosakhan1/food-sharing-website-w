document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.getElementById('food-form');
    const foodList = document.getElementById('food-list');
  
    foodForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const imageFile = document.getElementById('image').files[0];
  
      if (title && description && imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageData = event.target.result;
          const foodItem = {
            title,
            description,
            image: imageData
          };
          saveFoodItem(foodItem);
          displayFoodItem(foodItem);
          foodForm.reset();
        };
        reader.readAsDataURL(imageFile);
      }
    });
  
    function saveFoodItem(foodItem) {
      const foodItems = getFoodItems();
      foodItems.push(foodItem);
      localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }
  
    function getFoodItems() {
      const foodItems = localStorage.getItem('foodItems');
      return foodItems ? JSON.parse(foodItems) : [];
    }
  
    function displayFoodItem(foodItem) {
      const foodItemDiv = document.createElement('div');
      foodItemDiv.classList.add('food-item');
      foodItemDiv.innerHTML = `
        <h3>${foodItem.title}</h3>
        <p>${foodItem.description}</p>
        <img src="${foodItem.image}" alt="${foodItem.title}">
      `;
      foodList.appendChild(foodItemDiv);
    }
  
    function displayFoodItems() {
      const foodItems = getFoodItems();
      foodItems.forEach(displayFoodItem);
    }
  
    displayFoodItems();
  });
  