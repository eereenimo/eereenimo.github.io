export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "REST API",
      "GraphQL",
      "Firebase",
    ],
  },
  {
    category: "Infrastructure",
    skills: ["Docker", "GitHub Actions", "Vercel", "CI/CD", "Strapi CMS"],
  },
  {
    category: "Design & DX",
    skills: [
      "Figma",
      "System Design",
      "Accessibility",
      "Performance Optimization",
      "UX Thinking",
    ],
  },
];
