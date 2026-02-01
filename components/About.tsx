'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Server, Zap } from 'lucide-react';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Automation Expert',
      description:
        'Specialize in automating development workflows, deployment processes, and repetitive tasks to save time and increase efficiency.',
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: 'Self-Hosted Solutions',
      description:
        'Expert in setting up and maintaining self-hosted services including Gitea, Plex, Drone CI, and n8n for complete control.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Experience',
      description:
        'Worked with clients from Switzerland, Germany, Chile, and the United States, delivering exceptional results across time zones.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description:
        'Known for quick turnaround times, often completing in hours what takes others days, without compromising on quality.',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hi there! I'm a skilled DevOps engineer with a passion for
              automation, self-hosted solutions, and scalable deployment. I
              specialize in setting up and maintaining a wide range of services
              including Gitea (self-hosted Git), Plex Media Server, Drone CI/CD
              Pipelines, n8n (workflow automation), Dockerized Deployments, and
              Custom DevOps Pipelines & Infrastructure.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Whether you're looking to streamline your development workflow,
              automate tasks, or deploy scalable applications, I can help you!
              With a 5.0 rating on Fiverr and experience working with clients
              from around the world, I deliver professional, reliable solutions
              tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-slate-800/50 px-6 py-3 rounded-full border border-purple-500/30">
                <span className="text-purple-400 font-semibold">English</span>
              </div>
              <div className="bg-slate-800/50 px-6 py-3 rounded-full border border-purple-500/30">
                <span className="text-purple-400 font-semibold">Hindi</span>
              </div>
              <div className="bg-slate-800/50 px-6 py-3 rounded-full border border-purple-500/30">
                <span className="text-purple-400 font-semibold">Marathi</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 inline-flex p-3 rounded-xl mb-4">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
