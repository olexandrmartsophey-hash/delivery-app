import { getOrders } from './api.js';

document.getElementById('find').onclick = async () => {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  const orders = await getOrders({ email, phone });

  const container = document.getElementById('orders');
  container.innerHTML = '';

  orders.forEach(order => {
    const div = document.createElement('div');

    const btn = document.createElement('button');
    btn.innerText = 'Reorder';

    btn.onclick = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      order.items.forEach(item => {
        const existing = cart.find(c => c._id === item._id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          cart.push(item);
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    };

    div.appendChild(btn);
    container.appendChild(div);
  });
};