import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimerDisplay from '../TimerDisplay';
// Mock necessary contexts
import { SettingsProvider } from '../../context/SettingsContext';
import { SessionProvider } from '../../context/SessionContext';
import { TasksProvider } from '../../context/TasksContext';

// Mocks are handled in src/test/setup.ts

describe('TimerDisplay', () => {
  it('renders correctly', () => {
    render(
      <SettingsProvider>
        <TasksProvider>
          <SessionProvider>
            <TimerDisplay />
          </SessionProvider>
        </TasksProvider>
      </SettingsProvider>
    );

    // Check if initial time is displayed (default 25:00)
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });
});
