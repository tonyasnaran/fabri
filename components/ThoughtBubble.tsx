"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ThoughtBubbleProps {
  label: string;
  description: string;
  x: string;
  y: string;
  delay?: number;
  targetId?: string;
}

export default function ThoughtBubble({
  label,
  description,
  x,
  y,
  delay = 0,
  targetId,
}: ThoughtBubbleProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
      whileHover={{ scale: 1.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs tracking-widest uppercase font-medium whitespace-nowrap hover:border-[#722F37] hover:bg-[#722F37]/20 transition-all duration-300">
          {label}
        </div>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 rounded-md px-3 py-2 text-white/80 text-xs w-40 text-center pointer-events-none z-10"
          >
            {description}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}