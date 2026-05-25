import Dashboard from './components/Dashboard'
import PhotoVault from './components/PhotoVault'
import LoveLetters from './components/LoveLetters'
import Timeline from './components/Timeline'
import Auth from './components/Auth'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [view, setView] = React.useState('dashboard')
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    // check supabase session
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if(!mounted) return
      if(data?.session?.user) setUser(data.session.user)
      else {
        // check passcode local session
        const p = localStorage.getItem('passcode_user')
        if(p) setUser(JSON.parse(p))
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if(session?.user) setUser(session.user)
      else setUser(null)
    })

    return () => { mounted = false; listener?.subscription?.unsubscribe?.() }
  }, [])

  function handleSignOut(){
    // sign out from supabase and clear passcode
    supabase.auth.signOut().catch(()=>{})
    localStorage.removeItem('passcode_user')
    setUser(null)
  }

  if(!user) return <Auth onSignIn={u => setUser(u)} />

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Memory Vault</h1>
        <nav>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('photos')}>Photo Vault</button>
          <button onClick={() => setView('letters')}>Love Letters</button>
          <button onClick={() => setView('timeline')}>Timeline</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </nav>
      </header>
      <main>
        {view === 'dashboard' && <Dashboard />}
        {view === 'photos' && <PhotoVault user={user} />}
        {view === 'letters' && <LoveLetters />}
        {view === 'timeline' && <Timeline />}
      </main>
    </div>
  )
}
