# Todo App — TypeScript + React

A complete, production-grade TypeScript Todo application.

## 📝 Project Overview

This project is a robust To-Do application built with TypeScript and React. It's designed to be a production-ready tool, offering a comprehensive set of features for managing tasks efficiently. The application leverages modern web development practices and tools to provide a smooth and reliable user experience.

## ✨ Features

- ✅ Add / edit (double-click) / delete tasks
- 🔴🟡⚫ Priority levels (High / Medium / Low)
- 🏷 Custom tags with colour coding
- 📅 Due dates with overdue highlighting
- 📝 Per-task notes
- 🔍 Real-time search
- 🔃 Sort by date, priority, A–Z, or due date
- 🌗 Dark / Light theme (persisted)
- 💾 All data saved to `localStorage`
- 📊 Live stats: total, completed, overdue, % done

## 🚀 Getting Started & Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    This will start the Vite development server. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 🛠 Tech Stack

-   **React 18** — UI framework
-   **TypeScript 5** — strict type safety
-   **Vite 5** — dev server & bundler
-   Pure CSS variables for styling — no external UI libraries

## 🗂 Code Structure

The project follows a clean and organized structure:

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx       # Top bar with stats & theme toggle
│   ├── AddTodo.tsx      # New task form with priority, tags, due date
│   ├── Toolbar.tsx      # Search, filter, sort, tag filter
│   ├── TodoList.tsx     # Renders the list of TodoItems
│   ├── TodoItem.tsx     # Individual task row (edit, toggle, delete, notes)
│   └── Footer.tsx       # Keyboard shortcut hints
├── hooks/              # Custom React hooks
│   ├── useTodos.ts      # Main app hook (state + actions)
│   ├── useReducer.ts    # Pure reducer + initial state
│   ├── useLocalStorage.ts # Hook for local storage persistence
│   └── useKeyboard.ts   # Hook for managing keyboard shortcuts
├── types/              # TypeScript type definitions
│   └── index.ts         # All shared TypeScript types
├── utils/              # Utility functions
│   └── index.ts         # Helpers: sort, filter, date, storage
├── styles/             # Global styles
│   └── globals.css      # CSS variables, reset, dark/light themes
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## ⌨️ Keyboard Shortcuts

Navigate and control the application with these shortcuts:

| Action            | Shortcut         |
|-------------------|------------------|
| Save new task     | `Enter`          |
| Edit task         | Double-click     |
| Confirm edit      | `Enter`          |
| Cancel edit       | `Escape`         |
| Toggle checkbox   | `Space` (focused)|

## 🤝 Contributing

Contributions are welcome! Please refer to the `CONTRIBUTING.md` file (to be created) for detailed guidelines on how to contribute to this project.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
