//comentário

const apiUrl = ' https://ecom-back-strapi.onrender.com/api/products';
const token = ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwODUwOTgzLCJleHAiOjE3MzM0NDI5ODN9.P4yNshoaRS0AREBneqMUJ5kJSmG8AsYIFWRWVmzw5ig'; // Insira seu token aqui

//configuração de cabeçalhos
function configurarCabecalhos() {
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
}

//requisição para a api
async function buscarProdutos() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: configurarCabecalhos()
        });

        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.status);
        }

        const data = await response.json();
        return data.data; // Retorna os produtos
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return null; // Em caso de erro
    }
}

//exibição dos produtos 
function exibirProdutos(produtos) {
    const produtosContainer = document.getElementById('productsDiv');
    //produtosContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

    produtos.forEach(produto => {
        // Crie um elemento de produto
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('produto');

        // Adicione a imagem do produto
        const imagem = document.createElement('img');
        imagem.src = produto.attributes.imagens[0]; // Usa a primeira imagem
        imagem.alt = produto.nome;
        imagem.classList.add('produto-imagem');

        // Adicione o nome e preço do produto
        const nome = document.createElement('h2');
        nome.textContent = produto.attributes.nome;

        const preco = document.createElement('p');
        preco.textContent = `Preço: R$ ${produto.attributes.preco.toFixed(2)}`;

        // Adicione um botão de compra
        const botaoComprar = document.createElement('button');
        botaoComprar.textContent = 'Comprar';
        botaoComprar.className = "addCarrinho";
        botaoComprar.onclick = () => {
            // Aqui você pode adicionar lógica para o botão de compra
            alert(`Você comprou: ${produto.nome}`);
        };

        // Adicione os elementos ao container do produto
        productsDiv.appendChild(imagem);
        productsDiv.appendChild(nome);
        productsDiv.appendChild(preco);
        productsDiv.appendChild(botaoComprar);
        produtosContainer.appendChild(productsDiv);
    });
}


//função principal, inicio do fluxo 
async function iniciarApp() {
    const produtos = await buscarProdutos();
    console.log(produtos);
    if (produtos) {
        exibirProdutos(produtos);
    } else {
        console.error('Nenhum produto encontrado.');
    }
}

// Chame a função principal ao carregar a página
window.onload = iniciarApp;
