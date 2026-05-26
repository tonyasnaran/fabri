import SiteNav from "@/components/SiteNav";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";

const projects = [
  {
    title: "DEROS",
    description:
      "A lifestyle brand built around the idea that momentum is a shared experience. DEROS organizes curated events, dinners, and drops for builders and creatives in LA.",
    role: "Founder & Creative Director",
    status: "Active" as const,
    tags: ["Brand", "Events", "Community", "LA"],
    href: "#",
  },
  {
    title: "IPO / Iota Psi Omega",
    description:
      "Greek organization at UCLA, rebuilt with a focus on entrepreneurship, leadership, and cross-cultural community. Led chapter growth and event programming.",
    role: "President / Chapter Lead",
    status: "Complete" as const,
    tags: ["UCLA", "Leadership", "Community", "Events"],
    href: "#",
  },
  {
    title: "FLUX CULTURE",
    description:
      "A content and media collective exploring the intersection of culture, entrepreneurship, and identity. Original editorial, video, and social projects.",
    role: "Co-founder & Producer",
    status: "In Progress" as const,
    tags: ["Media", "Content", "Culture", "Video"],
    href: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      <SiteNav />
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
        <AnimatedSection className="mb-20">
          <div className="text-[#722F37] text-xs tracking-[0.3em] uppercase mb-4">Selected Work</div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white">Projects</h1>
          <p className="text-white/40 text-lg mt-4 max-w-lg">
            Brands, communities, and experiences built from the ground up.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}