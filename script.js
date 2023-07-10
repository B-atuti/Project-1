// Landing Page
document.addEventListener('DOMContentLoaded', () => {
  const startShoppingButton = document.querySelector('.start-shopping');

  if (startShoppingButton) {
    startShoppingButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

// User Profile
const userProfile = document.querySelector('.user-profile');
const loginPage = document.querySelector('.login-page');
const closeLogin = document.querySelector('.close-login');

userProfile.addEventListener('click', () => {
  loginPage.classList.add('active');
});
closeLogin.addEventListener('click', () => {
  loginPage.classList.remove('active');
});

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

// Fetch the products data from the JSON file
fetch('db1.json')
  .then(response => response.json())
  .then(data => {
    const products = data.product;
    let cart = [];

    products.forEach((product) => {
      const listItem = document.createElement('li');
      const productImage = document.createElement('img');
      productImage.src = product.image;
      const productName = document.createElement('h2');
      productName.textContent = product.name;
      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price.toFixed(2)}`;
      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.addEventListener('click', () => {
        addToCart(product.id - 1);
      });
      

      // Append the product elements to the list item
      listItem.appendChild(productImage);
      listItem.appendChild(productName);
      listItem.appendChild(productPrice);
      listItem.appendChild(addToCartButton);

      // Append the list item to the product list
      list.appendChild(listItem);
    });

    function addToCart(productId) {
      const product = products[productId];
      const existingCartItem = cart.find(item => item.id === product.id);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } 
      else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price:product.price,
            quantity: 1
        });
      }
      updateCart();
    }

    function updateCart() {
      listCard.innerHTML = '';

      cart.forEach((product) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
          <img src="${product.image}"/>
          <div class="title">${product.name}</div>
          <div class="price">$${product.price.toFixed(2)}</div>
          <div class="quantity">
              <button onclick="changeQuantity(${product.id}, ${product.quantity - 1})">-</button>
              <div class="count" id="quantity-${product.id}">${product.quantity}</div>
              <button onclick="changeQuantity(${product.id}, ${product.quantity + 1})">+</button>
          </div>
        `;

        listCard.appendChild(cartItem);
      });
      const cartCount = document.querySelector('.shopping span');
      cartCount.textContent = cart.length;

      updateTotal();
    }

    function updateTotal() {
      let totalPrice = 0;

      cart.forEach((product) => {
        totalPrice += product.price * product.quantity; 
      });

      total.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function changeQuantity(productId, newQuantity) {
        const cartItem =cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity = newQuantity;
            const quantityElement =document.getElementById(`quantity-${productId}`);
            
            if (quantityElement) {
                quantityElement.textContent = newQuantity;
            }
            updateTotal();
            if (newQuantity === 0) {
                removeCartItem(productId);
            }
            updateCart();
        }
    }
    function removeCartItem(productId) {
        cart = cart.filter(item =>item.id !== productId);
    }

    addToCart(0);

  }); 


  function flipCard() {
    const userCard = document.querySelector('.user-card');
    userCard.classList.toggle('flipped');
  }
  