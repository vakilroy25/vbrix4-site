import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const words = ['debug', 'testbench', 'BI', 'planning', 'verification', 'simulation', 'automation', 'validation'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial fade in
    setTimeout(() => setIsVisible(true), 300);

    // Cycle words with slower fade and longer display time
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemos = () => {
    const element = document.getElementById('demos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div
          className="brand-showcase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-brand-container">
            <img src="/logo.png" alt="vBrix4 Logo" className="hero-logo" />
            <span className="brand-name gradient-text">vBrix4</span>
          </div>
          <span className={`animated-word ${isVisible ? 'visible' : ''}`}>
            {words[currentWordIndex]}
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Your AI-powered co-pilot for Design Verification
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          Build, run & debug verification workflows faster—visual blocks, deep integrations, and AI where it matters.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button className="btn btn-primary" onClick={scrollToContact}>
            Contact Us
          </button>
          <button className="btn btn-ghost" onClick={scrollToDemos}>
            Watch Demos
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

