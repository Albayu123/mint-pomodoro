import React from 'react';
import { Icons, NavTabs } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: NavTabs.TIMER, icon: <Icons.Timer />, label: 'Focus' },
    { id: NavTabs.TASKS, icon: <Icons.CheckList />, label: 'Tasks' },
    { id: NavTabs.STATS, icon: <Icons.Stats />, label: 'Stats' },
    { id: NavTabs.SETTINGS, icon: <Icons.Settings />, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1a1a1a] border-r border-gray-800 flex-col h-screen transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl mint-gradient flex items-center justify-center shadow-lg shadow-green-500/20">
            <span className="text-black font-bold text-xl">M</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            MintPomodoro
          </h1>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                  ? 'bg-gray-800 text-green-400 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'
                }`}
            >
              <div className={`${activeTab === item.id ? 'text-green-400' : 'group-hover:text-gray-300'}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Build Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300 font-mono">v1.3.1-responsive</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-gray-800 z-50 pb-safe">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 p-2 w-full active:scale-95 transition-transform"
            >
              <div className={`p-1.5 rounded-xl transition-colors ${activeTab === item.id ? 'bg-green-500/10 text-green-400' : 'text-gray-500'
                }`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${activeTab === item.id ? 'text-green-400' : 'text-gray-500'
                }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
