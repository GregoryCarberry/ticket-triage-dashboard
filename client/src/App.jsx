import { useEffect, useState } from 'react'

import { getTickets, getMetrics } from './api'
import TicketTable from './components/TicketTable'
import TicketFilters from './components/TicketFilters'
import MetricsBar from './components/MetricsBar'
import TicketDrawer from './components/TicketDrawer'

export default function App() {
  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [metrics, setMetrics] = useState(null)
  const [openTicketId, setOpenTicketId] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')

      try {
        const [data, m] = await Promise.all([getTickets({ status, priority, q }), getMetrics()])

        if (!cancelled) {
          setTickets(data)
          setMetrics(m)
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load tickets')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [status, priority, q])

  function handleFilterChange(next) {
    if (Object.prototype.hasOwnProperty.call(next, 'status')) setStatus(next.status)
    if (Object.prototype.hasOwnProperty.call(next, 'priority')) setPriority(next.priority)
    if (Object.prototype.hasOwnProperty.call(next, 'q')) setQ(next.q)
  }

  async function refreshMetrics() {
    try {
      const m = await getMetrics()
      setMetrics(m)
    } catch {
      // Don't break the UI if metrics fails
    }
  }

  return (
    <div className="container">
      <h1>Ticket Triage Dashboard</h1>

      <MetricsBar metrics={metrics} />

      <TicketFilters status={status} priority={priority} q={q} onChange={handleFilterChange} />

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

      <TicketTable
        tickets={tickets}
        onOpenTicket={(id) => setOpenTicketId(id)}
        onTicketUpdated={(updated) => {
          setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
          refreshMetrics()
        }}
      />

      <TicketDrawer
        ticketId={openTicketId}
        onClose={() => setOpenTicketId('')}
        onTicketPatched={(patched) => {
          setTickets((prev) => prev.map((t) => (t.id === patched.id ? patched : t)))
        }}
      />
    </div>
  )
}
