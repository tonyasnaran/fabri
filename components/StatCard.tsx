"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatCard({
  label,
  value,
  change,
  changePositive,
  icon,
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-card border border-border rounded-lg p-5 flex flex-col gap-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          {label}
        </span>
        {icon && (
          <span className="text-muted-foreground">{icon}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {change && (
        <div
          className={cn(
            "text-xs font-medium",
            changePositive ? "text-green-500" : "text-red-500"
          )}
        >
          {changePositive ? "↑" : "↓"} {change}
        </div>
      )}
    </motion.div>
  );
}