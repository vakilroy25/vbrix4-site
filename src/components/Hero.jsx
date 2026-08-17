import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const words = ['workflows', 'agents', 'automation', 'orchestration', 'integration', 'debug', 'coverage', 'reuse'];
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
    <section id="hero" className="hero" aria-label="Hero section">
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
          Build, Run, and Automate Verification AI Workflows
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          vBrix4 is an AI-native platform for semiconductor verification teams. Build agents and workflows visually, connect the models, scripts, and EDA tools you already use, and run them on demand, on a schedule, or straight from your CI. Your team gets AI working inside everyday verification—without anyone having to become an AI infrastructure expert. Find more bugs in less time.
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
            See What You Can Build
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

