import { useState } from "react";
import { toast } from "sonner";
import { PublicNav } from "../components/PublicNav";
import { Accessibility, ArrowUpDown, DoorOpen, Grip, PersonStanding, Bell, ChefHat, ParkingCircle, Contrast, Type, Wind, Volume2, CheckCircle2, Globe, Users } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const filters=[
  {id:"ramp",label:"Wheelchair Ramp",icon:Accessibility,active:false},
  {id:"elevator",label:"Elevator Access",icon:ArrowUpDown,active:true},
  {id:"wide",label:"Wide Doorways (32\"+)",icon:DoorOpen,active:false},
  {id:"grab",label:"Grab Bars",icon:Grip,active:false},
  {id:"nostairs",label:"No Steps to Entry",icon:PersonStanding,active:false},
  {id:"visual",label:"Visual Fire Alerts",icon:Bell,active:true},
  {id:"lowcounters",label:"Lowered Counters",icon:ChefHat,active:false},
  {id:"parking",label:"Accessible Parking",icon:ParkingCircle,active:true},
];

const displayControls=[
  {id:"highcontrast",label:"High Contrast Mode",icon:Contrast,on:false},
  {id:"largetext",label:"Large Text Mode",icon:Type,on:false},
  {id:"reducemotion",label:"Reduce Motion",icon:Wind,on:true},
  {id:"screenreader",label:"Screen Reader Mode",icon:Volume2,on:false},
];

const features=[
  {icon:Accessibility,title:"Accessibility Filters",desc:"Filter listings by 8+ accessibility features instantly",status:"Active"},
  {icon:Volume2,title:"Screen Reader Support",desc:"Full ARIA labelling across all KAYA pages",status:"Active"},
  {icon:Contrast,title:"High Contrast Mode",desc:"Switch to high-contrast colour scheme for low vision",status:"Active"},
  {icon:Type,title:"Large Text Mode",desc:"Scale UI text to 140% for improved readability",status:"Active"},
  {icon:Users,title:"Assisted Applications",desc:"Step-by-step guide with plain language throughout",status:"Beta"},
  {icon:Globe,title:"Translated Listings",desc:"Auto-translate listing descriptions to 8+ languages",status:"Beta"},
];

const listings=[
  {id:1,title:"Accessible 2BR — Elevator + Ramp",addr:"123 King St W, Toronto",rent:2200,features:["Ramp","Elevator","Wide Doors","Grab Bars","Visual Alerts"],verified:true},
  {id:2,title:"Ground Floor 1BR — No Steps",addr:"456 Bloor St W, Toronto",rent:1850,features:["No Steps","Wide Doors","Accessible Parking","Low Counters"],verified:true},
  {id:3,title:"Accessible Studio — Full Suite",addr:"300 Bloor W, Etobicoke",rent:1600,features:["Elevator","Ramp","Grab Bars","Visual Alerts","Accessible Parking"],verified:false},
];

