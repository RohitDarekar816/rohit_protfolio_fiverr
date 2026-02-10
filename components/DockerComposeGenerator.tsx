'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Database, 
  Server, 
  Shield, 
  Cpu, 
  Copy, 
  Check, 
  Download,
  Plus,
  Trash2,
  Settings,
  FileCode,
  RefreshCw
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  image: string;
  ports: string[];
  environment: Record<string, string>;
  volumes: string[];
  depends_on: string[];
  networks: string[];
}

interface DockerComposeConfig {
  version: string;
  services: Record<string, Service>;
  networks: Record<string, { driver: string }>;
  volumes: Record<string, {}>;
}

const serviceTemplates: Record<string, Partial<Service>> = {
  postgres: {
    name: 'postgres',
    image: 'postgres:15-alpine',
    ports: ['5432:5432'],
    environment: {
      POSTGRES_USER: 'user',
      POSTGRES_PASSWORD: 'password',
      POSTGRES_DB: 'myapp'
    },
    volumes: ['postgres_data:/var/lib/postgresql/data']
  },
  mysql: {
    name: 'mysql',
    image: 'mysql:8.0',
    ports: ['3306:3306'],
    environment: {
      MYSQL_ROOT_PASSWORD: 'rootpassword',
      MYSQL_DATABASE: 'myapp',
      MYSQL_USER: 'user',
      MYSQL_PASSWORD: 'password'
    },
    volumes: ['mysql_data:/var/lib/mysql']
  },
  redis: {
    name: 'redis',
    image: 'redis:7-alpine',
    ports: ['6379:6379'],
    volumes: ['redis_data:/data']
  },
  mongodb: {
    name: 'mongodb',
    image: 'mongo:6',
    ports: ['27017:27017'],
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: 'password'
    },
    volumes: ['mongo_data:/data/db']
  },
  nginx: {
    name: 'nginx',
    image: 'nginx:alpine',
    ports: ['80:80', '443:443'],
    volumes: ['./nginx.conf:/etc/nginx/nginx.conf:ro']
  },
  nodejs: {
    name: 'app',
    image: 'node:18-alpine',
    ports: ['3000:3000'],
    volumes: ['.:/app', '/app/node_modules'],
    environment: {
      NODE_ENV: 'development',
      PORT: '3000'
    }
  },
  python: {
    name: 'api',
    image: 'python:3.11-slim',
    ports: ['8000:8000'],
    volumes: ['.:/app'],
    environment: {
      PYTHONUNBUFFERED: '1'
    }
  },
  elasticsearch: {
    name: 'elasticsearch',
    image: 'elasticsearch:8.8.0',
    ports: ['9200:9200'],
    environment: {
      'discovery.type': 'single-node',
      'xpack.security.enabled': 'false'
    },
    volumes: ['es_data:/usr/share/elasticsearch/data']
  },
  kafka: {
    name: 'kafka',
    image: 'confluentinc/cp-kafka:latest',
    ports: ['9092:9092'],
    environment: {
      'KAFKA_ZOOKEEPER_CONNECT': 'zookeeper:2181',
      'KAFKA_ADVERTISED_LISTENERS': 'PLAINTEXT://localhost:9092'
    }
  },
  rabbitmq: {
    name: 'rabbitmq',
    image: 'rabbitmq:3-management',
    ports: ['5672:5672', '15672:15672'],
    environment: {
      'RABBITMQ_DEFAULT_USER': 'admin',
      'RABBITMQ_DEFAULT_PASS': 'password'
    }
  }
};

