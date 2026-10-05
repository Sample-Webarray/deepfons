import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-32 px-[clamp(20px,5vw,48px)] max-w-[900px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-light tracking-tight leading-tight mb-8">Privacy Policy</h1>
        <p className="text-muted-2 text-sm uppercase tracking-widest mb-16">Last updated: October 2026</p>
        
        <div className="space-y-12 text-muted leading-relaxed text-[15px]">
          <section>
            <h2 className="text-2xl font-light text-white mb-4">1. Introduction</h2>
            <p>Welcome to Deepfons Studio. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at hello@deepfons.studio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Name and Contact Data (email address, phone numbers, etc.)</li>
              <li>Credentials (passwords, password hints, etc.)</li>
              <li>Payment Data (credit card numbers, billing details, etc. through secure third-party processors)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">3. How We Use Your Information</h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
