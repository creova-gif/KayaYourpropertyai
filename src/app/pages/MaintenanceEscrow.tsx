import { useState } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

type Step=0|1|2|3;
const STEPS=["Booked","In Progress","Awaiting Review","Released"];
const STEP_COLOR=["#1E5FA8","#B45309",G,"#767570"];

interface Job{id:string;title:string;contractor:string;property:string;amount:number;step:Step;date:string;eta?:string;}

const initJobs:Job[]=[
  {id:"j1",title:"HVAC Seasonal Tune-Up",contractor:"Arctic Air Solutions",property:"123 King St W — Unit 4A",amount:380,step:2,date:"Mar 18",eta:"Awaiting your approval"},
  {id:"j2",title:"Bathroom Tile Regrout",contractor:"GTA Tile Co.",property:"456 Queen St W — Unit 2B",amount:220,step:1,date:"Mar 20",eta:"Est. completion Mar 22"},
  {id:"j3",title:"Electrical Panel Inspection",contractor:"Watts Up Electric",property:"789 Bloor St W",amount:550,step:0,date:"Mar 21",eta:"Technician arrives Mar 23"},
  {id:"j4",title:"Roof Drainage Repair",contractor:"Peak Roofing Inc.",property:"300 Bloor W, Etobicoke",amount:1200,step:0,date:"Mar 21",eta:"Crew dispatched — 2 days"},
];

const completedJobs=[
  {id:"c1",title:"Window Seal Replacement",contractor:"ClearView Glass",amount:310,date:"Mar 12",rating:5,note:"Excellent work, fast and clean."},
  {id:"c2",title:"Plumbing Leak — Kitchen",contractor:"Reliable Plumbing",amount:185,date:"Mar 8",rating:4,note:"Fixed promptly. Slight cleanup needed."},
  {id:"c3",title:"Garage Door Motor Replacement",contractor:"LiftMaster Pro",amount:680,date:"Feb 28",rating:5,note:"Professional crew, same-day fix."},
];

function Stars({n}:{n:number}){
  return <span>{Array.from({length:5}).map((_,i)=><span key={i} style={{color:i<n?"#F59E0B":"#E5E7EB",fontSize:14}}>★</span>)}</span>;
}

function StepPipeline({step,jobId,onAdvance}:{step:Step,jobId:string,onAdvance:(id:string)=>void}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:0,marginTop:12}}>
      {STEPS.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:0}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:i<=step?STEP_COLOR[i]:BG,border:`2px solid ${i<=step?STEP_COLOR[i]:BD}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
              {i<step&&<span style={{color:"#fff",fontSize:12,fontWeight:700}}>✓</span>}
              {i===step&&<div style={{width:10,height:10,borderRadius:"50%",background:"#fff"}}/>}
            </div>
            <span style={{fontSize:9,color:i<=step?STEP_COLOR[i]:MU,fontWeight:i===step?700:500,whiteSpace:"nowrap"}}>{s}</span>
          </div>
          {i<STEPS.length-1&&<div style={{flex:1,height:2,background:i<step?G:BD,margin:"0 4px",marginBottom:16,transition:"background .3s"}}/>}
        </div>
      ))}
      {step===2&&(
        <button onClick={()=>onAdvance(jobId)} style={{marginLeft:16,padding:"7px 14px",background:G,color:"#fff",border:"none",borderRadius:8,fontFamily:SANS,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
          Confirm & Release →
        </button>
      )}
    </div>
  );
}

export function MaintenanceEscrow(){
  const [jobs,setJobs]=useState(initJobs);

  const totalHeld=jobs.filter(j=>j.step<3).reduce((s,j)=>s+j.amount,0);
  const pendingRelease=jobs.filter(j=>j.step===2).reduce((s,j)=>s+j.amount,0);
  const completedTotal=completedJobs.reduce((s,j)=>s+j.amount,0);

  function releaseEscrow(id:string){
    setJobs(prev=>prev.map(j=>j.id===id?{...j,step:3 as Step}:j));
    toast.success("Escrow released — funds sent to contractor ✓");
  }

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1050,margin:"0 auto",padding:"32px 28px 80px"}}>
        <div style={{marginBottom:28}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Operations</p>
          <h1 style={{fontFamily:SERIF,fontSize:38,color:TX,lineHeight:1,letterSpacing:"-1px",margin:0}}>
            Maintenance <em style={{fontStyle:"italic",color:G}}>Escrow</em>
          </h1>
          <p style={{fontSize:13,color:MU,marginTop:6}}>Funds are held securely until you confirm job completion — protecting both you and the contractor.</p>
        </div>

        {/* Escrow summary dark card */}
        <div style={{background:TX,borderRadius:18,padding:"24px 28px",marginBottom:24,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0}}>
          {[
            {l:"Total in Escrow",v:`$${totalHeld.toLocaleString()}`,sub:"Across active jobs"},
            {l:"Pending Release",v:`$${pendingRelease.toLocaleString()}`,sub:"Awaiting your approval"},
            {l:"Released This Month",v:`$${completedTotal.toLocaleString()}`,sub:"3 jobs completed"},
          ].map((s,i)=>(
            <div key={i} style={{padding:"0 20px",borderRight:i<2?"1px solid rgba(255,255,255,.1)":"none"}}>
              <p style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".7px",marginBottom:4}}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:i===1?G:"#fff",lineHeight:1}}>{s.v}</p>
              <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:4}}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Active jobs */}
        <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>Active Jobs</p>
        <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:32}}>
          {jobs.map(j=>(
            <div key={j.id} style={{...cd,padding:"20px",borderLeft:`3px solid ${j.step===3?MU:STEP_COLOR[j.step]}`,opacity:j.step===3?.6:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div>
                  <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:2}}>{j.title}</p>
                  <p style={{fontSize:11,color:MU}}>{j.contractor} · {j.property}</p>
                  {j.step<3&&<p style={{fontSize:11,color:"#1E5FA8",marginTop:4}}>{j.eta}</p>}
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>${j.amount.toLocaleString()}</p>
                  <p style={{fontSize:10,color:MU}}>Booked {j.date}</p>
                  {j.step===3&&<span style={{fontSize:10,fontWeight:700,color:MU,background:BG,padding:"2px 8px",borderRadius:10}}>Released</span>}
                </div>
              </div>
              {j.step<3&&<StepPipeline step={j.step} jobId={j.id} onAdvance={releaseEscrow}/>}
            </div>
          ))}
        </div>

        {/* Completed jobs table */}
        <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>Completed Jobs</p>
        <div style={cd}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:BG}}>
                {["Job","Contractor","Amount","Completed","Rating","Notes"].map(h=>(
                  <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {completedJobs.map((j,i)=>(
                <tr key={j.id} style={{borderTop:`1px solid ${BD}`}}>
                  <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,color:TX}}>{j.title}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:MU}}>{j.contractor}</td>
                  <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,color:TX}}>${j.amount}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:MU}}>{j.date}</td>
                  <td style={{padding:"12px 16px"}}><Stars n={j.rating}/></td>
                  <td style={{padding:"12px 16px",fontSize:11,color:MU,maxWidth:200}}>{j.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
