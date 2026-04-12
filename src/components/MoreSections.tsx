import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Phone, Clock, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { SPA_SERVICES, SALON_SERVICES, TEAM_MEMBERS, TESTIMONIALS } from '../lib/constants';
import { cn } from '../lib/utils';

export function Services() {
  return (
    <section id="services" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Our Services</h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold">Exquisite Beauty Treatments</h3>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        {/* Spa Services */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
            <h4 className="text-2xl font-serif font-bold text-gold px-4">Luxury Spa Therapies</h4>
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPA_SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* Salon Services */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
            <h4 className="text-2xl font-serif font-bold text-gold px-4">Premium Salon Services</h4>
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SALON_SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-wine/5 border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-6">
        <h5 className="text-xl font-serif font-bold text-gold mb-3 group-hover:translate-x-2 transition-transform duration-300">{service.name}</h5>
        <p className="text-soft-white/60 text-sm leading-relaxed mb-6">{service.description}</p>
        <a href="#booking" className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
          Book Now <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section id="team" className="section-padding bg-wine/5">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Our Experts</h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold">Meet the Artists</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {TEAM_MEMBERS.map((member, i) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-gold font-medium text-xs uppercase tracking-widest mb-1">{member.role}</p>
              <h4 className="text-2xl font-serif font-bold text-soft-white mb-2">{member.name}</h4>
              <div className="h-[1px] bg-gold/30 w-12 mb-4 group-hover:w-full transition-all duration-500"></div>
              <p className="text-soft-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {member.specialization} • {member.experience}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Testimonials</h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold">What Our Clients Say</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-wine/10 border border-gold/10 rounded-2xl relative"
          >
            <div className="flex items-center gap-1 text-gold mb-6">
              {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-soft-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold">{t.name[0]}</span>
              </div>
              <h5 className="text-soft-white font-bold">{t.name}</h5>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-gold font-medium tracking-widest uppercase mb-4">Contact Us</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8">Visit Our Sanctuary</h3>
          <p className="text-soft-white/60 text-lg mb-12 leading-relaxed">
            Ready for your transformation? Visit us at our premium location in Agartala or reach out to us for any queries.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="text-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gold font-bold mb-2">Our Location</h4>
                <p className="text-soft-white/60">Near JPC Club / Math Chowmuhani, Agartala, Tripura, India</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="text-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gold font-bold mb-2">Phone Number</h4>
                <p className="text-soft-white/60">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="text-gold w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gold font-bold mb-2">Opening Hours</h4>
                <p className="text-soft-white/60">10:00 AM – 08:00 PM (All Days)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[450px] rounded-2xl overflow-hidden border-4 border-gold/10 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.123456789!2d91.28!3d23.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzQ4LjAiTiA5McKwMTYnNDguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Venus Beauty Planet Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
