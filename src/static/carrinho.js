// Carrinho JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Carrinho JS carregado!");

    // ========== REMOVER SELECIONADOS ==========
    const btnRemover = document.getElementById('remover-selecionados');
    if (btnRemover) {
        btnRemover.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox:checked');
            if (checkboxes.length === 0) {
                alert('Selecione pelo menos um item para remover.');
                return;
            }

            const itemIds = Array.from(checkboxes).map(cb => cb.value);

            // Remover um por um
            let removidos = 0;
            itemIds.forEach(itemId => {
                fetch(`/carrinho/remover/${itemId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Remover o item do DOM
                        const itemDiv = document.querySelector(`.carrinho-item[data-item-id="${itemId}"]`);
                        if (itemDiv) {
                            itemDiv.remove();
                        }
                        removidos++;
                        if (removidos === itemIds.length) {
                            alert(data.mensagem);
                            // Recarregar a página para atualizar a lista
                            location.reload();
                        }
                    } else {
                        alert('Erro: ' + data.mensagem);
                    }
                })
                .catch(error => {
                    console.error('Erro ao remover item:', error);
                    alert('Erro ao remover item. Tente novamente.');
                });
            });
        });
    }

    // ========== COMPRAR SELECIONADOS ==========
    const btnComprar = document.getElementById('comprar-selecionados');
    if (btnComprar) {
        btnComprar.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox:checked');
            if (checkboxes.length === 0) {
                alert('Selecione pelo menos um item para comprar.');
                return;
            }

            // Placeholder para funcionalidade de compra
            alert('Funcionalidade de compra em desenvolvimento! Itens selecionados: ' + checkboxes.length);
        });
    }
});
