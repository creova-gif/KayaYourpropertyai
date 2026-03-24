import { useState } from "react";
import { toast } from "sonner";
import { Lock, LockOpen, Thermometer, Camera, Zap, Lightbulb, Ticket, Battery, CheckCircle2 } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

type DeviceStatus="online"|"offline"|"charging"|"locked"|"unlocked";
type LucideIcon=React.ComponentType<{size?:number;color?:string}>;
interface Device{id:string;name:string;type:string;Icon:LucideIcon;status:DeviceStatus;location:string;battery?:number;temp?:number;setpoint?:number;evPct?:number;}

const initDevices:Device[]=[
  {id:"lock1",name:"Front Door Lock",type:"lock",Icon:Lock,status:"locked",location:"Main Entrance",battery:78},
  {id:"lock2",name:"Parking Garage Lock",type:"lock",Icon:Lock,status:"locked",location:"Garage Level P1",battery:42},
  {id:"therm1",name:"Living Room Thermostat",type:"thermostat",Icon:Thermometer,status:"online",location:"Unit 4A",temp:21.5,setpoint:22},
  {id:"cam1",name:"Lobby Camera",type:"camera",Icon:Camera,status:"online",location:"Main Lobby"},
  {id:"ev1",name:"EV Charger — Spot 12",type:"ev",Icon:Zap,status:"charging",location:"Garage P1",evPct:63},
  {id:"lights1",name:"Common Area Lights",type:"lights",Icon:Lightbulb,status:"online",location:"Hallways 1–5F"},
];

const activityLog=[
  {time:"9:14 AM",event:"Front Door Lock: Tenant Sarah K. unlocked",Icon:LockOpen,type:"lock"},
  {time:"9:02 AM",event:"EV Charger: Session started — Tesla Model 3, Spot 12",Icon:Zap,type:"ev"},
  {time:"8:47 AM",event:"Lobby Camera: Motion detected — package delivery",Icon:Camera,type:"camera"},
  {time:"8:30 AM",event:"Living Room Thermostat: Set to 22°C by tenant",Icon:Thermometer,type:"therm"},
  {time:"7:58 AM",event:"Front Door Lock: Visitor pass used (expired 8:00 AM)",Icon:Ticket,type:"pass"},
  {time:"7:30 AM",event:"Common Area Lights: Auto-activated (sunrise schedule)",Icon:Lightbulb,type:"lights"},
  {time:"Yesterday 11:42 PM",event:"Parking Garage Lock: Battery at 42% — reminder sent",Icon:Battery,type:"alert"},
  {time:"Yesterday 6:00 PM",event:"EV Charger: Session ended — 34 kWh delivered",Icon:CheckCircle2,type:"ev"},
];

function BatteryBar({pct}:{pct:number}){
  const c=pct>60?G:pct>30?"#B45309":"#C0392B";
  return(
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <div style={{width:36,height:12,border:`1.5px solid ${BD}`,borderRadius:3,padding:1,display:"flex",alignItems:"center"}}>
        <div style={{height:"100%",width:`${pct}%`,background:c,borderRadius:2,transition:"width .4s"}}/>
      </div>
      <span style={{fontSize:10,color:pct<30?"#C0392B":MU,fontWeight:600}}>{pct}%</span>
    </div>
  );
}

