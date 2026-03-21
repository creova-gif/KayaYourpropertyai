import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BadgeCheck, AlertTriangle, Clock, TrendingUp, FileText, Shield, ChevronRight, CheckCircle2, XCircle, Eye, Link, Search } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

type VerifStatus="verified"|"pending"|"fraud_risk"|"unverified";

interface Applicant{
  id:string;name:string;unit:string;status:VerifStatus;
  statedIncome:number;verifiedIncome:number|null;
  employer:string;bankVerified:boolean;
  payStubMatch:boolean|null;fraudSignals:string[];
  submittedDate:string;score:number|null;
}

const APPLICANTS:Applicant[]=[
  {id:"A001",name:"Sarah Mitchell",unit:"Unit 2B — 123 Main St",status:"verified",
   statedIncome:85000,verifiedIncome:83200,employer:"Rogers Communications",bankVerified:true,
   payStubMatch:true,fraudSignals:[],submittedDate:"Mar 18, 2026",score:94},
  {id:"A002",name:"James Okafor",unit:"Basement — 45 Maple Ave",status:"fraud_risk",
   statedIncome:75000,verifiedIncome:31400,employer:"Self-employed",bankVerified:false,
   payStubMatch:false,fraudSignals:["Income on pay stub 58% lower than stated","Employer name doesn't match bank deposits","PDF metadata shows document was edited 3 hours ago"],
   submittedDate:"Mar 19, 2026",score:21},
  {id:"A003",name:"Priya Sharma",unit:"Unit 1A — 789 Queen St",status:"pending",
   statedIncome:68000,verifiedIncome:null,employer:"Ontario Public Service",bankVerified:false,
   payStubMatch:null,fraudSignals:[],submittedDate:"Mar 20, 2026",score:null},
  {id:"A004",name:"Thomas Berger",unit:"Unit 3C — 123 Main St",status:"verified",
   statedIncome:120000,verifiedIncome:118500,employer:"Deloitte Canada",bankVerified:true,
   payStubMatch:true,fraudSignals:[],submittedDate:"Mar 17, 2026",score:97},
];

const STATUS_CONFIG:{[k in VerifStatus]:{label:string;color:string;bg:string;icon:React.ReactNode}}={
  verified:{label:"Verified",color:G,bg:GL,icon:<CheckCircle2 size={14}/>},
  pending:{label:"Pending",color:"#B45309",bg:"#FEF3C7",icon:<Clock size={14}/>},
  fraud_risk:{label:"Fraud Risk",color:"#C0392B",bg:"#FDECEA",icon:<AlertTriangle size={14}/>},
  unverified:{label:"Not Started",color:MU,bg:BG,icon:<XCircle size={14}/>},
};

const METHODS=[
  {icon:"🏦",title:"Direct Bank Verification",desc:"Connect to applicant's bank via Flinks or Plaid Canada to verify income deposits directly. Most accurate — no documents needed.",badge:"Most Reliable",badgeColor:"green" as const},
  {icon:"💼",title:"Employer Letter Verification",desc:"Kaya sends a verification request directly to the applicant's stated employer HR department. Bypass forged letters.",badge:"High Accuracy",badgeColor:"blue" as const},
  {icon:"📄",title:"AI Pay Stub Analysis",desc:"Upload a pay stub and Kaya's AI cross-checks: PDF metadata, font consistency, amount calculations, and CRA T4 formatting.",badge:"Fast",badgeColor:"amber" as const},
  {icon:"🏛️",title:"NOA / CRA Verification",desc:"Request applicant to share their CRA My Account summary (Notice of Assessment). Shows actual reported income, not just stated.",badge:"CRA Official",badgeColor:"green" as const},
];

