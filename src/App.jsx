import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Command, X } from 'lucide-react';

import Loader from './components/Loader';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfConditions from './pages/TermsOfConditions';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.85)"]);
  const headerBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);
  const headerBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(24px)"]);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Close mobile menu on route change and scroll to top
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  // Force scroll to top on initial load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleNavClick = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative font-sans bg-black text-white antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-white selection:text-black">
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Premium Glassmorphic Header */}
      <motion.header
        style={{ backgroundColor: headerBg, borderBottomColor: headerBorder, backdropFilter: headerBlur }}
        className="fixed top-0 left-0 right-0 z-50 py-5 md:py-6 border-b transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-[clamp(24px,5vw,56px)] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity -ml-1 md:-ml-4">
            <img src={`${import.meta.env.BASE_URL}deepfonswhite.svg`} alt="Deepfons Logo" className="w-[140px] md:w-[160px] h-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[clamp(28px,3vw,48px)]">
            {['Work', 'Services', 'Approach', 'Studio'].map(item => (
              <Link 
                key={item} 
                to={location.pathname === '/' ? '' : '/'} 
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="text-[13.5px] tracking-wide text-white/70 hover:text-white transition-colors duration-400 py-2 relative group"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to={location.pathname === '/' ? '' : '/'}
              onClick={(e) => handleNavClick(e, '#contact')} 
              className="hidden md:inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[13.5px] hover:bg-[#E8E8E8] transition-colors min-h-[48px] group font-medium"
            >
              Start a Project <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>

            {/* Minimalist Premium Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors -mr-3 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <X strokeWidth={1} size={24} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <Command strokeWidth={1.25} size={22} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Premium Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[40] bg-[#050505]/90 backdrop-blur-2xl flex flex-col px-[clamp(24px,5vw,56px)] pt-32 pb-12"
          >
            <nav className="flex-1 flex flex-col justify-center gap-3">
              {[
                { name: 'Home', path: '#top' },
                { name: 'Work', path: '#work' },
                { name: 'Services', path: '#services' },
                { name: 'Approach', path: '#approach' },
                { name: 'Studio', path: '#studio' },
                { name: 'Contact', path: '#contact' }
              ].map((item, i) => (
                <div key={item.name} className="overflow-hidden py-1">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      to={location.pathname === '/' ? '' : '/'}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className="text-[32px] md:text-[44px] font-semibold tracking-tighter block text-white/60 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                Studio
              </span>
              <div className="flex flex-col gap-2 text-[15px] text-white/60">
                <a href="mailto:hello@deepfons.com" className="hover:text-white transition-colors">hello@deepfons.com</a>
                <span>Based in India · Working worldwide</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-conditions" element={<TermsOfConditions />} />
        </Routes>
      </div>

      {/* Premium Footer */}
      <footer className="border-t border-line/60 py-[clamp(60px,8vw,100px)] pb-[clamp(32px,5vw,48px)] mt-auto bg-[#030303]">
        <div className="max-w-[1440px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-[clamp(48px,6vw,80px)] pb-[clamp(48px,7vw,80px)]">
            <div className="flex flex-col gap-5">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mb-2">
                <img src={`${import.meta.env.BASE_URL}deepfonswhite.svg`} alt="Deepfons Logo" className="w-[140px] md:w-[160px] h-auto object-contain" />
              </Link>
              <p className="text-[14px] tracking-wide text-white/50 leading-relaxed max-w-[30ch]">
                An independent digital design and development studio.<br /><br />
                Based in India, working worldwide.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30">Studio</h4>
              <nav className="flex flex-col gap-4">
                <Link to={location.pathname === '/' ? '' : '/'} onClick={(e) => handleNavClick(e, '#work')} className="text-[14.5px] text-white/60 hover:text-white transition-colors">Work</Link>
                <Link to={location.pathname === '/' ? '' : '/'} onClick={(e) => handleNavClick(e, '#services')} className="text-[14.5px] text-white/60 hover:text-white transition-colors">Services</Link>
                <Link to={location.pathname === '/' ? '' : '/'} onClick={(e) => handleNavClick(e, '#approach')} className="text-[14.5px] text-white/60 hover:text-white transition-colors">Approach</Link>
                <Link to={location.pathname === '/' ? '' : '/'} onClick={(e) => handleNavClick(e, '#contact')} className="text-[14.5px] text-white/60 hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30">Legal</h4>
              <nav className="flex flex-col gap-4">
                <Link to="/privacy-policy" className="text-[14.5px] text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-conditions" className="text-[14.5px] text-white/60 hover:text-white transition-colors">Terms of Conditions</Link>
              </nav>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-[clamp(32px,5vw,48px)] border-t border-line-soft text-[12.5px] text-white/40">
            <span>© {new Date().getFullYear()} DEEPFONS. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#!" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Instagram</a>
              <a href="#!" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#!" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Twitter (X)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
