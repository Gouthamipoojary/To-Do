import type { Stats } from "@/types";

interface HeaderProps {
  stats: Stats;
}

export function Header({ stats }: HeaderProps) {
  const emoji = stats.active === 0 && stats.total > 0 ? "🎉" : "✨";

  return (
    <div style={{ textAlign: "center", padding: "40px 20px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{emoji}</div>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(28px, 5vw, 42px)",
        fontWeight: 700,
        color: "var(--text)",
        letterSpacing: "-0.5px",
      }}>
        My Todo List
      </h1>
      <p style={{ color: "var(--text-2)", marginTop: 6, fontSize: 15 }}>
        {stats.total === 0
          ? "Add your first task below 👇"
          : stats.active === 0
          ? "All done! You're amazing! 🏆"
          : `${stats.active} task${stats.active !== 1 ? "s" : ""} left to do`}
      </p>

      {stats.total > 0 && (
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
          <div style={{
            background: "var(--surface)",
            borderRadius: 99,
            padding: "6px 20px",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 14,
            fontWeight: 700,
          }}>
            <span style={{ color: "var(--primary)" }}>📋 {stats.total} total</span>
            <span style={{ color: "var(--green)" }}>✅ {stats.completed} done</span>
            {stats.overdue > 0 && (
              <span style={{ color: "var(--red)" }}>⚠️ {stats.overdue} overdue</span>
            )}
          </div>
        </div>
      )}

      {stats.total > 0 && (
        <div style={{ maxWidth: 400, margin: "16px auto 0" }}>
          <div style={{
            height: 8,
            background: "var(--border)",
            borderRadius: 99,
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${stats.completionRate}%`,
              background: "linear-gradient(90deg, var(--primary), var(--pink))",
              borderRadius: 99,
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>
            {stats.completionRate}% complete
          </p>
        </div>
      )}
    </div>
  );
}
