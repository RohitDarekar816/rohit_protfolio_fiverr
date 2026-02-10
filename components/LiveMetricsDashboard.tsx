'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Network, 
  Server,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface MetricData {
  timestamp: number;
  value: number;
}

interface SystemMetrics {
  cpu: MetricData[];
  memory: MetricData[];
  disk: MetricData[];
  network: MetricData[];
}

interface Alert {
  id: string;
  severity: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: Date;
  service: string;
}

const MAX_DATA_POINTS = 30;

const generateRandomValue = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateSmoothValue = (prevValue: number, min: number, max: number, volatility: number = 5) => {
  const change = (Math.random() - 0.5) * volatility;
  let newValue = prevValue + change;
  newValue = Math.max(min, Math.min(max, newValue));
  return Math.round(newValue);
};

export function LiveMetricsDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: [],
    memory: [],
    disk: [],
    network: []
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [services, setServices] = useState([
    { name: 'API Gateway', status: 'healthy', responseTime: 45 },
    { name: 'Auth Service', status: 'healthy', responseTime: 32 },
    { name: 'Database', status: 'healthy', responseTime: 12 },
    { name: 'Cache', status: 'healthy', responseTime: 3 },
    { name: 'Queue Worker', status: 'healthy', responseTime: 78 },
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize metrics
  useEffect(() => {
    const initialMetrics: SystemMetrics = {
      cpu: Array(MAX_DATA_POINTS).fill(0).map((_, i) => ({
        timestamp: Date.now() - (MAX_DATA_POINTS - i) * 2000,
        value: generateRandomValue(20, 40)
      })),
      memory: Array(MAX_DATA_POINTS).fill(0).map((_, i) => ({
        timestamp: Date.now() - (MAX_DATA_POINTS - i) * 2000,
        value: generateRandomValue(40, 60)
      })),
      disk: Array(MAX_DATA_POINTS).fill(0).map((_, i) => ({
        timestamp: Date.now() - (MAX_DATA_POINTS - i) * 2000,
        value: generateRandomValue(50, 65)
      })),
      network: Array(MAX_DATA_POINTS).fill(0).map((_, i) => ({
        timestamp: Date.now() - (MAX_DATA_POINTS - i) * 2000,
        value: generateRandomValue(100, 300)
      }))
    };
    setMetrics(initialMetrics);

    // Initial alerts
    setAlerts([
      { id: '1', severity: 'info', message: 'System initialized successfully', timestamp: new Date(), service: 'System' },
      { id: '2', severity: 'info', message: 'All services are operational', timestamp: new Date(Date.now() - 60000), service: 'Monitor' }
    ]);
  }, []);

  // Update metrics
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();

      setMetrics(prev => ({
        cpu: [...prev.cpu.slice(1), { 
          timestamp: now, 
          value: generateSmoothValue(prev.cpu[prev.cpu.length - 1]?.value || 30, 15, 85, 10)
        }],
        memory: [...prev.memory.slice(1), { 
          timestamp: now, 
          value: generateSmoothValue(prev.memory[prev.memory.length - 1]?.value || 50, 30, 80, 5)
        }],
        disk: [...prev.disk.slice(1), { 
          timestamp: now, 
          value: generateSmoothValue(prev.disk[prev.disk.length - 1]?.value || 55, 50, 70, 2)
        }],
        network: [...prev.network.slice(1), { 
          timestamp: now, 
          value: generateSmoothValue(prev.network[prev.network.length - 1]?.value || 200, 50, 500, 50)
        }]
      }));

      setUptime(prev => prev + 2);

      // Randomly update service response times
      if (Math.random() > 0.7) {
        setServices(prev => prev.map(service => ({
          ...service,
          responseTime: generateRandomValue(
            Math.max(5, service.responseTime - 10),
            Math.min(200, service.responseTime + 10)
          ),
          status: Math.random() > 0.95 ? 'warning' : 'healthy'
        })));
      }

      // Generate random alerts
      if (Math.random() > 0.98) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          severity: Math.random() > 0.7 ? 'warning' : 'info',
          message: Math.random() > 0.5 ? 'High CPU usage detected' : 'Memory usage increasing',
          timestamp: new Date(),
          service: services[Math.floor(Math.random() * services.length)].name
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, services]);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  const getTrend = (data: MetricData[]) => {
    if (data.length < 2) return 'stable';
    const current = data[data.length - 1].value;
    const previous = data[data.length - 5].value;
    const diff = current - previous;
    if (diff > 5) return 'up';
    if (diff < -5) return 'down';
    return 'stable';
  };

  const renderSparkline = (data: MetricData[], color: string) => {
    const min = Math.min(...data.map(d => d.value));
    const max = Math.max(...data.map(d => d.value));
    const range = max - min || 1;
    
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const MetricCard = ({ 
    title, 
    value, 
    unit, 
    data, 
    color, 
    icon: Icon,
    max
  }: { 
    title: string; 
    value: number; 
    unit: string; 
    data: MetricData[]; 
    color: string;
    icon: React.ElementType;
    max: number;
  }) => {
    const trend = getTrend(data);
    const percentage = (value / max) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-slate-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
                <span className="text-slate-500 dark:text-gray-400 text-sm">{unit}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {trend === 'up' && <TrendingUp className="w-5 h-5 text-red-500" />}
            {trend === 'down' && <TrendingDown className="w-5 h-5 text-green-500" />}
            {trend === 'stable' && <Minus className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: color,
                width: `${percentage}%`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Sparkline */}
        <div className="h-24">
          {renderSparkline(data, color)}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/20 border border-green-500/30 mb-6"
          >
            <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-400 font-medium">Live Monitoring</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            System{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Metrics Dashboard
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Real-time monitoring dashboard showcasing observability expertise. 
            Watch metrics update live every 2 seconds.
          </motion.p>
        </div>

        {/* Dashboard Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-lg mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Online</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                Uptime: {formatUptime(uptime)}
              </div>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isPaused ? '' : 'animate-spin'}`} />
              {isPaused ? 'Resume' : 'Pause'} Updates
            </button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="CPU Usage"
            value={metrics.cpu[metrics.cpu.length - 1]?.value || 0}
            unit="%"
            data={metrics.cpu}
            color="#3b82f6"
            icon={Cpu}
            max={100}
          />
          <MetricCard
            title="Memory Usage"
            value={metrics.memory[metrics.memory.length - 1]?.value || 0}
            unit="%"
            data={metrics.memory}
            color="#8b5cf6"
            icon={Server}
            max={100}
          />
          <MetricCard
            title="Disk Usage"
            value={metrics.disk[metrics.disk.length - 1]?.value || 0}
            unit="%"
            data={metrics.disk}
            color="#f59e0b"
            icon={HardDrive}
            max={100}
          />
          <MetricCard
            title="Network I/O"
            value={metrics.network[metrics.network.length - 1]?.value || 0}
            unit="MB/s"
            data={metrics.network}
            color="#10b981"
            icon={Network}
            max={500}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Health */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Service Health</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Response times & status</p>
              </div>
            </div>

            <div className="space-y-3">
              {services.map((service) => (
                <div 
                  key={service.name}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {service.status === 'healthy' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <span className="font-medium text-slate-900 dark:text-white">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${
                      service.responseTime < 50 ? 'text-green-600' : 
                      service.responseTime < 100 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {service.responseTime}ms
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'healthy' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Alerts</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Last 10 events</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-xl border-l-4 ${
                    alert.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                    alert.severity === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                    'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{alert.message}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                        {alert.service} • {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' :
                      alert.severity === 'warning' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                      'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Powered by Modern Observability Stack</h3>
              <p className="text-slate-300">
                This dashboard demonstrates skills with Prometheus, Grafana, and real-time metrics visualization.
              </p>
            </div>
            <div className="flex gap-4">
              {['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
