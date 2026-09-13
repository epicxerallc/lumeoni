# Lumeoni Studio Website

A responsive multi-page static website built around the supplied Lumeoni Studio logo and brand plan.

## Pages
- `index.html` — home page
- `shop.html` — filterable product catalogue + product modal
- `kids-room.html` — woodland scavenger hunt + Web Audio chime activity
- `about.html` — origin story and brand values
- `faq.html` — accordion FAQ
- `contact.html` — contact form that opens WhatsApp

## Before publishing
1. Open `assets/app.js`.
2. Replace `WHATSAPP_PHONE = '94770000000'` with your verified WhatsApp Business number in international format, digits only.
3. Update product titles/prices/features in the `products` array if needed.
4. Replace sample SVG preview art in `assets/images/` with final product preview images whenever they are ready.
5. Upload the folder to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own web host.

## Design notes
- The uploaded Lumeoni Studio logo is used directly as `assets/lumeoni-logo.png`.
- Palette: paper `#FAF7F2`, forest `#2D4A3E`, sage `#8EA89D`, panda terracotta `#D96B43`, honey `#E9B872`.
- Google Fonts are loaded from the web: Cormorant Garamond + Quicksand. System fallbacks are included.
- The site has no payment gateway or server dependency.

## Local preview
Open `index.html` directly, or run a simple local web server in the project folder, e.g. `python -m http.server 8000`.
