/**
 * SocialLink Component
 * Reusable social media link with icon
 */

import Link from 'next/link';
import { ICON_MAP, IconName } from '@/components/icons';

interface SocialLinkProps {
    name: string;
    url: string;
    icon: IconName;
    ariaLabel: string;
    variant?: 'default' | 'footer';
}

export function SocialLink({
    name,
    url,
    icon,
    ariaLabel,
    variant = 'default'
}: SocialLinkProps) {
    const IconComponent = ICON_MAP[icon];
    const isExternal = url.startsWith('http');

    const baseClasses = variant === 'footer'
        ? 'text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2'
        : 'glass px-8 py-4 text-foreground rounded-xl hover:text-primary transition-all hover:scale-105 hover:border-primary/50 font-semibold flex items-center gap-2';

    return (
        <Link
            href={url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel}
            className={baseClasses}
        >
            <IconComponent size={variant === 'footer' ? 16 : 20} />
            <span>{name}</span>
        </Link>
    );
}
