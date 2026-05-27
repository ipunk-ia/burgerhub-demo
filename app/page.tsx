"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Menu, X, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

// --- Components ---

const HalalBadge = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center gap-1 bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-0.5 rounded-full ${className}`}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <span className="text-[#22c55e] font-mono text-[10px] tracking-widest font-bold uppercase">Halal</span>
  </div>
);

// --- Data ---
const FAN_FAVORITES = [
  { name: "The OG Smash", desc: "Classic smash patty, American cheese, pickles, OG sauce", price: "$8.99" },
  { name: "Double Trouble", desc: "Double smash, double cheese, caramelized onions, jalapeños", price: "$11.99" },
  { name: "The Toledo Stack", desc: "Triple smash, halal bacon, lettuce, tomato, special sauce", price: "$13.99" },
];

const FULL_MENU = {
  Burgers: [
    { name: "The OG Smash", desc: "Classic smash patty, American cheese, pickles, OG sauce", price: "$8.99" },
    { name: "Double Trouble", desc: "Double smash, double cheese, caramelized onions, jalapeños", price: "$11.99" },
    { name: "The Toledo Stack", desc: "Triple smash, halal bacon, lettuce, tomato, special sauce", price: "$13.99" },
    { name: "Mushroom Melt", desc: "Smash patty, Swiss cheese, sautéed mushrooms, garlic aioli", price: "$10.99" },
    { name: "Spicy Bird", desc: "Crispy halal chicken, Nashville hot sauce, coleslaw, pickles", price: "$10.49" },
  ],
  Sides: [
    { name: "Hub Fries", desc: "Seasoned crinkle-cut fries", price: "$3.49" },
    { name: "Cheese Fries", desc: "Hub Fries + melted cheese sauce", price: "$4.49" },
    { name: "Onion Rings", desc: "Beer-battered, golden crisp", price: "$3.99" },
    { name: "Mac Bites", desc: "Crispy mac & cheese bites (4 pcs)", price: "$4.99" },
  ],
  Drinks: [
    { name: "Fountain Drinks", desc: "Coke, Sprite, Fanta, Lemonade", price: "$1.99" },
    { name: "Milkshakes", desc: "Vanilla, Chocolate, Strawberry, Salted Caramel", price: "$5.99" },
    { name: "Fresh Lemonade", desc: "House-made, refillable", price: "$2.99" },
  ],
  Combos: [
    { name: "Smash Combo", desc: "Any burger + Hub Fries + Fountain Drink", price: "$12.99" },
    { name: "Double Combo", desc: "Double Trouble + Cheese Fries + Shake", price: "$17.99" },
  ],
};

const NAV_LINKS = [
  { name: "Favorites", href: "#favorites" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Location", href: "#location" },
];

export default function BurgerHub() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof FULL_MENU>("Burgers");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white pb-20 md:pb-0">
      
      {/* 1. NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled ? "bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2A2A2A]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-brand-primary" strokeWidth={2.5} />
            <span className="font-heading text-3xl tracking-wide pt-1">BURGER HUB</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-muted hover:text-brand-primary transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <a
              href="#order"
              className="bg-brand-primary text-white font-mono text-sm tracking-widest font-bold uppercase px-6 py-3 rounded-sm hover:bg-[#ff5500] hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
            >
              Order Now
            </a>
          </div>

          <button
            className="md:hidden p-2 text-brand-body"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-brand-surface border-l border-[#2A2A2A] z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-brand-muted hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-4xl tracking-wide text-brand-body hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                <a
                  href="#order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-brand-primary text-white font-mono text-sm tracking-widest font-bold uppercase px-6 py-4 rounded-sm"
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* 2. HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] blur-3xl animate-pulse-slow">
              <circle cx="100" cy="100" r="80" fill="#FF6B2C" />
            </svg>
          </div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0F0F0F] to-transparent z-10" />

          <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.85] mb-6 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-br from-white to-brand-muted">
                SMASH. STACK.<br />
                <span className="text-brand-primary">DEVOUR.</span>
              </h1>
              <p className="text-brand-muted text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-10">
                Halal smash burgers, hand-pressed daily.<br />
                Secor Road, Toledo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#order"
                  className="w-full sm:w-auto bg-brand-primary text-white font-mono text-sm tracking-widest font-bold uppercase px-8 py-4 rounded-sm hover:bg-[#ff5500] hover:shadow-[0_0_30px_rgba(255,107,44,0.5)] transition-all transform hover:-translate-y-1"
                >
                  Order Now
                </a>
                <a
                  href="#menu"
                  className="w-full sm:w-auto bg-transparent border-2 border-brand-body/20 text-brand-body font-mono text-sm tracking-widest font-bold uppercase px-8 py-4 rounded-sm hover:border-brand-primary hover:text-brand-primary transition-all"
                >
                  See Menu
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. FEATURED / BESTSELLERS */}
        <section id="favorites" className="py-24 relative bg-brand-surface border-y border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-5xl md:text-6xl tracking-wide">FAN FAVORITES</h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FAN_FAVORITES.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-sm p-8 group hover:-translate-y-2 hover:border-brand-primary/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-heading text-3xl tracking-wide group-hover:text-brand-primary transition-colors">{item.name}</h3>
                      <span className="font-mono text-brand-accent font-bold text-lg">{item.price}</span>
                    </div>
                    <p className="text-brand-muted mb-6 flex-grow">{item.desc}</p>
                    <HalalBadge />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FULL MENU */}
        <section id="menu" className="py-24 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-5xl md:text-6xl tracking-wide mb-8">THE MENU</h2>
              
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 font-mono uppercase tracking-widest text-xs sm:text-sm font-bold border-b border-[#2A2A2A] pb-4">
                {(Object.keys(FULL_MENU) as Array<keyof typeof FULL_MENU>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 relative transition-colors ${
                      activeTab === tab ? "text-brand-primary" : "text-brand-muted hover:text-white"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-brand-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Menu List */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                >
                  {FULL_MENU[activeTab].map((item, i) => (
                    <div key={i} className="flex flex-col border-b border-[#2A2A2A]/50 pb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-heading text-2xl tracking-wide">{item.name}</h4>
                        <span className="font-mono text-brand-body border-b border-dotted border-brand-muted/50 flex-grow mx-4 opacity-50" />
                        <span className="font-mono text-brand-accent font-bold">{item.price}</span>
                      </div>
                      <div className="flex justify-between items-end gap-4">
                        <p className="text-brand-muted text-sm sm:text-base">{item.desc}</p>
                        <HalalBadge className="shrink-0" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 5. ABOUT */}
        <section id="about" className="py-24 bg-brand-surface relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-5xl sm:text-7xl tracking-wide mb-8 leading-none">
                  BORN <span className="text-brand-primary">HALAL</span>.<br />
                  BUILT <span className="text-brand-accent">DIFFERENT</span>.
                </h2>
                <div className="space-y-6 text-brand-muted text-lg">
                  <p>
                    Burger Hub isn&apos;t just another burger joint. We are the answer to a simple question: why should halal mean compromising on the authentic, greasy, street-food burger experience?
                  </p>
                  <p>
                    We hand-press every patty to ensure those crispy, caramelized edges. Our ingredients are sourced fresh daily, our sauces are made in-house, and our commitment to 100% Zabiha Halal meat is uncompromising.
                  </p>
                  <p>
                    Come hungry, leave messy. That&apos;s the Hub way.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] lg:h-[600px] bg-[#0F0F0F] rounded-sm flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-80" />
                <Image
                  src="https://i.pinimg.com/736x/4c/c6/9d/4cc69d448876b15433276af21d60c920.jpg"
                  alt="Delicious Halal Smash Burger"
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                  <span className="font-heading text-6xl md:text-8xl text-white opacity-90 drop-shadow-xl select-none leading-none">
                    100%<br/>HALAL
                  </span>
                  <div className="hidden sm:block">
                    <HalalBadge className="!border-white/20 !bg-black/50 backdrop-blur-md !px-4 !py-2 shrink-0 scale-125 origin-bottom-right" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. LOCATION & HOURS */}
        <section id="location" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-5xl md:text-6xl tracking-wide">LOCATION & HOURS</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-surface border border-[#2A2A2A] rounded-sm p-8 sm:p-12 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-8">
                    <MapPin className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-mono text-xl text-white mb-2 uppercase tracking-wide">Visit Us</h3>
                      <p className="text-brand-muted text-lg">1234 Secor Road<br />Toledo, OH 43606</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-10">
                    <Phone className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-mono text-xl text-white mb-2 uppercase tracking-wide">Call In</h3>
                      <p className="text-brand-muted text-lg">(555) 019-8642</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-10">
                    <Clock className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                    <div className="w-full">
                      <h3 className="font-mono text-xl text-white mb-4 uppercase tracking-wide">Hours</h3>
                      <table className="w-full text-brand-muted text-lg font-mono text-sm max-w-[300px]">
                        <tbody>
                          <tr><td className="py-1">Mon - Thu</td><td className="text-right text-white">11:00 AM - 10:00 PM</td></tr>
                          <tr><td className="py-1">Fri - Sat</td><td className="text-right text-white">11:00 AM - 11:00 PM</td></tr>
                          <tr><td className="py-1">Sunday</td><td className="text-right text-white">11:00 AM - 9:00 PM</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Secor+Road+Toledo+OH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-mono text-sm tracking-widest font-bold uppercase px-8 py-4 rounded-sm transition-all"
                >
                  Get Directions
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] border-t-0 lg:border-t lg:border-l-0 min-h-[400px] relative rounded-sm overflow-hidden"
              >
                {/* Embed Google Maps placeholder or iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.612030997573!2d-83.6186358!3d41.6601423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883c7fa69cd71ce1%3A0x6bba847c1b4b9b94!2sSecor%20Rd%2C%20Toledo%2C%20OH!5e0!3m2!1sen!2sus!4v1701389271630!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Burger Hub Location Map"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-brand-primary" strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="font-heading text-3xl tracking-wide leading-none">BURGER HUB</span>
                <span className="font-mono text-brand-primary text-[10px] tracking-widest uppercase font-bold mt-1">Halal. Fresh. Always.</span>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 font-mono text-sm tracking-widest uppercase text-brand-muted">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} className="hover:text-brand-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex gap-4">
              <a href="#" className="p-2 bg-[#1A1A1A] rounded-full text-brand-muted hover:text-white hover:bg-brand-primary transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-[#1A1A1A] rounded-full text-brand-muted hover:text-white hover:bg-brand-primary transition-all" aria-label="TikTok">
               {/* TikTok icon via SVG since Lucide might not have it or we use Twitter as placeholder */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#1A1A1A] rounded-full text-brand-muted hover:text-white hover:bg-brand-primary transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-muted/50">
            <p>&copy; {new Date().getFullYear()} Burger Hub. All rights reserved.</p>
            <p>Toledo, Ohio</p>
          </div>
        </div>
      </footer>

      {/* 7. STICKY ORDER CTA (MOBILE) */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-40 md:hidden flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto w-full flex items-center gap-4 bg-brand-surface border border-[#2A2A2A] rounded-sm p-3 shadow-2xl">
          <span className="font-heading text-xl tracking-wide flex-grow pl-2">Ready to Order?</span>
          <a
            href="#order"
            className="bg-brand-primary text-white font-mono text-xs tracking-widest font-bold uppercase px-6 py-3 rounded-sm whitespace-nowrap active:scale-95 transition-transform"
          >
            Order Now
          </a>
        </div>
      </div>

    </div>
  );
}
