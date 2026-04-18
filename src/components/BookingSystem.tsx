import React, { useState, useEffect } from 'react';
import { format, addDays, isBefore, startOfDay, isSameDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { ALL_SERVICES } from '../lib/constants';
import { cn } from '../lib/utils';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

export default function BookingSystem() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceId: ALL_SERVICES[0].id,
    notes: ''
  });

  // Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const q = query(
        collection(db, 'bookings'),
        where('date', '==', dateStr)
      );
      
      try {
        const querySnapshot = await getDocs(q);
        const booked = querySnapshot.docs.map(doc => doc.data().timeSlot);
        setBookedSlots(booked);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'bookings');
      }
    };

    fetchBookings();
    setSelectedTime(null); // Reset time when date changes
  }, [selectedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    const service = ALL_SERVICES.find(s => s.id === formData.serviceId);

    try {
      // Send to Firebase
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        serviceName: service?.name || '',
        date: format(selectedDate!, 'yyyy-MM-dd'),
        timeSlot: selectedTime!,
        createdAt: serverTimestamp()
      });

      // Send to Formspree
      await fetch('https://formspree.io/f/mreowqvr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          serviceName: service?.name || '',
          date: format(selectedDate!, 'yyyy-MM-dd'),
          timeSlot: selectedTime!
        })
      });

      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-wine/20 border border-gold/30 p-12 rounded-lg text-center max-w-2xl mx-auto"
      >
        <CheckCircle2 className="w-20 h-20 text-gold mx-auto mb-6" />
        <h3 className="text-3xl font-serif text-gold mb-4">Booking Received!</h3>
        <p className="text-soft-white/80 text-lg mb-8">
          Your appointment request has been received. We will confirm your booking shortly via phone or email.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="btn-gold"
        >
          Book Another Appointment
        </button>
      </motion.div>
    );
  }

  const selectedService = ALL_SERVICES.find(s => s.id === formData.serviceId);

  return (
    <div className="max-w-6xl mx-auto bg-charcoal border border-gold/20 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-wine p-8 rounded-2xl border border-gold/30 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-serif text-gold mb-6 text-center">Review Booking</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-soft-white/60 text-sm italic">Name:</span>
                  <span className="text-soft-white font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-soft-white/60 text-sm italic">Phone:</span>
                  <span className="text-soft-white font-medium">{formData.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-soft-white/60 text-sm italic">Service:</span>
                  <span className="text-soft-white font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-soft-white/60 text-sm italic">Date:</span>
                  <span className="text-soft-white font-medium">{selectedDate ? format(selectedDate, 'PPP') : ''}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="text-soft-white/60 text-sm italic">Time:</span>
                  <span className="text-soft-white font-medium">{selectedTime}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={confirmBooking}
                  className="btn-gold w-full !py-3"
                >
                  Confirm & Submit
                </button>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="w-full text-soft-white/60 hover:text-soft-white transition-colors text-sm font-medium"
                >
                  Edit Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Calendar & Time */}
        <div className="p-8 bg-wine/10 border-r border-gold/10">
          <div className="mb-8">
            <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" /> Select Date
            </h3>
            <div className="flex justify-center bg-charcoal/50 p-4 rounded-lg border border-gold/10">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                modifiersStyles={{
                  selected: { backgroundColor: '#E0B973', color: '#3B0A0A' },
                  today: { color: '#E0B973', fontWeight: 'bold' }
                }}
                className="luxury-calendar"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" /> Select Time
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isPast = (() => {
                  if (!selectedDate || !isSameDay(selectedDate, new Date())) return false;
                  
                  // Simple time parsing for "10:00 AM" format
                  const [time, modifier] = slot.split(' ');
                  let [hours, minutes] = time.split(':').map(Number);
                  if (modifier === 'PM' && hours < 12) hours += 12;
                  if (modifier === 'AM' && hours === 12) hours = 0;
                  
                  const slotTime = new Date();
                  slotTime.setHours(hours, minutes, 0, 0);
                  
                  return isBefore(slotTime, new Date());
                })();
                
                return (
                  <button
                    key={slot}
                    disabled={isBooked || isPast}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-3 px-2 text-sm font-medium rounded-md transition-all duration-200 border",
                      selectedTime === slot 
                        ? "bg-gold text-wine border-gold" 
                        : (isBooked || isPast) 
                          ? "bg-charcoal/50 text-soft-white/20 border-white/5 cursor-not-allowed"
                          : "bg-charcoal text-soft-white/70 border-gold/20 hover:border-gold hover:text-gold"
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-soft-white/40 italic">
              * Limited slots available today. Book now to secure your spot.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8">
          <h3 className="text-2xl font-serif text-gold mb-8 flex items-center gap-2">
            <User className="w-6 h-6" /> Your Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gold/80 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-wine/5 border border-gold/20 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-gold text-soft-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold/80 block">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input
                    required
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-wine/5 border border-gold/20 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-gold text-soft-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gold/80 block">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-wine/5 border border-gold/20 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-gold text-soft-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gold/80 block">Select Service *</label>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
                className="w-full bg-wine/5 border border-gold/20 rounded-md py-3 px-4 focus:outline-none focus:border-gold text-soft-white appearance-none"
              >
                {ALL_SERVICES.map(service => (
                  <option key={service.id} value={service.id} className="bg-charcoal">
                    {service.name} ({service.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gold/80 block">Notes / Special Requests</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gold/50" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any specific requirements..."
                  className="w-full bg-wine/5 border border-gold/20 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-gold text-soft-white resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className={cn(
                  "w-full btn-gold py-4 text-lg",
                  (isSubmitting || !selectedDate || !selectedTime) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Processing..." : "Confirm Appointment"}
              </button>
              {(!selectedDate || !selectedTime) && (
                <p className="text-center text-red-400 text-xs mt-2">
                  Please select a date and time slot to continue.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
