"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { img } from "@/lib/sanity";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product, index = 0 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const src = img(product.image?.[0], 800);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/product/${product.slug.current}`} className="card" data-cursor>
        <motion.div
          ref={ref}
          className="card-media"
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          onMouseMove={(e) => {
            const r = ref.current.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {src && <Image src={src} alt={product.name} fill sizes="(max-width:700px) 90vw, 25vw" />}
          <span className="card-view">View</span>
        </motion.div>
        <div className="card-meta">
          <h3>{product.name}</h3>
          <span>{formatPrice(product.price)}</span>
        </div>
      </Link>
    </motion.article>
  );
}
