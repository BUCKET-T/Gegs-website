import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroAnimation from '../components/HeroAnimation';
import PreloaderNavbar from '../components/PreloaderNavbar';
import GegsIntro from '../components/GegsIntro';
import Lookbook from '../components/Lookbook';
import DesignProcess from '../components/DesignProcess';
import ConsultationModal from '../components/ConsultationModal';
import Footer from '../components/Footer';
import Collections from '../pages/Collections';

gsap.registerPlugin(ScrollTrigger);

function HomeView({ isBespoke, setIsBespoke, operatorRef, handleBookFitting }) {
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
  }, [operatorRef]);

  return (
    <main className="flex-1 flex flex-col">
      <GegsIntro
        isBespoke={isBespoke}
        onBespokeChange={setIsBespoke}
      />

      <div className="atelier-reveal">
        <HeroAnimation />
      </div>

      <div id="lookbook" className="atelier-reveal">
        <Lookbook />
      </div>

      <div id="process" className="atelier-reveal">
        <DesignProcess />
      </div>

      <ConsultationModal />

      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}

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

  return (
    <BrowserRouter>
      <div
        ref={operatorRef}
        className="min-h-screen bg-alabaster text-charcoal flex flex-col overflow-x-clip"
      >
        <PreloaderNavbar
          isBespoke={isBespoke}
          onBookFitting={handleBookFitting}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                isBespoke={isBespoke}
                setIsBespoke={setIsBespoke}
                operatorRef={operatorRef}
                handleBookFitting={handleBookFitting}
              />
            }
          />
          <Route path="/collections" element={<Collections />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}