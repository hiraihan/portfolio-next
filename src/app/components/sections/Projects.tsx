import { ProjectCard } from '@/app/components/ProjectCard';

const projects = [
  {
    title: "CareerCompass",
    description: "a mobile application that helps users find and plan their dream career according to their interests and potential.",
    href: "https://github.com/hiraihan/career-guidance-app",
    deployUrl: "https://careercompass.vercel.app",
    tags: ["React Native", "Firebase", "Expo"]
  },
  {
    title: "Simple-Mindmap",
    description: "A simple Python-based mindmap application for creating, organizing, and storing ideas visually with a minimal interface and add/remove node features.",
    href: "https://github.com/hiraihan/simple-mindmap",
    tags: ["Python", "Tkinter"]
  }
];

export function Projects() {
  return (
    <section id="work" className="py-[120px] border-b border-border">
      <h2 className="text-[20px] font-medium text-subtle mb-[50px] tracking-tight reveal-top">
        College Project
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            href={project.href}
            deployUrl={project.deployUrl}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}