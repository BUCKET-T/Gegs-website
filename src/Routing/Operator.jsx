import HeroAnimation from '../components/HeroAnimation';
import PreloaderNavbar from '../components/PreloaderNavbar';
import GegsIntro from '../components/GegsIntro';
import Lookbook from '../components/Lookbook';

export default function Operator() {
  return (
    <div className="min-h-screen bg-alabaster text-charcoal flex flex-col">
      <PreloaderNavbar />
      <GegsIntro />
      <HeroAnimation />
      <Lookbook />
    </div>
  );
}