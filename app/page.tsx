import { IntroProvider } from "@/components/IntroContext";
import Preloader from "@/components/Preloader";
import MusicToggle from "@/components/MusicToggle";
import Backdrop from "@/components/visuals/Backdrop";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import EventInfo from "@/components/sections/EventInfo";
import Countdown from "@/components/sections/Countdown";
import Romantic from "@/components/sections/Romantic";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <IntroProvider>
      <Backdrop />
      <Preloader />
      <Nav />

      <main className="relative">
        <Hero />
        <EventInfo />
        <Countdown />
        <Romantic />
        <Location />
      </main>

      <Footer />
      <MusicToggle />
    </IntroProvider>
  );
}
