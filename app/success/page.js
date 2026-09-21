"use client";
import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { SplitText } from "@/components/Reveal";

export default function Success() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    const colors = ["#ffb8b8", "#e9838f", "#f3d9b1", "#ffffff"];
    const end = Date.now() + 1400;
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section page-top center-page">
      <motion.div
        className="check"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
      >
        ✓
      </motion.div>
      <SplitText as="h1" text="Thank you for your order" className="display lg" italicWords={["order"]} immediate delay={0.3} />
      <p className="lead">Check your email inbox for the receipt. Questions? Write to websity@gmail.com</p>
      <Link href="/" className="btn">
        <span>Continue shopping</span>
      </Link>
    </section>
  );
}
