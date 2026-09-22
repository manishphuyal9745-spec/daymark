export default function StatsBar({ remaining, completed, overdue, total }) {
  const stats = [
    { label: 'REMAINING', value: remaining },
    { label: 'COMPLETED', value: completed },
    { label: 'OVERDUE', value: overdue },
    { label: 'TOTAL', value: total },
  ]

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className="card stat-card">
          <p className="stat-label">{s.label}</p>
          <p className="stat-value">{s.value}</p>
        </div>
      ))}
    </div>
  )
}
