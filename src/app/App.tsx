
import type { Task } from "../lib/types";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useLocalStorageState } from "../hooks/useLocalStoragae";

function nextStatus(status: Task["status"]): Task["status"] {
  if (status === "todo") return "doing";
  if (status === "doing") return "done";
  return "todo";
}

export default function App() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("tasks", []);

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
      <p>Hoy: eventos desde hijos + estado centralizado.</p>

      <TaskForm onAddTask={handleAddTask} />

      <div className="card">
        <h2>Lista</h2>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onCycleStatus={handleCycleStatus} />
      </div>
    </div>
  );
}