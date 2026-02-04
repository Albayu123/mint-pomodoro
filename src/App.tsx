import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TimerDisplay from './components/TimerDisplay';
import TaskBoard from './components/TaskBoard';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import { SettingsProvider } from './context/SettingsContext';
import { TasksProvider } from './context/TasksContext';
import { SessionProvider, useSessions } from './context/SessionContext';
import { NavTabs } from './constants';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(NavTabs.TIMER);
  const { sessions } = useSessions();

  const renderContent = () => {
    switch (activeTab) {
      case NavTabs.TIMER: return <TimerDisplay />;
      case NavTabs.TASKS: return <TaskBoard />;
      case NavTabs.STATS: return <Statistics />;
      case NavTabs.SETTINGS: return <Settings />;
      default: return <TimerDisplay />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#121212] text-gray-200 overflow-hidden font-sans selection:bg-green-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto relative scroll-smooth pb-20 md:pb-0">
        <div className="h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent absolute top-0 left-0 right-0 z-50"></div>

        <div className="container mx-auto h-full">
          {renderContent()}
        </div>

        {sessions.length > 0 && activeTab === NavTabs.TIMER && (
          <div className="fixed bottom-24 md:bottom-8 right-8 max-w-xs animate-slide-up pointer-events-none z-40">
            {/* Toast Notification Area */}
          </div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <TasksProvider>
        <SessionProvider>
          <MainContent />
        </SessionProvider>
      </TasksProvider>
    </SettingsProvider>
  );
};

export default App;