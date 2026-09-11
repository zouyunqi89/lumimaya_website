/* Cart & wishlist storage (localStorage) */
const Store = {
  read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  },
  write(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  cart() { return this.read("lumimaya-cart"); },
  addToCart(id, color, size, qty) {
    const cart = this.cart();
    const found = cart.find(i => i.id === id && i.color === color && i.size === size);
    if (found) found.qty += qty;
    else cart.push({ id, color, size, qty });
    this.write("lumimaya-cart", cart);
    updateCartBadge();
  },
  setQty(id, color, size, qty) {
    let cart = this.cart();
    const item = cart.find(i => i.id === id && i.color === color && i.size === size);
    if (!item) return;
    item.qty = Math.max(1, qty);
    this.write("lumimaya-cart", cart);
    updateCartBadge();
  },
  removeFromCart(id, color, size) {
    this.write("lumimaya-cart", this.cart().filter(i => !(i.id === id && i.color === color && i.size === size)));
    updateCartBadge();
  },
  clearCart() { this.write("lumimaya-cart", []); updateCartBadge(); },
  cartCount() { return this.cart().reduce((s, i) => s + i.qty, 0); },

  wishlist() { return this.read("lumimaya-wishlist"); },
  inWishlist(id) { return this.wishlist().includes(id); },
  toggleWishlist(id) {
    let w = this.wishlist();
    if (w.includes(id)) w = w.filter(x => x !== id);
    else w.push(id);
    this.write("lumimaya-wishlist", w);
    return w.includes(id);
  }
};

function updateCartBadge() {
  const n = Store.cartCount();
  document.querySelectorAll(".badge").forEach(b => {
    b.textContent = n;
    b.classList.toggle("hidden", n === 0);
  });
}

function productById(id) { return PRODUCTS.find(p => p.id === Number(id)); }

function money(n) { return t("p.rm") + " " + n.toFixed(2); }

function whatsappLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
