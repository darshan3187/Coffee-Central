import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Camera, 
  Clock, 
  Star, 
  ChevronRight, 
  Check, 
  ArrowDown,
  Mail,
  Send,
  Users,
  Award,
  Calendar
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// --- Shared Components ---

const Section = ({ children, className = "", id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const Button = ({ children, primary = false, className = "", onClick, ...props }) => (
  <motion.div
    role="button"
    tabIndex={0}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    className={`px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer select-none group relative overflow-hidden whitespace-nowrap flex-nowrap ${
      primary 
        ? "bg-accent text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]" 
        : "border border-accent/20 text-accent bg-white/5 hover:bg-accent/10 hover:border-accent/40"
    } ${className}`}
    {...props}
  >
    {primary && (
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    )}
    <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full">
      {children}
    </div>
  </motion.div>
);

const Divider = () => <div className="divider" />;

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Combos', href: '#combos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md bg-black/80 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Coffee className="text-primary-900 w-6 h-6" />
          </div>
          <span className="text-2xl font-serif font-bold text-white tracking-tight">COFFEE<span className="text-accent">CENTRAL</span></span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-accent transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <Button primary className="py-2.5 px-6">Order Now</Button>
        </div>

        {/* Mobile Toggle */}
        <div 
          role="button"
          tabIndex={0}
          className="md:hidden text-white p-2 cursor-pointer relative z-[80]" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Menu"
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#1a1311] z-[70] md:hidden shadow-2xl border-l border-white/10 flex flex-col"
          >
            <div className="p-8 pt-24 h-full flex flex-col">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif font-black text-white hover:text-accent transition-colors tracking-tight py-2 border-b border-white/5"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-12">
                <Button primary className="w-full py-5 text-lg">Order Now</Button>
              </div>

              <div className="mt-auto pb-8 flex flex-col gap-8">
                <div className="flex gap-6 text-accent justify-center">
                  <Camera size={24} />
                  <Phone size={24} />
                  <MapPin size={24} />
                </div>
                <p className="text-white/20 text-[10px] text-center uppercase tracking-[0.3em]">Coffee Central Ahmedabad</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/p/AF1QipPHipap7ETkwQx7O1Wl3uQH02BrZwiiNDgYttgI=s0" 
          alt="Coffee Central Interior"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-primary-900/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Star size={14} className="fill-accent" />
          The Finest Brew in Ahmedabad
          <Star size={14} className="fill-accent" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.95] mb-8 text-balance tracking-tighter"
        >
          Your Daily <br /><span className="text-accent italic font-serif">Escape.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed px-4 md:px-0 font-light tracking-wide"
        >
          Artisanal coffee roasted with precision, served in a space designed for quiet moments and deep conversations.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button primary onClick={() => window.location.href = '#menu'}>View Menu <ChevronRight size={18} /></Button>
          <Button onClick={() => window.location.href = '#contact'}>Find Us</Button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent/50 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { label: 'Happy Customers', value: '15k+', icon: Users },
    { label: 'Five Star Ratings', value: '4.8', icon: Star },
    { label: 'Years of Brewing', value: '5+', icon: Calendar },
    { label: 'Coffee Varieties', value: '24', icon: Coffee },
  ];

  return (
    <div className="bg-[#1c1917] border-y border-white/5 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 opacity-50 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <stat.icon className="text-accent w-8 h-8 opacity-50" />
            </div>
            <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <Section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative group">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://lh3.googleusercontent.com/p/AF1QipOeNCyB8rauWs4ME6YBX9eK3eXZfc4nlRkHuZr1=s0" 
            alt="Coffee Central Experience"
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 rounded-2xl -z-0 group-hover:top-0 group-hover:left-0 transition-all duration-500" />
        <div className="absolute -bottom-6 -right-6 bg-accent p-6 md:p-8 rounded-2xl z-20">
          <p className="text-primary-900 font-serif font-black text-3xl md:text-4xl leading-none">5+</p>
          <p className="text-primary-900/70 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">Years of<br />Excellence</p>
        </div>
      </div>

      <div className="lg:pl-10">
        <h2 className="text-accent font-bold uppercase tracking-widest text-xs md:text-sm mb-4">Our Story</h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-8 leading-tight">
          Crafting Moments, <br /><span className="text-accent">One Cup</span> at a Time.
        </h3>
        <div className="space-y-6 text-white/70 text-lg leading-relaxed">
          <p>
            Coffee Central was born out of a simple passion: to bring world-class coffee to the heart of Vastrapur. We believe that coffee is more than just a caffeine kick; it's a ritual that brings people together.
          </p>
          <p>
            Every bean we use is ethically sourced and roasted to bring out its unique profile. Whether you're here for your morning espresso or an evening latte with friends, we promise an experience that's both authentic and unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {[
            'Premium Grade Beans',
            'Expert Baristas',
            'Cozy Atmosphere',
            'Daily Fresh Roasts'
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Check size={14} />
              </div>
              <span className="text-white font-medium">{item}</span>
            </div>
          ))}
        </div>

        <Button primary className="mt-12">Learn More About Us</Button>
      </div>
    </Section>
  );
};

