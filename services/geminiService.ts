import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserPreferences, TripPlan } from "../types";

// تأكد من تعريف المفتاح في ملف .env باسم VITE_GEMINI_KEY
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY || "");

export const generateTripPlan = async (prefs: UserPreferences): Promise<TripPlan> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Create a detailed Egyptian travel itinerary for ${prefs.days} days.
      Destinations: ${prefs.destinations.join(", ")}.
      Budget: ${prefs.budget}.
      Travelers: ${prefs.travelers.adults} adults, ${prefs.travelers.kids} kids.
      Interests: ${prefs.activities.join(", ")}.
      Pace: ${prefs.intensity}.
      Food Preferences: ${prefs.foodPreferences}.
      Return the response ONLY as a JSON object matching the TripPlan interface.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // تحويل النص لـ JSON
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate your trip plan. Please check your API key.");
  }
};