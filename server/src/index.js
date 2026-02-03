import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { writeFileSync } from 'fs'


const app = express()
app.use(cors())
app.use(express.json())

const tickets = JSON.parse(
  readFileSync(new URL('../data/tickets.json', import.meta.url))
)

app.get('/tickets', (req, res) => {
  const { status, priority, q } = req.query

  let results = tickets

  if (status) {
    results = results.filter(t => t.status.toLowerCase() === String(status).toLowerCase())
  }

  if (priority) {
    results = results.filter(t => t.priority.toLowerCase() === String(priority).toLowerCase())
  }

  if (q) {
    const query = String(q).toLowerCase()
    results = results.filter(t =>
      t.id.toLowerCase().includes(query) ||
      t.title.toLowerCase().includes(query)
    )
  }

  res.json(results)
})

app.patch('/tickets/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const allowedStatuses = ['New', 'In Progress', 'Resolved']

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' })
  }

  const ticket = tickets.find(t => t.id === id)

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' })
  }

  ticket.status = status

  // persist to file
  writeFileSync(
    new URL('../data/tickets.json', import.meta.url),
    JSON.stringify(tickets, null, 2)
  )

  res.json(ticket)
})

app.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})
