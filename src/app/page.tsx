import BannerSection from "@/component/BannerSection";
import Categories from "@/component/Categories";
import HowItWorks from "@/component/HowItWorks";
import NewArrivals from "@/component/NewArrivals";
import WhyChooseUs from "@/component/WhyChooseUs";



export default function Home() {
  return (
    <main>


      <BannerSection/>
      <NewArrivals/>
      <HowItWorks/>
      <Categories/>
      <WhyChooseUs/>
    </main>
     
  );
}
