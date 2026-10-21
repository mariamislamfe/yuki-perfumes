import Stripe from "stripe";
import { getProducts } from "@/lib/catalog";

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Card payments are not configured yet." }, { status: 503 });
  }

  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Your bag is empty." }, { status: 400 });
    }

    // Never trust client prices: look them up in the catalog.
    const products = await getProducts();
    const byId = new Map(products.map((p) => [p._id, p]));

    const line_items = items
      .filter((i) => byId.has(i._id))
      .map((i) => {
        const p = byId.get(i._id);
        return {
          price_data: {
            currency: "egp",
            product_data: { name: p.name, images: [new URL(p.images[0], req.url).href] },
            unit_amount: Math.round(p.price * 100),
          },
          quantity: Math.max(1, Math.min(20, Number(i.quantity) || 1)),
        };
      });

    if (line_items.length === 0) {
      return Response.json({ error: "No valid products in bag." }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message || "Checkout failed" }, { status: 500 });
  }
}
