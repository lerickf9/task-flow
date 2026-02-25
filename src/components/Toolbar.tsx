import type { TaskStatus } from "../lib/types";

type ToolbarProps = {
  query: string;
  onQueryChange: (v: string) => void;

  status: TaskStatus | "all";
  onStatusChange: (v: TaskStatus | "all") => void;

  sort: "newest" | "oldest" | "priority";
  onSortChange: (v: "newest" | "oldest" | "priority") => void;
};

export default function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: ToolbarProps) {
  return (
    <div className="card">
      <h2>Filtros</h2>

      <div className="row">
        <input
          placeholder="Buscar..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />

        <select value={status} onChange={(e) => onStatusChange(e.target.value as any)}>
          <option value="all">Todos</option>
          <option value="todo">Pendientes</option>
          <option value="doing">En progreso</option>
          <option value="done">Hechas</option>
        </select>

        <select value={sort} onChange={(e) => onSortChange(e.target.value as any)}>
          <option value="newest">Más nuevas</option>
          <option value="oldest">Más antiguas</option>
          <option value="priority">Prioridad</option>
        </select>
      </div>
    </div>
  );
}