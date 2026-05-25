import React from 'react'
import Upload from './Upload'

export default function PhotoVault({ user }){
  return (
    <section>
      <h2>Shared Photo Vault</h2>
      <p>Upload và quản lý ảnh chất lượng gốc ở đây.</p>
      <Upload user={user} />
      <div className="photo-grid">(photo grid placeholder)</div>
    </section>
  )
}
