import { useState } from "react";
import type { Task } from "../lib/types";
import TaskForm from "../components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string, description: string, priority: Task["priority"]) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
  }

  return (
    <div className="page">
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <div className="card">
        <h2>Lista</h2>

        <div className="list">
          {tasks.map((t) => (
            <div className="task" key={t.id}>
              <div>
                <strong>{t.title}</strong>
                {t.description && (
                  <div>
                    <small>{t.description}</small>
                  </div>
                )}
              </div>

              <div className="row">
                <small>{t.status}</small>
                <small>{t.priority}</small>
              </div>
            </div>
          ))}

          {tasks.length === 0 && <p>No hay tareas aún</p>}
        </div>
      </div>
    </div>
  );
}