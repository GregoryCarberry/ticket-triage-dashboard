import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync } from 'fs'

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
  const { status, assignee } = req.body

  const ticket = tickets.find(t => t.id === id)
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' })
  }

  const allowedStatuses = ['New', 'In Progress', 'Resolved']

  if (typeof status !== 'undefined') {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' })
    }
    ticket.status = status
  }

  if (typeof assignee !== 'undefined') {
    if (typeof assignee !== 'string') {
      return res.status(400).json({ error: 'Invalid assignee value' })
    }
    ticket.assignee = assignee
  }

  writeFileSync(
    new URL('../data/tickets.json', import.meta.url),
    JSON.stringify(tickets, null, 2)
  )

  res.json(ticket)
})

app.get('/metrics', (req, res) => {
  const metrics = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'New').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    highPriority: tickets.filter(t => t.priority === 'High').length
  }

  res.json(metrics)
})

app.get('/tickets/:id', (req, res) => {
  const { id } = req.params
  const ticket = tickets.find(t => t.id === id)

  if (!ticket) return res.status(404).json({ error: 'Ticket not found' })
  res.json(ticket)
})

app.post('/tickets/:id/notes', (req, res) => {
  const { id } = req.params
  const { text, author } = req.body

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Note text is required' })
  }

  const ticket = tickets.find(t => t.id === id)
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' })

  if (!Array.isArray(ticket.notes)) ticket.notes = []

  const note = {
    id: `note_${Date.now()}`,
    text: text.trim(),
    author: typeof author === 'string' ? author.trim() : 'System',
    createdAt: new Date().toISOString()
  }

  ticket.notes.unshift(note)

  writeFileSync(
    new URL('../data/tickets.json', import.meta.url),
    JSON.stringify(tickets, null, 2)
  )

  res.status(201).json(note)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
