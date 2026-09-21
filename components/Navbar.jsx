"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useCart } from "@/lib/cart";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const { setOpen, totalQuantities } = useCart();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 40);
  });

  return (
    <motion.header
      className={`navbar ${solid ? "solid" : ""}`}
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/" className="logo">
        Yuki <em>Glow</em>
      </Link>
      <nav className="nav-links">
        <Link href="/products" className="link-u">
          Collection
        </Link>
      </nav>
      <Magnetic strength={0.25}>
        <button type="button" className="bag-btn" onClick={() => setOpen(true)} aria-label="Open bag">
          <span>Bag</span>
          <motion.span
            key={totalQuantities}
            className="bag-count"
            initial={{ scale: 1.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
          >
            {totalQuantities}
          </motion.span>
        </button>
      </Magnetic>
    </motion.header>
  );
}
