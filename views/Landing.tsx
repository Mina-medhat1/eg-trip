import React from "react";
import { ViewState } from "../types";
import { READY_MADE_PLANS, TESTIMONIALS, HOW_IT_WORKS } from "../constants";
import { MapPin, ArrowRight, Star, Mouse, Play, Cpu, Zap, Globe, Sparkles, ChevronRight, FileText, CheckCircle, Plane } from "lucide-react";

interface LandingProps {
  onNavigate: (view: ViewState) => void;
  onOpenAuth: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate, onOpenAuth }) => {
  const scrollToContent = () => {
    const section = document.getElementById("ai-future");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
           <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full scale-105"
            poster="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1920&q=80"
          >
            <source src="https://cdn.pixabay.com/video/2021/11/27/99066-650422964_large.mp4" type="video/mp4" />
          </video>
          {/* Gradients */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-up">
            ✨ The Future of Travel is Here
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
            Plan Your Egypt Trip <br /> with AI — EGTrip
          </h1>
          
          <p className="text-gray-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Create a personalized itinerary in minutes. <br className="hidden md:block"/>
            AI-powered planning tailored for the modern traveler.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const section = document.getElementById("ready-plans");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-navy font-bold rounded-full transition-all duration-300 flex items-center justify-center"
            >
              Browse Ready Plans
            </button>
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-4 bg-orange hover:bg-orange-hover text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-orange/20 flex items-center justify-center transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Create My AI Plan
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20 animate-bounce" onClick={scrollToContent}>
          <span className="text-white text-xs mb-2 tracking-widest uppercase">Explore</span>
          <Mouse className="text-white w-6 h-6" />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-4">How EGTrip Works</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">From idea to itinerary in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-16 h-16 bg-orange/10 dark:bg-orange/20 text-orange rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                  {step.icon === 'Map' && <MapPin className="w-8 h-8" />}
                  {step.icon === 'Cpu' && <Cpu className="w-8 h-8" />}
                  {step.icon === 'Plane' && <Plane className="w-8 h-8" />}
                </div>
                <h3 className="font-display font-bold text-xl text-navy dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FUTURISTIC AI SECTION (Always Dark) */}
      <section id="ai-future" className="py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Background Grids & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                 <div className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded text-cyan-400 text-xs font-mono uppercase tracking-widest">
                   System v.2090.1
                 </div>
                 <div className="h-px w-12 bg-cyan-500/30"></div>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
                Travel Planning <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange">from the Future</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                Our quantum-inspired AI engine analyzes millions of data points—from weather patterns to crowd density—to construct the perfect Egyptian odyssey in milliseconds.
              </p>
              
              <div className="space-y-4 mb-8">
                {['Real-time Availability Sync', 'Hyper-Personalized Routes', 'Instant PDF Export'].map((item, i) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-orange mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onOpenAuth}
                className="group relative px-8 py-4 bg-transparent border border-orange/50 text-orange font-mono uppercase tracking-widest hover:bg-orange hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Initialize Planner <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-orange/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>

            {/* Visual/Graphic */}
            <div className="lg:w-1/2 w-full perspective-1000">
               <div className="relative animate-float">
                  {/* Glass Card Main */}
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl neon-glow relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange to-cyan-500"></div>
                     
                     {/* Header UI */}
                     <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="text-xs font-mono text-gray-500">AI_PROCESSING_NODE_01</div>
                     </div>

                     {/* Chat/Interface */}
                     <div className="space-y-4 font-mono text-sm">
                        <div className="bg-white/5 p-3 rounded-lg border-l-2 border-orange">
                           <p className="text-gray-400 text-xs mb-1">USER_INPUT</p>
                           <p className="text-white">"I want a 3-day luxury trip to Luxor focusing on history."</p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-cyan-400 text-xs">
                           <Zap className="w-3 h-3 animate-pulse" />
                           <span>ANALYZING PARAMETERS...</span>
                        </div>

                        <div className="bg-cyan-900/10 p-4 rounded-lg border border-cyan-500/20">
                           <div className="flex justify-between items-center mb-3">
                              <span className="text-cyan-400 font-bold">ITINERARY_GENERATED</span>
                              <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-xs">99% MATCH</span>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between text-gray-300">
                                 <span>Day 1: Karnak Temple VIP Tour</span>
                                 <span>09:00 AM</span>
                              </div>
                              <div className="flex justify-between text-gray-300">
                                 <span>Lunch: Sofra Restaurant</span>
                                 <span>01:00 PM</span>
                              </div>
                              <div className="flex justify-between text-gray-300">
                                 <span>Sunset: Felucca Ride</span>
                                 <span>05:30 PM</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -right-10 -top-10 bg-gray-800/80 backdrop-blur-md p-4 rounded-xl border border-orange/30 shadow-lg animate-float" style={{animationDelay: '1s'}}>
                     <div className="flex items-center gap-3">
                        <div className="bg-orange p-2 rounded-lg">
                           <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <div className="text-xs text-gray-400">Destination</div>
                           <div className="text-white font-bold">Luxor, EG</div>
                        </div>
                     </div>
                  </div>

                  <div className="absolute -left-5 -bottom-5 bg-gray-800/80 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 shadow-lg animate-float" style={{animationDelay: '2s'}}>
                     <div className="flex items-center gap-3">
                        <div className="bg-cyan-600 p-2 rounded-lg">
                           <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <div className="text-xs text-gray-400">Status</div>
                           <div className="text-white font-bold">Ready to Book</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. READY MADE PLANS */}
      <section id="ready-plans" className="py-24 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-3">Popular Destinations</h2>
                <p className="text-gray-500 dark:text-gray-400 font-light">Explore ready-made itineraries curated by experts.</p>
             </div>
             <button className="hidden md:flex text-orange font-bold items-center hover:underline">
               View All <ArrowRight className="ml-2 w-4 h-4"/>
             </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {READY_MADE_PLANS.map((plan) => (
               <div key={plan.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 dark:border-slate-700">
                 <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                   <img 
                      src={plan.imageUrl}
                      alt={plan.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-display font-bold text-2xl">{plan.title}</h3>
                      <div className="flex items-center text-sm text-white/90 mt-1">
                        <MapPin className="w-3 h-3 mr-1" /> {plan.location}
                      </div>
                   </div>
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center border border-white/30">
                     <Star className="w-3 h-3 text-white fill-current" />
                     <span className="ml-1 text-xs font-bold text-white">{plan.rating}</span>
                   </div>
                 </div>

                 <div className="p-6">
                   <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
                     {plan.description}
                   </p>
                   
                   <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
                      <span className="text-sm font-medium text-gray-400">{plan.duration}</span>
                      <button 
                        onClick={onOpenAuth}
                        className="text-orange font-bold text-sm hover:text-orange-hover transition-colors flex items-center"
                      >
                        View Plan <ArrowRight className="ml-1 w-3 h-3" />
                      </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-white dark:bg-navy border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="font-display font-bold text-3xl text-center text-navy dark:text-white mb-16">Trusted by Travelers</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                 <div key={t.id} className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-6">
                       <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                       <div>
                          <h4 className="font-bold text-navy dark:text-white">{t.name}</h4>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">{t.role}</span>
                       </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">"{t.text}"</p>
                    <div className="flex text-orange mt-4">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. STATS / WHY US */}
      <section className="py-20 bg-white dark:bg-navy text-navy dark:text-white border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                 <div className="text-4xl md:text-5xl font-bold text-orange mb-2">10k+</div>
                 <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Happy Travelers</div>
              </div>
              <div>
                 <div className="text-4xl md:text-5xl font-bold text-orange mb-2">500+</div>
                 <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Destinations</div>
              </div>
              <div>
                 <div className="text-4xl md:text-5xl font-bold text-orange mb-2">24/7</div>
                 <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">AI Support</div>
              </div>
              <div>
                 <div className="text-4xl md:text-5xl font-bold text-orange mb-2">4.9</div>
                 <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">App Rating</div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};