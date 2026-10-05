import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfConditions = () => {
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
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-light tracking-tight leading-tight mb-8">Terms of Conditions</h1>
        <p className="text-muted-2 text-sm uppercase tracking-widest mb-16">Last updated: October 2026</p>
        
        <div className="space-y-12 text-muted leading-relaxed text-[15px]">
          <section>
            <h2 className="text-2xl font-light text-white mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Deepfons Studio ("Company", “we”, “us”, or “our”), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">3. User Representations</h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-4">4. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfConditions;
