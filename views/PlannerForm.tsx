import React, { useState, useEffect } from "react";
import { UserPreferences, TripPlan } from "../types";
import { generateTripPlan } from "../services/geminiService";
import { Sparkles, ChevronLeft, ChevronRight, Check, MapPin, Sun, Calendar, Plane, Globe } from "lucide-react";
import { ACTIVITY_OPTIONS, DESTINATION_OPTIONS, BUDGET_RANGES, FACILITY_OPTIONS } from "../constants";

interface PlannerFormProps {
  onPlanGenerated: (plan: TripPlan) => void;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onPlanGenerated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 8;
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingMessages = [
    "Scouting the best locations...",
    "Consulting local guides...",
    "Finding hidden gems...",
    "Checking weather patterns...",
    "Curating authentic experiences...",
    "Finalizing your adventure..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const [formData, setFormData] = useState<UserPreferences>({
    destinations: [],
    startDate: "",
    endDate: "",
    days: 3,
    travelers: { adults: 2, kids: 0 },
    budget: "",
    activities: [],
    accommodation: "Medium",
    facilities: [],
    intensity: "Moderate",
    foodPreferences: "",
    mustVisit: "",
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const toggleSelection = (field: keyof UserPreferences, value: string) => {
    setFormData(prev => {
      const list = prev[field] as string[];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter(item => item !== value) };
      }
      return { ...prev, [field]: [...list, value] };
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const plan = await generateTripPlan(formData);
      onPlanGenerated(plan);
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-beige dark:bg-navy overflow-hidden font-sans">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1920&q=80" 
                className="w-full h-full object-cover opacity-20 scale-105 animate-float" 
                style={{animationDuration: '20s'}}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-navy dark:via-navy/80 dark:to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-md w-full p-8">
            {/* New 2D Orbit Animation */}
            <div className="relative w-32 h-32 mx-auto mb-10 flex items-center justify-center">
               {/* Center Globe */}
               <div className="relative z-10 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg">
                  <Globe className="w-12 h-12 text-orange" />
               </div>
               
               {/* Pulsing Rings */}
               <div className="absolute inset-0 bg-orange/10 dark:bg-orange/20 rounded-full animate-ping opacity-75"></div>
               <div className="absolute inset-[-12px] border border-orange/20 dark:border-orange/30 rounded-full"></div>
               
               {/* Orbiting Plane */}
               <div className="absolute inset-[-20px] animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-orange/30 transform -rotate-90">
                     <Plane className="w-5 h-5 text-navy dark:text-white fill-current" />
                  </div>
               </div>
               
               {/* Dashed Orbit Path */}
               <div className="absolute inset-[-20px] border border-dashed border-gray-300 dark:border-slate-600 rounded-full"></div>
            </div>
            
            <h2 className="text-4xl font-display font-bold text-navy dark:text-white mb-2 tracking-tight">Curating Your Journey</h2>
            <p className="text-orange font-medium text-sm uppercase tracking-widest mb-8">Please Wait</p>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white dark:border-slate-700 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-slate-700">
                    <div className="h-full bg-orange animate-[width_2s_ease-in-out_infinite]" style={{width: '30%'}}></div>
                </div>
                
                <div className="flex flex-col gap-4 text-left">
                     {loadingMessages.map((msg, idx) => (
                        <div 
                            key={idx} 
                            className={`flex items-center gap-3 transition-all duration-500 ${idx === loadingTextIndex ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-2'}`}
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx === loadingTextIndex ? 'bg-orange text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500'}`}>
                                {idx < loadingTextIndex ? <Check className="w-3 h-3"/> : <Plane className={`w-3 h-3 ${idx === loadingTextIndex ? 'animate-pulse' : ''}`}/>}
                            </div>
                            <span className={`font-medium ${idx === loadingTextIndex ? 'text-navy dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{msg}</span>
                        </div>
                     ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 min-h-[600px] flex flex-col transition-colors duration-300">
        {/* Header Progress */}
        <div className="px-8 pt-8">
           <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-navy dark:text-white">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
           </div>
           <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full w-full">
              <div 
                className="h-full bg-orange rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
           </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
           {/* STEP 1: DESTINATIONS */}
           {currentStep === 1 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">Where do you want to go?</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                 {DESTINATION_OPTIONS.map(dest => (
                   <div 
                     key={dest.id}
                     onClick={() => toggleSelection('destinations', dest.label)}
                     className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group
                        ${formData.destinations.includes(dest.label) ? 'border-orange ring-4 ring-orange/20' : 'border-transparent hover:border-orange/50 dark:hover:border-orange/30'}
                     `}
                   >
                     <div className="h-40 w-full overflow-hidden">
                       <img src={dest.image} alt={dest.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-slate-700">
                       <div className="flex justify-between items-center">
                         <span className="font-bold text-navy dark:text-white">{dest.label}</span>
                         {formData.destinations.includes(dest.label) && <div className="bg-orange text-white p-1 rounded-full"><Check className="w-3 h-3"/></div>}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* STEP 2: TOURISM TYPE */}
           {currentStep === 2 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">What is your travel style?</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {ACTIVITY_OPTIONS.map(activity => (
                   <label 
                     key={activity}
                     className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-200
                       ${formData.activities.includes(activity) ? 'bg-orange text-white border-orange shadow-lg transform scale-105' : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-slate-600 hover:border-orange/30 dark:hover:border-orange/30'}
                     `}
                   >
                     <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={formData.activities.includes(activity)}
                        onChange={() => toggleSelection('activities', activity)}
                      />
                     <span className="font-bold">{activity}</span>
                   </label>
                 ))}
               </div>
             </div>
           )}

