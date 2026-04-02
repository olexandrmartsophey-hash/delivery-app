import { createOrder } from './api.js';

const cartContainer = document.getElementById('cart-items');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.style = "border: 1px solid #ccc; padding: 10px; display: flex; justify-content: space-between;";
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    total += item.price * item.quantity;
    cartContainer.appendChild(div);
  });

  document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}


document.getElementById('submit').onclick = async () => {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const couponCode = document.getElementById('coupon').value;

  if (!email || !phone || !address || cart.length === 0) {
    alert('Please fill all fields and add items to cart');
    return;
  }

  const response = await createOrder({ email, phone, address, items: cart, couponCode });
  const result = await response.json();

  alert(`Order #${result._id} placed! Total to pay: $${result.totalPrice}`);
  localStorage.removeItem('cart');
  window.location.href = 'history.html';
};

renderCart();
