import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera, Heart, Shield, Sparkle } from 'lucide-react';
import BeautyConsultant from '../components/BeautyConsultant';

export default function ConsultantPage() {
  return (
    <div className="pt-24 min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-wine/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1 rounded-full text-gold text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" /> Personalized AI Beauty Care
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-soft-white leading-[1.1] mb-8"
          >
            Scientific Analysis. <br />
            <span className="text-gold">Artistic Touch.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-soft-white/80 leading-relaxed mb-12"
          >
            Our AI-powered consultant uses advanced computer vision to analyze your unique features and provide studio-grade recommendations tailored just for you.
          </motion.p>
        </div>
      </section>

      {/* Main Consultant Tool */}
      <section className="pb-32 px-6 md:px-12 lg:px-24">
        <BeautyConsultant />
      </section>

      {/* Trust & Features */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-wine/5 border-y border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
             <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="text-gold w-8 h-8" />
             </div>
             <h3 className="text-xl font-serif text-gold mb-4">Precision Analysis</h3>
             <p className="text-soft-white/60 text-sm leading-relaxed">
               Advanced neural networks analyze skin texture, hair health, and facial contours.
             </p>
          </div>
          <div className="text-center">
             <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkle className="text-gold w-8 h-8" />
             </div>
             <h3 className="text-xl font-serif text-gold mb-4">Custom Regimens</h3>
             <p className="text-soft-white/60 text-sm leading-relaxed">
               Receive a curated list of services and products based on your specific needs.
             </p>
          </div>
          <div className="text-center">
             <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-gold w-8 h-8" />
             </div>
             <h3 className="text-xl font-serif text-gold mb-4">Privacy First</h3>
             <p className="text-soft-white/60 text-sm leading-relaxed">
               We use edge-processing to ensure your images are used for analysis and then discarded.
             </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 lg:px-24 text-center">
         <h2 className="text-3xl font-serif text-soft-white mb-8">Ready for your transformation?</h2>
         <a href="/#booking" className="btn-gold inline-flex items-center gap-3">
            Book Appointment <Heart className="w-4 h-4" />
         </a>
      </section>
    </div>
  );
}
