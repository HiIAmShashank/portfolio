'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
    name: string;
    href: string;
}

const MENU_ITEMS: MenuItem[] = [
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Me', href: '/about' },
];

export function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Menu Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:glow transition-shadow relative z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
            >
                <div className="flex flex-col gap-1 w-4">
                    <motion.span
                        className="w-full h-0.5 bg-primary-foreground rounded-full origin-center"
                        animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-full h-0.5 bg-primary-foreground rounded-full"
                        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-full h-0.5 bg-primary-foreground rounded-full origin-center"
                        animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                </div>
            </motion.button>

            {/* Mobile: Vertical Menu Below */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 flex flex-col gap-2 min-w-[160px] p-2 bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl z-40"
                    >
                        {MENU_ITEMS.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
