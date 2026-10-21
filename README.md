# Blossom — perfume store

Next.js (App Router) · React 19 · Motion · Lenis · Stripe (card payments).

```bash
npm install
cp .env.example .env.local   # add STRIPE_SECRET_KEY for card checkout
npm run dev                  # http://localhost:3000
npm run build && npm start
```

Products and the home banner live in `lib/catalog.js`; product images are in `public/products/`. Cash on delivery works without Stripe keys.
