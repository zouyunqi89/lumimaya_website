/* Shop page: tabs, filters, sort, pagination */
const PER_PAGE = 8;
let state = { tab: "all", cats: [], scenes: [], colors: [], sizes: [], wishOnly: false, sort: "featured", page: 1 };

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const FILTER_COLORS = ["black", "cream", "white", "beige", "brown", "yellow", "orange", "red", "pink", "purple", "blue", "green", "multicolor"];

document.addEventListener("DOMContentLoaded", () => {
  buildFilters();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  if (tab && document.querySelector('.shop-tab[data-tab="' + tab + '"]')) {
    state.tab = tab;
    document.querySelectorAll(".shop-tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  }
  document.querySelectorAll(".shop-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      state.page = 1;
      document.querySelectorAll(".shop-tab").forEach(b => b.classList.toggle("active", b === btn));
      render();
    });
  });
  document.getElementById("fInStock").addEventListener("change", e => { state.page = 1; render(); });
  document.getElementById("fWishOnly").addEventListener("change", e => { state.wishOnly = e.target.checked; state.page = 1; render(); });
  document.getElementById("sortSelect").addEventListener("change", e => { state.sort = e.target.value; render(); });
  document.querySelectorAll(".filter-group h4").forEach(h => {
    h.addEventListener("click", () => h.parentElement.classList.toggle("collapsed"));
  });
  document.addEventListener("wishchange", render);
  document.addEventListener("langchange", () => { buildFilters(); render(); });
  render();
});

function buildFilters() {
  const lang = getLang();
  document.getElementById("fCategories").innerHTML = CATEGORIES.map(c =>
    '<label><input type="checkbox" value="' + c.id + '" class="f-cat"> ' + (lang === "zh" ? c.zh : c.en) + "</label>"
  ).join("");
  document.getElementById("fScenes").innerHTML = SCENES.map(s =>
    '<label><input type="checkbox" value="' + s.id + '" class="f-scene"> ' + (lang === "zh" ? s.zh : s.en) + "</label>"
  ).join("");
  document.getElementById("fColors").innerHTML = FILTER_COLORS.map(c => {
    const sw = c === "multicolor" ? '<span class="filter-swatch multi"></span>' :
      '<span class="filter-swatch" style="background:' + (COLOR_HEX[c] || "#ccc") + '"></span>';
    return '<label><input type="checkbox" value="' + c + '" class="f-color"> ' + sw + " " + c + "</label>";
  }).join("");
  document.getElementById("fSizes").innerHTML = ALL_SIZES.map(s =>
    '<label><input type="checkbox" value="' + s + '" class="f-size"> ' + s + "</label>"
  ).join("");
  document.querySelectorAll(".f-cat").forEach(el => el.addEventListener("change", () => { state.cats = checked(".f-cat"); state.page = 1; render(); }));
  document.querySelectorAll(".f-scene").forEach(el => el.addEventListener("change", () => { state.scenes = checked(".f-scene"); state.page = 1; render(); }));
  document.querySelectorAll(".f-color").forEach(el => el.addEventListener("change", () => { state.colors = checked(".f-color"); state.page = 1; render(); }));
  document.querySelectorAll(".f-size").forEach(el => el.addEventListener("change", () => { state.sizes = checked(".f-size"); state.page = 1; render(); }));
}

function checked(cls) {
  return [...document.querySelectorAll(cls + ":checked")].map(el => el.value);
}

function filtered() {
  let list = [...PRODUCTS];
  if (state.tab === "new") list = list.filter(p => p.isNew);
  else if (state.tab === "bestseller") list = list.filter(p => p.isBestSeller);
  else if (state.tab !== "all") list = list.filter(p => p.scene === state.tab);
  if (state.cats.length) list = list.filter(p => state.cats.includes(p.category));
  if (state.scenes.length) list = list.filter(p => state.scenes.includes(p.scene));
  if (state.colors.length) list = list.filter(p => p.colors.some(c => state.colors.includes(c)));
  if (state.sizes.length) list = list.filter(p => p.sizes.some(s => state.sizes.includes(s)));
  if (state.wishOnly) list = list.filter(p => Store.inWishlist(p.id));
  if (state.sort === "low") list.sort((a, b) => a.price - b.price);
  else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
  return list;
}

function render() {
  const list = filtered();
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  state.page = Math.min(state.page, pages);
  const slice = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

  document.getElementById("resultCount").textContent = list.length;
  const grid = document.getElementById("productGrid");
  grid.innerHTML = slice.map(cardHtml).join("");
  bindCardButtons(grid);
  document.getElementById("noResults").classList.toggle("hidden", list.length > 0);

  const pag = document.getElementById("pagination");
  let html = '<button ' + (state.page === 1 ? "disabled" : "") + ' data-page="prev" aria-label="previous page">‹</button>';
  for (let i = 1; i <= pages; i++) {
    html += '<button class="' + (i === state.page ? "active" : "") + '" data-page="' + i + '">' + i + "</button>";
  }
  html += '<button ' + (state.page === pages ? "disabled" : "") + ' data-page="next" aria-label="next page">›</button>';
  pag.innerHTML = html;
  pag.querySelectorAll("button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.page;
      if (v === "prev") state.page = Math.max(1, state.page - 1);
      else if (v === "next") state.page = Math.min(pages, state.page + 1);
      else state.page = Number(v);
      render();
      document.querySelector(".shop-layout").scrollIntoView({ behavior: "smooth" });
    });
  });
}
