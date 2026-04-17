import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Star, Users, Shield, CheckCircle2, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-wine/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1 rounded-full text-gold text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" /> Your Transformation Journey
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-soft-white leading-[1.1] mb-8"
          >
            No More Bad Salon Results. <br />
            <span className="text-gold">Just the Look That Fits You.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl text-soft-white/80 leading-relaxed italic font-serif">
              "We noticed a pattern: people leaving salons feeling 'done' but not 'themselves.' Venus Beauty Spa was created to bridge that gap—where expert technique meets your personal identity."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust & Qualification */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-wine/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-gold mb-6">Why You Can Trust Us</h2>
          <p className="text-lg text-soft-white/70 leading-relaxed">
            With years of dedicated experience in Agartala, our team doesn't just follow trends—we understand the science of beauty and the art of personalization. Every professional at Venus Beauty Spa is trained to listen first, ensuring that your unique features and lifestyle are at the heart of every service we provide.
          </p>
        </div>
      </section>

      {/* How We Help You (Core Section) */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2 text-soft-white">Personalized, Not Processed</h3>
                <p className="text-soft-white/60 leading-relaxed">
                  We don't believe in one-size-fits-all. Your skin, hair, and style are unique. We tailor every treatment to your specific needs, ensuring results that enhance your natural beauty rather than masking it.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2 text-soft-white">Confidence in Every Mirror</h3>
                <p className="text-soft-white/60 leading-relaxed">
                  Our goal isn't just to change how you look, but how you feel. When you walk out of our doors, you carry a renewed sense of confidence that radiates in your daily life and special moments alike.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2 text-soft-white">From Daily Glow to Bridal Magic</h3>
                <p className="text-soft-white/60 leading-relaxed">
                  Whether it's a routine refresh or the most important day of your life, we bring the same level of precision and care. Our experts specialize in creating looks that stand the test of time and photography.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gold/20 rounded-lg blur-xl group-hover:bg-gold/30 transition-all duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000" 
              alt="Transformation" 
              className="relative rounded-lg shadow-2xl border border-gold/20 w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-wine/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-charcoal/50 border border-gold/10 rounded-lg"
            >
              <div className="text-4xl font-serif font-bold text-gold mb-2">1000+</div>
              <div className="text-soft-white/60 uppercase tracking-widest text-sm">Happy Clients</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-charcoal/50 border border-gold/10 rounded-lg"
            >
              <div className="text-4xl font-serif font-bold text-gold mb-2">4.8⭐</div>
              <div className="text-soft-white/60 uppercase tracking-widest text-sm">Rated Experience</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-charcoal/50 border border-gold/10 rounded-lg"
            >
              <div className="text-4xl font-serif font-bold text-gold mb-2">15+</div>
              <div className="text-soft-white/60 uppercase tracking-widest text-sm">Expert Stylists</div>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal/40 p-8 rounded-lg border-l-4 border-gold italic text-soft-white/80">
              "I've always struggled to find a salon that actually listens. At Venus, they took the time to understand my hair texture and gave me a cut that I can actually manage at home. Truly life-changing!"
              <div className="mt-4 font-serif text-gold not-italic">— Priya S., Agartala</div>
            </div>
            <div className="bg-charcoal/40 p-8 rounded-lg border-l-4 border-gold italic text-soft-white/80">
              "The bridal makeup was exactly what I dreamed of. I looked like myself, but the best version. The confidence they gave me on my wedding day was the best gift."
              <div className="mt-4 font-serif text-gold not-italic">— Ananya D., Tripura</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Meet Our Experts</h2>
            <p className="text-soft-white/60 max-w-2xl mx-auto">
              The hands behind your transformation. Simple, skilled, and dedicated to your results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sonia Das", role: "Hair Expert", expertise: "Master of precision cuts and color." },
              { name: "Rahul Sharma", role: "Makeup Artist", expertise: "Specialist in high-definition bridal looks." },
              { name: "Megha Roy", role: "Skin Therapist", expertise: "Expert in advanced facial rejuvenation." },
              { name: "Anita Paul", role: "Spa Therapist", expertise: "Specialist in holistic wellness treatments." }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg aspect-[4/5]">
                  <div className="absolute inset-0 bg-wine/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={`https://picsum.photos/seed/expert${index}/400/500`} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-serif font-bold text-gold mb-1">{member.name}</h4>
                <p className="text-soft-white/40 text-sm uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-soft-white/60 text-sm italic">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 border-t border-gold/10 bg-charcoal">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold" />
            <span className="text-xs uppercase tracking-widest">Certified L'Oréal Professional</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-xs uppercase tracking-widest">ISO 9001:2015 Quality Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" />
            <span className="text-xs uppercase tracking-widest">10+ Years Excellence</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto bg-wine/20 p-12 rounded-2xl border border-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Ready for the look you've always imagined?</h2>
          <p className="text-soft-white/70 mb-8 relative z-10">
            Book your consultation today and let us help you find the look that fits you perfectly.
          </p>
          <a href="/#booking" className="btn-gold inline-block relative z-10">
            Book Your Transformation
          </a>
        </div>
      </section>
    </div>
  );
}
