const data = {
    produtos: [
        {
            id: 1,
            nome: "Pacote Paris",
            preco: 7999.90,
            categoria: "Internacional",
            imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            descricao: "Pacote de 7 dias em Paris com hotel incluso.",
            emEstoque: true
        },

        {
            id: 2,
            nome: "Pacote Rio de Janeiro",
            preco: 2499.90,
            categoria: "Nacional",
            imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
            descricao: "Viagem para o Rio com café da manhã incluso.",
            emEstoque: true
        },

        {
            id: 3,
            nome: "Pacote Japão",
            preco: 12000,
            categoria: "Internacional",
            imagem: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
            descricao: "Conheça Tóquio e Osaka em uma viagem incrível.",
            emEstoque: false
        },

        {
            id: 4,
            nome: "Pacote Gramado",
            preco: 1899.99,
            categoria: "Nacional",
            imagem: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
            descricao: "Pacote romântico para Gramado.",
            emEstoque: true
        },

        {
            id: 5,
            nome: "Pacote Disney",
            preco: 15999.90,
            categoria: "Família",
            imagem: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9",
            descricao: "Diversão garantida em Orlando e Disney.",
            emEstoque: true
        },

        {
            id: 6,
            nome: "Pacote Chile",
            preco: 5499.90,
            categoria: "Internacional",
            imagem: "https://images.unsplash.com/photo-1544989164-31ad8c645987",
            descricao: "Viagem com passeio na neve e vinícolas.",
            emEstoque: true
        },

        {
            id: 7,
            nome: "Pacote Nordeste",
            preco: 3299.90,
            categoria: "Praia",
            imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            descricao: "Conheça as praias do Nordeste brasileiro.",
            emEstoque: true
        },

        {
            id: 8,
            nome: "Pacote Cancun",
            preco: 8999.90,
            categoria: "Praia",
            imagem: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
            descricao: "Pacote all inclusive em Cancun.",
            emEstoque: false
        }
    ]
};

// Seleção de elementos
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

const btnRender = document.getElementById("btnRender");

// Função para formatar preço
function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// Criar card
function createProductCard(produto) {

    const card = document.createElement("div");

    card.classList.add("card");

    card.setAttribute("data-id", produto.id);

    // style obrigatório
    card.style.backgroundColor = "#ffffff";

    const image = document.createElement("img");
    image.src = produto.imagem;

    const title = document.createElement("h3");
    title.innerText = produto.nome;

    const price = document.createElement("p");
    price.innerText = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.innerText = produto.categoria;

    const detailsButton = document.createElement("button");
    detailsButton.innerText = "Ver detalhes";

    const highlightButton = document.createElement("button");
    highlightButton.innerText = "Destacar";

    // Evento detalhes
    detailsButton.addEventListener("click", function () {
        showProductDetails(produto);
    });

    // Evento destaque
    highlightButton.addEventListener("click", function () {
        card.classList.toggle("highlight");
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(detailsButton);
    card.appendChild(highlightButton);

    return card;
}

// Renderizar produtos
function renderProducts(produtos) {

    productList.innerHTML = "";

    produtos.forEach(function (produto) {

        const card = createProductCard(produto);

        productList.appendChild(card);
    });

    // querySelectorAll obrigatório
    const allCards = document.querySelectorAll(".card");

    allCards.forEach(function (card) {

        console.log("Card ID:", card.getAttribute("data-id"));

        card.style.transition = "0.3s";
    });
}

// Renderizar categorias
function renderCategories() {

    const categorias = [];

    data.produtos.forEach(function (produto) {

        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function (categoria) {

        const option = document.createElement("option");

        option.value = categoria;

        option.innerText = categoria;

        categorySelect.appendChild(option);
    });
}

// Mostrar detalhes
function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>

        <img src="${produto.imagem}" width="100%">

        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

        <p><strong>Categoria:</strong> ${produto.categoria}</p>

        <p><strong>Estoque:</strong> 
        ${produto.emEstoque ? "Disponível" : "Indisponível"}
        </p>

        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// Filtrar produtos
function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categorySelect.value;

    const filtered = data.produtos.filter(function (produto) {

        const matchName = produto.nome
            .toLowerCase()
            .includes(searchText);

        const matchCategory =
            selectedCategory === "Todas" ||
            produto.categoria === selectedCategory;

        return matchName && matchCategory;
    });

    return filtered;
}

// Eventos
searchInput.addEventListener("input", function () {

    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {

    renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {

    renderProducts(filterProducts());
});

// Inicialização
renderCategories();

renderProducts(data.produtos);