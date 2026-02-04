import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TimerDisplay from './components/TimerDisplay';
import TaskBoard from './components/TaskBoard';
import Statistics from './components/Statistics';
import AICoach from './components/AICoach';
import Settings from './components/Settings';
import { TimerMode } from './types';
import type { Task, FocusSession, AppSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timer');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('pomodoro_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomodoro_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [sessions, setSessions] = useState<FocusSession[]>(() => {
    const saved = localStorage.getItem('pomodoro_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pomodoro_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('pomodoro_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSessionComplete = (mode: TimerMode, duration: number) => {
    const newSession: FocusSession = {
      timestamp: Date.now(),
      duration,
      mode,
    };
    setSessions((prev) => [...prev, newSession]);

    if (mode === TimerMode.WORK) {
      setTasks(prev => {
        const firstActiveIdx = prev.findIndex(t => !t.completed);
        if (firstActiveIdx !== -1) {
          const newTasks = [...prev];
          newTasks[firstActiveIdx] = { 
            ...newTasks[firstActiveIdx], 
            pomodoros: newTasks[firstActiveIdx].pomodoros + 1 
          };
          return newTasks;
        }
        return prev;
      });
    }

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(() => {});
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'timer': return <TimerDisplay settings={settings} onSessionComplete={handleSessionComplete} />;
      case 'tasks': return <TaskBoard tasks={tasks} setTasks={setTasks} />;
      case 'stats': return <Statistics sessions={sessions} />;
      case 'coach': return <AICoach tasks={tasks} />;
      case 'settings': return <Settings settings={settings} setSettings={setSettings} />;
      default: return <TimerDisplay settings={settings} onSessionComplete={handleSessionComplete} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-gray-200 overflow-hidden font-sans selection:bg-green-500/30">
      {/* Sidebar HANYA menerima activeTab dan setActiveTab */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        <div className="h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent absolute top-0 left-0 right-0 z-50"></div>
        
        <div className="container mx-auto h-full">
          {renderContent()}
        </div>

        {sessions.length > 0 && activeTab === 'timer' && (
          <div className="fixed bottom-8 right-8 max-w-xs animate-slide-up">
            <div className="bg-[#1a1a1a] border border-green-500/20 rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Session Saved</p>
                <p className="text-sm text-gray-300">Great job! Your performance has been logged.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;