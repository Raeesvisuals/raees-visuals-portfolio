"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import GooeyNav from "./GooeyNav";
import Magnet from "./Magnet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const initialIndex = navItems.findIndex(item => item.href === pathname);
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-primary glow-text">Raees</span>
              <span className="text-text-primary"> Visuals</span>
            </motion.div>
          </Link>

          {/* Desktop Menu with Gooey Animation */}
          <div className="hidden md:flex items-center gap-6">
            <GooeyNav
              items={navItems}
              particleCount={12}
              particleDistances={[70, 8]}
              particleR={80}
              initialActiveIndex={initialIndex >= 0 ? initialIndex : 0}
              animationTime={500}
              timeVariance={250}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
            
            
            {/* Get In Touch Button */}
            <Magnet
              magnetStrength={3}
              padding={80}
              wrapperClassName="relative"
            >
              <motion.a
                href="https://x.com/Raees_visuals"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 bg-primary/20 backdrop-blur-md border-2 border-primary rounded-lg overflow-hidden shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-primary font-semibold flex items-center gap-2">
                  Get In Touch
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                />
              </motion.a>
            </Magnet>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-text-primary hover:text-primary transition-colors p-2"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-dark/95 backdrop-blur-md border-b border-dark-lighter"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <div
                  className={`block text-lg font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-text-primary hover:text-primary"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            
            {/* Mobile Get In Touch Button */}
            <div className="pt-4 border-t border-text-primary/20">
              <a
                href="https://x.com/Raees_visuals"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-primary/20 backdrop-blur-md border-2 border-primary rounded-lg text-primary font-semibold text-center hover:bg-primary/30 transition-colors shadow-lg shadow-primary/20"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;

