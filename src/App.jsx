import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import Loader from './components/Loader';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfConditions from './pages/TermsOfConditions';

const NAV_LINKS = [
  { label: 'Work', id: '#work' },
  { label: 'Services', id: '#services' },
  { label: 'Approach', id: '#approach' },
  { label: 'Studio', id: '#studio' },
];

const MOBILE_LINKS = [
  { name: 'Home', path: '#top' },
  { name: 'Work', path: '#work' },
  { name: 'Services', path: '#services' },
  { name: 'Approach', path: '#approach' },
  { name: 'Studio', path: '#studio' },
  { name: 'Contact', path: '#contact' },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const resetOnUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', resetOnUnload);
    return () => window.removeEventListener('beforeunload', resetOnUnload);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-locked', mobileMenuOpen);
    return () => document.body.classList.remove('nav-locked');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.state]);

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      requestAnimationFrame(() => {
        const el = document.querySelector(targetId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    }
  }, [location]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === '#top') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname === '/') {
      const el = document.querySelector(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      {/* Narrow Nvidia-style Navigation Bar (48px) */}
      <motion.header
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: loaderDone ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="nav"
      >
        <div className="wrap nav__bar">
          <a
            className="skip-link"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('top')?.focus?.();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Skip to content
          </a>

          <Link
            to="/"
            onClick={(e) => scrollToSection(e, '#top')}
            className="nav__logo hover:opacity-85 transition-opacity"
            aria-label="Deepfons home"
          >
            <img
              src={`${import.meta.env.BASE_URL}deepfonswhite.svg`}
              alt="Deepfons"
            />
          </Link>

          <nav className="nav__links" aria-label="Main">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className="nav__item">
                <a
                  href={item.id}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="nav__link"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          <div className="nav__right">
            <div className="nav__actions">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="btn btn--primary"
              >
                Start a Project
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              className="nav__toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="inline-flex"
                  >
                    <X size={20} strokeWidth={1.75} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 45, scale: 0.85 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.85 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="inline-flex"
                  >
                    <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Clean Architectural Mobile Drawer (rendered outside header to avoid transform clipping) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[var(--nav)] bottom-0 z-40 bg-[#000000] border-t border-[var(--line)] flex flex-col px-[var(--gut)] py-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {MOBILE_LINKS.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => scrollToSection(e, item.path)}
                  className="flex items-center justify-between min-h-[52px] border-b border-[var(--line)] text-[18px] font-medium text-[#ffffff] hover:text-[#a3a3a3] transition-colors"
                >
                  <span>{item.name}</span>
                  <span aria-hidden="true" className="text-[#a3a3a3] text-[15px]">→</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-7">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="btn btn--primary w-full justify-center"
              >
                Start a Project
              </a>
            </div>

            <div className="mt-auto pt-8 border-t border-[var(--line)] flex flex-col gap-2">
              <span className="t-label text-[#a3a3a3]">Studio</span>
              <a
                href="mailto:hello@deepfons.com"
                className="text-[16px] font-medium text-[#ffffff] hover:text-[#a3a3a3] transition-colors py-1"
              >
                hello@deepfons.com
              </a>
              <span className="text-[14px] text-[#a3a3a3]">Based in India · Working worldwide</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home onNavigateSection={scrollToSection} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-conditions" element={<TermsOfConditions />} />
      </Routes>

      {/* Footer (footer-dark · ground-inverse) */}
      <footer className="footer closing closing--flow footer--dark ground-inverse" aria-label="Footer">
        <div className="wrap">
          <div className="closing__cta close--type">
            <div className="section-head--split">
              <div>
                <h2 className="t-h2 text-[var(--ink)]">Start a Project</h2>
                <p className="t-lead text-[var(--muted)]">
                  We reply within one business day.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="btn btn--primary"
              >
                Start a Project
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="closing__links pt-8 border-t border-[var(--line)]">
            <div className="grid">
              <div className="span-6 stack-4">
                <Link
                  to="/"
                  onClick={(e) => scrollToSection(e, '#top')}
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                  aria-label="Deepfons home"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}deepfonswhite.svg`}
                    alt="Deepfons"
                    className="!h-9 md:!h-11 !w-auto object-contain block"
                  />
                </Link>
                <p className="footer__lede text-[var(--ink)]">
                  An independent digital design and development studio.
                </p>
                <p className="text-[14px] text-[var(--muted)]">
                  Based in India, working worldwide.
                </p>
              </div>

              <div className="span-3 footer__col">
                <h3>Studio</h3>
                <ul>
                  <li>
                    <a href="#work" onClick={(e) => scrollToSection(e, '#work')}>Work</a>
                  </li>
                  <li>
                    <a href="#services" onClick={(e) => scrollToSection(e, '#services')}>Services</a>
                  </li>
                  <li>
                    <a href="#approach" onClick={(e) => scrollToSection(e, '#approach')}>Approach</a>
                  </li>
                  <li>
                    <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>Contact</a>
                  </li>
                </ul>
              </div>

              <div className="span-3 footer__col">
                <h3>Legal</h3>
                <ul>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-conditions">Terms of Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__legal items-center">
              <span>© {new Date().getFullYear()} DEEPFONS. All rights reserved.</span>

              <div className="flex items-center gap-6 text-[13px]">
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-[var(--ink)] transition-colors">
                  Instagram
                </a>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-[var(--ink)] transition-colors">
                  LinkedIn
                </a>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-[var(--ink)] transition-colors">
                  Twitter (X)
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
