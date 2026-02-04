
import { GoogleGenAI } from "@google/genai";
import type { Task, TimerMode } from "../types";

export const getAIProductivityAdvice = async (tasks: Task[], currentMode: TimerMode) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const taskSummary = tasks.length > 0 
    ? tasks.map(t => `- ${t.title} (${t.completed ? 'Done' : 'Pending'})`).join('\n')
    : "No tasks listed yet.";

  const prompt = `
    You are an expert productivity coach. 
    Current state: User is in "${currentMode}" mode.
    Tasks list:
    ${taskSummary}
    
    Give a very short, punchy, and motivational tip (max 2 sentences) for the user to stay focused or make the most of their break. 
    If they have no tasks, encourage them to define one clear goal.
    Style: Professional but encouraging, like a high-end Linux performance tool.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    return response.text || "Keep pushing! Your potential is unlimited.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Focus on the small wins. One task at a time.";
  }
};

export const getSessionReflection = async (completedTasks: Task[], sessionDuration: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const summary = completedTasks.map(t => t.title).join(', ');
  
  const prompt = `
    The user just finished a ${sessionDuration} minute focus session.
    They worked on: ${summary || "various tasks"}.
    Write a brief "performance review" comment that acknowledges their effort and suggests one tiny improvement for the next session.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return response.text || "Great session! Ready for another?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Solid work. Take a breather.";
  }
};
