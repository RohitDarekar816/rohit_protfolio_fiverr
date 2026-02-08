'use client';

import { Github, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/darekar-rohit/',
    },
    {
      name: 'Fiverr',
      icon: <span className="w-6 h-6 font-bold">F</span>,
      href: 'https://www.fiverr.com/rohitdarekar950',
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-200 dark:border-purple-500/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent mb-4">
              Rohit Darekar
            </h3>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
              DevOps Engineer specializing in automation, self-hosted solutions,
              and scalable deployment.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 transition-colors duration-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 transition-colors duration-300">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/terms-and-conditions" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 transition-colors duration-300">Connect With Me</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800/50 hover:bg-purple-100 dark:hover:bg-purple-600/20 p-3 rounded-full border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-500/60 transition-all duration-300"
                >
                  <div className="text-purple-600 dark:text-purple-400 transition-colors duration-300">{link.icon}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-200 dark:border-purple-500/20 pt-8 text-center transition-colors duration-300">
          <p className="text-slate-600 dark:text-gray-400 flex items-center justify-center gap-2 transition-colors duration-300">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Rohit
            Darekar © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
