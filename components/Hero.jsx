"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { SplitText } from "./Reveal";
import Magnetic from "./Magnetic";
import { slugify } from "@/lib/format";

export default function Hero({ banner, imageUrl }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 18 });
  const py = useSpring(my, { stiffness: 80, damping: 18 });

  const [first, ...rest] = (banner.largeText1 || "Blossom").split(" ");
  const href = `/product/${slugify(banner.product)}`;
  const d = 2.15; // wait for preloader

  return (
    <section
      className="hero"
      ref={ref}
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 30);
        my.set((e.clientY / window.innerHeight - 0.5) * 30);
      }}
    >
      <div className="hero-glow" />
      <motion.div className="hero-text" style={{ y: textY, opacity: fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d }}>
          {banner.midText} — {banner.saleTime}
        </motion.p>
        <SplitText as="h1" text={`${first} ${rest.join(" ")}`} className="hero-title" delay={d} immediate italicWords={rest} />
        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.7, duration: 0.9 }}
        >
          {banner.smallText}
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d + 0.9, duration: 0.9 }}
        >
          <Magnetic>
            <Link href={href} className="btn">
              <span>{banner.buttonText}</span>
            </Link>
          </Magnetic>
          <Link href="/products" className="link-u">
            Explore all
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: imgY }}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ delay: d - 0.1, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="hero-img" style={{ x: px, y: py }}>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image src={imageUrl} alt={banner.largeText1} fill priority sizes="(max-width:900px) 80vw, 40vw" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="badge" style={{ rotate: spin }} aria-hidden>
        <svg viewBox="0 0 120 120">
          <defs>
            <path id="c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#c">{(banner.discount || "New collection").toUpperCase()} • NEW COLLECTION •</textPath>
          </text>
        </svg>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 1.4 }}>
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
