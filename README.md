# Todo App — TypeScript + React

A complete, production-grade TypeScript Todo application.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server (Vite)        |
| `npm run build`   | Type-check + production build  |
| `npm run preview` | Preview the production build   |
| `npm run typecheck` | TypeScript type-check only   |

## 🗂 Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Top bar with stats & theme toggle
│   ├── AddTodo.tsx      # New task form with priority, tags, due date
│   ├── Toolbar.tsx      # Search, filter, sort, tag filter
│   ├── TodoList.tsx     # Renders the list of TodoItems
│   ├── TodoItem.tsx     # Individual task row (edit, toggle, delete, notes)
│   └── Footer.tsx       # Keyboard shortcut hints
├── hooks/
│   ├── useTodos.ts      # Main app hook (state + actions)
│   ├── useReducer.ts    # Pure reducer + initial state
│   ├── useLocalStorage.ts
│   └── useKeyboard.ts
├── types/
│   └── index.ts         # All shared TypeScript types
├── utils/
│   └── index.ts         # Helpers: sort, filter, date, storage
├── styles/
│   └── globals.css      # CSS variables, reset, dark/light themes
├── App.tsx
└── main.tsx
```

## 📖 Feature Documentation

For detailed information on the app's features, please refer to the files in the [`docs/features`](./docs/features) directory:
- [Data Persistence](./docs/features/data-persistence.md)
- [Organization](./docs/features/organization.md)
- [Search and Filtering](./docs/features/search-and-filtering.md)
- [Sorting](./docs/features/sorting.md)
- [Statistics](./docs/features/statistics.md)
- [Task Life Cycle](./docs/features/task-life-cycle.md)
- [Task Metadata](./docs/features/task-metadata.md)

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

## 🛠 Tech Stack

- **React 18** — UI framework
- **TypeScript 5** — strict type safety
- **Vite 5** — dev server & bundler
- No external UI libraries — pure CSS variables

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save new task | `Enter` |
| Edit task | Double-click |
| Confirm edit | `Enter` |
| Cancel edit | `Escape` |
| Toggle checkbox | `Space` (when focused) |
