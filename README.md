# Yuki Glow — perfume store

Next.js (App Router) · React 19 · Motion · Lenis · Sanity (content) · Stripe (card payments).

```bash
npm install
cp .env.example .env.local   # add STRIPE_SECRET_KEY for card checkout
npm run dev                  # http://localhost:3000
npm run build && npm start
```

Content (products, banner) is read from the existing Sanity project. Cash on delivery works without Stripe keys.
