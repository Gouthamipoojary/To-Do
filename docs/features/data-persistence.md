# Feature: Data Persistence

The application ensures that user data is saved across browser sessions.

## 1. Local Storage Sync
- **Mechanism**: The state is automatically serialized to JSON and stored in the browser's `localStorage` under the key `todo-app-state`.
- **Sync Timing**: Persistence is triggered via a `useEffect` hook in `useTodos.ts` whenever the state changes.

## 2. Default State
- On the first load, if no data is found in `localStorage`, the application initializes with a predefined `initialState` (usually empty todos and tags).
