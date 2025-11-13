// Produto Detalhes JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Produto Detalhes JS carregado!");

    // ========== BOTÃO COMPRAR ==========
    const btnComprar = document.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', function() {
            alert('Funcionalidade de compra em desenvolvimento!');
        });
    }

    // ========== IMAGEM DO CARRINHO ==========
    const imgCarrinho = document.querySelector('.acoes img[alt="Carrinho"]');
    if (imgCarrinho) {
        const produtoId = imgCarrinho.getAttribute('data-produto-id');
        if (!produtoId) {
            console.error('Erro: ID do produto não encontrado.');
            return;
        }

        // Verificar estado inicial do carrinho
        verificarEstadoCarrinho(produtoId);

        imgCarrinho.addEventListener('click', function() {
            toggleCarrinho(produtoId);
        });
    }

    // Função para verificar se o produto está no carrinho
    function verificarEstadoCarrinho(produtoId) {
        fetch(`/carrinho/verificar/${produtoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.no_carrinho) {
                // Produto está no carrinho, mostrar imagem "remover" (ex: curtido.png)
                imgCarrinho.src = '/static/img/cartp.png'; // Substitua pelo PNG desejado
            } else {
                // Produto não está no carrinho, mostrar imagem padrão (ex: cart.png)
                imgCarrinho.src = '/static/img/cart.png'; // Substitua pelo PNG padrão
            }
        })
        .catch(error => {
            console.error('Erro ao verificar carrinho:', error);
        });
    }

    // Função para adicionar ou remover do carrinho
    function toggleCarrinho(produtoId) {
        fetch(`/carrinho/verificar/${produtoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.no_carrinho) {
                // Produto está no carrinho, remover
                fetch(`/carrinho/remover/${data.item_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.mensagem);
                        // Atualizar imagem para padrão
                        imgCarrinho.src = '/static/img/cart.png';
                    } else {
                        alert('Erro: ' + data.mensagem);
                    }
                })
                .catch(error => {
                    console.error('Erro ao remover do carrinho:', error);
                    alert('Erro ao remover do carrinho. Tente novamente.');
                });
            } else {
                // Produto não está no carrinho, adicionar
                fetch(`/carrinho/adicionar/${produtoId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.mensagem);
                        // Atualizar imagem para "no carrinho"
                        imgCarrinho.src = '/static/img/cartp.png';
                    } else {
                        alert('Erro: ' + data.mensagem);
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar ao carrinho:', error);
                    alert('Erro ao adicionar ao carrinho. Tente novamente.');
                });
            }
        })
        .catch(error => {
            console.error('Erro ao verificar carrinho:', error);
            alert('Erro ao verificar carrinho. Tente novamente.');
        });
    }
});
