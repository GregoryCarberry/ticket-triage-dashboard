import { useEffect, useState } from 'react'
import { addTicketNote, getTicket } from '../api'
import StatusBadge from './StatusBadge'

const CURRENT_AGENT = 'Gregory'

export default function TicketDrawer({ ticketId, onClose, onTicketPatched }) {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [noteText, setNoteText] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!ticketId) return

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getTicket(ticketId)
        if (!cancelled) setTicket(data)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load ticket')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [ticketId])

  async function submitNote(e) {
    e.preventDefault()
    const text = noteText.trim()
    if (!text) return

    setSaving(true)
    setError('')

    try {
      const created = await addTicketNote(ticketId, { text, author: CURRENT_AGENT })
      const next = { ...ticket, notes: [created, ...(ticket.notes || [])] }
      setTicket(next)
      setNoteText('')
      onTicketPatched(next) // keep table list in sync if needed
    } catch (e2) {
      setError(e2.message || 'Failed to add note')
    } finally {
      setSaving(false)
    }
  }

  if (!ticketId) return null

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <div className="drawer-title">{ticketId}</div>
            {ticket && (
              <div className="drawer-sub">
                <StatusBadge status={ticket.status} />
                <span className="muted" style={{ marginLeft: '0.6rem' }}>
                  Priority: {ticket.priority} · Assignee: {ticket.assignee || 'Unassigned'}
                </span>
              </div>
            )}
          </div>

          <button className="btn" onClick={onClose}>Close</button>
        </div>

        {loading && <p className="muted">Loading…</p>}
        {error && <p className="error">{error}</p>}

        {ticket && (
          <>
            <h3 style={{ marginTop: '1rem' }}>{ticket.title}</h3>

            <div className="notes">
              <div className="notes-head">
                <h4>Notes</h4>
              </div>

              <form onSubmit={submitNote} className="notes-form">
                <input
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note…"
                  disabled={saving}
                />
                <button className="btn" disabled={saving || !noteText.trim()}>
                  {saving ? 'Adding…' : 'Add'}
                </button>
              </form>

              <div className="notes-list">
                {(ticket.notes || []).length === 0 ? (
                  <p className="muted">No notes yet.</p>
                ) : (
                  ticket.notes.map(n => (
                    <div key={n.id} className="note">
                      <div className="note-meta">
                        <strong>{n.author || 'System'}</strong>
                        <span className="muted"> · {new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <div>{n.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
