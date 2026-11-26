import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="t-h1 mb-4">Privacy Policy</h1>
          <p className="text-[14px] font-medium text-[var(--muted)] mb-12 pb-8 border-b border-[var(--line)]">
            Last updated: October 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="t-h3 mb-3">1. Introduction</h2>
              <p>
                Welcome to Deepfons Studio. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at hello@deepfons.studio.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3">2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Name and Contact Data (email address, phone numbers, etc.)</li>
                <li>Credentials (passwords, password hints, etc.)</li>
                <li>Payment Data (credit card numbers, billing details, etc. through secure third-party processors)</li>
              </ul>
            </section>

            <section>
              <h2 className="t-h3 mb-3">3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>

            <section>
              <h2 className="t-h3 mb-3">4. Will Your Information Be Shared With Anyone?</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
