import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { AuthModal } from "./components/AuthModal";
import { Landing } from "./views/Landing";
import { PlannerForm } from "./views/PlannerForm";
import { TripResult } from "./views/TripResult";
import { ViewState, TripPlan } from "./types";
import { ChatBot } from "./components/ChatBot";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Dark Mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLoginSuccess = () => {
    // In a real app, you would save auth token here.
    // Redirect to planner after login success
    setIsAuthModalOpen(false);
    setCurrentView(ViewState.PLANNER_FORM);
  };

  const handlePlanGenerated = (plan: TripPlan) => {
    setGeneratedPlan(plan);
    setCurrentView(ViewState.TRIP_RESULT);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LANDING:
        return (
          <Landing 
            onNavigate={setCurrentView} 
            onOpenAuth={() => setIsAuthModalOpen(true)} 
          />
        );
      case ViewState.PLANNER_FORM:
        return <PlannerForm onPlanGenerated={handlePlanGenerated} />;
      case ViewState.TRIP_RESULT:
        return generatedPlan ? (
          <TripResult plan={generatedPlan} />
        ) : (
          <PlannerForm onPlanGenerated={handlePlanGenerated} />
        );
      default:
        return (
          <Landing 
            onNavigate={setCurrentView} 
            onOpenAuth={() => setIsAuthModalOpen(true)} 
          />
        );
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      openAuthModal={() => setIsAuthModalOpen(true)}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    >
      {renderView()}
      
      {/* Global ChatBot */}
      <ChatBot />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Layout>
  );
};

export default App;