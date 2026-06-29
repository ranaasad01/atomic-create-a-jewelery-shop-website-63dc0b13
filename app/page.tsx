"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star, ArrowRight, Shield, Truck, RefreshCw, Award, ChevronDown, Heart, Mail, Phone, MapPin } from 'lucide-react';
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_EMAIL,
  BRAND_PHONE,
  BRAND_ADDRESS,
  type Product,
  type ProductCategory,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const featuredProducts: Product[] = [
  {
    id: "p1",
    name: "Celestial Solitaire Ring",
    category: "rings",
    material: "platinum",
    price: 4800,
    image: "https://www.swankmetalsmithing.com/cdn/shop/files/il_fullxfull.3689867537_at3o_e0a57a10-f6a7-46cc-a161-9e02bfe364d9_1445x.jpg?v=1690307925",
    description:
      "A breathtaking 1.2ct round brilliant diamond set in hand-polished platinum. Timeless in form, extraordinary in presence.",
    featured: true,
  },
  {
    id: "p2",
    name: "Lumière Drop Earrings",
    category: "earrings",
    material: "gold",
    price: 1950,
    image: "https://lionheartjewelry.com/cdn/shop/files/lionheart-lumiere-jumbo-diamond-star-dangle-earrings.jpg?crop=center&height=2500&v=1765918538&width=2500",
    description:
      "Cascading 18k yellow gold with pavé-set diamonds that catch every light. Designed for evenings that deserve to be remembered.",
    featured: true,
  },
  {
    id: "p3",
    name: "Eternal Blossom Necklace",
    category: "necklaces",
    material: "rose-gold",
    price: 3200,
    image: "https://misahara.com/cdn/shop/files/2023-06-0816-33-53.jpg?v=1690492168&width=4000",
    description:
      "A delicate rose gold pendant inspired by the first bloom of spring. Set with 0.45ct of ethically sourced diamonds.",
    featured: true,
  },
  {
    id: "p4",
    name: "Rivière Tennis Bracelet",
    category: "bracelets",
    material: "gold",
    price: 6400,
    image: "https://www.shopdorsey.com/cdn/shop/files/JAMESBRACELETSILVER_2_a15a3e5d-e4d1-4d3a-9796-76521dbad072_1200x.jpg?v=1758694245",
    description:
      "Forty perfectly matched diamonds set in 18k gold, flowing seamlessly around the wrist. The definition of understated luxury.",
    featured: true,
  },
  {
    id: "p5",
    name: "Midnight Sapphire Ring",
    category: "rings",
    material: "platinum",
    price: 5600,
    image: "https://www.lakaiser.com/cdn/shop/products/midnightbluesapphirering_2000x.jpg?v=1613679371",
    description:
      "A vivid Ceylon sapphire embraced by a halo of brilliant-cut diamonds in platinum. Bold, rare, and utterly captivating.",
  },
  {
    id: "p6",
    name: "Dew Drop Pearl Earrings",
    category: "earrings",
    material: "silver",
    price: 890,
    image: "http://studio-bride.com/cdn/shop/files/pearl-dewdrop-earrings-studio-bride-jewelry.png?v=1745522045&width=2048",
    description:
      "South Sea pearls suspended from sterling silver with a diamond accent. Effortlessly elegant for any occasion.",
  },
];

const categories: { id: ProductCategory; label: string; image: string; count: number }[] = [
  { id: "rings", label: "Rings", image: "https://cdn.shopify.com/s/files/1/0881/9851/2950/files/SO_Lo-355_1.jpg?v=1750714500", count: 48 },
  { id: "necklaces", label: "Necklaces", image: "https://cdn.shopify.com/s/files/1/0881/9851/2950/files/SO_Lo-355_1.jpg?v=1750714500", count: 36 },
  { id: "earrings", label: "Earrings", image: "https://cdn.shopify.com/s/files/1/0881/9851/2950/files/SO_Lo-355_1.jpg?v=1750714500", count: 52 },
  { id: "bracelets", label: "Bracelets", image: "https://www.baublebar.com/cdn/shop/files/64317_G_01.jpg?v=1746637318&width=800", count: 29 },
];

