"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword(data);
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <Link href="/" className="text-white font-display text-2xl font-bold tracking-widest">
            FABRI
          </Link>
          <p className="text-white/30 text-sm mt-2 tracking-widest uppercase">Private Access</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <div>
            <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#722F37]/60 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#722F37] text-white py-3 text-sm tracking-widest uppercase hover:bg-[#8B3A44] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-8">
          Don't have access?{" "}
          <Link href="/signup" className="text-white/50 hover:text-white underline underline-offset-4 transition-colors">
            Request access
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white/20 text-xs hover:text-white/40 transition-colors">
            ← Back to site
          </Link>
        </div>
      </motion.div>
    </main>
  );
}