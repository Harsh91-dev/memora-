import { MessageSquare, FileText, BarChart2, LogOut } from 'lucide-react'
import { supabase } from '../supabase.js'
const SUBJECTS = ['General','Mathematics','Physics','Chemistry','Biology','History','Geography','English','Computer Science','Economics','BCA / MCA','Engineering']
export default function Sidebar({ view, setView, user, subject, setSubject }) {
  const name = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  return (
    <aside className="sidebar">
      <div className="sb-logo"><span>🧠</span><span>Memora</span></div>
      <div className="sb-subject">
        <label>Subject</label>
        <select value={subject} onChange={e=>setSubject(e.target.value)}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select>
      </div>
      <nav className="nav">
        {[{id:'chat',label:'Chat',Icon:MessageSquare},{id:'notes',label:'Notes',Icon:FileText},{id:'progress',label:'Progress',Icon:BarChart2}].map(({id,label,Icon})=>(
          <button key={id} className={`nav-btn${view===id?' active':''}`} onClick={()=>setView(id)}><Icon size={16}/>{label}</button>
        ))}
      </nav>
      <div className="upgrade" onClick={()=>alert('Pro plan coming soon!')}><div className="upgrade-t">⚡ Upgrade to Pro</div><div className="upgrade-s">Unlimited AI chats</div></div>
      <div className="sb-footer">
        <div className="avatar">{initials}</div>
        <div className="user-info"><div className="user-name">{name}</div><div className="user-sub">Free plan</div></div>
        <button className="signout" onClick={()=>supabase.auth.signOut()} title="Sign out"><LogOut size={15}/></button>
      </div>
    </aside>
  )
}
