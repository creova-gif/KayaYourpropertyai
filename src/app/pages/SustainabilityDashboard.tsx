import { useState } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const gradeColor:Record<string,[string,string]>={A:["#E5F4EE","#0A7A52"],B:["#EBF2FB","#1E5FA8"],C:["#FEF3C7","#B45309"],D:["#FDECEA","#C0392B"]};

const properties=[
  {id:1,name:"123 King St W",units:12,grade:"A",kwh:4200,co2:1.8,water:320,score:88},
  {id:2,name:"456 Queen St W",units:8,grade:"B",kwh:6800,co2:3.1,water:510,score:72},
  {id:3,name:"789 Bloor St W",units:20,grade:"C",kwh:12400,co2:5.6,water:890,score:54},
  {id:4,name:"300 Bloor W, Etobicoke",units:6,grade:"B",kwh:5100,co2:2.3,water:400,score:69},
];

const upgrades=[
  {id:1,icon:"🌡",title:"Smart Thermostat Upgrade",prop:"456 Queen St W",save:"$1,200/yr",payback:"8 months",effort:"Low",saved:false},
  {id:2,icon:"💡",title:"LED Common Area Retrofit",prop:"789 Bloor St W",save:"$840/yr",payback:"6 months",effort:"Low",saved:false},
  {id:3,icon:"☀️",title:"Rooftop Solar Array",prop:"123 King St W",save:"$3,400/yr",payback:"6 years",effort:"High",saved:false},
  {id:4,icon:"🚿",title:"Low-Flow Fixture Package",prop:"789 Bloor St W",save:"$610/yr",payback:"14 months",effort:"Medium",saved:false},
  {id:5,icon:"🔋",title:"EV Charging Station (x4)",prop:"300 Bloor W",save:"$2,100/yr",payback:"3 years",effort:"Medium",saved:false},
];

const effortColor:Record<string,[string,string]>={Low:[GL,G],Medium:["#FEF3C7","#B45309"],High:["#FDECEA","#C0392B"]};

