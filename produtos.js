// Fazendo a requisição para a API do JSON Server
fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('product-list');

    // Criando os cards de produtos dinamicamente
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col-lg-3', 'col-md-6', 'wow', 'fadeInUp');
      productCard.setAttribute('data-wow-delay', '0.1s');

      productCard.innerHTML = `
        <div class="product-item bg-light text-center p-4">
            <img class="img-fluid mb-4" src="${product.image}" alt="${product.name}">
            <h5 class="mb-0">${product.name}</h5>
            <p class="price mt-2">R$ ${product.price.toFixed(2)}</p>
            <p class="rating">Avaliação: ${product.rating} estrelas (${product.reviews} avaliações)</p>
            <a href="${product.url}" class="btn btn-primary mt-3">Ver Mais</a>
            <button class="btn btn-secondary mt-2 add-to-cart-btn">Adicionar ao Carrinho</button>
        </div>
      `;

      productList.appendChild(productCard);

      // Adicionando o evento de clique para salvar o produto no carrinho e redirecionar
      const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
      addToCartBtn.addEventListener('click', () => {
        addToCart(product); // Passa o produto correto para a função addToCart
        window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
      });
    });
  })
  .catch(error => console.error('Erro ao carregar produtos:', error));

// Função para adicionar o item ao localStorage
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o item já existe no carrinho
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // Incrementa a quantidade se o produto já estiver no carrinho
    } else {
        cartItems.push({ ...product, quantity: 1 }); // Adiciona o produto ao carrinho com quantidade 1
    }

    // Atualiza o localStorage com os novos itens
    localStorage.setItem('cart', JSON.stringify(cartItems));
}


