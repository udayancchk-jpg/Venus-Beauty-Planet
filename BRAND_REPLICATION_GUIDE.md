# 🏆 Brand Replication & AI Implementation Guide

If you need to replicate this high-end AI platform for another brand, use the following comprehensive prompt and structural guide.

---

## 🚀 The "Master" Replication Prompt
*Copy and paste this into a new session to build a sister website.*

"I need to build a luxurious, full-stack website for a premium brand. The website must feature a Dark Luxury aesthetic, integrated AI Vision, and an AI Chatbot Concierge.

### 1. Brand Profile
- **Brand Name:** [INPUT BRAND NAME]
- **Location/Contact:** [INPUT ADDRESS & WHATSAPP]
- **Tagline:** [INPUT TAGLINE]
- **Services:** [INPUT LIST OF SERVICES]

### 2. Core Features REQUIRED:
1.  **AI Visual Consultant (Vision):** A page where users upload photos for real-time analysis using Gemini 3 Flash. It should recommend specific services based on the photo.
2.  **AI Concierge (Chatbot):** A floating AI agent that answers questions and can automatically trigger the booking section using Function Calling.
3.  **Autonomous Booking:** Multi-step appointment system synced with Firebase Firestore.
4.  **Luxury UI Recipe:** Pure charcoal backgrounds (#1A1A1A), Gold accents (#E0B973), with Playfair Display (Serif) headers and Inter (Sans) body text.

### 3. Implementation Directives:
- **Stack:** React 19, TypeScript, Tailwind 4, Framer Motion.
- **AI Logic:** Use the `@google/genai` SDK. Implement lazy-loading for AI services to prevent startup crashes.
- **Robustness:** Ensure the AI Consultant has a 'Preliminary Report' fallback if scanning fails.
- **Micro-Animations:** Neural scan lights on headers, staggered scroll entries, and Pulsing CTA buttons."

---

## 🛠 Project Structure Deep-Dive

### Data Management
- **`src/lib/constants.ts`**: The "Source of Truth". Modify `ALL_SERVICES`, `TEAM_MEMBERS`, and `TESTIMONIALS` here to immediately change the site content.

### AI Engineering
- **`src/services/geminiService.ts`**: Handles all LLM logic.
    - `chatWithGemini`: Handles the chatbot with function calling declarations for `bookAppointment`.
    - `analyzeImage`: Handles the Vision analysis. **Key Secret:** Pass the service list into the prompt so AI recommendations are accurate to the brand.
- **`src/components/BeautyConsultant.tsx`**: The frontend scan tool. Uses `Markdown` to render the professional reports.

### Database & Booking
- **`src/lib/firebase.ts`**: Entry point for Firestore.
- **`src/components/BookingSystem.tsx`**: A robust form that checks for booked slots and prevents double-booking.
- **`firebase-blueprint.json`**: Describes the data schema for potential Firestore security rules generation.

### UI Architecture
- **`src/index.css`**: Contains the global luxury theme, high-end scan animations, and custom button styles.
- **`src/components/Sections.tsx`**: Modularized sections for easy reorganization.

---

## 💎 Design Consistency Checklist
- [ ] **Typography:** Are Serif fonts used for headers and Sans-Serift for body?
- [ ] **Color Palette:** Is the contrast high enough for readability while maintaining the 'Gold on Charcoal' premium look?
- [ ] **Accessibility:** Are all touch targets (buttons) at least 44px?
- [ ] **Responsiveness:** Does the two-column Consultant tool stack correctly on mobile?
