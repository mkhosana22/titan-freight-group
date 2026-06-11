import React from 'react';
import { Plane, Ship, Truck, ShieldCheck, Warehouse, Users, CheckCircle, Headset, Box, Cog } from 'lucide-react';

const optimizeUnsplash = (url: string, width: number = 800) => {
  if (!url || !url.includes('unsplash.com')) return url;
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?auto=format,compress&fm=jpg&w=${width}&q=80`;
};

export const LOGO_LIGHT_URL = "images/logo.png"; // Assuming current logo is light/white
export const LOGO_DARK_URL = "images/darklogo.png"; // New dark logo version
export const LOGO_URL = LOGO_LIGHT_URL;
export const HERO_IMAGE_URL = "images/hero.webp";
export const ABOUT_IMAGE_URL = "images/about.webp";

export const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "300+", label: "Vetted Carriers" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "12k+", label: "Shipments Managed" }
];

export const SERVICES = [
  {
    title: "Road Freight",
    description: "Deep expertise in Southern African transit corridors. Specialized handling for cross-border logistics with real-time tracking.",
    bestFor: "Inter-regional trade, mining equipment, and FMCG distribution.",
    icon: <Truck className="w-10 h-10 text-logisticsOrange" />,
    image: "images/road.webp"
  },
  {
    title: "Air Freight",
    description: "Expedited global transit for high-value or time-sensitive shipments. We manage the entire chain from cargo-ready to final delivery.",
    bestFor: "Tech companies, medical supplies, and high-value electronics.",
    icon: <Plane className="w-10 h-10 text-logisticsOrange" />,
    image: "images/air.webp"
  },
  {
    title: "Sea Freight",
    description: "Full-container-load (FCL) and less-than-container-load (LCL) management across all major global trade lanes.",
    bestFor: "Industrial machinery, bulk goods, and large-scale manufacturing imports.",
    icon: <Ship className="w-10 h-10 text-logisticsOrange" />,
    image: "images/sea.webp"
  },
  {
    title: "Customs Brokerage & Compliance",
    description: "Expert compliance management to ensure seamless border crossings. We handle duty calculations and regulatory filings.",
    bestFor: "Exporters and importers needing complex regulatory clearance.",
    icon: <ShieldCheck className="w-10 h-10 text-logisticsOrange" />,
    image: optimizeUnsplash("https://images.unsplash.com/photo-1521791136064-7986c2920216", 800)
  },
  {
    title: "Warehousing & Distribution",
    description: "Strategically located facilities providing scalable storage, inventory management, and last-mile fulfillment solutions.",
    bestFor: "Retailers, wholesalers, and businesses with high inventory turnover.",
    icon: <Warehouse className="w-10 h-10 text-logisticsOrange" />,
    image: "images/warehouse.webp"
  },
  {
    title: "AI & Automation",
    description: "End-to-end logistics for oversized, heavy, or highly complex industrial equipment requiring specialized transport.",
    bestFor: "Mining operations, energy infrastructure, and construction projects.",
    icon: <Cog className="w-10 h-10 text-logisticsOrange" />,
    image: "images/ai.webp"
  }
];

export const TESTIMONIALS = [
  {
    title: "Peace of Mind!",
    quote: "Working with TFG has completely changed how we manage our logistics. We finally have peace of mind knowing every shipment is handled professionally and delivered on time.",
    author: "David Mthembu",
    position: "Supply Chain Director",
    company: "Apex Mining SA"
  },
  {
    title: "Consistency & Dependability!",
    quote: "Since partnering with TFG, delay and inconsistencies have significantly reduced. They delivery exactly hat they promise, every time.",
    author: "Sarah Jenkins",
    position: "Operations Manager",
    company: "Global Retail Brands"
  },
  {
    title: "Speed & Efficiency!",
    quote: "TFG has improved our delivery turnaround times and helped us operate more efficiently Their abilty to secure reliable capacity quickly is impressive.",
    author: "Johan Vorster",
    position: "CEO",
    company: "Lumina Manufacturing"
  },
  {
    title: "Trust & Transparency!",
    quote: "What stands out about TFG is their transparency. We always know where our freight is and what's happening - no hidden surprises.",
    author: "Leslie Alexander",
    position: "Logistics Lead",
    company: "AfriCorp Retail"
  },
  {
    title: "Long-Term Partnership!",
    quote: "TFG is not just a service provider - they are a trusted parter. We lookforward to a long-term relationship with their team.",
    author: "Jenny Wilson",
    position: "Fleet Manager",
    company: "EcoFresh Produce"
  },
  {
    title: "Scalable Solutions!",
    quote: "As our business grew, TFG scaledwith us. Whether it's small loads or high-volume shipments, they always secure the right capacity at the right time.",
    author: "Robert Fox",
    position: "CFO",
    company: "Southern Tech Hub"
  },
  {
    title: "Strategic Logistics Partner!",
    quote: "TFG is more than a broker - they are a strategic logistics partner. They bring structure, visibility, reliable carriers and complete coordination into one service.",
    author: "Michael Chen",
    position: "VP of Logistics",
    company: "TechNexus Global"
  },
  {
    title: "Problem Resolution!",
    quote: "Whenever challenges arise, TFG acts immediately. They coordinate with carriers, resolve issues, and ensure deliveries stay on track - we don't have to get involved.",
    author: "Thabo Molefe",
    position: "Operations Director",
    company: "Zonke Distribution"
  }
];

export const FAQS = [
  {
    question: "What service does Titan Freight Group provide?",
    answer: "TFG offers end-to-end freight solutions, inclunding road, air and sea freight, customs brokerage and warehousing.We manage the full logistics process from pickup to final delivery."
  },
  {
    question: "How do you ensure reliability?",
    answer: "We work with a vetted network of trusted carriersand actively manage every shipment. Our team monitors progress, communicates proactively and resolves issues before they impact delivey."
  },
  {
    question: "What industries do you serve?",
    answer: "We support a wide renge of industries, including FMCG, Manufacturing, Constraction, Retail and Import/export businesses that require consistent and reliable freight movement."
  },
  {
    question: "Do you offer real-time tracking?",
    answer: "Yes. We provide real-time updates and proactive communication so you always knowthe status of your shipment without needing to follow up."
  },
  {
    question: "What if my goods are lost or damaged?",
    answer: "We only workwith insured and vetted carriers, and every shipment is coordinated carefully. In tha rare event of an issues, we take full responsibility for managing resolution and claims."
  },
  {
    question: "What makes Titan diffrent from other logistics providers?",
    answer: "We focus on control and accountability. Instead of just booking transport, we actively manage every shipmentensuring consistent communication, problem-solving and reliable form start to finish."
  }
];

export const TRUST_BADGES = [
  { label: "Insured & Compliant", icon: <ShieldCheck className="w-5 h-5 text-logisticsOrange" /> },
  { label: "Vetted Carriers", icon: <Users className="w-5 h-5 text-logisticsOrange" /> },
  { label: "On-Time Delivery", icon: <CheckCircle className="w-5 h-5 text-logisticsOrange" /> },
  { label: "24/7 Support", icon: <Headset className="w-5 h-5 text-logisticsOrange" /> }
];

export const BLOG_POSTS = [
  {
    title: "The State of Freight & Logistics in South Africa (2026): Trends Every Business Must Know",
    excerpt: "South Africa’s logistics industry is changing fast - and most businesses are already falling behind. Delays, rising costs, and unpredictable supply chains are no longer temporary problems - they’re the new reality...",
    date: "April 8, 2026",
    image: optimizeUnsplash("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d", 800)
  },
  {
    title: "Top 7 Logistics Challenges in South Africa (And How to Solve Them in 2026)",
    excerpt: "Late deliveries. Poor communication. No visibility. Sound familiar? These are the exact logistics problems costing South African businesses time, money, and customers every single day...",
    date: "March 28, 2026",
    image: optimizeUnsplash("https://images.unsplash.com/photo-1506784983877-45594efa4cbe", 800)
  },
  {
    title: "How to Choose the Right Logistics Partner in South Africa (2026 Guide)",
    excerpt: "Choosing the wrong logistics partner can quietly destroy your business - missed deliveries, poor communication, and zero accountability...",
    date: "April 2, 2026",
    image: optimizeUnsplash("https://images.unsplash.com/photo-1454165205744-3b78555e5572", 800)
  }
];
