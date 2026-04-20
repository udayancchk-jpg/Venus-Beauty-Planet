import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { ALL_SERVICES } from "../lib/constants";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const getAI = () => ai;

const salonInfo = `
VENUS BEAUTY SPA - SERVICES MENU:
- Facials (Skin): Premium treatments for a radiant, healthy glow.
- Hair Styling & Keratin (Hair): For smooth, shiny, and manageable hair.
- Manicure & Pedicure (Nails): Complete nail care and grooming.
- Thai Massage (Spa): Traditional massage for deep relaxation.
- Aromatherapy (Spa): Massage using essential oils.
- Oil Therapy (Spa): Rejuvenating skin treatments.
- Full Body Spa (Spa): Revitalizing head-to-toe experience.
- Waxing (Rica) (Salon): Hair removal for smooth skin.
- Bridal Makeup (Salon): Stunning artistry for special days.

Location: Office Lane, Agartala, Tripura 799001.
WhatsApp: +91 69099 25434
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

export async function* analyzeImage(base64Image: string, mimeType: string) {
  try {
    const ai = getAI();
    const result = await ai.models.generateContentStream({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType
              }
            },
            {
              text: `You are a confident, expert Beauty Consultant at Venus Beauty Spa. 
            Analyze this image (focusing on face, hair, skin, or nails) and provide a professional report.
            
            STRICT BEHAVIOR RULES:
            1. Never describe the skin/hair as perfect, ideal, or fully healthy.
            2. Always position it as "moderate" or "can be improved".
            3. Use soft improvement language like: "needs a boost", "can look more fresh", "not at its best".
            4. Goal: Match the user's observed issue (Skin, Hair, or Nails) to the BEST salon service.
            
            SERVICE MATCHING LOGIC:
            - If you see skin issues (dullness, dryness, texture): Recommend "Facials".
            - If you see hair issues (frizz, split ends, dull hair): Recommend "Hair Styling & Keratin".
            - If you see hands/feet or nails: Recommend "Manicure & Pedicure".
            - If the person looks stressed or tired in general: Recommend "Full Body Spa" or "Thai Massage".
            - Be specific. Don't always recommend the same thing. Look at the image features!
            
            CONTENT RULES:
            1. Use very simple English. No paragraphs.
            2. Use short bullet points only.
            3. No home remedies.
            4. Suggest only ONE salon service from: ${salonInfo}
            5. Focus on outcomes: grow, smooth, clear, shiny.
            
            Use this exact key-value format for parsing:
            
            SKIN_TYPE: [1 short line]
            PRIMARY_CONCERN: [1-2 words like Dullness or Dryness]
            SKIN_ISSUES: [2-3 short words separated by comma]
            CURRENT_CONDITION:
            - [simple problem]
            - [simple problem]
            RECOMMENDED_SERVICE: [Only the name of the salon service]
            EXPECTED_RESULTS:
            - [clear outcome]
            - [clear outcome]`
            }
          ]
        }
      ]
    });

    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
}
