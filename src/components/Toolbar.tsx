import type { Filter, SortBy, SortOrder, Tag } from "@/types";

interface ToolbarProps {
  filter: Filter;
  sortBy: SortBy;
  sortOrder: SortOrder;
  selectedTagId: string | null;
  tags: Tag[];
  hasCompleted: boolean;
  onFilter: (f: Filter) => void;
  onSort: (by: SortBy, order: SortOrder) => void;
  onClearCompleted: () => void;
  onTagSelect: (id: string | null) => void;
  onDeleteTag: (id: string) => void;
}

const FILTERS: { value: Filter; emoji: string; label: string }[] = [
  { value: "all",       emoji: "📋", label: "All"       },
  { value: "active",    emoji: "⚡", label: "To Do"     },
  { value: "completed", emoji: "✅", label: "Done"      },
];

const SORTS: { value: SortBy; label: string }[] = [
  { value: "createdAt",    label: "Newest first" },
  { value: "priority",     label: "By priority"  },
  { value: "dueDate",      label: "By due date"  },
  { value: "alphabetical", label: "A → Z"        },
];

export function Toolbar({
  filter, sortBy, sortOrder, selectedTagId, tags, hasCompleted,
  onFilter, onSort, onClearCompleted, onTagSelect, onDeleteTag,
}: ToolbarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>



      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-sm)",
          padding: 4,
          display: "flex",
          gap: 4,
          boxShadow: "var(--shadow-sm)",
        }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onFilter(f.value)}
              style={{
                background: filter === f.value ? "linear-gradient(135deg, var(--primary), #8b5cf6)" : "transparent",
                border: "none",
                borderRadius: "var(--radius-xs)",
                color: filter === f.value ? "#fff" : "var(--text-2)",
                fontWeight: 700,
                fontSize: 14,
                padding: "8px 16px",
                transition: "all 0.2s",
                boxShadow: filter === f.value ? "0 2px 8px var(--primary-glow)" : "none",
              }}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div style={{ position: "relative" }}>
          <select
            value={sortBy}
            onChange={e => onSort(e.target.value as SortBy, sortOrder)}
            style={{
              appearance: "none",
              background: "var(--surface)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text)",
              fontFamily: "var(--font-main)",
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 32px 8px 14px",
              outline: "none",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 12 }}>⬇</span>
        </div>

        {/* Clear completed */}
        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            style={{
              background: "var(--red-light)",
              border: "2px solid var(--red)",
              borderRadius: "var(--radius-sm)",
              color: "var(--red)",
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 14px",
              marginLeft: "auto",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--red-light)"; e.currentTarget.style.color = "var(--red)"; }}
          >
            🗑 Clear done
          </button>
        )}
        
        {/* Cancel button to clear filters */}
        <button
          onClick={() => onFilter("all")}
          style={{
            background: "var(--primary-light)",
            border: "2px solid var(--primary)",
            borderRadius: "var(--radius-sm)",
            color: "var(--primary)",
            fontWeight: 700,
            fontSize: 13,
            padding: "8px 14px",
            marginLeft: "auto",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--primary-light)"; e.currentTarget.style.color = "var(--primary)"; }}
        >
          Cancel
        </button>
      </div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-2)" }}>Filter by tag:</span>
          <button
            onClick={() => onTagSelect(null)}
            style={{
              background: selectedTagId === null ? "var(--primary-light)" : "var(--surface)",
              border: `2px solid ${selectedTagId === null ? "var(--primary)" : "var(--border)"}`,
              borderRadius: 99,
              color: selectedTagId === null ? "var(--primary)" : "var(--text-2)",
              fontWeight: 700,
              fontSize: 13,
              padding: "4px 14px",
            }}
          >
            All
          </button>
          {tags.map(tag => (
            <div key={tag.id} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => onTagSelect(selectedTagId === tag.id ? null : tag.id)}
                style={{
                  background: selectedTagId === tag.id ? tag.color : "var(--surface)",
                  border: `2px solid ${tag.color}`,
                  borderRadius: "99px 0 0 99px",
                  color: selectedTagId === tag.id ? "#fff" : tag.color,
                  fontWeight: 700,
                  fontSize: 13,
                  padding: "4px 12px",
                  borderRight: "none",
                }}
              >
                {tag.label}
              </button>
              <button
                onClick={() => onDeleteTag(tag.id)}
                title="Delete tag"
                style={{
                  background: "var(--surface)",
                  border: `2px solid ${tag.color}`,
                  borderRadius: "0 99px 99px 0",
                  color: "var(--text-3)",
                  fontSize: 11,
                  padding: "4px 8px",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--red-light)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--text-3)"; }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
