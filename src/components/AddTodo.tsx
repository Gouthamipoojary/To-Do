import { useState, useRef } from "react";
import type { Priority, Tag, Todo } from "@/types";

interface AddTodoProps {
  tags: Tag[];
  onAdd: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt" | "completedAt">) => void;
  onAddTag: (tag: { label: string; color: string }) => void;
}

const PRIORITIES: { value: Priority; emoji: string; label: string; color: string; bg: string }[] = [
  { value: "low", emoji: "🟢", label: "Low", color: "#26de81", bg: "#e8fff3" },
  { value: "medium", emoji: "🟡", label: "Medium", color: "#ff9f43", bg: "#fff5ea" },
  { value: "high", emoji: "🔴", label: "High", color: "#ff5e7e", bg: "#fff0f2" },
];

const TAG_COLORS = ["#6c63ff", "#ff6b9d", "#ff9f43", "#26de81", "#06b6d4", "#8b5cf6", "#f43f5e", "#10b981"];

export function AddTodo({ tags, onAdd, onAddTag }: AddTodoProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showExtras, setShowExtras] = useState(false);
  const [newTagLabel, setNewTagLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) { inputRef.current?.focus(); return; }
    onAdd({ text: trimmed, completed: false, priority, tags: selectedTags, dueDate: dueDate || null, notes: "" });
    setText(""); setDueDate(""); setSelectedTags([]); setShowExtras(false);
    inputRef.current?.focus();
  };

  const handleAddTag = () => {
    const label = newTagLabel.trim();
    if (!label) return;
    onAddTag({ label, color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)] });
    setNewTagLabel("");
  };

  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: "var(--radius)",
      boxShadow: "var(--shadow)",
      overflow: "hidden",
      marginBottom: 20,
    }}>
      {/* Main input */}
      <div style={{ display: "flex", alignItems: "center", padding: "6px 6px 6px 20px", gap: 10 }}>
        <span style={{ fontSize: 20 }}>📝</span>
        <input
          ref={inputRef}
          autoFocus
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="What do you need to do?"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            color: "var(--text)",
            fontSize: 16,
            fontWeight: 600,
            outline: "none",
            padding: "10px 0",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: "#F5279F",
            border: "none",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            padding: "12px 22px",
            boxShadow: "0 4px 15px rgba(38, 222, 129, 0.25)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(38, 222, 129, 0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(38, 222, 129, 0.25)"; }}
        >
          Add ✚
        </button>
      </div>

      {/* Options toggle */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "8px 20px", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {/* Priority selector */}
        <div style={{ display: "flex", gap: 6 }}>
          {PRIORITIES.map(p => (
            <button
              key={p.value}
              onClick={() => setPriority(p.value)}
              style={{
                background: priority === p.value ? p.bg : "transparent",
                border: `2px solid ${priority === p.value ? p.color : "var(--border)"}`,
                borderRadius: 99,
                color: priority === p.value ? p.color : "var(--text-3)",
                fontWeight: 700,
                fontSize: 13,
                padding: "4px 12px",
                transition: "all 0.15s",
              }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {/* Due date */}
          <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-2)", fontSize: 13, fontWeight: 600 }}>
            📅
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={{
                border: "2px solid var(--border)",
                borderRadius: "var(--radius-xs)",
                color: "var(--text)",
                fontSize: 13,
                fontWeight: 600,
                padding: "4px 8px",
                outline: "none",
                background: "var(--surface-2)",
              }}
            />
          </label>

          {/* Tags toggle */}
          <button
            onClick={() => setShowExtras(v => !v)}
            style={{
              background: showExtras ? "var(--primary-light)" : "transparent",
              border: `2px solid ${showExtras ? "var(--primary)" : "var(--border)"}`,
              borderRadius: 99,
              color: showExtras ? "var(--primary)" : "var(--text-3",
              fontWeight: 700,
              fontSize: 13,
              padding: "4px 12px",
            }}
          >
            🏷 Tags
          </button>
        </div>
      </div>

      {/* Tags panel */}
      {showExtras && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "14px 20px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", background: "var(--surface-2)" }}>
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTags(prev => prev.includes(tag.id) ? prev.filter(t => t !== tag.id) : [...prev, tag.id])}
              style={{
                background: selectedTags.includes(tag.id) ? tag.color : "var(--surface)",
                border: `2px solid ${tag.color}`,
                borderRadius: 99,
                color: selectedTags.includes(tag.id) ? "#fff" : tag.color,
                fontWeight: 700,
                fontSize: 13,
                padding: "4px 14px",
                transition: "all 0.15s",
              }}
            >
              {tag.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              value={newTagLabel}
              onChange={e => setNewTagLabel(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="New tag..."
              style={{
                border: "2px dashed var(--border)",
                borderRadius: 99,
                color: "var(--text)",
                fontSize: 13,
                fontWeight: 600,
                padding: "4px 12px",
                outline: "none",
                background: "transparent",
                width: 110,
              }}
            />
            <button
              onClick={handleAddTag}
              style={{
                background: "var(--primary-light)",
                border: "2px solid var(--primary)",
                borderRadius: 99,
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: 13,
                padding: "4px 12px",
              }}
            >
              + Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
