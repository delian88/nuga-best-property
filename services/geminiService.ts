
import { GoogleGenAI } from "@google/genai";

export async function getPropertyAdvice(query: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Nuga Best Properties AI Assistant. Help the user with this real estate query related to Nigeria: ${query}. Provide professional, concise advice.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI assistant is currently offline. Please try again later.";
  }
}
