export interface Project {
  id: string;
  number: string;
  tag: string;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  visualLabel: string; // Large decorative text behind the mockup area
}

export const projects: Project[] = [
  {
    id: "tonepilot",
    number: "01",
    tag: "AI Product · 2025",
    title: "TonePilot",
    problem:
      "Communication is one of the highest-leverage skills in any organization — yet most professionals struggle to consistently strike the right tone across contexts, whether it's stakeholder emails, slack messages, or client-facing copy.",
    solution:
      "TonePilot is an AI-powered communication assistant that rewrites, refines, and improves text with emotional intelligence. Built with a modern, minimal UI and real-time OpenAI integration, it gives users a history of transformations and nuanced tone selection.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
    accentColor: "#6C8EFF",
    visualLabel: "AI",
  },
  {
    id: "barsan",
    number: "02",
    tag: "Corporate · 2024",
    title: "Barsan.com Redesign",
    problem:
      "A well-established logistics company with a fragmented digital presence: outdated frontend, no unified content system, and a codebase that made simple content updates a developer task.",
    solution:
      "A full architecture rebuild — new component-driven frontend in Next.js, a headless CMS integration via Strapi, containerized deployment with Docker, and a design system that scales with the company's content needs without engineering intervention.",
    stack: ["Next.js", "Strapi CMS", "Tailwind CSS", "Docker"],
    accentColor: "#00D4FF",
    visualLabel: "CMS",
  },
  {
    id: "mobile-ai",
    number: "03",
    tag: "Mobile · 2025",
    title: "Mobile AI App",
    problem:
      "Building a mobile AI product means solving two hard problems simultaneously: designing an intuitive cross-platform UX that feels native, and architecting a real-time backend that's fast enough to keep up with user interactions.",
    solution:
      "A React Native application with Firebase as the real-time backend layer and integrated AI APIs for intelligent features. Focus on mobile UX patterns, offline-first architecture, and seamless state management across the native/web boundary.",
    stack: ["React Native", "Firebase", "TypeScript", "AI APIs"],
    accentColor: "#8B5CF6",
    visualLabel: "APP",
  },
];
