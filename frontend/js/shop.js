import { getProducts } from './api.js';

let page = 1;
let loading = false;
let currentSort = '';
let currentCategory = '';

const container = document.getElementById('products');
const sortSelect = document.getElementById('sort');
const categorySelect = document.getElementById('category');

async function loadProducts(reset = false) {
  if (loading) return;
  loading = true;

  if (reset) {
    page = 1;
    container.innerHTML = '';
  }

  const params = { page, limit: 10 };
  if (currentSort) params.sort = currentSort;
  if (currentCategory) params.category = currentCategory;

  const products = await getProducts(params);

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  page++;
  loading = false;
}


window.addToCart = (id, name, price) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(c => c._id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ _id: id, name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
};

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  loadProducts(true);
});

categorySelect.addEventListener('change', (e) => {
  currentCategory = e.target.value;
  loadProducts(true);
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadProducts();
  }
});


loadProducts();
