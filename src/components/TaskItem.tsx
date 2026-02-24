import type { Task } from "../lib/types";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
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
      </div>
    </div>
  );
}