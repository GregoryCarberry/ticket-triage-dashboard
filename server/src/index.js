
import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'

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


app.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})