export function DockerComposeGenerator() {
  const [services, setServices] = useState<Service[]>([]);
  const [generatedYaml, setGeneratedYaml] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [projectName, setProjectName] = useState('my-app');

  useEffect(() => {
    generateYaml();
  }, [services, projectName]);

  const addService = (templateKey: string) => {
    const template = serviceTemplates[templateKey];
    if (!template) return;

    const newService: Service = {
      id: Date.now().toString(),
      name: template.name || templateKey,
      image: template.image || '',
      ports: [...(template.ports || [])],
      environment: { ...(template.environment || {}) },
      volumes: [...(template.volumes || [])],
      depends_on: [...(template.depends_on || [])],
      networks: ['app-network']
    };

    setServices([...services, newService]);
    setSelectedService('');
  };

  const removeService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const generateYaml = () => {
    if (services.length === 0) {
      setGeneratedYaml('# Add services to generate docker-compose.yml');
      return;
    }

    const config: DockerComposeConfig = {
      version: '3.8',
      services: {},
      networks: {
        'app-network': { driver: 'bridge' }
      },
      volumes: {}
    };

    services.forEach(service => {
      config.services[service.name] = {
        id: service.id,
        name: service.name,
        image: service.image,
        ports: service.ports,
        environment: service.environment,
        volumes: service.volumes,
        depends_on: service.depends_on,
        networks: service.networks
      };

      // Extract volume names
      service.volumes.forEach(vol => {
        const volName = vol.split(':')[0];
        if (!volName.startsWith('.') && !volName.startsWith('/')) {
          config.volumes[volName] = {};
        }
      });
    });

    let yaml = `version: '${config.version}'\n\n`;
    yaml += `services:\n`;

    Object.entries(config.services).forEach(([name, service]) => {
      yaml += `  ${name}:\n`;
      yaml += `    image: ${service.image}\n`;

      if (service.ports.length > 0) {
        yaml += `    ports:\n`;
        service.ports.forEach(port => {
          yaml += `      - "${port}"\n`;
        });
      }

      if (Object.keys(service.environment).length > 0) {
        yaml += `    environment:\n`;
        Object.entries(service.environment).forEach(([key, value]) => {
          yaml += `      ${key}: ${value}\n`;
        });
      }

      if (service.volumes.length > 0) {
        yaml += `    volumes:\n`;
        service.volumes.forEach(vol => {
          yaml += `      - ${vol}\n`;
        });
      }

      if (service.depends_on.length > 0) {
        yaml += `    depends_on:\n`;
        service.depends_on.forEach(dep => {
          yaml += `      - ${dep}\n`;
        });
      }

      if (service.networks.length > 0) {
        yaml += `    networks:\n`;
        service.networks.forEach(net => {
          yaml += `      - ${net}\n`;
        });
      }

      yaml += '\n';
    });

    if (Object.keys(config.volumes).length > 0) {
      yaml += `volumes:\n`;
      Object.keys(config.volumes).forEach(vol => {
        yaml += `  ${vol}:\n`;
      });
      yaml += '\n';
    }

    if (Object.keys(config.networks).length > 0) {
      yaml += `networks:\n`;
      Object.entries(config.networks).forEach(([name, net]) => {
        yaml += `  ${name}:\n`;
        yaml += `    driver: ${net.driver}\n`;
      });
    }

    setGeneratedYaml(yaml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadYaml = () => {
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getServiceIcon = (image: string) => {
    if (image.includes('postgres')) return <Database className="w-5 h-5" />;
    if (image.includes('mysql')) return <Database className="w-5 h-5" />;
    if (image.includes('redis')) return <Cpu className="w-5 h-5" />;
    if (image.includes('mongo')) return <Database className="w-5 h-5" />;
    if (image.includes('nginx')) return <Server className="w-5 h-5" />;
    if (image.includes('node')) return <FileCode className="w-5 h-5" />;
    if (image.includes('python')) return <FileCode className="w-5 h-5" />;
    if (image.includes('elastic')) return <Database className="w-5 h-5" />;
    return <Container className="w-5 h-5" />;
  };

  return (
    <section id="docker-compose" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6"
          >
            <Container className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400 font-medium">Developer Tool</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Docker Compose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Generator
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Build production-ready docker-compose.yml files in seconds. Select services, 
            customize configurations, and deploy with confidence.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Service Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-blue-500/20 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Service Builder</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Add and configure services</p>
              </div>
            </div>

            {/* Project Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="my-project"
              />
            </div>

            {/* Add Service */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Add Service
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a service...</option>
                  {Object.keys(serviceTemplates).map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => selectedService && addService(selectedService)}
                  disabled={!selectedService}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              <AnimatePresence>
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {getServiceIcon(service.image)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white capitalize">
                            {service.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-gray-400">{service.image}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeService(service.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Edit Fields */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <label className="block text-xs text-slate-500 dark:text-gray-400 mb-1">Ports</label>
                        <input
                          type="text"
                          value={service.ports.join(', ')}
                          onChange={(e) => updateService(service.id, { 
                            ports: e.target.value.split(',').map(p => p.trim()).filter(Boolean) 
                          })}
                          className="w-full px-2 py-1 rounded bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-900 dark:text-white text-xs"
                          placeholder="8080:80"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 dark:text-gray-400 mb-1">Container Name</label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(service.id, { name: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {services.length === 0 && (
                <div className="text-center py-8 text-slate-400 dark:text-gray-500">
                  <Container className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No services added yet</p>
                  <p className="text-sm">Select a service from the dropdown above</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Generated YAML */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 rounded-3xl p-6 border border-slate-700 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">docker-compose.yml</h3>
                  <p className="text-sm text-slate-400">Generated configuration</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadYaml}
                  disabled={services.length === 0}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg transition-colors"
                  title="Download file"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* YAML Preview */}
            <div className="relative">
              <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto text-sm font-mono text-slate-300 h-[500px] overflow-y-auto">
                <code>{generatedYaml}</code>
              </pre>
              
              {/* Line Numbers */}
              <div className="absolute left-0 top-4 bottom-4 w-8 bg-slate-950 border-r border-slate-800 text-slate-600 text-xs text-right pr-2 font-mono select-none">
                {generatedYaml.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {services.length > 0 && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Next Steps
                </h4>
                <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Save the file as <code className="bg-slate-700 px-1 rounded">docker-compose.yml</code></li>
                  <li>Run <code className="bg-slate-700 px-1 rounded">docker-compose up -d</code></li>
                  <li>Access your services at the configured ports</li>
                </ol>
              </div>
            )}
          </motion.div>
        </div>

        {/* Service Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Available Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(serviceTemplates).map(([key, template], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addService(key)}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {getServiceIcon(template.image || '')}
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white capitalize mb-1">
                  {key}
                </h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2">
                  {template.image}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-blue-600 dark:text-blue-400">
                  <Plus className="w-3 h-3" />
                  <span>Click to add</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
