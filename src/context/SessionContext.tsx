import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { FocusSession } from '../types';

interface SessionContextType {
    sessions: FocusSession[];
    setSessions: (sessions: FocusSession[] | ((prev: FocusSession[]) => FocusSession[])) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sessions, setSessions] = useLocalStorage<FocusSession[]>('pomodoro_sessions', []);

    return (
        <SessionContext.Provider value={{ sessions, setSessions }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessions = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSessions must be used within a SessionProvider');
    }
    return context;
};
