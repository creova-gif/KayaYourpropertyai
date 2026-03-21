import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Check, Users, TrendingUp } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

function KCard({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){
  return(
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay,duration:.4,ease:[.22,1,.36,1]}}
      whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}} style={{...cd,...style}}>
      {children}
    </motion.div>
  );
}

export function DepositFree(){
  const [tab,setTab]=useState<"tenant"|"landlord">("tenant");
  const [enrolled,setEnrolled]=useState(false);

  return(
    <div style={pg}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"48px 40px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:GL,padding:"6px 16px",borderRadius:40,fontSize:12,fontWeight:600,color:G,marginBottom:20}}>
            <Shield size={13}/>Kaya Shield
          </div>
          <h1 style={{fontFamily:SERIF,fontSize:52,fontWeight:400,color:TX,lineHeight:1,letterSpacing:"-1.5px",marginBottom:14}}>
            Rent without<br/><em style={{fontStyle:"italic",color:G}}>a big deposit.</em>
          </h1>
          <p style={{fontSize:16,color:MU,maxWidth:480,margin:"0 auto",lineHeight:1.7}}>
            Skip the $2,300+ upfront cost. Pay a small monthly fee instead — and landlords are still fully protected.
          </p>
        </motion.div>

        <div style={{display:"flex",gap:0,border:`1px solid ${BD}`,borderRadius:40,maxWidth:300,margin:"0 auto 40px",padding:4}}>
          {(["tenant","landlord"] as const).map(r=>(
            <button key={r} onClick={()=>setTab(r)}
              style={{flex:1,padding:"9px",borderRadius:36,border:"none",fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",background:tab===r?TX:"transparent",color:tab===r?"#fff":MU,textTransform:"capitalize",transition:"all .2s"}}>
              {r==="tenant"?"For Renters":"For Landlords"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab==="tenant"&&(
            <motion.div key="tenant" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
                <KCard style={{padding:"24px",opacity:.7}}>
                  <p style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px",marginBottom:16}}>Traditional deposit</p>
                  <p style={{fontFamily:SERIF,fontSize:42,color:"#C0392B",lineHeight:1,marginBottom:6}}>$4,600</p>
                  <p style={{fontSize:12,color:MU,marginBottom:20}}>First + last month upfront</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {["Tied up for your whole lease","Hard to get back if dispute","Excludes renters with savings barriers"].map(d=>(
                      <div key={d} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:"#C0392B",flexShrink:0,marginTop:6}}/>
                        <span style={{fontSize:12,color:MU}}>{d}</span>
                      </div>
                    ))}
                  </div>
                </KCard>

                <KCard style={{padding:"24px",border:`2px solid ${G}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                    <p style={{fontSize:11,fontWeight:700,color:G,textTransform:"uppercase",letterSpacing:".5px"}}>Kaya Shield</p>
                    <Badge t="Recommended" c="green"/>
                  </div>
                  <p style={{fontFamily:SERIF,fontSize:42,color:G,lineHeight:1,marginBottom:4}}>$34</p>
                  <p style={{fontSize:12,color:MU,marginBottom:20}}>Per month instead of deposit</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {["No large upfront payment","Move in with just first month","Keep your savings in your account","Cancel any time"].map(d=>(
                      <div key={d} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <Check size={13} color={G} style={{flexShrink:0,marginTop:2}}/>
                        <span style={{fontSize:12,color:TX}}>{d}</span>
                      </div>
                    ))}
                  </div>
                </KCard>
              </div>

              <KCard style={{padding:"24px",marginBottom:20}}>
                <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:20}}>How Kaya Shield works</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}}>
                  {[
                    {step:"1",label:"Apply normally",desc:"Your landlord approves your application as usual"},
                    {step:"2",label:"Choose Shield",desc:"Select Kaya Shield instead of paying the deposit"},
                    {step:"3",label:"Pay $34/mo",desc:"Small monthly fee added to your rent payment"},
                    {step:"4",label:"Move right in",desc:"No large upfront payment needed"},
                  ].map((s,i,arr)=>(
                    <div key={s.step} style={{padding:"0 16px",borderRight:i<arr.length-1?`1px solid ${BD}`:"none",textAlign:"center"}}>
                      <div style={{width:36,height:36,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:SERIF,fontSize:18,color:G,margin:"0 auto 12px"}}>{s.step}</div>
                      <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{s.label}</p>
                      <p style={{fontSize:11,color:MU,lineHeight:1.55}}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </KCard>

              {!enrolled?(
                <div style={{...cd,padding:"28px",textAlign:"center"}}>
                  <p style={{fontFamily:SERIF,fontSize:24,color:TX,marginBottom:8}}>Enable Kaya Shield on your next rental</p>
                  <p style={{fontSize:14,color:MU,marginBottom:20}}>Available on all Kaya-verified listings · Instant approval</p>
                  <button onClick={()=>setEnrolled(true)} style={{padding:"14px 40px",background:G,color:"#fff",border:"none",borderRadius:12,fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                    Enrol in Kaya Shield →
                  </button>
                </div>
              ):(
                <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} style={{...cd,padding:"28px",textAlign:"center",border:`2px solid ${G}`}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
                    <Shield size={22} color={G}/>
                  </div>
                  <p style={{fontFamily:SERIF,fontSize:24,color:G,marginBottom:6}}>Kaya Shield Active</p>
                  <p style={{fontSize:14,color:MU}}>You're enrolled. Your next landlord can accept Shield instead of a deposit.</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {tab==="landlord"&&(
            <motion.div key="landlord" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
                {[
                  {Icon:Users,label:"40% more applicants",desc:"Removing the deposit barrier means more qualified tenants apply"},
                  {Icon:Shield,label:"Fully protected",desc:"Kaya covers unpaid rent and damages up to $5,000 — same as a deposit"},
                  {Icon:TrendingUp,label:"Faster leasing",desc:"Shield-listed units lease 3x faster than deposit-required units"},
                ].map((f,i)=>(
                  <KCard key={f.label} delay={i*.07} style={{padding:"20px"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                      <f.Icon size={16} color={G}/>
                    </div>
                    <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:4}}>{f.label}</p>
                    <p style={{fontSize:12,color:MU,lineHeight:1.55}}>{f.desc}</p>
                  </KCard>
                ))}
              </div>
              <KCard style={{padding:"24px"}}>
                <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:16}}>Coverage details</p>
                {[
                  {label:"Unpaid rent",value:"Up to 3 months"},
                  {label:"Property damage",value:"Up to $5,000"},
                  {label:"Cleaning costs",value:"Up to $2,000"},
                  {label:"Legal fees (LTB)",value:"Covered"},
                  {label:"Your cost",value:"$0"},
                ].map((r,i)=>(
                  <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:i>0?`1px solid ${BD}`:"none"}}>
                    <span style={{fontSize:13,color:MU}}>{r.label}</span>
                    <span style={{fontSize:13,fontWeight:700,color:G}}>{r.value}</span>
                  </div>
                ))}
              </KCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
