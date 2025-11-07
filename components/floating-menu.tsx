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
        <>
            {/* Menu Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:glow transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
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
                <span className="text-sm hidden sm:inline">Menu</span>
            </motion.button>

            {/* Desktop: Horizontal Menu to the Left */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 right-full mr-4 hidden md:flex gap-3"
                    >
                        {MENU_ITEMS.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block"
                                >
                                    <motion.div
                                        className="glass px-6 py-3 rounded-full text-foreground font-medium text-sm whitespace-nowrap border border-border hover:border-primary transition-colors"
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile: Vertical Menu Below */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full right-0 mt-4 flex md:hidden flex-col gap-3 min-w-[160px]"
                    >
                        {MENU_ITEMS.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block"
                                >
                                    <motion.div
                                        className="glass px-6 py-3 rounded-full text-foreground font-medium text-sm text-center border border-border hover:border-primary transition-colors"
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.div>
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
                        className="fixed inset-0 -z-10"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
