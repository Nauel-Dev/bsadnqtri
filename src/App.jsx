import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EntranceHall from './halls/EntranceHall';
import HistoryHall from './halls/HistoryHall';
import GalleryHall from './halls/GalleryHall';
import InteractiveHall from './halls/InteractiveHall';
import VaultHall from './halls/VaultHall';
import ShopHall from './halls/ShopHall';
import AboutHall from './halls/AboutHall';
import { SoundProvider } from './context/SoundContext';
import RainbowCanvas from './components/RainbowCanvas';
import ParticlesBackground from './components/ParticlesBackground';
import './App.css';

function App() {
  const [activeHall, setActiveHall] = useState('entrance');
  const [guidedTour, setGuidedTour] = useState(false);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['entrance', 'history', 'gallery', 'interactive', 'vault', 'shop', 'about'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveHall(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handler
  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setGuidedTour(false); // Stop tour on manual nav
    }
  };

  // Guided Tour Logic (Basic Auto-Scroll)
  useEffect(() => {
    let tourInterval;
    if (guidedTour) {
      tourInterval = setInterval(() => {
        // Simple logic: scroll down slowly
        window.scrollBy({ top: 2, behavior: 'auto' });

        // Stop if at bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          setGuidedTour(false);
        }
      }, 50);
    }
    return () => clearInterval(tourInterval);
  }, [guidedTour]);

  return (
    <SoundProvider>
      <div className="app-container">
        <ParticlesBackground />
        <RainbowCanvas />
        <Navbar
          activeHall={activeHall}
          onNavigate={handleNavigate}
          guidedTour={guidedTour}
          onToggleTour={() => setGuidedTour(!guidedTour)}
        />

        <main>
          <EntranceHall />
          <HistoryHall />
          <GalleryHall />
          <InteractiveHall />
          <VaultHall />
          <ShopHall />
          <AboutHall />
        </main>
      </div>
    </SoundProvider>
  );
}

export default App;
