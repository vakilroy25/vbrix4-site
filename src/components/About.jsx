import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content glass"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="about-title">
            <span className="gradient-text">Revolutionizing</span> Design Verification
          </h2>
          
          <div className="about-text">
            <p>
              vBrix4 is your AI-powered co-pilot for design verification, transforming how teams build, run, 
              and debug complex verification workflows. We combine visual programming with deep EDA integrations 
              to make verification faster, smarter, and more intuitive.
            </p>
            
            <p>
              Our platform leverages advanced AI to detect anomalies across logs and waveforms, compare test runs 
              with intelligent fork analysis, and even generate custom verification blocks from natural language 
              prompts. Whether you're working with industry-standard tools or custom flows, vBrix4 seamlessly 
              integrates into your existing ecosystem.
            </p>
            
            <p>
              Join the next generation of verification engineers who are building better chips faster with the 
              power of visual blocks and AI assistance working together in harmony.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-badge">
              <span className="badge-icon">🎯</span>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">🧩</span>
              <span>Visual Blocks</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">🔗</span>
              <span>Deep Integrations</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon">⚡</span>
              <span>Lightning Fast</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

