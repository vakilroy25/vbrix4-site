import ExampleSection from './ExampleSection';
import './DemoSections.css';

const DemoSections = () => {
  return (
    <section id="demos" className="demo-sections" aria-labelledby="demos-title">
      <div className="container">
        <h2 id="demos-title" className="demos-title">
          Key <span className="gradient-text">vBrix4</span> Features
        </h2>

        <ExampleSection
          title="Drag & Drop Visual Workflow"
          description="Build complex verification workflows with an intuitive drag-and-drop interface that makes process design feel natural and effortless. Connect blocks, define relationships, and visualize your entire workflow at a glance. No coding required—simply drag components onto the canvas, let vBrix4 handle the underlying logic, and execute your workflows instantly with a single click."
          imageSrc="/images/drag-drop-workflow.png"
          reverse={false}
        />

        <ExampleSection
          title="Seamless AI Integration"
          description="Experience the power of AI deeply embedded within your workflow, providing intelligent assistance at every step. From natural language prompts to automated block generation, our AI adapts to your needs and learns from your patterns. Transform ideas into executable workflows with conversational commands and real-time AI recommendations."
          imageSrc="/images/ai-integration.png"
          reverse={true}
        />

        <ExampleSection
          title="Business Intelligence & External Connectivity"
          description="Visualize your data with rich charts, graphs, and key performance indicators that provide actionable insights at a glance. Connect seamlessly with external tools like WhatsApp, email, and other communication channels to integrate vBrix4 into your broader ecosystem. Monitor, analyze, and share results across your organization with powerful BI features and flexible I/O options."
          imageSrc="/images/bi-connectivity.png"
          reverse={false}
        />
      </div>
    </section>
  );
};

export default DemoSections;

