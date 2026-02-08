'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Cpu, 
  Cloud,
  Layers,
  GitBranch,
  Container,
  ArrowRight,
  X,
  ZoomIn,
  ZoomOut,
  Info,
  Activity,
  Lock,
  HardDrive,
  Network
} from 'lucide-react';

interface ArchitectureComponent {
  id: string;
  name: string;
  type: 'service' | 'database' | 'gateway' | 'loadbalancer' | 'cache' | 'queue' | 'storage';
  description: string;
  icon: React.ReactNode;
  details: string[];
  position: { x: number; y: number };
  connections?: string[];
  tech?: string[];
}

interface Architecture {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  components: ArchitectureComponent[];
}

const architectures: Architecture[] = [
  {
    id: 'microservices',
    name: 'Microservices Architecture',
    description: 'Scalable microservices with API Gateway, service mesh, and distributed databases',
    icon: <Layers className="w-5 h-5" />,
    components: [
      {
        id: 'cdn',
        name: 'CloudFlare CDN',
        type: 'gateway',
        description: 'Global content delivery and DDoS protection',
        icon: <Globe className="w-6 h-6" />,
        details: [
          'Global edge network with 300+ locations',
          'DDoS protection and WAF',
          'SSL/TLS encryption',
          'Cache static assets',
          'Distribute traffic geographically'
        ],
        position: { x: 50, y: 5 },
        connections: ['lb'],
        tech: ['CloudFlare', 'AWS CloudFront', 'Fastly']
      },
      {
        id: 'lb',
        name: 'Load Balancer',
        type: 'loadbalancer',
        description: 'NGINX/HAProxy distributing traffic across services',
        icon: <Network className="w-6 h-6" />,
        details: [
          'Round-robin load distribution',
          'Health checks every 10s',
          'SSL termination',
          'Rate limiting per IP',
          'Automatic failover'
        ],
        position: { x: 50, y: 22 },
        connections: ['api-gateway'],
        tech: ['NGINX', 'HAProxy', 'Traefik']
      },
      {
        id: 'api-gateway',
        name: 'API Gateway',
        type: 'gateway',
        description: 'Kong/AWS API Gateway for routing and authentication',
        icon: <Shield className="w-6 h-6" />,
        details: [
          'JWT authentication',
          'Request/response transformation',
          'Rate limiting: 1000 req/min',
          'Request validation',
          'API versioning support'
        ],
        position: { x: 50, y: 40 },
        connections: ['auth-service', 'user-service', 'order-service', 'payment-service'],
        tech: ['Kong', 'AWS API Gateway', 'KrakenD']
      },
      {
        id: 'auth-service',
        name: 'Auth Service',
        type: 'service',
        description: 'Authentication & authorization microservice',
        icon: <Lock className="w-6 h-6" />,
        details: [
          'OAuth 2.0 / OIDC support',
          'JWT token management',
          'Multi-factor authentication',
          'Session management with Redis',
          'Social login integration'
        ],
        position: { x: 20, y: 58 },
        connections: ['redis-cache', 'auth-db'],
        tech: ['Node.js', 'Express', 'Passport.js']
      },
      {
        id: 'user-service',
        name: 'User Service',
        type: 'service',
        description: 'User management and profile operations',
        icon: <Server className="w-6 h-6" />,
        details: [
          'CRUD operations for users',
          'Profile image handling',
          'Preference management',
          'Event publishing to Kafka',
          'GraphQL API support'
        ],
        position: { x: 40, y: 58 },
        connections: ['user-db', 'kafka'],
        tech: ['Python', 'FastAPI', 'SQLAlchemy']
      },
      {
        id: 'order-service',
        name: 'Order Service',
        type: 'service',
        description: 'Order processing and management',
        icon: <Activity className="w-6 h-6" />,
        details: [
          'Order lifecycle management',
          'Inventory validation',
          'Payment integration',
          'Order analytics',
          'Saga pattern for transactions'
        ],
        position: { x: 60, y: 58 },
        connections: ['order-db', 'kafka'],
        tech: ['Java', 'Spring Boot', 'Hibernate']
      },
      {
        id: 'payment-service',
        name: 'Payment Service',
        type: 'service',
        description: 'Payment processing and transaction handling',
        icon: <Shield className="w-6 h-6" />,
        details: [
          'PCI DSS compliant',
          'Stripe/PayPal integration',
          'Transaction rollback support',
          'Fraud detection',
          'Webhook handling'
        ],
        position: { x: 80, y: 58 },
        connections: ['payment-db', 'kafka'],
        tech: ['Go', 'Gin', 'PostgreSQL']
      },
      {
        id: 'redis-cache',
        name: 'Redis Cluster',
        type: 'cache',
        description: 'Distributed caching layer for session and data',
        icon: <Cpu className="w-6 h-6" />,
        details: [
          'Session storage with TTL',
          'Rate limiting counters',
          'Real-time leaderboards',
          'Pub/sub messaging',
          '6-node cluster setup'
        ],
        position: { x: 15, y: 78 },
        tech: ['Redis', 'Redis Sentinel']
      },
      {
        id: 'auth-db',
        name: 'Auth Database',
        type: 'database',
        description: 'PostgreSQL for user credentials and roles',
        icon: <Database className="w-6 h-6" />,
        details: [
          'Encrypted credential storage',
          'Role-based access control',
          'Audit logging',
          'Automated backups',
          'Read replicas for scale'
        ],
        position: { x: 25, y: 78 },
        tech: ['PostgreSQL', 'pgBouncer']
      },
      {
        id: 'user-db',
        name: 'User Database',
        type: 'database',
        description: 'MongoDB for flexible user profile data',
        icon: <Database className="w-6 h-6" />,
        details: [
          'Schema-less profile storage',
          'Sharding for horizontal scale',
          'Full-text search with Atlas',
          'Change streams for events',
          'Multi-region replication'
        ],
        position: { x: 40, y: 78 },
        tech: ['MongoDB', 'MongoDB Atlas']
      },
      {
        id: 'order-db',
        name: 'Order Database',
        type: 'database',
        description: 'PostgreSQL with time-series extension',
        icon: <Database className="w-6 h-6" />,
        details: [
          'ACID transaction support',
          'TimescaleDB for analytics',
          'Partitioning by date',
          'Automated archival',
          'Point-in-time recovery'
        ],
        position: { x: 60, y: 78 },
        tech: ['PostgreSQL', 'TimescaleDB']
      },
      {
        id: 'payment-db',
        name: 'Payment Database',
        type: 'database',
        description: 'Highly secure database for financial data',
        icon: <Database className="w-6 h-6" />,
        details: [
          'AES-256 encryption at rest',
          'Field-level encryption',
          'Immutable audit trail',
          'Transaction log shipping',
          'Disaster recovery ready'
        ],
        position: { x: 80, y: 78 },
        tech: ['PostgreSQL', 'Vault']
      },
      {
        id: 'kafka',
        name: 'Kafka Cluster',
        type: 'queue',
        description: 'Event streaming platform for async communication',
        icon: <Activity className="w-6 h-6" />,
        details: [
          'Event sourcing pattern',
          '3-broker cluster setup',
          'Replication factor: 3',
          'Consumer groups for scale',
          'Schema registry with Avro'
        ],
        position: { x: 90, y: 68 },
        tech: ['Apache Kafka', 'Confluent']
      }
    ]
  },
  {
    id: 'docker',
    name: 'Docker Deployment',
    description: 'Containerized application stack with orchestration',
    icon: <Container className="w-5 h-5" />,
    components: [
      {
        id: 'reverse-proxy',
        name: 'Traefik',
        type: 'gateway',
        description: 'Edge router and reverse proxy with automatic HTTPS',
        icon: <Globe className="w-6 h-6" />,
        details: [
          'Automatic SSL with Let\'s Encrypt',
          'Docker label-based routing',
          'Middleware support',
          'Load balancing',
          'WebSocket support'
        ],
        position: { x: 50, y: 5 },
        connections: ['nginx'],
        tech: ['Traefik', 'Docker']
      },
      {
        id: 'nginx',
        name: 'NGINX',
        type: 'loadbalancer',
        description: 'Web server and static file serving',
        icon: <Server className="w-6 h-6" />,
        details: [
          'Static asset serving',
          'Gzip compression',
          'Browser caching headers',
          'Rate limiting',
          'DDoS protection rules'
        ],
        position: { x: 50, y: 22 },
        connections: ['frontend', 'api'],
        tech: ['NGINX', 'Docker']
      },
      {
        id: 'frontend',
        name: 'Frontend App',
        type: 'service',
        description: 'React/Vue.js application container',
        icon: <Layers className="w-6 h-6" />,
        details: [
          'Production build optimized',
          'Multi-stage Dockerfile',
          'Health checks enabled',
          'Auto-scaling ready',
          'Resource limits set'
        ],
        position: { x: 30, y: 42 },
        connections: ['api'],
        tech: ['React', 'Vite', 'Docker']
      },
      {
        id: 'api',
        name: 'API Server',
        type: 'service',
        description: 'Backend API service container',
        icon: <Server className="w-6 h-6" />,
        details: [
          'RESTful API endpoints',
          'Authentication middleware',
          'Request validation',
          'Structured logging',
          'Metrics exposition'
        ],
        position: { x: 70, y: 42 },
        connections: ['postgres', 'redis'],
        tech: ['Node.js', 'Express', 'Docker']
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        type: 'database',
        description: 'Primary relational database container',
        icon: <Database className="w-6 h-6" />,
        details: [
          'Persistent volume mounted',
          'Automated daily backups',
          'Connection pooling',
          'Query performance tuning',
          'Replication setup'
        ],
        position: { x: 60, y: 65 },
        connections: ['pgadmin'],
        tech: ['PostgreSQL 15', 'Docker Volume']
      },
      {
        id: 'redis',
        name: 'Redis',
        type: 'cache',
        description: 'In-memory data structure store',
        icon: <Cpu className="w-6 h-6" />,
        details: [
          'Session management',
          'API response caching',
          'Rate limiting store',
          'Pub/sub messaging',
          'AOF persistence enabled'
        ],
        position: { x: 80, y: 65 },
        tech: ['Redis 7', 'Docker']
      },
      {
        id: 'pgadmin',
        name: 'PgAdmin',
        type: 'service',
        description: 'Database management interface',
        icon: <Database className="w-6 h-6" />,
        details: [
          'Web-based DB management',
          'Query tool with syntax highlighting',
          'Backup/restore functionality',
          'Server monitoring dashboard',
          'SSH tunnel support'
        ],
        position: { x: 40, y: 82 },
        tech: ['PgAdmin 4', 'Docker']
      }
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    description: 'Automated build, test, and deployment workflow',
    icon: <GitBranch className="w-5 h-5" />,
    components: [
      {
        id: 'github',
        name: 'Git Repository',
        type: 'gateway',
        description: 'Source code repository with webhooks',
        icon: <GitBranch className="w-6 h-6" />,
        details: [
          'GitHub/GitLab/Gitea integration',
          'Webhook triggers on push',
          'Branch protection rules',
          'Code review requirements',
          'Semantic versioning'
        ],
        position: { x: 50, y: 5 },
        connections: ['drone'],
        tech: ['GitHub', 'Webhooks']
      },
      {
        id: 'drone',
        name: 'Drone CI',
        type: 'service',
        description: 'Continuous Integration server',
        icon: <Activity className="w-6 h-6" />,
        details: [
          'Container-native CI/CD',
          'Parallel job execution',
          'Multi-architecture builds',
          'Secret management',
          'Pipeline as code'
        ],
        position: { x: 50, y: 24 },
        connections: ['test', 'build', 'security'],
        tech: ['Drone CI', 'Docker']
      },
      {
        id: 'test',
        name: 'Test Stage',
        type: 'service',
        description: 'Automated testing pipeline',
        icon: <Activity className="w-6 h-6" />,
        details: [
          'Unit tests with Jest/Vitest',
          'Integration tests',
          'Code coverage reporting',
          'ESLint/Prettier checks',
          'Test result artifacts'
        ],
        position: { x: 20, y: 46 },
        connections: ['sonarqube'],
        tech: ['Jest', 'Testing Library', 'Docker']
      },
      {
        id: 'security',
        name: 'Security Scan',
        type: 'service',
        description: 'Vulnerability and security scanning',
        icon: <Shield className="w-6 h-6" />,
        details: [
          'SAST with SonarQube',
          'Dependency vulnerability scan',
          'Container image scanning',
          'Secrets detection',
          'License compliance check'
        ],
        position: { x: 50, y: 46 },
        connections: ['sonarqube'],
        tech: ['Trivy', 'SonarQube', 'GitLeaks']
      },
      {
        id: 'build',
        name: 'Build & Push',
        type: 'service',
        description: 'Docker image building and registry push',
        icon: <Container className="w-6 h-6" />,
        details: [
          'Multi-stage Docker builds',
          'Layer caching optimization',
          'Multi-platform builds',
          'Registry authentication',
          'Image tagging strategy'
        ],
        position: { x: 80, y: 46 },
        connections: ['registry'],
        tech: ['Docker', 'BuildKit', 'Kaniko']
      },
      {
        id: 'sonarqube',
        name: 'SonarQube',
        type: 'service',
        description: 'Code quality and security analysis',
        icon: <Activity className="w-6 h-6" />,
        details: [
          'Code smell detection',
          'Technical debt tracking',
          'Security hotspot detection',
          'Code coverage visualization',
          'Quality gate enforcement'
        ],
        position: { x: 35, y: 68 },
        tech: ['SonarQube', 'Docker']
      },
      {
        id: 'registry',
        name: 'Container Registry',
        type: 'storage',
        description: 'Docker image storage and management',
        icon: <HardDrive className="w-6 h-6" />,
        details: [
          'Private image repository',
          'Vulnerability scanning',
          'Image signing with Cosign',
          'Retention policies',
          'Geo-replication'
        ],
        position: { x: 65, y: 68 },
        connections: ['deploy'],
        tech: ['Docker Hub', 'GHCR', 'Harbor']
      },
      {
        id: 'deploy',
        name: 'Deploy Stage',
        type: 'service',
        description: 'Automated deployment to production',
        icon: <Cloud className="w-6 h-6" />,
        details: [
          'Blue-green deployment',
          'Health check validation',
          'Rollback capability',
          'Database migrations',
          'Smoke tests post-deploy'
        ],
        position: { x: 80, y: 82 },
        tech: ['ArgoCD', 'Kubernetes', 'Helm']
      }
    ]
  }
];

export function InfrastructureExplorer() {
  const [selectedArch, setSelectedArch] = useState<Architecture>(architectures[0]);
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.7));

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <Network className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-400 font-medium">Interactive Architecture</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Infrastructure{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
              Diagram Explorer
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore interactive architecture diagrams. Click on components to see implementation details,
            technologies used, and best practices.
          </motion.p>
        </div>

        {/* Architecture Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {architectures.map((arch) => (
            <button
              key={arch.id}
              onClick={() => {
                setSelectedArch(arch);
                setSelectedComponent(null);
                setScale(1);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedArch.id === arch.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 dark:hover:border-purple-500/50'
              }`}
            >
              {arch.icon}
              {arch.name}
            </button>
          ))}
        </div>

        {/* Diagram Container */}
        <motion.div
          key={selectedArch.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-purple-500/20 overflow-hidden shadow-xl"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedArch.name}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">{selectedArch.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {/* Diagram Canvas */}
          <div className="relative h-[600px] bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-purple-400" />
                  </marker>
                </defs>
                {selectedArch.components.map((component) =>
                  component.connections?.map((targetId) => {
                    const target = selectedArch.components.find((c) => c.id === targetId);
                    if (!target) return null;
                    
                    const isHovered = hoveredComponent === component.id || hoveredComponent === targetId;
                    const isSelected = selectedComponent?.id === component.id || selectedComponent?.id === targetId;
                    
                    return (
                      <motion.line
                        key={`${component.id}-${targetId}`}
                        x1={`${component.position.x}%`}
                        y1={`${component.position.y + 8}%`}
                        x2={`${target.position.x}%`}
                        y2={`${target.position.y - 2}%`}
                        stroke="currentColor"
                        strokeWidth={isHovered || isSelected ? 3 : 2}
                        markerEnd="url(#arrowhead)"
                        className={`text-purple-400 ${isHovered || isSelected ? 'opacity-100' : 'opacity-40'}`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Components */}
              {selectedArch.components.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`,
                  }}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  onClick={() => setSelectedComponent(component)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer relative group ${
                      selectedComponent?.id === component.id
                        ? 'z-10'
                        : 'z-0'
                    }`}
                  >
                    {/* Component Card */}
                    <div
                      className={`w-32 p-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedComponent?.id === component.id
                          ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 shadow-lg shadow-purple-500/30'
                          : hoveredComponent === component.id
                          ? 'bg-white dark:bg-slate-800 border-purple-400 shadow-lg'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                          selectedComponent?.id === component.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        {component.icon}
                      </div>
                      <p className="text-xs font-semibold text-center text-slate-900 dark:text-white leading-tight">
                        {component.name}
                      </p>
                      
                      {/* Type Badge */}
                      <div className="mt-2 flex justify-center">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {component.type}
                        </span>
                      </div>
                    </div>

                    {/* Tooltip on Hover */}
                    {hoveredComponent === component.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-slate-800 dark:bg-slate-900 text-white text-xs rounded-lg shadow-xl z-20 pointer-events-none"
                      >
                        <p className="font-semibold mb-1">{component.name}</p>
                        <p className="text-slate-300">{component.description}</p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-800 dark:border-t-slate-900" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-slate-600 dark:text-gray-400">Component types:</span>
              {[
                { type: 'gateway', label: 'Gateway', color: 'bg-blue-500' },
                { type: 'loadbalancer', label: 'Load Balancer', color: 'bg-green-500' },
                { type: 'service', label: 'Service', color: 'bg-purple-500' },
                { type: 'database', label: 'Database', color: 'bg-orange-500' },
                { type: 'cache', label: 'Cache', color: 'bg-red-500' },
                { type: 'queue', label: 'Queue', color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-slate-600 dark:text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Component Details Panel */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-purple-500/20 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                    {selectedComponent.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedComponent.name}
                    </h3>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                      {selectedComponent.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                </button>
              </div>

              <p className="text-slate-600 dark:text-gray-400 mb-6">
                {selectedComponent.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-purple-600" />
                    Implementation Details
                  </h4>
                  <ul className="space-y-2">
                    {selectedComponent.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400">
                        <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedComponent.tech && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-gray-500">
                  <Info className="w-4 h-4 inline mr-1" />
                  Click on other components in the diagram to explore the full architecture.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            Need help implementing any of these architectures?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            Discuss Your Architecture
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
