import { IntroProvider } from "@/components/IntroContext";
import Preloader from "@/components/Preloader";
import MusicToggle from "@/components/MusicToggle";
import Backdrop from "@/components/visuals/Backdrop";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import Countdown from "@/components/sections/Countdown";
import Location from "@/components/sections/Location";

export default function Home() {
  return (
    <IntroProvider>
      <Backdrop />
      <Preloader />

      <main className="relative">
        <Hero />
        <Invitation />
        <Countdown />
        <Location />
      </main>

      <Footer />
      <MusicToggle />
    </IntroProvider>
  );
}
