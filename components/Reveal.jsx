"use client";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

/** Fade + rise on scroll. */
export function Reveal({ children, delay = 0, y = 40, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked text reveal. Words listed in `italicWords` render in italic. */
export function SplitText({ text, className = "", as = "h2", delay = 0, italicWords = [], immediate = false }) {
  const Tag = motion[as];
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span
            className={italicWords.includes(w) ? "it" : ""}
            variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
            transition={{ duration: 1, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
