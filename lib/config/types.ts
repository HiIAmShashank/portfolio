import { IconName } from '@/components/icons';

export interface TechStack {
    name: string;
    icon: IconName;
    color: string;
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

export interface PersonalInfo {
    name: string;
    shortName: string;
    title: string;
    tagline: string;
    email: string;
    availableForWork: boolean;
}

export interface NavigationItem {
    name: string;
    href: string;
}
