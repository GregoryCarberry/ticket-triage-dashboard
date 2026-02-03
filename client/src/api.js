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
