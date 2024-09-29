function carregarProduto() {
    return fetch('produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        });
}

// Função para exibir informações do produto
function exibirFichaTecnica(id) {
    carregarProduto().then(produtos => {
        const produto = produtos.find(p => p.id === id);
        const titulo = document.getElementById('titulo');
        const imagem = document.getElementById('imagem');
        const fichaLista = document.getElementById('ficha-lista');

        titulo.innerHTML = `${produto.modelo} ${produto.marca}`;
        imagem.innerHTML = `<img src="${produto.imagem}" alt="Imagem do Produto">`;

        // Limpa a lista existente
        fichaLista.innerHTML = '';

        if (produto) {
            // Adiciona os dados do produto à lista
            // Adiciona os dados do produto à lista
            fichaLista.innerHTML += `<li><span class="nome">Tensão</span> <span class="valor">${produto.tensao}V</span></li>`;
            fichaLista.innerHTML += `<li><span class="nome">Voltagem</span> <span class="valor">${produto.voltagem}</span></li>`;
            fichaLista.innerHTML += `<li><span class="nome">Mandril</span> <span class="valor">${produto.mandril}mm</span></li>`;
            fichaLista.innerHTML += `<li><span class="nome">Torque</span> <span class="valor">${produto.torque}nm</span></li>`;
            fichaLista.innerHTML += `<li><span class="nome">RPM</span> <span class="valor">${produto.rpm}</span></li>`;
            fichaLista.innerHTML += `<li><span class="nome">Bateria</span> <span class="valor">${produto.bateria}Ah</span></li>`;

        } else {
            fichaLista.innerHTML = '<li>Produto não encontrado.</li>';
        }
    }).catch(error => {
        console.error(error);
        document.getElementById('ficha-tecnica').innerHTML = '<p>Erro ao carregar a ficha técnica.</p>';
    });
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