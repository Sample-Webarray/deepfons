import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="top" className="ground-base pt-[calc(var(--nav)+64px)] pb-24">
      <div className="wrap">
        <div className="mb-10">
          <Link to="/" className="link text-[14px] text-[var(--muted)]">
            Back to Deepfons
          </Link>
        </div>

        <div className="max-w-[760px] legal-prose">
          <h1 className="t-h1 mb-4">Terms of Conditions</h1>
          <p className="text-[14px] font-medium text-[var(--muted)] mb-12 pb-8 border-b border-[var(--line)]">
            Last updated: October 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="t-h3 mb-3">1. Agreement to Terms</h2>
              <p>
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Deepfons Studio ("Company", “we”, “us”, or “our”), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3">4. Prohibited Activities</h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfConditions;
