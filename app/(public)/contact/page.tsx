import SiteNav from "@/components/SiteNav";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen">
      <SiteNav />
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        <AnimatedSection className="mb-20">
          <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</div>
          <h1 className="text-6xl md:text-7xl font-display font-black text-white">Contact</h1>
          <p className="text-white/40 text-lg mt-4 max-w-md">
            Let&apos;s build something together. I respond within 48 hours.
          </p>
        </AnimatedSection>

        {/* Cal.com CTA */}
        <AnimatedSection delay={0.1} className="mb-16">
          <a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 hover:border-[#722F37] px-6 py-4 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-all duration-300 group"
          >
            <Calendar size={16} className="group-hover:text-[#722F37] transition-colors" />
            Book a 30-min call
            <ExternalLink size={12} className="text-white/20" />
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ContactForm />
        </AnimatedSection>
      </div>
    </main>
  );
}