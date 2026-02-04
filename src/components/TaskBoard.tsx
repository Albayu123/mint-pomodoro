import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { Icons } from '../constants';
import type { Task } from '../types';

const TaskBoard: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [estPomodoros, setEstPomodoros] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      completed: false,
      pomodoros: 0,
      expectedPomodoros: estPomodoros,
      createdAt: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setEstPomodoros(1);
    setIsAdding(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Tasks</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            {activeTasks.length} active • {completedTasks.length} completed
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-full md:w-auto px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="text-xl leading-none">+</span>
          Add Task
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddTask} className="mb-6 md:mb-8 bg-[#1a1a1a] p-4 md:p-6 rounded-2xl border border-green-500/20 animate-fade-in shadow-xl shadow-green-900/10">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">What are you working on?</label>
              <input
                autoFocus
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g., Redesign landing page"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-600"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Est. Pomodoros
                  <span className="ml-2 text-xs text-gray-500">({estPomodoros * 25} mins)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={estPomodoros}
                  onChange={(e) => setEstPomodoros(parseInt(e.target.value) || 1)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 md:flex-none px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="flex-1 md:flex-none px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar pb-20 md:pb-0">
        {tasks.length === 0 ? (
          <div className="text-center py-10 md:py-20 opacity-50">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
              <Icons.CheckList />
            </div>
            <p className="text-lg md:text-xl font-medium text-gray-400">No tasks yet</p>
            <p className="text-sm md:text-base text-gray-500">Get started by adding a task above</p>
          </div>
        ) : (
          <>
            {activeTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
            ))}

            {completedTasks.length > 0 && (
              <>
                <div className="h-px bg-gray-800 my-6" />
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Completed</h3>
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TaskItem: React.FC<{ task: Task; onToggle: () => void; onDelete: () => void }> = ({ task, onToggle, onDelete }) => (
  <div className={`group bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] border border-gray-800/50 hover:border-gray-700 p-4 rounded-xl transition-all flex items-center gap-4 ${task.completed ? 'opacity-50' : ''}`}>
    <button
      onClick={onToggle}
      title="Toggle Task"
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-green-500'
        }`}
    >
      {task.completed && <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>}
    </button>

    <div className="flex-1 min-w-0">
      <h3 className={`font-medium truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
        {task.title}
      </h3>
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
          <span className={`${task.pomodoros >= task.expectedPomodoros ? 'text-orange-400' : ''}`}>
            {task.pomodoros}/{task.expectedPomodoros}
          </span>
          <span className="uppercase tracking-wider">Pomodoros</span>
        </div>
      </div>
    </div>

    <button
      onClick={onDelete}
      className="text-gray-600 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 md:opacity-0 md:group-hover:opacity-100 transition-all opacity-100"
      aria-label="Delete Task"
    >
      <Icons.Trash />
    </button>
  </div >
);

export default TaskBoard;
