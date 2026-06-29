"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { navLinks, navCTA, BRAND_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  }

  function getLinkHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#c9a96e]/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            aria-label={BRAND_NAME}
          >
            <span className="font-playfair text-2xl font-bold tracking-[0.15em] text-[#c9a96e] group-hover:text-[#e0c48a] transition-colors duration-300">
              {BRAND_NAME}
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/40 font-inter mt-0.5">
              Fine Jewelry
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-[11px] tracking-[0.2em] uppercase font-inter text-[#f5f0e8]/70 hover:text-[#c9a96e] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a96e] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              aria-label="Wishlist"
              className="text-[#f5f0e8]/60 hover:text-[#c9a96e] transition-colors duration-300"
            >
              <Heart size={18} />
            </button>
            <button
              aria-label="Shopping bag"
              className="text-[#f5f0e8]/60 hover:text-[#c9a96e] transition-colors duration-300"
            >
              <ShoppingBag size={18} />
            </button>
            <Link
              href={getLinkHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="ml-2 px-5 py-2 text-[10px] tracking-[0.25em] uppercase font-inter font-medium bg-[#c9a96e] text-[#0f0f0f] hover:bg-[#e0c48a] transition-all duration-300 rounded-sm"
            >
              {navCTA.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              aria-label="Shopping bag"
              className="text-[#f5f0e8]/60 hover:text-[#c9a96e] transition-colors duration-300"
            >
              <ShoppingBag size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-300"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0f0f0f] flex flex-col pt-24 px-8 pb-12"
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-playfair text-3xl text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-300 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto border-t border-[#c9a96e]/20 pt-8">
              <Link
                href={getLinkHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="block w-full text-center py-4 text-[11px] tracking-[0.3em] uppercase font-inter font-medium bg-[#c9a96e] text-[#0f0f0f] hover:bg-[#e0c48a] transition-all duration-300 rounded-sm"
              >
                {navCTA.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}