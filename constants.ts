
import { ReadyMadePlan } from "./types";

export const DESTINATION_OPTIONS = [
  { id: "cairo", label: "Cairo & Giza", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&q=80" },
  { id: "luxor", label: "Luxor", image: "https://images.unsplash.com/photo-1568289870104-51c6c039364b?w=400&q=80" },
  { id: "aswan", label: "Aswan", image: "https://images.unsplash.com/photo-1539650116455-251d9a0d630a?w=400&q=80" },
  { id: "alexandria", label: "Alexandria", image: "https://images.unsplash.com/photo-1500353391678-d7b57970d9a5?w=400&q=80" },
  { id: "sharm", label: "Sharm El-Sheikh", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" },
  { id: "siwa", label: "Siwa Oasis", image: "https://images.unsplash.com/photo-1548232979-6c557ee14752?w=400&q=80" },
];

export const ACTIVITY_OPTIONS = [
  "Cultural",
  "Historical",
  "Nature",
  "Sea & Beach",
  "Adventure / Safari",
  "Food & Dining",
  "Shopping",
  "Nightlife",
];

export const FACILITY_OPTIONS = [
  "Swimming Pool",
  "Gym / Fitness Center",
  "Spa & Wellness",
  "Free Wi-Fi",
  "Breakfast Included",
  "Nile View",
  "Sea View",
  "Family Rooms",
];

export const BUDGET_RANGES = [
  "$500-$1000",
  "$1000-$2000",
  "$2000-$5000",
  "$5000+",
];

export const ICONIC_ATTRACTIONS = [
  {
    id: "attr-1",
    title: "Pyramids of Giza & The Sphinx",
    category: "Historical",
    description: "Stand before the last remaining wonder of the ancient world. The Great Pyramid of Khufu, along with the mysterious Sphinx, offers a glimpse into Egypt's glorious past.",
    location: "Giza, Cairo",
    duration: "4-6 hours",
    imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
  },
  {
    id: "attr-2",
    title: "Nile River Cruise",
    category: "Experience",
    description: "Sail along the legendary Nile River, Egypt's lifeline. Experience luxury and history as you cruise between ancient temples and modern cities.",
    location: "Luxor to Aswan",
    duration: "3-7 days",
    imageUrl: "https://images.unsplash.com/photo-1544899535-43a0888914ba?w=800&q=80",
  },
];

export const READY_MADE_PLANS: ReadyMadePlan[] = [
  {
    id: "1",
    title: "Cairo",
    location: "Cairo",
    duration: "1-3 Days",
    imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
    description: "The bustling capital city, home to the iconic Pyramids of Giza and the Egyptian Museum.",
    rating: 4.8,
    reviews: 1240,
    highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili Bazaar"],
  },
  {
    id: "2",
    title: "Luxor",
    location: "Luxor",
    duration: "2-4 Days",
    imageUrl: "https://images.unsplash.com/photo-1568289870104-51c6c039364b?w=800&q=80",
    description: "Ancient Thebes - the world's greatest open-air museum with magnificent temples and tombs.",
    rating: 4.9,
    reviews: 980,
    highlights: ["Valley of the Kings", "Karnak Temple", "Luxor Temple"],
  },
  {
    id: "3",
    title: "Aswan",
    location: "Aswan",
    duration: "2-3 Days",
    imageUrl: "https://images.unsplash.com/photo-1539650116455-251d9a0d630a?w=800&q=80",
    description: "Serene beauty on the Nile with Nubian culture and spectacular river scenery.",
    rating: 4.7,
    reviews: 850,
    highlights: ["Abu Simbel", "Philae Temple", "Nubian Villages"],
  },
  {
    id: "4",
    title: "Red Sea Relax",
    location: "Hurghada",
    duration: "4-5 Days",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    description: "World-class diving, snorkeling and relaxation on pristine sandy beaches.",
    rating: 4.6,
    reviews: 2100,
    highlights: ["Snorkeling", "Giftun Island", "Desert Safari"],
  },
  {
    id: "5",
    title: "Alexandria",
    location: "Alexandria",
    duration: "1-2 Days",
    imageUrl: "https://images.unsplash.com/photo-1500353391678-d7b57970d9a5?w=800&q=80",
    description: "The Pearl of the Mediterranean, founded by Alexander the Great.",
    rating: 4.5,
    reviews: 670,
    highlights: ["Bibliotheca Alexandrina", "Citadel of Qaitbay", "Montaza Palace"],
  },
  {
    id: "6",
    title: "Siwa Oasis",
    location: "Western Desert",
    duration: "3 Days",
    imageUrl: "https://images.unsplash.com/photo-1548232979-6c557ee14752?w=800&q=80",
    description: "A secluded oasis known for its crystal clear salt lakes and unique culture.",
    rating: 4.9,
    reviews: 430,
    highlights: ["Salt Lakes", "Shali Fortress", "Cleopatra's Bath"],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    text: "EGTrip planned my entire 2-week journey in seconds. The AI suggestions for local food spots in Cairo were spot on!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "David Chen",
    role: "History Buff",
    text: "I wanted a deep dive into ancient history without the tourist traps. The futuristic planner built a custom path that was perfect.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Elena & Marco",
    role: "Honeymooners",
    text: "Luxurious, seamless, and completely stress-free. The ready-made Red Sea plan was exactly what we needed to relax.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop",
  },
];

export const HOW_IT_WORKS = [
  {
    title: "Choose or Create",
    desc: "Select a curated plan or let our AI build one from scratch.",
    icon: "Map",
  },
  {
    title: "AI Optimization",
    desc: "Our engine optimizes routes, costs, and availability in real-time.",
    icon: "Cpu",
  },
  {
    title: "Travel & Enjoy",
    desc: "Download your guide and experience Egypt like a local.",
    icon: "Plane",
  },
];
