
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerStatus } from '../types';
import type { AppSettings } from '../types';
import { Icons } from '../constants';

interface TimerDisplayProps {
  settings: AppSettings;
  onSessionComplete: (mode: TimerMode, duration: number) => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ settings, onSessionComplete }) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getDurationForMode = useCallback((m: TimerMode) => {
    switch (m) {
      case TimerMode.WORK: return settings.workDuration * 60;
      case TimerMode.SHORT_BREAK: return settings.shortBreakDuration * 60;
      case TimerMode.LONG_BREAK: return settings.longBreakDuration * 60;
      default: return settings.workDuration * 60;
    }
  }, [settings]);

  useEffect(() => {
    if (status === TimerStatus.IDLE) {
      setTimeLeft(getDurationForMode(mode));
    }
  }, [mode, status, getDurationForMode]);

  const toggleTimer = () => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setStatus(TimerStatus.RUNNING);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus(TimerStatus.IDLE);
    setTimeLeft(getDurationForMode(mode));
  };

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            onSessionComplete(mode, getDurationForMode(mode) / 60);
            
            if (mode === TimerMode.WORK) {
              setMode(TimerMode.SHORT_BREAK);
              if (!settings.autoStartBreaks) setStatus(TimerStatus.IDLE);
            } else {
              setMode(TimerMode.WORK);
              if (!settings.autoStartPomodoros) setStatus(TimerStatus.IDLE);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, mode, settings, onSessionComplete, getDurationForMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / getDurationForMode(mode)) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto py-12">
      <div className="flex bg-gray-900/50 p-1 rounded-2xl border border-gray-800 mb-12">
        {Object.values(TimerMode).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setStatus(TimerStatus.IDLE); }}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === m 
                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-800" />
          <circle
            cx="50%" cy="50%" r="48%" fill="none" stroke="url(#timerGradient)" strokeWidth="8"
            strokeDasharray="100 100" strokeDashoffset={100 - progress} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="text-center z-10">
          <h2 className="text-7xl md:text-8xl font-black tracking-tighter text-white tabular-nums drop-shadow-2xl">
            {formatTime(timeLeft)}
          </h2>
          <p className="text-gray-400 font-medium uppercase tracking-[0.2em] mt-2">
            {status === TimerStatus.RUNNING ? 'Focusing...' : 'Ready?'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-16">
        <button
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all border border-gray-700/50"
        >
          <Icons.Reset />
        </button>
        <button
          onClick={toggleTimer}
          className="w-24 h-24 rounded-full mint-gradient text-black flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          {status === TimerStatus.RUNNING ? <Icons.Pause /> : <Icons.Play />}
        </button>
        <div className="w-14" />
      </div>
    </div>
  );
};

export default TimerDisplay;
