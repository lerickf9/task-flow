import type { Task } from "../lib/types";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) return <p>No hay tareas aún</p>;

  return (
    <div className="list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
}