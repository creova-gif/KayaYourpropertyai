import { useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

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

export function ListingSyndication(){
  const [published,setPublished]=useState<Record<string,boolean>>({zillow:true,kijiji:true,facebook:false,padmapper:true,zumper:false,rentals:false});

  const platforms=[
    {id:"zillow",name:"Zillow Rentals",logo:"Z",color:"#006AFF",colorL:"#EBF2FB",reach:"180M visits/mo",tier:"premium",leads:14,views:247},
    {id:"kijiji",name:"Kijiji",logo:"K",color:"#E64F00",colorL:"#FDECEA",reach:"16M Canadians",tier:"premium",leads:8,views:189},
    {id:"facebook",name:"Facebook Marketplace",logo:"fb",color:"#1877F2",colorL:"#EBF2FB",reach:"3B users",tier:"free",leads:0,views:0},
    {id:"padmapper",name:"Padmapper",logo:"P",color:"#FF5A5F",colorL:"#FDECEA",reach:"2M monthly",tier:"included",leads:6,views:122},
    {id:"zumper",name:"Zumper",logo:"Zu",color:"#0D1B4F",colorL:"#EBF2FB",reach:"13M renters",tier:"included",leads:0,views:0},
    {id:"rentals",name:"Rentals.ca",logo:"R",color:"#00A86B",colorL:"#E5F4EE",reach:"Canada-focused",tier:"included",leads:0,views:0},
  ];

  const totalLeads=Object.entries(published).reduce((s,[id,on])=>s+(on?(platforms.find(p=>p.id===id)?.leads||0):0),0);
  const totalViews=Object.entries(published).reduce((s,[id,on])=>s+(on?(platforms.find(p=>p.id===id)?.views||0):0),0);
  const activeCount=Object.values(published).filter(Boolean).length;

  const tierBadge=(t:string)=>{
    if(t==="premium") return <Badge t="Premium" c="amber"/>;
    if(t==="free") return <Badge t="Free" c="green"/>;
    return <Badge t="Included" c="green"/>;
  };

  return(
    <div style={pg}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 40px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={lb}>Distribution</p>
            <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TX,marginTop:8,lineHeight:1,letterSpacing:"-1px"}}>
              Listing <em style={{fontStyle:"italic",color:G}}>Syndication</em>
            </h1>
            <p style={{fontSize:14,color:MU,marginTop:8}}>Publish your vacancies everywhere — one click, zero copy-paste</p>
          </div>
          <button style={{display:"flex",alignItems:"center",gap:8,padding:"12px 22px",background:G,border:"none",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
            <Zap size={14}/>Publish to all active
          </button>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Active Platforms",value:String(activeCount),sub:"of 6 available"},
            {label:"Total Views",value:totalViews.toLocaleString(),sub:"this month",trend:"+23%"},
            {label:"Leads Generated",value:String(totalLeads),sub:"inquiries",trend:"+8"},
            {label:"Avg Days to Lease",value:"4.2d",sub:"vs 18d industry avg",trend:"↓ 77%"},
          ].map((s,i)=>(
            <KCard key={s.label} delay={i*.07} style={{padding:"20px 22px"}}>
              <p style={lb}>{s.label}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:TX,marginTop:8,lineHeight:1,marginBottom:4}}>{s.value}</p>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {s.trend&&<span style={{fontSize:12,fontWeight:600,color:G}}>{s.trend}</span>}
                <span style={{fontSize:12,color:MU}}>{s.sub}</span>
              </div>
            </KCard>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
          <div>
            <p style={{...lb,marginBottom:14}}>Distribution channels</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {platforms.map((p,i)=>(
                <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}
                  style={{...cd,padding:"18px 20px",cursor:"pointer",borderLeft:`3px solid ${published[p.id]?G:BD}`,transition:"border-color .2s"}}
                  whileHover={{x:2}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:38,height:38,borderRadius:10,background:p.colorL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:p.color}}>{p.logo}</div>
                      <div>
                        <p style={{fontSize:13,fontWeight:600,color:TX}}>{p.name}</p>
                        <p style={{fontSize:11,color:MU}}>{p.reach}</p>
                      </div>
                    </div>
                    <div onClick={e=>{e.stopPropagation();setPublished(prev=>({...prev,[p.id]:!prev[p.id]}))}}>
                      <div style={{width:40,height:22,borderRadius:20,background:published[p.id]?G:BD,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                        <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:published[p.id]?21:3,transition:"left .2s"}}/>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {tierBadge(p.tier)}
                    {published[p.id]&&p.views>0?(
                      <div style={{display:"flex",gap:10,fontSize:11,color:MU}}>
                        <span>{p.views} views</span>
                        <span>{p.leads} leads</span>
                      </div>
                    ):(
                      <span style={{fontSize:11,color:MU}}>{published[p.id]?"Active":"Not published"}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <KCard style={{padding:"20px"}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:16}}>Active Listings</p>
              {[
                {unit:"Unit 5A",address:"123 King St",rent:"$2,400",days:3},
                {unit:"Unit 2B",address:"456 Queen St",rent:"$1,950",days:7},
              ].map((l,i)=>(
                <div key={l.unit} style={{padding:"12px 0",borderTop:i>0?`1px solid ${BD}`:"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:TX}}>{l.unit}</p>
                      <p style={{fontSize:11,color:MU}}>{l.address}</p>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>{l.rent}</p>
                      <p style={{fontSize:10,color:MU}}>{l.days}d listed</p>
                    </div>
                  </div>
                  <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
                    {platforms.filter(p=>published[p.id]).map(p=>(
                      <span key={p.id} style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20,background:p.colorL,color:p.color}}>{p.logo}</span>
                    ))}
                  </div>
                </div>
              ))}
            </KCard>

            <KCard style={{padding:"20px"}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>Lead funnel</p>
              {[
                {stage:"Views",count:totalViews,pct:100},
                {stage:"Inquiries",count:totalLeads,pct:totalViews?Math.round(totalLeads/totalViews*100):0},
                {stage:"Applications",count:3,pct:11},
                {stage:"Approved",count:1,pct:4},
              ].map((s,i)=>(
                <div key={s.stage} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,color:TX,fontWeight:i===0?600:400}}>{s.stage}</span>
                    <span style={{fontSize:12,fontWeight:600,color:TX}}>{s.count}</span>
                  </div>
                  <div style={{height:5,background:BD,borderRadius:3}}>
                    <div style={{height:5,background:G,borderRadius:3,width:`${s.pct}%`,transition:"width .5s"}}/>
                  </div>
                </div>
              ))}
            </KCard>

            <div style={{padding:"16px",background:GL,borderRadius:14,border:`1px solid rgba(10,122,82,.15)`}}>
              <p style={{fontSize:12,fontWeight:700,color:G,marginBottom:6}}>✦ AI Tip</p>
              <p style={{fontSize:12,color:"#085040",lineHeight:1.6}}>Enable Zumper to reach 13M additional renters. Your current vacancy matches high-demand profiles in Downtown Toronto right now.</p>
              <button onClick={()=>setPublished(prev=>({...prev,zumper:true}))} style={{marginTop:10,padding:"7px 14px",background:G,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Enable Zumper →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
