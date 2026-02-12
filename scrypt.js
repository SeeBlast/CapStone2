const foodItems = [
  { id: 1, name: "Classic Burger", price: 12.99, category: "Burgers" },
  { id: 2, name: "Pepperoni Pizza", price: 15.99, category: "Pizza" },
  { id: 3, name: "Sushi Platter", price: 18.99, category: "Asian" },
  { id: 4, name: "Pasta Carbonara", price: 14.99, category: "Italian" },
  { id: 5, name: "Chicken Tacos", price: 13.99, category: "Mexican" },
  { id: 6, name: "Fresh Garden", price: 10.99, category: "Healthy" },
  { id: 7, name: "Ramen Bowl", price: 16.99, category: "Asian" },
  { id: 8, name: "Chocolate Cake", price: 8.99, category: "Desserts" }
];

let cart = [];

function displayFood(items) {
  const grid = document.getElementById("foodGrid");
  grid.innerHTML = "";

  items.forEach(item => {
    grid.innerHTML += `
      <div class="food-card">
        <div class="food-card-content">
          <h4>${item.name}</h4>
          <div class="price-add">
            <span>$${item.price}</span>
            <button class="add-btn" onclick="addToCart(${item.id})">+</button>
          </div>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = foodItems.find(f => f.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartCount2 = document.getElementById("cartCount2");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span>${item.name}</span>
        <span>$${item.price}</span>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  cartCount2.innerText = cart.length;
  cartTotal.innerText = total.toFixed(2);
}

function filterCategory(category) {
  if (category === "All") {
    displayFood(foodItems);
  } else {
    const filtered = foodItems.filter(item => item.category === category);
    displayFood(filtered);
  }
}

function searchFood() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const filtered = foodItems.filter(item =>
    item.name.toLowerCase().includes(value)
  );
  displayFood(filtered);
}

displayFood(foodItems);
