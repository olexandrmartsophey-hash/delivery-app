import { createOrder } from './api.js';

const cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('submit').onclick = async () => {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  if (!email || !phone || !address) {
    alert('Fill all fields');
    return;
  }

  await createOrder({ email, phone, address, items: cart });

  localStorage.removeItem('cart');
  alert('Order placed!');
};