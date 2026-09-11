/* Shared behavior: language, nav, cart badge, subscribe, WhatsApp float, product cards, carousels */
document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  updateCartBadge();

  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // WhatsApp floating button
  const waFloat = document.getElementById("waFloat");
  if (waFloat) waFloat.href = whatsappLink("Hello Lumimaya! I have a question about your products.");

  // footer newsletter
  const subForm = document.getElementById("subscribeForm");
  if (subForm) {
    subForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = subForm.querySelector("input[type='email']");
      const msg = document.getElementById("subscribeMsg");
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      msg.textContent = t(ok ? "footer.subok" : "footer.suberr");
      msg.className = "subscribe-msg " + (ok ? "ok" : "err");
      if (ok) input.value = "";
    });
  }

  initHero();
  renderCarousels();
  refreshWishButtons();
});

/* ---------- hero carousel ---------- */
function initHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;
  const slides = hero.querySelector(".hero-slides");
  const dots = hero.querySelectorAll(".hero-dots button");
  let idx = 0, timer;
  const n = dots.length;
  function go(i) {
    idx = (i + n) % n;
    slides.style.transform = "translateX(-" + idx * 100 + "%)";
    dots.forEach((d, j) => d.classList.toggle("active", j === idx));
  }
  dots.forEach((d, i) => d.addEventListener("click", () => { go(i); restart(); }));
  function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5000); }
  restart();
}

/* ---------- home carousels (What's New / Best Seller) ---------- */
function cardHtml(p) {
  const hex = c => COLOR_HEX[c] || "#ccc";
  const swatches = p.colors.map(c =>
    c === "multicolor"
      ? '<span class="swatch multi"></span>'
      : '<span class="swatch" style="background:' + hex(c) + '"></span>'
  ).join("");
  const wished = Store.inWishlist(p.id) ? " active" : "";
  return '' +
  '<div class="product-card" data-id="' + p.id + '">' +
    '<a class="p-img" href="product.html?id=' + p.id + '">' +
      '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
      (p.isNew ? '<span class="p-tag">New</span>' : '') +
    '</a>' +
    '<button class="p-wish' + wished + '" data-wish="' + p.id + '" aria-label="wishlist">♥</button>' +
    '<div class="p-info">' +
      '<div class="p-no">' + p.no + '</div>' +
      '<a class="p-name" href="product.html?id=' + p.id + '">' + p.name + '</a>' +
      '<div class="p-meta">' + p.fabric + '</div>' +
      '<div class="p-colors">' + swatches + '</div>' +
      '<div class="p-price">' + money(p.price) + '</div>' +
      '<div class="p-actions">' +
        '<button class="btn btn-gold" data-addcart="' + p.id + '">' + t("p.addcart") + '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderCarousels() {
  document.querySelectorAll("[data-carousel]").forEach(wrap => {
    const kind = wrap.dataset.carousel;
    const track = wrap.querySelector(".carousel");
    let list = kind === "new" ? PRODUCTS.filter(p => p.isNew) : PRODUCTS.filter(p => p.isBestSeller);
    if (kind === "new" && list.length < 4) list = PRODUCTS.slice(0, 6);
    track.innerHTML = list.map(cardHtml).join("");
    bindCardButtons(track);
    const prev = wrap.querySelector(".carousel-arrow.prev");
    const next = wrap.querySelector(".carousel-arrow.next");
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -440, behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: 440, behavior: "smooth" }));
  });
}

/* wishlist + add-to-cart for dynamically rendered cards */
function bindCardButtons(root) {
  root.querySelectorAll("[data-addcart]").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = productById(btn.dataset.addcart);
      Store.addToCart(p.id, p.colors[0], p.sizes[Math.min(2, p.sizes.length - 1)], 1);
      btn.textContent = "✓ " + t("p.addcart");
      setTimeout(() => { btn.textContent = t("p.addcart"); }, 1200);
    });
  });
  root.querySelectorAll("[data-wish]").forEach(btn => {
    btn.addEventListener("click", () => {
      const on = Store.toggleWishlist(Number(btn.dataset.wish));
      btn.classList.toggle("active", on);
      document.dispatchEvent(new CustomEvent("wishchange"));
    });
  });
}

function refreshWishButtons() {
  document.querySelectorAll("[data-wish]").forEach(btn => {
    btn.classList.toggle("active", Store.inWishlist(Number(btn.dataset.wish)));
  });
}
