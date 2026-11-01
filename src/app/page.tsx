import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import RoundsSection from "@/components/home/RoundsSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import PrizesSection from "@/components/home/PrizesSection";
import LeaderboardSection from "@/components/home/LeaderboardSection";
import RegistrationCTA from "@/components/home/RegistrationCTA";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RoundsSection />
        <ScheduleSection />
        <PrizesSection />
        <LeaderboardSection />
        <RegistrationCTA />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
