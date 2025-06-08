"use client"

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { useGrayscaleStore } from "@/lib/store";

const skills = [
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    category: "Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Next.js",
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    category: "Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    category: "Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    category: "Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Git",
    category: "Version Control",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
];

const firstRow = skills.slice(0, skills.length / 2);

const SkillCard = ({
  logo,
  name
}: {
  logo: string;
  name: string;
  category: string;
}) => {
  const { isGrayscaleEnabled } = useGrayscaleStore();
  
  return (
    <figure
      className={cn(
        "relative h-full cursor-pointer overflow-hidden rounded-lg border p-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
      )}
    >
      <div className="flex items-center justify-center gap-3 px-3">
        <div className="flex-shrink-0">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={40}
            height={40}
            className={cn(
              "h-6 w-6 object-contain contrast-125 transition-all duration-500",
              isGrayscaleEnabled ? "filter grayscale group-hover:grayscale-0" : ""
            )}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-foreground">{name}</h3>
        </div>
      </div>
    </figure>
  );
};

export function MarqueeSkills() {
  return (
    <div className="relative flex w-full flex-col items-center gap-4 justify-center overflow-hidden py-8 mt-6">
      <div className="text-center mb-6">
        <p className="text-foreground">Technologies I work with</p>
      </div>
      <Marquee pauseOnHover reverse className="[--duration:20s]">
        {firstRow.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
