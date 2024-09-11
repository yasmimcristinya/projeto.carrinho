document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Recupera os itens do carrinho do localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Inicializa o total do carrinho
    let total = 0;

    // Adiciona cada item ao carrinho
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <input type="number" class="quantity-input form-control" data-id="${item.id}" value="${item.quantity}" min="1" style="width: 80px;">
            </td>
            <td>R$ ${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-from-cart-btn" data-id="${item.id}">Remover</button>
            </td>
        `;

        cartItemsContainer.appendChild(cartItemRow);
    });

    // Atualiza o total do carrinho
    cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Adiciona os eventos de alteração de quantidade e remoção de itens
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const productId = parseInt(input.getAttribute('data-id'));
            const newQuantity = parseInt(input.value);
            updateQuantity(productId, newQuantity);
        });
    });

    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
});

// Função para atualizar a quantidade de um item
function updateQuantity(productId, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems = cartItems.map(item => {
        if (item.id === productId) {
            item.quantity = Math.max(newQuantity, 1); // Garante que a quantidade mínima seja 1
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Atualiza o localStorage

    // Recarrega a página para atualizar a exibição do carrinho
    location.reload();
}

// Função para remover o item do carrinho
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtra o item a ser removido
    cartItems = cartItems.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Atualiza o localStorage com os itens restantes

    // Recarrega a página para atualizar a exibição do carrinho
    location.reload();
}

