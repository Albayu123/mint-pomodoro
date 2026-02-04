# Mint Pomodoro

A beautiful, privacy-focused Pomodoro timer application built with **React**, **TypeScript**, and **Vite**. Designed to help you stay focused and productive without any distractions or privacy concerns.

![Mint Pomodoro](https://via.placeholder.com/800x400?text=Mint+Pomodoro+Preview)
*(Replace this placeholder with a real screenshot of your app)*

## Features

- **⏱️ Focus Timer**: Customizable Pomodoro timer with Work, Short Break, and Long Break modes.
- **📝 Task Management**: Built-in task board to track your to-dos.
- **📊 Statistics**: Visualize your productivity with detailed usage stats.
- **📱 Fully Responsive**: Optimized for both Desktop and Mobile devices.
- **🎨 Modern Design**: Sleek, dark-themed UI with mint accents and smooth animations.
- **🔒 Privacy First**: All data is stored locally. No external servers, **no API keys**, and no tracking.

## Getting Started (Zero Config)

This project is designed to be "Clone & Run". No complex configuration or API keys are required.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Quick Start Guide

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd mint-pomodoro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser. That's it!

### Building for Production
To build the app for deployment (e.g., Netlify/Vercel):
```bash
npm run build
```

## Project Structure (Clean Code)

This project follows Clean Code principles with a modular architecture:

- `src/components`: UI Components (TimerDisplay, TaskBoard, etc.)
- `src/context`: Global State Management preventing prop drilling (Settings, Tasks, Session)
- `src/hooks`: Custom React Hooks (useAudio, useLocalStorage)
- `src/constants`: Configuration and static values
- `src/types`: TypeScript definitions

## Contributing

Feel free to open issues or submit pull requests if you have ideas for improvements!

---

Built with ❤️ using React & Vite.
