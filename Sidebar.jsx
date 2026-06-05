import { useState, useEffect } from 'react'
import { Plus, Trash2, X, BarChart2 } from 'lucide-react'
import { supabase } from '../supabase.js'
export default function Progress({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('General')
  const [score, setScore] = useState(50)
  const [saving, setSaving] = useState(false)
  useEffect(()=>{ load() },[])
  async function load(){
    setLoading(true)
    const {data} = await supabase.from('progress').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
    setItems(data||[]); setLoading(false)
  }
  async function save(){
    if(!topic.trim()) return; setSaving(true)
    await supabase.from('progress').insert({user_id:user.id,topic,subject,score:Number(score),status:Number(score)===100?'completed':'in_progress'})
    setSaving(false); setModal(false); setTopic(''); setSubject('General'); setScore(50); load()
  }
  async function updateScore(id,s){
    await supabase.from('progress').update({score:s,status:s===100?'completed':'in_progress'}).eq('id',id); load()
  }
  async function del(id){ if(!confirm('Remove?')) return; await supabase.from('progress').delete().eq('id',id); load() }
  const total=items.length, done=items.filter(i=>i.status==='completed').length
  const avg=total?Math.round(items.reduce((a,b)=>a+(b.score||0),0)/total):0
  const scoreClass=s=>s>=80?'high':s>=50?'mid':''
  return (
    <div className="page">
      <div className="page-hdr"><h2>📊 Progress</h2><button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}><Plus size={14}/>Add Topic</button></div>
      <div className="page-body">
        <div className="stats">
          <div className="stat"><div className="stat-val p">{total}</div><div className="stat-lbl">Total Topics</div></div>
          <div className="stat"><div className="stat-val g">{done}</div><div className="stat-lbl">Completed</div></div>
          <div className="stat"><div className="stat-val a">{avg}%</div><div className="stat-lbl">Avg Score</div></div>
        </div>
        {loading ? <div className="empty-state"><div className="spinner"/></div>
        : items.length===0 ? (
          <div className="empty-state"><BarChart2 size={38} opacity={.3}/><p style={{fontSize:14}}>No topics yet. Add your first!</p><button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}><Plus size={13}/>Add Topic</button></div>
        ) : (
          <div className="prog-grid">
            {items.map(item=>(
              <div key={item.id} className="prog-card">
                <div className="prog-card-hdr">
                  <div><div className="prog-topic">{item.topic}</div><div className="prog-subj">{item.subject}</div></div>
                  <span className={`badge ${item.status}`}>{item.status==='completed'?'✅ Done':'⏳ Progress'}</span>
                </div>
                <div className="score-lbl"><span>Score</span><span>{item.score||0}%</span></div>
                <div className="score-bar"><div className={`score-fill ${scoreClass(item.score||0)}`} style={{width:`${item.score||0}%`}}/></div>
                <input type="range" min="0" max="100" step="5" value={item.score||0} onChange={e=>updateScore(item.id,Number(e.target.value))} className="range"/>
                <div className="prog-foot"><button className="act-btn" style={{color:'var(--red)'}} onClick={()=>del(item.id)}><Trash2 size={11}/>Remove</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <div className="overlay" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:420}}>
            <div className="modal-hdr"><h3>Add Topic</h3><button className="close-btn" onClick={()=>setModal(false)}><X size={17}/></button></div>
            <div className="modal-body">
              <div className="form-group"><label>Topic</label><input className="form-input" placeholder="e.g. Newton's Laws" value={topic} onChange={e=>setTopic(e.target.value)}/></div>
              <div className="form-group"><label>Subject</label><input className="form-input" placeholder="e.g. Physics" value={subject} onChange={e=>setSubject(e.target.value)}/></div>
              <div className="form-group"><label>Score: {score}%</label><input type="range" min="0" max="100" step="5" value={score} onChange={e=>setScore(e.target.value)} className="range"/></div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost btn-sm" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={save} disabled={saving||!topic.trim()}>{saving?'Saving…':'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
