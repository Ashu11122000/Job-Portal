import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/layout/HeroSection";
import FeaturedJobs from "../components/layout/FeaturedJobs";
import FeaturedCompanies from "../components/layout/FeaturedCompanies";
import JobCategories from "../components/layout/JobCategories";
import TrendingJobsSlider from "../components/layout/TrendingJobSlider";
import HowItWorks from "../components/layout/HowItWorks";
import WhyChooseUs from "../components/layout/WhyChooseUs";
import SalaryInsights from "../components/layout/SalaryInsights";
import ResumeToolsPromo from "../components/layout/ResumeToolsPromo";
import BlogSection from "../components/layout/BlogSection";
import Testimonials from "../components/layout/Testimonials";
import NewsletterSubscription from "../components/layout/NewsletterSubscription";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedJobs />
      <FeaturedCompanies />
      <JobCategories />
      <TrendingJobsSlider />
      <HowItWorks />
      <WhyChooseUs />
      <SalaryInsights />
      <ResumeToolsPromo />
      <BlogSection />
      <Testimonials />
      <NewsletterSubscription />
      <Footer />
    </div>
  );
}
