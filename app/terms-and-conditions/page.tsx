import type { Metadata } from 'next';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Rohit Darekar',
  description: 'Terms and Conditions for using Rohit Darekar services and website.',
};

export default function TermsAndConditionsPage() {
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
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Conditions</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated on 06-02-2026 02:27:20
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 space-y-8">
            <section>
              <p className="text-gray-300 leading-relaxed">
                These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding 
                agreement by and between ROHIT JAGANNATH DAREKAR, ( "Website Owner" or "we" or "us" or 
                "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services 
                (as applicable) (collectively, "Services").
              </p>
            </section>

            <section>
              <p className="text-gray-300 leading-relaxed">
                By using our website and availing the Services, you agree that you have read and accepted these Terms 
                (including the Privacy Policy). We reserve the right to modify these Terms at any time and without 
                assigning any reason. It is your responsibility to periodically review these Terms to stay informed of 
                updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Terms of Use
              </h2>
              <p className="text-gray-300 mb-4">
                The use of this website or availing of our Services is subject to the following terms of use:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    To access and use the Services, you agree to provide true, accurate and complete information to us 
                    during and after registration, and you shall be responsible for all acts done through the use of your 
                    registered account.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, 
                    performance, completeness or suitability of the information and materials offered on this website 
                    or through the Services, for any specific purpose. You acknowledge that such information and 
                    materials may contain inaccuracies or errors and we expressly exclude liability for any such 
                    inaccuracies or errors to the fullest extent permitted by law.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    Your use of our Services and the website is solely at your own risk and discretion. You are 
                    required to independently assess and ensure that the Services meet your requirements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    The contents of the Website and the Services are proprietary to Us and you will not have any 
                    authority to claim any intellectual property rights, title, or interest in its contents.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You acknowledge that unauthorized use of the Website or the Services may lead to action against 
                    you as per these Terms or applicable laws.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You agree to pay us the charges associated with availing the Services.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You agree not to use the website and/or Services for any purpose that is unlawful, illegal or 
                    forbidden by these Terms, or Indian or local laws that might apply to you.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You agree and acknowledge that website and the Services may contain links to other third party 
                    websites. On accessing these links, you will be governed by the terms of use, privacy policy and 
                    such other policies of such third party websites.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You understand that upon initiating a transaction for availing the Services you are entering into a 
                    legally binding and enforceable contract with the us for the Services.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="leading-relaxed">
                    You shall be entitled to claim a refund of the payment made by you in case we are not able to 
                    provide the Service. The timelines for such return and refund will be according to the specific 
                    Service you have availed or within the time period provided in our policies (as applicable). In case 
                    you do not raise a refund claim within the stipulated time, than this would make you ineligible for 
                    a refund.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to 
                perform an obligation under these Terms if performance is prevented or delayed by a force majeure 
                event.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and 
                construed in accordance with the laws of India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Jurisdiction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                All disputes arising out of or in connection with these Terms shall be subject to the exclusive 
                jurisdiction of the courts in Vambori, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Communication
              </h2>
              <p className="text-gray-300 leading-relaxed">
                All concerns or communications relating to these Terms must be communicated to us using the 
                contact information provided on this website.
              </p>
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
