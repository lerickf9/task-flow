import type { Task } from "../lib/types";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onCycleStatus: (id: string) => void;
};

export default function TaskList({ tasks, onDelete, onCycleStatus }: TaskListProps) {
  if (tasks.length === 0) return <p>No hay tareas aún</p>;

  return (
    <div className="list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onDelete={onDelete} onCycleStatus={onCycleStatus} />
      ))}
    </div>
  );
}