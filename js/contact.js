/* Contact page: FAQ accordion, product select, inquiry form validation + mailto handoff */
document.addEventListener("DOMContentLoaded", () => {
  // FAQ accordion
  document.querySelectorAll(".faq-item h4").forEach(h => {
    h.addEventListener("click", () => h.parentElement.classList.toggle("open"));
  });

  // contact WhatsApp link
  document.getElementById("contactWa").href = whatsappLink("Hello Lumimaya! I'd like to make an inquiry.");

  // deep link: #faq / #shipping / #returns opens that item
  const hash = location.hash.slice(1);
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      if (el.classList.contains("faq-item")) el.classList.add("open");
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // product of interest dropdown
  const sel = document.getElementById("interestSelect");
  sel.innerHTML = '<option value="" data-i18n="form.interest.ph">Please select</option>' +
    PRODUCTS.map(p => '<option value="' + p.no + " " + p.name + '">' + p.no + " " + p.name + "</option>").join("");
  const pre = new URLSearchParams(location.search).get("product");
  if (pre) sel.value = pre;

  // validation
  const form = document.getElementById("inquiryForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name, email = form.email, question = form.question, consent = document.getElementById("consent");
    let ok = true;
    const check = (input, valid) => {
      input.closest(".form-field").classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    };
    check(name, name.value.trim().length > 0);
    check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    check(question, question.value.trim().length > 0);
    consent.closest(".form-consent").style.color = "";
    if (!consent.checked) { consent.closest(".form-consent").style.color = "var(--danger)"; ok = false; }
    if (!ok) return;

    const body = "Name: " + name.value.trim() +
      "\nCompany: " + form.company.value.trim() +
      "\nEmail: " + email.value.trim() +
      "\nRegion: " + form.region.value.trim() +
      "\nRole: " + form.role.value.trim() +
      "\nProduct of interest: " + sel.value +
      "\n\nMessage:\n" + question.value.trim();
    location.href = "mailto:lumimayacollection@gmail.com?subject=" +
      encodeURIComponent("Lumimaya inquiry — " + name.value.trim()) +
      "&body=" + encodeURIComponent(body);

    document.getElementById("formSuccess").classList.add("show");
    form.reset();
  });

  // clear invalid state while typing
  form.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => el.closest(".form-field") && el.closest(".form-field").classList.remove("invalid"));
  });
});
