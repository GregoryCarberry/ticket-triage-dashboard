
import StatusBadge from './StatusBadge'

export default function TicketTable({ tickets }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(t => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.title}</td>
            <td>{t.priority}</td>
            <td><StatusBadge status={t.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
