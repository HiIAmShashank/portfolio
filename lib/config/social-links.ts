import { SocialLink } from './types';
import { PERSONAL_INFO } from './personal';

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
