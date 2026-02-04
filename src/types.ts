
export const TimerMode = {
  WORK: 'Work',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break'
} as const;

export type TimerMode = typeof TimerMode[keyof typeof TimerMode];

export const TimerStatus = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED'
} as const;

export type TimerStatus = typeof TimerStatus[keyof typeof TimerStatus];

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  expectedPomodoros: number;
  createdAt: number;
}

export interface FocusSession {
  timestamp: number;
  duration: number; // in minutes
  mode: TimerMode;
}

export interface AppSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}
