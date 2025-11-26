'use client';

import { TECH_STACK } from '@/lib/config';
import { TechBadge } from '@/components/ui/tech-badge';

export function HeroTechStack() {
    return (
        <div
            className="pt-12 animate-in fade-in slide-in-from-bottom-5 duration-600"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Tech Stack</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
                {[...TECH_STACK].sort((a, b) => a.name.localeCompare(b.name)).map((tech, index) => (
                    <TechBadge
                        key={tech.name}
                        name={tech.name}
                        icon={tech.icon as any}
                        color={tech.color}
                        delay={0.7 + index * 0.05}
                    />
                ))}
            </div>
        </div>
    );
}
