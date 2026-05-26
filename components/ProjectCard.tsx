"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  role: string;
  status: "Active" | "In Progress" | "Concept" | "Complete";
  tags: string[];
  href?: string;
  index?: number;
}

const statusColor: Record<string, string> = {
  Active: "text-green-400 border-green-400/30 bg-green-400/10",
  "In Progress": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Concept: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Complete: "text-white/50 border-white/20 bg-white/5",
};

export default function ProjectCard({
  title,
  description,
  role,
  status,
  tags,
  href = "#",
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative border border-white/10 rounded-xl p-8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#722F37]/50 transition-all duration-400 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-white/30 text-sm font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border",
            statusColor[status]
          )}
        >
          {status}
        </span>
      </div>

      <h3 className="text-white text-2xl font-display font-bold mb-2 group-hover:text-[#722F37] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/40 mb-1 tracking-wider uppercase">
        {role}
      </p>
      <p className="text-white/60 text-sm leading-relaxed mt-3 mb-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 border border-white/10 rounded-full text-white/40"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white group-hover:text-[#722F37] transition-colors"
      >
        View Project <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  );
}