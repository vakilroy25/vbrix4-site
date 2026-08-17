import ExampleSection from './ExampleSection';
import './DemoSections.css';

const DemoSections = () => {
  return (
    <section id="demos" className="demo-sections" aria-labelledby="demos-title">
      <div className="container">
        <h2 id="demos-title" className="demos-title">
          What You Can Build With <span className="gradient-text">vBrix4</span>
        </h2>

        <ExampleSection
          title="Build Verification Workflows, Visually"
          description="Assemble a workflow the way you'd sketch it on a whiteboard: drag in AI blocks, agents, scripts, EDA tool invocations, and traditional verification steps, then connect them into something you can actually run. Create task-specific agents and give each one the tools, instructions, skills, and files it needs to do a single job well. There's no orchestration framework to learn and no API glue to maintain—the platform handles the plumbing so you stay focused on the verification problem."
          imageSrc="/images/workflow-builder.png"
          reverse={false}
        />

        <ExampleSection
          title="Bring Your Own Agents, Models, and Tools"
          description="Agents built internally, agents from outside vendors, agents you create here—vBrix4 hosts and orchestrates all of them side by side, alongside the simulators, scripts, and utilities your flow already depends on. It understands verification artifacts like logs and waveforms, and it's deliberately generic at the orchestration level, so the next model or technique your team wants to try becomes another block in a workflow rather than another standalone tool to evaluate and integrate from scratch."
          imageSrc="/images/bring-your-own-agents.png"
          reverse={true}
        />

        <ExampleSection
          title="Run It Anywhere in Your Flow, Again and Again"
          description="Launch a workflow by hand, put it on a schedule, or trigger it from CI, nightly regressions, or any external system—and use chat when asking a question or kicking off an action is faster than clicking. Results land wherever your team already looks. Because every workflow can be saved, shared, and standardized, the best version of a debug or coverage procedure becomes the version the whole team runs, inside your network and on-prem with local LLMs when your security model requires it."
          imageSrc="/images/run-it-anywhere.png"
          reverse={false}
        />
      </div>
    </section>
  );
};

export default DemoSections;

