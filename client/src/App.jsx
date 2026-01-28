
import { useEffect, useState } from 'react'
import { getTickets } from './api'
import TicketTable from './components/TicketTable'

export default function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getTickets().then(setTickets)
  }, [])

  return (
    <div className="container">
      <h1>Ticket Triage Dashboard</h1>
      <TicketTable tickets={tickets} />
    </div>
  )
}
