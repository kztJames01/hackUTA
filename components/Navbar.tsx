"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    { href: "/sign-in", text: "Log In" },
    { href: "/sign-up", text: "Get Started" },
];

export const Navbar = () => {
    
    const [scrolled, setScrolled] = useState(false);
    const [isFadeIn, setIsFadeIn] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setIsFadeIn(false);
                setTimeout(() => {
                    setScrolled(isScrolled);
                    setIsFadeIn(true);
                }, 200); // Adjust this delay to match your transition duration
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brown-500' : 'bg-green-1000'}`}>
            <ul className="flex justify-end items-center py-5 px-10">
                <AnimatePresence mode="wait">
                    {isFadeIn && (
                        <motion.div
                            key={scrolled ? 'scrolled' : 'notScrolled'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex"
                        >
                            {links.map((l) => (
                                <li className="pr-[2.5rem]" key={l.href}>
                                    <motion.div whileHover={{ scale: 1.1 }}>
                                        <Link
                                            className={`${l.href === '/' ? "font-bold rounded-xl " : ""} text-base ${scrolled ? 'text-white' : 'text-green-700'}`}
                                            href={l.href}
                                        >
                                            {l.text}
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </ul>
        </nav>

    );
};