import { useTodos } from "@/hooks/useTodos";
import { Header } from "@/components/Header";
import { AddTodo } from "@/components/AddTodo";
import { Toolbar } from "@/components/Toolbar";
import { TodoList } from "@/components/TodoList";
import { Footer } from "@/components/Footer";

export default function App() {
  const {
    state, visibleTodos, stats,
    addTodo, updateTodo, deleteTodo, toggleTodo,
    clearCompleted, addTag, deleteTag,
    setFilter, setSort, setSelectedTag,
  } = useTodos();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "0 16px", flex: 1 }}>
        <Header stats={stats} />
        <AddTodo tags={state.tags} onAdd={addTodo} onAddTag={addTag} />
        <Toolbar
          filter={state.filter}
          sortBy={state.sortBy}
          sortOrder={state.sortOrder}
          selectedTagId={state.selectedTagId}
          tags={state.tags}
          hasCompleted={state.todos.some(t => t.completed)}
          onFilter={setFilter}
          onSort={setSort}
          onClearCompleted={clearCompleted}
          onTagSelect={setSelectedTag}
          onDeleteTag={deleteTag}
        />
        <TodoList
          todos={visibleTodos}
          tags={state.tags}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
      <Footer />
    </div>
  );
}
