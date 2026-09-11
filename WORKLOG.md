# Lumimaya Website — Worklog

Project: Lumimaya fashion brand website (Malaysia modest fashion)
Design source of truth: 墨刀 prototype "马来西亚网站-B" (https://modao.cc/proto/ed7FnoxVtkdv3z0fdVLqO1/sharing?view_mode=read_only)
Planning notes: ~/Desktop/fashion_project (Obsidian vault, PARA)

## 2026-09-11

### 12:55 — Project setup
- Initialized git repo (branch `main`) in ~/Desktop/lumimaya_website
- GitHub SSH auth verified (account: zouyunqi89)
- Created folder structure: css/ js/ images/
- **TODO/confirm:** GitHub repo URL not yet provided → cannot push yet. User to create empty repo on github.com (suggested name: `lumimaya_website`) and paste the SSH URL (git@github.com:zouyunqi89/lumimaya_website.git). Commits will be made locally until then.

### 12:55 — Plan
- Reviewed the current 墨刀 prototype (13 canvases: web pages, mobile home, competitor maps, policy references)
- Noted evolution since 2026-09-08 discussion video: cart page (empty/filled states), mobile home with bottom tabs, poplook competitor sitemap, privacy policy template (Poplook/PDPA), Bayu Somerset exchange-return reference, filter taxonomy mind map, B2B annotations on detail page (fabric swatches, batch purchase order form)

### 13:10 — Website v1 built (all 8 pages)
- Pages: index (home), shop, product detail, about, contact, cart, privacy, exchange-return
- Bilingual EN/中文 i18n toggle (localStorage persisted)
- Interactions: hero carousel, What's New / Best Seller carousels, shop tabs + filters (category/scene/colour/size) + sort + pagination, wishlist (localStorage, wishlist-only filter), cart (localStorage, badge, qty edit, remove, WhatsApp checkout with order summary), product detail (gallery, colour/size chips, qty, WhatsApp per-product, B2B swatch button, recommendations), FAQ accordion, validated inquiry form (mailto handoff), newsletter subscribe validation, mobile bottom tab bar
- 15 placeholder images downloaded (picsum) → images/
- Policies drafted (PDPA privacy adapted from Poplook template; exchange/return adapted from Bayu Somerset)
- Placeholders to replace before launch are listed in README.md
- **TODO:** GitHub repo URL needed to push (user to create repo `lumimaya_website`)
- **TODO:** browser test of every button (next step)

### 13:30 — Browser test pass (via Kimi WebBridge on localhost:8000)
- Fixed during testing:
  1. `.btn-gold { flex:1 }` stretched the hero CTA to 221px tall → scoped to `.p-actions`
  2. Product-page WhatsApp link did not reflect selected colour/size → `updateWaLink` was trapped in callback scope; now module-level, called on every chip change
  3. Recommendations could render fewer than 6 → filled with best sellers
  4. Product page dynamic text (meta, wishlist label) did not follow language toggle → re-render on `langchange`
- Verified working (all green, zero JS errors):
  - Home: hero dots, carousel arrows, add-to-cart, cart badge, wishlist toggle, EN/中文 toggle, subscribe valid+invalid, WhatsApp float link
  - All 8 pages: every internal link, anchor (#faq/#shipping/#terms etc.) and image resolves (automated crawl)
  - Shop: 7 tabs, category/colour/size filters, sort asc/desc, pagination (page buttons, prev/next, boundary), wishlist-only view, filter collapse, grid add-to-cart
  - Product: gallery thumbnails, collapsible blocks, colour/size chips, quantity stepper, add-to-cart with exact variant, WhatsApp link per selection, swatch order link, wishlist, recommendations, not-found state
  - Contact: FAQ accordion, form validation (empty fields, bad email, consent), success flow, 12-product interest dropdown, contact WhatsApp link
  - Cart: empty state, filled state, subtotal math (RM), quantity stepper, remove, WhatsApp checkout message, return to empty
  - About: WhatsApp CTA link
  - Mobile (390px emulation): hamburger menu open/close, bottom tab bar visible, layout renders correctly in Chinese
- Preview server: `python3 -m http.server 8000` in project dir (leave running for local preview)
