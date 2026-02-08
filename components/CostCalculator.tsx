'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Check, ArrowRight, Sparkles, Server, GitBranch, Cloud, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  basePrice: number;
  options: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
}

const services: ServiceOption[] = [
  {
    id: 'docker',
    name: 'Docker Setup',
    icon: <Server className="w-5 h-5" />,
    description: 'Containerize and deploy your applications',
    basePrice: 50,
    options: [
      { id: 'basic', name: 'Basic Containerization', price: 0, description: 'Single app containerization' },
      { id: 'multi', name: 'Multi-Container Setup', price: 30, description: 'Docker Compose with multiple services' },
      { id: 'swarm', name: 'Docker Swarm Cluster', price: 80, description: 'Production swarm orchestration' },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    icon: <GitBranch className="w-5 h-5" />,
    description: 'Automated build and deployment workflows',
    basePrice: 100,
    options: [
      { id: 'basic', name: 'Basic Pipeline', price: 0, description: 'Git webhook + build automation' },
      { id: 'testing', name: 'With Testing', price: 50, description: 'Automated testing integration' },
      { id: 'advanced', name: 'Full DevOps', price: 100, description: 'Multi-env deployment + monitoring' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Setup',
    icon: <Cloud className="w-5 h-5" />,
    description: 'Server configuration and management',
    basePrice: 75,
    options: [
      { id: 'vps', name: 'VPS Configuration', price: 0, description: 'Single server setup' },
      { id: 'multi', name: 'Multi-Server', price: 60, description: 'Load balancer + multiple servers' },
      { id: 'k8s', name: 'Kubernetes', price: 150, description: 'K8s cluster setup + management' },
    ],
  },
  {
    id: 'security',
    name: 'Security & SSL',
    icon: <Shield className="w-5 h-5" />,
    description: 'SSL certificates and security hardening',
    basePrice: 40,
    options: [
      { id: 'ssl', name: 'SSL Setup', price: 0, description: 'Let\'s Encrypt SSL configuration' },
      { id: 'firewall', name: 'Firewall + SSL', price: 30, description: 'Security hardening + SSL' },
      { id: 'full', name: 'Full Security Audit', price: 80, description: 'Complete security assessment + fixes' },
    ],
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    icon: <Zap className="w-5 h-5" />,
    description: 'n8n or custom automation workflows',
    basePrice: 60,
    options: [
      { id: 'simple', name: 'Simple Workflow', price: 0, description: '1-2 automated tasks' },
      { id: 'medium', name: 'Medium Complexity', price: 40, description: '3-5 integrated services' },
      { id: 'complex', name: 'Complex System', price: 100, description: 'Enterprise automation suite' },
    ],
  },
];

export function CostCalculator() {
  const [selectedServices, setSelectedServices] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      const newServices = { ...prev };
      if (newServices[serviceId]) {
        delete newServices[serviceId];
      } else {
        newServices[serviceId] = 'basic';
      }
      return newServices;
    });
    setShowEstimate(false);
  };

  const handleOptionChange = (serviceId: string, optionId: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: optionId,
    }));
    setShowEstimate(false);
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedServices).forEach(([serviceId, optionId]) => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        total += service.basePrice;
        const option = service.options.find(o => o.id === optionId);
        if (option) {
          total += option.price;
        }
      }
    });
    return total;
  };

  const selectedCount = Object.keys(selectedServices).length;

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">Interactive Tool</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Project Cost{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Calculator
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Get an instant estimate for your DevOps project. Select the services you need 
            and see the pricing breakdown in real-time.
          </motion.p>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-purple-500/20 shadow-xl"
        >
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {services.map((service) => {
              const isSelected = selectedServices[service.id];
              const selectedOption = service.options.find(o => o.id === selectedServices[service.id]);
              
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/30'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    isSelected 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">{service.description}</p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    From ${service.basePrice}
                  </p>
                  
                  {/* Options */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-500/30"
                      >
                        <p className="text-xs text-slate-500 dark:text-gray-400 mb-3">Select tier:</p>
                        {service.options.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedServices[service.id] === option.id
                                ? 'bg-purple-100 dark:bg-purple-800/30'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name={service.id}
                              value={option.id}
                              checked={selectedServices[service.id] === option.id}
                              onChange={() => handleOptionChange(service.id, option.id)}
                              className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{option.name}</p>
                              <p className="text-xs text-slate-500 dark:text-gray-400">{option.description}</p>
                            </div>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                              +${option.price}
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-purple-100 mb-1">Estimated Project Cost</p>
                  <div className="flex items-baseline gap-2">
                    <DollarSign className="w-8 h-8" />
                    <span className="text-5xl font-bold">{calculateTotal()}</span>
                    <span className="text-purple-200">USD</span>
                  </div>
                  <p className="text-sm text-purple-200 mt-2">
                    {selectedCount} service{selectedCount !== 1 ? 's' : ''} selected
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedServices({})}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
                  >
                    Reset
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-xs text-purple-200 mt-4 text-center">
                *This is an estimate. Final pricing may vary based on project complexity and requirements.
              </p>
            </motion.div>
          )}

          {selectedCount === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-gray-400">
              <p>Select one or more services above to see pricing</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
