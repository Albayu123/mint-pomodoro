
import React from 'react';
import type { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const handleChange = (key: keyof AppSettings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Application Settings</h2>
        <p className="text-gray-400">Tailor the focus experience to your specific workflow.</p>
      </div>

      <div className="space-y-8 bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            Timer Durations (minutes)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Work</label>
              <input
                type="number"
                value={settings.workDuration}
                onChange={(e) => handleChange('workDuration', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Short Break</label>
              <input
                type="number"
                value={settings.shortBreakDuration}
                onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Long Break</label>
              <input
                type="number"
                value={settings.longBreakDuration}
                onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-800" />

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            Automation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="text-gray-300 group-hover:text-white transition-colors">Auto-start Breaks</span>
              <div 
                onClick={() => handleChange('autoStartBreaks', !settings.autoStartBreaks)}
                className={`w-12 h-6 rounded-full transition-all relative ${settings.autoStartBreaks ? 'bg-green-500' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.autoStartBreaks ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="text-gray-300 group-hover:text-white transition-colors">Auto-start Pomodoros</span>
              <div 
                onClick={() => handleChange('autoStartPomodoros', !settings.autoStartPomodoros)}
                className={`w-12 h-6 rounded-full transition-all relative ${settings.autoStartPomodoros ? 'bg-green-500' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.autoStartPomodoros ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
