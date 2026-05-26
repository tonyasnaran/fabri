import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import CaseStudySection from "@/components/CaseStudySection";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const derosSections = [
  {
    label: "Problem",
    heading: "Nightlife without purpose.",
    body: "The LA scene had venues, influencers, and aesthetics — but no brand that organized it around a shared value system. People showed up for the night, not for what the night meant.",
  },
  {
    label: "Insight",
    heading: "Momentum is a lifestyle.",
    body: "The most interesting people in a room are always building something. DEROS was built on the insight that curated environments accelerate ambition — and that community is the operating system.",
  },
  {
    label: "Brand System",
    heading: "Visual language for doers.",
    body: "A restrained, editorial identity: deep neutrals, bold type, and imagery that references work as much as play. The brand feels like a founder's wardrobe — quiet, intentional, effective.",
  },
  {
    label: "Experiences",
    heading: "Invite-only momentum dinners.",
    body: "Private dinners, curated rooftops, and gallery-style pop-ups. Each event was engineered to produce serendipitous collisions between builders, creatives, and operators.",
  },
  {
    label: "Next Move",
    heading: "The DEROS membership.",
    body: "A private membership tier giving access to the monthly event calendar, a vetted group chat, and early access to brand partnerships. Infrastructure is built — launch is imminent.",
  },
];

export default function Home() {
  return (
    <main className="bg-black">
      <SiteNav />
      <Hero />
      <CaseStudySection
        number="001"
        project="DEROS"
        subtitle="Built for doers. A lifestyle brand around momentum, connection, and curated experiences."
        sections={derosSections}
      />

      {/* Projects teaser */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-3">Selected Work</div>
              <h2 className="text-5xl font-display font-bold text-white">Projects</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {["DEROS", "IPO", "FLUX CULTURE"].map((name, i) => (
              <AnimatedSection
                key={name}
                delay={i * 0.1}
                className="bg-black p-10 hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="text-white/20 text-sm font-mono mb-8">0{i + 1}</div>
                <h3 className="text-white text-2xl font-display font-bold group-hover:text-[#722F37] transition-colors">
                  {name}
                </h3>
                <div className="h-px bg-white/10 my-4 group-hover:bg-[#722F37]/40 transition-colors" />
                <Link href="/projects" className="text-white/30 text-sm hover:text-white/60 transition-colors inline-flex items-center gap-1">
                  Read more <ArrowUpRight size={12} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-24 bg-black border-t border-white/5" id="about">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="max-w-3xl">
            <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-4">Who I Am</div>
            <p className="text-white/60 text-2xl md:text-3xl font-display leading-relaxed">
              I'm{" "}
              <span className="text-white font-bold">Anthony Fabri</span> — a builder, connector, operator, and creative based in LA.
            </p>
            <p className="text-white/40 mt-6 text-base leading-relaxed max-w-xl">
              UCLA → entrepreneur. I organize communities, launch brands, and create the kind of rooms where things actually happen.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/40 px-6 py-3 transition-all"
            >
              Full story <ArrowUpRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs tracking-widest uppercase">
          <span>© 2026 FABRI — All rights reserved</span>
          <div className="flex gap-8">
            <Link href="/projects" className="hover:text-white/50 transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-white/50 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white/50 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}