import Link from 'next/link';
import { FloatingMenu } from '@/components/floating-menu';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="flex justify-between items-center px-4 py-3">
                {/* Logo/Title */}
                <Link
                    href="/"
                    className="text-foreground font-bold text-base sm:text-lg hover:text-primary transition-colors"
                >
                    <span>Shashank Gupta | sgupta.dev</span>
                </Link>

                {/* Floating Menu & Theme Toggle */}
                <div className="flex items-center gap-3 relative z-50">
                    <ThemeToggle />
                    <FloatingMenu />
                </div>
            </div>
        </nav>
    );
}
