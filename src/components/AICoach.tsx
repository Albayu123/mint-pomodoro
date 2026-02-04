
import React, { useState, useEffect } from 'react';
import { getAIProductivityAdvice } from '../services/geminiService';
import { TimerMode } from '../types';
import type { Task } from '../types';

interface AICoachProps {
  tasks: Task[];
}

const AICoach: React.FC<AICoachProps> = ({ tasks }) => {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvice = async () => {
    setIsLoading(true);
    const result = await getAIProductivityAdvice(tasks, TimerMode.WORK);
    setAdvice(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 space-y-12 h-full flex flex-col justify-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-3xl p-10 text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tight">Your Performance Coach</h2>
          
          <div className="min-h-[100px] flex items-center justify-center">
            {isLoading ? (
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            ) : (
              <p className="text-xl text-gray-300 leading-relaxed italic">
                "{advice || "I'm ready to help you optimize your next focus session."}"
              </p>
            )}
          </div>

          <button
            onClick={fetchAdvice}
            disabled={isLoading}
            className="px-10 py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
          >
            Refresh Advice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
          <p className="text-xs text-green-500 font-bold uppercase tracking-widest mb-2">Pro Tip</p>
          <p className="text-gray-400 text-sm">Large tasks feel daunting. Break them into 2-pomodoro chunks for maximum efficiency.</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
          <p className="text-xs text-green-500 font-bold uppercase tracking-widest mb-2">Science</p>
          <p className="text-gray-400 text-sm">Deep work cycles of 90 minutes are ideal, but the 25/5 rhythm builds consistency for most.</p>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
