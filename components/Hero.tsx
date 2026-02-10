'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ArrowRight, Briefcase, Code2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from 'next/link';

export function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [careerMode, setCareerMode] = useState<'freelance' | 'professional'>('freelance');

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0djJINFptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMlY2aDRWNGgtNHpNNiAzNHYtNEg0djRIMHYyaDR2NGgydi00aDR2Mkg2ek02IDRWMGg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="max-w-7xl mx-auto text-center z-10">
        {/* Career Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 p-1.5 bg-slate-800/80 backdrop-blur-sm rounded-full border border-purple-500/30">
            <button
              onClick={() => setCareerMode('freelance')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                careerMode === 'freelance'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Freelancing
            </button>
            <Link
              href="/"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                careerMode === 'professional'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Professional
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-3">
            Toggle between my freelance and professional career profiles
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-purple-400 text-lg md:text-xl font-semibold mb-4">
            Hello, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
            Rohit Darekar
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            DevOps Engineer | Self-Hosted Services Expert | Docker & CI/CD
            Specialist
          </p>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Automate Everything From Code to Cloud with Self Hosted Power
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
          >
            Hire Me
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/Resume.pdf"
            download
            className="bg-slate-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center gap-2 border border-purple-500/30"
          >
            <Download size={20} />
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-12"
        >
          <a
            href="https://www.linkedin.com/in/darekar-rohit/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 hover:bg-purple-600/20 p-3 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
          >
            <Linkedin className="w-6 h-6 text-purple-400" />
          </a>
          <a
            href="https://www.fiverr.com/rohitdarekar950"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 hover:bg-purple-600/20 p-3 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
          >
            <span className="w-6 h-6 text-purple-400 font-bold text-sm">F</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
