
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
  res.json(tickets)
})

app.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})