export function SmartHomeHub(){
  const [devices,setDevices]=useState(initDevices);
  const [selectedDev,setSelectedDev]=useState<Device|null>(null);
  const [showPass,setShowPass]=useState(false);
  const [passHours,setPassHours]=useState(2);
  const [passName,setPassName]=useState("");

  function toggleLock(id:string){
    setDevices(prev=>prev.map(d=>{
      if(d.id!==id)return d;
      const ns=d.status==="locked"?"unlocked":"locked";
      toast.success(`${d.name} ${ns}`);
      return{...d,status:ns};
    }));
  }
  function setTemp(id:string,val:number){
    setDevices(prev=>prev.map(d=>d.id===id?{...d,setpoint:val}:d));
  }
  function issuePass(){
    if(!passName.trim()){toast.error("Enter visitor name");return;}
    toast.success(`Temporary pass issued to ${passName} for ${passHours}h`);
    setShowPass(false);setPassName("");
  }

  const statusColor:Record<DeviceStatus,string>={online:G,offline:"#C0392B",charging:"#1E5FA8",locked:G,unlocked:"#B45309"};
  const statusLabel:Record<DeviceStatus,string>={online:"Online",offline:"Offline",charging:"Charging",locked:"Locked",unlocked:"Unlocked"};

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 28px 80px"}}>
        <div style={{marginBottom:28}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Property Management</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
            <h1 style={{fontFamily:SERIF,fontSize:38,color:TX,lineHeight:1,letterSpacing:"-1px",margin:0}}>
              Smart Home <em style={{fontStyle:"italic",color:G}}>Hub</em>
            </h1>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowPass(true)} style={{padding:"9px 18px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
Issue Temp Pass
              </button>
            </div>
          </div>
        </div>

        {/* 6-device status grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
          {devices.map(d=>(
            <div key={d.id} style={{...cd,padding:"18px",cursor:"pointer",transition:"box-shadow .2s"}}
              onClick={()=>setSelectedDev(d===selectedDev?null:d)}
              onMouseOver={e=>(e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.08)")}
              onMouseOut={e=>(e.currentTarget.style.boxShadow="none")}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <d.Icon size={28} color={MU}/>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:statusColor[d.status]}}/>
                  <span style={{fontSize:10,fontWeight:600,color:statusColor[d.status]}}>{statusLabel[d.status]}</span>
                </div>
              </div>
              <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:2}}>{d.name}</p>
              <p style={{fontSize:10,color:MU,marginBottom:10}}>{d.location}</p>

              {d.type==="lock"&&(
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <BatteryBar pct={d.battery!}/>
                  <button onClick={e=>{e.stopPropagation();toggleLock(d.id);}}
                    style={{padding:"5px 12px",background:d.status==="locked"?"#FDECEA":GL,color:d.status==="locked"?"#C0392B":G,border:"none",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                    {d.status==="locked"?"Unlock":"Lock"}
                  </button>
                </div>
              )}
              {d.type==="thermostat"&&(
                <div>
                  <p style={{fontSize:11,color:MU,marginBottom:4}}>Set: <strong style={{color:TX}}>{d.setpoint}°C</strong> · Current: {d.temp}°C</p>
                  <input type="range" min={16} max={28} value={d.setpoint} step={0.5}
                    onClick={e=>e.stopPropagation()}
                    onChange={e=>{e.stopPropagation();setTemp(d.id,parseFloat(e.target.value));}}
                    style={{width:"100%",accentColor:G}}/>
                </div>
              )}
              {d.type==="ev"&&(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:11,color:MU}}>Charge</span>
                    <span style={{fontSize:11,fontWeight:700,color:"#1E5FA8"}}>{d.evPct}%</span>
                  </div>
                  <div style={{height:6,background:"#EBF2FB",borderRadius:3}}>
                    <div style={{height:6,background:"#1E5FA8",borderRadius:3,width:`${d.evPct}%`,transition:"width .4s"}}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Device detail panel */}
        {selectedDev&&selectedDev.type==="thermostat"&&(
          <div style={{...cd,padding:"22px",marginBottom:24,borderLeft:`3px solid ${G}`}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:4}}>{selectedDev.name} — Detailed Control</p>
            <p style={{fontSize:12,color:MU,marginBottom:16}}>Setpoint: <strong>{selectedDev.setpoint}°C</strong> | Current: {selectedDev.temp}°C</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[16,18,20,21,22,23,24,26].map(t=>(
                <button key={t} onClick={()=>setTemp(selectedDev.id,t)}
                  style={{padding:"8px 14px",background:selectedDev.setpoint===t?G:BG,color:selectedDev.setpoint===t?"#fff":TX,border:`1px solid ${BD}`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .15s"}}>
                  {t}°C
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:16}}>
          {/* Activity log */}
          <div style={cd}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${BD}`}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>Activity Log</p>
            </div>
            <div style={{padding:"8px 0"}}>
              {activityLog.map((e,i)=>(
                <div key={i} style={{display:"flex",gap:12,padding:"12px 20px",borderBottom:i<activityLog.length-1?`1px solid ${BD}`:"none"}}>
                  <e.Icon size={18} color={MU}/>
                  <div style={{flex:1}}>
                    <p style={{fontSize:12,color:TX,lineHeight:1.5}}>{e.event}</p>
                    <p style={{fontSize:10,color:MU,marginTop:2}}>{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{...cd,padding:"18px"}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:12}}>Device Summary</p>
              {[{l:"Devices online",v:"5 / 6"},{l:"Locks secured",v:"2 / 2"},{l:"EV sessions today",v:"1 active"},{l:"Alerts",v:"1 low battery"}].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${BD}`}}>
                  <span style={{fontSize:12,color:MU}}>{r.l}</span>
                  <span style={{fontSize:12,fontWeight:600,color:TX}}>{r.v}</span>
                </div>
              ))}
            </div>
            <div style={{...cd,padding:"18px",background:TX,border:"none"}}>
              <p style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".7px",marginBottom:8}}>Low Battery Alert</p>
              <p style={{fontFamily:SERIF,fontSize:16,color:"#fff",marginBottom:4}}>Parking Garage Lock</p>
              <p style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:14}}>Battery at 42% — consider replacing within 30 days</p>
              <button onClick={()=>toast.success("Maintenance request sent")}
                style={{padding:"8px 16px",background:G,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",width:"100%"}}>
                Schedule Replacement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Pass Modal */}
      {showPass&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#fff",borderRadius:20,padding:"32px",width:420,maxWidth:"90vw"}}>
            <p style={{fontFamily:SERIF,fontSize:24,color:TX,marginBottom:4}}>Issue Temporary Pass</p>
            <p style={{fontSize:13,color:MU,marginBottom:24}}>Grant time-windowed access to the main entrance</p>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:MU,display:"block",marginBottom:6}}>VISITOR NAME</label>
              <input value={passName} onChange={e=>setPassName(e.target.value)} placeholder="e.g. Plumber John"
                style={{width:"100%",padding:"10px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{fontSize:11,fontWeight:700,color:MU,display:"block",marginBottom:6}}>DURATION: {passHours}h</label>
              <input type="range" min={1} max={24} value={passHours} onChange={e=>setPassHours(Number(e.target.value))} style={{width:"100%",accentColor:G}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:10,color:MU}}>1h</span>
                <span style={{fontSize:10,color:MU}}>24h</span>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowPass(false)} style={{flex:1,padding:"10px",background:BG,color:TX,border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
              <button onClick={issuePass} style={{flex:1,padding:"10px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Issue Pass →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
