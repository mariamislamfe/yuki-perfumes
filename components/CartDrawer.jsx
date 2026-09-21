"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const ease = [0.22, 1, 0.36, 1];

export default function CartDrawer() {
  const { open, setOpen, items, totalPrice, totalQuantities, change, remove } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState("stripe");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) {
      window.__lenis?.stop();
      window.addEventListener("keydown", onKey);
    }
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const checkout = async () => {
    if (method === "cod") {
      setOpen(false);
      router.push("/checkout/cod");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ _id, quantity }) => ({ _id, quantity })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout unavailable");
      toast.loading("Redirecting to secure checkout…");
      window.location.href = data.url;
    } catch (e) {
      toast.error(e.message || "Could not start checkout");
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="drawer-head">
              <h3>
                Your bag <span>({totalQuantities})</span>
              </h3>
              <button type="button" className="link-u" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <div className="drawer-empty">
                <p className="display">Your bag is empty.</p>
                <Link href="/products" className="btn" onClick={() => setOpen(false)}>
                  <span>Discover the collection</span>
                </Link>
              </div>
            ) : (
              <>
                <ul className="drawer-items" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <motion.li
                        key={item._id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.6, ease } }}
                        exit={{ opacity: 0, x: 60, height: 0, transition: { duration: 0.4 } }}
                        className="drawer-item"
                      >
                        <div className="drawer-thumb">
                          {item.image && <Image src={item.image} alt={item.name} fill sizes="96px" />}
                        </div>
                        <div className="drawer-info">
                          <div className="row">
                            <h4>{item.name}</h4>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                          <div className="row">
                            <div className="qty small">
                              <button type="button" onClick={() => change(item._id, -1)} aria-label="Decrease">
                                −
                              </button>
                              <motion.span key={item.quantity} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                {item.quantity}
                              </motion.span>
                              <button type="button" onClick={() => change(item._id, 1)} aria-label="Increase">
                                +
                              </button>
                            </div>
                            <button type="button" className="link-u muted" onClick={() => remove(item._id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="drawer-foot">
                  <div className="pay-options">
                    {[
                      ["stripe", "Card (Stripe)"],
                      ["cod", "Cash on delivery"],
                    ].map(([v, label]) => (
                      <label key={v} className={method === v ? "on" : ""}>
                        <input type="radio" name="pay" value={v} checked={method === v} onChange={() => setMethod(v)} />
                        {label}
                      </label>
                    ))}
                  </div>
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(totalPrice)}</strong>
                  </div>
                  <button type="button" className="btn block" onClick={checkout} disabled={busy}>
                    <span>{busy ? "Please wait…" : method === "cod" ? "Continue to delivery details" : "Pay securely"}</span>
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
