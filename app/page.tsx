import EntranceOverlay from "@/components/EntranceOverlay";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Reviews from "@/components/Reviews";
import Franchise from "@/components/Franchise";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import FullPageScroll from "@/components/FullPageScroll";

export default function Home() {
  return (
    <main className="relative bg-white selection:bg-[#267E82] selection:text-white">
      <EntranceOverlay />
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <FullPageScroll>
        <section className="h-full w-full bg-white">
          <Hero />
        </section>

        <section className="h-full w-full bg-slate-50">
          <Benefits />
        </section>

        <section className="h-full w-full bg-white">
          <Reviews />
        </section>

        <section className="h-full w-full bg-slate-50">
          <Franchise />
        </section>

        <section className="h-full w-full bg-white">
          <Footer />
        </section>
      </FullPageScroll>

      <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          <ConsultationCTA />
        </div>
      </div>
    </main>
  );
}
