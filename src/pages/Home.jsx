import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroGlobe from '../components/HeroGlobe';

const BASE = import.meta.env.BASE_URL;
const EASE = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    id: 1,
    num: '01',
    title: 'Web Design',
    tag: 'Strategy · UX / UI · Visual Direction',
    desc: 'Strategy, information architecture, UX/UI, responsive design and visual direction. We start with the content and the goal — not the layout — so every decision has a reason behind it.',
    items: [
      {
        title: 'Information Architecture',
        desc: 'We map the pages, the hierarchy and the navigation before any layout decisions are made — so the structure holds up as the site grows.',
      },
      {
        title: 'UX / UI Design',
        desc: 'Interface design grounded in real content and real user flows — not placeholder text and lorem ipsum.',
      },
      {
        title: 'Visual Direction',
        desc: 'Typography, colour, spacing and imagery defined as a system that stays consistent across every page and screen.',
      },
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Web Development',
    tag: 'Front-End · CMS · Performance',
    desc: "Fast, responsive and maintainable websites built around each project's requirements. Semantic markup, lightweight JavaScript and performance treated as a design decision.",
    items: [
      {
        title: 'Front-End Development',
        desc: 'Semantic HTML, modern CSS and lightweight JavaScript — built to be read, extended and maintained by another developer.',
      },
      {
        title: 'CMS Integration',
        desc: 'Content modelled around how the team actually writes, publishes and updates — not around a template.',
      },
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Brand Identity',
    tag: 'Typography · Colour · Visual Systems',
    desc: 'Visual systems, identity direction, typography, colour and digital brand expression. Rules that hold up across every surface — from a favicon to a full site.',
    items: [
      {
        title: 'Identity Direction',
        desc: 'A visual direction that comes from strategy — the market, the audience and the story — not from a mood board alone.',
      },
    ],
  },
  {
    id: 4,
    num: '04',
    title: 'Digital Experiences',
    tag: 'Interactivity · Motion · Immersive',
    desc: 'Interactive components, fluid motion, and immersive 3D/WebGL experiences that elevate standard interfaces.',
    items: [
      {
        title: 'Motion & Interaction',
        desc: 'Using animation to guide attention and explain functionality, rather than just decorating.',
      },
    ],
  },
];

const PROJECTS = [
  {
    num: '01',
    name: 'FINORA',
    type: 'Fintech Website Concept',
    tags: 'Website Design · UX · Development',
    tag: 'Concept Project',
    img: `${BASE}assets/img/photo-c826-1280.jpg`,
    srcSet: `${BASE}assets/img/photo-c826-960.jpg 960w, ${BASE}assets/img/photo-c826-1280.jpg 1280w, ${BASE}assets/img/photo-c826.jpg 1920w`,
    alt: 'Curved architectural paper sculpture in emerald and dark shadow representing Finora fintech concept',
    subject: 'texture',
  },
  {
    num: '02',
    name: 'NORTHLINE',
    type: 'Architecture Brand Concept',
    tags: 'Identity · Website · Art Direction',
    tag: 'Self-Initiated',
    img: `${BASE}assets/img/photo-c823-960.jpg`,
    srcSet: `${BASE}assets/img/photo-c823-960.jpg 960w`,
    alt: 'Layered architectural stone-grey paper sheets with geometric shadow lines representing Northline concept',
    subject: 'texture',
  },
  {
    num: '03',
    name: 'AUREL',
    type: 'Premium Commerce Concept',
    tags: 'UX · E-commerce · Development',
    tag: 'Concept Design',
    img: `${BASE}assets/img/photo-d88-960.jpg`,
    srcSet: `${BASE}assets/img/photo-d88-960.jpg 960w`,
    alt: 'Cream ceramic lamp in directional sunlight casting crisp shadows representing Aurel commerce concept',
    subject: 'detail',
  },
];

const DISCIPLINES = [
  'Web Design',
  'Web Development',
  'Brand Identity',
  'Digital Experiences',
  'UI / UX',
  'Website Redesign',
];

