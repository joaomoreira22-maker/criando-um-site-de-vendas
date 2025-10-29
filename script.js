// 1. Dados Fictícios de Produtos
const produtos = [
    { id: 1, nome: "Camisa Brasil Edição Especial", preco: 249.90, imagem: "https://alcavie.com/storage/images/288/products/brasnike02539/kMmDJ7gEtap2gaizEnNy2VWYMxvAnZWMoWMFwvrE.jpg", categoria: "camisas" },
    { id: 2, nome: "Chuteira Speed Pro Laranja", preco: 399.90, imagem: "https://http2.mlstatic.com/D_NQ_NP_701950-MLB71547874353_092023-O-chuteira-society-umbro-pro-5-bump-club-laranja-original.webp
    { id: 3, nome: "Bola Oficial Premier League", preco: 159.00, imagem: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/07/bola-premier-league-nova-2024-2025-e1721672258239.webp?w=1024
    { id: 4, nome: "Meião Profissional Branco (3 pares)", preco: 45.50, imagem: "https://images.tcdn.com.br/img/img_prod/1258191/kit_3_meias_cano_medio_atoalhado_39_44_branco_mizuno_357_1_3a53658795d8bd0860ea5db6e653567a.jpeg
    { id: 5, nome: "Camisa Liverpool Home 24/25", preco: 229.90, imagem: "https://acdn-us.mitiendanube.com/stores/001/409/577/products/camisa-pre-match-liverpool-fc-treino-24-25-nike-azul-masculina-torcedor-authentic-oficial-futebol-premier-league-inglaterra-reds-champions-league-salah-4-8f36e2dbf2a0324c5017267625205319-640-0.jpg
    { id: 6, nome: "Luva Goleiro Top Grip", preco: 189.90, imagem: "https://http2.mlstatic.com/D_NQ_NP_891864-MLB92442288931_092025-O-luva-de-goleiro-poker-profissional-futebol-original-grip-top.webp
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