"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface CaseStudySectionProps {
  number: string;
  project: string;
  subtitle: string;
  sections: {
    label: string;
    heading: string;
    body: string;
  }[];
}

export default function CaseStudySection({
  number,
  project,
  subtitle,
  sections,
}: CaseStudySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden" id="deros">
      {/* Background number watermark */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 text-[20vw] font-display font-black text-white/[0.03] leading-none select-none pointer-events-none"
      >
        {number}
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#722F37]" />
            <span className="text-[#722F37] text-xs tracking-[0.3em] uppercase font-medium">
              Case Study {number} / {project}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-white font-bold leading-tight">
            {project}
          </h2>
          <p className="text-white/50 text-xl mt-4 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {sections.map((section, i) => (
            <AnimatedSection
              key={section.label}
              delay={i * 0.1}
              className="bg-black p-10 border border-white/5"
            >
              <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-3">
                {section.label}
              </div>
              <h3 className="text-white text-2xl font-display font-bold mb-4">
                {section.heading}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{section.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}