import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas border-t border-hairline py-8 px-4 sm:py-16 sm:px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-3 sm:space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/favicon-32x32.png" 
                alt="CareerSense Logo" 
                className="w-7 h-7 rounded-lg object-contain shadow-sm"
              />
              <span className="font-serif text-[20px] tracking-tight text-ink font-light">
                CareerSense
              </span>
            </Link>
            <p className="text-[14px] text-muted max-w-sm leading-relaxed">
              CareerSense identifies the gap between where you are and where you need to be for your target role, turning that gap into an actionable roadmap, projects, and interview preparation.
            </p>
          </div>

          {/* Column 1: Core Navigation */}
          <div>
            <h4 className="text-caption-upper text-ink mb-4">Product</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link to="/setup" className="text-body hover:text-ink transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-body hover:text-ink transition-colors">
                  Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-body hover:text-ink transition-colors">
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-body hover:text-ink transition-colors">
                  Project Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Preparation */}
          <div>
            <h4 className="text-caption-upper text-ink mb-4">Preparation</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link to="/resume" className="text-body hover:text-ink transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-body hover:text-ink transition-colors">
                  AI Mock Interview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-body hover:text-ink transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards */}
          <div>
            <h4 className="text-caption-upper text-ink mb-4">Standards</h4>
            <ul className="space-y-2.5 text-[14px] text-muted">
              <li>Editorial Design System</li>
              <li>WCAG 2.2 AA Compliant</li>
              <li>Zero-Chatbot Fluff</li>
              <li>Verified Role Benchmarks</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-muted text-center sm:text-left">
          <p>© {currentYear} CareerSense. Built for ambitious tech students.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="hover:text-ink cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-ink cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-ink cursor-pointer transition-colors">Design Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
