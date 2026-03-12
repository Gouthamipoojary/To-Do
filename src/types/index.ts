// ─── Core Domain Types ────────────────────────────────────────────────────────

export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "completed";
export type SortBy = "createdAt" | "priority" | "alphabetical" | "dueDate";
export type SortOrder = "asc" | "desc";
export type Theme = "dark" | "light";

export interface Tag {
  id: string;
  label: string;
  color: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  tags: string[]; // tag ids
  dueDate: string | null; // ISO date string
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  completedAt: string | null;
}

// ─── State Types ──────────────────────────────────────────────────────────────

export interface AppState {
  todos: Todo[];
  tags: Tag[];
  filter: Filter;
  sortBy: SortBy;
  sortOrder: SortOrder;
  searchQuery: string;
  theme: Theme;
  selectedTagId: string | null;
}

// ─── Action Types ─────────────────────────────────────────────────────────────

export type AppAction =
  | { type: "ADD_TODO"; payload: Omit<Todo, "id" | "createdAt" | "updatedAt" | "completedAt"> }
  | { type: "UPDATE_TODO"; payload: { id: string; changes: Partial<Omit<Todo, "id" | "createdAt"> > } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "REORDER_TODOS"; payload: { todos: Todo[] } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "ADD_TAG"; payload: Omit<Tag, "id"> }
  | { type: "DELETE_TAG"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: Filter }
  | { type: "SET_SORT"; payload: { sortBy: SortBy; sortOrder: SortOrder } }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_SELECTED_TAG"; payload: string | null };

// ─── UI / Helper Types ────────────────────────────────────────────────────────

export interface PriorityConfig {
  label: string;
  color: string;
  bg: string;
}

export interface Stats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
  completionRate: number;
}
