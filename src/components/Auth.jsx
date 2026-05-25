import React from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth({ onSignIn }){
  const [email, setEmail] = React.useState('')
  const [passcode, setPasscode] = React.useState('')
  const [message, setMessage] = React.useState('')

  async function handleEmailSignIn(e){
    e.preventDefault()
    setMessage('Đang gửi magic link...')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if(error) setMessage('Lỗi: '+error.message)
    else setMessage('Magic link đã được gửi tới email của bạn')
  }

  function handlePasscodeSignIn(e){
    e.preventDefault()
    const secret = import.meta.env.VITE_SHARED_PASSCODE || ''
    if(passcode && passcode === secret){
      const user = { id: 'passcode-user', email: 'shared@local' }
      localStorage.setItem('passcode_user', JSON.stringify(user))
      onSignIn(user)
    } else {
      setMessage('Passcode không đúng')
    }
  }

  return (
    <section>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleEmailSignIn}>
        <label>Email (magic link):</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        <button type="submit">Gửi magic link</button>
      </form>

      <hr />

      <form onSubmit={handlePasscodeSignIn}>
        <label>Hoặc nhập shared passcode:</label>
        <input value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="shared passcode" />
        <button type="submit">Đăng nhập bằng passcode</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  )
}
