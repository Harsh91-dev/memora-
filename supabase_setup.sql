import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'
import Auth from './components/Auth.jsx'
import Sidebar from './components/Sidebar.jsx'
import Chat from './components/Chat.jsx'
import Notes from './components/Notes.jsx'
import Progress from './components/Progress.jsx'
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('chat')
  const [subject, setSubject] = useState('General')
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{ setUser(session?.user??null); setLoading(false) })
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,session)=>setUser(session?.user??null))
    return ()=>subscription.unsubscribe()
  },[])
  if (loading) return <div className="loading"><div className="spinner"/></div>
  if (!user) return <Auth/>
  return (
    <div className="app">
      <Sidebar view={view} setView={setView} user={user} subject={subject} setSubject={setSubject}/>
      <main className="main">
        {view==='chat' && <Chat user={user} subject={subject}/>}
        {view==='notes' && <Notes user={user}/>}
        {view==='progress' && <Progress user={user}/>}
      </main>
    </div>
  )
}