const testimonials = [
  {
    id: "t1",
    name: "Sophia Harrington",
    location: "New York, NY",
    rating: 5,
    text: "The Celestial Solitaire Ring exceeded every expectation. The craftsmanship is extraordinary and the service was impeccable from first consultation to delivery.",
    product: "Celestial Solitaire Ring",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFjkZJc6VNnKw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713204488458?e=2147483647&v=beta&t=eCaDcFnWenFH_uDsZh546fNfzrjYxxlWFFhpcS6DY6M",
  },
  {
    id: "t2",
    name: "Claire Beaumont",
    location: "San Francisco, CA",
    rating: 5,
    text: "I wore the Lumière earrings to my wedding and received more compliments on them than anything else. Aurum has a customer for life.",
    product: "Lumière Drop Earrings",
    avatar: "https://www.evergreen.edu/sites/default/files/styles/hero_image_right/public/Claire%2520Beaumont%2520Portrait.jpg.webp?itok=6Fzbagsd",
  },
  {
    id: "t3",
    name: "Natalie Voss",
    location: "Chicago, IL",
    rating: 5,
    text: "The Eternal Blossom Necklace is exactly as described — delicate, luminous, and absolutely stunning. Packaging was a gift in itself.",
    product: "Eternal Blossom Necklace",
    avatar: "https://images.squarespace-cdn.com/content/v1/5689fc6325981d3d9138183d/1486514375442-77FSK13RR3ZW3FQX7U64/eclipse_17_natalievoss01a_hr.jpg",
  },
];

const values = [
  {
    icon: Shield,
    title: "Certified Authenticity",
    description:
      "Every stone is independently graded and certified. You receive a full provenance report with each purchase.",
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    description:
      "Our artisans bring decades of expertise to each piece, working in our New York atelier with old-world precision.",
  },
  {
    icon: Truck,
    title: "Complimentary Delivery",
    description:
      "Insured, signature-required delivery on every order. Your jewelry arrives in our signature presentation box.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description:
      "If your piece is not perfect, return it within 30 days for a full refund or exchange. No questions asked.",
  },
];

