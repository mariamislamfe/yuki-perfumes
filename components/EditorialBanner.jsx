"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";
import { slugify } from "@/lib/format";

export default function EditorialBanner({ banner, imageUrl }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1]);

  return (
    <section className="editorial" ref={ref}>
      <motion.div
        className="editorial-media"
        initial={{ clipPath: "inset(12% 12% 12% 12% round 400px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div style={{ y, scale, position: "absolute", inset: "-10% 0" }}>
          <Image src={imageUrl} alt={banner.largeText1} fill sizes="50vw" />
        </motion.div>
      </motion.div>
      <div className="editorial-copy">
        <Reveal>
          <p className="eyebrow">{banner.discount}</p>
        </Reveal>
        <SplitText text={`${banner.largeText2?.trim() || "Do not miss"} ${banner.largeText1}`} className="display xl" italicWords={(banner.largeText1 || "").split(" ")} />
        <Reveal delay={0.2}>
          <p className="lead">{banner.desc} · {banner.saleTime}</p>
          <Magnetic className="inline">
            <Link href={`/product/${slugify(banner.product)}`} className="btn">
              <span>{banner.buttonText}</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
