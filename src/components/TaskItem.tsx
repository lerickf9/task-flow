import type { Task } from "../lib/types";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onCycleStatus: (id: string) => void;
};

export default function TaskItem({ task, onDelete, onCycleStatus }: TaskItemProps) {
  return (
    <div className="task">
      <div>
        <strong>{task.title}</strong>
        {task.description && (
          <div>
            <small>{task.description}</small>
          </div>
        )}
      </div>

      <div className="row">
        <small>{task.status}</small>
        <small>{task.priority}</small>

        <button type="button" onClick={() => onCycleStatus(task.id)}>
          Estado
        </button>

        <button type="button" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}