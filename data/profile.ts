// Central content store. Edit this file to update site copy —
// no component code needs to change when your info changes.

export const profile = {
  name: "Mishti Agarwal",
  role: "Frontend Engineer",
  roles: [
    "Frontend Engineer",
    "Open Source Contributor",
    "GSoC 2026 Applicant",
    "CS-AI Student",
  ],
  tagline: "Building toward systems that matter.",
  status: "available" as const, // "available" | "busy" | "offline"
  location: "New Delhi, India",
  email: "mishti.agarwal@example.com", // TODO: replace with real email
  github: "https://github.com/mishtiagarwal", // TODO: replace with real handle
  linkedin: "https://linkedin.com/in/mishtiagarwal", // TODO: replace with real handle
  resumeUrl: "/resume.pdf", // TODO: add real resume file to /public
};

export const about = {
  intro: `First-year CS-AI student. I spend most of my time at the
  intersection of frontend engineering and the systems underneath it —
  currently working through React internals, container orchestration,
  and the math behind the ML models everyone's shipping.`,
  goals: [
    "Land a GSoC 2026 placement",
    "Ship contributions that outlive the application cycle",
    "Go deep on frontend, then widen into full-stack and cloud",
    "Build toward infrastructure-scale engineering work",
  ],
};

export type SkillCategory = {
  label: string;
  id: string;
  skills: { name: string; level: number }[]; // level 0-100, used for visual weight only
};

export const skillMatrix: SkillCategory[] = [
  {
    label: "Frontend",
    id: "frontend",
    skills: [
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 65 },
      { name: "React", level: 70 },
      { name: "Next.js", level: 60 },
      { name: "HTML / CSS", level: 80 },
    ],
  },
  {
    label: "Programming",
    id: "programming",
    skills: [
      { name: "Python", level: 70 },
      { name: "C++", level: 65 },
      { name: "Data Structures & Algorithms", level: 60 },
    ],
  },
  {
    label: "Backend",
    id: "backend",
    skills: [
      { name: "Node.js", level: 55 },
      { name: "Express", level: 50 },
    ],
  },
  {
    label: "Cloud & DevOps",
    id: "devops",
    skills: [
      { name: "Linux", level: 60 },
      { name: "Docker", level: 50 },
      { name: "Kubernetes", level: 35 },
      { name: "AWS", level: 40 },
    ],
  },
  {
    label: "AI / ML",
    id: "ai",
    skills: [
      { name: "ML Fundamentals", level: 50 },
      { name: "AI Foundations", level: 45 },
    ],
  },
];

export type OrgTarget = {
  name: string;
  id: string;
  description: string;
  url: string;
  status: "researching" | "engaging" | "contributing";
};

// NOTE: status here should reflect reality. Don't mark "contributing"
// until there's a merged PR or accepted patch to point to — recruiters
// and mentors check.
export const openSourceTargets: OrgTarget[] = [
  {
    name: "Sugar Labs",
    id: "sugar-labs",
    description:
      "Educational platform powering constructionist learning tools for children worldwide.",
    url: "https://www.sugarlabs.org/",
    status: "researching",
  },
  {
    name: "Music Blocks",
    id: "music-blocks",
    description:
      "Visual programming environment that teaches music and coding together.",
    url: "https://musicblocks.sugarlabs.org/",
    status: "researching",
  },
  {
    name: "FOSSASIA",
    id: "fossasia",
    description:
      "Open technology community building tools for events, science, and education across Asia.",
    url: "https://fossasia.org/",
    status: "researching",
  },
  {
    name: "Eventyay",
    id: "eventyay",
    description:
      "Open-source event management platform built by the FOSSASIA community.",
    url: "https://eventyay.com/",
    status: "researching",
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  size: "large" | "medium" | "small"; // controls bento grid placement
  github?: string;
  demo?: string;
  metric?: { label: string; value: string };
};

// TODO: Replace with real projects. Placeholders kept deliberately
// plain rather than padded with invented metrics.
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project title goes here",
    description:
      "One or two sentences on what this project does and why it exists. Be specific about the problem, not just the stack.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    size: "large",
    github: "#",
    demo: "#",
  },
  {
    id: "project-2",
    title: "Second project",
    description: "Short, specific description of scope and outcome.",
    stack: ["Python", "FastAPI"],
    size: "medium",
    github: "#",
  },
  {
    id: "project-3",
    title: "Third project",
    description: "Short description.",
    stack: ["React", "Node.js"],
    size: "small",
    github: "#",
  },
  {
    id: "project-4",
    title: "Fourth project",
    description: "Short description.",
    stack: ["C++", "DSA"],
    size: "small",
    github: "#",
  },
];

export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  org: string;
  description: string;
  type: "education" | "open-source" | "hackathon" | "internship" | "certification";
};

// TODO: Replace with real dates/entries.
export const timeline: TimelineEntry[] = [
  {
    id: "t1",
    date: "2025 — Present",
    title: "B.Tech, Computer Science (AI)",
    org: "Your university name",
    description: "Coursework in DSA, systems, and applied ML foundations.",
    type: "education",
  },
];
