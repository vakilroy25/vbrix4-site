const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const WorkflowIcon = () => (
  <Icon>
    <rect x="2" y="9" width="6" height="6" rx="1.5" />
    <rect x="16" y="3" width="6" height="6" rx="1.5" />
    <rect x="16" y="15" width="6" height="6" rx="1.5" />
    <path d="M8 12h4V6h4" />
    <path d="M8 12h4v6h4" />
  </Icon>
);

export const AgentIcon = () => (
  <Icon>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 4.5V8" />
    <circle cx="12" cy="3.2" r="1.2" />
    <circle cx="9.2" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <path d="M9.5 16.8h5" />
  </Icon>
);

export const KnowledgeIcon = () => (
  <Icon>
    <path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13A2.5 2.5 0 0 1 6.5 3z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    <path d="M8.5 7.5h7" />
    <path d="M8.5 11h4.5" />
  </Icon>
);

export const ImportIcon = () => (
  <Icon>
    <path d="M12 3v9.5" />
    <path d="M8.5 9 12 12.5 15.5 9" />
    <path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15" />
  </Icon>
);

export const LayersIcon = () => (
  <Icon>
    <path d="M12 2.5 2.5 7 12 11.5 21.5 7z" />
    <path d="M2.5 12 12 16.5 21.5 12" />
    <path d="M2.5 17 12 21.5 21.5 17" />
  </Icon>
);

export const ScheduleIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 7v5.2l3.6 2.1" />
  </Icon>
);

export const WaveformIcon = () => (
  <Icon>
    <path d="M2 16h3V8h4.5v8H14V8h4.5v8H22" />
  </Icon>
);

export const ChatIcon = () => (
  <Icon>
    <path d="M20.5 11.8a7.7 7.7 0 0 1-8.3 7.7 8.6 8.6 0 0 1-2.6-.4L4.5 21l1.5-4.4a7.5 7.5 0 0 1-1-3.8 7.7 7.7 0 0 1 7.7-7.7 7.7 7.7 0 0 1 7.8 6.7z" />
    <path d="M9.5 12h5.5" />
  </Icon>
);

export const ReuseIcon = () => (
  <Icon>
    <path d="M20.5 5v5h-5" />
    <path d="M3.5 19v-5h5" />
    <path d="M4.2 9.5A8 8 0 0 1 18 6.8l2.5 2.4" />
    <path d="M19.8 14.5A8 8 0 0 1 6 17.2L3.5 14.8" />
  </Icon>
);

export const ShieldIcon = () => (
  <Icon>
    <path d="M12 3 19.5 6v5.4c0 4.6-3.1 7.7-7.5 9.4-4.4-1.7-7.5-4.8-7.5-9.4V6z" />
    <circle cx="12" cy="11" r="1.8" />
    <path d="M12 12.8v2.8" />
  </Icon>
);

export const ChevronLeftIcon = () => (
  <Icon>
    <path d="M14.5 5 8 12l6.5 7" strokeWidth="1.8" />
  </Icon>
);

export const ChevronRightIcon = () => (
  <Icon>
    <path d="M9.5 5 16 12l-6.5 7" strokeWidth="1.8" />
  </Icon>
);

export const LinkIcon = () => (
  <Icon>
    <path d="M10.2 13.8a4.4 4.4 0 0 0 6.6.5l2.6-2.6a4.4 4.4 0 0 0-6.2-6.2l-1.5 1.5" />
    <path d="M13.8 10.2a4.4 4.4 0 0 0-6.6-.5L4.6 12.3a4.4 4.4 0 0 0 6.2 6.2l1.5-1.5" />
  </Icon>
);
