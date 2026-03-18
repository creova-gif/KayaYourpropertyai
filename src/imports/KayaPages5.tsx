// ═══════════════════════════════════════════════════════════════
// KAYA — TenantDashboard, TenantScreening, PropertyOnboardingWizard,
//         RentCollection, TenantLeaseSigning, TenantPassportPremium
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Home, CreditCard, FileText, Wrench, Calendar, CheckCircle2,
  DollarSign, Shield, Award, UserCheck, AlertTriangle, Clock,
  TrendingUp, ChevronRight, ChevronLeft, MapPin, Building2,
  Bed, Bath, Plus, X, Download, Send, Star, Upload, Check,
  Mail, Phone, User, Briefcase, Edit3, Sparkles, ArrowRight,
} from "lucide-react";

// ── Tokens ─────────────────────────────────────────────────────
const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}) {
  const m={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

// ═══════════════════════════════════════════════════════════════
// TENANT DASHBOARD (tenant's view of their home)
// ═══════════════════════════════════════════════════════════════
export function TenantDashboard() {
  const [activeTab,setActiveTab]=useState("home");

  const tabs=[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"pay",icon:"💳",label:"Payments"},
    {id:"docs",icon:"📄",label:"Documents"},
    {id:"maint",icon:"🔧",label:"Maintenance"},
  ];

  const payHistory=[
    {month:"March 2026",amount:2300,status:"paid",method:"Auto-pay",date:"Mar 1"},
    {month:"February 2026",amount:2300,status:"paid",method:"Auto-pay",date:"Feb 1"},
    {month:"January 2026",amount:2300,status:"paid",method:"Auto-pay",date:"Jan 1"},
    {month:"December 2025",amount:2300,status:"paid",method:"Manual",date:"Dec 1"},
  ];

  const maintReqs=[
    {issue:"Bathroom faucet dripping",cat:"Plumbing",status:"in_progress",date:"Mar 12",response:"Plumber scheduled Mar 15, 2–4 PM"},
    {issue:"Dishwasher making noise",cat:"Appliance",status:"completed",date:"Mar 8",completed:"Mar 10"},
  ];

  const docs=[
    {name:"Lease Agreement",type:"Lease",date:"Jan 1, 2025",status:"signed"},
    {name:"March 2026 Receipt",type:"Receipt",date:"Mar 1, 2026",status:"available"},
    {name:"February 2026 Receipt",type:"Receipt",date:"Feb 1, 2026",status:"available"},
    {name:"Move-In Inspection",type:"Inspection",date:"Jan 1, 2025",status:"signed"},
  ];

  return (
    <div style={{...pg,background:"#fff"}}>
      {/* Tenant nav */}
      <div style={{background:"#fff",borderBottom:`1px solid ${BD}`,padding:"0 28px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:62,zIndex:80}}>
        <div>
          <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>John Doe</p>
          <p style={{fontSize:11,color:MU}}>Unit 4A · 123 King Street</p>
        </div>
        <div style={{display:"flex",gap:6}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{padding:"7px 14px",borderRadius:9,border:"1px solid",fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .15s",background:activeTab===t.id?TX:"transparent",color:activeTab===t.id?"#fff":MU,borderColor:activeTab===t.id?TX:BD}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:800,margin:"0 auto",padding:"32px 28px 80px"}}>

        {/* HOME TAB */}
        {activeTab==="home"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            {/* Hero rent card */}
            <div style={{background:TX,borderRadius:20,padding:"28px",marginBottom:20}}>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:10}}>Next Rent Payment</p>
              <p style={{fontFamily:SERIF,fontSize:48,color:"#fff",lineHeight:1,marginBottom:6}}>$2,300</p>
              <p style={{fontSize:13,color:"rgba(255,255,255,.5)",marginBottom:20}}>Due April 1, 2026 · <span style={{color:G,fontWeight:600}}>18 days away</span></p>
              <div style={{display:"flex",gap:10}}>
                <button style={{flex:1,padding:"11px",background:"#fff",color:TX,border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Pay Now</button>
                <button style={{padding:"11px 18px",background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.15)",borderRadius:9,fontSize:13,cursor:"pointer",fontFamily:SANS}}>Set up auto-pay</button>
              </div>
            </div>

            {/* Badges */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
              {[
                {icon:"⭐",label:"Model Tenant",sub:"5/5 on-time payments",color:G},
                {icon:"🔥",label:"100% Streak",sub:"Never missed a payment"},
                {icon:"🏠",label:"14 Months",sub:"Of lease remaining"},
              ].map(b=>(
                <div key={b.label} style={{...cd,padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:20}}>{b.icon}</span>
                  <div>
                    <p style={{fontSize:12,fontWeight:700,color:b.color||TX}}>{b.label}</p>
                    <p style={{fontSize:11,color:MU,marginTop:2}}>{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lease summary */}
            <div style={{...cd,padding:"18px 22px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Your Lease</p>
                <Badge t="Active" c="green"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{l:"Unit",v:"4A"},{l:"Address",v:"123 King Street, Toronto"},{l:"Lease Start",v:"Jan 1, 2025"},{l:"Lease End",v:"Dec 31, 2025"},{l:"Monthly Rent",v:"$2,300"},{l:"Deposit Paid",v:"$2,300"}].map(r=>(
                  <div key={r.l}><p style={{...lb,marginBottom:4}}>{r.l}</p><p style={{fontSize:14,fontWeight:600,color:TX}}>{r.v}</p></div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {[
                {icon:CreditCard,label:"Make Payment",sub:"Next due Apr 1",tab:"pay"},
                {icon:Wrench,label:"Report Issue",sub:"2 open requests",tab:"maint"},
                {icon:FileText,label:"View Lease",sub:"Signed Jan 2025",tab:"docs"},
              ].map(a=>(
                <button key={a.label} onClick={()=>setActiveTab(a.tab)}
                  style={{...cd,padding:"16px",cursor:"pointer",textAlign:"left",border:`1px solid ${BD}`,borderRadius:14,fontFamily:SANS,transition:"all .2s",background:"#fff"}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=G)}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor=BD)}>
                  <div style={{width:34,height:34,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
                    <a.icon size={15} color={G}/>
                  </div>
                  <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:3}}>{a.label}</p>
                  <p style={{fontSize:11,color:MU}}>{a.sub}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab==="pay"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <h2 style={{fontFamily:SERIF,fontSize:32,color:TX,marginBottom:6}}>Payments</h2>
            <p style={{fontSize:14,color:MU,marginBottom:24}}>All payments on time · Auto-pay enabled</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
              <div style={{...cd,padding:"16px 18px"}}><p style={{...lb,marginBottom:8}}>Next Payment</p><p style={{fontFamily:SERIF,fontSize:28,color:TX}}>$2,300</p><p style={{fontSize:11,color:MU}}>Due Apr 1</p></div>
              <div style={{...cd,padding:"16px 18px"}}><p style={{...lb,marginBottom:8}}>Total Paid</p><p style={{fontFamily:SERIF,fontSize:28,color:G}}>$11,500</p><p style={{fontSize:11,color:MU}}>5 payments</p></div>
              <div style={{...cd,padding:"16px 18px"}}><p style={{...lb,marginBottom:8}}>Auto-Pay</p><p style={{fontSize:18,fontWeight:700,color:G}}>✓ Active</p><p style={{fontSize:11,color:MU}}>Visa •••• 4242</p></div>
            </div>
            <div style={cd}>
              <div style={{padding:"14px 20px",borderBottom:`1px solid ${BD}`}}><p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Payment History</p></div>
              {payHistory.map((p,i)=>(
                <div key={p.month} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:i<payHistory.length-1?`1px solid ${BD}`:"none",borderLeft:`3px solid ${G}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle2 size={14} color={G}/></div>
                    <div><p style={{fontSize:13,fontWeight:600,color:TX}}>{p.month}</p><p style={{fontSize:11,color:MU}}>Paid {p.date} · {p.method}</p></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontFamily:SERIF,fontSize:18,color:TX}}>${p.amount.toLocaleString()}</span>
                    <Badge t="✓ Paid" c="green"/>
                    <button style={{padding:"5px 10px",border:`1px solid ${BD}`,borderRadius:7,background:"transparent",cursor:"pointer",fontFamily:SANS,fontSize:11,color:MU,display:"flex",alignItems:"center",gap:4}}>
                      <Download size={10}/>Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab==="docs"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <h2 style={{fontFamily:SERIF,fontSize:32,color:TX,marginBottom:6}}>Documents</h2>
            <p style={{fontSize:14,color:MU,marginBottom:24}}>Lease, receipts, and important records</p>
            <div style={cd}>
              {docs.map((d,i)=>(
                <div key={d.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:i<docs.length-1?`1px solid ${BD}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:34,height:34,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>📄</div>
                    <div><p style={{fontSize:13,fontWeight:600,color:TX}}>{d.name}</p><p style={{fontSize:11,color:MU}}>{d.type} · {d.date}</p></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <Badge t={d.status==="signed"?"✓ Signed":"Available"} c={d.status==="signed"?"green":"gray"}/>
                    <button style={{padding:"5px 12px",border:`1px solid ${BD}`,borderRadius:7,background:"transparent",cursor:"pointer",fontFamily:SANS,fontSize:11,color:MU,display:"flex",alignItems:"center",gap:4}}>
                      <Download size={11}/>Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab==="maint"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24}}>
              <div>
                <h2 style={{fontFamily:SERIF,fontSize:32,color:TX,marginBottom:4}}>Maintenance</h2>
                <p style={{fontSize:14,color:MU}}>Submit and track your repair requests</p>
              </div>
              <button style={{display:"flex",alignItems:"center",gap:7,padding:"10px 18px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                <Plus size={13}/>New Request
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {maintReqs.map((r,i)=>(
                <div key={r.issue} style={{...cd,padding:"18px 20px",borderLeft:`3px solid ${r.status==="completed"?G:"#1E5FA8"}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:3}}>{r.issue}</p>
                      <p style={{fontSize:12,color:MU}}>{r.cat} · Submitted {r.date}</p>
                    </div>
                    <Badge t={r.status==="completed"?"✓ Completed":"In Progress"} c={r.status==="completed"?"green":"blue"}/>
                  </div>
                  {r.response&&(
                    <div style={{padding:"10px 12px",background:BG,borderRadius:9,fontSize:12,color:MU,borderLeft:`3px solid ${r.status==="completed"?G:"#1E5FA8"}`}}>
                      <span style={{fontWeight:600,color:TX}}>Landlord: </span>{r.response}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TENANT SCREENING (landlord tool)
// ═══════════════════════════════════════════════════════════════
export function TenantScreening() {
  const [sel,setSel]=useState<string|null>(null);

  const reports=[
    {id:"1",name:"Sarah Kim",property:"123 King St — Unit 4A",date:"Mar 15",status:"completed",credit:750,risk:92,income:6500,employment:"Full-time employed",history:"Excellent — 8 years",criminal:false,eviction:false,rec:"approve"},
    {id:"2",name:"Michael Chen",property:"123 King St — Unit 2C",date:"Mar 14",status:"completed",credit:680,risk:75,income:4200,employment:"Contract worker",history:"Good — 3 years",criminal:false,eviction:false,rec:"conditional"},
    {id:"3",name:"David Martinez",property:"456 Queen St — Unit 1B",date:"Mar 12",status:"pending",credit:0,risk:0,income:0,employment:"",history:"",criminal:false,eviction:false,rec:"pending"},
  ];

  const recColor={approve:[GL,G],conditional:["#FEF3C7","#B45309"],reject:["#FDECEA","#C0392B"],pending:[BG,MU]};
  const recLabel={approve:"✓ Approve",conditional:"⚠ Conditional",reject:"✗ Reject",pending:"Pending"};

  return (
    <div style={pg}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 40px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lb}>AI Screening Engine</p>
          <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TX,letterSpacing:"-1px",marginTop:8}}>
            Tenant <em style={{fontStyle:"italic",color:G}}>Screening</em>
          </h1>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          {[{l:"Reports Run",v:"3"},{l:"Completed",v:"2",c:G},{l:"Pending",v:"1",c:"#1E5FA8"},{l:"Avg Risk Score",v:"83",c:G}].map((s,i)=>(
            <div key={s.l} style={{...cd,padding:"18px 20px"}}>
              <p style={lb}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:s.c||TX,marginTop:8,lineHeight:1}}>{s.v}</p>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:sel?"1fr 380px":"1fr",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {reports.map((r,i)=>{
              const [rbg,rtc]=recColor[r.rec as keyof typeof recColor]||[BG,MU];
              return (
                <motion.div key={r.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.06}}
                  onClick={()=>setSel(sel===r.id?null:r.id)} whileHover={{x:3}}
                  style={{...cd,padding:"18px 22px",cursor:"pointer",borderLeft:`3px solid ${r.rec==="approve"?G:r.rec==="conditional"?"#B45309":r.status==="pending"?"#1E5FA8":"#C0392B"}`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      {r.status==="completed"&&(
                        <div style={{width:52,height:52,borderRadius:"50%",background:r.risk>=85?GL:r.risk>=70?"#FEF3C7":"#FDECEA",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <span style={{fontSize:17,fontWeight:700,color:r.risk>=85?G:r.risk>=70?"#B45309":"#C0392B",lineHeight:1}}>{r.risk}</span>
                          <span style={{fontSize:8,fontWeight:700,color:r.risk>=85?G:r.risk>=70?"#B45309":"#C0392B",textTransform:"uppercase"}}>AI</span>
                        </div>
                      )}
                      {r.status==="pending"&&(
                        <div style={{width:52,height:52,borderRadius:"50%",background:"#EBF2FB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Clock size={20} color="#1E5FA8"/>
                        </div>
                      )}
                      <div>
                        <p style={{fontSize:15,fontWeight:600,color:TX,marginBottom:3}}>{r.name}</p>
                        <p style={{fontSize:12,color:MU}}>{r.property} · {r.date}</p>
                        {r.status==="completed"&&(
                          <div style={{display:"flex",gap:16,marginTop:8}}>
                            <span style={{fontSize:12,color:MU}}>Credit: <strong style={{color:TX}}>{r.credit}</strong></span>
                            <span style={{fontSize:12,color:MU}}>Income: <strong style={{color:TX}}>${r.income.toLocaleString()}/mo</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{background:rbg,color:rtc,fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20}}>{recLabel[r.rec as keyof typeof recLabel]}</span>
                      <ChevronRight size={14} color={MU}/>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {sel&&(()=>{
              const r=reports.find(x=>x.id===sel);
              if(!r||r.status==="pending") return null;
              return (
                <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}
                  style={{...cd,padding:"22px",height:"fit-content",position:"sticky",top:100}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                    <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>{r.name}</p>
                    <button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={MU}/></button>
                  </div>
                  <div style={{background:r.rec==="approve"?GL:r.rec==="conditional"?"#FEF3C7":"#FDECEA",borderRadius:12,padding:"14px",marginBottom:16}}>
                    <p style={{fontSize:11,fontWeight:700,color:r.rec==="approve"?G:"#B45309",textTransform:"uppercase",letterSpacing:".5px",marginBottom:6}}>AI Recommendation</p>
                    <p style={{fontSize:14,fontWeight:600,color:r.rec==="approve"?G:"#B45309"}}>{r.rec==="approve"?"Approve — Low risk tenant":"Conditional — Review income ratio"}</p>
                  </div>
                  {[{l:"Credit Score",v:String(r.credit)},{l:"Monthly Income",v:`$${r.income.toLocaleString()}`},{l:"Employment",v:r.employment},{l:"Rental History",v:r.history},{l:"Criminal Record",v:r.criminal?"Yes":"None"},{l:"Eviction History",v:r.eviction?"Yes":"None"}].map(f=>(
                    <div key={f.l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${BD}`}}>
                      <span style={{fontSize:12,color:MU}}>{f.l}</span>
                      <span style={{fontSize:12,fontWeight:600,color:f.v==="None"||f.v==="Excellent — 8 years"?G:TX}}>{f.v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:8,marginTop:16}}>
                    <button style={{flex:1,padding:"10px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>Approve →</button>
                    <button style={{padding:"10px 14px",border:`1px solid ${BD}`,borderRadius:9,background:"transparent",fontFamily:SANS,fontSize:12,cursor:"pointer",color:MU}}>Download</button>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROPERTY ONBOARDING WIZARD
// ═══════════════════════════════════════════════════════════════
export function PropertyOnboardingWizard() {
  const [step,setStep]=useState(0);
  const [data,setData]=useState({street:"",city:"",province:"ON",type:"",units:"1",beds:"2",baths:"1",sqft:"",rent:"",amenities:[] as string[]});
  const navigate=useNavigate();

  const steps=[
    {title:"Property Address",sub:"Where is the property located?"},
    {title:"Property Type",sub:"What kind of property is it?"},
    {title:"Unit Details",sub:"Tell us about the unit"},
    {title:"Amenities",sub:"What's included?"},
    {title:"Review & Publish",sub:"Everything looks good?"},
  ];

  const types=["Condo","Apartment","House","Townhouse","Basement Suite","Studio"];
  const amenityOpts=["Parking","In-suite Laundry","Gym","Pets Allowed","Utilities Included","Furnished","Balcony","Storage","Dishwasher","Air Conditioning"];

  const toggleAmenity=(a:string)=>setData(d=>({...d,amenities:d.amenities.includes(a)?d.amenities.filter(x=>x!==a):[...d.amenities,a]}));

  return (
    <div style={pg}>
      <div style={{maxWidth:680,margin:"0 auto",padding:"48px 32px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:36}}>
          <p style={lb}>Add Property</p>
          <h1 style={{fontFamily:SERIF,fontSize:40,color:TX,marginTop:8,letterSpacing:"-0.5px"}}>
            {steps[step].title}
          </h1>
          <p style={{fontSize:14,color:MU,marginTop:6}}>{steps[step].sub}</p>
        </motion.div>

        {/* Progress */}
        <div style={{display:"flex",gap:4,marginBottom:36}}>
          {steps.map((_,i)=>(
            <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=step?G:BD,transition:"background .3s"}}/>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:.25}}>

            {step===0&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[{l:"Street Address",k:"street",p:"e.g. 123 King Street"},{l:"City",k:"city",p:"e.g. Toronto"},{l:"Postal Code",k:"postal",p:"e.g. M5H 1A1"}].map(f=>(
                  <div key={f.l}>
                    <p style={{...lb,marginBottom:7}}>{f.l}</p>
                    <input placeholder={f.p} style={inp} onChange={e=>setData(d=>({...d,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div>
                  <p style={{...lb,marginBottom:7}}>Province</p>
                  <select value={data.province} onChange={e=>setData(d=>({...d,province:e.target.value}))} style={{...inp,cursor:"pointer"}}>
                    {["ON","BC","AB","QC","NS","MB","SK"].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step===1&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {types.map(t=>(
                  <button key={t} onClick={()=>setData(d=>({...d,type:t}))}
                    style={{padding:"16px",border:`1.5px solid ${data.type===t?G:BD}`,borderRadius:12,background:data.type===t?GL:"#fff",cursor:"pointer",fontFamily:SANS,textAlign:"left",transition:"all .15s"}}>
                    <p style={{fontSize:14,fontWeight:600,color:data.type===t?G:TX}}>{t}</p>
                    {data.type===t&&<p style={{fontSize:11,color:G,marginTop:3}}>✓ Selected</p>}
                  </button>
                ))}
              </div>
            )}

            {step===2&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {l:"Monthly Rent ($)",k:"rent",p:"e.g. 2300",t:"number"},
                  {l:"Square Footage",k:"sqft",p:"e.g. 850",t:"number"},
                ].map(f=>(
                  <div key={f.l}>
                    <p style={{...lb,marginBottom:7}}>{f.l}</p>
                    <input type={f.t} placeholder={f.p} style={inp} onChange={e=>setData(d=>({...d,[f.k]:e.target.value}))}/>
                  </div>
                ))}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[{l:"Bedrooms",k:"beds",opts:["Studio","1","2","3","4+"]},{l:"Bathrooms",k:"baths",opts:["1","1.5","2","2.5","3"]}].map(f=>(
                    <div key={f.l}>
                      <p style={{...lb,marginBottom:7}}>{f.l}</p>
                      <select style={{...inp,cursor:"pointer"}} onChange={e=>setData(d=>({...d,[f.k]:e.target.value}))}>
                        {f.opts.map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step===3&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {amenityOpts.map(a=>(
                  <button key={a} onClick={()=>toggleAmenity(a)}
                    style={{padding:"12px 14px",border:`1.5px solid ${data.amenities.includes(a)?G:BD}`,borderRadius:10,background:data.amenities.includes(a)?GL:"#fff",cursor:"pointer",fontFamily:SANS,textAlign:"left",fontSize:13,fontWeight:data.amenities.includes(a)?600:400,color:data.amenities.includes(a)?G:TX,display:"flex",alignItems:"center",gap:8,transition:"all .15s"}}>
                    {data.amenities.includes(a)&&<Check size={13} color={G}/>}{a}
                  </button>
                ))}
              </div>
            )}

            {step===4&&(
              <div>
                <div style={{...cd,padding:"20px",marginBottom:14}}>
                  <p style={{...lb,marginBottom:12}}>Property Summary</p>
                  {[
                    {l:"Address",v:`${data.street||"—"}, ${data.city||"—"}, ${data.province}`},
                    {l:"Type",v:data.type||"—"},
                    {l:"Bedrooms",v:data.beds},{l:"Bathrooms",v:data.baths},
                    {l:"Square Footage",v:data.sqft?`${data.sqft} sqft`:"—"},
                    {l:"Monthly Rent",v:data.rent?`$${Number(data.rent).toLocaleString()}`:"—"},
                    {l:"Amenities",v:data.amenities.length?data.amenities.join(", "):"None selected"},
                  ].map(r=>(
                    <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                      <span style={{fontSize:12,color:MU}}>{r.l}</span>
                      <span style={{fontSize:12,fontWeight:600,color:TX}}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{padding:"14px",background:GL,borderRadius:10}}>
                  <p style={{fontSize:13,fontWeight:600,color:G,marginBottom:4}}>✓ Ready to publish</p>
                  <p style={{fontSize:12,color:"#085040"}}>Your listing will be reviewed by Kaya and go live within 2 hours.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:32}}>
          <button onClick={()=>step>0?setStep(s=>s-1):navigate(-1)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"11px 20px",border:`1px solid ${BD}`,borderRadius:10,background:"transparent",fontFamily:SANS,fontSize:13,fontWeight:500,cursor:"pointer",color:MU}}>
            <ChevronLeft size={14}/>Back
          </button>
          <button onClick={()=>step<steps.length-1?setStep(s=>s+1):navigate("/properties")}
            style={{display:"flex",alignItems:"center",gap:6,padding:"11px 24px",background:G,border:"none",borderRadius:10,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",color:"#fff"}}>
            {step===steps.length-1?"Publish Listing →":"Continue"}<ChevronRight size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TENANT PASSPORT PREMIUM
// ═══════════════════════════════════════════════════════════════
export function TenantPassportPremium() {
  const navigate=useNavigate();

  const profile={
    name:"Sarah Kim",email:"sarah.kim@email.com",phone:"(416) 555-0123",
    trustScore:94,verified:true,memberSince:"Jan 2022",
    totalRentals:3,yearsRenting:4,onTime:36,totalPayments:36,
    creditScore:745,income:"$8,500/mo",employment:"Full-time · Tech Innovations Inc.",
    payHistory:[
      {month:"Mar 2026",status:"paid",amount:2300},{month:"Feb 2026",status:"paid",amount:2300},
      {month:"Jan 2026",status:"paid",amount:2300},{month:"Dec 2025",status:"paid",amount:2300},
      {month:"Nov 2025",status:"paid",amount:2300},{month:"Oct 2025",status:"paid",amount:2300},
    ],
    rentalHistory:[
      {addr:"123 Queen St W",landlord:"John Smith",duration:"2 years",ref:"positive",note:"Excellent tenant, always on time, left unit in great condition."},
      {addr:"456 King St E",landlord:"Property Mgmt Co.",duration:"1.5 years",ref:"positive",note:"Would rent to again without hesitation."},
    ],
    strengths:["Excellent credit score (745)","Stable employment 4.5 years","Low rent-to-income ratio (27%)","100% on-time payment history","All references verified"],
  };

  return (
    <div style={pg}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"48px 36px 80px"}}>
        <button onClick={()=>navigate(-1)}
          style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:G,fontWeight:600,background:"none",border:"none",cursor:"pointer",fontFamily:SANS,marginBottom:28}}>
          <ChevronLeft size={14}/>Back
        </button>

        {/* Hero */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
          style={{background:TX,borderRadius:20,padding:"28px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:18}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:G}}>
              {profile.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <p style={{fontFamily:SERIF,fontSize:28,color:"#fff"}}>{profile.name}</p>
                {profile.verified&&<span style={{background:GL,color:G,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>✓ Verified</span>}
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.45)"}}>{profile.email} · {profile.phone}</p>
              <p style={{fontSize:12,color:"rgba(255,255,255,.3)",marginTop:3}}>Member since {profile.memberSince}</p>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".7px",marginBottom:6}}>Trust Score</p>
            <p style={{fontFamily:SERIF,fontSize:56,color:G,lineHeight:1}}>{profile.trustScore}</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>out of 100</p>
          </div>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[
              {l:"On-Time Payments",v:`${profile.onTime}/${profile.totalPayments}`,c:G},
              {l:"Years Renting",v:`${profile.yearsRenting} yrs`},
              {l:"Credit Score",v:String(profile.creditScore),c:G},
              {l:"Total Rentals",v:String(profile.totalRentals)},
            ].map(s=>(
              <div key={s.l} style={{...cd,padding:"14px 16px"}}>
                <p style={lb}>{s.l}</p>
                <p style={{fontFamily:SERIF,fontSize:24,color:s.c||TX,marginTop:6,lineHeight:1}}>{s.v}</p>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div style={{...cd,padding:"18px"}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:12}}>AI Verified Strengths</p>
            {profile.strengths.map(s=>(
              <div key={s} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{width:16,height:16,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Check size={9} color={G}/>
                </div>
                <p style={{fontSize:12,color:TX}}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment history grid */}
        <div style={{...cd,padding:"18px",marginBottom:14}}>
          <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>Payment History</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:6}}>
            {profile.payHistory.map(p=>(
              <div key={p.month} style={{background:GL,borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
                <CheckCircle2 size={16} color={G} style={{margin:"0 auto 4px"}}/>
                <p style={{fontSize:9,color:G,fontWeight:700}}>{p.month.slice(0,3)}</p>
                <p style={{fontSize:9,color:G}}>$2.3k</p>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:G,fontWeight:600,marginTop:10}}>✓ 36/36 payments on time · 100% record</p>
        </div>

        {/* Rental history */}
        <div style={{...cd,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${BD}`}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>Rental History &amp; References</p>
          </div>
          {profile.rentalHistory.map((r,i)=>(
            <div key={r.addr} style={{padding:"16px 20px",borderBottom:i<profile.rentalHistory.length-1?`1px solid ${BD}`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:TX}}>{r.addr}</p>
                  <p style={{fontSize:11,color:MU}}>{r.landlord} · {r.duration}</p>
                </div>
                <Badge t="Positive reference" c="green"/>
              </div>
              <div style={{padding:"10px 12px",background:GL,borderRadius:8,fontSize:12,color:"#085040",fontStyle:"italic"}}>
                "{r.note}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
