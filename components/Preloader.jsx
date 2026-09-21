"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const word = "Yuki Glow".split("");

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.classList.remove("is-loading");
    }, 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-word" aria-label="Yuki Glow">
            {word.map((c, i) => (
              <span key={i} className="mask">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c === " " ? " " : c}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.div
            className="preloader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.p className="preloader-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Perfumes that speak your story
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
