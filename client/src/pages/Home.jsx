import PageTransition from '../components/common/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeatureCards from '../components/home/FeatureCards';
import StatsSection from '../components/home/StatsSection';
import DemoSection from '../components/home/DemoSection';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import PricingCards from '../components/home/PricingCards';
import CTABanner from '../components/home/CTABanner';
import { useCommandPalette } from '../hooks/useCommandPalette';
import CommandPalette from '../components/ui/CommandPalette';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { open, setOpen } = useCommandPalette();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <PageTransition>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left"
        style={{ scaleX, background: 'var(--gradient-accent)' }} />

      <Navbar onSearch={() => setOpen(true)} />
      <CommandPalette open={open} onClose={() => setOpen(false)} />

      <main>
        <HeroSection />
        <FeatureCards />
        <StatsSection />
        <DemoSection />
        <TestimonialsSlider />
        <PricingCards />
        <CTABanner />
      </main>
      <Footer />
    </PageTransition>
  );
}
