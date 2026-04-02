const API = 'https://delivery-app-efr7.onrender.com/';

export const getProducts = (params) => {
  return fetch(`${API}/products?${new URLSearchParams(params)}`)
    .then(res => res.json());
};

export const createOrder = (data) => {
  return fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

export const getOrders = (params) => {
  return fetch(`${API}/orders?${new URLSearchParams(params)}`)
    .then(res => res.json());
};
