import { useState } from 'react';
import HeroAnimation from '../components/HeroAnimation';
import PreloaderNavbar from '../components/PreloaderNavbar';
import GegsIntro from '../components/GegsIntro';
import Lookbook from '../components/Lookbook';
import DesignProcess from '../components/DesignProcess';
import ConsultationModal from '../components/ConsultationModal';
import Footer from '../components/Footer';

export default function Operator() {
  const [isBespoke, setIsBespoke] = useState(false);

  return (
    <div className="min-h-screen bg-alabaster text-charcoal flex flex-col">
      <PreloaderNavbar isBespoke={isBespoke} />
      <GegsIntro isBespoke={isBespoke} onBespokeChange={setIsBespoke} />
      <HeroAnimation />
      <Lookbook />
      <DesignProcess />
      <ConsultationModal />
      <Footer />
    </div>
  );
}