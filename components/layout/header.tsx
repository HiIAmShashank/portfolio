'use client';

import Link from 'next/link';
import { FloatingMenu } from '@/components/floating-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavLink } from '@/components/layout/nav-link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'glass shadow-sm py-2' : 'border-transparent bg-transparent py-4'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
                {/* Logo/Title */}
                <Link
                    href="/"
                    className="text-foreground font-bold text-base sm:text-lg hover:text-primary transition-colors relative group flex items-center gap-2"
                >
                    <span className="text-primary font-mono text-xl">{`{`}</span>
                    <span>sgupta.dev</span>
                    <span className="text-primary font-mono text-xl">{`}`}</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/projects">Projects</NavLink>
                    <NavLink href="/blog">Blog</NavLink>
                    <NavLink href="/about">About</NavLink>
                </div>

                {/* Actions & Mobile Menu */}
                <div className="flex items-center gap-3 relative z-50">
                    <ThemeToggle />
                    <FloatingMenu />
                </div>
            </div>
        </motion.nav>
    );
}
