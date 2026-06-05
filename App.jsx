import { useState, useEffect } from 'react'
import { Plus, Trash2, X, FileText, Search } from 'lucide-react'
import { supabase } from '../supabase.js'
export default function Notes({ user }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('General')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  useEffect(()=>{ load() },[])
  async function load() {
    setLoading(true)
    const {data} = await supabase.from('notes').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
    setNotes(data||[]); setLoading(false)
  }
  function openNew(){setTitle('');setContent('');setSubject('General');setModal('new')}
  function openNote(n){setTitle(n.title);setContent(n.content);setSubject(n.subject||'General');setModal(n)}
  async function save(){
    if(!title.trim()||!content.trim()) return
    setSaving(true)
    if(modal==='new') await supabase.from('notes').insert({user_id:user.id,title,content,subject})
    else await supabase.from('notes').update({title,content,subject}).eq('id',modal.id)
    setSaving(false); setModal(null); load()
  }
  async function del(id,e){
    e.stopPropagation(); if(!confirm('Delete this note?')) return
    await supabase.from('notes').delete().eq('id',id); load()
  }
  const filtered = notes.filter(n=>n.title.toLowerCase().includes(search.toLowerCase())||n.content.toLowerCase().includes(search.toLowerCase()))
  const fmt = d=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short'})
  return (
    <div className="page">
      <div className="page-hdr">
        <h2>📝 Notes</h2>
        <div style={{display:'flex',gap:8}}>
          <div style={{position:'relative',display:'flex',alignItems:'center'}}>
            <Search size={13} style={{position:'absolute',left:9,color:'var(--text3)'}}/>
            <input style={{paddingLeft:28,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'6px 10px 6px 28px',color:'var(--text)',fontSize:13,outline:'none',width:170}} placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-primary btn-sm" onClick={openNew}><Plus size={14}/>New Note</button>
        </div>
      </div>
      <div className="page-body">
        {loading ? <div className="empty-state"><div className="spinner"/></div>
        : filtered.length===0 ? (
          <div className="empty-state">
            <FileText size={38} opacity={.3}/>
            <p style={{fontSize:14}}>{search?'No notes match.':'No notes yet. Create one or save from chat!'}</p>
            {!search && <button className="btn btn-primary btn-sm" onClick={openNew}><Plus size={13}/>New Note</button>}
          </div>
        ) : (
          <div className="notes-grid">
            {filtered.map(n=>(
              <div key={n.id} className="note-card" onClick={()=>openNote(n)}>
                <h3>{n.title}</h3>
                <p>{n.content}</p>
                <div className="note-foot">
                  <span className="note-tag">{n.subject||'General'}</span>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span className="note-date">{fmt(n.created_at)}</span>
                    <button className="note-del" onClick={e=>del(n.id,e)}><Trash2 size={12}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <div className="overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr"><h3>{modal==='new'?'New Note':'Edit Note'}</h3><button className="close-btn" onClick={()=>setModal(null)}><X size={17}/></button></div>
            <div className="modal-body">
              <div className="form-group"><label>Title</label><input className="form-input" placeholder="Note title…" value={title} onChange={e=>setTitle(e.target.value)}/></div>
              <div className="form-group"><label>Subject</label><input className="form-input" placeholder="Subject…" value={subject} onChange={e=>setSubject(e.target.value)}/></div>
              <div className="form-group"><label>Content</label><textarea className="form-input" placeholder="Write your note…" value={content} onChange={e=>setContent(e.target.value)} rows={10} style={{resize:'vertical',minHeight:180}}/></div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost btn-sm" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={save} disabled={saving||!title.trim()||!content.trim()}>{saving?'Saving…':'Save Note'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
