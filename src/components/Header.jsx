import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <img src="/logo.png" alt="vBrix4 Logo" className="logo-image" />
          <span className="logo-text gradient-text">vBrix4</span>
        </div>
        <nav className="nav">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#demos" onClick={(e) => scrollToSection(e, 'demos')}>Demos</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

