import { PublicNav } from "../components/PublicNav";
import { useState } from "react";
import { ClipboardList, Bus, Stethoscope, ShoppingCart, PawPrint, Package, KeyRound } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

const moveSteps=[
  {id:"keys",title:"Get your keys",desc:"Confirm key handover time and location with your landlord",done:true,action:"Done"},
  {id:"inspect",title:"Complete move-in inspection",desc:"Walk through unit, document any existing damage with photos",done:true,action:"Done"},
  {id:"hydro",title:"Set up Hydro One",desc:"Transfer electricity to your name for your move-in date",done:false,action:"Set up →"},
  {id:"internet",title:"Book internet installation",desc:"Rogers, Bell, or Beanfield — compare plans for your building",done:false,action:"Compare →"},
  {id:"mail",title:"Change of address",desc:"Canada Post, CRA, employer, bank — all in one place",done:false,action:"Update →"},
  {id:"insurance",title:"Get renters insurance",desc:"Protect your belongings from day one — from $12/month",done:false,action:"Get Quote →"},
  {id:"parking",title:"Register parking",desc:"Get your parking pass/decal for the building",done:false,action:"Request →"},
  {id:"amenities",title:"Learn building amenities",desc:"Gym hours, parcel locker, visitor parking, laundry",done:false,action:"View guide →"},
];

export function MoveInCoordinator(){
  const [tasks,setTasks]=useState(moveSteps);
  const done=tasks.filter(t=>t.done).length;
  const pct=Math.round(done/tasks.length*100);

  function toggle(id:string){
    setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t));
  }

  return(
    <div style={pg}>
      <PublicNav />
      <div style={{maxWidth:760,margin:"0 auto",padding:"110px 36px 80px"}}>
        <div style={{marginBottom:32}}>
          <p style={{...lb,marginBottom:8}}>Welcome to your new home</p>
          <h1 style={{fontFamily:SERIF,fontSize:44,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Move-in <em style={{fontStyle:"italic",color:G}}>Coordinator</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>Everything you need to do when moving into a new place — organized and tracked.</p>
        </div>

        <div style={{...cd,padding:"22px",marginBottom:24,background:TX,border:"none"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
            <div>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px",marginBottom:6}}>123 King St W, Unit 4A</p>
              <p style={{fontFamily:SERIF,fontSize:28,color:"#fff"}}>Move-in progress</p>
            </div>
            <p style={{fontFamily:SERIF,fontSize:52,color:pct===100?G:"#fff",lineHeight:1}}>{pct}%</p>
          </div>
          <div style={{height:6,background:"rgba(255,255,255,.12)",borderRadius:3}}>
            <div style={{height:6,background:G,borderRadius:3,width:`${pct}%`,transition:"width .5s"}}/>
          </div>
          <p style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:8}}>{done} of {tasks.length} tasks complete</p>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
          {tasks.map(t=>(
            <div key={t.id} style={{...cd,padding:"16px 20px",display:"flex",alignItems:"center",gap:14,borderLeft:`3px solid ${t.done?G:BD}`,opacity:t.done?.8:1}}>
              <button onClick={()=>toggle(t.id)} style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${t.done?G:BD}`,background:t.done?G:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                {t.done&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}
              </button>
              <div style={{flex:1}}>
                <p style={{fontSize:13,fontWeight:600,color:t.done?MU:TX,textDecoration:t.done?"line-through":"none",marginBottom:3}}>{t.title}</p>
                <p style={{fontSize:11,color:MU}}>{t.desc}</p>
              </div>
              {!t.done&&<button style={{padding:"7px 13px",background:GL,color:G,border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS,whiteSpace:"nowrap"}}>{t.action}</button>}
            </div>
          ))}
        </div>

        {/* Landlord check-in notice */}
        <div style={{...cd,padding:"20px",marginBottom:16,borderLeft:`3px solid #1E5FA8`}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
            <div style={{width:36,height:36,borderRadius:9,background:"#EBF2FB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><ClipboardList size={18} color="#1E5FA8"/></div>
            <div>
              <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>Landlord Check-In Scheduled</p>
              <p style={{fontSize:12,color:MU,lineHeight:1.6}}>Your landlord <strong>John M.</strong> has requested a move-in inspection walkthrough on <strong>April 5 at 11:00 AM</strong>. Make sure your initial inspection report (task 2 above) is complete before then.</p>
              <button style={{marginTop:10,padding:"6px 14px",background:"#EBF2FB",color:"#1E5FA8",border:"none",borderRadius:8,fontFamily:SANS,fontSize:11,fontWeight:600,cursor:"pointer"}}>Confirm Attendance →</button>
            </div>
          </div>
        </div>

        <div style={{...cd,padding:"20px"}}>
          <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>Useful for new residents</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {([
              {icon:Bus,label:"Transit (TTC)",sub:"Plan your commute"},
              {icon:Stethoscope,label:"Nearest clinic",sub:"Find a doctor"},
              {icon:ShoppingCart,label:"Grocery stores",sub:"What's nearby"},
              {icon:PawPrint,label:"Pet services",sub:"Vet, grooming, park"},
              {icon:Package,label:"Parcel lockers",sub:"Building info"},
              {icon:KeyRound,label:"Building access",sub:"Key fob setup"},
            ] as const).map(item=>{const IIcon=item.icon;return(
              <div key={item.label} style={{background:BG,borderRadius:10,padding:"12px",cursor:"pointer",textAlign:"center"}} onMouseOver={e=>(e.currentTarget.style.background=GL)} onMouseOut={e=>(e.currentTarget.style.background=BG)}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:5}}><IIcon size={20} color={G}/></div>
                <p style={{fontSize:12,fontWeight:600,color:TX,marginBottom:2}}>{item.label}</p>
                <p style={{fontSize:10,color:MU}}>{item.sub}</p>
              </div>
            );})}
          </div>
        </div>
      </div>
    </div>
  );
}
