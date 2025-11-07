/**
 * Portfolio configuration
 * Centralized data management for maintainability and reusability
 */

import { IconName } from '@/components/icons';

export interface TechStack {
    name: string;
    icon: IconName; // Icon identifier for mapping to components
    color: string; // Primary brand color
}

export interface SocialLink {
    name: string;
    url: string;
    icon: IconName;
    ariaLabel: string;
}

export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    url: string;
    image?: string;
    tags: string[];
    status: 'live' | 'beta' | 'coming-soon';
    features: string[];
}

export const PERSONAL_INFO = {
    name: 'Shashank Gupta',
    shortName: 'SG',
    title: 'Full-stack developer crafting elegant, performant, and scalable web experiences',
    tagline: 'Full-stack developer turning coffee into code',
    email: 'shashankksgupta@gmail.com',
    availableForWork: true,
} as const;

export const TECH_STACK: TechStack[] = [
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    { name: 'React', icon: 'react', color: '#61DAFB' },
    { name: 'Angular', icon: 'angular', color: '#DD0031' },
    { name: 'Next.js', icon: 'nextjs', color: '#000000' },
    { name: 'Node.js', icon: 'nodejs', color: '#339933' },
    { name: 'Tailwind CSS', icon: 'tailwind', color: '#06B6D4' },
    { name: 'Vite', icon: 'vite', color: '#646CFF' },
    { name: 'Turborepo', icon: 'turborepo', color: '#EF4444' },
    { name: 'pnpm', icon: 'pnpm', color: '#F69220' },
    { name: 'Docker', icon: 'docker', color: '#2496ED' },
    { name: 'PostgreSQL', icon: 'postgres', color: '#4169E1' },
    { name: 'Azure', icon: 'azure', color: '#0078D4' },
];

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/HiIAmShashank',
        icon: 'github',
        ariaLabel: 'Visit my GitHub profile',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/shashankguptadev',
        icon: 'linkedin',
        ariaLabel: 'Connect with me on LinkedIn',
    },
    {
        name: 'Email',
        url: `mailto:${PERSONAL_INFO.email}`,
        icon: 'email',
        ariaLabel: 'Send me an email',
    },
];

export const NAVIGATION = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
] as const;

export const PROJECTS: Project[] = [
    {
        id: 'loanly',
        name: 'Loanly',
        tagline: 'Comprehensive Home Loan Calculator for India',
        description: 'A deep dive into creating an India-specific home-loan calculator that combines EMI calculations, tax benefits, PMAY subsidies, and affordability analysis for informed home-buying decisions.',
        url: 'https://loanly.sgupta.dev',
        tags: ['Finance', 'Calculator', 'India', 'Real Estate'],
        status: 'live',
        features: [
            'EMI calculations with principal and interest breakdown',
            'Tax benefits calculator for home loans',
            'PMAY subsidy eligibility and calculations',
            'Affordability analysis based on income',
            'Amortization schedule visualization',
            'Compare different loan scenarios'
        ]
    },
    {
        id: 'cashanova',
        name: 'Cashanova',
        tagline: 'Smart Expense Tracking & Budget Management',
        description: 'A modern expense tracking application that helps you manage your finances, track spending patterns, and stay within budget with intuitive visualizations and insights.',
        url: 'https://cashanova.sgupta.dev',
        tags: ['Finance', 'Budget', 'Expense Tracking', 'Analytics'],
        status: 'live',
        features: [
            'Track daily expenses and income',
            'Categorize transactions automatically',
            'Budget creation and monitoring',
            'Visual spending analytics and reports',
            'Monthly and yearly financial summaries',
            'Export data for analysis'
        ]
    }
];
