import Hero from "../Components/Hero/Hero";
import HowWorks from "../Components/How work/HowWorks";
import NewsLetter from "../Components/News Letter/NewsLetter";
import Testimonials from "../Components/Testmonials/Testmonials";
import WhyChooseUs from "../Components/Why Choose Us/WhyChooseUs";

export default function MainLayout() {
  return (
    <div className="text-slate-800 bg-slate-50">
      <Hero />

      <HowWorks />
      <WhyChooseUs />
      <Testimonials />
      <NewsLetter />
    </div>
  );
}
