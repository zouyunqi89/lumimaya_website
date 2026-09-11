/* Product detail page */
let p = null;
let selColor = null, selSize = null;
let updateWaLink = () => {}; // replaced once the DOM is ready (see below)

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  p = productById(id);
  if (!p) {
    document.getElementById("notFound").classList.remove("hidden");
    return;
  }
  document.title = p.name + " — Lumimaya";
  selColor = p.colors[0];
  selSize = p.sizes.includes("M") ? "M" : p.sizes[0];

  document.getElementById("detailContent").classList.remove("hidden");
  renderDetail();

  // gallery: placeholder thumbnails show the same image until real photo sets exist
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = [0, 1, 2, 3].map(i =>
    '<img src="' + p.img + '" data-i="' + i + '" class="' + (i === 0 ? "active" : "") + '" alt="view ' + (i + 1) + '">'
  ).join("");
  thumbs.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
      thumbs.querySelectorAll("img").forEach(x => x.classList.remove("active"));
      img.classList.add("active");
      document.getElementById("mainImg").src = img.src;
    });
  });

  // collapsible blocks
  document.querySelectorAll(".detail-block h3").forEach(h => {
    h.addEventListener("click", () => h.parentElement.classList.toggle("collapsed"));
  });

  // qty
  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value) || 1) - 1);
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qtyInput.value = (parseInt(qtyInput.value) || 1) + 1;
  });
  qtyInput.addEventListener("change", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) || 1);
  });

  // add to cart
  document.getElementById("addCartBtn").addEventListener("click", () => {
    Store.addToCart(p.id, selColor, selSize, parseInt(qtyInput.value) || 1);
    const btn = document.getElementById("addCartBtn");
    btn.textContent = "✓ " + t("p.addcart");
    setTimeout(() => { btn.textContent = t("p.addcart"); }, 1200);
  });

  // whatsapp — link always reflects the current colour/size selection
  const waBtn = document.getElementById("waBtn");
  updateWaLink = () => {
    waBtn.href = whatsappLink("Hello Lumimaya! I'm interested in " + p.no + " " + p.name +
      " (colour: " + selColor + ", size: " + selSize + "). Is it available?");
  };
  updateWaLink();
  document.getElementById("swatchBtn").href = whatsappLink(
    "Hello Lumimaya! I'd like to order fabric swatches / the style handbook. Product: " + p.no + " " + p.name + ".");

  // wishlist
  const wishBtn = document.getElementById("wishBtn");
  const refreshWish = () => {
    const on = Store.inWishlist(p.id);
    wishBtn.classList.toggle("btn-teal", on);
    wishBtn.classList.toggle("btn-outline", !on);
    wishBtn.innerHTML = "♥ <span>" + t(on ? "p.wished" : "p.wish") + "</span>";
  };
  wishBtn.addEventListener("click", () => { Store.toggleWishlist(p.id); refreshWish(); });
  document.addEventListener("wishchange", refreshWish);
  document.addEventListener("langchange", () => { renderDetail(); refreshWish(); });
  refreshWish();

  // recommended pairings (same category or scene first, then best sellers, exclude self)
  let reco = PRODUCTS.filter(x => x.id !== p.id && (x.category === p.category || x.scene === p.scene));
  for (const b of PRODUCTS.filter(x => x.isBestSeller)) {
    if (reco.length >= 6) break;
    if (b.id !== p.id && !reco.includes(b)) reco.push(b);
  }
  reco = reco.slice(0, 6);
  const track = document.getElementById("recoTrack");
  track.innerHTML = reco.map(cardHtml).join("");
  bindCardButtons(track);
  const wrap = track.closest(".carousel-wrap");
  wrap.querySelector(".prev").addEventListener("click", () => track.scrollBy({ left: -440, behavior: "smooth" }));
  wrap.querySelector(".next").addEventListener("click", () => track.scrollBy({ left: 440, behavior: "smooth" }));
});

function renderDetail() {
  const hex = c => COLOR_HEX[c] || "#ccc";
  document.getElementById("mainImg").src = p.img;
  document.getElementById("mainImg").alt = p.name;
  document.getElementById("dNo").textContent = p.no;
  document.getElementById("dName").textContent = p.name;
  const catName = CATEGORIES.find(c => c.id === p.category);
  const sceneName = SCENES.find(s => s.id === p.scene);
  const lang = getLang();
  document.getElementById("dMeta").textContent = p.fabric + " | " +
    (lang === "zh" ? sceneName.zh : sceneName.en) + " | " + (lang === "zh" ? catName.zh : catName.en);
  document.getElementById("dPrice").textContent = money(p.price);
  document.getElementById("dDesc").textContent = p.desc;
  document.getElementById("dCare").innerHTML = p.care.map(c => "<li>" + c + "</li>").join("");

  document.getElementById("colorOpts").innerHTML = p.colors.map(c =>
    '<button class="opt-chip' + (c === selColor ? " selected" : "") + '" data-color="' + c + '">' +
    (c === "multicolor" ? "🎨 " : "") + c + "</button>"
  ).join("");
  document.getElementById("colorOpts").querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      selColor = b.dataset.color;
      document.getElementById("colorOpts").querySelectorAll("button").forEach(x => x.classList.toggle("selected", x === b));
      if (typeof updateWaLink === "function") updateWaLink();
    });
  });
  document.getElementById("sizeOpts").innerHTML = p.sizes.map(s =>
    '<button class="opt-chip' + (s === selSize ? " selected" : "") + '" data-size="' + s + '">' + s + "</button>"
  ).join("");
  document.getElementById("sizeOpts").querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      selSize = b.dataset.size;
      document.getElementById("sizeOpts").querySelectorAll("button").forEach(x => x.classList.toggle("selected", x === b));
      if (typeof updateWaLink === "function") updateWaLink();
    });
  });
}
