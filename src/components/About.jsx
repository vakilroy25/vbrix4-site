import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content glass"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 id="about-title" className="about-title">
            <span className="gradient-text">Deeper</span> Verification, Automated
          </h2>
          
          <div className="about-text">
            <p>
              Verification teams face a compounding problem: designs grow more complex every cycle, but debug 
              and coverage closure still rely heavily on manual effort. Failures get triaged by hand, waveforms 
              reviewed one by one—and critical bugs slip through simply because there wasn't time to look deeper.
            </p>
            
            <p>
              vBrix4 is built around <strong>custom AI agents</strong> tailored to your team's environment. Each 
              agent operates with awareness of your design and verification context, enabling it to investigate 
              failures autonomously, analyze waveforms, generate targeted tests, and iterate through simulations 
              without waiting for a human to drive each step. The underlying platform connects easily with 
              external tools—pushing results to email, dashboards, or reporting channels—and lets teams build 
              reusable workflows that cut repetitive work across projects. The result isn't just faster 
              verification—it's a process capable of finding bugs that would otherwise go undetected.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-badge">
              <span className="badge-icon">🤖</span>
              <span>Custom AI Agents</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">🧠</span>
              <span>Design-Aware Context</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">🔗</span>
              <span>Seamless Integrations</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">⚡</span>
              <span>Automated Debug & Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

