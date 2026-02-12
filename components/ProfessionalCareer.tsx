'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  MapPin, 
  Mail, 
  Linkedin,
  Calendar,
  Building2,
  Code2,
  Cloud,
  GitBranch,
  Container,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    company: 'AIT Global India',
    role: 'Associate - DevOps Engineer',
    period: 'December 2025 - Present',
    duration: '3 months',
    location: 'Pune, Maharashtra, India',
    description: 'Working as a full-time DevOps Engineer focusing on cloud infrastructure and CI/CD pipeline optimization.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code'],
    current: true
  },
  {
    company: 'AIT Global India',
    role: 'DevOps Intern',
    period: 'September 2025 - December 2025',
    duration: '4 months',
    location: 'Pune',
    description: 'Gained hands-on experience with DevOps tools and practices in enterprise environment.',
    skills: ['Docker', 'GitLab CI', 'Linux', 'Shell Scripting'],
    current: false
  },
  {
    company: 'Cloudtix',
    role: 'Founder',
    period: 'January 2021 - September 2025',
    duration: '4 years 9 months',
    location: 'Ahmednagar, Maharashtra, India',
    description: 'Founded and operated a cloud consulting company delivering DevOps solutions to clients.',
    skills: ['Cloud Architecture', 'Consulting', 'Project Management', 'Client Relations'],
    current: false
  },
  {
    company: 'BOP Consultancy and Services',
    role: 'DevOps Engineer',
    period: 'December 2024 - March 2025',
    duration: '4 months',
    location: 'Pune, Maharashtra, India',
    description: 'Responsible for building CI/CD pipelines using Drone CI/CD. Implemented automated deployment workflows.',
    skills: ['Drone CI/CD', 'Docker', 'Pipeline Automation', 'GitOps'],
    current: false
  }
];

const education = [
  {
    school: 'ASM Group of Institutes',
    degree: 'Master of Science - MS, Computer Science',
    period: 'September 2023 - June 2025',
    location: 'Pune'
  },
  {
    school: "B.P.H.E. Society's Ahmednagar College",
    degree: 'BCS, Computer Science',
    period: '2020 - June 2023',
    location: 'Ahmednagar'
  }
];

const certifications = [
  { name: 'Amazon Elastic Container Service (AWS ECS)', provider: 'AWS' },
  { name: 'C Programming', provider: 'Certification' },
  { name: 'SEBI Investor Certification', provider: 'SEBI' },
  { name: 'Deloitte Australia - Cyber Job Simulation', provider: 'Deloitte' },
  { name: 'Docker Training Course for the Absolute Beginner', provider: 'Docker' }
];

const skills = [
  { name: 'REST APIs', category: 'Development' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Jenkins', category: 'DevOps' },
  { name: 'GitLab CI', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'Infrastructure as Code', category: 'DevOps' }
];

export function ProfessionalCareer() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              RD
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <a href="#experience" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
                Experience
              </a>
              <a href="#education" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
                Education
              </a>
              <a href="#certifications" className="hidden md:block text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
                Certifications
              </a>
              <Link 
                href="/freelance" 
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <span className="sm:hidden">Freelance</span>
                <span className="hidden sm:inline">View Freelance Work</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
                Available for Opportunities
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Rohit Darekar
            </h1>
            
            <p className="text-2xl text-slate-600 mb-6">
              Associate - DevOps Engineer at AIT Global
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-8">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <a href="mailto:rohitdarekar816@gmail.com" className="hover:text-slate-900 transition-colors">
                  rohitdarekar816@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <a 
                  href="https://www.linkedin.com/in/darekar-rohit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              As a passionate DevOps Engineer, I thrive in building and optimizing infrastructure to ensure 
              seamless integration and delivery of software. With hands-on experience in Docker, Jenkins, 
              GitLab CI, GitHub Actions, Drone CI/CD, and cloud platforms like AWS, Azure, and GCP, I'm 
              always ready to take on new challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Code2 className="w-8 h-8" />
              Technical Skills
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-400 transition-colors"
                >
                  <p className="font-medium text-slate-900">{skill.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{skill.category}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8" />
              Professional Experience
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-slate-600 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              Education
            </h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900">{edu.school}</h3>
                  <p className="text-slate-600 mt-1">{edu.degree}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Award className="w-8 h-8" />
              Certifications
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{cert.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{cert.provider}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              I'm always looking to collaborate with others who are passionate about DevOps and innovation. 
              Let's connect if you're looking for a DevOps professional who is hands-on, proactive, and always eager to learn!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:rohitdarekar816@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/darekar-rohit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-slate-500">
          <p>&copy; 2026 Rohit Darekar. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