const materialLabels: Record<string, string> = {
  gold: "18k Gold",
  platinum: "Platinum",
  "rose-gold": "Rose Gold",
  silver: "Sterling Silver",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);
  const shouldReduce = useReducedMotion();

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut", delay: index * 0.08 },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover={shouldReduce ? {} : { y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-[#111] border border-[#c9a96e]/10 rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.3),0_12px_32px_-8px_rgba(0,0,0,0.5)] hover:border-[#c9a96e]/30 hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_20px_48px_-8px_rgba(201,169,110,0.12)] transition-all duration-400"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />

        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0f0f0f]/70 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-[#c9a96e]/50"
        >
          <Heart
            size={15}
            className={wished ? "fill-[#c9a96e] text-[#c9a96e]" : "text-white/60"}
          />
        </button>

        {/* Material badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] tracking-[0.25em] uppercase font-inter bg-[#c9a96e]/90 text-[#0f0f0f] px-2.5 py-1 rounded-full font-semibold">
            {materialLabels[product.material] ?? product.material}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-playfair text-lg text-[#f5f0e8] leading-snug mb-1 group-hover:text-[#c9a96e] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs text-[#f5f0e8]/45 font-inter leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-playfair text-xl text-[#c9a96e]">
            ${(product.price ?? 0).toLocaleString()}
          </span>
          <motion.button
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            className="text-[10px] tracking-[0.2em] uppercase font-inter font-medium px-4 py-2 border border-[#c9a96e]/40 text-[#c9a96e] rounded-full hover:bg-[#c9a96e] hover:text-[#0f0f0f] transition-all duration-300"
          >
            Add to Bag
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "fill-[#c9a96e] text-[#c9a96e]" : "text-[#c9a96e]/20"}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeCategory);

  function handleContactChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="bg-[#0f0f0f] text-[#f5f0e8] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://shop-aurum.com/cdn/shop/files/AURUM-9x16-46.jpg?v=1769743361&width=3840"
            alt="Aurum fine jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/70 via-[#0f0f0f]/50 to-[#0f0f0f]" />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(201,169,110,0.08),transparent)]" />
        </div>

        {/* Content — asymmetric left-aligned layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={shouldReduce ? fadeIn : slideInLeft}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-6"
            >
              New York Fine Jewelry Since 1987
            </motion.p>

            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance mb-8">
              Where Every{" "}
              <span className="italic text-[#c9a96e]">Moment</span>
              <br />
              Becomes
              <br />
              Eternal
            </h1>

            <p className="font-inter text-base text-[#f5f0e8]/60 leading-relaxed max-w-md mb-10 text-pretty">
              Handcrafted in our Manhattan atelier, each Aurum piece is a
              conversation between light and metal. Jewelry made to be worn,
              loved, and passed down.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#collections"
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c9a96e] text-[#0f0f0f] text-[11px] tracking-[0.25em] uppercase font-inter font-semibold rounded-full hover:bg-[#e0c48a] transition-all duration-300 shadow-[0_0_24px_rgba(201,169,110,0.3)]"
              >
                Explore Collections
                <ArrowRight size={14} />
              </motion.a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-inter text-[#f5f0e8]/60 hover:text-[#c9a96e] transition-colors duration-300"
              >
                Our Story
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Hero product card */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.12),transparent_70%)] rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#c9a96e]/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <img
                  src="https://www.swankmetalsmithing.com/cdn/shop/files/il_fullxfull.3689867537_at3o_e0a57a10-f6a7-46cc-a161-9e02bfe364d9_1445x.jpg?v=1690307925"
                  alt="Celestial Solitaire Ring"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] font-inter mb-1">
                    Featured Piece
                  </p>
                  <h2 className="font-playfair text-xl text-[#f5f0e8] mb-1">
                    Celestial Solitaire Ring
                  </h2>
                  <p className="font-playfair text-[#c9a96e] text-lg">$4,800</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-inter text-[#f5f0e8]/30">
            Scroll
          </span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-[#c9a96e]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-y border-[#c9a96e]/10 bg-[#0a0a0a]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "37+", label: "Years of Craft" },
            { value: "12,000+", label: "Pieces Created" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4", label: "Global Awards" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <p className="font-playfair text-3xl md:text-4xl text-[#c9a96e] mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-inter text-[#f5f0e8]/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── COLLECTIONS ──────────────────────────────────────────────────── */}
      <section id="collections" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-3">
                Our Collections
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Jewelry for Every Chapter
              </h2>
            </div>
            <p className="font-inter text-sm text-[#f5f0e8]/50 leading-relaxed max-w-sm text-pretty">
              From engagement rings to everyday elegance, each collection is
              designed with intention and finished with care.
            </p>
          </motion.div>

          {/* Category grid — asymmetric bento */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                onClick={() =>
                  setActiveCategory((prev) =>
                    prev === cat.id ? "all" : cat.id
                  )
                }
                className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                  i === 0
                    ? "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-[2/1]"
                    : "aspect-square"
                } ${
                  activeCategory === cat.id
                    ? "border-[#c9a96e] shadow-[0_0_20px_rgba(201,169,110,0.2)]"
                    : "border-[#c9a96e]/10 hover:border-[#c9a96e]/30"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-playfair text-lg md:text-xl text-[#f5f0e8] leading-none mb-0.5">
                    {cat.label}
                  </p>
                  <p className="text-[9px] tracking-[0.25em] uppercase font-inter text-[#c9a96e]">
                    {cat.count} pieces
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(["all", "rings", "necklaces", "earrings", "bracelets"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.2em] uppercase font-inter px-4 py-2 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#c9a96e] text-[#0f0f0f] border-[#c9a96e] font-semibold"
                      : "border-[#c9a96e]/20 text-[#f5f0e8]/50 hover:border-[#c9a96e]/50 hover:text-[#c9a96e]"
                  }`}
                >
                  {cat === "all" ? "All Pieces" : cat}
                </button>
              )
            )}
          </div>

          {/* Product grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(filteredProducts ?? []).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / STORY ────────────────────────────────────────────────── */}
      <section id="about" className="py-28 md:py-36 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images — stacked offset */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-[#c9a96e]/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                <img
                  src="https://images.ctfassets.net/lzny33ho1g45/master-your-work-p-img/6f2eb46198210e9cc85cc6246a76c345/file.png"
                  alt="Aurum atelier craftsman at work"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-6 w-2/3 rounded-2xl overflow-hidden border border-[#c9a96e]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20">
                <img
                  src="https://kntjewelry.com/cdn/shop/files/The-anatomy-of-a-prong-ring-setting.png?v=1740538943"
                  alt="Diamond setting detail"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-[radial-gradient(circle,rgba(201,169,110,0.1),transparent_70%)] rounded-full" />
            </motion.div>

            {/* Text */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:pl-8"
            >
              <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-4">
                Our Story
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                Crafted in Manhattan. Worn Around the World.
              </h2>
              <p className="font-inter text-sm text-[#f5f0e8]/55 leading-relaxed mb-5 text-pretty">
                Aurum was founded in 1987 by master goldsmith Elias Voss on West
                47th Street, in the heart of New York's Diamond District. What
                began as a single-bench workshop has grown into one of the most
                respected names in American fine jewelry.
              </p>
              <p className="font-inter text-sm text-[#f5f0e8]/55 leading-relaxed mb-10 text-pretty">
                Every piece is still made by hand in our Manhattan atelier. We
                source only conflict-free diamonds and ethically mined gemstones,
                working with suppliers who share our commitment to transparency
                and craft. When you wear Aurum, you carry a piece of that
                dedication with you.
              </p>

              {/* Values list */}
              <div className="space-y-4">
                {[
                  "Conflict-free diamonds, certified by the Kimberley Process",
                  "Recycled precious metals across all collections",
                  "Lifetime resizing and cleaning on every ring",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                    </div>
                    <p className="text-sm font-inter text-[#f5f0e8]/60 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-y border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-3">
              The Aurum Promise
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight">
              Why Discerning Clients Choose Us
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-7 rounded-2xl bg-[#111] border border-[#c9a96e]/10 hover:border-[#c9a96e]/25 shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(201,169,110,0.08)] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#c9a96e]" />
                  </div>
                  <h3 className="font-playfair text-lg text-[#f5f0e8] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm font-inter text-[#f5f0e8]/45 leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 md:py-36 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-3">
              Client Stories
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Worn with Love. Remembered Forever.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={shouldReduce ? {} : { y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`p-8 rounded-2xl border border-[#c9a96e]/10 hover:border-[#c9a96e]/25 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${
                  i === 1
                    ? "bg-[#c9a96e]/5 border-[#c9a96e]/20"
                    : "bg-[#111]"
                }`}
              >
                <StarRating count={t.rating} />
                <p className="font-inter text-sm text-[#f5f0e8]/65 leading-relaxed mt-5 mb-6 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#c9a96e]/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c9a96e]/20 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-inter text-sm font-medium text-[#f5f0e8]">
                      {t.name}
                    </p>
                    <p className="text-[10px] tracking-[0.15em] font-inter text-[#c9a96e]/70">
                      {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FULL-BLEED CTA BANNER ─────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://shop-aurum.com/cdn/shop/files/AURUM-9x16-46.jpg?v=1769743361&width=3840"
            alt="Aurum jewelry collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0f0f0f]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,169,110,0.1),transparent)]" />
        </div>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-4">
            Bespoke Service
          </p>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Commission Your Perfect Piece
          </h2>
          <p className="font-inter text-base text-[#f5f0e8]/60 leading-relaxed mb-10 text-pretty">
            Work directly with our master jewelers to create something entirely
            your own. From concept sketch to finished piece, we guide you through
            every step of the bespoke process.
          </p>
          <motion.a
            href="#contact"
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a96e] text-[#0f0f0f] text-[11px] tracking-[0.25em] uppercase font-inter font-semibold rounded-full hover:bg-[#e0c48a] transition-all duration-300 shadow-[0_0_32px_rgba(201,169,110,0.35)]"
          >
            Begin Your Commission
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 md:py-36 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase font-inter text-[#c9a96e] mb-4">
                Get in Touch
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                We Would Love to Hear From You
              </h2>
              <p className="font-inter text-sm text-[#f5f0e8]/55 leading-relaxed mb-12 text-pretty">
                Whether you have a question about a piece, want to book a private
                viewing, or are ready to begin a bespoke commission, our team is
                here to help.
              </p>

              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: "Visit Us", value: BRAND_ADDRESS },
                  { Icon: Phone, label: "Call Us", value: BRAND_PHONE },
                  { Icon: Mail, label: "Email Us", value: BRAND_EMAIL },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#c9a96e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-inter text-[#c9a96e]/70 mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-inter text-[#f5f0e8]/70">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-[#111] border border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.25em] uppercase font-inter text-[#c9a96e] mb-2">
                  Atelier Hours
                </p>
                <div className="space-y-1.5">
                  {[
                    { day: "Monday to Friday", hours: "10:00 am to 6:00 pm" },
                    { day: "Saturday", hours: "11:00 am to 5:00 pm" },
                    { day: "Sunday", hours: "By appointment only" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-sm font-inter">
                      <span className="text-[#f5f0e8]/50">{day}</span>
                      <span className="text-[#f5f0e8]/80">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <form
                onSubmit={handleContactSubmit}
                className="p-8 md:p-10 rounded-2xl bg-[#111] border border-[#c9a96e]/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              >
                <h3 className="font-playfair text-2xl text-[#f5f0e8] mb-8">
                  Send a Message
                </h3>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] tracking-[0.2em] uppercase font-inter text-[#c9a96e]/70 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your name"
                      className="w-full bg-[#0f0f0f] border border-[#c9a96e]/15 rounded-xl px-4 py-3 text-sm font-inter text-[#f5f0e8] placeholder-[#f5f0e8]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] tracking-[0.2em] uppercase font-inter text-[#c9a96e]/70 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="your@email.com"
                      className="w-full bg-[#0f0f0f] border border-[#c9a96e]/15 rounded-xl px-4 py-3 text-sm font-inter text-[#f5f0e8] placeholder-[#f5f0e8]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[10px] tracking-[0.2em] uppercase font-inter text-[#c9a96e]/70 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us about the piece you have in mind, or ask us anything..."
                      className="w-full bg-[#0f0f0f] border border-[#c9a96e]/15 rounded-xl px-4 py-3 text-sm font-inter text-[#f5f0e8] placeholder-[#f5f0e8]/25 focus:outline-none focus:border-[#c9a96e]/50 focus:ring-1 focus:ring-[#c9a96e]/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={shouldReduce ? {} : { scale: 1.02 }}
                    whileTap={shouldReduce ? {} : { scale: 0.98 }}
                    className="w-full py-3.5 bg-[#c9a96e] text-[#0f0f0f] text-[11px] tracking-[0.25em] uppercase font-inter font-semibold rounded-full hover:bg-[#e0c48a] transition-all duration-300 shadow-[0_0_20px_rgba(201,169,110,0.2)]"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}