export function SustainabilityDashboard(){
  const [selected,setSelected]=useState(properties[0]);
  const [recs,setRecs]=useState(upgrades);
  const [certified,setCertified]=useState(false);

  function toggleSave(id:number){
    setRecs(r=>r.map(u=>u.id===id?{...u,saved:!u.saved}:u));
  }
  const [bg,tc]=gradeColor[selected.grade];

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1050,margin:"0 auto",padding:"32px 28px 80px"}}>
        <div style={{marginBottom:28}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Analytics</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
            <h1 style={{fontFamily:SERIF,fontSize:38,color:TX,lineHeight:1,letterSpacing:"-1px",margin:0}}>
              Sustainability <em style={{fontStyle:"italic",color:G}}>Dashboard</em>
            </h1>
            {certified?(
              <div style={{display:"flex",alignItems:"center",gap:8,background:GL,border:`1px solid ${G}`,borderRadius:10,padding:"10px 16px"}}>
                <span style={{fontSize:20}}>🌿</span>
                <div>
                  <p style={{fontSize:11,fontWeight:700,color:G,margin:0}}>Kaya Green Certified</p>
                  <p style={{fontSize:10,color:"#085040",margin:0}}>Portfolio meets ESG standards</p>
                </div>
              </div>
            ):(
              <button onClick={()=>{toast.success("Certification application submitted!");setCertified(true);}}
                style={{padding:"9px 18px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                🌿 Apply for Kaya Green Badge
              </button>
            )}
          </div>
        </div>

        {/* Property energy grade row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
          {properties.map(p=>{
            const [pbg,ptc]=gradeColor[p.grade];
            return(
              <div key={p.id} style={{...cd,padding:"16px",cursor:"pointer",outline:selected.id===p.id?`2px solid ${G}`:"none",outlineOffset:2,transition:"outline .15s"}}
                onClick={()=>setSelected(p)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <p style={{fontSize:12,fontWeight:600,color:TX,lineHeight:1.3}}>{p.name}</p>
                  <div style={{background:pbg,color:ptc,fontWeight:800,fontSize:18,width:36,height:36,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{p.grade}</div>
                </div>
                <p style={{fontSize:10,color:MU,marginBottom:8}}>{p.units} units</p>
                <div style={{height:4,background:BD,borderRadius:2}}>
                  <div style={{height:4,background:ptc,borderRadius:2,width:`${p.score}%`,transition:"width .6s"}}/>
                </div>
                <p style={{fontSize:10,fontWeight:600,color:ptc,marginTop:4}}>{p.score}/100</p>
              </div>
            );
          })}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:16,marginBottom:24}}>
          {/* Selected property detail */}
          <div style={cd}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${BD}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>{selected.name}</p>
              <div style={{background:bg,color:tc,fontWeight:800,fontSize:20,width:40,height:40,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {selected.grade}
              </div>
            </div>
            <div style={{padding:"18px 20px"}}>
              {[
                {l:"Monthly Energy Usage",v:`${selected.kwh.toLocaleString()} kWh`,pct:Math.min(100,selected.kwh/130),c:"#B45309"},
                {l:"CO₂ Emissions",v:`${selected.co2} tonnes/mo`,pct:selected.co2/6,c:"#C0392B"},
                {l:"Water Consumption",v:`${selected.water.toLocaleString()} m³/mo`,pct:selected.water/900,c:"#1E5FA8"},
              ].map(m=>(
                <div key={m.l} style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,color:MU}}>{m.l}</span>
                    <span style={{fontSize:12,fontWeight:600,color:TX}}>{m.v}</span>
                  </div>
                  <div style={{height:6,background:BG,borderRadius:3}}>
                    <div style={{height:6,background:m.c,borderRadius:3,width:`${m.pct*100}%`,transition:"width .6s"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Q1 ESG Report */}
          <div style={cd}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${BD}`}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>Q1 2026 ESG Report</p>
            </div>
            <div style={{padding:"18px 20px"}}>
              {[
                {icon:"⚡",label:"Energy Saved",val:"12.4 MWh",trend:"+8%",up:true},
                {icon:"💧",label:"Water Reduced",val:"340 m³",trend:"-14%",up:true},
                {icon:"🌿",label:"Carbon Offset",val:"4.2 tonnes",trend:"+22%",up:true},
              ].map(m=>(
                <div key={m.label} style={{...cd,padding:"14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:24}}>{m.icon}</span>
                  <div style={{flex:1}}>
                    <p style={{fontSize:11,color:MU,marginBottom:2}}>{m.label}</p>
                    <p style={{fontSize:18,fontWeight:700,color:TX,margin:0}}>{m.val}</p>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:G,background:GL,padding:"3px 9px",borderRadius:10}}>{m.trend}</span>
                </div>
              ))}
              <button onClick={()=>toast.success("ESG report downloaded")} style={{width:"100%",padding:"10px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",marginTop:4}}>
                Download PDF Report →
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade recommendations */}
        <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>Upgrade Recommendations</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {recs.map(u=>{
            const [ebg,etc]=effortColor[u.effort];
            return(
              <div key={u.id} style={{...cd,padding:"18px 20px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                <span style={{fontSize:28}}>{u.icon}</span>
                <div style={{flex:1,minWidth:180}}>
                  <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:2}}>{u.title}</p>
                  <p style={{fontSize:11,color:MU}}>{u.prop}</p>
                </div>
                <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{textAlign:"center"}}>
                    <p style={{fontSize:10,color:MU,marginBottom:2}}>Annual Save</p>
                    <p style={{fontSize:13,fontWeight:700,color:G}}>{u.save}</p>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <p style={{fontSize:10,color:MU,marginBottom:2}}>Payback</p>
                    <p style={{fontSize:13,fontWeight:600,color:TX}}>{u.payback}</p>
                  </div>
                  <span style={{background:ebg,color:etc,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:12}}>{u.effort} effort</span>
                  <button onClick={()=>toggleSave(u.id)} style={{padding:"7px 14px",background:u.saved?GL:"#fff",color:u.saved?G:MU,border:`1px solid ${u.saved?G:BD}`,borderRadius:8,fontFamily:SANS,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
                    {u.saved?"✓ Saved":"Save"}
                  </button>
                  <button onClick={()=>toast.success(`Quote requested for ${u.title}`)} style={{padding:"7px 14px",background:TX,color:"#fff",border:"none",borderRadius:8,fontFamily:SANS,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                    Get Quote →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
