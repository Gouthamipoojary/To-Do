import type { Todo, Tag } from "@/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Omit<Todo, "id" | "createdAt">>) => void;
}

export function TodoList({ todos, tags, onToggle, onDelete, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-sm)",
        padding: "60px 20px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌟</div>
        <p style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}>Nothing here yet!</p>
        <p style={{ color: "var(--text-2)", marginTop: 6 }}>Add a task above to get started 🚀</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          tags={tags}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      <button style={{ marginTop: 20 }}>Reset filters</button>
    </div>
  );
}
