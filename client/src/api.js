const API_URL = 'http://localhost:3000'

export async function getTickets({ status, priority, q } = {}) {
  const params = new URLSearchParams()

  if (status) params.set('status', status)
  if (priority) params.set('priority', priority)
  if (q) params.set('q', q)

  const url = `${API_URL}/tickets${params.toString() ? `?${params.toString()}` : ''}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}

export async function updateTicketStatus(id, status) {
  const res = await fetch(`${API_URL}/tickets/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `API error: ${res.status}`)
  }

  return res.json()
}

export async function updateTicketAssignee(id, assignee) {
  const res = await fetch(`${API_URL}/tickets/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignee }),
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `API error: ${res.status}`)
  }

  return res.json()
}

export async function getMetrics() {
  const res = await fetch(`${API_URL}/metrics`)
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}

export async function getTicket(id) {
  const res = await fetch(`${API_URL}/tickets/${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function addTicketNote(id, { text, author }) {
  const res = await fetch(`${API_URL}/tickets/${encodeURIComponent(id)}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, author }),
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `API error: ${res.status}`)
  }

  return res.json()
}
