'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calculator, 
  Check,
  DollarSign,
  Calendar,
  User,
  Mail,
  Building,
  Briefcase,
  Clock,
  Package,
  ChevronRight
} from 'lucide-react';

interface QuoteItem {
  id: string;
  service: string;
  description: string;
  hours: number;
  rate: number;
}

interface QuoteData {
  clientName: string;
  clientEmail: string;
  companyName: string;
  projectName: string;
  items: QuoteItem[];
  notes: string;
  validUntil: string;
}

const services = [
  { name: 'Docker Setup', description: 'Container configuration & deployment', rate: 50 },
  { name: 'CI/CD Pipeline', description: 'Automated build & deployment', rate: 100 },
  { name: 'Kubernetes Setup', description: 'K8s cluster configuration', rate: 150 },
  { name: 'Cloud Migration', description: 'AWS/Azure/GCP migration', rate: 120 },
  { name: 'Infrastructure Audit', description: 'Security & performance review', rate: 80 },
  { name: 'DevOps Training', description: 'Team training session', rate: 100 },
];

export function PDFQuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData>({
    clientName: '',
    clientEmail: '',
    companyName: '',
    projectName: '',
    items: [],
    notes: '',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const addItem = (service: typeof services[0]) => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      service: service.name,
      description: service.description,
      hours: 10,
      rate: service.rate,
    };
    setQuote({ ...quote, items: [...quote.items, newItem] });
  };

  const removeItem = (id: string) => {
    setQuote({ ...quote, items: quote.items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, updates: Partial<QuoteItem>) => {
    setQuote({
      ...quote,
      items: quote.items.map(item => item.id === id ? { ...item, ...updates } : item),
    });
  };

  const subtotal = quote.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const generatePDF = async () => {
    setIsGenerating(true);
    // In production, use a library like jsPDF or html2pdf.js
    // For demo, we'll simulate the generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('PDF Quote Generated! (In production, this would download a real PDF file)');
    setIsGenerating(false);
  };

  return (
    <section id="quote-generator" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6"
          >
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400 font-medium">Business Tool</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            PDF Quote{' '}
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
            Generate professional project quotes instantly. Add services, customize pricing, 
            and download a branded PDF ready to send to clients.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quote Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200 dark:border-blue-500/20 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quote Builder</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Configure your project quote</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={quote.clientName}
                      onChange={(e) => setQuote({ ...quote, clientName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={quote.clientEmail}
                      onChange={(e) => setQuote({ ...quote, clientEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={quote.companyName}
                      onChange={(e) => setQuote({ ...quote, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Name
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={quote.projectName}
                      onChange={(e) => setQuote({ ...quote, projectName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="DevOps Migration"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Add Services
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => addItem(service)}
                    className="p-3 text-left bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                  >
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{service.name}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">${service.rate}/hr</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quote Items */}
            {quote.items.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-slate-900 dark:text-white">Quote Items</h4>
                {quote.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-slate-900 dark:text-white">{item.service}</h5>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{item.description}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          value={item.hours}
                          onChange={(e) => updateItem(item.id, { hours: parseInt(e.target.value) || 0 })}
                          className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-sm"
                          min="1"
                        />
                        <span className="text-sm text-slate-500">hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, { rate: parseInt(e.target.value) || 0 })}
                          className="w-24 px-2 py-1 rounded bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-sm"
                          min="1"
                        />
                        <span className="text-sm text-slate-500">/hr</span>
                      </div>
                      <div className="ml-auto font-semibold text-slate-900 dark:text-white">
                        ${item.hours * item.rate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Additional Notes
              </label>
              <textarea
                value={quote.notes}
                onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any special requirements or notes..."
              />
            </div>

            {/* Valid Until */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quote Valid Until
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={quote.validUntil}
                  onChange={(e) => setQuote({ ...quote, validUntil: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-gray-400">
                <span>GST (18%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-600">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            {/* PDF Preview Header */}
            <div className="bg-slate-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">PROJECT QUOTE</h3>
                  <p className="text-slate-400 text-sm mt-1">Quote #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Valid Until</p>
                  <p className="font-semibold">{quote.validUntil || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* PDF Preview Content */}
            <div ref={previewRef} className="p-8 bg-white text-slate-900">
              {/* Company Header */}
              <div className="border-b border-slate-200 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Rohit Darekar</h2>
                <p className="text-slate-600">DevOps Engineer & Consultant</p>
                <p className="text-slate-500 text-sm mt-1">rohitdarekar816@gmail.com</p>
                <p className="text-slate-500 text-sm">Pune, Maharashtra, India</p>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Quote To:</h4>
                  <p className="font-semibold text-slate-900">{quote.clientName || 'Client Name'}</p>
                  <p className="text-slate-600">{quote.companyName || 'Company Name'}</p>
                  <p className="text-slate-500 text-sm">{quote.clientEmail || 'email@example.com'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Project:</h4>
                  <p className="font-semibold text-slate-900">{quote.projectName || 'Project Name'}</p>
                  <p className="text-slate-500 text-sm">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items Table */}
              {quote.items.length > 0 ? (
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-sm font-semibold text-slate-700">Service</th>
                      <th className="text-center py-3 text-sm font-semibold text-slate-700">Hours</th>
                      <th className="text-right py-3 text-sm font-semibold text-slate-700">Rate</th>
                      <th className="text-right py-3 text-sm font-semibold text-slate-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.items.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-3">
                          <p className="font-medium text-slate-900">{item.service}</p>
                          <p className="text-sm text-slate-500">{item.description}</p>
                        </td>
                        <td className="text-center py-3 text-slate-700">{item.hours}</td>
                        <td className="text-right py-3 text-slate-700">${item.rate}/hr</td>
                        <td className="text-right py-3 font-medium text-slate-900">
                          ${(item.hours * item.rate).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl mb-8">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Add services to see the quote preview</p>
                </div>
              )}

              {/* Totals */}
              {quote.items.length > 0 && (
                <div className="border-t-2 border-slate-200 pt-4 mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">GST (18%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Notes */}
              {quote.notes && (
                <div className="bg-slate-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-slate-700 mb-2">Notes:</h4>
                  <p className="text-slate-600 text-sm">{quote.notes}</p>
                </div>
              )}

              {/* Terms */}
              <div className="text-sm text-slate-500 border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-700 mb-2">Terms & Conditions:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>50% advance payment required to start the project</li>
                  <li>Quote valid until {quote.validUntil || 'N/A'}</li>
                  <li>Additional work beyond scope will be charged separately</li>
                  <li>Payment via Bank Transfer / UPI / PayPal</li>
                </ul>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-slate-500 text-sm">Thank you for your business!</p>
                <p className="text-slate-400 text-xs mt-1">Generated by Rohit Darekar DevOps Services</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={generatePDF}
                disabled={quote.items.length === 0 || isGenerating}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-semibold transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF Quote
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
