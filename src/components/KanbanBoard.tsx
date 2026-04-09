import React from 'react';
import type { Todo } from '@/types';

interface KanbanBoardProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

export function KanbanBoard({ todos, onToggle, onDelete, onUpdate }: KanbanBoardProps) {
  // Group todos by their completion status
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: 'center' }}>To Do</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
          {activeTodos.length === 0 ? (
            <p>No tasks left!</p>
          ) : (
            activeTodos.map(todo => (
              <div key={todo.id} style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                <h3 style={{ display: 'inline' }}>{todo.text}</h3>
                <button onClick={() => onToggle(todo.id)}>Toggle</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
                {/* TODO: Add edit functionality */}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ textAlign: 'center' }}>Completed</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
          {completedTodos.length === 0 ? (
            <p>No completed tasks!</p>
          ) : (
            completedTodos.map(todo => (
              <div key={todo.id} style={{ margin: '10px 0', padding: '10px', background: '#e0ffe0', borderRadius: '5px' }}>
                <h3 style={{ display: 'inline', textDecoration: 'line-through' }}>{todo.text}</h3>
                <button onClick={() => onToggle(todo.id)}>Undo</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
                {/* TODO: Add edit functionality */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
