const menuData = [
    { id: 1, name: "Classic Burger", price: 12.99, category: "burgers", icon: "🍔" },
    { id: 2, name: "Pepperoni Pizza", price: 15.99, category: "pizza", icon: "🍕" },
    { id: 3, name: "Sushi Platter", price: 18.99, category: "asian", icon: "🍣" },
    { id: 4, name: "Pasta Carbonara", price: 14.99, category: "italian", icon: "🍝" },
    { id: 5, name: "Chicken Tacos", price: 11.99, category: "healthy", icon: "🌮" },
    { id: 6, name: "Fresh Salad", price: 9.99, category: "healthy", icon: "🥗" }
];

let cart = [];

function renderMenu(filter = 'all') {
    const grid = document.getElementById('food-grid');
    grid.innerHTML = '';
    
    const items = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);
    
    items.forEach(item => {
        grid.innerHTML += `
            <div class="food-card">
                <div class="food-image">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="add-item-btn" onclick="addToCart(${item.id})">+</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    const countDisplay = document.getElementById('cart-count');
    
    countDisplay.innerText = cart.length;
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><div class="empty-icon">🍕</div><p>Nothing here yet</p></div>`;
        totalDisplay.innerText = "$0.00";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
            <span>${item.name}</span>
            <strong>$${item.price.toFixed(2)}</strong>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

// Category filter logic
document.getElementById('category-filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-btn')) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.dataset.category);
    }
});

// Initial load
renderMenu();