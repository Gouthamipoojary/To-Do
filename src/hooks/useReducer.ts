import type { AppAction, AppState } from "@/types";
import { generateId, now } from "@/utils";

export const initialState: AppState = {
  todos: [
    {
      id: generateId(),
      text: "Welcome! Double-click any task to edit it",
      completed: false,
      priority: "high",
      tags: [],
      dueDate: null,
      notes: "",
      createdAt: now(),
      updatedAt: now(),
      completedAt: null,
    },
    {
      id: generateId(),
      text: "Try adding tags and due dates",
      completed: false,
      priority: "medium",
      tags: [],
      dueDate: null,
      notes: "",
      createdAt: now(),
      updatedAt: now(),
      completedAt: null,
    },
    {
      id: generateId(),
      text: "Explore sorting and filtering options",
      completed: true,
      priority: "low",
      tags: [],
      dueDate: null,
      notes: "",
      createdAt: now(),
      updatedAt: now(),
      completedAt: now(),
    },
  ],
  tags: [
    { id: generateId(), label: "Work",     color: "#6366f1" },
    { id: generateId(), label: "Personal", color: "#10b981" },
    { id: generateId(), label: "Urgent",   color: "#ef4444" },
  ],
  filter: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
  searchQuery: "",
  theme: "dark",
  selectedTagId: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          {
            ...action.payload,
            id: generateId(),
            createdAt: now(),
            updatedAt: now(),
            completedAt: null,
          },
          ...state.todos,
        ],
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.changes, updatedAt: now() }
            : t
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? now() : null,
                updatedAt: now(),
              }
            : t
        ),
      };

    case "REORDER_TODOS":
      return { ...state, todos: action.payload.todos };

    case "CLEAR_COMPLETED":
      return { ...state, todos: state.todos.filter((t) => !t.completed) };

    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, { ...action.payload, id: generateId() }],
      };

    case "DELETE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload.id),
        todos: state.todos.map((t) => ({
          ...t,
          tags: t.tags.filter((tid) => tid !== action.payload.id),
        })),
        selectedTagId:
          state.selectedTagId === action.payload.id ? null : state.selectedTagId,
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "SET_SELECTED_TAG":
      return { ...state, selectedTagId: action.payload };

    default:
      return state;
  }
}
