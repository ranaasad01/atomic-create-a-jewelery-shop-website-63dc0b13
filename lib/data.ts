export const BRAND_NAME = "Aurum";
export const BRAND_TAGLINE = "Crafted for Eternity";
export const BRAND_EMAIL = "hello@aurumjewels.com";
export const BRAND_PHONE = "+1 (212) 555-0194";
export const BRAND_ADDRESS = "14 West 47th Street, New York, NY 10036";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#collections",
};

export type ProductCategory = "rings" | "necklaces" | "earrings" | "bracelets";
export type ProductMaterial = "gold" | "platinum" | "rose-gold" | "silver";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  material: ProductMaterial;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}