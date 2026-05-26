import SiteNav from "@/components/SiteNav";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    label: "Builder",
    heading: "From concept to launch.",
    body: "I've built brands, events, and organizations from zero. DEROS started as an idea in a group chat and became a recurring series of curated experiences across LA. I know how to take something from nothing and give it a life.",
  },
  {
    label: "Connector",
    heading: "The room is the product.",
    body: "My most useful skill is knowing who should be in the same room. I've spent years at the intersection of nightlife, entrepreneurship, and content — which means I know people in every lane, and I know how to make introductions that matter.",
  },
  {
    label: "Operator",
    heading: "Systems behind the scenes.",
    body: "Events don't run themselves. Neither do organizations, brands, or communities. I'm obsessed with the operational layer — the logistics, the timing, the follow-through — that turns an idea into something real.",
  },
  {
    label: "Creative",
    heading: "Intentional aesthetics.",
    body: "I think in visual language. Whether it's a brand identity, a dinner table setup, or an Instagram grid — the look and feel is never an afterthought. I produce content, direct shoots, and shape the aesthetics of every project I touch.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <SiteNav />
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
        <AnimatedSection className="mb-24">
          <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-4">Anthony Fabri</div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-none">
            Builder.<br />
            <span className="text-white/30">Connector.</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-xl leading-relaxed">
            UCLA. Entrepreneur. Community organizer. I build the rooms where things happen — and then I document them.
          </p>
        </AnimatedSection>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 mb-24">
          {pillars.map((pillar, i) => (
            <AnimatedSection
              key={pillar.label}
              delay={i * 0.1}
              className="bg-black p-10"
            >
              <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-4">
                {pillar.label}
              </div>
              <h3 className="text-white text-2xl font-display font-bold mb-4">
                {pillar.heading}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{pillar.body}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Background */}
        <AnimatedSection className="border-t border-white/10 pt-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-[#722F37] text-xs tracking-widest uppercase mb-3">Education</div>
              <div className="text-white font-display text-xl font-bold">UCLA</div>
              <p className="text-white/40 text-sm mt-2">
                Entrepreneurship track. Founder of organizations, events, and long-term friendships.
              </p>
            </div>
            <div>
              <div className="text-[#722F37] text-xs tracking-widest uppercase mb-3">Current Focus</div>
              <div className="text-white font-display text-xl font-bold">DEROS + FLUX</div>
              <p className="text-white/40 text-sm mt-2">
                Building the DEROS membership product and scaling FLUX CULTURE&apos;s media presence.
              </p>
            </div>
            <div>
              <div className="text-[#722F37] text-xs tracking-widest uppercase mb-3">Based In</div>
              <div className="text-white font-display text-xl font-bold">Los Angeles</div>
              <p className="text-white/40 text-sm mt-2">
                Operating across LA&apos;s entrepreneurship, nightlife, and content scenes.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-white border border-white/20 hover:border-[#722F37] hover:text-[#722F37] px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
          >
            Work Together <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}