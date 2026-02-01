# Rohit Darekar - DevOps Engineer Portfolio

A modern, feature-rich portfolio website showcasing DevOps expertise, self-hosted services, and client reviews.

## Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds with purple and pink color palette
- ✨ **Animations**: Smooth scroll animations using Framer Motion
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎯 **Stats Highlight**: Prominent display of Fiverr ratings, reviews, and response time
- 💼 **Services Showcase**: Detailed presentation of DevOps capabilities
- 📊 **Skills Visualization**: Animated skill bars across multiple categories
- ⭐ **Client Reviews**: Real testimonials from Fiverr clients
- 📧 **Contact Form**: Functional contact form with direct Fiverr profile link
- 🚀 **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Observation**: React Intersection Observer

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
rohit_portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with sections
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── Hero.tsx            # Hero section with CTA
│   ├── Stats.tsx           # Statistics display
│   ├── About.tsx           # About section
│   ├── Services.tsx        # Services showcase
│   ├── Skills.tsx          # Skills with progress bars
│   ├── Reviews.tsx         # Client testimonials
│   ├── Contact.tsx         # Contact form
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer with links
└── public/
    └── Resume.pdf          # Downloadable resume
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

```bash
npm run build
vercel
```

### Other Platforms

Build and export:

```bash
npm run build
```

Then deploy the `.next` folder to your preferred hosting platform.

## Customization

### Update Personal Information

Edit the following files:
- `app/layout.tsx` - Update metadata (title, description, etc.)
- `components/Hero.tsx` - Update name and tagline
- `components/About.tsx` - Update bio and features
- `components/Contact.tsx` - Update contact information
- `components/Footer.tsx` - Update social links

### Add New Services/Skills

Edit `components/Services.tsx` and `components/Skills.tsx` to add or modify services and skills.

### Update Reviews

Edit `components/Reviews.tsx` to add or modify client testimonials.

## Contact

- **LinkedIn**: https://www.linkedin.com/in/darekar-rohit/
- **Fiverr**: https://www.fiverr.com/rohitdarekar950

## License

This project is open source and available for personal and commercial use.
