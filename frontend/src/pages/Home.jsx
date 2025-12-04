import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/layout/HeroSection";
import FeaturedJobs from "../components/layout/FeaturedJobs";
import FeaturedCompanies from "../components/layout/FeaturedCompanies";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedJobs />
      <FeaturedCompanies />
      <Footer />
    </div>
  );
}
