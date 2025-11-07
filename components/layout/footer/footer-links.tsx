import { NAVIGATION } from '@/lib/config/index';
import Link from 'next/link';


export function FooterLinks() {
    return (
        <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-3">
                {NAVIGATION.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
