/* Cart page */
document.addEventListener("DOMContentLoaded", renderCartPage);

function renderCartPage() {
  const cart = Store.cart();
  const empty = document.getElementById("cartEmpty");
  const filled = document.getElementById("cartFilled");
  if (!cart.length) {
    empty.classList.remove("hidden");
    filled.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  filled.classList.remove("hidden");

  document.getElementById("cartItems").innerHTML = cart.map(item => {
    const p = productById(item.id);
    if (!p) return "";
    return '' +
    '<div class="cart-item" data-id="' + p.id + '" data-color="' + item.color + '" data-size="' + item.size + '">' +
      '<a href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt="' + p.name + '"></a>' +
      '<div>' +
        '<a class="c-name" href="product.html?id=' + p.id + '">' + p.no + " " + p.name + "</a>" +
        '<div class="c-meta">' + item.color + " / " + item.size + "</div>" +
        '<div class="qty-control" style="transform:scale(.85);transform-origin:left">' +
          '<button class="c-minus" aria-label="decrease">−</button>' +
          '<input class="c-qty" type="text" value="' + item.qty + '" inputmode="numeric" aria-label="quantity">' +
          '<button class="c-plus" aria-label="increase">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="c-right">' +
        '<div class="c-price">' + money(p.price * item.qty) + "</div>" +
        '<button class="link-btn c-remove" data-i18n="cart.remove">Remove</button>' +
      '</div>' +
    '</div>';
  }).join("");

  const subtotal = cart.reduce((s, i) => {
    const p = productById(i.id);
    return p ? s + p.price * i.qty : s;
  }, 0);
  document.getElementById("cartSubtotal").textContent = money(subtotal);
  document.getElementById("cartTotal").textContent = money(subtotal);

  // whatsapp checkout with order summary
  const lines = cart.map(i => {
    const p = productById(i.id);
    return p ? "• " + p.no + " " + p.name + " — " + i.color + " / " + i.size + " × " + i.qty + " = " + money(p.price * i.qty) : "";
  }).filter(Boolean);
  const msg = "Hello Lumimaya! I'd like to place an order:\n" + lines.join("\n") +
    "\nSubtotal: " + money(subtotal) + "\nPlease confirm availability and shipping. Thank you!";
  document.getElementById("checkoutBtn").href = whatsappLink(msg);

  document.querySelectorAll(".cart-item").forEach(row => {
    const id = Number(row.dataset.id), color = row.dataset.color, size = row.dataset.size;
    const qtyInput = row.querySelector(".c-qty");
    row.querySelector(".c-minus").addEventListener("click", () => {
      const q = Math.max(1, (parseInt(qtyInput.value) || 1) - 1);
      Store.setQty(id, color, size, q);
      renderCartPage();
    });
    row.querySelector(".c-plus").addEventListener("click", () => {
      Store.setQty(id, color, size, (parseInt(qtyInput.value) || 1) + 1);
      renderCartPage();
    });
    qtyInput.addEventListener("change", () => {
      Store.setQty(id, color, size, Math.max(1, parseInt(qtyInput.value) || 1));
      renderCartPage();
    });
    row.querySelector(".c-remove").addEventListener("click", () => {
      Store.removeFromCart(id, color, size);
      renderCartPage();
    });
  });
}
