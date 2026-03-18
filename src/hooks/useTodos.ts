import { useReducer, useEffect, useMemo } from "react";
import { appReducer, initialState } from "./useReducer";
import type { AppState, Filter, SortBy, SortOrder, Theme, Todo, Tag } from "@/types";
import { filterTodos, sortTodos, computeStats, loadFromStorage, saveToStorage } from "@/utils";

const STORAGE_KEY = "todo-app-state";

export function useTodos() {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    () => loadFromStorage<AppState>(STORAGE_KEY, initialState)
  );

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, state);
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  // Derived: filtered + sorted todos
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(
      state.todos,
      state.filter,
      state.selectedTagId
    );
    return sortTodos(filtered, state.sortBy, state.sortOrder);
  }, [state.todos, state.filter, state.selectedTagId, state.sortBy, state.sortOrder]);

  const stats = useMemo(() => computeStats(state.todos), [state.todos]);

  // ─── Actions ────────────────────────────────────────────────────────────────

  function addTodo(payload: Omit<Todo, "id" | "createdAt" | "updatedAt" | "completedAt">) {
    dispatch({ type: "ADD_TODO", payload });
  }

  function updateTodo(id: string, changes: Partial<Omit<Todo, "id" | "createdAt">>) {
    dispatch({ type: "UPDATE_TODO", payload: { id, changes } });
  }

  function deleteTodo(id: string) {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }

  function toggleTodo(id: string) {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }

  function clearCompleted() {
    dispatch({ type: "CLEAR_COMPLETED" });
  }

  function addTag(tag: Omit<Tag, "id">) {
    dispatch({ type: "ADD_TAG", payload: tag });
  }

  function deleteTag(id: string) {
    dispatch({ type: "DELETE_TAG", payload: { id } });
  }

  function setFilter(filter: Filter) {
    dispatch({ type: "SET_FILTER", payload: filter });
  }

  function setSort(sortBy: SortBy, sortOrder: SortOrder) {
    dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } });
  }



  function setTheme(theme: Theme) {
    dispatch({ type: "SET_THEME", payload: theme });
  }

  function setSelectedTag(tagId: string | null) {
    dispatch({ type: "SET_SELECTED_TAG", payload: tagId });
  }

  return {
    state,
    visibleTodos,
    stats,
    // actions
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    addTag,
    deleteTag,
    setFilter,
    setSort,

    setTheme,
    setSelectedTag,
    dispatch,
  };
}

export type TodoActions = ReturnType<typeof useTodos>;
