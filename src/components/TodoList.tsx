import type { Todo, Tag } from "@/types";
import { TodoItem } from "./TodoItem";
import { useState } from "react";

interface TodoListProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Omit<Todo, "id" | "createdAt">>) => void;
}

export function TodoList({ todos, tags, onToggle, onDelete, onUpdate }: TodoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredTodos.length === 0) {
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
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, padding: 10, borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        {/* TODO: Create Kanban Board Structure */}
        <div style={{ flex: 1, display: 'flex', overflowX: 'scroll' }}>
          {filteredTodos.map(todo => (
            <div key={todo.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px', background: 'var(--surface)', marginBottom: '10px', flex: '0 0 auto' }}>
              <TodoItem
                todo={todo}
                tags={tags}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}