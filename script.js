let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.getElementById('cartIcon');
const cartItemCount = document.getElementById('cartItemCount');
const cartSection = document.getElementById('cart');
const cartItemsDiv = document.getElementById('cartItems');
const totalPriceDiv = document.getElementById('totalPrice');
const closeCartButton = document.getElementById('closeCart');
const emptyCartButton = document.getElementById('emptyCart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    console.log(item);
    cartItemsDiv.innerHTML += `
    <div>
      <div class="cart-item">
        <img src=${item.img} alt="Placeholder Image">
        <div class="item-details">
          <h4>${item.name}</h4>
          <div class="item-quantity">
          <buttton>+</buttton>  
          <span>${item.quantity}</span>
          <buttton>-</buttton>
          </div>
          <p class="item-price">$${item.price * item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${item.id})" class="remove-item">❌</button>
      </div>
    </div>`;
    total += item.price * item.quantity;
  });
  totalPriceDiv.textContent = total;
  cartItemCount.textContent = cart.length;
}

cartIcon.addEventListener('click', () => cartSection.classList.toggle('open'));
closeCartButton.addEventListener('click', () => cartSection.classList.remove('open'));
emptyCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const img = button.dataset.img;
  
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, img, quantity: 1 });
        console.log(cart);
      }

      console.log(name, price, img);
  
      updateCart();
    });
  });
  
renderCart();

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}
