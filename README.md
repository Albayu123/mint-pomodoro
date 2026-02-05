# Mint Pomodoro

A beautiful, privacy-focused Pomodoro timer application built with **React**, **TypeScript**, and **Vite**. Designed to help you stay focused and productive without any distractions or privacy concerns.

![Mint Pomodoro](https://via.placeholder.com/800x400?text=Mint+Pomodoro+Preview)
_(Replace this placeholder with a real screenshot of your app)_

## Features

- **⏱️ Accurate Timer**: Powered by **Web Workers** to ensure accuracy even when the tab is inactive.
- **📱 PWA Support**: Installable as a native app on Desktop & Mobile with offline support.
- **🔔 System Notifications**: Native OS alerts when your focus session ends.
- **📝 Task Management**: Built-in task board to track your to-dos.
- **📊 Statistics**: Visualize your productivity with detailed usage stats.
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

   _Note: This will also set up Husky git hooks automatically._

3. **Run the app**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

### Quality Assurance

This project maintains high code quality standards:

- **Run Tests**:
  ```bash
  npm test
  ```
- **Linting & Formatting**:
  Code is automatically formatted (Prettier) and checked (ESLint) before every commit via **Husky**.

### Building for Production

To build the app for deployment (PWA ready):

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure (Clean Code)

This project follows Clean Code principles with a modular architecture:

- `src/components`: UI Components
- `src/workers`: Web Workers for background processing
- `src/context`: Global State Management
- `src/hooks`: Custom React Hooks
- `src/components/__tests__`: Unit tests
- `/.husky`: Git hooks configuration

## Troubleshooting

### Commit Failed (Lint/Husky Error)

If you encounter errors when committing:

1. Ensure all dependencies are installed: `npm install`
2. If Husky fails, try running: `npm run prepare`
3. Fix the reported lint errors or formatting issues.

## Contributing

Feel free to open issues or submit pull requests if you have ideas for improvements!

---

Built with ❤️ using React & Vite.
