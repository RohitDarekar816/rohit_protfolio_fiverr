'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', level: 95 },
        { name: 'CI/CD', level: 90 },
        { name: 'Linux', level: 92 },
        { name: 'Cloud Management', level: 88 },
      ],
    },
    {
      category: 'Self-Hosted Services',
      skills: [
        { name: 'Gitea', level: 90 },
        { name: 'Plex', level: 85 },
        { name: 'Drone CI', level: 88 },
        { name: 'n8n', level: 82 },
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'WordPress', level: 90 },
        { name: 'CyberPanel', level: 88 },
        { name: 'Git', level: 95 },
        { name: 'SSL/Security', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-20 bg-slate-800/30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technical proficiency across DevOps, Cloud, and Self-Hosted Solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-purple-500/30">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-purple-400 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
