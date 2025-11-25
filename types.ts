
export enum ViewState {
  LANDING = 'LANDING',
  PLANNER_FORM = 'PLANNER_FORM',
  TRIP_RESULT = 'TRIP_RESULT',
}

export interface ReadyMadePlan {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  category?: string;
  highlights?: string[];
  location?: string;
}

export interface UserPreferences {
  destinations: string[]; // Changed from tripName
  startDate: string;
  endDate: string;
  days: number;
  travelers: {
    adults: number;
    kids: number;
  };
  budget: string; // Range string
  activities: string[];
  accommodation: string;
  facilities: string[];
  intensity: 'Relaxed' | 'Moderate' | 'Intensive';
  foodPreferences?: string;
  mustVisit?: string;
}

export interface DayItinerary {
  dayNumber: number;
  date?: string;
  schedule: {
    time: string;
    activity: string;
    description: string;
    cost: string;
    transport: string;
    imageKeyword?: string; // For searching images
  }[];
  food: {
    lunch: string;
    dinner: string;
  };
  tips: string;
}

export interface TripPlan {
  tripTitle: string;
  summary: string;
  totalEstimatedCost: string;
  days: DayItinerary[];
  todoList: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
