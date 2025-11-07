import { ICON_MAP } from '@/components/icons';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/config/index';

export function FooterAbout() {
    return (
        <div className="space-y-4">
            <h3 className="text-foreground font-bold text-xl">{PERSONAL_INFO.name}</h3>
            <p className="text-muted-foreground leading-relaxed">{PERSONAL_INFO.tagline}</p>
            <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => {
                    const IconComponent = ICON_MAP[link.icon];
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.ariaLabel}
                            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                        >
                            <IconComponent className="w-5 h-5" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
