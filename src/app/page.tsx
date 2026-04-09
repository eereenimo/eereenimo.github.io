import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative z-10">
      <Hero />
      <FeaturedWork />
      <Contact />
    </main>
  );
}