const Menu = () => {
  const categories = [
    { name: 'Espresso', price: '₹120+', icon: Coffee },
    { name: 'Brewed Coffee', price: '₹150+', icon: Coffee },
    { name: 'Cold Brews', price: '₹180+', icon: Clock },
    { name: 'Artisan Tea', price: '₹110+', icon: Coffee },
    { name: 'Quick Bites', price: '₹90+', icon: Award },
    { name: 'Gourmet Desserts', price: '₹160+', icon: Star },
  ];

  return (
    <Section id="menu" className="bg-[#1c1917]/50 border border-white/5 rounded-[3rem] my-20">
      <div className="text-center mb-16">
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">The Selection</h2>
        <h3 className="text-3xl md:text-5xl font-serif font-black text-white">Our Signature Menu</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-[#0c0a09] border border-white/5 p-8 rounded-3xl hover:border-accent/40 transition-all duration-500 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100%] -mr-10 -mt-10 group-hover:bg-accent/10 transition-colors" />
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
              <item.icon size={28} />
            </div>
            <h4 className="text-2xl font-serif font-bold text-white mb-2">{item.name}</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">Carefully curated selection using only the finest seasonal ingredients and expert techniques.</p>
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <span className="text-accent font-bold text-lg">Starting {item.price}</span>
              <div role="button" tabIndex={0} className="text-white/40 hover:text-white transition-colors cursor-pointer"><ChevronRight /></div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button>Download Full Menu (PDF)</Button>
      </div>
    </Section>
  );
};

const Combos = () => {
  const tiers = [
    {
      name: "Early Bird",
      price: "199",
      features: ["Standard Latte/Cappuccino", "Choice of Muffin or Croissant", "Free Wi-Fi (2 Hours)"],
      highlight: false
    },
    {
      name: "Lunch Break",
      price: "349",
      features: ["Any Cold Coffee / Tea", "Signature Paneer Wrap", "Chocolate Brownie", "Priority Seating"],
      highlight: true
    },
    {
      name: "Workaholic",
      price: "599",
      features: ["Unlimited House Brew", "Signature Sandwich", "Afternoon Pastry", "Reserved Work Zone"],
      highlight: false
    }
  ];

  return (
    <Section id="combos">
      <div className="text-center mb-16">
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Value Packs</h2>
        <h3 className="text-2xl md:text-4xl font-serif font-black text-white">Daily Combos</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: tier.highlight ? 1.05 : 1.02 }}
            className={`p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 ${
              tier.highlight 
                ? "bg-accent border-4 border-accent shadow-[0_0_50px_rgba(245,158,11,0.2)] scale-105 z-10" 
                : "bg-[#1c1917] border border-white/5"
            }`}
          >
            {tier.highlight && (
              <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full self-start mb-6">
                Most Popular
              </span>
            )}
            <h4 className={`text-2xl font-serif font-black mb-2 ${tier.highlight ? "text-black" : "text-white"}`}>{tier.name}</h4>
            <div className="flex items-baseline gap-1 mb-8">
              <span className={`text-4xl font-serif font-black ${tier.highlight ? "text-black" : "text-white"}`}>₹{tier.price}</span>
              <span className={`text-sm ${tier.highlight ? "text-black/60" : "text-white/60"}`}>/ person</span>
            </div>
            
            <div className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className={`mt-1 flex-shrink-0 ${tier.highlight ? "text-black" : "text-accent"}`}>
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <span className={`text-sm font-medium ${tier.highlight ? "text-black" : "text-white/70"}`}>{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              primary={!tier.highlight} 
              className={tier.highlight ? "bg-black text-white border-none hover:bg-zinc-900 shadow-2xl" : ""}
            >
              Grab This Offer
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Gallery = () => {
  const images = [
    "https://lh3.googleusercontent.com/p/AF1QipPHipap7ETkwQx7O1Wl3uQH02BrZwiiNDgYttgI=s0",
    "https://lh3.googleusercontent.com/p/AF1QipOeNCyB8rauWs4ME6YBX9eK3eXZfc4nlRkHuZr1=s0",
    "https://lh3.googleusercontent.com/p/AF1QipO2bNrwkzHIEs739jKpiEQX921-Mk0RwN6mpdSB=s0",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFLcGUQJKyWvjsBieIF-adeOCUc9Zr3eSFKKg9WgYNHIdbCmdHzJd6txLkvncClBPXcV5hlE9NY2VeDt1qtPO96lgefmHY_duSO6i92lH4TmxWBpWnWvv_6Zs377RZmtbOkYQy9=s0"
  ];

  return (
    <Section id="gallery">
      <div className="text-center mb-16">
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Gallery</h2>
        <h3 className="text-2xl md:text-4xl font-serif font-black text-white">Capture the Moment</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10"
          >
            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Rohan Mehta",
      text: "The best cold brew in Ahmedabad, hands down. The vibes at Coffee Central are unmatched. Perfect for working on weekends.",
      rating: 5
    },
    {
      name: "Sarah Sheikh",
      text: "Love the Hazelnut Latte! The staff is so friendly and they really know their coffee. Highly recommend the crossiants too.",
      rating: 5
    },
    {
      name: "Arjun V.",
      text: "A hidden gem in Vastrapur. Minimalist decor and great acoustics. Their pour-over is exceptional for coffee nerds.",
      rating: 5
    }
  ];

  return (
    <Section className="bg-accent/5 rounded-[3rem] my-20">
      <div className="text-center mb-16">
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Guest Reviews</h2>
        <h3 className="text-2xl md:text-4xl font-serif font-black text-white">Loved by Locals</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-primary-900/40 p-8 rounded-3xl border border-white/5"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
            </div>
            <p className="text-white/80 italic mb-6 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                {t.name[0]}
              </div>
              <span className="font-bold text-white">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
      <div>
        <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</h2>
        <h3 className="text-2xl md:text-4xl font-serif font-black text-white mb-8">Let's Connect</h3>
        
        <div className="space-y-10 mt-12">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
              <MapPin />
            </div>
            <div>
              <p className="text-white font-bold mb-2">Location</p>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                1 Celler, Shaival Complex, nr. Arbindo Society, Vastrapur, Ahmedabad, Gujarat 380054
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
              <Phone />
            </div>
            <div>
              <p className="text-white font-bold mb-2">Call Us</p>
              <a href="tel:+919429133624" className="text-accent text-xl font-bold hover:underline transition-all">+91 94291 33624</a>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
              <Clock />
            </div>
            <div>
              <p className="text-white font-bold mb-2">Opening Hours</p>
              <p className="text-white/50 text-sm">Mon - Sun: 09:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 transition-all duration-700 aspect-video lg:aspect-square lg:max-h-[300px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14303.998390948233!2d72.50835688715821!3d23.037920300000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b5d93da1cef%3A0x8e7ea60f4994bc48!2sCoffee%20Central!5e1!3m2!1sen!2sin!4v1778319768890!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-[#1c1917] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
        <h4 className="text-2xl font-serif font-bold text-white mb-8">Send us a Message</h4>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-accent transition-all" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-accent transition-all" 
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Message</label>
            <textarea 
              rows="4"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-accent transition-all resize-none" 
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <Button primary className="w-full mt-4">Send Message <Send size={18} /></Button>
        </form>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Coffee className="text-primary-900 w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight">COFFEE<span className="text-accent">CENTRAL</span></span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Your neighborhood coffee destination in Ahmedabad. Crafting the perfect cup since 2019 with love and precision.
          </p>
          <div className="flex gap-4">
            {[Camera, Phone, MapPin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary-900 hover:border-accent transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Quick Links</h5>
          <ul className="space-y-4">
            {['Home', 'About Us', 'Our Menu', 'Daily Combos', 'Locate Us'].map(link => (
              <li key={link}>
                <a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact Details</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 text-white/40">
              <MapPin size={16} className="text-accent flex-shrink-0" />
              Vastrapur, Ahmedabad
            </li>
            <li className="flex gap-3 text-white/40">
              <Phone size={16} className="text-accent flex-shrink-0" />
              +91 94291 33624
            </li>
            <li className="flex gap-3 text-white/40">
              <Mail size={16} className="text-accent flex-shrink-0" />
              hello@coffeecentral.in
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Newsletter</h5>
          <p className="text-white/40 text-sm mb-6">Subscribe for exclusive offers and new menu updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none w-full focus:border-accent"
            />
            <div 
              role="button" 
              tabIndex={0}
              className="bg-accent text-primary-900 p-2 rounded-xl hover:bg-accent-dark transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-10 text-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Coffee Central Ahmedabad. All Rights Reserved. Designed for Excellence.
        </p>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="bg-[#0c0a09] text-white font-sans scroll-smooth">
      <Navbar />
      <Hero />
      <StatsBar />
      <Divider />
      <About />
      <Divider />
      <Gallery />
      <Divider />
      <Menu />
      <Divider />
      <Combos />
      <Divider />
      <SocialProof />
      <Divider />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
