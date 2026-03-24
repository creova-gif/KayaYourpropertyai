import { useState } from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, Home, CreditCard, Car } from "lucide-react";

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

const history=[
  {month:"Mar 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+8"},
  {month:"Feb 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+7"},
  {month:"Jan 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+9"},
  {month:"Dec 2025",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+6"},
  {month:"Nov 2025",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+8"},
];

export function RentCreditBuilding(){
  const [enrolled,setEnrolled]=useState(false);

  return(
    <div style={pg}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"48px 36px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:GL,padding:"6px 16px",borderRadius:40,fontSize:12,fontWeight:600,color:G,marginBottom:20}}>
            <Award size={13}/>Kaya Credit
          </div>
          <h1 style={{fontFamily:SERIF,fontSize:52,fontWeight:400,color:TX,lineHeight:1,letterSpacing:"-1.5px",marginBottom:14}}>
            Build credit just<br/><em style={{fontStyle:"italic",color:G}}>by paying rent.</em>
          </h1>
          <p style={{fontSize:16,color:MU,maxWidth:460,margin:"0 auto",lineHeight:1.7}}>
            Every on-time rent payment gets reported to Equifax and TransUnion. Turn your biggest monthly expense into a credit-building asset.
          </p>
        </motion.div>

        <KCard delay={.1} style={{padding:"28px",marginBottom:20,background:TX,border:"none"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
            <div>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:12}}>Your credit journey</p>
              <div style={{display:"flex",gap:16,alignItems:"flex-end",marginBottom:16}}>
                <div>
                  <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4}}>Before Kaya</p>
                  <p style={{fontFamily:SERIF,fontSize:40,color:"#fff",lineHeight:1}}>640</p>
                </div>
                <div style={{padding:"0 8px",fontSize:18,color:"rgba(255,255,255,.3)"}}>→</div>
                <div>
                  <p style={{fontSize:11,color:G,marginBottom:4}}>After 12 months</p>
                  <p style={{fontFamily:SERIF,fontSize:40,color:G,lineHeight:1}}>730</p>
                </div>
              </div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.6}}>Based on 12 months of on-time payments. Results vary.</p>
            </div>
            <div>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:12}}>Monthly impact</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {label:"Credit score boost",value:"+6–10 pts/mo"},
                  {label:"Reported to",value:"Equifax + TransUnion"},
                  {label:"Payment history %",value:"35% of your score"},
                ].map(r=>(
                  <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{r.label}</span>
                    <span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </KCard>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
          {[
            {Icon:Home,title:"Buy a home sooner",desc:"A higher score means better mortgage rates and faster approval"},
            {Icon:CreditCard,title:"Better credit cards",desc:"Qualify for premium cards with rewards, lower rates, and higher limits"},
            {Icon:Car,title:"Lower loan rates",desc:"Save thousands on car loans and other financing over your lifetime"},
          ].map((b,i)=>(
            <KCard key={b.title} delay={.15+i*.07} style={{padding:"18px 20px"}}>
              <div style={{marginBottom:10}}>{(()=>{const BI=b.Icon;return<BI size={24} color={G}/>;})()}</div>
              <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{b.title}</p>
              <p style={{fontSize:12,color:MU,lineHeight:1.55}}>{b.desc}</p>
            </KCard>
          ))}
        </div>

        {enrolled&&(
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            <KCard style={{overflow:"hidden",marginBottom:20}}>
              <div style={{padding:"16px 20px",borderBottom:`1px solid ${BD}`}}>
                <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Reporting history</p>
                <p style={{fontSize:11,color:MU,marginTop:3}}>All payments automatically reported within 24 hours</p>
              </div>
              {history.map((h,i)=>(
                <div key={h.month} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:i<history.length-1?`1px solid ${BD}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <CheckCircle2 size={14} color={G}/>
                    </div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:TX}}>{h.month}</p>
                      <p style={{fontSize:11,color:MU}}>{h.bureau}</p>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontFamily:SERIF,fontSize:18,color:TX}}>${h.amount.toLocaleString()}</span>
                    <Badge t={`${h.points} pts`} c="green"/>
                    <Badge t="Reported" c="green"/>
                  </div>
                </div>
              ))}
            </KCard>
          </motion.div>
        )}

        {!enrolled?(
          <KCard style={{padding:"28px",textAlign:"center"}}>
            <p style={{fontFamily:SERIF,fontSize:26,color:TX,marginBottom:8}}>Start building credit today</p>
            <p style={{fontSize:14,color:MU,marginBottom:6}}>Free for all Kaya tenants · Setup takes 2 minutes</p>
            <p style={{fontSize:12,color:MU,marginBottom:24}}>Your landlord is automatically notified. No action required from them.</p>
            <button onClick={()=>setEnrolled(true)} style={{padding:"14px 40px",background:G,color:"#fff",border:"none",borderRadius:12,fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
              Enable Kaya Credit →
            </button>
          </KCard>
        ):(
          <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} style={{...cd,padding:"28px",textAlign:"center",border:`2px solid ${G}`}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
              <Award size={22} color={G}/>
            </div>
            <p style={{fontFamily:SERIF,fontSize:26,color:G,marginBottom:6}}>Kaya Credit Active</p>
            <p style={{fontSize:14,color:MU}}>Your next rent payment will be reported to Equifax and TransUnion automatically.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
