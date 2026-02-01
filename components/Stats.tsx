'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, TrendingUp, Clock, Award } from 'lucide-react';

export function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: <Star className="w-8 h-8" />,
      value: '5.0',
      label: 'Rating',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      iconColor: 'text-yellow-400',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '16+',
      label: 'Reviews',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      iconColor: 'text-green-400',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '1hr',
      label: 'Response Time',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      iconColor: 'text-blue-400',
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 'L1',
      label: 'Seller Level',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105`}
            >
              <div className={`flex justify-center mb-3 ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <h3 className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
