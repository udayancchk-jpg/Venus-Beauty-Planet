import { Service, TeamMember } from './types';

export const SPA_SERVICES: Service[] = [
  {
    id: 'thai-massage',
    name: 'Thai Massage',
    category: 'Spa',
    description: 'Traditional Thai massage combining acupressure and assisted yoga postures for deep relaxation.',
    image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy',
    category: 'Spa',
    description: 'Therapeutic massage using essential oils to promote physical and emotional well-being.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'oil-therapy',
    name: 'Oil Therapy',
    category: 'Spa',
    description: 'Nourishing oil treatments that rejuvenate the skin and soothe the nervous system.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'full-body-spa',
    name: 'Full Body Spa',
    category: 'Spa',
    description: 'A comprehensive spa experience designed to revitalize your entire body from head to toe.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
  },
];

export const SALON_SERVICES: Service[] = [
  {
    id: 'hair-styling-keratin',
    name: 'Hair Styling & Keratin',
    category: 'Salon',
    description: 'Expert hair treatments for a smooth, shiny, and manageable look that lasts.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'facials',
    name: 'Facials',
    category: 'Salon',
    description: 'Premium skin treatments tailored to your skin type for a radiant, healthy glow.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'waxing-rica',
    name: 'Waxing (Rica)',
    category: 'Salon',
    description: 'Gentle and effective hair removal using premium Rica wax for smooth skin.',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    category: 'Salon',
    description: 'Complete nail care and grooming for perfectly polished hands and feet.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    category: 'Salon',
    description: 'Exquisite makeup artistry to make you look and feel stunning on your special day.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800',
  },
];

export const ALL_SERVICES = [...SPA_SERVICES, ...SALON_SERVICES];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Senior Makeup Artist',
    specialization: 'Bridal & Occasion Makeup',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Rahul Das',
    role: 'Hair Styling Expert',
    specialization: 'Keratin & Advanced Styling',
    experience: '6+ Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Anjali Roy',
    role: 'Lead Therapist',
    specialization: 'Thai & Aromatherapy',
    experience: '7+ Years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Suman Deb',
    role: 'Skin Specialist',
    specialization: 'Advanced Facials & Treatments',
    experience: '5+ Years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Megha Roy',
    text: 'The best salon experience in Agartala! Priya did my bridal makeup and it was exactly what I wanted. Flawless and elegant.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Amit Kumar',
    text: 'Highly professional staff and very hygienic. The Thai massage was incredibly relaxing. Definitely worth every penny.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sneha Gupta',
    text: 'I got my hair keratin treatment done here. The results are amazing! My hair feels so soft and manageable now.',
    rating: 5,
  },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
];
