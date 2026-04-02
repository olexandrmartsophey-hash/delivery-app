import { getProducts } from './api.js';

let page = 1;
let loading = false;

const container = document.getElementById('products');

async function loadProducts() {
  if (loading) return;
  loading = true;

  const products = await getProducts({ page, limit: 10 });

  products.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `${p.name} - ${p.price}`;
    container.appendChild(div);
  });

  page++;
  loading = false;
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadProducts();
  }
});

loadProducts();