import type { Metadata } from 'next';
import { ProfessionalCareer } from '@/components/ProfessionalCareer';
import { BuyMeACoffee } from '@/components/BuyMeACoffee';

export const metadata: Metadata = {
  title: 'Rohit Darekar | Associate DevOps Engineer',
  description: 'Associate DevOps Engineer at AIT Global. Experienced in Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure. View my professional experience and skills.',
  keywords: 'DevOps Engineer, AIT Global, Docker, Kubernetes, CI/CD, AWS, Pune, India',
  openGraph: {
    title: 'Rohit Darekar | Associate DevOps Engineer',
    description: 'Associate DevOps Engineer at AIT Global with expertise in cloud infrastructure and automation.',
    type: 'profile',
  },
};

export default function Home() {
  return (
    <>
      <ProfessionalCareer />
      <BuyMeACoffee />
    </>
  );
}
