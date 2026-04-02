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

  const todoColumns = {
    Todo: [],
    "In Progress": [],
    Done: []
  };

  filteredTodos.forEach(todo => {
    if (todo.status === "Todo") {
      todoColumns.Todo.push(todo);
    } else if (todo.status === "In Progress") {
      todoColumns["In Progress"].push(todo);
    } else if (todo.status === "Done") {
      todoColumns.Done.push(todo);
    }
  });

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ flex: 1 }}>
        <h2>Todo</h2>
        {todoColumns.Todo.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            tags={tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <h2>In Progress</h2>
        {todoColumns["In Progress"].map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            tags={tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <h2>Done</h2>
        {todoColumns.Done.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            tags={tags}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}