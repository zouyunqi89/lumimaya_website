# Lumimaya Website

Official website for **Lumimaya** — a Malaysia-based modest fashion brand offering ready-to-wear
(baju kurung, baju kebaya, tudung, daily & office wear) and custom garment services.

Design source of truth: 墨刀 prototype "马来西亚网站-B".
Project plan & worklog: see `WORKLOG.md` and the fashion_project Obsidian vault.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero carousel, What's New / Best Seller carousels, services strip |
| `shop.html` | Shop — category tabs, filters (category / occasion / colour / size), sort, pagination, wishlist-only view |
| `product.html` | Product detail — gallery, colour/size selection, quantity, add to cart, WhatsApp inquiry, B2B swatch order, recommendations |
| `about.html` | About Us — mission, design capability, supply chain, services, ordering process |
| `contact.html` | Contact — FAQ accordion, contact info, inquiry form (validated) |
| `cart.html` | Cart — empty state, item management, WhatsApp checkout |
| `privacy.html` | Privacy Policy (PDPA draft) + Terms & Conditions |
| `exchange-return.html` | Exchange & Return Policy |

## Features

- Bilingual: English / 中文 toggle (persisted in browser)
- Cart & wishlist stored in the browser (localStorage)
- WhatsApp as primary checkout/contact channel (`wa.me` links)
- Responsive layout with mobile bottom tab bar
- No build step — plain HTML/CSS/JS, deployable on any static host

## Before launch (placeholders to replace)

- WhatsApp number: currently `60123456789` in `js/i18n.js` — replace with the real number
- Product photos: currently placeholder stock images in `images/` — replace with real product shots
- Contact phone on `contact.html` (+60 12-345 6789)
- Social links in the footer (currently platform homepages)
- Product catalog in `js/products.js` (names, prices, fabrics are sample data)
- Privacy / exchange-return policy drafts need review and final legal wording

## Run locally

```bash
cd lumimaya_website
python3 -m http.server 8000
# open http://localhost:8000
```
