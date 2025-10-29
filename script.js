// 1. Dados Fictícios de Produtos
const produtos = [
    { id: 1, nome: "Camisa Brasil Edição Especial", preco: 249.90, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Camisa+Brasil", categoria: "camisas" },
    { id: 2, nome: "Chuteira Speed Pro Laranja", preco: 399.90, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Chuteira+Laranja", categoria: "chuteiras" },
    { id: 3, nome: "Bola Oficial Premier League", preco: 159.00, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Bola+Premier", categoria: "bolas" },
    { id: 4, nome: "Meião Profissional Branco (3 pares)", preco: 45.50, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Meiao", categoria: "acessorios" },
    { id: 5, nome: "Camisa Liverpool Home 24/25", preco: 229.90, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Camisa+LVP", categoria: "camisas" },
    { id: 6, nome: "Luva Goleiro Top Grip", preco: 189.90, imagem: "https://via.placeholder.com/150/FF4D00/FFFFFF?text=Luva+Goleiro", categoria: "acessorios" },
];

// Array para simular o carrinho de compras
let carrinho = [];

// Elementos do DOM
const produtosContainer = document.getElementById('produtos-container');
const contadorCarrinho = document.getElementById('contador-carrinho');

/**
 * 2. Função para Renderizar os Produtos na Tela
 */
function renderizarProdutos() {
    produtosContainer.innerHTML = ''; // Limpa o container
    
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        
        // Formata o preço para o padrão brasileiro
        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h4 class="titulo-produto">${produto.nome}</h4>
            <p class="preco-produto">${precoFormatado}</p>
            <button class="adicionar-carrinho" data-id="${produto.id}">Adicionar</button>
        `;
        
        produtosContainer.appendChild(produtoDiv);
    });
    
    // 3. Adiciona listeners de evento nos botões "Adicionar"
    document.querySelectorAll('.adicionar-carrinho').forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
}

/**
 * 4. Função para Adicionar Produto ao Carrinho
 */
function adicionarAoCarrinho(event) {
    const produtoId = parseInt(event.target.dataset.id);
    const produtoSelecionado = produtos.find(p => p.id === produtoId);

    if (produtoSelecionado) {
        // Simplesmente adiciona o produto ao array do carrinho
        carrinho.push(produtoSelecionado);
        
        // Atualiza a interface (contador e talvez um feedback)
        atualizarContadorCarrinho();
        
        // Feedback visual
        alert(`"${produtoSelecionado.nome}" adicionado ao carrinho!`);

        // Log para debug
        console.log('Carrinho atual:', carrinho);
    }
}

/**
 * 5. Função para Atualizar o Contador do Carrinho
 */
function atualizarContadorCarrinho() {
    contadorCarrinho.textContent = carrinho.length;
}

// 6. Inicializa o site
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarContadorCarrinho();
});


/*
 * PRÓXIMOS PASSOS PARA EVOLUIR O PROJETO:
 * - Implementar a lógica de BUSCA
 * - Implementar a filtragem por CATEGORIAS
 * - Criar uma interface para ver o CARRINHO (modal ou nova página)
 * - Gerenciar a quantidade de itens no carrinho (para ter 2x o mesmo produto)
 */