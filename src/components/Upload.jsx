import React from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Upload({ user }){
  const [files, setFiles] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function fetchList(){
    if(!user) return
    const prefix = user.id === 'passcode-user' ? 'passcode/' : `${user.id}/`
    const { data, error } = await supabase.storage.from('photos').list(prefix)
    if(error) console.error(error)
    else setFiles(data || [])
  }

  React.useEffect(()=>{ fetchList() }, [user])

  async function handleUpload(e){
    const file = e.target.files?.[0]
    if(!file || !user) return
    setLoading(true)
    const folder = user.id === 'passcode-user' ? 'passcode' : user.id
    const filePath = `${folder}/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('photos').upload(filePath, file)
    if(error) console.error('Upload error', error)
    await fetchList()
    setLoading(false)
  }

  return (
    <div>
      <h3>Upload ảnh</h3>
      <input type="file" accept="image/*,video/*" onChange={handleUpload} />
      {loading && <p>Đang upload...</p>}
      <div>
        <h4>Files</h4>
        <ul>
          {files.map(f => (
            <li key={f.name}>{f.name} — {f.size ?? '—'}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
