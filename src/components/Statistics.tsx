
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TimerMode } from '../types';
import type { FocusSession } from '../types';

interface StatisticsProps {
  sessions: FocusSession[];
}

const Statistics: React.FC<StatisticsProps> = ({ sessions }) => {
  const totalFocusTime = sessions.reduce((acc, curr) =>
    curr.mode === TimerMode.WORK ? acc + curr.duration : acc, 0
  );

  const totalSessions = sessions.filter(s => s.mode === TimerMode.WORK).length;

  const todayFocusTime = sessions
    .filter(s => {
      const today = new Date().setHours(0, 0, 0, 0);
      return s.timestamp >= today && s.mode === TimerMode.WORK;
    })
    .reduce((acc, curr) => acc + curr.duration, 0);

  // Prepare data for chart
  const data = [
    { name: 'Focus', value: sessions.filter(s => s.mode === TimerMode.WORK).reduce((acc, curr) => acc + curr.duration, 0), color: '#4ade80' },
    { name: 'Short Break', value: sessions.filter(s => s.mode === TimerMode.SHORT_BREAK).reduce((acc, curr) => acc + curr.duration, 0), color: '#60a5fa' },
    { name: 'Long Break', value: sessions.filter(s => s.mode === TimerMode.LONG_BREAK).reduce((acc, curr) => acc + curr.duration, 0), color: '#c084fc' },
  ];

  const recentSessions = [...sessions].reverse().slice(0, 5);

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 h-full overflow-y-auto custom-scrollbar">
      <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Focus Time" value={formatDuration(totalFocusTime)} />
        <StatCard label="Total Sessions" value={totalSessions.toString()} />
        <StatCard label="Today's Focus" value={formatDuration(todayFocusTime)} highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-gray-800">
          <h3 className="text-lg font-bold text-gray-200 mb-6">Activity Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}m`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '12px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-gray-800 flex flex-col">
          <h3 className="text-lg font-bold text-gray-200 mb-6">Recent History</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
            {recentSessions.length > 0 ? (
              recentSessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{session.mode}</p>
                    <p className="text-xs text-gray-500">{new Date(session.timestamp).toLocaleDateString()}</p>
                  </div>
                  <span className="font-mono text-green-400 text-sm">
                    {Math.round(session.duration)}m
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No sessions recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className={`p-6 rounded-3xl border transition-all hover:scale-105 ${highlight
      ? 'bg-gradient-to-br from-green-500/20 to-emerald-900/20 border-green-500/30'
      : 'bg-[#1a1a1a] border-gray-800'
    }`}>
    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">{label}</p>
    <p className={`text-3xl font-black tracking-tight ${highlight ? 'text-green-400' : 'text-white'}`}>
      {value}
    </p>
  </div>
);

export default Statistics;
