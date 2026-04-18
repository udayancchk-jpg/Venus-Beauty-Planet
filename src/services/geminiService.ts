import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { ALL_SERVICES } from "../lib/constants";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const getAI = () => ai;

const salonInfo = `
Salon Name: Venus Beauty Spa
Location: Office Lane, Agartala, Tripura 799001.
WhatsApp: +91 69099 25434
Opening Hours: 10:00 AM – 08:00 PM (All Days)
Services: ${ALL_SERVICES.map(s => `${s.name} (${s.category}): ${s.description}`).join('\n')}
Special Offer: ₹200 OFF on the first visit.
`;

const bookAppointmentDeclaration: FunctionDeclaration = {
  name: "bookAppointment",
  parameters: {
    type: Type.OBJECT,
    description: "Initiate the booking process for a salon service.",
    properties: {
      serviceName: {
        type: Type.STRING,
        description: "The name of the service the user wants to book.",
      },
      date: {
        type: Type.STRING,
        description: "The date the user wants to book (e.g., 'this Saturday', '2026-04-20').",
      },
      time: {
        type: Type.STRING,
        description: "The time slot the user prefers (e.g., '2:00 PM').",
      },
    },
    required: ["serviceName"],
  },
};

export async function chatWithGemini(message: string, history: { role: string, parts: { text: string }[] }[]) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are the AI Beauty Concierge for Venus Beauty Spa. 
        Your goal is to be helpful, luxurious, and professional.
        Use the following salon information to answer questions:
        ${salonInfo}
        
        If a user expresses interest in booking, use the 'bookAppointment' tool.
        Always be polite and encourage users to visit the salon.
        Keep responses concise and elegant.`,
        tools: [{ functionDeclarations: [bookAppointmentDeclaration] }],
      },
    });

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function analyzeImage(base64Image: string, mimeType: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType
            }
          },
          {
            text: `You are a professional Beauty Consultant at Venus Beauty Spa. 
            Analyze this image (face, hair, skin, or nails) and provide:
            1. A brief professional observation of what you see.
            2. Personalized recommendations from our salon services: ${salonInfo}
            3. Practical tips for daily care at home.
            
            Keep the tone luxurious, encouraging, and expert. Format the response with clear headings and bullet points using Markdown. Be specific about which services we offer would benefit them.`
          }
        ]
      }
    });

    return response.text || "I've analyzed your features. To give you the best results, I recommend visiting Venus Beauty Spa for a professional in-person consultation.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
}
