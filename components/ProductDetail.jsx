"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import Magnetic from "./Magnetic";
import { SplitText, Reveal } from "./Reveal";

export default function ProductDetail({ product, images, cartItem }) {
  const { add, setOpen } = useCart();
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [pos, setPos] = useState({ x: 50, y: 50, zoom: false });

  const buyNow = () => {
    add(cartItem, qty);
    setOpen(true);
  };

  return (
    <section className="detail">
      <div className="detail-gallery">
        <motion.div
          className="detail-main"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, zoom: true });
          }}
          onMouseLeave={() => setPos({ x: 50, y: 50, zoom: false })}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="detail-img"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: pos.zoom ? 1.6 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: `${pos.x}% ${pos.y}%` }}
            >
              {images[index] && <Image src={images[index]} alt={product.name} fill priority sizes="(max-width:900px) 100vw, 50vw" />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {images.length > 1 && (
          <div className="thumbs">
            {images.map((src, i) => (
              <button key={i} type="button" className={i === index ? "on" : ""} onClick={() => setIndex(i)} onMouseEnter={() => setIndex(i)} aria-label={`Image ${i + 1}`}>
                <Image src={src} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="detail-info">
        <Reveal>
          <p className="eyebrow">Eau de parfum</p>
        </Reveal>
        <SplitText as="h1" text={product.name} className="display xl" delay={0.2} immediate italicWords={["Girl", "Glamorous", "Arabian"]} />
        <Reveal delay={0.3}>
          <div className="stars" aria-label="4 out of 5 stars">
            ★★★★<span>★</span> <em>(20 reviews)</em>
          </div>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <h4 className="label">Details</h4>
          <p className="detail-text">{product.details}</p>

          <div className="qty-row">
            <span className="label">Quantity</span>
            <div className="qty">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                {qty}
              </motion.span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
          </div>

          <div className="detail-buttons">
            <Magnetic className="grow">
              <button type="button" className="btn ghost block" onClick={() => add(cartItem, qty)}>
                <span>Add to bag</span>
              </button>
            </Magnetic>
            <Magnetic className="grow">
              <button type="button" className="btn block" onClick={buyNow}>
                <span>Buy now</span>
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
