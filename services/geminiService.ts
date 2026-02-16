
import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function getPropertyAdvice(history: ChatMessage[]): Promise<string> {
  // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction: `You are the Nuga Best Properties AI Concierge, a high-end real estate consultant. 
        Your goal is to have a natural, conversational dialogue with users.
        
        Guidelines:
        1. BE CONVERSATIONAL: Acknowledge what the user said previously. Use phrases like "As we discussed," or "Great question regarding that."
        2. BE PROACTIVE: Ask clarifying questions to better understand their needs (e.g., "Are you looking for an investment or a family home?", "What's your preferred neighborhood in Lagos?").
        3. TONE: Warm, elite, and helpful. Use 1-2 relevant emojis to keep it friendly but professional.
        4. EXPERTISE: You have deep knowledge of Nigeria's real estate laws (C of O, Governor's Consent) and premium areas (Ikoyi, Lekki, Maitama, etc.).
        5. CALL TO ACTION: If the user seems interested in a specific area or property type, suggest they speak with a human advisor for a private briefing.
        
        Keep responses concise and well-formatted. Do not use generic AI filler like "As an AI model." Talk like a human expert.`,
        temperature: 0.9, // Slightly higher for more natural variety
        topP: 0.95,
      }
    });
    // response.text is a property, returning the generated string output.
    return response.text || "I'm sorry, I couldn't process that request right now. Could you rephrase your question?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our concierge service is currently experiencing high demand. Please try again in a few moments or contact our support team directly.";
  }
}