export function AccessibilityHub(){
  const [activeFilters,setActiveFilters]=useState(filters);
  const [controls,setControls]=useState(displayControls);
  const [saved,setSaved]=useState<number[]>([]);

  function toggleFilter(id:string){
    setActiveFilters(f=>f.map(x=>x.id===id?{...x,active:!x.active}:x));
  }
  function toggleControl(id:string){
    setControls(c=>c.map(x=>{
      if(x.id!==id)return x;
      const now=!x.on;
      toast(now?`${x.label} enabled`:`${x.label} disabled`);
      return{...x,on:now};
    }));
  }
  function toggleSave(id:number){
    setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  }

  const active=activeFilters.filter(f=>f.active);

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <PublicNav/>
      <div style={{maxWidth:1050,margin:"0 auto",padding:"100px 28px 80px"}}>
        <div style={{marginBottom:32}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Inclusive Housing</p>
          <h1 style={{fontFamily:SERIF,fontSize:44,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Accessibility <em style={{fontStyle:"italic",color:G}}>Hub</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>Find accessible rentals across Ontario — filtered by the features that matter to you.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:20,marginBottom:32}}>
          {/* Filters sidebar */}
          <div>
            <div style={{...cd,padding:"18px",marginBottom:14}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:14}}>Accessibility Filters</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {activeFilters.map(f=>{const FIcon=f.icon;return(
                  <button key={f.id} onClick={()=>toggleFilter(f.id)}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:f.active?GL:"transparent",border:`1px solid ${f.active?G:BD}`,borderRadius:9,cursor:"pointer",fontFamily:SANS,textAlign:"left",transition:"all .2s"}}>
                    <FIcon size={15} color={f.active?G:MU}/>
                    <span style={{fontSize:12,fontWeight:600,color:f.active?G:TX}}>{f.label}</span>
                    {f.active&&<span style={{marginLeft:"auto",width:16,height:16,background:G,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:700,flexShrink:0}}>✓</span>}
                  </button>
                );})}
              </div>
            </div>

            {/* Display controls */}
            <div style={{...cd,padding:"18px"}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:14}}>Display Controls</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {controls.map(c=>{const CIcon=c.icon;return(
                  <div key={c.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <CIcon size={14} color={c.on?G:MU}/>
                      <span style={{fontSize:12,color:TX}}>{c.label}</span>
                    </div>
                    <button onClick={()=>toggleControl(c.id)}
                      style={{width:42,height:24,borderRadius:12,background:c.on?G:BD,border:"none",cursor:"pointer",position:"relative",transition:"background .25s",flexShrink:0}}>
                      <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:c.on?21:3,transition:"left .25s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
                    </button>
                  </div>
                );})}
              </div>
            </div>
          </div>

          {/* Listings */}
          <div>
            {active.length>0&&(
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                {active.map(f=>{const FChip=f.icon;return(
                  <span key={f.id} style={{background:GL,color:G,fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:4}}>
                    <FChip size={11} color={G}/> {f.label}
                    <button onClick={()=>toggleFilter(f.id)} style={{background:"none",border:"none",cursor:"pointer",color:G,fontSize:11,padding:0,marginLeft:2}}>×</button>
                  </span>
                );})}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {listings.map(l=>(
                <div key={l.id} style={{...cd,padding:"20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <p style={{fontSize:14,fontWeight:600,color:TX}}>{l.title}</p>
                        {l.verified&&<span style={{background:GL,color:G,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>✓ Verified</span>}
                      </div>
                      <p style={{fontSize:12,color:MU}}>{l.addr}</p>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>${l.rent.toLocaleString()}</p>
                      <p style={{fontSize:10,color:MU}}>/month</p>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                    {l.features.map(f=>(
                      <span key={f} style={{background:BG,color:TX,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:10,border:`1px solid ${BD}`}}>{f}</span>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>toast.success("Tour booked!")} style={{flex:1,padding:"9px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>Book Tour</button>
                    <button onClick={()=>toggleSave(l.id)} style={{padding:"9px 16px",background:saved.includes(l.id)?GL:"#fff",color:saved.includes(l.id)?G:MU,border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:12,cursor:"pointer"}}>
                      {saved.includes(l.id)?"♥ Saved":"♡ Save"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div style={{...cd,padding:"22px",marginTop:20,background:TX,border:"none",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
              <div>
                <p style={{fontFamily:SERIF,fontSize:18,color:"#fff",marginBottom:4}}>Need help finding an accessible home?</p>
                <p style={{fontSize:12,color:"rgba(255,255,255,.55)"}}>Our accessibility specialists can guide you through the process.</p>
              </div>
              <button onClick={()=>toast.success("Connecting you with an accessibility specialist...")} style={{padding:"10px 20px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                Talk to a Specialist →
              </button>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:16}}>Platform Accessibility Features</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {features.map(f=>{const FIcon=f.icon;return(
            <div key={f.title} style={{...cd,padding:"18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}><FIcon size={20} color={G}/></div>
                <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:10,background:f.status==="Active"?GL:BG,color:f.status==="Active"?G:MU}}>{f.status}</span>
              </div>
              <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{f.title}</p>
              <p style={{fontSize:11,color:MU,lineHeight:1.5}}>{f.desc}</p>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}
