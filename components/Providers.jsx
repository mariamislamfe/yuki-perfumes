"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/lib/cart";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <CartProvider>
      <Preloader />
      <Cursor />
      {children}
      <CartDrawer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1d1517",
            color: "#faf5f0",
            borderRadius: 999,
            padding: "12px 22px",
            fontSize: 14,
          },
          iconTheme: { primary: "#ffb8b8", secondary: "#1d1517" },
        }}
      />
    </CartProvider>
  );
}
