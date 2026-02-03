export default function TicketFilters({
  status,
  priority,
  q,
  onChange
}) {
  return (
    <div className="filters">
      <label className="filter">
        <span>Status</span>
        <select
          value={status}
          onChange={(e) => onChange({ status: e.target.value })}
        >
          <option value="">All</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label>

      <label className="filter">
        <span>Priority</span>
        <select
          value={priority}
          onChange={(e) => onChange({ priority: e.target.value })}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <label className="filter grow">
        <span>Search</span>
        <input
          value={q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search by ID or title…"
        />
      </label>
    </div>
  )
}
