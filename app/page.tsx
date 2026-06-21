import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { OpenSource } from "@/components/sections/OpenSource";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <OpenSource />
      <Projects />
      <Timeline />
      <Contact />
    </main>
  );
}
