import { useRef } from 'react';
import useLenis from './hooks/useLenis.js';
import useReveal from './hooks/useReveal.js';
import CustomCursor from './components/CustomCursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Services from './components/Services.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import Packages from './components/Packages.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const mainRef = useRef(null);
  useLenis();
  useReveal(mainRef);

  return (
    <>
      <CustomCursor />
      <Nav />
      <main ref={mainRef}>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Packages />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
