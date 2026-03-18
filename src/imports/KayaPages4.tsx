// ═══════════════════════════════════════════════════════════════
// KAYA — Tenants, Settings, TenantPortalPremium,
//         TaxTracker, RentalIntelligencePremium
// Unified Kaya design system: Instrument Serif + DM Sans
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Users, MapPin, Phone, Mail, Calendar, DollarSign, CheckCircle2,
  Search, Filter, Award, Send, Shield, Clock, User, Bell, CreditCard,
  FileText, Building2, TrendingUp, TrendingDown, AlertTriangle,
  Calculator, Receipt, Wrench, Download, Plus, X, Home, Target,
  Brain, Zap, BarChart3, Star,
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ── Design tokens ──────────────────────────────────────────────
const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const wr:React.CSSProperties={maxWidth:1200,margin:"0 auto",padding:"48px 40px 80px"};
const hd=(sz:number):React.CSSProperties=>({fontFamily:SERIF,fontSize:sz,fontWeight:400,color:TX,lineHeight:1,letterSpacing:"-0.5px"});
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const tt={background:TX,border:"none",borderRadius:8,color:"#fff",fontSize:12,padding:"8px 12px"};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}) {
  const m={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

function KCard({ch,delay=0,style={}}:{ch:React.ReactNode;delay?:number;style?:React.CSSProperties}) {
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay,duration:.4,ease:[.22,1,.36,1]}}
      whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}} style={{...cd,...style}}>
      {ch}
    </motion.div>
  );
}

function Metric({label,value,sub,trend,color=TX,delay=0}:{label:string;value:string;sub?:string;trend?:string;color?:string;delay?:number}) {
  return (
    <KCard delay={delay} style={{padding:"20px 22px"}}>
      <p style={{...lb,marginBottom:10}}>{label}</p>
      <p style={{...hd(32),color,marginBottom:6}}>{value}</p>
      {(sub||trend)&&<div style={{display:"flex",gap:6,alignItems:"center"}}>
        {trend&&<span style={{fontSize:12,fontWeight:600,color:trend.startsWith("+")?G:"#C0392B"}}>{trend}</span>}
        {sub&&<span style={{fontSize:12,color:MU}}>{sub}</span>}
      </div>}
    </KCard>
  );
}

