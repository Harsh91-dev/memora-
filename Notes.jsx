import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Paperclip, RotateCcw, BookmarkPlus, X } from 'lucide-react'
import { supabase } from '../supabase.js'
const TIPS = ['Explain Newton\'s laws simply','What is photosynthesis?','Give me a quiz on this topic','Summarize this chapter','Explain with a real-life example']
export default function Chat({ user, subject }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pdfText, setPdfText] = useState(null)
  const [pdfName, setPdfName] = useState('')
  const [err, setErr] = useState('')
  const bottom = useRef(null)
  const fileRef = useRef(null)
  const taRef = useRef(null)
  useEffect(()=>{ bottom.current?.scrollIntoView({behavior:'smooth'}) },[msgs,loading])
  function resize() {
    const el = taRef.current; if (!el) return
    el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,130)+'px'
  }
  async function uploadPDF(e) {
    const file = e.target.files[0]; if (!file) return
    if (file.size > 5*1024*1024) { setErr('PDF must be under 5MB'); return }
    setPdfName(file.name); setErr('')
    const buf = await file.arrayBuffer()
    const r = await fetch('/api/parse-pdf',{method:'POST',headers:{'Content-Type':'application/pdf'},body:new Uint8Array(buf)})
    const d = await r.json()
    if (d.text) setPdfText(d.text)
    else { setErr('Could not read PDF'); setPdfName('') }
    e.target.value=''
  }
  async function send(text) {
    const t = (text||input).trim(); if (!t||loading) return
    setInput(''); setErr(''); resize()
    const userMsg = {role:'user',content:t}
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs); setLoading(true)
    try {
      let system = `You are Memora, a brilliant AI study assistant for Indian students. Current subject: ${subject}. Be clear, use examples, format with markdown.`
      if (pdfText) system += `\n\nPDF content uploaded by student:\n---\n${pdfText.slice(0,5000)}\n---\nAnswer based on this content.`
      const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:newMsgs,system})})
      const d = await r.json()
      if (!r.ok||d.error) {
        setErr(d.error==='RATE_LIMIT'?'Rate limit reached. Wait a moment.':d.error||'Something went wrong.')
        setMsgs(m=>m.slice(0,-1)); return
      }
      setMsgs([...newMsgs,{role:'assistant',content:d.reply}])
    } catch(e) { setErr('Network error: '+e.message); setMsgs(m=>m.slice(0,-1)) }
    finally { setLoading(false) }
  }
  async function saveNote(content) {
    const {error} = await supabase.from('notes').insert({user_id:user.id,title:content.slice(0,60).replace(/[#*`]/g,'').trim()+'…',content,subject})
    alert(error?'Failed to save: '+error.message:'✅ Saved to Notes!')
  }
  return (
    <div className="chat">
      <div className="chat-hdr">
        <h2>🧠 Chat — {subject}</h2>
        {msgs.length>0 && <button className="btn btn-ghost btn-sm" onClick={()=>{setMsgs([]);setPdfText(null);setPdfName('')}}><RotateCcw size={13}/>New Chat</button>}
      </div>
      <div className="msgs">
        {msgs.length===0 && (
          <div className="empty">
            <span className="brain">🧠</span>
            <h3>What do you want to learn?</h3>
            <p>Ask anything about {subject}, upload a PDF, or pick a suggestion.</p>
            <div className="chips">{TIPS.map(t=><button key={t} className="chip" onClick={()=>send(t)}>{t}</button>)}</div>
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} className={`msg ${m.role==='user'?'user':'ai'}`}>
            <div className="msg-av">{m.role==='user'?'👤':'🧠'}</div>
            <div className="msg-body">
              <div className="msg-content">{m.role==='assistant'?<ReactMarkdown>{m.content}</ReactMarkdown>:m.content}</div>
              {m.role==='assistant' && <div className="msg-actions"><button className="act-btn" onClick={()=>saveNote(m.content)}><BookmarkPlus size={11}/>Save as Note</button></div>}
            </div>
          </div>
        ))}
        {loading && <div className="msg ai"><div className="msg-av">🧠</div><div className="msg-body"><div className="msg-content"><div className="typing"><div className="tdot"/><div className="tdot"/><div className="tdot"/></div></div></div></div>}
        {err && <div className="err" style={{margin:'0 4px'}}>{err}</div>}
        <div ref={bottom}/>
      </div>
      <div className="chat-input">
        {pdfName && <div className="pdf-bar">📄 {pdfName}<button onClick={()=>{setPdfText(null);setPdfName('')}}><X size={14}/></button></div>}
        <div className="input-row">
          <textarea ref={taRef} className="textarea" placeholder={`Ask about ${subject}… (Shift+Enter = new line)`} value={input} onChange={e=>{setInput(e.target.value);resize()}} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} rows={1}/>
          <input ref={fileRef} type="file" accept=".pdf" style={{display:'none'}} onChange={uploadPDF}/>
          <button className="icon-btn" title="Upload PDF" onClick={()=>fileRef.current?.click()}><Paperclip size={17}/></button>
          <button className="send-btn" onClick={()=>send()} disabled={!input.trim()||loading}><Send size={17}/></button>
        </div>
      </div>
    </div>
  )
}
