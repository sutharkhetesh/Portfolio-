"use client";

import { motion, useScroll, useSpring, MotionConfig } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--lime)] selection:text-black">
        {/* Subtle Ambient Background Mesh & Lighting */}
        <div className="ambient-canvas" aria-hidden="true" />

        {/* Scroll Progress Indicator Bar at top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--lime)] via-[var(--sky)] to-[var(--lime)] z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}