const CLIENT_TYPES = [
  { t: 'Startups & Tech', d: 'Early-stage and growing tech companies needing clear product communication.' },
  { t: 'Studios & Agencies', d: 'Creative teams looking for a reliable development partner.' },
  { t: 'B2B Services', d: 'Professional services requiring a high-quality digital presence.' },
  { t: 'Architecture & Design', d: 'Firms needing portfolio sites that respect the work.' },
  { t: 'E-Commerce', d: 'Independent brands focused on premium shopping experiences.' },
];

const PROCESS_STEPS = [
  { title: 'Discover', desc: 'Understanding the audience, the goals and the constraints.' },
  { title: 'Define', desc: 'Information architecture and wireframing the core structure.' },
  { title: 'Design', desc: 'Creating the visual system and applying it to the interfaces.' },
  { title: 'Build', desc: 'Writing the front-end code and integrating the back-end systems.' },
  { title: 'Launch', desc: 'Testing, deployment and handing over the final product.' },
];

const TEAM_ADVANTAGES = [
  { t: 'Direct communication', d: 'You talk directly to the people designing and building your site. No layers of account management.' },
  { t: 'Focused execution', d: 'We take on a limited number of projects to ensure every client gets the attention required.' },
  { t: 'Flexible collaboration', d: 'We integrate with internal teams, or handle the entire process from start to finish.' },
  { t: 'Design + dev together', d: "Because we do both, design decisions aren't compromised during development." },
];

const STUDIO_ROLES = [
  { r: 'Project Lead', n: 'Strategy & Direction' },
  { r: 'Design', n: 'UX / UI & Visual' },
  { r: 'Development', n: 'Front-End & CMS' },
  { r: 'Coordination', n: 'Timeline & QA' },
];

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take between 6 to 12 weeks from strategy to launch, depending on the complexity of the requirements and the speed of feedback.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes. We frequently work with early-stage companies to establish their initial digital presence and product marketing sites.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We build primarily with React, Next.js, and modern CSS for the front-end, integrated with headless CMS platforms like Sanity or Prismic.',
  },
  {
    q: 'Can you help with branding first?',
    a: 'Yes, we often handle brand identity and visual direction as the first phase before moving into web design and development.',
  },
  {
    q: 'Do you maintain the site after launch?',
    a: 'Yes, we offer ongoing support and maintenance retainers for clients who want continuous iterations and improvements.',
  },
  {
    q: 'How do you handle project management?',
    a: 'We use shared tools (like Notion or Linear) and schedule regular check-ins. You communicate directly with the team doing the work.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We provide fixed-price proposals based on a defined scope of work after our initial discovery conversations.',
  },
];

const SERVICE_OPTIONS = [
  { value: 'design', label: 'Web Design & UX' },
  { value: 'development', label: 'Web Development' },
  { value: 'brand', label: 'Brand Identity' },
  { value: 'full', label: 'Full Website Creation' },
  { value: 'other', label: 'Other' },
];

const BUDGET_OPTIONS = [
  { value: 'small', label: '$5k - $10k' },
  { value: 'medium', label: '$10k - $25k' },
  { value: 'large', label: '$25k - $50k' },
  { value: 'xlarge', label: '$50k+' },
];

