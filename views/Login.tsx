import React, { useState } from "react";
import { ViewState } from "../types";
import { MapPin, Mail, Lock, ArrowLeft } from "lucide-react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539650116455-251d9a0d630a?w=1920&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Glassmorphism Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-orange text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange/30">
              <MapPin className="h-6 w-6 fill-current" />
            </div>
            <h2 className="font-display font-bold text-3xl text-navy">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-2">Sign in to access your futuristic itinerary.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
             <button
              type="button"
              onClick={onLoginSuccess}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center">
               <div className="absolute w-full border-t border-gray-300"></div>
               <span className="relative bg-white/50 px-3 text-xs text-gray-500 uppercase">Or</span>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all backdrop-blur-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all backdrop-blur-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center"
            >
              {isLoading ? (
                <span className="animate-pulse">Accessing System...</span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            New to EGTrip?{" "}
            <button className="text-orange font-bold hover:underline">
              Create an account
            </button>
          </p>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-white/60 text-xs">Protected by Quantum Encryption v.2.4</p>
        </div>
      </div>
    </div>
  );
};