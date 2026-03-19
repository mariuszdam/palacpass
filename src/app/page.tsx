import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Venues from "@/components/sections/Venues";
import Gallery from "@/components/sections/Gallery";
import History from "@/components/sections/History";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Venues />
      <Gallery />
      <History />
      <Testimonials />
      <Contact />
    </>
  );
}
