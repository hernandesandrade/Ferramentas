let imagemIndex = 0; // Índice atual da imagem
let imagens = [];

function carregarProduto() {
    return fetch('produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        });
}

/// Função para exibir informações do produto
function exibirFichaTecnica(id) {
    carregarProduto().then(produtos => {
        const produto = produtos.find(p => p.id === id);
        const titulo = document.getElementById('titulo');
        const produtoImagem = document.getElementById('produto-imagem');
        const fichaLista = document.getElementById('ficha-lista');
        const conteudoLista = document.getElementById('conteudo-lista');
        const recomendacaoLista = document.getElementById('recomendacao-lista');

        // Limpa o conteúdo anterior
        titulo.innerHTML = '';
        fichaLista.innerHTML = '';

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

// Chama a função ao carregar a página
window.onload = function() {
    const produtoId = getIdFromUrl(); // Obtém o ID da URL
    if (produtoId) {
        exibirFichaTecnica(produtoId); // Busca e exibe a ficha técnica do produto correspondente
    } else {
        document.getElementById('ficha-tecnica').innerHTML = '<p>ID do produto não fornecido na URL.</p>';
    }
};
