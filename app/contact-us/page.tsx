import type { Metadata } from 'next';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Rohit Darekar',
  description: 'Get in touch with Rohit Darekar. Contact information including email, phone, and address.',
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              RD
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated on 06-02-2026 02:21:17
            </p>
          </div>

          {/* Contact Information Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              You may contact us using the information below:
            </p>

            <div className="space-y-6">
              {/* Legal Entity Name */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Business Name</h3>
                  <p className="text-gray-300">ROHIT JAGANNATH DAREKAR</p>
                </div>
              </div>

              {/* Registered Address */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Registered Address</h3>
                  <p className="text-gray-300">Morewadi, Vambori, Maharashtra, PIN: 413704</p>
                </div>
              </div>

              {/* Operational Address */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Operational Address</h3>
                  <p className="text-gray-300">Morewadi, Vambori, Maharashtra, PIN: 413704</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Telephone</h3>
                  <a 
                    href="tel:7020513934" 
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    7020513934
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:rohitdarekar816@gmail.com" 
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    rohitdarekar816@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Rohit Darekar. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
