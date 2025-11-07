import { Project } from './types';

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