// ═══════════════════════════════════════════════════════════════
// TENANTS PAGE
// ═══════════════════════════════════════════════════════════════
export function Tenants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const tenants = [
    {id:1,name:"John Doe",email:"john.doe@email.com",phone:"(416) 555-0123",unit:"4A",address:"123 King Street",rent:2300,leaseStart:"Jan 1, 2025",leaseEnd:"Dec 31, 2025",status:"current",credit:720,risk:"low"},
    {id:2,name:"Alice Smith",email:"alice.smith@email.com",phone:"(416) 555-0124",unit:"1C",address:"456 Queen St W",rent:2800,leaseStart:"Mar 1, 2024",leaseEnd:"Feb 28, 2027",status:"current",credit:755,risk:"low"},
    {id:3,name:"Bob Johnson",email:"bob.johnson@email.com",phone:"(416) 555-0125",unit:"3A",address:"456 Queen St W",rent:2200,leaseStart:"Jun 1, 2025",leaseEnd:"May 31, 2026",status:"late",credit:680,risk:"medium"},
    {id:4,name:"Emma Wilson",email:"emma.wilson@email.com",phone:"(416) 555-0126",unit:"Unit 1",address:"789 Bloor Street",rent:3200,leaseStart:"Sep 1, 2024",leaseEnd:"Aug 31, 2026",status:"current",credit:790,risk:"low"},
    {id:5,name:"David Lee",email:"david.lee@email.com",phone:"(416) 555-0127",unit:"Unit 2",address:"789 Bloor Street",rent:3200,leaseStart:"Oct 1, 2025",leaseEnd:"Sep 30, 2026",status:"current",credit:735,risk:"low"},
  ];

  const filtered = tenants.filter(t =>
    (filter==="all"||t.status===filter) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pg}>
      <div style={wr}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lb}>Tenant Management</p>
          <h1 style={{...hd(48),marginTop:8}}><em style={{fontStyle:"italic",color:G}}>All</em> Tenants</h1>
          <p style={{fontSize:14,color:MU,marginTop:8}}>Manage your current tenants — {tenants.length} total</p>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          <Metric label="Total Tenants" value={String(tenants.length)} delay={.05}/>
          <Metric label="On-Time" value={String(tenants.filter(t=>t.status==="current").length)} color={G} sub={`${Math.round(tenants.filter(t=>t.status==="current").length/tenants.length*100)}% rate`} delay={.1}/>
          <Metric label="Late" value={String(tenants.filter(t=>t.status==="late").length)} color="#B45309" delay={.15}/>
          <Metric label="Avg Credit" value={String(Math.round(tenants.reduce((s,t)=>s+t.credit,0)/tenants.length))} delay={.2}/>
        </div>

        <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"center"}}>
          <div style={{position:"relative",flex:1,maxWidth:340}}>
            <Search size={14} color={MU} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tenants..."
              style={{width:"100%",padding:"10px 12px 10px 34px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none"}}/>
          </div>
          {["all","current","late"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"9px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:filter===f?TX:"#fff",color:filter===f?"#fff":MU,borderColor:filter===f?TX:BD,transition:"all .15s",textTransform:"capitalize"}}>{f==="all"?"All":f==="current"?"Current":"Late"}</button>
          ))}
          <p style={{marginLeft:"auto",fontSize:12,color:MU}}>{filtered.length} of {tenants.length}</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {filtered.map((t,i)=>(
            <motion.div key={t.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.06}}
              onClick={()=>navigate("/tenant-passport")}
              whileHover={{y:-3,boxShadow:"0 12px 36px rgba(0,0,0,0.1)"}}
              style={{...cd,padding:"22px 24px",cursor:"pointer",borderLeft:`3px solid ${t.risk==="low"?G:t.risk==="medium"?"#B45309":"#C0392B"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:G}}>
                    {t.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p style={{fontSize:16,fontWeight:600,color:TX,marginBottom:3}}>{t.name}</p>
                    <div style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:MU}}>
                      <MapPin size={11}/>{t.unit} · {t.address}
                    </div>
                  </div>
                </div>
                <Badge t={t.status==="current"?"✓ Current":"Late"} c={t.status==="current"?"green":"amber"}/>
              </div>

              <div style={{display:"flex",gap:4,marginBottom:14}}>
                <div style={{flex:1,padding:"10px 12px",background:BG,borderRadius:9}}>
                  <p style={{...lb,marginBottom:4}}>Monthly Rent</p>
                  <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>${t.rent.toLocaleString()}</p>
                </div>
                <div style={{flex:1,padding:"10px 12px",background:BG,borderRadius:9}}>
                  <p style={{...lb,marginBottom:4}}>Credit</p>
                  <p style={{fontFamily:SERIF,fontSize:20,color:t.credit>=740?G:t.credit>=670?"#B45309":"#C0392B"}}>{t.credit}</p>
                </div>
                <div style={{flex:1,padding:"10px 12px",background:BG,borderRadius:9}}>
                  <p style={{...lb,marginBottom:4}}>Risk</p>
                  <Badge t={t.risk} c={t.risk==="low"?"green":t.risk==="medium"?"amber":"red"}/>
                </div>
              </div>

              <div style={{paddingTop:12,borderTop:`1px solid ${BD}`,display:"flex",gap:4}}>
                <div style={{flex:1,fontSize:11,color:MU}}><span style={{fontWeight:600,color:TX}}>Lease:</span> {t.leaseStart} — {t.leaseEnd}</div>
              </div>

              <div style={{display:"flex",gap:8,marginTop:12}}>
                <button onClick={e=>{e.stopPropagation();navigate("/tenant-passport");}}
                  style={{flex:1,padding:"8px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                  <Award size={12}/>View Passport
                </button>
                <button onClick={e=>{e.stopPropagation();}}
                  style={{padding:"8px 14px",border:`1px solid ${BD}`,borderRadius:8,background:"transparent",fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU,display:"flex",alignItems:"center",gap:5}}>
                  <Send size={12}/>Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════
export function Settings() {
  const [toggles,setToggles]=useState({apps:true,payments:true,ai:true,lease:true});
  const [saved,setSaved]=useState(false);

  const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:BG};

  const Toggle=({k}:{k:keyof typeof toggles})=>(
    <div onClick={()=>setToggles(prev=>({...prev,[k]:!prev[k]}))}
      style={{width:42,height:24,borderRadius:20,background:toggles[k]?G:BD,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
      <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:toggles[k]?21:3,transition:"left .2s"}}/>
    </div>
  );

  return (
    <div style={pg}>
      <div style={{...wr,maxWidth:800}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lb}>Account</p>
          <h1 style={{...hd(48),marginTop:8}}><em style={{fontStyle:"italic",color:G}}>Settings</em></h1>
        </motion.div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Profile */}
          <KCard delay={.05} style={{overflow:"hidden"}}>
            <div style={{padding:"18px 24px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <User size={15} color={G}/>
              </div>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Profile Information</p>
            </div>
            <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:14}}>
              {[{l:"Full Name",v:"Justin Mafie",t:"text"},{l:"Email Address",v:"justin@kaya.ca",t:"email"},{l:"Phone Number",v:"(416) 555-0100",t:"tel"}].map(f=>(
                <div key={f.l}>
                  <p style={{...lb,marginBottom:7}}>{f.l}</p>
                  <input type={f.t} defaultValue={f.v} style={inp}/>
                </div>
              ))}
              <div>
                <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}}
                  style={{padding:"11px 24px",background:saved?G:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",transition:"background .2s"}}>
                  {saved?"✓ Saved!":"Save Changes"}
                </button>
              </div>
            </div>
          </KCard>

          {/* Notifications */}
          <KCard delay={.1} style={{overflow:"hidden"}}>
            <div style={{padding:"18px 24px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Bell size={15} color={G}/>
              </div>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Notifications</p>
            </div>
            <div style={{padding:"8px 0"}}>
              {[
                {k:"apps" as const,label:"New tenant applications",desc:"Notified when someone applies to your properties"},
                {k:"payments" as const,label:"Payment reminders",desc:"Alerts for late or upcoming rent payments"},
                {k:"ai" as const,label:"AI risk alerts",desc:"Notified when AI detects high-risk applications"},
                {k:"lease" as const,label:"Lease expiration warnings",desc:"Reminders 90 days before lease ends"},
              ].map((item,i,arr)=>(
                <div key={item.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:i<arr.length-1?`1px solid ${BD}`:"none"}}>
                  <div>
                    <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:3}}>{item.label}</p>
                    <p style={{fontSize:12,color:MU}}>{item.desc}</p>
                  </div>
                  <Toggle k={item.k}/>
                </div>
              ))}
            </div>
          </KCard>

          {/* Compliance */}
          <KCard delay={.15} style={{overflow:"hidden"}}>
            <div style={{padding:"18px 24px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Shield size={15} color={G}/>
              </div>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Ontario LTB Compliance</p>
            </div>
            <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:10}}>
              {[
                {label:"Standard Lease Template",sub:"Ontario RTA Compliant (2026)",status:"Active"},
                {label:"Property Registration",sub:"All 3 properties registered",status:"Verified"},
              ].map(c=>(
                <div key={c.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:GL,borderRadius:10,border:`1px solid rgba(10,122,82,0.15)`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <CheckCircle2 size={16} color={G}/>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:TX}}>{c.label}</p>
                      <p style={{fontSize:11,color:MU,marginTop:2}}>{c.sub}</p>
                    </div>
                  </div>
                  <span style={{fontSize:12,fontWeight:600,color:G}}>✓ {c.status}</span>
                </div>
              ))}
            </div>
          </KCard>

          {/* Billing */}
          <KCard delay={.2} style={{overflow:"hidden"}}>
            <div style={{padding:"18px 24px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:9,background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <CreditCard size={15} color="#B45309"/>
              </div>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Billing &amp; Subscription</p>
            </div>
            <div style={{padding:"24px"}}>
              <div style={{background:TX,borderRadius:14,padding:"24px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <p style={{color:"rgba(255,255,255,.5)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:6}}>Current Plan</p>
                    <p style={{fontFamily:SERIF,fontSize:24,color:"#fff"}}>Property Manager</p>
                    <p style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:4}}>Up to 50 units · All AI features</p>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <p style={{fontFamily:SERIF,fontSize:36,color:"#fff"}}>$79</p>
                    <p style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>/ month</p>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px solid rgba(255,255,255,.1)"}}>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Next billing: April 1, 2026</p>
                  <button style={{padding:"8px 16px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.15)",borderRadius:8,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          </KCard>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TENANT PORTAL (Sarah's view)
// ═══════════════════════════════════════════════════════════════
export function TenantPortalPremium() {
  const [payModalOpen,setPayModalOpen]=useState(false);
  const docs=[
    {name:"Lease Agreement",date:"Jan 1, 2026",type:"PDF"},
    {name:"March 2026 Receipt",date:"Mar 1, 2026",type:"PDF"},
    {name:"February 2026 Receipt",date:"Feb 1, 2026",type:"PDF"},
  ];
  const history=[
    {month:"March 2026",amount:"$2,300",date:"Mar 1"},
    {month:"February 2026",amount:"$2,300",date:"Feb 1"},
    {month:"January 2026",amount:"$2,300",date:"Jan 1"},
  ];

  return (
    <div style={{...pg,background:"#fff"}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"48px 32px 80px"}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lb}>Tenant Portal</p>
          <h1 style={{...hd(44),marginTop:8}}>Welcome, <em style={{fontStyle:"italic",color:G}}>Sarah</em></h1>
          <p style={{fontSize:14,color:MU,marginTop:8}}>Unit 4A · 123 King Street, Toronto</p>
        </motion.div>

        {/* Next rent hero card */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.1}}
          style={{background:TX,borderRadius:20,padding:"28px",marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
            <div>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:10}}>Next Rent Payment</p>
              <p style={{fontFamily:SERIF,fontSize:48,color:"#fff",lineHeight:1,marginBottom:6}}>$2,300</p>
              <p style={{fontSize:14,color:"rgba(255,255,255,.6)"}}>Due July 1, 2026 · <span style={{color:G,fontWeight:600}}>18 days away</span></p>
            </div>
            <div style={{padding:"10px",background:GL,borderRadius:12}}>
              <DollarSign size={24} color={G}/>
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setPayModalOpen(true)}
              style={{flex:1,padding:"12px",background:"#fff",color:TX,border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:SANS,transition:"opacity .2s"}}>
              Pay Now
            </button>
            <button style={{padding:"12px 20px",border:"1px solid rgba(255,255,255,.15)",color:"#fff",background:"transparent",borderRadius:10,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:SANS}}>
              Schedule
            </button>
          </div>
        </motion.div>

        {/* Lease info */}
        <KCard delay={.15} style={{padding:"22px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Lease Details</p>
            <Badge t="Active until May 2027" c="green"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,paddingTop:14,borderTop:`1px solid ${BD}`}}>
            {[{l:"Unit",v:"4A"},{l:"Address",v:"123 King St"},{l:"Start Date",v:"May 1, 2026"},{l:"End Date",v:"May 1, 2027"}].map(r=>(
              <div key={r.l}>
                <p style={{...lb,marginBottom:5}}>{r.l}</p>
                <p style={{fontSize:15,fontWeight:600,color:TX}}>{r.v}</p>
              </div>
            ))}
          </div>
        </KCard>

        {/* Quick stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:28}}>
          {[
            {label:"Payment Streak",value:"5/5",sub:"On time every month",color:G},
            {label:"Days to Due",value:"18",sub:"Auto-pay enabled"},
            {label:"Lease Remaining",value:"14 mo",sub:"Until May 2027"},
          ].map((s,i)=>(
            <KCard key={s.label} delay={.2+i*.05} style={{padding:"16px 18px"}}>
              <p style={lb}>{s.label}</p>
              <p style={{...hd(26),color:s.color||TX,marginTop:6,marginBottom:4}}>{s.value}</p>
              <p style={{fontSize:11,color:MU}}>{s.sub}</p>
            </KCard>
          ))}
        </div>

        {/* Documents */}
        <h2 style={{...hd(26),marginBottom:14}}>Documents</h2>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:28}}>
          {docs.map((d,i)=>(
            <motion.div key={d.name} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:.3+i*.05}}
              whileHover={{x:4}} style={{...cd,padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📄</div>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:TX}}>{d.name}</p>
                  <p style={{fontSize:11,color:MU,marginTop:2}}>{d.date} · {d.type}</p>
                </div>
              </div>
              <Download size={15} color={MU}/>
            </motion.div>
          ))}
        </div>

        {/* Payment history */}
        <h2 style={{...hd(26),marginBottom:14}}>Payment History</h2>
        <div style={cd}>
          {history.map((p,i)=>(
            <div key={p.month} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",borderBottom:i<history.length-1?`1px solid ${BD}`:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <CheckCircle2 size={15} color={G}/>
                </div>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:TX}}>{p.month}</p>
                  <p style={{fontSize:11,color:MU}}>Paid on {p.date}</p>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontSize:16,fontWeight:600,color:TX}}>{p.amount}</p>
                <Badge t="✓ Paid" c="green"/>
              </div>
            </div>
          ))}
        </div>

        {/* Pay modal */}
        <AnimatePresence>
          {payModalOpen&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,padding:"0 20px 20px"}}>
              <motion.div initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} exit={{y:60,opacity:0}}
                style={{background:"#fff",borderRadius:20,padding:32,width:"100%",maxWidth:480}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                  <p style={{fontFamily:SERIF,fontSize:24,color:TX}}>Pay Rent</p>
                  <button onClick={()=>setPayModalOpen(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={20} color={MU}/></button>
                </div>
                <div style={{background:BG,borderRadius:12,padding:"16px 20px",marginBottom:20}}>
                  <p style={{...lb,marginBottom:6}}>Amount due</p>
                  <p style={{fontFamily:SERIF,fontSize:36,color:TX}}>$2,300.00</p>
                  <p style={{fontSize:12,color:MU,marginTop:4}}>Unit 4A · July 1, 2026</p>
                </div>
                <div style={{padding:"14px 16px",border:`1px solid ${BD}`,borderRadius:10,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <CreditCard size={16} color={MU}/>
                    <div><p style={{fontSize:13,fontWeight:600,color:TX}}>•••• 4242</p><p style={{fontSize:11,color:MU}}>Visa · Expires 12/27</p></div>
                  </div>
                  <Badge t="Primary" c="green"/>
                </div>
                <button onClick={()=>{setPayModalOpen(false);}} style={{width:"100%",padding:"14px",background:G,color:"#fff",border:"none",borderRadius:10,fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                  Pay $2,300.00 →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAX TRACKER
// ═══════════════════════════════════════════════════════════════
export function TaxTracker() {
  const [year,setYear]=useState(2026);
  const [showAdd,setShowAdd]=useState(false);

  const expenses=[
    {id:"1",date:"Mar 10",cat:"Repairs & Maintenance",desc:"Plumbing repair — Unit 4A",amount:450,hst:58.50,vendor:"Quick Plumbing",property:"123 King St",deductible:true},
    {id:"2",date:"Mar 8",cat:"Utilities",desc:"Hydro — Common Areas",amount:280,hst:36.40,vendor:"Toronto Hydro",property:"123 King St",deductible:true},
    {id:"3",date:"Mar 5",cat:"Insurance",desc:"Property Insurance Q1",amount:1200,hst:0,vendor:"Intact Insurance",property:"All Properties",deductible:true},
    {id:"4",date:"Feb 28",cat:"Professional Services",desc:"Accounting fees",amount:350,hst:45.50,vendor:"CPA Firm",property:"All Properties",deductible:true},
    {id:"5",date:"Feb 20",cat:"Repairs & Maintenance",desc:"HVAC service — 789 Bloor",amount:380,hst:49.40,vendor:"HVAC Pro",property:"789 Bloor St",deductible:true},
  ];

  const totalExp=expenses.reduce((s,e)=>s+e.amount,0);
  const totalHst=expenses.reduce((s,e)=>s+e.hst,0);
  const totalIncome=27600;
  const netIncome=totalIncome-totalExp;

  const catTotals:[string,number][]=Object.entries(expenses.reduce((acc,e)=>({...acc,[e.cat]:(acc[e.cat]||0)+e.amount}),{} as Record<string,number>));

  const catIcon=(c:string)=>{
    if(c.includes("Repair")||c.includes("Maintenance")) return <Wrench size={14} color={G}/>;
    if(c.includes("Util")) return <Building2 size={14} color={G}/>;
    if(c.includes("Insur")) return <Shield size={14} color={G}/>;
    if(c.includes("Prof")) return <FileText size={14} color={G}/>;
    return <Receipt size={14} color={G}/>;
  };

  return (
    <div style={pg}>
      <div style={wr}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={lb}>CRA Tax Tools</p>
            <h1 style={{...hd(48),marginTop:8}}>Tax <em style={{fontStyle:"italic",color:G}}>Tracker</em></h1>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <select value={year} onChange={e=>setYear(Number(e.target.value))}
              style={{padding:"10px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,background:"#fff",color:TX,outline:"none"}}>
              {[2026,2025,2024].map(y=><option key={y}>{y}</option>)}
            </select>
            <button style={{display:"flex",alignItems:"center",gap:7,padding:"10px 18px",background:TX,border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",color:"#fff"}}>
              <Download size={13}/>Export T776
            </button>
          </div>
        </motion.div>

        {/* Income vs expenses overview */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          <Metric label="Rental Income" value={`$${totalIncome.toLocaleString()}`} trend="+12%" delay={.05}/>
          <Metric label="Total Expenses" value={`$${totalExp.toFixed(0)}`} sub="deductible" delay={.1}/>
          <Metric label="Net Income" value={`$${netIncome.toLocaleString()}`} color={G} delay={.15}/>
          <Metric label="HST Input Credits" value={`$${totalHst.toFixed(2)}`} color="#1E5FA8" delay={.2}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16,marginBottom:24}}>
          {/* Expense table */}
          <KCard delay={.25} style={{overflow:"hidden"}}>
            <div style={{padding:"18px 22px",borderBottom:`1px solid ${BD}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>Expense Log</p>
              <button onClick={()=>setShowAdd(true)}
                style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:GL,border:"none",borderRadius:8,fontSize:12,fontWeight:600,color:G,cursor:"pointer",fontFamily:SANS}}>
                <Plus size={12}/>Add Expense
              </button>
            </div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:BG}}>
                  {["Date","Category","Description","Amount","HST","Deductible"].map(h=>(
                    <th key={h} style={{padding:"10px 16px",textAlign:"left",...lb}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.map((e,i)=>(
                  <tr key={e.id} style={{borderTop:`1px solid ${BD}`}}>
                    <td style={{padding:"13px 16px",fontSize:12,color:MU}}>{e.date}</td>
                    <td style={{padding:"13px 16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:26,height:26,borderRadius:7,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>{catIcon(e.cat)}</div>
                        <span style={{fontSize:12,color:TX,fontWeight:500}}>{e.cat}</span>
                      </div>
                    </td>
                    <td style={{padding:"13px 16px",fontSize:12,color:MU}}>{e.desc}</td>
                    <td style={{padding:"13px 16px",fontSize:13,fontWeight:600,color:TX}}>${e.amount.toFixed(2)}</td>
                    <td style={{padding:"13px 16px",fontSize:12,color:MU}}>{e.hst>0?`$${e.hst.toFixed(2)}`:"Exempt"}</td>
                    <td style={{padding:"13px 16px"}}><Badge t={e.deductible?"✓ Yes":"No"} c={e.deductible?"green":"gray"}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </KCard>

          {/* Category breakdown */}
          <KCard delay={.3} style={{padding:"22px"}}>
            <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:18}}>By Category</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {catTotals.map(([cat,amt])=>(
                <div key={cat}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:12,color:TX,fontWeight:500}}>{cat.split("&")[0].trim()}</span>
                    <span style={{fontSize:12,fontWeight:700,color:TX}}>${(amt as number).toFixed(0)}</span>
                  </div>
                  <div style={{height:5,background:BD,borderRadius:3}}>
                    <div style={{height:5,background:G,borderRadius:3,width:`${Math.min(100,((amt as number)/totalExp)*100)}%`}}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:"14px",background:BG,borderRadius:10}}>
              <p style={{...lb,marginBottom:8}}>T776 Summary</p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:MU}}>Gross Income</span><span style={{fontWeight:600,color:TX}}>${totalIncome.toLocaleString()}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:MU}}>Total Expenses</span><span style={{fontWeight:600,color:TX}}>-${totalExp.toFixed(0)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,paddingTop:8,borderTop:`1px solid ${BD}`}}><span style={{fontWeight:600,color:TX}}>Net Rental Income</span><span style={{fontWeight:700,color:G}}>${netIncome.toLocaleString()}</span></div>
              </div>
            </div>
          </KCard>
        </div>

        {/* Add expense modal */}
        <AnimatePresence>
          {showAdd&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
              <motion.div initial={{scale:.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.92,opacity:0}}
                style={{background:"#fff",borderRadius:20,padding:32,width:440}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
                  <p style={{fontFamily:SERIF,fontSize:24,color:TX}}>Add Expense</p>
                  <button onClick={()=>setShowAdd(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={MU}/></button>
                </div>
                {[{l:"Description",p:"e.g. Plumbing repair"},{l:"Vendor",p:"e.g. Quick Plumbing"},{l:"Amount ($)",p:"0.00"}].map(f=>(
                  <div key={f.l} style={{marginBottom:14}}>
                    <p style={{...lb,marginBottom:7}}>{f.l}</p>
                    <input placeholder={f.p} style={{width:"100%",padding:"10px 12px",border:`1px solid ${BD}`,borderRadius:8,fontFamily:SANS,fontSize:13,color:TX,outline:"none"}}/>
                  </div>
                ))}
                <button onClick={()=>setShowAdd(false)} style={{width:"100%",padding:"12px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  Add Expense →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RENTAL INTELLIGENCE PREMIUM
// ═══════════════════════════════════════════════════════════════
export function RentalIntelligencePremium() {
  const [hood,setHood]=useState("Downtown Toronto");

  const markets=[
    {n:"Downtown Toronto",avgRent:2450,change:8.5,vacancy:2.3,demand:92,days:12,amenities:["Gym","Parking","In-suite Laundry"]},
    {n:"North York",avgRent:2100,change:6.2,vacancy:3.8,demand:85,days:18,amenities:["Parking","Balcony","Pet-friendly"]},
    {n:"Etobicoke",avgRent:1950,change:5.1,vacancy:4.2,demand:78,days:22,amenities:["Parking","Storage","Utilities Incl."]},
    {n:"Scarborough",avgRent:1800,change:4.3,vacancy:5.1,demand:71,days:28,amenities:["Parking","Backyard","Quiet"]},
  ];

  const vacancies=[
    {unit:"Unit 5A",address:"123 King St",tenant:"Vacant",leaseEnd:"Now",risk:"high",days:14,action:"List immediately — high demand area"},
    {unit:"Unit 2B",address:"456 Queen St",tenant:"Alice Smith",leaseEnd:"Feb 28, 2027",risk:"low",days:280,action:"Send renewal notice in 90 days"},
    {unit:"Unit 3A",address:"456 Queen St",tenant:"Bob Johnson",leaseEnd:"May 31, 2026",risk:"medium",days:75,action:"Begin renewal conversation now"},
  ];

  const pricing=[
    {property:"123 King St · 4A",current:2300,market:2450,diff:150,pct:6.1,rec:"Increase on renewal"},
    {property:"456 Queen St · 3A",current:2200,market:2100,diff:-100,pct:-4.5,rec:"At or above market"},
    {property:"789 Bloor St · Unit 1",current:3200,market:3400,diff:200,pct:6.3,rec:"Increase on renewal"},
  ];

  const selected=markets.find(m=>m.n===hood)||markets[0];

  const trendData=[
    {m:"Oct",v:2200},{m:"Nov",v:2250},{m:"Dec",v:2280},{m:"Jan",v:2310},{m:"Feb",v:2380},{m:"Mar",v:2450},{m:"Apr",v:2490}
  ];

  return (
    <div style={pg}>
      <div style={wr}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lb}>Market Intelligence</p>
          <h1 style={{...hd(48),marginTop:8}}>Rental <em style={{fontStyle:"italic",color:G}}>Intelligence</em></h1>
          <p style={{fontSize:14,color:MU,marginTop:8}}>AI-powered market insights for Toronto &amp; GTA</p>
        </motion.div>

        {/* Neighbourhood selector */}
        <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
          {markets.map(m=>(
            <button key={m.n} onClick={()=>setHood(m.n)}
              style={{padding:"9px 18px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:hood===m.n?TX:"#fff",color:hood===m.n?"#fff":MU,borderColor:hood===m.n?TX:BD,transition:"all .15s"}}>
              {m.n}
            </button>
          ))}
        </div>

        {/* Selected market metrics */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          <Metric label="Avg Monthly Rent" value={`$${selected.avgRent.toLocaleString()}`} trend={`+${selected.change}%`} delay={.05}/>
          <Metric label="Vacancy Rate" value={`${selected.vacancy}%`} sub="market avg" delay={.1}/>
          <Metric label="Demand Score" value={`${selected.demand}/100`} color={selected.demand>85?G:"#B45309"} delay={.15}/>
          <Metric label="Days to Lease" value={`${selected.days}d`} sub="avg listing" delay={.2}/>
        </div>

        {/* Rent trend chart */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:16,marginBottom:24}}>
          <KCard delay={.25} style={{padding:"24px"}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:4}}>Rent Trend — {hood}</p>
            <p style={{fontSize:11,color:MU,marginBottom:20}}>Average 2-bed rent over 7 months</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trendData} margin={{left:-20}}>
                <defs>
                  <linearGradient id="riGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={G} stopOpacity={.15}/>
                    <stop offset="100%" stopColor={G} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BD}/>
                <XAxis dataKey="m" stroke="none" tick={{fill:MU,fontSize:11}}/>
                <YAxis stroke="none" tick={{fill:MU,fontSize:11}}/>
                <Tooltip contentStyle={tt} formatter={(v:number)=>[`$${v.toLocaleString()}`,""]}/>
                <Area type="monotone" dataKey="v" stroke={G} strokeWidth={2} fill="url(#riGrad)" dot={false} activeDot={{r:4,fill:G}}/>
              </AreaChart>
            </ResponsiveContainer>
          </KCard>

          <KCard delay={.3} style={{padding:"22px"}}>
            <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:16}}>Top Amenities</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {selected.amenities.map((a,i)=>(
                <div key={a} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:BG,borderRadius:9}}>
                  <span style={{fontSize:12,fontWeight:700,color:G}}>#{i+1}</span>
                  <span style={{fontSize:13,color:TX,fontWeight:500}}>{a}</span>
                </div>
              ))}
            </div>
            <div style={{padding:"12px",background:GL,borderRadius:10}}>
              <p style={{fontSize:12,fontWeight:600,color:G,marginBottom:4}}>AI Insight</p>
              <p style={{fontSize:12,color:"#085040",lineHeight:1.55}}>Properties with {selected.amenities[0]} command a <strong>+${Math.round(selected.avgRent*0.08)}/mo</strong> premium in {hood}.</p>
            </div>
          </KCard>
        </div>

        {/* Vacancy risk */}
        <KCard delay={.35} style={{overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"18px 22px",borderBottom:`1px solid ${BD}`}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>Vacancy Risk Forecast</p>
            <p style={{fontSize:11,color:MU,marginTop:3}}>AI predictions based on lease dates and market conditions</p>
          </div>
          {vacancies.map((v,i)=>(
            <div key={v.unit} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 22px",borderBottom:i<vacancies.length-1?`1px solid ${BD}`:"none",borderLeft:`3px solid ${v.risk==="high"?"#C0392B":v.risk==="medium"?"#B45309":G}`}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:40,height:40,borderRadius:10,background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏠</div>
                <div>
                  <p style={{fontSize:14,fontWeight:600,color:TX}}>{v.unit} · {v.address}</p>
                  <p style={{fontSize:12,color:MU}}>{v.tenant} · Lease ends {v.leaseEnd}</p>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{textAlign:"right"}}>
                  <p style={{fontSize:12,color:MU,marginBottom:3}}>{v.days}d until vacant</p>
                  <p style={{fontSize:11,color:"#B45309",fontWeight:600}}>{v.action}</p>
                </div>
                <Badge t={v.risk} c={v.risk==="high"?"red":v.risk==="medium"?"amber":"green"}/>
              </div>
            </div>
          ))}
        </KCard>

        {/* Pricing vs market */}
        <KCard delay={.4} style={{overflow:"hidden"}}>
          <div style={{padding:"18px 22px",borderBottom:`1px solid ${BD}`}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>Your Pricing vs Market</p>
            <p style={{fontSize:11,color:MU,marginTop:3}}>AI compares your rents against live market data</p>
          </div>
          {pricing.map((p,i)=>(
            <div key={p.property} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 22px",borderBottom:i<pricing.length-1?`1px solid ${BD}`:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:34,height:34,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}><Building2 size={14} color={G}/></div>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:TX}}>{p.property}</p>
                  <p style={{fontSize:11,color:MU}}>{p.rec}</p>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:20}}>
                <div style={{textAlign:"right"}}>
                  <p style={{fontSize:11,color:MU}}>Your rent</p>
                  <p style={{fontSize:15,fontWeight:700,color:TX}}>${p.current.toLocaleString()}</p>
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{fontSize:11,color:MU}}>Market avg</p>
                  <p style={{fontSize:15,fontWeight:700,color:TX}}>${p.market.toLocaleString()}</p>
                </div>
                <Badge t={p.diff>0?`↑ +$${p.diff}`:p.diff===0?"At market":`↓ $${Math.abs(p.diff)}`} c={p.diff>0?"amber":p.diff<0?"green":"gray"}/>
              </div>
            </div>
          ))}
        </KCard>
      </div>
    </div>
  );
}
