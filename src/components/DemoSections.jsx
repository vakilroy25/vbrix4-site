import ExampleSection from './ExampleSection';
import './DemoSections.css';

const DemoSections = () => {
  return (
    <section id="demos" className="demo-sections">
      <div className="container">
        <h2 className="demos-title">
          See <span className="gradient-text">vBrix4</span> in Action
        </h2>

        <ExampleSection
          title="Anomaly Detection"
          description="Our AI-powered anomaly detection scans through thousands of log lines and waveforms to surface unusual behaviors instantly. It learns from your patterns and highlights issues that matter, saving you hours of manual inspection."
          videoId="VIDEO_ID_1"
          reverse={false}
        />

        <ExampleSection
          title="Fork Diff Analysis"
          description="Compare two simulation runs side-by-side and pinpoint exactly where execution paths diverge. Perfect for debugging non-deterministic behaviors and understanding how changes affect your verification flow."
          videoId="VIDEO_ID_2"
          reverse={true}
        />

        <ExampleSection
          title="Prompt-to-Block"
          description="Describe what you need in natural language and watch vBrix4 generate a ready-to-use verification block complete with inputs, outputs, and logic. Accelerate your workflow development with AI assistance."
          videoId="VIDEO_ID_3"
          reverse={false}
        />
      </div>
    </section>
  );
};

export default DemoSections;

