export default function MetricsBar({ metrics }) {
  if (!metrics) return null

  const items = [
    { label: 'Total', value: metrics.total },
    { label: 'Open', value: (metrics.new + metrics.inProgress) },
    { label: 'New', value: metrics.new },
    { label: 'In Progress', value: metrics.inProgress },
    { label: 'High Priority', value: metrics.highPriority }
  ]

  return (
    <div className="metrics">
      {items.map((i) => (
        <div key={i.label} className="metric">
          <div className="metric-value">{i.value}</div>
          <div className="metric-label">{i.label}</div>
        </div>
      ))}
    </div>
  )
}
