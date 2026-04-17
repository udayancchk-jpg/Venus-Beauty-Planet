import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar, Hero, About, WhyChooseUs, Gallery, Footer } from './components/Sections';
import { Services, Team, Testimonials, Contact } from './components/MoreSections';
import BookingSystem from './components/BookingSystem';
import AIChatbot from './components/AIChatbot';
import AboutPage from './pages/AboutPage';
import ConsultantPage from './pages/ConsultantPage';
import { motion } from 'motion/react';
import { Sparkles, Camera, ChevronRight, Wand2 } from 'lucide-react';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      
      <About />
      
      <section className="section-padding bg-wine/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
           <Sparkles className="absolute top-10 right-10 w-64 h-64 text-gold" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
           <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1 rounded-full text-gold text-sm font-medium mb-6"
              >
                <Camera className="w-4 h-4" /> AI Innovation
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Personalized AI <br />Consultations</h2>
              <p className="text-soft-white/60 text-lg mb-8 leading-relaxed">
                Experience the first AI-powered beauty analysis in Agartala. Upload a photo and let our advanced neural networks provide expert recommendations tailored to your unique features.
              </p>
              <Link to="/consultant" className="btn-gold inline-flex items-center gap-2">
                 Get Free Analysis <ChevronRight className="w-4 h-4" />
              </Link>
           </div>
           <div className="lg:w-1/2 relative">
              <div className="aspect-square bg-charcoal rounded-3xl border border-gold/20 flex items-center justify-center p-8 shadow-2xl overflow-hidden group">
                 <img 
                   src="https://picsum.photos/seed/face-scan/800/800" 
                   alt="AI Scan Preview" 
                   className="w-full h-full object-cover rounded-2xl opacity-50 transition-transform duration-700 group-hover:scale-110"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-x-0 h-1 bg-gold shadow-[0_0_15px_#E0B973] animate-scanline z-10"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-wine/80 px-6 py-3 rounded-full border border-gold/30 backdrop-blur-sm">
                       <p className="text-gold font-bold flex items-center gap-2">
                          <Wand2 className="w-5 h-5 animate-pulse" /> Neural Analysis Ready
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Services />
      
      <WhyChooseUs />
      
      <Team />
      
      <section id="booking" className="section-padding bg-wine/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-wine/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1 rounded-full text-gold text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" /> Seamless Experience
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Book Your Appointment</h2>
          <p className="text-soft-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Select your preferred service, date, and time. We'll handle the rest to ensure you get the look you actually want.
          </p>
        </div>
        
        <div className="relative z-10">
          <BookingSystem />
        </div>
      </section>
      
      <Testimonials />
      
      <Gallery />
      
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/consultant" element={<ConsultantPage />} />
        </Routes>
        
        <Footer />
        <AIChatbot />

        {/* Floating Actions */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          {/* WhatsApp Button */}
          <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/916909925434"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow duration-300"
            aria-label="Chat on WhatsApp"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>

          {/* Floating Book Button (Mobile Only) */}
          <div className="lg:hidden">
            <a 
              href="/#booking" 
              className="w-14 h-14 bg-gold text-wine rounded-full flex items-center justify-center shadow-2xl animate-pulse"
            >
              <Sparkles className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </Router>
  );
}
