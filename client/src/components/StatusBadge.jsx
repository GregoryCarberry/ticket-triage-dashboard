
export default function StatusBadge({ status }) {
  const colors = {
    New: '#38bdf8',
    'In Progress': '#facc15',
    Resolved: '#4ade80'
  }

  return (
    <span style={{
      padding: '0.25rem 0.5rem',
      background: colors[status] || '#64748b',
      borderRadius: '4px'
    }}>
      {status}
    </span>
  )
}
