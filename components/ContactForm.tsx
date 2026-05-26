"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  reason: z.string().min(1, "Please select a reason"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const reasons = [
  "General Inquiry",
  "Collaboration",
  "Event / Experience",
  "Brand Partnership",
  "Speaking",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 gap-4 text-center"
      >
        <CheckCircle className="text-[#722F37]" size={48} />
        <h3 className="text-white text-2xl font-display font-bold">Message received.</h3>
        <p className="text-white/50 text-sm">I&apos;ll be in touch within 48 hours.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs text-white/40 hover:text-white/70 underline underline-offset-4 transition-colors"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#722F37]/60 transition-colors"
            placeholder="Anthony Fabri"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#722F37]/60 transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
          Reason
        </label>
        <select
          {...register("reason")}
          className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-[#722F37]/60 transition-colors appearance-none"
        >
          <option value="" className="bg-black">Select a reason</option>
          {reasons.map((r) => (
            <option key={r} value={r} className="bg-black">
              {r}
            </option>
          ))}
        </select>
        {errors.reason && (
          <p className="text-red-400 text-xs mt-1">{errors.reason.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#722F37]/60 transition-colors resize-none"
          placeholder="Tell me what you're working on..."
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-[#722F37] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#8B3A44] transition-colors disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
        <Send size={14} />
      </button>
    </form>
  );
}