import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import './Navbar.css';

const Navbar = ({ activeHall, onNavigate, guidedTour, onToggleTour }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isPlaying, toggleSound } = useSound();

  const navItems = [
    { id: 'entrance', label: 'Entrance' },
    { id: 'history', label: 'History' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'vault', label: 'Vault' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => onNavigate('entrance')}>
          bsadnqtri[
        </div>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-only">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeHall === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`tour-toggle ${guidedTour ? 'active' : ''}`}
            onClick={onToggleTour}
          >
            {guidedTour ? 'Stop Tour' : 'Start Tour'}
          </button>
          <button onClick={toggleSound} style={{ background: 'transparent', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
            {isPlaying ? <Volume2 color="var(--color-gold)" size={20} /> : <VolumeX color="#666" size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X color="#FFD700" /> : <Menu color="#FFD700" />}
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-link ${activeHall === item.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              className="mobile-link tour-toggle"
              onClick={() => {
                onToggleTour();
                setIsMobileOpen(false);
              }}
            >
              {guidedTour ? 'Stop Tour' : 'Start Tour'}
            </button>
            <button
              className="mobile-link"
              onClick={() => {
                toggleSound();
                setIsMobileOpen(false);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {isPlaying ? <><Volume2 size={20} /> Sound On</> : <><VolumeX size={20} /> Sound Off</>}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
