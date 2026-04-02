import { createOrder } from './api.js';

const cart = JSON.parse(localStorage.getItem('cart')) || [];


const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
document.getElementById('total-display').innerText = `Estimated Total: $${total}`;

document.getElementById('submit').onclick = async () => {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const couponCode = document.getElementById('coupon').value;

  if (!email || !phone || !address) {
    alert('Please fill all required fields');
    return;
  }

  const response = await createOrder({ 
    email, 
    phone, 
    address, 
    items: cart,
    couponCode // Передаем код купона
  });

  if (response.ok) {
    const result = await response.json();
    alert(`Order placed! Final price with discount: $${result.totalPrice}`);
    localStorage.removeItem('cart');
    window.location.href = 'history.html';
  }
};