           {/* STEP 3: DAYS / DATES */}
           {currentStep === 3 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">When are you traveling?</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                 <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 font-bold flex items-center gap-2"><Calendar className="w-4 h-4"/> Start Date</label>
                    <input 
                      type="date" 
                      className="w-full p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-orange/50 focus:border-orange outline-none dark:text-white"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 font-bold flex items-center gap-2"><Calendar className="w-4 h-4"/> End Date</label>
                    <input 
                      type="date" 
                      className="w-full p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-orange/50 focus:border-orange outline-none dark:text-white"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 font-bold flex items-center gap-2"><Sun className="w-4 h-4"/> Number of Days (Approx)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      className="w-full p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-orange/50 focus:border-orange outline-none font-bold text-lg dark:text-white"
                      value={formData.days}
                      onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                    />
                 </div>
               </div>
             </div>
           )}

           {/* STEP 4: TRAVELERS */}
           {currentStep === 4 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">Who is traveling?</h2>
               <div className="space-y-6 max-w-lg">
                 <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-slate-600">
                    <span className="font-bold text-lg text-navy dark:text-white">Adults</span>
                    <div className="flex items-center gap-4">
                       <button 
                         className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center hover:bg-orange hover:text-white dark:text-white transition-colors"
                         onClick={() => setFormData(prev => ({...prev, travelers: {...prev.travelers, adults: Math.max(1, prev.travelers.adults - 1)}}))}
                       >-</button>
                       <span className="font-bold text-xl w-8 text-center dark:text-white">{formData.travelers.adults}</span>
                       <button 
                         className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center hover:bg-orange hover:text-white dark:text-white transition-colors"
                         onClick={() => setFormData(prev => ({...prev, travelers: {...prev.travelers, adults: prev.travelers.adults + 1}}))}
                       >+</button>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-slate-600">
                    <div>
                      <span className="font-bold text-lg text-navy dark:text-white block">Children</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Under 12 years</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                         className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center hover:bg-orange hover:text-white dark:text-white transition-colors"
                         onClick={() => setFormData(prev => ({...prev, travelers: {...prev.travelers, kids: Math.max(0, prev.travelers.kids - 1)}}))}
                       >-</button>
                       <span className="font-bold text-xl w-8 text-center dark:text-white">{formData.travelers.kids}</span>
                       <button 
                         className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center hover:bg-orange hover:text-white dark:text-white transition-colors"
                         onClick={() => setFormData(prev => ({...prev, travelers: {...prev.travelers, kids: prev.travelers.kids + 1}}))}
                       >+</button>
                    </div>
                 </div>
               </div>
             </div>
           )}

           {/* STEP 5: BUDGET */}
           {currentStep === 5 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">What is your travel budget?</h2>
               <div className="space-y-4 max-w-lg">
                 {BUDGET_RANGES.map(range => (
                   <div 
                     key={range}
                     onClick={() => setFormData({...formData, budget: range})}
                     className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center
                       ${formData.budget === range ? 'border-orange bg-orange/5' : 'border-gray-100 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'}
                     `}
                   >
                     <span className={`font-bold ${formData.budget === range ? 'text-orange' : 'text-navy dark:text-white'}`}>{range}</span>
                     {formData.budget === range && <div className="w-4 h-4 bg-orange rounded-full"></div>}
                   </div>
                 ))}
               </div>
             </div>
           )}

            {/* STEP 6: ACCOMMODATION TYPE */}
            {currentStep === 6 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">Preferred Accommodation</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   {val: 'Budget', label: 'Budget / Hostels', desc: 'Simple, clean, and affordable.'},
                   {val: 'Medium', label: 'Mid-Range (3-4 Stars)', desc: 'Comfortable with good amenities.'},
                   {val: 'Luxury', label: 'Luxury (5 Stars)', desc: 'Top-tier service and elegance.'},
                   {val: 'Local', label: 'Local Guesthouses', desc: 'Authentic cultural experience.'}
                 ].map((opt) => (
                   <div 
                     key={opt.val}
                     onClick={() => setFormData({...formData, accommodation: opt.val})}
                     className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md
                       ${formData.accommodation === opt.val ? 'border-orange bg-orange/5' : 'border-gray-100 dark:border-slate-600 dark:bg-slate-700/50'}
                     `}
                   >
                     <h3 className="font-bold text-lg text-navy dark:text-white">{opt.label}</h3>
                     <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{opt.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* STEP 7: FACILITIES */}
           {currentStep === 7 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">Hotel Facilities</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {FACILITY_OPTIONS.map(facility => (
                    <label 
                    key={facility}
                    className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center
                      ${formData.facilities.includes(facility) ? 'bg-orange/10 border-orange text-orange font-bold' : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'}
                    `}
                  >
                    <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={formData.facilities.includes(facility)}
                       onChange={() => toggleSelection('facilities', facility)}
                     />
                    {formData.facilities.includes(facility) && <Check className="w-4 h-4 mr-2" />}
                    <span>{facility}</span>
                  </label>
                 ))}
               </div>
             </div>
           )}

           {/* STEP 8: DETAILS */}
           {currentStep === 8 && (
             <div className="animate-fade-in-up">
               <h2 className="text-3xl font-display font-bold text-navy dark:text-white mb-8">Final Details</h2>
               <div className="space-y-6">
                 <div>
                   <label className="block font-bold text-navy dark:text-white mb-2">Food Preferences</label>
                   <input 
                    type="text" 
                    placeholder="e.g. Vegetarian, Halal, Seafood lover..." 
                    className="w-full p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:border-orange outline-none dark:text-white"
                    value={formData.foodPreferences}
                    onChange={(e) => setFormData({...formData, foodPreferences: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block font-bold text-navy dark:text-white mb-2">Pace of Trip</label>
                   <div className="flex gap-4">
                     {['Relaxed', 'Moderate', 'Intensive'].map((pace) => (
                       <button
                        key={pace}
                        onClick={() => setFormData({...formData, intensity: pace as any})}
                        className={`flex-1 py-3 rounded-xl border font-medium ${formData.intensity === pace ? 'bg-navy dark:bg-orange text-white border-navy dark:border-orange' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'}`}
                       >
                         {pace}
                       </button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label className="block font-bold text-navy dark:text-white mb-2">Must-Visit Places (Optional)</label>
                   <textarea 
                    placeholder="Specific landmarks or cities..."
                    className="w-full p-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:border-orange outline-none h-24 dark:text-white"
                    value={formData.mustVisit}
                    onChange={(e) => setFormData({...formData, mustVisit: e.target.value})}
                   />
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Footer Navigation */}
        <div className="p-8 border-t border-gray-100 dark:border-slate-700 flex justify-between bg-white dark:bg-slate-800">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-bold flex items-center ${currentStep === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'bg-gray-100 dark:bg-slate-700 text-navy dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button 
              onClick={nextStep}
              className="px-8 py-3 bg-orange hover:bg-orange-hover text-white rounded-xl font-bold flex items-center shadow-lg shadow-orange/20 transition-all transform hover:scale-105"
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button 
              onClick={handleGenerate}
              className="px-8 py-3 bg-orange hover:bg-orange-hover text-white rounded-xl font-bold flex items-center shadow-lg shadow-orange/20 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" /> Generate Trip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};