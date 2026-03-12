import type { Priority, PriorityConfig, SortBy, SortOrder, Stats, Todo } from "@/types";

// ─── Priority ─────────────────────────────────────────────────────────────────

export const PRIORITY_CONFIG: Record<Priority, PriorityConfig> = {
  high:   { label: "HIGH",   color: "#ef4444", bg: "rgba(239,68,68,0.1)"  },
  medium: { label: "MED",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  low:    { label: "LOW",    color: "#6b7280", bg: "rgba(107,114,128,0.1)"},
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 3, medium: 2, low: 1,
};

// ─── Date helpers ─────────────────────────────────────────────────────────────

export function now(): string {
  return new Date().toISOString();
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function isOverdue(todo: Todo): boolean {
  if (!todo.dueDate || todo.completed) return false;
  return new Date(todo.dueDate) < new Date(new Date().toDateString());
}

export function isDueToday(todo: Todo): boolean {
  if (!todo.dueDate || todo.completed) return false;
  const due = new Date(todo.dueDate).toDateString();
  const today = new Date().toDateString();
  return due === today;
}

// ─── Filtering & Sorting ──────────────────────────────────────────────────────

export function filterTodos(
  todos: Todo[],
  filter: "all" | "active" | "completed",
  searchQuery: string,
  selectedTagId: string | null,
): Todo[] {
  return todos.filter((t) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !t.completed) ||
      (filter === "completed" && t.completed);

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      t.text.toLowerCase().includes(q) ||
      t.notes.toLowerCase().includes(q);

    const matchesTag = !selectedTagId || t.tags.includes(selectedTagId);

    return matchesFilter && matchesSearch && matchesTag;
  });
}

export function sortTodos(
  todos: Todo[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): Todo[] {
  const sorted = [...todos].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      case "alphabetical":
        return a.text.localeCompare(b.text);
      case "dueDate": {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      case "createdAt":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  return sortOrder === "asc" ? sorted : sortOrder === "desc" && sortBy !== "createdAt" ? sorted.reverse() : sorted;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export function computeStats(todos: Todo[]): Stats {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const overdue = todos.filter(isOverdue).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, active, overdue, completionRate };
}

// ─── Local Storage ────────────────────────────────────────────────────────────

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

// ─── ID generation ────────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Tag colours ──────────────────────────────────────────────────────────────

export const TAG_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
  "#f59e0b", "#10b981", "#06b6d4", "#3b82f6",
];
