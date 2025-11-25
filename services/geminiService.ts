import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, TripPlan } from "../types";

export const generateTripPlan = async (
  prefs: UserPreferences
): Promise<TripPlan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Create a detailed travel itinerary for a trip to Egypt.
    
    User Preferences:
    - Destinations: ${prefs.destinations.join(", ") || "Any recommended"}
    - Dates: ${prefs.startDate} to ${prefs.endDate} (${prefs.days} days)
    - Travelers: ${prefs.travelers.adults} adults, ${prefs.travelers.kids} kids
    - Budget Range: ${prefs.budget}
    - Interests/Style: ${prefs.activities.join(", ")}
    - Accommodation: ${prefs.accommodation}
    - Hotel Facilities Needed: ${prefs.facilities.join(", ")}
    - Pace: ${prefs.intensity}
    - Food Preferences: ${prefs.foodPreferences || "None specific"}
    - Must Visit: ${prefs.mustVisit || "None"}

    Requirements:
    1. Organize the trip day by day.
    2. Provide realistic costs within the ${prefs.budget} budget.
    3. Include specific restaurant recommendations matching food preferences.
    4. Ensure the pace (${prefs.intensity}) is respected.
    5. Schedule MUST cover the full day from approx 09:00 AM to 10:00 PM.
    6. Explicitly include "Lunch" and "Dinner" as distinct activity items in the schedule array with specific restaurant names and times.
    
    Output Format: JSON only.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripTitle: { type: Type.STRING },
          summary: { type: Type.STRING },
          totalEstimatedCost: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.INTEGER },
                date: { type: Type.STRING },
                schedule: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      description: { type: Type.STRING },
                      cost: { type: Type.STRING },
                      transport: { type: Type.STRING },
                      imageKeyword: { type: Type.STRING, description: "One keyword to search for an image of this activity (e.g., Pyramids, Seafood, Beach)" },
                    },
                  },
                },
                food: {
                  type: Type.OBJECT,
                  properties: {
                    lunch: { type: Type.STRING },
                    dinner: { type: Type.STRING },
                  },
                },
                tips: { type: Type.STRING },
              },
            },
          },
          todoList: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["tripTitle", "summary", "days", "todoList"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No content generated");
  }

  return JSON.parse(response.text) as TripPlan;
};