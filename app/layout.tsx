import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rohit Darekar - DevOps Engineer | Portfolio',
  description:
    'DevOps Engineer specializing in automation, self-hosted solutions, Docker, CI/CD pipelines, and cloud infrastructure. 5.0 rated Fiverr seller with 16+ reviews.',
  keywords:
    'DevOps, Docker, CI/CD, Automation, Self-Hosted Services, Gitea, Plex, Drone CI, n8n, Cloud Management, CyberPanel, Rohit Darekar',
  authors: [{ name: 'Rohit Darekar' }],
  openGraph: {
    title: 'Rohit Darekar - DevOps Engineer | Portfolio',
    description:
      'DevOps Engineer specializing in automation, self-hosted solutions, Docker, CI/CD pipelines, and cloud infrastructure.',
    type: 'website',
    url: 'https://rohitdarekar.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
