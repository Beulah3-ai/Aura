
import React, { useState, useEffect, useCallback } from 'react';
import { Mood, Goal, ChatMessage, HealthData } from './types';
import Dashboard from './components/Dashboard';
import SuccessCoach from './components/SuccessCoach';
import VideoCall from './components/VideoCall';
import CommunityFeed from './components/CommunityFeed';

type Tab = 'dashboard' | 'coach' | 'video' | 'community';

const moodThemes: Record<Mood, string> = {
  [Mood.Happy]: 'bg-gradient-to-br from-happy-start to-happy-end',
  [Mood.Calm]: 'bg-gradient-to-br from-calm-start to-calm-end',
  [Mood.Focused]: 'bg-gradient-to-br from-focused-start to-focused-end',
  [Mood.Sad]: 'bg-gradient-to-br from-sad-start to-sad-end',
  [Mood.Stressed]: 'bg-gradient-to-br from-stressed-start to-stressed-end',
};

const App: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<Mood>(Mood.Calm);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [healthData, setHealthData] = useState<HealthData>({ sleep: 8, water: 8, exercise: 30 });
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your AI Success Coach. How can I help you be your best self today?" }
  ]);

  const addGoal = (text: string) => {
    const newGoal: Goal = { id: Date.now(), text, completed: false };
    setGoals(prev => [...prev, newGoal]);
    const newMessage: ChatMessage = { role: 'model', content: `Great goal! I've added "${text}" to your list. You can do it!` };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const toggleGoal = (id: number) => {
    let goalText = '';
    const newGoals = goals.map(goal => {
      if (goal.id === id) {
        goalText = goal.text;
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    });
    setGoals(newGoals);

    const toggledGoal = newGoals.find(g => g.id === id);
    if (toggledGoal?.completed) {
      const newMessage: ChatMessage = { role: 'model', content: `Amazing! You completed your goal: "${goalText}". Let's celebrate this win!` };
      setChatHistory(prev => [...prev, newMessage]);
    }
  };

  const updateHealthData = <K extends keyof HealthData>(key: K, value: HealthData[K]) => {
    setHealthData(prev => ({ ...prev, [key]: value }));
  };

  const navItems: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'coach', label: 'AI Coach' },
    { id: 'video', label: 'Reflection' },
    { id: 'community', label: 'Community' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          currentMood={currentMood} 
          setMood={setCurrentMood}
          goals={goals}
          addGoal={addGoal}
          toggleGoal={toggleGoal}
          healthData={healthData}
          updateHealthData={updateHealthData}
        />;
      case 'coach':
        return <SuccessCoach chatHistory={chatHistory} setChatHistory={setChatHistory} />;
      case 'video':
        return <VideoCall />;
      case 'community':
        return <CommunityFeed />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen text-white font-sans transition-all duration-1000 ${moodThemes[currentMood]}`}>
       <div className="absolute inset-0 bg-black/20 z-0"></div>
       {currentMood === Mood.Happy && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sun-pattern.png')] opacity-10 animate-bloom"></div>}
       {currentMood === Mood.Calm && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] opacity-10"></div>}
       
       <main className="relative z-10 max-w-7xl mx-auto p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-wider">AuraGenie</h1>
          <nav className="bg-white/10 backdrop-blur-sm p-1 rounded-full shadow-md">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === item.id ? 'bg-white/30' : 'hover:bg-white/20'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>
        <div className="mt-4">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
