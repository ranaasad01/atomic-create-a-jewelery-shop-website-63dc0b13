"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE, BRAND_EMAIL, BRAND_PHONE, BRAND_ADDRESS, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

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
  }

  function getLinkHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-[#c9a96e]/15">
      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Brand Column */}
        <motion.div variants={fadeInUp} className="lg:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <span className="font-playfair text-2xl font-bold tracking-[0.15em] text-[#c9a96e]">
              {BRAND_NAME}
            </span>
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/30 font-inter mb-5">
            {BRAND_TAGLINE}
          </p>
          <p className="text-sm text-[#f5f0e8]/50 font-inter leading-relaxed max-w-xs">
            Handcrafted fine jewelry for those who appreciate the art of timeless elegance. Each piece tells a story meant to last generations.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300"
            >
              <Twitter size={14} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300"
            >
              <Facebook size={14} />
            </a>
          </div>
        </motion.div>

        {/* Navigation Column */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-inter font-semibold text-[#c9a96e] mb-6">
            Navigate
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-inter text-[#f5f0e8]/50 hover:text-[#c9a96e] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services Column */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-inter font-semibold text-[#c9a96e] mb-6">
            Services
          </h3>
          <ul className="space-y-3">
            {[
              "Custom Commissions",
              "Ring Sizing",
              "Jewelry Cleaning",
              "Engraving",
              "Gift Wrapping",
              "Certificate of Authenticity",
            ].map((service) => (
              <li key={service}>
                <span className="text-sm font-inter text-[#f5f0e8]/50">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Column */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-inter font-semibold text-[#c9a96e] mb-6">
            Visit Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#c9a96e] mt-0.5 shrink-0" />
              <span className="text-sm font-inter text-[#f5f0e8]/50 leading-relaxed">
                {BRAND_ADDRESS}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-[#c9a96e] shrink-0" />
              <a
                href={`tel:${BRAND_PHONE}`}
                className="text-sm font-inter text-[#f5f0e8]/50 hover:text-[#c9a96e] transition-colors duration-300"
              >
                {BRAND_PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-[#c9a96e] shrink-0" />
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="text-sm font-inter text-[#f5f0e8]/50 hover:text-[#c9a96e] transition-colors duration-300"
              >
                {BRAND_EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-6 p-4 border border-[#c9a96e]/15 rounded-sm">
            <p className="text-[10px] tracking-[0.15em] uppercase font-inter text-[#f5f0e8]/30 mb-1">
              Store Hours
            </p>
            <p className="text-sm font-inter text-[#f5f0e8]/50">
              Mon–Sat: 10am – 7pm
            </p>
            <p className="text-sm font-inter text-[#f5f0e8]/50">
              Sunday: 12pm – 5pm
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-inter text-[#f5f0e8]/25 tracking-wide">
            &copy; {currentYear} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((item) => (
              <span
                key={item}
                className="text-[11px] font-inter text-[#f5f0e8]/25 hover:text-[#c9a96e]/60 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}