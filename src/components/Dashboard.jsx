import React from 'react'

export default function Dashboard() {
  const today = new Date().toLocaleDateString()
  return (
    <section>
      <h2>Dashboard</h2>
      <p>Chào buổi ngày! Hôm nay: {today}</p>
      <div className="widgets">
        <div className="widget">Days together: <strong>—</strong></div>
        <div className="widget">Next event: <strong>—</strong></div>
      </div>
    </section>
  )
}
