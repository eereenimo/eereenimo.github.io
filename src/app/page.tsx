import { Hero } from "@/components/sections/Hero";
import { AcademicJourney } from "@/components/sections/AcademicJourney";
import { Vision } from "@/components/sections/Vision";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative z-10">
      <Hero />
      <AcademicJourney />
      <Vision />
      <FeaturedWork />
      <Contact />
      {/* Bottom scroll buffer to fully frame Contact on anchor navigation */}
      <section
        aria-hidden="true"
        className="h-[40vh] min-h-[280px] bg-transparent pointer-events-none"
      />
    </main>
  );
}
