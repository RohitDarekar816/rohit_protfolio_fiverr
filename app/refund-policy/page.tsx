import type { Metadata } from 'next';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Rohit Darekar',
  description: 'Cancellation and Refund Policy for Rohit Darekar services.',
};

export default function RefundPolicyPage() {
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6">
              <RefreshCcw className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cancellation & <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Refund Policy</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated on 06-02-2026 02:27:44
            </p>
          </div>

          {/* Policy Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 space-y-8">
            <section>
              <p className="text-gray-300 leading-relaxed text-lg">
                ROHIT JAGANNATH DAREKAR believes in helping its customers as far as possible, and has therefore 
                a liberal cancellation policy. Under this policy:
              </p>
            </section>

            <section className="space-y-6">
              {/* Cancellation Policy */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Order Cancellations
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Cancellations will be considered only if the request is made immediately after placing the order. 
                  However, the cancellation request may not be entertained if the orders have been communicated to the 
                  vendors/merchants and they have initiated the process of shipping them.
                </p>
              </div>

              {/* Perishable Items */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Perishable Items
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  ROHIT JAGANNATH DAREKAR does not accept cancellation requests for perishable items like 
                  flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the 
                  quality of product delivered is not good.
                </p>
              </div>

              {/* Damaged or Defective Items */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Damaged or Defective Items
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  In case of receipt of damaged or defective items please report the same to our Customer Service team. 
                  The request will, however, be entertained once the merchant has checked and determined the same at his 
                  own end. This should be reported within <span className="text-purple-400 font-semibold">7 Days</span> of receipt of the products. In case you feel that the 
                  product received is not as shown on the site or as per your expectations, you must bring it to the notice of 
                  our customer service within <span className="text-purple-400 font-semibold">7 Days</span> of receiving the product. The Customer Service Team after 
                  looking into your complaint will take an appropriate decision.
                </p>
              </div>

              {/* Warranty Items */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Products with Warranty
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer 
                  the issue to them.
                </p>
              </div>

              {/* Refund Processing */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-purple-500/10">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Refund Processing Time
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  In case of any Refunds approved by the ROHIT JAGANNATH DAREKAR, it'll take 
                  <span className="text-purple-400 font-semibold"> 6-8 Days</span> for the refund to be processed to the end customer.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="border-t border-purple-500/20 pt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Need Help?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                If you have any questions about our cancellation and refund policy, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 font-semibold rounded-full hover:bg-purple-600/30 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 border border-gray-500/30 text-gray-300 font-semibold rounded-full hover:bg-slate-700 transition-all duration-300"
                >
                  View Terms & Conditions
                </Link>
              </div>
            </section>
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
