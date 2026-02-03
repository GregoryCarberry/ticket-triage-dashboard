import { useState } from 'react'
import StatusBadge from './StatusBadge'
import { updateTicketStatus, updateTicketAssignee } from '../api'

const STATUSES = ['New', 'In Progress', 'Resolved']

// Lightweight "current user" identity for the demo.
// Later you can swap this to real auth (JWT) or a settings field.
const CURRENT_AGENT = 'Gregory'

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
      const updatedTicket = await updateTicketStatus(ticket.id, nextStatus)
      // Ensure UI matches server response
      onTicketUpdated(updatedTicket)
    } catch (e) {
      // Rollback on failure
      onTicketUpdated({ ...ticket, status: prevStatus })
      setError(e.message || 'Failed to update status')
    } finally {
      setSavingId('')
    }
  }

  async function handleAssignToMe(ticket) {
    const prevAssignee = ticket.assignee || ''

    setError('')
    setSavingId(ticket.id)

    // Optimistic update
    onTicketUpdated({ ...ticket, assignee: CURRENT_AGENT })

    try {
      const updatedTicket = await updateTicketAssignee(ticket.id, CURRENT_AGENT)
      onTicketUpdated(updatedTicket)
    } catch (e) {
      // Rollback on failure
      onTicketUpdated({ ...ticket, assignee: prevAssignee })
      setError(e.message || 'Failed to update assignee')
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
            <th>Assignee</th>
            <th>Update</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.priority}</td>
              <td><StatusBadge status={t.status} /></td>
              <td>{t.assignee ? t.assignee : 'Unassigned'}</td>

              <td>
                <select
                  value={t.status}
                  disabled={savingId === t.id}
                  onChange={(e) => handleStatusChange(t, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {savingId === t.id && (
                  <span className="muted" style={{ marginLeft: '0.5rem' }}>
                    Saving…
                  </span>
                )}
              </td>

              <td>
                <button
                  className="btn"
                  disabled={savingId === t.id || t.assignee === CURRENT_AGENT}
                  onClick={() => handleAssignToMe(t)}
                >
                  Assign to me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
