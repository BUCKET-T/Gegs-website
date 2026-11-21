import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroAnimation from '../components/HeroAnimation';
import PreloaderNavbar from '../components/PreloaderNavbar';
import GegsIntro from '../components/GegsIntro';
import Lookbook from '../components/Lookbook';
import DesignProcess from '../components/DesignProcess';
import ConsultationModal from '../components/ConsultationModal';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Operator() {
  const operatorRef = useRef(null);
  const [isBespoke, setIsBespoke] = useState(false);

  const handleBookFitting = () => {
    const contactEl =
      document.getElementById('contact') ||
      document.getElementById('contact-enquiry');

    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.atelier-reveal').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, operatorRef);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={operatorRef}
      className="min-h-screen bg-alabaster text-charcoal flex flex-col overflow-x-clip"
    >
      <PreloaderNavbar
        isBespoke={isBespoke}
        onBookFitting={handleBookFitting}
      />

      <main className="flex-1 flex flex-col">
        <GegsIntro
          isBespoke={isBespoke}
          onBespokeChange={setIsBespoke}
        />

        <div className="atelier-reveal">
          <HeroAnimation />
        </div>

        <div className="atelier-reveal">
          <Lookbook />
        </div>

        <div className="atelier-reveal">
          <DesignProcess />
        </div>
      </main>

      <ConsultationModal />

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}