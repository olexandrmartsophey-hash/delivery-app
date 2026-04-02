const API = 'https://delivery-app-efr7.onrender.com/api';
const container = document.getElementById('coupons-container');

async function loadCoupons() {
  try {
    const response = await fetch(`${API}/coupons`);
    const coupons = await response.json();

    if (!coupons || coupons.length === 0) {
      container.innerHTML = "<p>No coupons available right now.</p>";
      return;
    }

    // Отрисовываем карточки купонов
    container.innerHTML = coupons.map(c => `
      <div class="product-card" style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; text-align: center; background: #fff;">
        <h3>${c.name}</h3>
        <p><strong>Code:</strong> <span class="coupon-code">${c.code}</span></p>
        <p>Discount: ${c.discount}%</p>
        <button class="copy-btn" onclick="copyCode('${c.code}')" 
                style="background: #e67e22; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; width: 100%;">
          Copy Code
        </button>
      </div>
    `).join('');
  } catch (err) {
    console.error("Failed to load coupons:", err);
    container.innerHTML = "<p>Error loading coupons. Please try again later.</p>";
  }
}

window.copyCode = (code) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert(`Coupon code "${code}" copied to clipboard!`);
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
};

loadCoupons();