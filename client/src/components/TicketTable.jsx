import { useState } from 'react'
import StatusBadge from './StatusBadge'
import { updateTicketStatus } from '../api'

const STATUSES = ['New', 'In Progress', 'Resolved']

export default function TicketTable({ tickets, onTicketUpdated }) {
  const [savingId, setSavingId] = useState('')
  const [error, setError] = useState('')

  async function handleStatusChange(ticket, nextStatus) {
    const prevStatus = ticket.status

    // Optimistic update (instant UI change)
    setError('')
    setSavingId(ticket.id)
    onTicketUpdated({ ...ticket, status: nextStatus })

    try {
      const updated = await updateTicketStatus(ticket.id, nextStatus)
      // Ensure UI matches server response
      onTicketUpdated(updated)
    } catch (e) {
      // Rollback on failure
      onTicketUpdated({ ...ticket, status: prevStatus })
      setError(e.message || 'Failed to update status')
    } finally {
      setSavingId('')
    }
  }

  return (
    <>
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.priority}</td>
              <td><StatusBadge status={t.status} /></td>

              <td>
                <select
                  value={t.status}
                  disabled={savingId === t.id}
                  onChange={(e) => handleStatusChange(t, e.target.value)}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {savingId === t.id && (
                  <span className="muted" style={{ marginLeft: '0.5rem' }}>
                    Saving…
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
