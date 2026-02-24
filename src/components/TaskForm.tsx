import { useState } from "react";
import type { TaskPriority } from "../lib/types";

type TaskFormProps = {
  onAddTask: (title: string, description: string, priority: TaskPriority) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(title, description, priority);

    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <div className="card">
      <h2>Nueva tarea</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}