// Selective big-tech editorial section reveal (used only on section heads, not every item)
const SectionHeadReveal = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const CustomSelect = ({ id, labelId, options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value) || null;
  const containerRef = useRef(null);

  useEffect(() => {
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-[var(--btn-h)] px-3 flex items-center justify-between bg-[var(--bg)] border border-[var(--line-strong)] rounded-[var(--r-sm)] text-[16px] text-left hover:border-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--action)] transition-colors cursor-pointer"
      >
        <span className={selected ? 'text-[var(--ink)] font-normal' : 'text-[var(--muted)] font-normal'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-[var(--muted)] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="df-select-menu absolute top-[calc(100%+6px)] left-0 w-full z-30 py-1.5 overflow-hidden"
          >
            {options.map((opt) => {
              const isSelected = selected?.value === opt.value;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-[15px] flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[var(--p-surface)] text-[var(--p-ink)] font-medium'
                        : 'text-[var(--p-ink)] hover:bg-[var(--p-surface)]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="text-[var(--p-accent)] text-[13px]" aria-hidden="true">✓</span>}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home({ onNavigateSection }) {
  // All Capabilities and FAQ cards start closed by default and open when clicked
  const [openServices, setOpenServices] = useState(() => new Set());
  const [openFaqs, setOpenFaqs] = useState(() => new Set());

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    let active = true;
    const mountMoments = async () => {
      try {
        window.__momentsManual = true;
        const mod = await import(/* @vite-ignore */ `${BASE}assets/moments/moments.js`);
        if (!active) return;
        mod.unmountAll(document);
        await mod.mountAll(document);
      } catch {
        document.documentElement.classList.add('mo-safe');
      }
    };
    mountMoments();
    return () => {
      active = false;
    };
  }, []);

  const toggleService = (id) => {
    setOpenServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFaq = (idx) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleFormSubmit = (e) => {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Write your full name so we know who to reply to.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Write a valid work email address with an @.';
    }
    if (!details.trim()) {
      nextErrors.details = 'Share a short note about your goals or timeline.';
    }

    setErrors(nextErrors);

    const errKeys = Object.keys(nextErrors);
    if (errKeys.length > 0) {
      e.preventDefault();
      setFormStatus(`Please check ${errKeys.length} ${errKeys.length === 1 ? 'field' : 'fields'} highlighted above.`);
      const firstId = errKeys[0] === 'name' ? 'f-name' : errKeys[0] === 'email' ? 'f-email' : 'f-details';
      document.getElementById(firstId)?.focus();
      return;
    }

    e.preventDefault();
    const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === serviceType)?.label || 'Not specified';
    const budgetLabel = BUDGET_OPTIONS.find((o) => o.value === budget)?.label || 'Not specified';

    const subject = encodeURIComponent(`Project Enquiry from ${name.trim()}${company.trim() ? ` (${company.trim()})` : ''}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nWork email: ${email.trim()}\nCompany: ${company.trim() || 'Not specified'}\nService: ${serviceLabel}\nBudget range: ${budgetLabel}\n\nProject details:\n${details.trim()}`
    );

    setFormStatus('Opening your email client to send the enquiry to hello@deepfons.studio.');
    window.location.href = `mailto:hello@deepfons.studio?subject=${subject}&body=${body}`;
  };

  return (
    <main id="top" tabIndex={-1} className="outline-none">
      {/* 1. HERO (choreographed post-loader entrance, crisp cubic-bezier) */}
      <section className="hero hero--split" data-enter aria-labelledby="hero-h">
        <div className="wrap">
          <div className="hero-text grid hero-split">
            <div className="hero-copy span-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.95, ease: EASE }}
                className="hero__kicker"
              >
                <span className="dot" aria-hidden="true" />
                Independent Digital Team
              </motion.p>

              <motion.h1
                id="hero-h"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.02, ease: EASE }}
              >
                Designing digital experiences with absolute clarity.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.12, ease: EASE }}
                className="hero__lead"
              >
                A focused team combining strategy, design and development to create thoughtful digital experiences for ambitious businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.2, ease: EASE }}
                className="btn-row"
              >
                <a
                  href="#contact"
                  onClick={(e) => onNavigateSection(e, '#contact')}
                  className="btn btn--primary"
                >
                  Start a Project
                  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                    <path className="m-arrow__stem" d="M1 6h8" />
                    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </a>
                <a
                  href="#work"
                  onClick={(e) => onNavigateSection(e, '#work')}
                  className="btn btn--secondary"
                >
                  View Our Work
                </a>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
                className="hero-facts"
              >
                <div className="col-span-3">
                  <dt>Location</dt>
                  <dd>Based in India · Working worldwide</dd>
                </div>
              </motion.dl>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.98, ease: EASE }}
              className="hero-visual hero__media span-6 df-start-7"
            >
              <img
                src={`${BASE}assets/img/photo-f89043163.jpg`}
                srcSet={`${BASE}assets/img/photo-f89043163-960.jpg 960w, ${BASE}assets/img/photo-f89043163.jpg 1280w`}
                sizes="(max-width: 1023px) 100vw, 60vw"
                width="1280"
                height="928"
                alt="Architectural grid drawing and pigment swatch studies pinned to a studio wall"
                fetchPriority="high"
                decoding="async"
                data-source="stand-in"
                data-subject="studio"
              />
              <div className="ly-float">
                <div className="ly-float__row">
                  <span className="ly-live">Independent Digital Team</span>
                </div>
                <div className="ly-float__title">Based in India · Working worldwide</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. POSITIONING & GLOBAL REACH */}
      <section className="section section--flow ground-surface" aria-labelledby="positioning-h">
        <div className="wrap">
          <div className="grid grid--top gap-y-10">
            <SectionHeadReveal className="span-6 flex flex-col gap-6">
              <h2 id="positioning-h" className="t-h2">
                A team with a <span className="muted">focused way of working.</span>
              </h2>

              <div data-moment="word-highlight">
                <p className="mo-wh__text text-[20px] md:text-[24px] leading-[1.45] tracking-[-0.015em] font-normal max-w-[44ch] text-[var(--ink)]">
                  We bring <strong>design</strong>, development and project coordination together in one flexible team — allowing us to stay close to the work and communicate directly with the people we build for.
                </p>
              </div>

              <p className="text-[16px] text-[var(--ink)] pt-2">
                Working remotely with businesses across the UK, US, Canada and beyond.
              </p>
            </SectionHeadReveal>

            <div className="span-6 df-start-7 h-[320px] md:h-[380px]">
              <HeroGlobe />
            </div>
          </div>

          <div className="mt-14 md:mt-16 df-subgrid-6">
            {DISCIPLINES.map((txt, i) => (
              <div key={txt} className="pt-4 border-t border-[var(--line)] flex items-baseline gap-2.5">
                <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                  0{i + 1}
                </span>
                <span className="text-[16px] font-medium text-[var(--ink)]">{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORK */}
      <section id="work" className="section section--flow ground-base" aria-labelledby="work-h">
        <div className="wrap">
          <SectionHeadReveal>
            <p className="t-label text-[var(--muted)] mb-4">01 · Selected Work</p>
            <div className="grid grid--top gap-y-6 mb-12">
              <div className="span-6">
                <h2 id="work-h">Concept work, made to explore our approach.</h2>
              </div>
              <div className="span-6 df-start-7">
                <p className="t-lead text-[var(--ink)] max-w-[46ch]">
                  A selection of concepts and self-initiated projects created to explore how we think about design, development and digital experiences. These are not paid client engagements.
                </p>
              </div>
            </div>
          </SectionHeadReveal>

          <div className="grid gap-y-8">
            {PROJECTS.map((proj) => (
              <a
                key={proj.num}
                href="#contact"
                onClick={(e) => onNavigateSection(e, '#contact')}
                className="span-4 work-tile group"
              >
                <div className="work-tile__media">
                  <img
                    className="work-tile__img"
                    src={proj.img}
                    srcSet={proj.srcSet}
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    width="960"
                    height="720"
                    alt={proj.alt}
                    loading="lazy"
                    decoding="async"
                    data-source="library-057"
                    data-subject={proj.subject}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                      {proj.num} · {proj.tag}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[18px] text-[var(--muted)] group-hover:text-[var(--action)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    >
                      ↗
                    </span>
                  </div>

                  <h3 className="df-h3 text-[var(--ink)]">{proj.name}</h3>

                  <p className="text-[16px] text-[var(--ink)]">{proj.type}</p>

                  <p className="mt-auto pt-3 text-[13px] font-medium text-[var(--muted)]">
                    {proj.tags}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-10 text-[16px] text-[var(--ink)] max-w-[62ch]">
            These concepts are internal explorations — not paid client work. We label them clearly so you can judge the thinking and craft for what it is.
          </p>
        </div>
      </section>

      {/* 4. CAPABILITIES (closed by default, smooth AnimatePresence expand/collapse on click) */}
      <section id="services" className="section section--flow ground-surface" aria-labelledby="services-h">
        <div className="wrap">
          <SectionHeadReveal>
            <p className="t-label text-[var(--muted)] mb-4">02 · Capabilities</p>
            <div className="grid grid--top gap-y-6 mb-12">
              <div className="span-6">
                <h2 id="services-h">What we can build.</h2>
              </div>
              <div className="span-6 df-start-7">
                <p className="t-lead text-[var(--ink)] max-w-[46ch]">
                  Four connected areas of work. We often combine them — but each can stand on its own depending on what a project actually needs. Open a service to see what's inside.
                </p>
              </div>
            </div>
          </SectionHeadReveal>

          <div className="df-subgrid-2 items-start">
            {SERVICES.map((service) => {
              const isOpen = openServices.has(service.id);
              const panelId = `service-panel-${service.id}`;
              return (
                <article
                  key={service.id}
                  className={`card m-nolift p-6 md:p-8 flex flex-col transition-colors duration-200 ${
                    isOpen ? 'border-[var(--line-strong)]' : 'hover:border-[var(--line-strong)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full block text-left group cursor-pointer"
                  >
                    <span className="w-full flex items-start justify-between gap-4">
                      <span className="flex flex-col gap-1.5 min-w-0">
                        <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                          {service.num} · {service.tag}
                        </span>
                        <h3 className="df-h3 text-[var(--ink)] group-hover:text-[var(--muted)] transition-colors">
                          {service.title}
                        </h3>
                      </span>

                      <span
                        aria-hidden="true"
                        className={`w-9 h-9 rounded-full border border-[var(--line-strong)] inline-grid place-items-center shrink-0 transition-transform duration-250 ${
                          isOpen ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] rotate-90' : 'text-[var(--ink)]'
                        }`}
                      >
                        →
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pt-5">
                          <p className="text-[16px] leading-[1.6] text-[var(--ink)]">
                            {service.desc}
                          </p>
                          {service.items && service.items.length > 0 && (
                            <ul className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
                              {service.items.map((item, idx) => (
                                <li key={idx} className="flex flex-col gap-1">
                                  <h4 className="text-[17px] font-medium text-[var(--ink)]">{item.title}</h4>
                                  <p className="text-[16px] leading-[1.55] text-[var(--muted)]">{item.desc}</p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHO WE WORK WITH */}
      <section className="section section--flow ground-base" aria-labelledby="clients-h">
        <div className="wrap">
          <SectionHeadReveal className="grid grid--top gap-y-6 mb-12">
            <div className="span-6">
              <h2 id="clients-h">Who we work with.</h2>
            </div>
            <div className="span-6 df-start-7">
              <p className="t-lead text-[var(--ink)] max-w-[46ch]">
                We partner with ambitious teams who value design and technical craft. Our structure suits projects where direct communication and focused execution matter.
              </p>
            </div>
          </SectionHeadReveal>

          <div className="df-subgrid-5">
            {CLIENT_TYPES.map((item, idx) => (
              <article key={item.t} className="card m-nolift justify-between p-6">
                <div className="flex flex-col gap-2.5">
                  <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                    0{idx + 1}
                  </span>
                  <h3 className="df-h3 text-[var(--ink)]">{item.t}</h3>
                </div>
                <p className="text-[16px] leading-[1.55] text-[var(--ink)] mt-4">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APPROACH / PROCESS */}
      <section id="approach" className="section section--flow ground-surface" aria-labelledby="approach-h">
        <div className="wrap">
          <p className="t-label text-[var(--muted)] mb-4">03 · How We Work</p>
          <div className="grid grid--top gap-y-10">
            <SectionHeadReveal className="span-6 stack-4">
              <h2 id="approach-h">Process</h2>
              <p className="t-lead text-[var(--ink)] max-w-[40ch]">
                A methodical approach to design and development. We move from understanding the core problem to designing the system, and finally building the product.
              </p>
            </SectionHeadReveal>

            <ol className="span-6 df-start-7">
              {PROCESS_STEPS.map((step, idx) => (
                <li
                  key={step.title}
                  className="py-5 first:pt-0 border-b border-[var(--line)] grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 sm:gap-5 items-baseline"
                >
                  <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                    Phase 0{idx + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="df-h3 text-[var(--ink)]">{step.title}</h3>
                    <p className="text-[16px] leading-[1.55] text-[var(--ink)]">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. WHY THIS TEAM */}
      <section className="section section--flow ground-base" aria-labelledby="why-h">
        <div className="wrap">
          <SectionHeadReveal className="section-head">
            <h2 id="why-h">Why this team.</h2>
          </SectionHeadReveal>

          <div className="grid gap-y-8">
            {TEAM_ADVANTAGES.map((item, idx) => (
              <article
                key={item.t}
                className="span-3 card m-nolift p-6 justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium tabular-nums text-[var(--muted)]">
                    0{idx + 1}
                  </span>
                  <h3 className="df-h3 text-[var(--ink)]">{item.t}</h3>
                </div>
                <p className="text-[16px] leading-[1.55] text-[var(--ink)]">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE STUDIO */}
      <section id="studio" className="section section--flow ground-surface" aria-labelledby="studio-h">
        <div className="wrap">
          <p className="t-label text-[var(--muted)] mb-4">04 · The Studio</p>
          <div className="grid grid--top gap-y-10">
            <SectionHeadReveal className="span-6 flex flex-col gap-6">
              <h2 id="studio-h">An independent structure.</h2>
              <p className="t-lead text-[var(--ink)] max-w-[46ch]">
                We operate as a core unit, bringing in specialised partners — copywriters, illustrators, 3D artists — only when a project demands it. This keeps the process lean and the output focused.
              </p>

              <div className="df-subgrid-2 mt-2 pt-6">
                {STUDIO_ROLES.map((role) => (
                  <div key={role.r} className="pt-3 border-t border-[var(--line)] flex flex-col gap-1">
                    <span className="text-[13px] font-medium text-[var(--muted)]">{role.r}</span>
                    <span className="text-[18px] font-medium text-[var(--ink)]">{role.n}</span>
                  </div>
                ))}
              </div>
            </SectionHeadReveal>

            <figure
              className="studio-develop span-6 df-start-7"
              data-moment="picture-develops"
            >
              <img
                src={`${BASE}assets/img/photo-d183.jpg`}
                srcSet={`${BASE}assets/img/photo-d183-500.jpg 500w, ${BASE}assets/img/photo-d183-960.jpg 960w, ${BASE}assets/img/photo-d183.jpg 1280w`}
                sizes="(max-width: 1023px) 100vw, 50vw"
                width="1280"
                height="853"
                alt="Open blank notebook with a ribbon marker and a pencil lying across the pages on a wooden studio table"
                loading="lazy"
                decoding="async"
                data-source="library-057"
                data-subject="desk"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 9. QUESTIONS / FAQ (closed by default, smooth AnimatePresence expand/collapse on click) */}
      <section className="section section--flow ground-base" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="grid grid--top gap-y-10">
            <SectionHeadReveal className="span-6 stack-4">
              <h2 id="faq-h">Questions.</h2>
            </SectionHeadReveal>

            <div className="span-6 df-start-7">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqs.has(idx);
                const faqPanelId = `faq-panel-${idx}`;
                return (
                  <article key={faq.q} className="border-b border-[var(--line)] py-5 first:pt-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={faqPanelId}
                      className="w-full block text-left group cursor-pointer"
                    >
                      <span className="w-full flex items-baseline justify-between gap-4">
                        <h3 className="df-h3 text-[var(--ink)] group-hover:text-[var(--muted)] transition-colors">
                          {faq.q}
                        </h3>
                        <span
                          aria-hidden="true"
                          className={`text-[18px] text-[var(--muted)] shrink-0 transition-transform duration-250 ${
                            isOpen ? 'rotate-90 text-[var(--ink)]' : ''
                          }`}
                        >
                          →
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={faqPanelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-[16px] leading-[1.6] text-[var(--muted)] max-w-[58ch]">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="section section--flow ground-surface" aria-labelledby="contact-h">
        <div className="wrap">
          <p className="t-label text-[var(--muted)] mb-4">05 · Contact</p>
          <div className="grid grid--top gap-y-12">
            <SectionHeadReveal className="span-6 stack-5">
              <h2 id="contact-h" className="max-w-[18ch]">
                Let's build something worth putting your name on.
              </h2>
              <p className="t-lead text-[var(--ink)] max-w-[38ch]">
                Share a few details and we'll come back within one business day with next steps.
              </p>

              <dl className="mt-6 pt-6 border-t border-[var(--line)] grid gap-3">
                <div className="flex items-baseline gap-6">
                  <dt className="text-[13px] font-medium text-[var(--muted)] w-14">Email</dt>
                  <dd className="m-0">
                    <a href="mailto:hello@deepfons.studio" className="link text-[16px]">
                      hello@deepfons.studio
                    </a>
                  </dd>
                </div>
              </dl>
            </SectionHeadReveal>

            <div className="span-6 df-start-7">
              <form
                action="mailto:hello@deepfons.studio"
                method="post"
                encType="text/plain"
                onSubmit={handleFormSubmit}
                noValidate
                className="form bg-[var(--p-bg)] border border-[var(--line)] rounded-[var(--r-lg)] p-6 md:p-8"
              >
                <div className="field">
                  <label htmlFor="f-name">Name</label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby="f-name-err"
                    required
                  />
                  <p className="field__error" id="f-name-err" hidden={!errors.name}>
                    {errors.name}
                  </p>
                </div>

                <div className="field">
                  <label htmlFor="f-email">Work email</label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby="f-email-err"
                    required
                  />
                  <p className="field__error" id="f-email-err" hidden={!errors.email}>
                    {errors.email}
                  </p>
                </div>

                <div className="field field--full">
                  <label htmlFor="f-company">Company (Optional)</label>
                  <input
                    id="f-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your organisation"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label id="f-service-label" htmlFor="f-service">What do you need?</label>
                  <CustomSelect
                    id="f-service"
                    labelId="f-service-label"
                    placeholder="Select a service"
                    options={SERVICE_OPTIONS}
                    value={serviceType}
                    onChange={setServiceType}
                  />
                </div>

                <div className="field">
                  <label id="f-budget-label" htmlFor="f-budget">Budget range</label>
                  <CustomSelect
                    id="f-budget"
                    labelId="f-budget-label"
                    placeholder="Select a budget"
                    options={BUDGET_OPTIONS}
                    value={budget}
                    onChange={setBudget}
                  />
                </div>

                <div className="field field--full">
                  <label htmlFor="f-details">Project details</label>
                  <textarea
                    id="f-details"
                    name="details"
                    placeholder="Goals, timeline, anything relevant…"
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                    }}
                    aria-invalid={errors.details ? 'true' : undefined}
                    aria-describedby="f-details-err"
                    required
                  />
                  <p className="field__error" id="f-details-err" hidden={!errors.details}>
                    {errors.details}
                  </p>
                </div>

                <div className="field--full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-[14px] text-[var(--muted)]">
                    We reply within one business day.
                  </span>
                  <button type="submit" className="btn btn--primary w-full sm:w-auto">
                    Send Enquiry
                    <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                      <path className="m-arrow__stem" d="M1 6h8" />
                      <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                    </svg>
                  </button>
                </div>

                <p className="form__status" role="status">
                  {formStatus}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
