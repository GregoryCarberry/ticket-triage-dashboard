import { useState } from 'react'
import StatusBadge from './StatusBadge'
import { updateTicketStatus } from '../api'

const STATUSES = ['New', 'In Progress', 'Resolved']

export default function TicketTable({ tickets, onTicketUpdated }) {
  const [savingId, setSavingId] = useState('')
  const [error, setError] = useState('')

  async function handleStatusChange(ticketId, nextStatus) {
    setError('')
    setSavingId(ticketId)

    try {
      const updated = await updateTicketStatus(ticketId, nextStatus)
      onTicketUpdated(updated)
    } catch (e) {
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
                  onChange={(e) => handleStatusChange(t.id, e.target.value)}
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
