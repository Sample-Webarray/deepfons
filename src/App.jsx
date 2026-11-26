import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

import BrandMark from './components/BrandMark';
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
  const location = useLocation();
  const navigate = useNavigate();

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
      {/* Fixed Opaque Navigation Bar (nav-centre) */}
      <header className={`nav nav--centre ${mobileMenuOpen ? 'is-open' : ''}`}>
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
            className="nav__logo"
            aria-label="Deepfons home"
          >
            <BrandMark />
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

          {/* Mobile Drawer Sheet */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-[var(--nav)] z-40 bg-[var(--p-bg)] border-t border-[var(--line)] flex flex-col px-[var(--gut)] py-6 lg:hidden overflow-y-auto">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {MOBILE_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => scrollToSection(e, item.path)}
                    className="flex items-center justify-between min-h-[56px] border-b border-[var(--line)] text-[20px] font-medium text-[var(--p-ink)] hover:text-[var(--p-action)] transition-colors"
                  >
                    <span>{item.name}</span>
                    <span aria-hidden="true" className="text-[var(--p-muted)] text-[16px]">→</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="btn btn--primary w-full justify-center"
                >
                  Start a Project
                </a>
              </div>

              <div className="mt-auto pt-8 border-t border-[var(--line)] flex flex-col gap-2">
                <span className="t-label text-[var(--p-muted)]">Studio</span>
                <a
                  href="mailto:hello@deepfons.com"
                  className="text-[16px] font-medium text-[var(--p-ink)] hover:text-[var(--p-action)] transition-colors py-1"
                >
                  hello@deepfons.com
                </a>
                <span className="text-[14px] text-[var(--p-muted)]">Based in India · Working worldwide</span>
              </div>
            </div>
          )}

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
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

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
                  className="nav__logo text-[var(--ink)]"
                  aria-label="Deepfons home"
                >
                  <BrandMark />
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

              <details className="credits">
                <summary>Photographs via Wikimedia Commons</summary>
                <p>
                  Studio wall artwork by Gil Marco Shani (CC BY-SA 4.0); curved paper sculpture by Dietmar Rabich (CC BY-SA 4.0); layered card texture by Brandi Redd (CC0); lamp silhouette by LoMit (CC BY-SA 4.0); open notebook desk detail (Unsplash/CC0), all via Wikimedia Commons.
                </p>
              </details>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
