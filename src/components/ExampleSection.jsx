import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './ExampleSection.css';

const ExampleSection = ({ title, description, imageSrc, reverse = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`example-section ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="example-content">
        <h3 className="example-title">{title}</h3>
        <p className="example-description">{description}</p>
      </div>
      
      <div className="example-video">
        <div className="video-wrapper glass">
          <img
            src={imageSrc}
            alt={title}
            className="example-image"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ExampleSection;

