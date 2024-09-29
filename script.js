// Função para carregar o arquivo JSON
function carregarProduto() {
    return fetch('produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        });
}

// Função para exibir todos os produtos em forma de lista
function listarProdutos() {
    carregarProduto().then(produtos => {
        const main = document.querySelector('main');
        const section = document.querySelector('section');
        section.style.display = 'none'; // Oculta a seção de detalhes do produto

        const listaProdutos = document.createElement('div'); // Cria um container para os produtos
        listaProdutos.classList.add('lista-produtos'); // Adiciona uma classe para estilização

        produtos.forEach(produto => {
            const produtoBox = document.createElement('div'); // Cria uma caixa para cada produto
            produtoBox.classList.add('produto-box'); // Adiciona uma classe para estilização

            // Adiciona o modelo e a marca
            const descricao = document.createElement('p');
            descricao.innerHTML = `${produto.modelo} - ${produto.marca}`;
            produtoBox.appendChild(descricao);

            // Adiciona a imagem
            const img = document.createElement('img');
            img.src = produto.imagens[0]; // Exibe a primeira imagem do produto
            img.alt = `${produto.modelo} ${produto.marca}`;
            produtoBox.appendChild(img);

            // Adiciona o código do produto
            const codigo = document.createElement('p');
            codigo.textContent = `Cód.: ${produto.id}`;
            produtoBox.appendChild(codigo);

            // Adiciona um link para acessar o produto específico
            const link = document.createElement('a');
            link.href = `?id=${produto.id}`;
            link.textContent = 'Ver detalhes';
            produtoBox.appendChild(link);

            listaProdutos.appendChild(produtoBox); // Adiciona a caixa do produto à lista
        });

        main.appendChild(listaProdutos); // Adiciona a lista de produtos ao main
    }).catch(error => {
        console.error(error);
    });
}

// Função para exibir a ficha técnica de um produto específico
function exibirFichaTecnica(id) {
    carregarProduto().then(produtos => {
        const produto = produtos.find(p => p.id === id);
        const titulo = document.getElementById('titulo');
        const fichaLista = document.getElementById('ficha-lista');
        const conteudoLista = document.getElementById('conteudo-lista');
        const recomendacaoLista = document.getElementById('recomendacao-lista');

        // Limpa o conteúdo anterior
        titulo.innerHTML = '';
        fichaLista.innerHTML = '';
        conteudoLista.innerHTML = '';
        recomendacaoLista.innerHTML = '';

        if (produto) {
            // Preenche os dados do produto
            titulo.innerHTML = `${produto.modelo} ${produto.marca}`;
            imagens = produto.imagens; // Atribui a lista de imagens do produto
            imagemIndex = 0; // Começa com a primeira imagem
            atualizarImagem(); // Exibe a imagem atual

            // Adiciona os dados do produto à lista dinamicamente
            const especificacoes = produto.especificacoes;
            for (const chave in especificacoes) {
                fichaLista.innerHTML += `<li><span class="nome">${chave.charAt(0).toUpperCase() + chave.slice(1)}</span> <span class="valor">${especificacoes[chave]}</span></li>`;
            }

            const conteudo = produto.conteudo;
            for (const chave in conteudo){
                conteudoLista.innerHTML += `<li>${conteudo[chave]}</li>`;
            }

            const recomendacao = produto.recomendacao;
            for (const chave in recomendacao){
                recomendacaoLista.innerHTML += `<li>${recomendacao[chave]}</li>`;
            }
        } else {
            titulo.innerHTML = 'Produto não encontrado';
        }
    }).catch(error => {
        console.error(error);
        document.getElementById('ficha-tecnica').innerHTML = '<p>Erro ao carregar a ficha técnica.</p>';
    });
}

// Função para mudar a imagem
function mudarImagem(direcao) {
    imagemIndex += direcao;

    // Impede que o índice saia dos limites da lista
    if (imagemIndex < 0) {
        imagemIndex = imagens.length - 1;
    } else if (imagemIndex >= imagens.length) {
        imagemIndex = 0;
    }
    atualizarImagem();
}

// Função para atualizar a imagem exibida
function atualizarImagem() {
    const produtoImagem = document.getElementById('produto-imagem');
    produtoImagem.src = imagens[imagemIndex];
}

// Função para obter o ID do produto da URL
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Busca o parâmetro "id" na URL
}

// Função para filtrar produtos com base no tipo selecionado
// Função para filtrar produtos com base no tipo selecionado
function filtrarProdutos() {
    const tipoSelecionado = document.getElementById('filtro').value; // Obtém o tipo selecionado
    carregarProduto().then(produtos => {
        const main = document.querySelector('main');
        const listaProdutos = document.createElement('div');
        listaProdutos.classList.add('lista-produtos');

        // Filtra os produtos com base no tipo selecionado
        const produtosFiltrados = produtos.filter(produto => {
            return tipoSelecionado === 'todos' || produto.tipo === tipoSelecionado;
        });

        // Atualiza a mensagem com a quantidade de produtos encontrados
        const mensagemQuantidade = document.getElementById('mensagem-quantidade');
        if (tipoSelecionado !== "todos") {
            mensagemQuantidade.textContent = `Foram encontrados ${produtosFiltrados.length} item(s).`;
        }else{
            mensagemQuantidade.textContent = '';
        }

        // Adiciona os produtos filtrados
        produtosFiltrados.forEach(produto => {
            const produtoBox = document.createElement('div');
            produtoBox.classList.add('produto-box');

            const descricao = document.createElement('p');
            descricao.innerHTML = `${produto.modelo} - ${produto.marca}`;
            produtoBox.appendChild(descricao);

            const img = document.createElement('img');
            img.src = produto.imagens[0];
            img.alt = `${produto.modelo} ${produto.marca}`;
            produtoBox.appendChild(img);

            const codigo = document.createElement('p');
            codigo.textContent = `Cód.: ${produto.id}`;
            produtoBox.appendChild(codigo);

            const link = document.createElement('a');
            link.href = `?id=${produto.id}`;
            link.textContent = 'Ver detalhes';
            produtoBox.appendChild(link);

            listaProdutos.appendChild(produtoBox);
        });

        // Limpa produtos antigos
        const listaAntiga = main.querySelector('.lista-produtos');
        if (listaAntiga) {
            main.removeChild(listaAntiga);
        }

        main.appendChild(listaProdutos);
    }).catch(error => {
        console.error(error);
    });
}





// Chama a função ao carregar a página
window.onload = function() {
    const produtoId = getIdFromUrl(); // Obtém o ID da URL
    if (produtoId) {
        exibirFichaTecnica(produtoId); // Exibe a ficha técnica do produto correspondente
        document.getElementById("btn-voltar").style.display = "block";
    } else {
        listarProdutos(); // Lista todos os produtos se o ID não for fornecido
        document.getElementById("filtro").style.display = "block";
    }
};
