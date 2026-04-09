import React from "react";
import type { Todo, Tag } from "@/types";

interface KanbanBoardProps {
  todos: Todo[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

export function KanbanBoard({ todos, tags, onToggle, onDelete, onUpdate }: KanbanBoardProps) {
  const categories = {
    todo: todos.filter(todo => !todo.completed),
    done: todos.filter(todo => todo.completed),
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1, marginRight: 16 }}>
        <h2 style={{ textAlign: "center" }}>To Do</h2>
        {categories.todo.length === 0 ? ( 
          <p>No tasks to display</p> 
        ) : ( 
          categories.todo.map(todo => (
            <div key={todo.id} style={{ padding: 10, border: '1px solid #ccc', borderRadius: 8, marginBottom: 10 }}>
              <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</h3>
              <button onClick={() => onToggle(todo.id)}>Toggle</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: "center" }}>Done</h2>
        {categories.done.length === 0 ? (
          <p>No completed tasks</p>
        ) : (
          categories.done.map(todo => (
            <div key={todo.id} style={{ padding: 10, border: '1px solid #ccc', borderRadius: 8, marginBottom: 10 }}>
              <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</h3>
              <button onClick={() => onToggle(todo.id)}>Toggle</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
