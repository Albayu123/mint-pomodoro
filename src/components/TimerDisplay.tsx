import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSessions } from '../context/SessionContext';
import { useTasks } from '../context/TasksContext';
import { useAudio } from '../hooks/useAudio';
import { AUDIO_URL, Icons } from '../constants';
import { TimerMode, TimerStatus } from '../types';
import type { FocusSession } from '../types';

const TimerDisplay: React.FC = () => {
  const { settings } = useSettings();
  const { setSessions } = useSessions();
  const { setTasks } = useTasks();
  const { play } = useAudio(AUDIO_URL);

  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('../workers/timer.worker.ts', import.meta.url), {
      type: 'module',
    });

    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'TICK') {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete(mode, getDurationForMode(mode) / 60);

            if (mode === TimerMode.WORK) {
              setMode(TimerMode.SHORT_BREAK);
              if (!settings.autoStartBreaks) {
                setStatus(TimerStatus.IDLE);
                workerRef.current?.postMessage({ type: 'STOP' });
              }
            } else {
              setMode(TimerMode.WORK);
              if (!settings.autoStartPomodoros) {
                setStatus(TimerStatus.IDLE);
                workerRef.current?.postMessage({ type: 'STOP' });
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, settings.autoStartBreaks, settings.autoStartPomodoros]);
  
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
      workerRef.current?.postMessage({ type: 'STOP' });
    } else if (status === TimerStatus.RUNNING) {
      workerRef.current?.postMessage({ type: 'START' });
    } else if (status === TimerStatus.PAUSED) {
      workerRef.current?.postMessage({ type: 'STOP' });
    }
  }, [mode, status, getDurationForMode]);

  const handleSessionComplete = (completedMode: TimerMode, duration: number) => {
    const newSession: FocusSession = {
      timestamp: Date.now(),
      duration,
      mode: completedMode,
    };
    setSessions((prev) => [...prev, newSession]);

    if (completedMode === TimerMode.WORK) {
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

    play();
  };

  const toggleTimer = () => {
    if (status === TimerStatus.RUNNING) {
      setStatus(TimerStatus.PAUSED);
      workerRef.current?.postMessage({ type: 'STOP' });
    } else {
      setStatus(TimerStatus.RUNNING);
      workerRef.current?.postMessage({ type: 'START' });
    }
  };

  const resetTimer = () => {
    workerRef.current?.postMessage({ type: 'STOP' });
    setStatus(TimerStatus.IDLE);
    setTimeLeft(getDurationForMode(mode));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / getDurationForMode(mode)) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto py-8 md:py-12 px-4">
      {/* Mode Selector */}
      <div className="flex bg-gray-900/50 p-1 rounded-2xl border border-gray-800 mb-8 md:mb-12 w-full max-w-xs justify-between">
        {Object.values(TimerMode).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setStatus(TimerStatus.IDLE); }}
            className={`flex-1 px-2 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 truncate ${mode === m
                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="relative w-[70vw] h-[70vw] max-w-[18rem] max-h-[18rem] md:w-96 md:h-96 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-800" />
          <circle
            cx="50%" cy="50%" r="48%" fill="none" stroke="url(#timerGradient)" strokeWidth="6"
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
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white tabular-nums drop-shadow-2xl">
            {formatTime(timeLeft)}
          </h2>
          <p className="text-gray-400 font-medium uppercase tracking-[0.2em] mt-2 text-xs md:text-base">
            {status === TimerStatus.RUNNING ? 'Focusing...' : 'Ready?'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8 md:mt-16">
        <button
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all border border-gray-700/50 active:scale-95"
          aria-label="Reset Timer"
        >
          <Icons.Reset />
        </button>
        <button
          onClick={toggleTimer}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mint-gradient text-black flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-105 active:scale-95 transition-all"
          aria-label={status === TimerStatus.RUNNING ? 'Pause Timer' : 'Start Timer'}
        >
          {status === TimerStatus.RUNNING ? <Icons.Pause /> : <Icons.Play />}
        </button>
        <div className="w-14 hidden md:block" /> {/* Spacer for symmetry on desktop */}
      </div>
    </div>
  );
};

export default TimerDisplay;
