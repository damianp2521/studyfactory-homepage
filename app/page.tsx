import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Happiness from "@/components/Happiness";
import Reviews from "@/components/Reviews";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import FullPageScroll from "@/components/FullPageScroll";

export default function Home() {
  return (
    <main className="relative bg-[var(--color-surface)] selection:bg-[var(--color-primary)] selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <FullPageScroll>
        <Hero />
        <Benefits />
        <Happiness />
        <Reviews />
        <Footer />
      </FullPageScroll>

      <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          <ConsultationCTA />
        </div>
      </div>
    </main>
  );
}
