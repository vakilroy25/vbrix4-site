import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AgentIcon, LinkIcon, ShieldIcon, WorkflowIcon } from './Icons';
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
            <span className="gradient-text">Close the Gap</span> Between AI and Verification
          </h2>
          
          <div className="about-text">
            <p>
              Verification organizations already have AI models, internally built agents, scripts, EDA tools, 
              and automation utilities—and new AI techniques arrive every month. What's missing is the 
              connective layer. These pieces live in separate places, take real engineering effort to wire 
              together, and rarely reach the engineers who would benefit most. Verification engineers are 
              experts in verification, not in orchestration frameworks, APIs, and agent infrastructure.
            </p>
            
            <p>
              vBrix4 is that layer. One environment to <strong>build workflows visually</strong>, create 
              task-specific agents equipped with the tools, instructions, skills, and knowledge they need, 
              import agents developed elsewhere, and combine all of it with the scripts, EDA steps, and AI 
              blocks already in your flow. Workflows run on demand, on a schedule, or triggered from external 
              systems, and they're saved, reused, and shared so verification know-how compounds across projects 
              instead of living in one engineer's home directory.
            </p>

            <p>
              The move is from scattered scripts, tools, agents, and AI experiments to an organized, reusable, 
              automated verification AI environment—and the payoff is the one that has always mattered: 
              more bugs found, in less time.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-badge">
              <span className="badge-icon"><WorkflowIcon /></span>
              <span>Visual Workflow Builder</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon"><AgentIcon /></span>
              <span>Build or Import Agents</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon"><LinkIcon /></span>
              <span>Fits Your Existing Flow</span>
            </div>
            <div className="feature-badge">
              <span className="badge-icon"><ShieldIcon /></span>
              <span>On-Prem & Local LLMs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

