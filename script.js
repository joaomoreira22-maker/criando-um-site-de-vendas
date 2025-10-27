// Dados simulados de produtos (em um site real, viriam de um banco de dados/API)
const products = [
    { id: 1, name: "Vestido Floral de Verão", price: 79.90, image: "images/produto1.jpg" },
    { id: 2, name: "Camiseta Básica Algodão", price: 39.50, image: "images/produto2.jpg" },
    { id: 3, name: "Calça Jeans Skinny Confort", price: 119.99, image: "images/produto3.jpg" },
    { id: 4, name: "Jaqueta Corta Vento Esportiva", price: 150.00, image: "images/produto4.jpg" },
    { id: 5, name: "Saia Plissada Midi", price: 65.00, image: "images/produto5.jpg" },
    { id: 6, name: "Blusa de Frio Tricot", price: 95.90, image: "images/produto6.jpg" },
    // Adicione mais produtos conforme necessário
];

let cart = []; // Array para armazenar os itens no carrinho

const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart-btn');

// --- Funções de Renderização ---

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <a href="#" class="product-name">${product.name}</a>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <button class="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productCard);
    });

    // Adiciona o evento de clique aos botões de 'Adicionar ao Carrinho'
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--light-text-color);">Seu carrinho está vazio.</p>';
        cartTotalElement.textContent = '0.00';
        cartCount.textContent = '0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #eee; padding: 10px 0;';
        cartItem.innerHTML = `
            <span style="font-size: 0.9em;">${item.name} (${item.quantity})</span>
            <span style="font-weight: 500;">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2).replace('.', ',');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// --- Funções de Lógica ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (product) {
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        // Opcional: Abre o carrinho após adicionar
        cartSidebar.classList.add('open');
    }
}

// --- Eventos de UI ---

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// --- Inicialização ---

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart(); // Renderiza o carrinho vazio na inicialização
});