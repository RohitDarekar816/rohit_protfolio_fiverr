'use client';

import { Terminal } from './Terminal';
import { Code2, Terminal as TerminalIcon } from 'lucide-react';

export function TerminalSection() {
  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6">
            <TerminalIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">Interactive Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Terminal
            </span>{' '}
            in Action
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Watch me orchestrate containers, manage Kubernetes clusters, deploy infrastructure as code, 
            and automate server configurations in real-time.
          </p>
        </div>

        {/* Terminal Component */}
        <Terminal />

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {[
            { name: 'Docker', color: 'bg-blue-500', desc: 'Container Orchestration' },
            { name: 'Kubernetes', color: 'bg-blue-600', desc: 'Cluster Management' },
            { name: 'Terraform', color: 'bg-purple-500', desc: 'Infrastructure as Code' },
            { name: 'Ansible', color: 'bg-red-500', desc: 'Configuration Mgmt' },
            { name: 'Git', color: 'bg-orange-500', desc: 'Version Control' },
            { name: 'Linux', color: 'bg-yellow-500', desc: 'System Administration' },
          ].map((tool) => (
            <div
              key={tool.name}
              className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className={`w-3 h-3 rounded-full ${tool.color} mb-3`} />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-500">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Want to see how I can help with your DevOps needs?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            <Code2 className="w-5 h-5" />
            Let&apos;s Work Together
          </a>
        </div>
      </div>
    </section>
  );
}
