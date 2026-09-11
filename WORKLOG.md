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
