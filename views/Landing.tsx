import React, { useEffect, useState } from "react";
import { ViewState } from "../types";
import { READY_MADE_PLANS, TESTIMONIALS, HOW_IT_WORKS } from "../constants";
import { MapPin, ArrowRight, Star, Mouse, Cpu, Zap, Sparkles, ChevronRight, FileText, CheckCircle, Plane } from "lucide-react";
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
              onClick={() => document.getElementById("ready-plans")?.scrollIntoView({ behavior: "smooth" })}
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
                Travel Planning <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange">from the Future</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                Our quantum-inspired AI engine constructs the perfect Egyptian odyssey in milliseconds.
              </p>
              <button onClick={onOpenAuth} className="px-8 py-4 bg-transparent border border-orange/50 text-orange font-mono uppercase tracking-widest hover:bg-orange hover:text-white transition-all">
                Initialize Planner <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>


          </div>
        </div>
      </section>

      {/* 4. READY MADE PLANS */}
      <section id="ready-plans" className="py-24 bg-white dark:bg-navy transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-white mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {READY_MADE_PLANS.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                <img src={plan.imageUrl} alt={plan.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-navy dark:text-white">{plan.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                  <button onClick={onOpenAuth} className="text-orange font-bold flex items-center">
                    View Plan <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};