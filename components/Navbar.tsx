"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
    { href: "/sign-in", text: "Log In", primary: false },
    { href: "/sign-up", text: "Get Started", primary: true },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
                ? "bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm"
                : "bg-transparent"
        }`}>
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <Image src="/icons/logo.svg" width={28} height={28} alt="logo" />
                    <span className={`font-bold text-lg font-robo transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
                        Furever Home
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    {links.map((l) => (
                        <motion.div key={l.href} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href={l.href}
                                className={l.primary
                                    ? "bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                                    : `text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                                        scrolled
                                            ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                {l.text}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </nav>
    );
};
