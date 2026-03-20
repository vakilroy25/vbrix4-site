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
          title="Agents That Investigate, Not Just Report"
          description="When a simulation fails, vBrix4 agents don't just flag it—they dig in. Each agent is built to trace failures to their source: cross-referencing waveforms and logs, running follow-up simulations, and forming hypotheses autonomously until a root cause emerges. What typically takes a verification engineer hours of manual triage can be handed off entirely, with a structured report delivered at the end. The agent works with awareness of your design environment, so its investigation is focused—not generic."
          imageSrc="/images/pillar1.png"
          reverse={false}
        />

        <ExampleSection
          title="Close Coverage Gaps Without Writing Every Test"
          description="Coverage closure is one of the most labor-intensive phases of verification—and one of the easiest places to miss something important. vBrix4 agents are designed to analyze your current coverage state, identify the gaps that matter most, and generate targeted tests to close them. Rather than spraying random stimulus, each generated test is informed by your design context—targeting specific behaviors, corner cases, and historically tricky scenarios. Less guesswork, more signal."
          imageSrc="/images/pillar2.png"
          reverse={true}
        />

        <ExampleSection
          title="Built to Live Inside Your Existing Environment"
          description="vBrix4 is designed to integrate, not disrupt. Agents can be triggered from your existing CI or issue-tracking tools, execute their full run autonomously, and push structured results back wherever your team works—email, dashboards, or other reporting channels. The underlying platform lets teams build reusable workflow blocks, encoding best practices once and sharing them across projects. It's the operational layer that keeps everything connected, so the agents can focus on the work that matters."
          imageSrc="/images/pillar3.png"
          reverse={false}
        />
      </div>
    </section>
  );
};

export default DemoSections;

