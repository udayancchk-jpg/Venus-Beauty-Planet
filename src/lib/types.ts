export interface Service {
  id: string;
  name: string;
  category: 'Spa' | 'Salon';
  description: string;
  image: string;
  price?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  image: string;
}

export interface Booking {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: any;
}
