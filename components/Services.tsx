'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Settings, Cloud, GitBranch, Database, Workflow, Container } from 'lucide-react';

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Container className="w-8 h-8" />,
      title: 'Dockerized Deployments',
      description:
        'Containerize applications using Docker for consistent deployments across any environment. Optimize images for security and performance.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'CI/CD Pipelines',
      description:
        'Set up automated Drone CI/CD pipelines for continuous integration and deployment. Streamline your development workflow with automated testing and deployment.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: 'Workflow Automation',
      description:
        'Implement n8n for powerful workflow automation. Connect your tools and automate repetitive tasks to save time and increase productivity.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Self-Hosted Services',
      description:
        'Deploy and configure self-hosted Git with Gitea, media servers with Plex, and other services for complete control over your infrastructure.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud Management',
      description:
        'Expert setup and management of cloud infrastructure including CyberPanel installation, SSL configuration, and security hardening.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Custom DevOps Solutions',
      description:
        'Tailored DevOps pipelines and infrastructure solutions designed specifically for your project requirements and scalability needs.',
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive DevOps solutions to automate and scale your infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div
                className={`inline-flex bg-gradient-to-br ${service.color} p-3 rounded-xl mb-6`}
              >
                <div className="text-white">{service.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
