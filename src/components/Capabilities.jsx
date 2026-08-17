import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AgentIcon,
  ChatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImportIcon,
  KnowledgeIcon,
  LayersIcon,
  ReuseIcon,
  ScheduleIcon,
  ShieldIcon,
  WaveformIcon,
  WorkflowIcon
} from './Icons';
import './Capabilities.css';

const capabilities = [
  {
    Icon: WorkflowIcon,
    title: 'Visual Workflow Builder',
    text: 'Drag blocks onto a canvas and wire them into a runnable flow.'
  },
  {
    Icon: AgentIcon,
    title: 'Task-Specific Agents',
    text: 'Build agents for one job each, with the tools and skills they need.'
  },
  {
    Icon: KnowledgeIcon,
    title: 'Your Knowledge, In Context',
    text: 'Point agents at the specs and files that make answers trustworthy.'
  },
  {
    Icon: ImportIcon,
    title: 'Import External Agents',
    text: 'Run agents built internally or by vendors alongside your own.'
  },
  {
    Icon: LayersIcon,
    title: 'Mixed Workflows',
    text: 'AI blocks, scripts, and EDA steps in a single flow.'
  },
  {
    Icon: ScheduleIcon,
    title: 'Run On Your Terms',
    text: 'Trigger by hand, on a schedule, or straight from CI.'
  },
  {
    Icon: WaveformIcon,
    title: 'Verification Artifacts',
    text: 'Works with the logs and waveforms your flow already produces.'
  },
  {
    Icon: ChatIcon,
    title: 'Chat Interface',
    text: 'Ask questions and launch actions in plain language.'
  },
  {
    Icon: ReuseIcon,
    title: 'Reuse and Standardize',
    text: 'Save and share workflows so the whole team runs the best one.'
  },
  {
    Icon: ShieldIcon,
    title: 'Private by Deployment',
    text: 'Run on-prem in your own network, with local LLMs.'
  }
];

const AUTOPLAY_INTERVAL_MS = 3000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Capabilities = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isOnScreen = useInView(sectionRef);

  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion());
  const [isPointerHeld, setIsPointerHeld] = useState(false);
  const [restartToken, setRestartToken] = useState(0);

  // Cards snap individually, so pages are derived from how many fit in view.
  const measure = () => {
    const track = trackRef.current;
    const cards = track ? Array.from(track.children) : [];
    if (!track || cards.length === 0 || track.clientWidth === 0) return null;

    const stride = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
    const perView = Math.max(1, Math.round(track.clientWidth / stride));

    return {
      track,
      cards,
      stride,
      perView,
      maxScroll: track.scrollWidth - track.clientWidth,
      pages: Math.ceil(cards.length / perView)
    };
  };

  const sync = useCallback(() => {
    const m = measure();
    if (!m) return;

    setPageCount(m.pages);
    // The final page can't scroll a full stride, so pin it once we hit the end.
    setActivePage(
      m.track.scrollLeft >= m.maxScroll - 2
        ? m.pages - 1
        : Math.floor(Math.round(m.track.scrollLeft / m.stride) / m.perView)
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const scrollToPage = (page) => {
    const m = measure();
    if (!m) return;

    const target = Math.min(Math.max(page, 0), m.pages - 1);
    const card = m.cards[Math.min(target * m.perView, m.cards.length - 1)];

    m.track.scrollTo({
      left: Math.min(card.offsetLeft - m.cards[0].offsetLeft, m.maxScroll),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  };

  const goToPage = (page) => {
    scrollToPage(page);
    setRestartToken((token) => token + 1);
  };

  const isAutoScrolling = isPlaying && !isPointerHeld && isOnScreen && pageCount > 1;

  const positionRef = useRef({ activePage, pageCount });
  positionRef.current = { activePage, pageCount };

  useEffect(() => {
    if (!isAutoScrolling) return;

    const timer = setInterval(() => {
      const { activePage: page, pageCount: pages } = positionRef.current;
      scrollToPage(page + 1 >= pages ? 0 : page + 1);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAutoScrolling, restartToken]);

  const atStart = activePage <= 0;
  const atEnd = activePage >= pageCount - 1;

  return (
    <section id="capabilities" className="capabilities-section" aria-labelledby="capabilities-title">
      <div className="container">
        <h2 id="capabilities-title" className="capabilities-title">
          Building Blocks You Can <span className="gradient-text">Combine</span>
        </h2>
        <p className="capabilities-subtitle">
          Every piece below is something you drop into a workflow—no glue code required.
        </p>

        <motion.div
          ref={sectionRef}
          className="cap-carousel"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onPointerEnter={() => setIsPointerHeld(true)}
          onPointerLeave={() => setIsPointerHeld(false)}
          onFocus={() => setIsPointerHeld(true)}
          onBlur={() => setIsPointerHeld(false)}
        >
          <ul
            className="cap-track"
            ref={trackRef}
            onScroll={sync}
            tabIndex={0}
            role="group"
            aria-label="Platform capabilities, scrollable"
          >
            {capabilities.map((capability) => (
              <li className="cap-card glass" key={capability.title}>
                <span className="cap-card-icon">
                  <capability.Icon />
                </span>
                <h3 className="cap-card-title">{capability.title}</h3>
                <p className="cap-card-text">{capability.text}</p>
              </li>
            ))}
          </ul>

          <div
            className="cap-controls"
            hidden={pageCount <= 1}
            style={{ '--cap-interval': `${AUTOPLAY_INTERVAL_MS}ms` }}
          >
            <button
              type="button"
              className="cap-arrow cap-toggle"
              onClick={() => setIsPlaying((playing) => !playing)}
              aria-label={isPlaying ? 'Pause automatic scrolling' : 'Resume automatic scrolling'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 12 14" aria-hidden="true" focusable="false">
                  <rect x="1" y="1" width="3.5" height="12" rx="1" />
                  <rect x="7.5" y="1" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 14" aria-hidden="true" focusable="false">
                  <path d="M2 1.5 11 7 2 12.5Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="cap-arrow"
              onClick={() => goToPage(activePage - 1)}
              disabled={atStart}
              aria-label="Previous capabilities"
            >
              <ChevronLeftIcon />
            </button>

            <div className="cap-dots">
              {Array.from({ length: pageCount }).map((_, page) => (
                <button
                  type="button"
                  key={page}
                  className={`cap-dot ${page === activePage ? 'active' : ''} ${
                    page === activePage && isAutoScrolling ? 'progress' : ''
                  }`}
                  onClick={() => goToPage(page)}
                  aria-label={`Go to capabilities page ${page + 1}`}
                  aria-current={page === activePage}
                />
              ))}
            </div>

            <button
              type="button"
              className="cap-arrow"
              onClick={() => goToPage(activePage + 1)}
              disabled={atEnd}
              aria-label="Next capabilities"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Capabilities;
