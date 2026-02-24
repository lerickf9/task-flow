import { useState } from "react";
import type { Task } from "../lib/types";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <div className="page">
      <h1>TaskFlow</h1>
      <p>Hook del día: <strong>useState</strong> + formularios controlados.</p>

      <TaskForm onAddTask={handleAddTask} />

      <div className="card">
        <h2>Lista</h2>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}