// Dados de produtos (simulando um catálogo)
const products = [
    { id: 1, name: "Vestido Midi Seda Floral", price: 189.90, image: "https://via.placeholder.com/400x400/FFC0CB?text=Vestido+Floral" },
    { id: 2, name: "Camiseta Premium Algodão Pima", price: 79.50, image: "https://via.placeholder.com/400x400/ADD8E6?text=Camiseta+Azul" },
    { id: 3, name: "Calça Jogger Slim Fit", price: 159.99, image: "https://via.placeholder.com/400x400/90EE90?text=Calça+Verde" },
    { id: 4, name: "Jaqueta Bomber Masculina", price: 299.00, image: "https://via.placeholder.com/400x400/C0C0C0?text=Jaqueta+Cinza" },
    { id: 5, name: "Blusa de Tricot Gola Alta", price: 110.00, image: "https://via.placeholder.com/400x400/F08080?text=Blusa+Rose" },
    { id: 6, name: "Tênis Casual em Couro", price: 230.50, image: "https://via.placeholder.com/400x400/D3D3D3?text=Tenis+Branco" },
    { id: 7, name: "Saia Plissada de Inverno", price: 135.00, image: "https://via.placeholder.com/400x400/87CEFA?text=Saia+Azul" },
    { id: 8, name: "Moletom Canguru Unissex", price: 175.90, image: "https://via.placeholder.com/400x400/9400D3?text=Moletom+Roxo" },
];

let cart = [];

const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// --- Funções de Renderização ---

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <a href="#" class="product-name" title="${product.name}">${product.name}</a>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">Adicionar à Sacola</button>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Adiciona o evento de clique aos botões de 'Adicionar'
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
        cartItemsContainer.innerHTML = '<p class="empty-cart-message"><i class="fas fa-box-open"></i> Sua sacola está vazia.</p>';
        cartTotalElement.textContent = '0,00';
        cartCount.textContent = '0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Qtd: ${item.quantity}</span>
            </div>
            <span class="item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
            `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2).replace('.', ',');
    // Atualiza o contador de itens no ícone do cabeçalho
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
        // Feedback visual (abrir o carrinho)
        openCart();
    }
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.style.display = 'block';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.style.display = 'none';
}

// --- Eventos de UI ---

document.querySelector('.cart-btn').addEventListener('click', openCart);
document.querySelector('.close-cart-btn').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart); // Fechar ao clicar no overlay

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});