import { useMemo, useState } from "react";
import type { Task } from "../lib/types";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Toolbar from "../components/Toolbar";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function nextStatus(status: Task["status"]): Task["status"] {
  if (status === "todo") return "doing";
  if (status === "doing") return "done";
  return "todo";
}

export default function App() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("taskflow.tasks", []);

  // ✅ Hooks dentro del componente
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "priority">("newest");

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = tasks;

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // ✅ copiar antes de sort para no mutar
    result = [...result].sort((a, b) => {
      if (sort === "newest") return b.createdAt - a.createdAt;
      if (sort === "oldest") return a.createdAt - b.createdAt;

      const rank = { high: 3, medium: 2, low: 1 } as const;
      return rank[b.priority] - rank[a.priority];
    });

    return result;
  }, [tasks, query, statusFilter, sort]);

  function handleAddTask(title: string, description: string, priority: Task["priority"]) {
    const now = Date.now();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleCycleStatus(id: string) {
    const now = Date.now();

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: nextStatus(t.status), updatedAt: now } : t
      )
    );
  }

  return (
    <div className="page">
      <h1>TaskFlow</h1>
      <p>Hoy: filtros + búsqueda + orden + persistencia.</p>

      <TaskForm onAddTask={handleAddTask} />

      <Toolbar
        query={query}
        onQueryChange={setQuery}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="card">
        <h2>Lista</h2>
        <TaskList
          tasks={visibleTasks}
          onDelete={handleDeleteTask}
          onCycleStatus={handleCycleStatus}
        />
      </div>
    </div>
  );
}