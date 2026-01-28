
const API_URL = 'http://localhost:3000'

export async function getTickets() {
  const res = await fetch(`${API_URL}/tickets`)
  return res.json()
}
