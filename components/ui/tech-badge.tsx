/**
 * TechBadge Component
 * Reusable technology badge with icon and hover effects
 */

import { ICON_MAP, IconName } from '@/components/icons';

interface TechBadgeProps {
    name: string;
    icon: IconName;
    color: string;
    delay?: number;
}

export function TechBadge({ name, icon, color, delay = 0 }: TechBadgeProps) {
    const IconComponent = ICON_MAP[icon];

    return (
        <div
            className="glass px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:shadow-lg hover:glow cursor-default transition-all duration-200 hover:-translate-y-1.5 hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-4 flex items-center justify-start w-full"
            style={{
                '--tech-color': color,
                animationDelay: `${delay * 1000}ms`,
                animationDuration: '400ms',
                animationFillMode: 'both'
            } as React.CSSProperties}
        >
            <IconComponent size={18} style={{ color }} className="shrink-0" />
            <span className="text-foreground ml-2 truncate">{name}</span>
        </div>
    );
}
