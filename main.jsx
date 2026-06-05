*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0c0c0e;--bg2:#141416;--bg3:#1c1c20;--bg4:#242428;
  --border:#2a2a30;--border2:#38383f;
  --text:#f0f0f2;--text2:#a0a0aa;--text3:#60606a;
  --accent:#7c3aed;--accent2:#9d5cf0;--accent-bg:#7c3aed18;
  --green:#10b981;--green-bg:#10b98115;
  --red:#ef4444;--red-bg:#ef444415;
  --amber:#f59e0b;--amber-bg:#f59e0b15;
  --r:10px;--rl:16px;
}
html,body,#root{height:100%}
body{font-family:'DM Sans',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}
.loading{display:flex;align-items:center;justify-content:center;height:100vh}
.spinner{width:32px;height:32px;border:2.5px solid var(--border2);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.app{display:flex;height:100vh;overflow:hidden}
/* Sidebar */
.sidebar{width:230px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column}
.sb-logo{display:flex;align-items:center;gap:10px;padding:18px 16px;border-bottom:1px solid var(--border);font-size:20px;font-weight:700}
.sb-subject{padding:10px 12px;border-bottom:1px solid var(--border)}
.sb-subject label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);display:block;margin-bottom:5px}
.sb-subject select{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:7px 10px;color:var(--text);font-size:13px;outline:none;cursor:pointer}
.nav{flex:1;padding:8px}
.nav-btn{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r);border:none;background:none;color:var(--text2);font-size:14px;width:100%;cursor:pointer;transition:all .15s;text-align:left}
.nav-btn:hover{background:var(--bg3);color:var(--text)}
.nav-btn.active{background:var(--accent-bg);color:var(--accent2);font-weight:500}
.sb-footer{padding:12px 14px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px}
.avatar{width:32px;height:32px;border-radius:50%;background:var(--accent-bg);border:1px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--accent2);flex-shrink:0}
.user-info{flex:1;min-width:0}
.user-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.user-sub{font-size:11px;color:var(--text3)}
.signout{background:none;border:none;cursor:pointer;color:var(--text3);display:flex;padding:4px;border-radius:6px}
.signout:hover{color:var(--red)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
/* Auth */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:20px}
.auth-card{width:100%;max-width:400px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:36px 32px}
.auth-logo{text-align:center;margin-bottom:28px}
.auth-logo .brain{font-size:42px;display:block;margin-bottom:8px}
.auth-logo h1{font-size:28px;font-weight:800}
.auth-logo p{color:var(--text2);font-size:14px;margin-top:4px}
.auth-tabs{display:flex;background:var(--bg3);border-radius:var(--r);padding:3px;margin-bottom:22px}
.auth-tab{flex:1;padding:8px;border:none;background:none;border-radius:8px;cursor:pointer;font-size:14px;color:var(--text2);transition:all .15s}
.auth-tab.active{background:var(--bg2);color:var(--text);font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:13px;color:var(--text2);margin-bottom:5px;font-weight:500}
.form-input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:10px 14px;color:var(--text);font-size:14px;outline:none;transition:border-color .15s;font-family:inherit}
.form-input:focus{border-color:var(--accent)}
.form-input::placeholder{color:var(--text3)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 18px;border-radius:var(--r);border:none;cursor:pointer;font-size:14px;font-family:inherit;font-weight:500;transition:all .15s}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--accent2)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed}
.btn-sm{padding:6px 12px;font-size:13px}
.btn-w{width:100%}
.btn-ghost{background:var(--bg3);color:var(--text2);border:1px solid var(--border)}
.btn-ghost:hover{background:var(--bg4);color:var(--text)}
.err{background:var(--red-bg);border:1px solid var(--red);color:var(--red);border-radius:var(--r);padding:10px 14px;font-size:13px;margin-bottom:14px}
.suc{background:var(--green-bg);border:1px solid var(--green);color:var(--green);border-radius:var(--r);padding:10px 14px;font-size:13px;margin-bottom:14px}
/* Chat */
.chat{display:flex;flex-direction:column;height:100%}
.chat-hdr{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--bg2);flex-shrink:0}
.chat-hdr h2{font-size:15px;font-weight:600}
.msgs{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px}
.empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text3);text-align:center}
.empty .brain{font-size:52px}
.empty h3{font-size:20px;font-weight:700;color:var(--text2)}
.empty p{font-size:14px;max-width:300px}
.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:6px}
.chip{padding:8px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg3);color:var(--text2);font-size:13px;cursor:pointer;transition:all .15s}
.chip:hover{border-color:var(--accent);color:var(--accent2);background:var(--accent-bg)}
.msg{display:flex;gap:10px;max-width:820px;animation:fi .2s ease}
@keyframes fi{from{opacity:0;transform:translateY(5px)}}
.msg.user{align-self:flex-end;flex-direction:row-reverse}
.msg-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.msg.ai .msg-av{background:var(--accent-bg);border:1px solid var(--accent)}
.msg.user .msg-av{background:var(--bg3);border:1px solid var(--border)}
.msg-body{flex:1}
.msg-content{padding:11px 15px;border-radius:var(--rl);font-size:14px;line-height:1.7}
.msg.ai .msg-content{background:var(--bg3);border:1px solid var(--border);border-radius:4px var(--rl) var(--rl) var(--rl)}
.msg.user .msg-content{background:var(--accent);color:#fff;border-radius:var(--rl) 4px var(--rl) var(--rl)}
.msg-content h1,.msg-content h2,.msg-content h3{margin:10px 0 5px;font-weight:700}
.msg-content p{margin-bottom:7px}.msg-content p:last-child{margin-bottom:0}
.msg-content ul,.msg-content ol{padding-left:18px;margin-bottom:7px}
.msg-content li{margin-bottom:3px}
.msg-content code{background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:1px 5px;font-size:12px;font-family:monospace}
.msg-content pre{background:var(--bg4);border:1px solid var(--border);border-radius:var(--r);padding:12px;margin:8px 0;overflow-x:auto}
.msg-content pre code{background:none;border:none;padding:0}
.msg-content strong{font-weight:600}
.msg.user .msg-content code,.msg.user .msg-content pre{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.2)}
.msg-actions{display:flex;gap:5px;margin-top:5px;opacity:0;transition:opacity .15s}
.msg:hover .msg-actions{opacity:1}
.act-btn{padding:4px 9px;border-radius:6px;border:1px solid var(--border);background:var(--bg3);color:var(--text3);font-size:11px;cursor:pointer;display:flex;align-items:center;gap:3px}
.act-btn:hover{color:var(--text)}
.typing{display:flex;gap:5px;align-items:center;padding:12px 15px}
.tdot{width:7px;height:7px;border-radius:50%;background:var(--text3);animation:tb .9s ease-in-out infinite}
.tdot:nth-child(2){animation-delay:.15s}.tdot:nth-child(3){animation-delay:.3s}
@keyframes tb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.chat-input{padding:14px 18px;border-top:1px solid var(--border);background:var(--bg2);flex-shrink:0}
.pdf-bar{display:flex;align-items:center;gap:8px;background:var(--accent-bg);border:1px solid var(--accent);border-radius:var(--r);padding:7px 12px;margin-bottom:9px;font-size:13px;color:var(--accent2)}
.pdf-bar button{margin-left:auto;background:none;border:none;cursor:pointer;color:var(--accent2);display:flex}
.input-row{display:flex;gap:8px;align-items:flex-end}
.textarea{flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:var(--rl);padding:11px 15px;color:var(--text);font-size:14px;font-family:inherit;outline:none;resize:none;min-height:46px;max-height:130px;line-height:1.5;transition:border-color .15s}
.textarea:focus{border-color:var(--accent)}
.textarea::placeholder{color:var(--text3)}
.icon-btn{width:40px;height:40px;border-radius:var(--r);border:1px solid var(--border);background:var(--bg3);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.icon-btn:hover{background:var(--bg4);color:var(--text)}
.send-btn{width:40px;height:40px;border-radius:var(--r);border:none;background:var(--accent);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.send-btn:hover{background:var(--accent2)}
.send-btn:disabled{opacity:.4;cursor:not-allowed}
/* Page */
.page{height:100%;display:flex;flex-direction:column}
.page-hdr{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--bg2);flex-shrink:0}
.page-hdr h2{font-size:15px;font-weight:600}
.page-body{flex:1;overflow-y:auto;padding:20px}
/* Notes */
.notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px}
.note-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:16px;cursor:pointer;transition:all .15s}
.note-card:hover{border-color:var(--border2);transform:translateY(-1px)}
.note-card h3{font-size:14px;font-weight:600;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.note-card p{font-size:13px;color:var(--text2);overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;line-height:1.5}
.note-foot{display:flex;align-items:center;justify-content:space-between;margin-top:10px}
.note-tag{font-size:11px;background:var(--accent-bg);color:var(--accent2);padding:2px 8px;border-radius:20px}
.note-date{font-size:11px;color:var(--text3)}
.note-del{opacity:0;background:none;border:none;cursor:pointer;color:var(--text3);display:flex;padding:3px;border-radius:5px;transition:all .15s}
.note-card:hover .note-del{opacity:1}
.note-del:hover{color:var(--red)}
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;height:280px;gap:10px;color:var(--text3)}
/* Modal */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);width:100%;max-width:560px;max-height:90vh;display:flex;flex-direction:column}
.modal-hdr{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.modal-hdr h3{font-size:15px;font-weight:600}
.modal-body{padding:20px;flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px}
.modal-foot{padding:12px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px}
.close-btn{background:none;border:none;cursor:pointer;color:var(--text3);display:flex;padding:3px;border-radius:6px}
.close-btn:hover{color:var(--text)}
/* Progress */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.stat{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:16px;text-align:center}
.stat-val{font-size:28px;font-weight:800}
.stat-val.p{color:var(--accent2)}.stat-val.g{color:var(--green)}.stat-val.a{color:var(--amber)}
.stat-lbl{font-size:12px;color:var(--text3);margin-top:2px}
.prog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px}
.prog-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:16px}
.prog-card-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}
.prog-topic{font-size:15px;font-weight:600}
.prog-subj{font-size:11px;color:var(--text3);margin-top:2px}
.badge{font-size:11px;padding:3px 8px;border-radius:20px;font-weight:500}
.badge.completed{background:var(--green-bg);color:var(--green)}
.badge.in_progress{background:var(--amber-bg);color:var(--amber)}
.score-lbl{display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:4px}
.score-bar{height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:8px}
.score-fill{height:100%;background:var(--accent);border-radius:3px;transition:width .4s}
.score-fill.high{background:var(--green)}.score-fill.mid{background:var(--amber)}
.range{width:100%;accent-color:var(--accent);margin-bottom:8px}
.prog-foot{display:flex;justify-content:flex-end}
/* Upgrade banner */
.upgrade{margin:12px;background:linear-gradient(135deg,var(--accent-bg),transparent);border:1px solid var(--accent);border-radius:var(--rl);padding:12px 14px;cursor:pointer;transition:border-color .15s}
.upgrade:hover{border-color:var(--accent2)}
.upgrade-t{font-size:13px;font-weight:600;color:var(--accent2)}
.upgrade-s{font-size:11px;color:var(--text3)}
@media(max-width:600px){.sidebar{width:190px}.notes-grid{grid-template-columns:1fr}.stats{grid-template-columns:1fr}}
