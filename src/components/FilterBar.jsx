export default function FilterBar({
  categories,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  const statuses = ['all', 'active', 'completed']

  return (
    <div className="filter-bar">
      <div className="pill-row">
        {statuses.map((s) => (
          <button
            key={s}
            className={`pill status-pill ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="pill-row">
        <button
          className={`pill ${categoryFilter === 'all' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('all')}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`pill ${categoryFilter === c ? 'active' : ''}`}
            onClick={() => setCategoryFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