function ScoreMeter({score}:{score:number}){
  const color=score>=80?G:score>=50?"#F59E0B":"#C0392B";
  return(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:80,height:8,background:BD,borderRadius:4,overflow:"hidden"}}>
        <div style={{width:`${score}%`,height:"100%",background:color,borderRadius:4,transition:"width .5s"}}/>
      </div>
      <span style={{fontSize:12,fontWeight:700,color}}>{score}/100</span>
    </div>
  );
}

export default function IncomeVerification(){
  const [activeApplicant,setActiveApplicant]=useState<string|null>(null);
  const [activeTab,setActiveTab]=useState<"applicants"|"methods"|"stats">("applicants");
  const [searchQ,setSearchQ]=useState("");

  const filtered=APPLICANTS.filter(a=>a.name.toLowerCase().includes(searchQ.toLowerCase())||a.unit.toLowerCase().includes(searchQ.toLowerCase()));
  const fraudCount=APPLICANTS.filter(a=>a.status==="fraud_risk").length;
  const verifiedCount=APPLICANTS.filter(a=>a.status==="verified").length;

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <BadgeCheck size={22} color={G}/>
            </div>
            <div>
              <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>Income Verification</h1>
              <p style={{fontSize:14,color:MU,margin:0}}>AI-powered fraud detection & direct bank income verification for tenant applicants</p>
            </div>
          </div>

          <div style={{background:"#FDECEA",border:"1px solid #FECACA",borderRadius:12,padding:"13px 18px",display:"flex",gap:10,alignItems:"flex-start",marginTop:12}}>
            <AlertTriangle size={16} color="#C0392B" style={{flexShrink:0,marginTop:1}}/>
            <span style={{fontSize:13,color:"#C0392B"}}><strong>{fraudCount} applicant{fraudCount!==1?"s":""}</strong> showing income fraud signals. Review immediately before proceeding with applications.</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Verified",value:verifiedCount,icon:"✅",color:G},
            {label:"Fraud Risks",value:fraudCount,icon:"🚨",color:"#C0392B"},
            {label:"Pending",value:APPLICANTS.filter(a=>a.status==="pending").length,icon:"⏳",color:"#B45309"},
            {label:"Avg Fraud Savings",value:"$4,200",icon:"💰",color:"#7C3AED"},
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{...cd,padding:"16px 18px"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
              <div style={{fontSize:12,color:MU,marginTop:2}}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,background:"#fff",padding:5,borderRadius:12,border:`1px solid ${BD}`,marginBottom:24,width:"fit-content"}}>
          {(["applicants","methods","stats"] as const).map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)}
              style={{padding:"8px 18px",borderRadius:9,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",
                background:activeTab===t?G:"transparent",color:activeTab===t?"#fff":MU,transition:"all .2s",textTransform:"capitalize"}}>
              {t==="methods"?"Verification Methods":t==="stats"?"Fraud Stats":t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab==="applicants"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div style={{position:"relative",marginBottom:16}}>
              <Search size={16} color={MU} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search applicants…"
                style={{width:"100%",padding:"10px 14px 10px 40px",border:`1px solid ${BD}`,borderRadius:10,fontSize:13,color:TX,fontFamily:SANS,outline:"none",background:"#fff",boxSizing:"border-box"}}/>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {filtered.map((app,i)=>{
                const st=STATUS_CONFIG[app.status];
                const isOpen=activeApplicant===app.id;
                const incomeDiscrepancy=app.verifiedIncome!=null?Math.round(((app.statedIncome-app.verifiedIncome)/app.statedIncome)*100):null;
                return(
                  <motion.div key={app.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}>
                    <div style={{...cd,overflow:"hidden",border:`1.5px solid ${isOpen?G:app.status==="fraud_risk"?"#FECACA":BD}`}}>
                      <div onClick={()=>setActiveApplicant(isOpen?null:app.id)}
                        style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
                        <div style={{width:42,height:42,borderRadius:10,background:st.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:st.color,fontWeight:700,fontSize:14}}>
                          {app.name.charAt(0)}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                            <span style={{fontSize:14,fontWeight:600,color:TX}}>{app.name}</span>
                            <span style={{background:st.bg,color:st.color,fontSize:11,fontWeight:600,padding:"2px 9px",borderRadius:20,display:"flex",alignItems:"center",gap:4}}>
                              {st.icon}{st.label}
                            </span>
                          </div>
                          <div style={{fontSize:12,color:MU}}>{app.unit} · Submitted {app.submittedDate}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:13,color:MU,marginBottom:4}}>Stated: ${app.statedIncome.toLocaleString()}/yr</div>
                          {app.score!=null&&<ScoreMeter score={app.score}/>}
                        </div>
                        <ChevronRight size={16} color={MU} style={{transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s",marginLeft:8}}/>
                      </div>

                      <AnimatePresence>
                        {isOpen&&(
                          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                            transition={{duration:.25}} style={{overflow:"hidden"}}>
                            <div style={{padding:"0 20px 20px",borderTop:`1px solid ${BD}`}}>
                              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:16,marginBottom:16}}>
                                {[
                                  {label:"Stated Income",value:`$${app.statedIncome.toLocaleString()}`,color:TX},
                                  {label:"Verified Income",value:app.verifiedIncome?`$${app.verifiedIncome.toLocaleString()}`:"—",
                                   color:app.verifiedIncome&&app.verifiedIncome<app.statedIncome*0.8?"#C0392B":G},
                                  {label:"Discrepancy",value:incomeDiscrepancy!=null?`${incomeDiscrepancy}%`:"—",
                                   color:incomeDiscrepancy&&incomeDiscrepancy>20?"#C0392B":G},
                                ].map(m=>(
                                  <div key={m.label} style={{background:BG,borderRadius:9,padding:"12px 14px"}}>
                                    <div style={{fontSize:11,color:MU,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>{m.label}</div>
                                    <div style={{fontSize:18,fontWeight:700,color:m.color,fontFamily:SERIF}}>{m.value}</div>
                                  </div>
                                ))}
                              </div>
                              <div style={{display:"flex",gap:10,marginBottom:app.fraudSignals.length>0?14:0,flexWrap:"wrap"}}>
                                {[
                                  {label:"Bank Connected",done:app.bankVerified,icon:"🏦"},
                                  {label:"Pay Stub Verified",done:app.payStubMatch===true,icon:"📄"},
                                  {label:"Employer Confirmed",done:app.bankVerified,icon:"💼"},
                                ].map(c=>(
                                  <div key={c.label} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:20,
                                    background:c.done?GL:"#FDECEA",border:`1px solid ${c.done?G+"33":"#FECACA"}`}}>
                                    <span style={{fontSize:12}}>{c.icon}</span>
                                    {c.done?<CheckCircle2 size={11} color={G}/>:<XCircle size={11} color="#C0392B"/>}
                                    <span style={{fontSize:12,fontWeight:500,color:c.done?G:"#C0392B"}}>{c.label}</span>
                                  </div>
                                ))}
                              </div>
                              {app.fraudSignals.length>0&&(
                                <div style={{background:"#FDECEA",borderRadius:10,padding:"12px 16px",marginBottom:14}}>
                                  <div style={{fontSize:12,fontWeight:700,color:"#C0392B",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                                    <AlertTriangle size={14}/> Fraud Signals Detected
                                  </div>
                                  {app.fraudSignals.map((s,si)=>(
                                    <div key={si} style={{fontSize:12,color:"#C0392B",marginBottom:4,display:"flex",gap:6}}>
                                      <span>•</span><span>{s}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div style={{display:"flex",gap:10}}>
                                {app.status==="pending"&&(
                                  <button style={{padding:"9px 16px",background:G,color:"#fff",borderRadius:9,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                                    <Link size={13}/> Send Bank Link to Applicant
                                  </button>
                                )}
                                {app.status==="fraud_risk"&&(
                                  <button style={{padding:"9px 16px",background:"#FDECEA",color:"#C0392B",borderRadius:9,border:"1.5px solid #FECACA",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                                    ❌ Decline Application
                                  </button>
                                )}
                                <button style={{padding:"9px 16px",background:BG,color:TX,borderRadius:9,border:`1px solid ${BD}`,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                                  <Eye size={13}/> View Full Report
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab==="methods"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
            {METHODS.map((m,i)=>(
              <motion.div key={m.title} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
                style={{...cd,padding:22}}>
                <div style={{fontSize:30,marginBottom:12}}>{m.icon}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <h3 style={{fontSize:15,fontWeight:700,color:TX,margin:0}}>{m.title}</h3>
                  <span style={{background:m.badgeColor==="green"?GL:m.badgeColor==="blue"?"#EBF2FB":"#FEF3C7",
                    color:m.badgeColor==="green"?G:m.badgeColor==="blue"?"#1E5FA8":"#B45309",
                    fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{m.badge}</span>
                </div>
                <p style={{fontSize:13,color:MU,margin:"0 0 14px",lineHeight:1.6}}>{m.desc}</p>
                <button style={{padding:"8px 16px",background:GL,color:G,borderRadius:8,border:`1px solid ${G}33`,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  Set as Default
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab==="stats"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div style={{...cd,padding:24}}>
              <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 16px",fontFamily:SERIF}}>Fraud Detection Performance</h3>
              {[
                {label:"Income Inflation Detected",value:"58%",desc:"of fraud cases had stated income >20% higher than verified"},
                {label:"Forged Pay Stubs Caught",value:"73%",desc:"of flagged applications had manipulated PDF documents"},
                {label:"Average Income Overstatement",value:"$24K",desc:"per fraudulent application in the last 12 months"},
                {label:"Landlord Savings (Estimated)",value:"$4,200",desc:"per fraud case prevented (3 months unpaid rent + eviction)"},
              ].map(s=>(
                <div key={s.label} style={{padding:"12px 0",borderBottom:`1px solid ${BD}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                    <span style={{fontSize:13,color:TX,fontWeight:500}}>{s.label}</span>
                    <span style={{fontSize:16,fontWeight:700,color:G,fontFamily:SERIF}}>{s.value}</span>
                  </div>
                  <div style={{fontSize:11,color:MU}}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{...cd,padding:24}}>
                <h3 style={{fontSize:15,fontWeight:700,color:TX,margin:"0 0 14px",fontFamily:SERIF}}>Most Common Fraud Signals</h3>
                {[
                  {signal:"Income overstated >20%",pct:61},
                  {signal:"PDF metadata manipulation",pct:48},
                  {signal:"Employer doesn't match deposits",pct:34},
                  {signal:"Pay period dates don't add up",pct:29},
                  {signal:"Salary doesn't match role/city",pct:22},
                ].map(s=>(
                  <div key={s.signal} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,color:TX}}>{s.signal}</span>
                      <span style={{fontSize:12,fontWeight:600,color:"#C0392B"}}>{s.pct}%</span>
                    </div>
                    <div style={{height:6,background:BG,borderRadius:3,overflow:"hidden"}}>
                      <div style={{width:`${s.pct}%`,height:"100%",background:"#C0392B",borderRadius:3}}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...cd,padding:20,background:GL,border:`1px solid ${G}33`}}>
                <Shield size={18} color={G} style={{marginBottom:8}}/>
                <h4 style={{fontSize:13,fontWeight:700,color:G,margin:"0 0 6px"}}>Kaya Verified Badge</h4>
                <p style={{fontSize:12,color:MU,margin:"0 0 12px"}}>Applicants who pass all verification checks earn a Kaya Verified badge — shareable across future applications.</p>
                <button style={{padding:"8px 16px",background:G,color:"#fff",borderRadius:8,border:"none",fontSize:13,fontWeight:600,cursor:"pointer"}}>Learn More</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
