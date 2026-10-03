"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Github, ExternalLink, Sparkles } from "lucide-react";

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  filterCategory?: string;
  period?: string;
  badge?: string;
  description: string;
  highlights?: string[];
  stack: string[];
  image: string;
  github?: string;
  live?: string;
  accent: string;
  featured?: boolean;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-3xl glass-card !p-0 z-10 my-8 overflow-hidden bg-[var(--card)] border border-[var(--line)] shadow-2xl"
        >
          {/* Header Image */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-[var(--card-subtle)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-black/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Top Badge */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold bg-[var(--lime)] text-black shadow-md">
                {project.badge || project.category}
              </span>
              {project.period && (
                <span className="px-3 py-1 rounded-full text-xs font-mono-custom bg-black/60 text-white backdrop-blur-sm">
                  {project.period}
                </span>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono-custom text-[var(--lime)] uppercase tracking-wider block mb-1">
                {project.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                {project.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {project.description}
            </p>

            {/* Key Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--text)] font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--lime)]" />
                  <span>Key Engineering Highlights:</span>
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      <CheckCircle2 size={16} className="text-[var(--lime)] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack */}
            <div className="pt-4 border-t border-[var(--line)]">
              <span className="text-xs font-mono-custom text-[var(--text-muted)] block mb-3">
                Tech Stack Architecture:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono-custom bg-[var(--card-subtle)] text-[var(--text)] border border-[var(--line)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2.5 !px-4 text-xs"
                  >
                    <span>View Live Application</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !py-2.5 !px-4 text-xs"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {!project.live && !project.github && (
                  <span className="text-xs font-mono-custom text-[var(--text-muted)] italic">
                    Enterprise project / proprietary codebase
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="btn-secondary !py-2 !px-4 text-xs ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
