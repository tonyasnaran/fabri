"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThoughtBubble from "./ThoughtBubble";
import { ChevronDown } from "lucide-react";

const bubbles = [
  {
    label: "DEROS",
    description: "Lifestyle brand built around momentum and curated experiences.",
    x: "8%",
    y: "20%",
    delay: 0.8,
    targetId: "deros",
  },
  {
    label: "Nightlife",
    description: "Community-driven events connecting culture creators in LA.",
    x: "72%",
    y: "15%",
    delay: 1.0,
    targetId: "nightlife",
  },
  {
    label: "UCLA",
    description: "Entrepreneurship, Greek life, and building community.",
    x: "78%",
    y: "55%",
    delay: 1.2,
    targetId: "about",
  },
  {
    label: "Content",
    description: "Video, social, and editorial production at scale.",
    x: "5%",
    y: "60%",
    delay: 1.4,
    targetId: "projects",
  },
  {
    label: "Food",
    description: "Culinary exploration and curated dining experiences.",
    x: "40%",
    y: "80%",
    delay: 1.6,
    targetId: "contact",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#722F37]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(114,47,55,0.15)_0%,_transparent_70%)]" />

      {/* Thought bubbles */}
      {bubbles.map((bubble) => (
        <ThoughtBubble key={bubble.label} {...bubble} />
      ))}

      {/* Center content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Initials mark */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white/20 text-xs tracking-[0.4em] uppercase mb-8"
        >
          AFA / TF
        </motion.div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 text-sm tracking-widest uppercase mb-10 max-w-sm"
        >
          I build culture, systems, and experiences around momentum.
        </motion.p>

        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
          className="relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <div className="text-5xl font-display font-black text-white/10 select-none">AF</div>
            </div>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-[#722F37]/30 scale-110 animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 text-5xl md:text-7xl font-display font-black text-white tracking-tight"
        >
          FABRI
        </motion.h1>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={() => {
            document.getElementById("deros")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-12 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Enter the work</span>
          <ChevronDown
            size={16}
            className="group-hover:translate-y-1 transition-transform animate-bounce"
          />
        </motion.button>
      </motion.div>
    </motion.section>
  );
}