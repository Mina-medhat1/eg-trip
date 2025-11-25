import React, { useEffect, useState } from "react";
import { ViewState } from "../types";
import { MapPin, Menu, X, Instagram, Facebook, Twitter, LogIn, ChevronRight, Sun, Moon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  setCurrentView: (view: ViewState) => void;
  currentView: ViewState;
  openAuthModal: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  setCurrentView,
  currentView,
  openAuthModal,
  isDarkMode,
  toggleTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLanding = currentView === ViewState.LANDING;
  
  // Navbar styles
  const navBg = isLanding && !scrolled ? "bg-transparent" : "bg-white dark:bg-navy/90 dark:backdrop-blur-md shadow-sm";
  const textColor = isLanding && !scrolled ? "text-white" : "text-navy dark:text-white";
  const iconColor = isLanding && !scrolled ? "text-white" : "text-gray-600 dark:text-gray-300";

  return (
    <div className="min-h-screen flex flex-col font-sans text-navy dark:text-white bg-white dark:bg-navy selection:bg-orange/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => setCurrentView(ViewState.LANDING)}
            >
              <div className="mr-2 p-1.5 bg-orange rounded-lg">
                 <MapPin className="h-5 w-5 text-white fill-current" />
              </div>
              <span className={`font-display font-bold text-xl tracking-tight ${textColor}`}>
                EGTrip
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              
              {/* Theme Toggle Switch */}
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
                  isLanding && !scrolled ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-3.5 h-3.5 text-navy" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-orange" />
                  )}
                </div>
              </button>

              <button
                onClick={openAuthModal}
                className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                  isLanding && !scrolled 
                    ? "text-white/80 hover:text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange"
                }`}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              
              <button
                onClick={openAuthModal}
                className="px-6 py-2.5 bg-orange hover:bg-orange-hover text-white text-sm font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange/30 flex items-center"
              >
                Start
                <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
               {/* Mobile Theme Toggle */}
               <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${isLanding && !scrolled ? 'bg-white/10 text-white' : 'bg-gray-100 dark:bg-slate-800 text-navy dark:text-white'}`}
                >
                  {isDarkMode ? <Moon className="w-4 h-4"/> : <Sun className="w-4 h-4"/>}
               </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${textColor}`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-navy absolute w-full border-t border-gray-100 dark:border-gray-800 shadow-xl top-full">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => {
                  openAuthModal();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange/5 hover:text-orange rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openAuthModal();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center px-4 py-3 text-base font-bold bg-orange text-white rounded-lg shadow-md"
              >
                Start Planning
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-navy border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                 <div className="mr-2 p-1.5 bg-orange rounded-lg">
                    <MapPin className="h-4 w-4 text-white fill-current" />
                 </div>
                <span className="font-display font-bold text-xl text-navy dark:text-white">EGTrip</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                The future of travel planning. Discover Egypt with the precision of AI and the warmth of local expertise.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange hover:text-white transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange hover:text-white transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-orange hover:text-white transition-all">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-navy dark:text-white mb-6">Company</h3>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-navy dark:text-white mb-6">Resources</h3>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange transition-colors">Travel Guides</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">AI Features</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-navy dark:text-white mb-6">Legal</h3>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} EGTrip. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for the future of tourism.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};