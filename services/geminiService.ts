
import { GoogleGenAI } from "@google/genai";
import { PitchContext } from "../types";

export const generatePitchScript = async (context: PitchContext): Promise<string> => {
  // Always use the process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert Silicon Valley venture capital pitch coach. 
    Generate a compelling, concise 30-second spoken pitch for the following slide in a game development presentation:
    
    Slide Title: ${context.slideTitle}
    Subtitle: ${context.slideSubtitle || 'N/A'}
    Key Points: ${context.keyPoints.join(', ')}
    
    The tone should be professional, exciting, and visionary. 
    Focus on the "why" and the "value proposition".
    Keep it under 100 words.
  `;

  try {
    // Use ai.models.generateContent to query the model directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Access the generated text directly using the .text property (not a method) from GenerateContentResponse.
    return response.text ?? "Could not generate pitch script at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the AI pitch assistant.";
  }
};