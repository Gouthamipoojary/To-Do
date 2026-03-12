import { useState, useRef, useEffect } from "react";
import type { Todo, Tag } from "@/types";
import { formatDate, isOverdue, isDueToday } from "@/utils";

const PRIORITY_STYLE = {
  low:    { emoji: "🟢", color: "#26de81", bg: "#e8fff3", label: "Low"    },
  medium: { emoji: "🟡", color: "#ff9f43", bg: "#fff5ea", label: "Medium" },
  high:   { emoji: "🔴", color: "#ff5e7e", bg: "#fff0f2", label: "High"   },
};

interface TodoItemProps {
  todo: Todo;
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Omit<Todo, "id" | "createdAt">>) => void;
}

export function TodoItem({ todo, tags, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) editRef.current?.select(); }, [editing]);

  const saveEdit = () => {
    const t = editText.trim();
    if (t && t !== todo.text) onUpdate(todo.id, { text: t });
    setEditing(false);
  };

  const p = PRIORITY_STYLE[todo.priority];
  const overdue = isOverdue(todo);
  const dueToday = isDueToday(todo);
  const todoTags = tags.filter(t => todo.tags.includes(t.id));

  return (
    <div
      style={{
        background: todo.completed ? "var(--surface-2)" : "var(--surface)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-sm)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "all 0.2s",
        opacity: todo.completed ? 0.7 : 1,
        border: overdue ? "2px solid #ff5e7e44" : "2px solid transparent",
        animation: "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={e => { if (!todo.completed) e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}
    >
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        @keyframes checkPop {
          0%   { transform: scale(1);    }
          50%  { transform: scale(1.3);  }
          100% { transform: scale(1);    }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Big friendly checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          style={{
            width: 28, height: 28,
            border: `3px solid ${todo.completed ? "#26de81" : "var(--border)"}`,
            borderRadius: "50%",
            background: todo.completed ? "#26de81" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            fontSize: 14,
            transition: "all 0.2s",
            animation: todo.completed ? "checkPop 0.3s ease" : "none",
            boxShadow: todo.completed ? "0 0 0 4px rgba(38,222,129,0.2)" : "none",
          }}
          onMouseEnter={e => { if (!todo.completed) e.currentTarget.style.borderColor = "#26de81"; }}
          onMouseLeave={e => { if (!todo.completed) e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          {todo.completed && "✓"}
        </button>

        {/* Text */}
        {editing ? (
          <input
            ref={editRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditing(false); }}
            style={{
              flex: 1,
              border: "none",
              borderBottom: "2px solid var(--primary)",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--font-main)",
              fontWeight: 700,
              fontSize: 15,
              outline: "none",
              padding: "2px 0",
            }}
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setEditing(true)}
            title={todo.completed ? "" : "Double-click to edit"}
            style={{
              flex: 1,
              color: todo.completed ? "var(--text-3)" : "var(--text)",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "text",
              wordBreak: "break-word",
            }}
          >
            {todo.text}
          </span>
        )}

        {/* Right badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {/* Priority */}
          <span
            title={`${p.label} priority`}
            style={{
              background: p.bg,
              borderRadius: 99,
              color: p.color,
              fontWeight: 800,
              fontSize: 11,
              padding: "3px 10px",
              border: `1.5px solid ${p.color}44`,
            }}
          >
            {p.emoji} {p.label}
          </span>

          {/* Due date */}
          {todo.dueDate && (
            <span style={{
              background: overdue ? "#fff0f2" : dueToday ? "#fff5ea" : "var(--surface-2)",
              borderRadius: 99,
              color: overdue ? "var(--red)" : dueToday ? "var(--orange)" : "var(--text-2)",
              fontWeight: 700,
              fontSize: 11,
              padding: "3px 10px",
              border: `1.5px solid ${overdue ? "#ff5e7e44" : dueToday ? "#ff9f4344" : "var(--border)"}`,
              whiteSpace: "nowrap",
            }}>
              {overdue ? "⚠️ " : dueToday ? "⏰ " : "📅 "}{formatDate(todo.dueDate)}
            </span>
          )}

          {/* Edit button */}
          {!todo.completed && !editing && (
            <button
              onClick={() => setEditing(true)}
              title="Edit task"
              style={{
                background: "var(--surface-2)",
                border: "2px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-3)",
                fontSize: 14,
                padding: "4px 8px",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
            >
              ✏️
            </button>
          )}

          {/* Delete button */}
          <button
            onClick={() => onDelete(todo.id)}
            title="Delete task"
            style={{
              background: "var(--surface-2)",
              border: "2px solid var(--border)",
              borderRadius: 8,
              color: "var(--text-3)",
              fontSize: 14,
              padding: "4px 8px",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--red-light)"; e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
          >
            🗑
          </button>
        </div>
      </div>

      {/* Tags row */}
      {todoTags.length > 0 && (
        <div style={{ display: "flex", gap: 6, paddingLeft: 40, flexWrap: "wrap" }}>
          {todoTags.map(tag => (
            <span key={tag.id} style={{
              background: tag.color + "18",
              border: `1.5px solid ${tag.color}55`,
              borderRadius: 99,
              color: tag.color,
              fontWeight: 700,
              fontSize: 11,
              padding: "2px 10px",
            }}>
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
