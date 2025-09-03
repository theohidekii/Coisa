import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import Categories from "@/components/Categories";
import LogoStrip from "@/components/LogoStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
 

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BannerCarousel />
        <Categories />
        <LogoStrip />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;