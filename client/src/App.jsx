import { useEffect, useState } from 'react'
import { getTickets } from './api'
import TicketTable from './components/TicketTable'
import TicketFilters from './components/TicketFilters'

export default function App() {
  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getTickets({ status, priority, q })
        if (!cancelled) setTickets(data)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load tickets')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [status, priority, q])

  function handleFilterChange(next) {
    if (Object.prototype.hasOwnProperty.call(next, 'status')) setStatus(next.status)
    if (Object.prototype.hasOwnProperty.call(next, 'priority')) setPriority(next.priority)
    if (Object.prototype.hasOwnProperty.call(next, 'q')) setQ(next.q)
  }

  return (
    <div className="container">
      <h1>Ticket Triage Dashboard</h1>

      <TicketFilters
        status={status}
        priority={priority}
        q={q}
        onChange={handleFilterChange}
      />

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

<TicketTable
  tickets={tickets}
  onTicketUpdated={(updated) => {
    setTickets(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }}
/>

    </div>
  )
}
