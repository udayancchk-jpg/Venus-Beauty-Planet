import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Clock, Star, Users, Shield, Sparkles, Award, ChevronRight, Instagram, Facebook, Twitter, LogIn, LogOut, User as UserIcon, Gem, Target, Wind } from 'lucide-react';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'AI Consultant', href: '/consultant' },
    { name: 'Services', href: '/#services' },
    { name: 'Experts', href: '/#team' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
      isScrolled || location.pathname !== '/' ? "bg-charcoal/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Sparkles className="text-wine w-6 h-6" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tighter text-gold">
            VENUS <span className="text-soft-white font-light">SPA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "hover:text-gold transition-colors text-sm font-medium tracking-wide",
                location.pathname === link.href ? "text-gold" : "text-soft-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-wine/20 border border-gold/20 rounded-full pl-1 pr-4 py-1">
                <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gold/50" />
                <span className="text-xs text-gold font-medium hidden xl:block">{user.displayName}</span>
                <button onClick={handleLogout} className="text-soft-white/50 hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 text-soft-white/80 hover:text-gold transition-colors text-sm font-medium"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
            )}
            
            <a href="/#booking" className="btn-gold !py-2 !px-6 text-sm">
              Book Now
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          {user && (
            <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-gold/50" />
          )}
          <button 
            className="text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal/95 backdrop-blur-xl border-t border-gold/10 mt-4 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors text-lg font-serif",
                    location.pathname === link.href ? "text-gold" : "text-soft-white hover:text-gold"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gold/10 flex flex-col gap-4">
                {user ? (
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-red-400 text-lg font-serif"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-gold text-lg font-serif"
                  >
                    <LogIn className="w-5 h-5" /> Login with Google
                  </button>
                )}
                <a 
                  href="/#booking" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold text-center mt-2"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background YouTube Video with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 aspect-video min-w-full min-h-full"
          src="https://www.youtube.com/embed/0ItprN-nJ1A?autoplay=1&mute=1&loop=1&playlist=0ItprN-nJ1A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-r from-wine/90 via-wine/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-1 rounded-full text-gold text-sm font-medium mb-6">
            <Award className="w-4 h-4" /> Premium Beauty Destination in Agartala
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-soft-white leading-[1.1] mb-6">
            Your Best Look Isn’t a Dream. <br />
            <span className="text-gold">It’s One Appointment Away.</span>
          </h1>
          <p className="text-lg text-soft-white/80 mb-10 max-w-xl leading-relaxed">
            Expert stylists, premium care, and real transformations that you can see and feel from the very first visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#booking" className="btn-gold text-center">
              Book Your Appointment Now
            </a>
            <a href="#services" className="px-8 py-3 border border-gold/50 text-gold font-semibold rounded-sm hover:bg-gold/10 transition-all text-center">
              Explore Services
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i+10}`} 
                  className="w-10 h-10 rounded-full border-2 border-wine"
                  alt="Client"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-soft-white/60">⭐ Rated 4.9 by 300+ happy clients in Agartala</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-gold/20 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" 
              alt="Beauty Transformation"
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 bg-gold p-6 rounded-xl shadow-xl z-20 animate-bounce-slow">
            <p className="text-wine font-bold text-3xl">₹200 OFF</p>
            <p className="text-wine/80 text-xs font-semibold">On your first visit</p>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-charcoal border border-gold/30 p-4 rounded-xl shadow-xl z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-wine rounded-full flex items-center justify-center">
                <Sparkles className="text-gold w-6 h-6" />
              </div>
              <div>
                <p className="text-gold font-bold">100% Result</p>
                <p className="text-soft-white/60 text-xs">Guaranteed Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Offer Banner Sticky (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gold py-3 px-6 z-40 flex items-center justify-between shadow-2xl">
        <p className="text-wine font-bold text-sm">₹200 OFF on first visit!</p>
        <a href="#booking" className="bg-wine text-gold text-xs font-bold px-4 py-2 rounded-full">
          BOOK NOW
        </a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding bg-wine/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600" 
              alt="Spa Ambiance" 
              className="rounded-2xl mt-12 shadow-xl"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=600" 
              alt="Salon Service" 
              className="rounded-2xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold rounded-full flex items-center justify-center border-8 border-charcoal">
            <div className="text-center">
              <p className="text-wine font-bold text-2xl">10+</p>
              <p className="text-wine/80 text-[10px] font-bold uppercase">Years Exp</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Our Story</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 leading-tight">
            Elevating Beauty Standards in Agartala
          </h3>
          <p className="text-soft-white/70 text-lg mb-6 leading-relaxed">
            At Venus Beauty Spa, we believe beauty is more than skin deep—it's about confidence, personalization, and transformation. As Agartala's premier unisex destination, we combine world-class expertise with a modern luxury touch.
          </p>
          <p className="text-soft-white/70 text-lg mb-8 leading-relaxed">
            Our team of certified professionals is dedicated to delivering results that don't just meet expectations but exceed them. From high-end hair transformations to rejuvenating spa therapies, every service is a masterpiece of skill and hygiene.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <Shield className="text-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gold font-bold mb-1">Hygiene First</h4>
                <p className="text-soft-white/50 text-sm">Strict sanitization protocols for your safety.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <Users className="text-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gold font-bold mb-1">Expert Team</h4>
                <p className="text-soft-white/50 text-sm">Certified specialists with years of experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const features = [
    { 
      icon: Sparkles, 
      title: "Get the Look You Always Imagined", 
      desc: "Tailored to your face, style, and personality — no more disappointing results." 
    },
    { 
      icon: Gem, 
      title: "Feel Confident Every Day", 
      desc: "Look polished, attractive, and confident for any occasion." 
    },
    { 
      icon: Target, 
      title: "Personalized for You", 
      desc: "No one-size-fits-all. Everything is designed just for you." 
    },
    { 
      icon: Wind, 
      title: "Premium Experience", 
      desc: "Relax in a clean, calm space while experts handle your transformation." 
    },
    { 
      icon: Users, 
      title: "Trusted Experts", 
      desc: "Skilled professionals delivering precise, high-quality results." 
    },
    { 
      icon: Star, 
      title: "Your Best Version", 
      desc: "Walk out feeling confident, refreshed, and ready to stand out." 
    },
  ];

  return (
    <section className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Why Venus?</h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold">The Luxury You Deserve</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 bg-wine/10 border border-gold/10 rounded-2xl text-center hover:border-gold/40 transition-all"
          >
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <f.icon className="text-wine w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-gold mb-3">{f.title}</h4>
            <p className="text-soft-white/60 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <section id="gallery" className="section-padding bg-wine/5">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Gallery</h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold">Visualizing Perfection</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-wine/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Sparkles className="text-gold w-10 h-10" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Sparkles className="text-wine w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tighter text-gold">
              VENUS <span className="text-soft-white font-light">SPA</span>
            </span>
          </Link>
          <p className="text-soft-white/50 text-sm leading-relaxed mb-8">
            Agartala's premier luxury unisex salon and spa destination. Delivering expert beauty results with a touch of elegance.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-wine transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-wine transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-wine transition-all">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-gold font-serif font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'AI Consultant', href: '/consultant' },
              { name: 'Services', href: '/#services' },
              { name: 'Our Experts', href: '/#team' },
              { name: 'Gallery', href: '/#gallery' },
              { name: 'Book Now', href: '/#booking' }
            ].map(link => (
              <li key={link.name}>
                <Link to={link.href} className="text-soft-white/60 hover:text-gold transition-colors text-sm flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 text-gold/30 group-hover:text-gold transition-colors" /> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-serif font-bold text-lg mb-6">Our Services</h4>
          <ul className="space-y-4">
            {['Hair Styling', 'Bridal Makeup', 'Thai Massage', 'Aromatherapy', 'Facials', 'Keratin Treatment'].map(link => (
              <li key={link}>
                <Link to="/#services" className="text-soft-white/60 hover:text-gold transition-colors text-sm flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 text-gold/30 group-hover:text-gold transition-colors" /> {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-serif font-bold text-lg mb-6">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="text-gold w-5 h-5 shrink-0" />
              <div>
                <p className="text-soft-white/60 text-sm">
                  Office Lane, Agartala, Tripura 799001
                </p>
                <a 
                  href="https://share.google/asJHl6V3gkffK2eUO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold text-[10px] uppercase tracking-widest hover:underline mt-2 inline-block"
                >
                  View on Maps
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="text-gold w-5 h-5 shrink-0" />
              <p className="text-soft-white/60 text-sm">+91 69099 25434</p>
            </li>
            <li className="flex items-center gap-4">
              <Clock className="text-gold w-5 h-5 shrink-0" />
              <p className="text-soft-white/60 text-sm">10 AM – 8 PM (All Days)</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-soft-white/30 text-xs">
          © 2026 Venus Beauty Spa. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-soft-white/30 hover:text-gold text-xs transition-colors">Privacy Policy</a>
          <a href="#" className="text-soft-white/30 hover:text-gold text-xs transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
