import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroGlobe from '../components/HeroGlobe';

// Custom Select Component
const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative w-full">
      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 w-full flex items-center justify-between bg-transparent border-0 border-b border-white/20 pb-3 pt-2 text-[17px] font-normal tracking-tight focus:outline-none focus:border-white transition-colors text-white appearance-none cursor-pointer"
      >
        <span className={selected ? "text-white" : "text-white/50"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-white/40">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-30 shadow-2xl py-2"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelected(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-[15px] hover:bg-white/10 transition-colors ${selected?.value === opt.value ? 'text-white bg-white/5' : 'text-white/70'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reveal Component
const Reveal = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Accordion Component
const Accordion = ({ num, title, tag, desc, items, isOpen, onClick }) => {
  return (
    <article className={`border-b border-line/70 transition-colors duration-500 ${isOpen ? 'text-white' : 'text-white/70'}`}>
      <button 
        onClick={onClick}
        className="flex items-start gap-[24px] md:gap-[32px] w-full text-left py-10 md:py-12 hover:text-white transition-colors duration-500"
      >
        <span className={`flex items-center justify-center w-6 h-[30px] md:h-[44px] text-white/40 transition-transform duration-700 shrink-0 ${isOpen ? 'rotate-90 text-white' : ''}`}>→</span>
        <span className={`flex items-center justify-center h-[30px] md:h-[44px] text-[13px] tracking-[0.2em] transition-colors duration-500 font-medium shrink-0 ${isOpen ? 'text-white/60' : 'text-white/40'}`}>{num}</span>
        <span className="flex flex-col gap-2 min-w-0 flex-1">
          <span className="text-[28px] md:text-[40px] font-medium tracking-tight text-white leading-[1.1]">{title}</span>
          {tag && <span className={`text-[12px] md:text-[13px] tracking-[0.1em] uppercase transition-colors duration-400 font-medium ${isOpen ? 'text-white/60' : 'text-white/40'}`}>{tag}</span>}
        </span>
      </button>

      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-[24px_24px_1fr] md:grid-cols-[24px_32px_1fr] gap-[24px] md:gap-[32px] pb-12 md:pb-16">
          <div className="col-start-3 min-w-0">
            {desc && <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[65ch] font-normal tracking-tight">{desc}</p>}
            {items && items.length > 0 && (
              <ul className={`mt-8 md:mt-10 ${desc ? 'border-t border-line/50' : ''}`}>
                {items.map((item, idx) => (
                  <li key={idx} className="border-b border-line/50 last:border-0 py-5 md:py-6 flex flex-col gap-2">
                    <div className="text-[19px] md:text-[21px] text-white font-medium tracking-tight leading-[1.2]">{item.title}</div>
                    <div className="text-[16px] md:text-[17px] text-[#a1a1a6] max-w-[65ch] leading-[1.5] font-normal tracking-tight">{item.desc}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  );
};

const Home = () => {
  const [activeService, setActiveService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <main id="top" className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:min-h-[90vh] flex flex-col justify-center pt-[140px] md:pt-28 pb-20 overflow-hidden">
        <HeroGlobe />
        
        <div className="max-w-[1280px] w-full mx-auto px-[clamp(24px,5vw,56px)] relative z-10 pointer-events-none">
          <motion.p initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-8 md:mb-12">
            <span className="w-1.5 h-1.5 bg-white rounded-full inline-block shadow-[0_0_8px_rgba(255,255,255,0.8)]" /> Independent Digital Team
          </motion.p>
          
          <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[1.04] tracking-tighter font-semibold max-w-[15ch] mb-12 md:mb-16 text-white drop-shadow-lg">
            <span className="block overflow-hidden pb-1 md:pb-2"><motion.span initial={{y:"118%"}} animate={{y:0}} transition={{duration:1.2, delay: 0.1}} className="block">Designing digital</motion.span></span>
            <span className="block overflow-hidden pb-1 md:pb-2"><motion.span initial={{y:"118%"}} animate={{y:0}} transition={{duration:1.2, delay: 0.18}} className="block">experiences with</motion.span></span>
            <span className="block overflow-hidden pb-1 md:pb-2 text-[#a1a1a6]"><motion.span initial={{y:"118%"}} animate={{y:0}} transition={{duration:1.2, delay: 0.26}} className="block">absolute clarity.</motion.span></span>
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20 md:items-end md:justify-between pointer-events-auto">
            <div className="flex-1">
              <motion.p initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} transition={{duration:0.8, delay: 0.4}} className="text-[19px] md:text-[21px] leading-[1.47] text-[#a1a1a6] max-w-[44ch] font-normal tracking-tight">
                A focused team combining strategy, design and development to create thoughtful digital experiences for ambitious businesses.
              </motion.p>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6, delay: 0.5}} className="text-[12px] tracking-[0.15em] uppercase text-white/40 mt-6 md:mt-8 font-semibold">
                Based in India · Working worldwide
              </motion.p>
            </div>

            <motion.div initial={{opacity:0, y:18}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay: 0.6}} className="flex gap-4 flex-wrap shrink-0 mt-8 md:mt-0">
              <a href="#contact" className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black rounded-full text-[15px] font-semibold hover:bg-[#E8E8E8] transition-colors duration-300 min-h-[48px] group">
                Start a Project <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#work" className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-transparent border border-[#424245] text-white rounded-full text-[15px] font-semibold hover:border-white transition-colors duration-300 min-h-[48px]">
                View Our Work
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positioning / Marquee */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-start">
            <Reveal>
              <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold max-w-[18ch] text-white">
                A team with a <span className="text-[#a1a1a6]">focused way of working.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[48ch] font-normal tracking-tight">
                We bring design, development and project coordination together in one flexible team — allowing us to stay close to the work and communicate directly with the people we build for.
              </p>
              <p className="mt-8 text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Working remotely with businesses across the UK, US, Canada and beyond.</p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-20 md:mt-32 py-8 border-y border-line/50 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex w-max animate-marquee">
            <div className="flex items-center">
              {['Web Design', 'Web Development', 'Brand Identity', 'Digital Experiences', 'UI / UX', 'Website Redesign', 'Web Design', 'Web Development', 'Brand Identity', 'Digital Experiences', 'UI / UX', 'Website Redesign'].map((txt, i) => (
                <React.Fragment key={i}>
                  <span className="text-[13px] md:text-[14px] tracking-[0.2em] uppercase text-[#a1a1a6] px-8 md:px-16 whitespace-nowrap font-semibold">{txt}</span>
                  <span className="text-white/20 text-lg">·</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 pb-10 border-b border-line/50 mb-12 md:mb-20 md:items-end md:justify-between">
            <div className="md:max-w-[50%]">
              <span className="flex items-center gap-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-8 md:mb-12">
                <span className="text-white/40">01</span> <span className="flex-1 h-px bg-white/20 max-w-[80px]"></span> Selected Work
              </span>
              <Reveal><h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold max-w-[20ch]">Concept work, made to explore our approach.</h2></Reveal>
            </div>
            <Reveal className="md:max-w-[45%]">
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[48ch] font-normal tracking-tight">A selection of concepts and self-initiated projects created to explore how we think about design, development and digital experiences. These are not paid client engagements.</p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {[
              { num: '01', name: 'FINORA', type: 'Fintech Website Concept', tags: 'Website Design · UX · Development', bgClass: 'bg-finora-placeholder', tag: 'Concept Project' },
              { num: '02', name: 'NORTHLINE', type: 'Architecture Brand Concept', tags: 'Identity · Website · Art Direction', bgClass: 'bg-northline-placeholder', tag: 'Self-Initiated' },
              { num: '03', name: 'AUREL', type: 'Premium Commerce Concept', tags: 'UX · E-commerce · Development', bgClass: 'bg-aurel-placeholder', tag: 'Concept Design' }
            ].map(proj => (
              <Reveal key={proj.num}>
                <a href="#" className="block group">
                  <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-12 mb-8 md:mb-10">
                    <span className="text-[13px] tracking-[0.15em] text-white/40 pt-1 font-semibold">{proj.num}</span>
                    <div className="min-w-0">
                      <h3 className="text-[36px] md:text-[52px] lg:text-[64px] font-semibold tracking-tighter leading-[1.05] text-white/90 group-hover:text-white transition-colors">{proj.name}</h3>
                      <p className="mt-3 text-[17px] md:text-[19px] tracking-tight text-[#a1a1a6] font-normal">{proj.type}</p>
                      <p className="mt-2 text-[12px] tracking-[0.1em] uppercase text-white/40 font-semibold">{proj.tags}</p>
                    </div>
                    <span className="text-[24px] md:text-[32px] text-white/30 transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white font-light">↗</span>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] aspect-[4/3] md:aspect-[16/9] bg-[#111111] border border-white/5">
                    <div className={`absolute inset-[-5%] ${proj.bgClass} transition-transform duration-700 group-hover:scale-[1.02]`}></div>
                    <div className="absolute left-6 md:left-8 right-6 md:right-8 bottom-6 md:bottom-8 flex justify-between items-end z-10 pointer-events-none">
                      <span className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-white/90 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 font-semibold border border-white/10">{proj.tag}</span>
                      <span className="text-[48px] md:text-[64px] font-semibold tracking-tighter leading-none text-white/15 select-none">{proj.num}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <p className="mt-16 md:mt-24 text-[15px] md:text-[17px] tracking-tight text-[#a1a1a6] max-w-[56ch] leading-[1.5] font-normal border-t border-line/50 pt-8">
            These concepts are internal explorations — not paid client work. We label them clearly so you can judge the thinking and craft for what it is.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="services" className="relative py-20 md:py-32 bg-[#050505] border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 mb-12 md:mb-20 md:items-end md:justify-between">
            <div className="md:max-w-[50%]">
              <span className="flex items-center gap-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-8 md:mb-12">
                <span className="text-white/40">02</span> <span className="flex-1 h-px bg-white/20 max-w-[80px]"></span> Capabilities
              </span>
              <Reveal><h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold text-white">What we can build.</h2></Reveal>
            </div>
            <Reveal className="md:max-w-[45%]">
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] font-normal max-w-[48ch] tracking-tight">
                Four connected areas of work. We often combine them — but each can stand on its own depending on what a project actually needs. Open a service to see what's inside.
              </p>
            </Reveal>
          </div>

          <Reveal className="border-t border-line/70">
            <Accordion 
              num="01" title="Web Design" tag="Strategy · UX / UI · Visual Direction" 
              isOpen={activeService === 1} onClick={() => setActiveService(activeService === 1 ? null : 1)}
              desc="Strategy, information architecture, UX/UI, responsive design and visual direction. We start with the content and the goal — not the layout — so every decision has a reason behind it."
              items={[
                { title: "Information Architecture", desc: "We map the pages, the hierarchy and the navigation before any layout decisions are made — so the structure holds up as the site grows." },
                { title: "UX / UI Design", desc: "Interface design grounded in real content and real user flows — not placeholder text and lorem ipsum." },
                { title: "Visual Direction", desc: "Typography, colour, spacing and imagery defined as a system that stays consistent across every page and screen." }
              ]}
            />
            <Accordion 
              num="02" title="Web Development" tag="Front-End · CMS · Performance" 
              isOpen={activeService === 2} onClick={() => setActiveService(activeService === 2 ? null : 2)}
              desc="Fast, responsive and maintainable websites built around each project's requirements. Semantic markup, lightweight JavaScript and performance treated as a design decision."
              items={[
                { title: "Front-End Development", desc: "Semantic HTML, modern CSS and lightweight JavaScript — built to be read, extended and maintained by another developer." },
                { title: "CMS Integration", desc: "Content modelled around how the team actually writes, publishes and updates — not around a template." }
              ]}
            />
            <Accordion 
              num="03" title="Brand Identity" tag="Typography · Colour · Visual Systems" 
              isOpen={activeService === 3} onClick={() => setActiveService(activeService === 3 ? null : 3)}
              desc="Visual systems, identity direction, typography, colour and digital brand expression. Rules that hold up across every surface — from a favicon to a full site."
              items={[
                { title: "Identity Direction", desc: "A visual direction that comes from strategy — the market, the audience and the story — not from a mood board alone." }
              ]}
            />
            <Accordion 
              num="04" title="Digital Experiences" tag="Interactivity · Motion · Immersive" 
              isOpen={activeService === 4} onClick={() => setActiveService(activeService === 4 ? null : 4)}
              desc="Interactive components, fluid motion, and immersive 3D/WebGL experiences that elevate standard interfaces."
              items={[
                { title: "Motion & Interaction", desc: "Using animation to guide attention and explain functionality, rather than just decorating." }
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-start pb-16 md:pb-20 border-b border-line/50">
            <Reveal>
              <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-tight font-semibold text-white">Who we work with.</h2>
            </Reveal>
            <Reveal>
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[48ch] font-normal tracking-tight">
                We partner with ambitious teams who value design and technical craft. Our structure suits projects where direct communication and focused execution matter.
              </p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 pt-16 md:pt-20">
            {[
              { t: "Startups & Tech", d: "Early-stage and growing tech companies needing clear product communication." },
              { t: "Studios & Agencies", d: "Creative teams looking for a reliable development partner." },
              { t: "B2B Services", d: "Professional services requiring a high-quality digital presence." },
              { t: "Architecture & Design", d: "Firms needing portfolio sites that respect the work." },
              { t: "E-Commerce", d: "Independent brands focused on premium shopping experiences." }
            ].map((item, idx) => (
              <Reveal key={idx} className="flex flex-col gap-3">
                <div className="text-[12px] tracking-[0.15em] text-white/40 font-semibold">0{idx + 1}</div>
                <div className="text-[19px] md:text-[21px] font-semibold tracking-tight text-white">{item.t}</div>
                <div className="text-[15px] md:text-[16px] text-[#a1a1a6] leading-[1.4] font-normal tracking-tight">{item.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / Process */}
      <section id="approach" className="relative py-20 md:py-32 bg-[#050505] border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <span className="flex items-center gap-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-8 md:mb-12">
            <span className="text-white/40">03</span> <span className="flex-1 h-px bg-white/20 max-w-[80px]"></span> How We Work
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-[100px]">
            <Reveal>
              <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold text-white mb-6">Process</h2>
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] font-normal max-w-[38ch] tracking-tight">
                A methodical approach to design and development. We move from understanding the core problem to designing the system, and finally building the product.
              </p>
            </Reveal>
            <div className="flex flex-col border-t border-line/70">
              {[
                { title: "Discover", desc: "Understanding the audience, the goals and the constraints." },
                { title: "Define", desc: "Information architecture and wireframing the core structure." },
                { title: "Design", desc: "Creating the visual system and applying it to the interfaces." },
                { title: "Build", desc: "Writing the front-end code and integrating the back-end systems." },
                { title: "Launch", desc: "Testing, deployment and handing over the final product." }
              ].map((step, idx) => (
                <Reveal key={idx} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-10 py-6 md:py-10 border-b border-line/50 group">
                  <div className="text-[12px] tracking-[0.15em] uppercase text-white/40 pt-1.5 font-semibold">Phase 0{idx + 1}</div>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-baseline">
                    <div className="text-[28px] md:text-[36px] font-medium tracking-tight text-white/90 md:w-1/3 group-hover:text-white transition-colors">{step.title}</div>
                    <div className="text-[17px] md:text-[19px] text-[#a1a1a6] font-normal tracking-tight flex-1">{step.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why This Team */}
      <section className="relative py-20 md:py-32 border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <Reveal>
            <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-tight font-semibold text-white mb-12 md:mb-20">Why this team.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10">
            {[
              { t: "Direct communication", d: "You talk directly to the people designing and building your site. No layers of account management." },
              { t: "Focused execution", d: "We take on a limited number of projects to ensure every client gets the attention required." },
              { t: "Flexible collaboration", d: "We integrate with internal teams, or handle the entire process from start to finish." },
              { t: "Design + dev together", d: "Because we do both, design decisions aren't compromised during development." }
            ].map((item, idx) => (
              <Reveal key={idx} className="flex flex-col gap-4 border-t border-line/50 pt-6">
                <div className="text-[20px] md:text-[24px] font-semibold tracking-tight text-white">{item.t}</div>
                <div className="text-[16px] md:text-[17px] text-[#a1a1a6] leading-[1.5] font-normal tracking-tight">{item.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Studio */}
      <section id="studio" className="relative py-20 md:py-32 bg-[#050505] border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <span className="flex items-center gap-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-8 md:mb-12">
            <span className="text-white/40">04</span> <span className="flex-1 h-px bg-white/20 max-w-[80px]"></span> The Studio
          </span>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-8 md:gap-10">
              <Reveal><h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold text-white">An independent structure.</h2></Reveal>
              <Reveal><p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[48ch] font-normal tracking-tight">
                We operate as a core unit, bringing in specialised partners — copywriters, illustrators, 3D artists — only when a project demands it. This keeps the process lean and the output focused.
              </p></Reveal>
              
              <div className="grid grid-cols-2 gap-y-10 gap-x-8 mt-2 border-t border-line/50 pt-10">
                {[
                  { r: "Project Lead", n: "Strategy & Direction" },
                  { r: "Design", n: "UX / UI & Visual" },
                  { r: "Development", n: "Front-End & CMS" },
                  { r: "Coordination", n: "Timeline & QA" }
                ].map((role, idx) => (
                  <Reveal key={idx} className="flex flex-col gap-2">
                    <div className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">{role.r}</div>
                    <div className="text-[19px] md:text-[21px] font-medium tracking-tight text-white/90">{role.n}</div>
                  </Reveal>
                ))}
              </div>
            </div>
            
            <Reveal className="aspect-square bg-[#111111] rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col justify-center items-center text-center p-8">
               <div className="text-white/20 mb-5">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                   <circle cx="8.5" cy="8.5" r="1.5"></circle>
                   <polyline points="21 15 16 10 5 21"></polyline>
                 </svg>
               </div>
               <p className="text-[12px] tracking-[0.15em] uppercase text-white/30 font-semibold">Studio Image Placeholder</p>
               <p className="text-[13px] text-white/20 mt-2 font-normal">(Awaiting final asset)</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-32 border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-[100px]">
            <Reveal>
              <h2 className="text-[28px] md:text-[40px] leading-[1.1] tracking-tight font-semibold text-white">Questions.</h2>
            </Reveal>
            <Reveal className="border-t border-line/70">
              {[
                { q: "How long does a typical project take?", a: "Most projects take between 6 to 12 weeks from strategy to launch, depending on the complexity of the requirements and the speed of feedback." },
                { q: "Do you work with startups?", a: "Yes. We frequently work with early-stage companies to establish their initial digital presence and product marketing sites." },
                { q: "What technologies do you use?", a: "We build primarily with React, Next.js, and modern CSS for the front-end, integrated with headless CMS platforms like Sanity or Prismic." },
                { q: "Can you help with branding first?", a: "Yes, we often handle brand identity and visual direction as the first phase before moving into web design and development." },
                { q: "Do you maintain the site after launch?", a: "Yes, we offer ongoing support and maintenance retainers for clients who want continuous iterations and improvements." },
                { q: "How do you handle project management?", a: "We use shared tools (like Notion or Linear) and schedule regular check-ins. You communicate directly with the team doing the work." },
                { q: "What is your pricing structure?", a: "We provide fixed-price proposals based on a defined scope of work after our initial discovery conversations." }
              ].map((faq, idx) => (
                <Accordion 
                  key={idx}
                  num={`0${idx + 1}`} 
                  title={faq.q} 
                  isOpen={activeFaq === idx} 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  desc={faq.a}
                />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 md:py-32 bg-[#080808] border-t border-line/50">
        <div className="max-w-[1280px] mx-auto px-[clamp(24px,5vw,56px)]">
          <span className="flex items-center gap-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#a1a1a6] mb-10 md:mb-16">
            <span className="text-white/40">05</span> <span className="flex-1 h-px bg-white/20 max-w-[80px]"></span> Contact
          </span>
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-20 items-start">
            <Reveal>
              <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight font-semibold mb-6 text-white max-w-[16ch]">Let's build something worth putting your name on.</h2>
              <p className="text-[17px] md:text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[36ch] font-normal tracking-tight">Share a few details and we'll come back within one business day with next steps.</p>
              <dl className="mt-10 md:mt-16 grid gap-5 border-t border-line/50 pt-8 md:pt-12">
                <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline text-[16px]">
                  <dt className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Email</dt>
                  <dd><a href="mailto:hello@deepfons.studio" className="text-white/80 border-b border-white/30 hover:border-white hover:text-white transition-colors pb-0.5">hello@deepfons.studio</a></dd>
                </div>
              </dl>
            </Reveal>
            
            <Reveal>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 bg-[#111111] p-6 md:p-12 rounded-[24px] border border-white/5 backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Name</label>
                  <input type="text" placeholder="Your full name" className="w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-2 text-[17px] font-normal tracking-tight focus:outline-none focus:border-white transition-colors text-white placeholder-white/20" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Work email</label>
                  <input type="email" placeholder="you@company.com" className="w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-2 text-[17px] font-normal tracking-tight focus:outline-none focus:border-white transition-colors text-white placeholder-white/20" />
                </div>
                <div className="flex flex-col gap-3 col-span-1 sm:col-span-2">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Company (Optional)</label>
                  <input type="text" placeholder="Your organisation" className="w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-2 text-[17px] font-normal tracking-tight focus:outline-none focus:border-white transition-colors text-white placeholder-white/20" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">What do you need?</label>
                  <CustomSelect 
                    placeholder="Select a service" 
                    options={[
                      { value: 'design', label: 'Web Design & UX' },
                      { value: 'development', label: 'Web Development' },
                      { value: 'brand', label: 'Brand Identity' },
                      { value: 'full', label: 'Full Website Creation' },
                      { value: 'other', label: 'Other' }
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Budget range</label>
                  <CustomSelect 
                    placeholder="Select a budget" 
                    options={[
                      { value: 'small', label: '$5k - $10k' },
                      { value: 'medium', label: '$10k - $25k' },
                      { value: 'large', label: '$25k - $50k' },
                      { value: 'xlarge', label: '$50k+' }
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-3 col-span-1 sm:col-span-2">
                  <label className="text-[12px] tracking-[0.15em] uppercase text-white/40 font-semibold">Project details</label>
                  <textarea placeholder="Goals, timeline, anything relevant…" className="w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-2 text-[17px] font-normal tracking-tight focus:outline-none focus:border-white transition-colors text-white placeholder-white/20 min-h-[100px] resize-y"></textarea>
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-4">
                  <span className="text-[14px] text-white/40 leading-[1.5] max-w-[200px] font-normal tracking-tight">We reply within one business day.</span>
                  <button type="submit" className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-black rounded-full text-[15px] font-semibold hover:bg-[#E8E8E8] transition-colors duration-300 min-h-[48px] w-full sm:w-auto group">
                    Send Enquiry <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
