"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  MapPin, 
  Code2, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

const TABS = [
  { id: "profile", label: "Engineer.tsx", icon: Code2 },
  { id: "stack", label: "CoreStack.json", icon: Terminal },
  { id: "philosophy", label: "ERPArchitect.ts", icon: Layers },
];

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolio.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="section-wrap !py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--lime-bg)] border border-[var(--lime)]/30 text-xs font-mono-custom text-[var(--text)] mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lime)]"></span>
              </span>
              <span>{portfolio.availability}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text)] leading-[1.04] mb-6"
            >
              Interfaces with <br />
              <span className="text-[var(--lime)] relative inline-block">
                intent & clarity.
              </span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl mb-8 font-normal"
            >
              Hi, I&apos;m <span className="text-[var(--text)] font-medium">{portfolio.name}</span>, a frontend developer at <span className="text-[var(--text)] font-medium">{portfolio.company}</span>. I design and engineer resilient, data-dense interfaces for enterprise ERP workflows and high-impact web products using React, Next.js, and TypeScript.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <a href="#projects" className="btn-primary w-full sm:w-auto shadow-md">
                <span>View Selected Work</span>
                <ArrowDownRight size={17} />
              </a>

              <a href="#contact" className="btn-secondary w-full sm:w-auto">
                <span>Contact Me</span>
                <ArrowUpRight size={16} />
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={copyEmail}
                className="btn-secondary !px-3.5 relative group"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-[var(--lime)]" />
                    <span className="text-xs font-mono-custom text-[var(--lime)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text)]" />
                    <span className="text-xs font-mono-custom text-[var(--text-muted)] group-hover:text-[var(--text)]">Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Socials & Location Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 pt-6 border-t border-[var(--line)] w-full"
            >
              <div className="flex items-center gap-2">
                {portfolio.socials.github && (
                  <a
                    href={portfolio.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label="GitHub Profile"
                  >
                    <Github size={17} />
                  </a>
                )}
                <a
                  href={portfolio.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="icon-btn"
                  aria-label="Email Khetesh"
                >
                  <Mail size={17} />
                </a>
              </div>

              <div className="h-5 w-px bg-[var(--line)] hidden sm:block"></div>

              <div className="flex items-center gap-2 text-xs font-mono-custom text-[var(--text-muted)]">
                <MapPin size={14} className="text-[var(--lime)]" />
                <span>{portfolio.location}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Code & Architecture Studio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow behind Card */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--lime)]/20 to-[var(--sky)]/20 rounded-2xl blur-xl opacity-60 -z-10"></div>

            {/* Window Container */}
            <div className="code-preview-window">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--card)]/90 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 text-[11px] font-mono-custom text-[var(--text-muted)]">
                    khetesh-studio v1.5
                  </span>
                </div>
                <span className="text-[10px] font-mono-custom uppercase tracking-wider text-[var(--lime)] bg-[var(--lime-bg)] px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-[var(--line)] bg-[var(--card-subtle)] text-xs font-mono-custom overflow-x-auto">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 transition-colors border-r border-[var(--line)] text-left whitespace-nowrap ${
                        isActive
                          ? "bg-[var(--card)] text-[var(--text)] font-semibold border-b-2 border-b-[var(--lime)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card)]/50"
                      }`}
                    >
                      <Icon size={13} className={isActive ? "text-[var(--lime)]" : "opacity-60"} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code / Content Area */}
              <div className="p-5 font-mono-custom text-xs leading-relaxed overflow-x-auto min-h-[260px] bg-[var(--card)]">
                {activeTab === "profile" && (
                  <div className="space-y-1">
                    <p className="text-[var(--text-muted)]">{"// Khetesh Suthar — Frontend Engineer"}</p>
                    <p className="text-purple-400">export const <span className="text-amber-300">engineer</span> = &#123;</p>
                    <p className="pl-4 text-[var(--text)]">name: <span className="text-emerald-400">&quot;{portfolio.name}&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]">role: <span className="text-emerald-400">&quot;{portfolio.role}&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]">company: <span className="text-emerald-400">&quot;{portfolio.company}&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]">experience: <span className="text-sky-400">&quot;3+ Years in Production&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]">specialization: [</p>
                    <p className="pl-8 text-amber-300">&quot;ERP & Complex Dashboards&quot;,</p>
                    <p className="pl-8 text-amber-300">&quot;Data Tables & Workflows&quot;,</p>
                    <p className="pl-8 text-amber-300">&quot;Optimistic UI & Clean Caching&quot;</p>
                    <p className="pl-4 text-[var(--text)]">],</p>
                    <p className="pl-4 text-[var(--text)]">status: <span className="text-emerald-400">&quot;{portfolio.availability}&quot;</span></p>
                    <p className="text-purple-400">&#125;;</p>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-1">
                    <p className="text-[var(--text-muted)]">{"// Production-Grade Frontend Stack"}</p>
                    <p className="text-sky-400">&#123;</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;framework&quot;</span>: <span className="text-emerald-400">&quot;React 19 / Next.js 15 App Router&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;typeSystem&quot;</span>: <span className="text-emerald-400">&quot;TypeScript (Strict Mode)&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;styling&quot;</span>: <span className="text-emerald-400">&quot;Tailwind CSS v4 & Framer Motion&quot;</span>,</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;state&quot;</span>: [<span className="text-amber-300">&quot;Redux Toolkit&quot;</span>, <span className="text-amber-300">&quot;React Query&quot;</span>],</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;apiArchitecture&quot;</span>: [<span className="text-amber-300">&quot;GraphQL&quot;</span>, <span className="text-amber-300">&quot;REST&quot;</span>, <span className="text-amber-300">&quot;Prisma&quot;</span>],</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-rose-400">&quot;database&quot;</span>: [<span className="text-amber-300">&quot;PostgreSQL&quot;</span>, <span className="text-amber-300">&quot;MongoDB&quot;</span>]</p>
                    <p className="text-sky-400">&#125;</p>
                  </div>
                )}

                {activeTab === "philosophy" && (
                  <div className="space-y-1">
                    <p className="text-[var(--text-muted)]">{"// Core Engineering Principles"}</p>
                    <p className="text-purple-400">function <span className="text-sky-400">architectERPInterface</span>() &#123;</p>
                    <p className="pl-4 text-[var(--text)]"><span className="text-purple-400">return</span> &#123;</p>
                    <p className="pl-8 text-[var(--text)]">clarity: <span className="text-amber-300">&quot;Dense data without cognitive overload&quot;</span>,</p>
                    <p className="pl-8 text-[var(--text)]">speed: <span className="text-amber-300">&quot;Optimistic updates & zero-latency feedback&quot;</span>,</p>
                    <p className="pl-8 text-[var(--text)]">durability: <span className="text-amber-300">&quot;Exhaustive loading, empty, and error bounds&quot;</span>,</p>
                    <p className="pl-8 text-[var(--text)]">accessibility: <span className="text-amber-300">&quot;Keyboard-first navigation for power users&quot;</span></p>
                    <p className="pl-4 text-[var(--text)]">&#125;;</p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                )}
              </div>

              {/* Terminal Bottom Highlights Bar */}
              <div className="px-4 py-3 bg-[var(--card-subtle)] border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-custom text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5 text-[var(--lime)] font-medium">
                  <CheckCircle2 size={13} />
                  <span>Production Tested</span>
                </span>
                <span className="flex items-center gap-1 text-[var(--text)]">
                  <span>ERP</span>
                  <span className="text-[var(--lime)]">·</span>
                  <span>React</span>
                  <span className="text-[var(--lime)]">·</span>
                  <span>Next.js</span>
                </span>
              </div>
            </div>

            {/* Floating Tech Badges */}
            <div className="hidden sm:flex items-center gap-2 absolute -bottom-4 -left-4 bg-[var(--card)] border border-[var(--line)] shadow-lg rounded-xl px-3 py-1.5 text-xs font-mono-custom text-[var(--text)] float-animation">
              <Sparkles size={14} className="text-[var(--lime)]" />
              <span>React 19 + Next.js 15 Ready</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
