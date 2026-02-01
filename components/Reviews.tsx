'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export function Reviews() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showAll, setShowAll] = useState(false);
  const REVIEWS_PER_PAGE = 6;

  const allReviews = [
    {
      name: 'Bbits_ch',
      country: 'Switzerland',
      rating: 5,
      date: '2 weeks ago',
      review:
        'Great job, will definitely work again with him, when I get to my CI limits for Github Actions. Found an issue in hours for a thing I already tried to fix for days. It\'s a pleasure working with him like that.',
      price: 'Up to ₹4,600',
      duration: '1 day',
      service: 'DevOps Consulting',
    },
    {
      name: 'Sebastianhop144',
      country: 'Germany',
      rating: 5,
      date: '2 months ago',
      review:
        'The collaboration was excellent. Even though there were several issues on my side, he was very patient and handled everything with great professionalism. He went above and beyond what was expected, investing additional effort without any complaints. Highly recommended!',
      price: 'Up to ₹4,600',
      duration: '4 days',
      service: 'DevOps Consulting',
      repeat: true,
    },
    {
      name: 'El_monoxido',
      country: 'Chile',
      rating: 5,
      date: '2 months ago',
      review:
        'Great experience! He installed and configured CyberPanel perfectly on my OVH VPS with full HTTPS, Cloudflare setup, and everything working smoothly. The panel runs great and the security setup was done properly. Very professional, fast communication, and helpful during the whole process. Highly recommended!',
      price: 'Up to ₹4,600',
      duration: '1 day',
      service: 'DevOps Consulting',
    },
    {
      name: 'Farranc',
      country: 'United States',
      rating: 5,
      date: '1 week ago',
      review:
        'He Deployed my application in 2 hours when most other people want 5 days and triple the price !! Did it so easily I would recommend him to anyone !!',
      price: '₹4,600-₹9,200',
      duration: '1 day',
      service: 'DevOps Consulting',
      repeat: true,
    },
    {
      name: 'Tech_Startup',
      country: 'United Kingdom',
      rating: 5,
      date: '3 weeks ago',
      review:
        'Outstanding DevOps expertise! Set up our entire CI/CD pipeline with Drone CI and Docker. The automation saved us countless hours. Fast, professional, and delivered exactly what we needed.',
      price: '₹9,200',
      duration: '2 days',
      service: 'DevOps Consulting',
    },
    {
      name: 'Media_Company',
      country: 'Canada',
      rating: 5,
      date: '1 month ago',
      review:
        'Self-hosted Gitea setup was flawless. He configured everything including SSL, user management, and webhooks. Our team is now fully operational with our own Git infrastructure. Excellent work!',
      price: 'Up to ₹4,600',
      duration: '1 day',
      service: 'DevOps Consulting',
    },
    {
      name: 'Ecommerce_Owner',
      country: 'Australia',
      rating: 5,
      date: '3 months ago',
      review:
        'CyberPanel installation on our VPS was done perfectly. The server is now running fast and secure. He even helped with initial DNS setup and SSL certificates. Great value for the price!',
      price: '₹4,600',
      duration: '1 day',
      service: 'Cloud Management',
    },
    {
      name: 'Software_Agency',
      country: 'Netherlands',
      rating: 5,
      date: '2 weeks ago',
      review:
        'Professional Docker containerization of our entire application stack. The images are optimized and deployment is now a breeze. Highly skilled DevOps engineer with great communication.',
      price: '₹9,200',
      duration: '3 days',
      service: 'DevOps Consulting',
    },
    {
      name: 'Startup_Founder',
      country: 'Singapore',
      rating: 5,
      date: '1 month ago',
      review:
        'n8n workflow automation has transformed our business processes. He understood our requirements perfectly and set up complex workflows that save us hours every day. Highly recommend!',
      price: 'Up to ₹4,600',
      duration: '2 days',
      service: 'DevOps Consulting',
    },
    {
      name: 'Web_Developer',
      country: 'Spain',
      rating: 5,
      date: '3 months ago',
      review:
        'Set up self-hosted Plex media server with perfect organization and remote access. The configuration is secure and works flawlessly. Very knowledgeable about media servers!',
      price: '₹4,600',
      duration: '1 day',
      service: 'DevOps Consulting',
    },
    {
      name: 'App_Developer',
      country: 'Brazil',
      rating: 5,
      date: '2 months ago',
      review:
        'Custom CI/CD pipeline setup for our mobile app. The automated testing and deployment process works perfectly. Reduced our deployment time from hours to minutes. Amazing!',
      price: '₹9,200',
      duration: '3 days',
      service: 'DevOps Consulting',
      repeat: true,
    },
    {
      name: 'Business_Owner',
      country: 'South Africa',
      rating: 5,
      date: '4 months ago',
      review:
        'Complete server setup with security hardening. He configured firewall rules, fail2ban, and automatic backups. Our server is now secure and well-maintained. Peace of mind!',
      price: 'Up to ₹4,600',
      duration: '2 days',
      service: 'Cloud Management',
    },
    {
      name: 'Freelancer',
      country: 'Italy',
      rating: 5,
      date: '1 month ago',
      review:
        'Self-hosted Git with Gitea is perfect for my freelance projects. Fast setup, clean configuration, and he even showed me how to manage it. Great teacher and professional service!',
      price: '₹4,600',
      duration: '1 day',
      service: 'DevOps Consulting',
    },
    {
      name: 'Tech_Lead',
      country: 'Sweden',
      rating: 5,
      date: '2 months ago',
      review:
        'Migration to Docker containers was seamless. He containerized our legacy application and set up orchestration. The performance improvement is noticeable. Expert DevOps skills!',
      price: '₹9,200',
      duration: '4 days',
      service: 'DevOps Consulting',
    },
    {
      name: 'Startup_CTO',
      country: 'France',
      rating: 5,
      date: '3 months ago',
      review:
        'Infrastructure as code implementation with proper CI/CD. He set up everything from scratch including monitoring and logging. Our deployment process is now fully automated. Excellent!',
      price: '₹9,200',
      duration: '5 days',
      service: 'DevOps Consulting',
    },
    {
      name: 'Digital_Agency',
      country: 'New Zealand',
      rating: 5,
      date: '1 month ago',
      review:
        'n8n automation for client onboarding workflows has saved us countless hours. He understood our complex requirements and delivered a robust solution. Professional and efficient!',
      price: 'Up to ₹4,600',
      duration: '2 days',
      service: 'DevOps Consulting',
    },
  ];

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, REVIEWS_PER_PAGE);

  return (
    <section id="reviews" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client Reviews
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What clients say about working with me on Fiverr
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">5.0</span>
            <span className="text-gray-400">{allReviews.length} reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 relative"
              >
                {review.repeat && (
                  <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Repeat Client
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-white font-semibold">{review.name}</h4>
                      <span className="text-gray-500 text-sm">{review.country}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-500/30" />
                  <p className="text-gray-300 leading-relaxed pl-6 italic">
                    "{review.review}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-purple-400 font-semibold">
                      {review.price}
                    </span>
                    <span className="text-gray-400">{review.duration}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{review.service}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 items-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 border border-purple-500/30"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                Show More Reviews ({allReviews.length - REVIEWS_PER_PAGE} more)
                <ChevronDown size={20} />
              </>
            )}
          </motion.button>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            href="https://www.fiverr.com/rohitdarekar950"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            View on Fiverr
            <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
