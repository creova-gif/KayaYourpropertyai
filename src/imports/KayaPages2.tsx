// ═══════════════════════════════════════════════════════════════
// KAYA — Properties, PropertyDetail, Payments, Maintenance, Messages
// All using unified Kaya design system
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams, Link } from "react-router";
import {
  Building2, Home, DollarSign, Plus, MapPin, Bed, Bath, Users,
  Edit, Eye, X, Save, ChevronRight, ArrowLeft, Ruler, Calendar,
  CheckCircle, XCircle, Wifi, Car, Wrench, LayoutGrid, List,
  MessageSquare, Clock, CheckCircle2, Send, Search, Filter,
  FileText, Download, Bell, AlertTriangle, TrendingUp, Receipt,
  Zap, Shield,
} from "lucide-react";

// ── Tokens ────────────────────────────────────────────────────
const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TEXT="#0E0F0C",MUTED="#767570";
const BORDER="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const page:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const wrap:React.CSSProperties={maxWidth:1280,margin:"0 auto",padding:"48px 40px 80px"};
const serif=(size:number):React.CSSProperties=>({fontFamily:SERIF,fontSize:size,fontWeight:400,color:TEXT,lineHeight:1,letterSpacing:"-0.5px"});
const label:React.CSSProperties={fontSize:10,fontWeight:600,color:MUTED,textTransform:"uppercase",letterSpacing:"0.7px"};
const card:React.CSSProperties={background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16};

function Badge({text,color="green"}:{text:string;color?:"green"|"amber"|"red"|"gray"}) {
  const m={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MUTED]};
  const [bg,tc]=m[color];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{text}</span>;
}

function KCard({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}) {
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay,duration:0.4,ease:[0.22,1,0.36,1]}}
      whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}}
      style={{...card,...style}}>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROPERTIES
// ═══════════════════════════════════════════════════════════════
export function Properties() {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [newProp, setNewProp] = useState({address:"",city:"",province:"ON",type:"Condo"});

  const [properties, setProperties] = useState([
    { id:1, address:"123 King Street", city:"Toronto", province:"ON", type:"Condo",
      units:[
        {num:"4A",beds:2,baths:1,rent:2300,status:"occupied",tenant:"John Doe"},
        {num:"5A",beds:2,baths:1,rent:2400,status:"available",tenant:null},
      ]
    },
    { id:2, address:"456 Queen Street West", city:"Toronto", province:"ON", type:"Apartment Building",
      units:[
        {num:"1C",beds:3,baths:2,rent:2800,status:"occupied",tenant:"Alice Smith"},
        {num:"2B",beds:1,baths:1,rent:1950,status:"available",tenant:null},
        {num:"3A",beds:2,baths:1,rent:2200,status:"occupied",tenant:"Bob Johnson"},
      ]
    },
    { id:3, address:"789 Bloor Street", city:"Toronto", province:"ON", type:"Townhouse",
      units:[
        {num:"Unit 1",beds:3,baths:2.5,rent:3200,status:"occupied",tenant:"Emma Wilson"},
        {num:"Unit 2",beds:3,baths:2.5,rent:3200,status:"occupied",tenant:"David Lee"},
      ]
    },
  ]);

  const totalUnits = properties.reduce((s,p)=>s+p.units.length,0);
  const occupied = properties.reduce((s,p)=>s+p.units.filter(u=>u.status==="occupied").length,0);
  const revenue = properties.reduce((s,p)=>s+p.units.filter(u=>u.status==="occupied").reduce((ss,u)=>ss+u.rent,0),0);

  return (
    <div style={page}>
      <div style={wrap}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={label}>Portfolio</p>
            <h1 style={{...serif(48),marginTop:8}}>My <em style={{fontStyle:"italic",color:G}}>Properties</em></h1>
          </div>
          <button onClick={()=>setShowAdd(true)}
            style={{display:"flex",alignItems:"center",gap:8,padding:"12px 22px",background:TEXT,border:"none",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
            <Plus size={15}/>Add Property
          </button>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32}}>
          {[
            {label:"Total Properties",value:String(properties.length)},
            {label:"Occupancy Rate",value:`${Math.round((occupied/totalUnits)*100)}%`},
            {label:"Monthly Revenue",value:`$${revenue.toLocaleString()}`},
          ].map((s,i)=>(
            <KCard key={s.label} delay={i*0.07} style={{padding:"22px 26px"}}>
              <p style={label}>{s.label}</p>
              <p style={{...serif(36),marginTop:10}}>{s.value}</p>
            </KCard>
          ))}
        </div>

        {/* Properties */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {properties.map((prop,pi)=>(
            <KCard key={prop.id} delay={0.2+pi*0.08} style={{overflow:"hidden"}}>
              {/* Property header */}
              <div style={{padding:"22px 28px",borderBottom:`1px solid ${BORDER}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Building2 size={20} color={G}/>
                  </div>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                      <span style={{fontFamily:SERIF,fontSize:20,color:TEXT}}>{prop.address}</span>
                      <Badge text={prop.type} color="gray"/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:MUTED}}>
                      <MapPin size={12}/>{prop.city}, {prop.province}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <Badge text={`${prop.units.filter(u=>u.status==="occupied").length}/${prop.units.length} occupied`} color="green"/>
                  <button onClick={()=>navigate(`/properties/${prop.id}`)}
                    style={{padding:"8px 16px",border:`1px solid ${BORDER}`,borderRadius:9,background:"transparent",fontSize:12,fontWeight:600,color:TEXT,cursor:"pointer",fontFamily:SANS,display:"flex",alignItems:"center",gap:5}}>
                    View details <ChevronRight size={12}/>
                  </button>
                </div>
              </div>

              {/* Units grid */}
              <div style={{display:"grid",gridTemplateColumns:`repeat(${prop.units.length},1fr)`,gap:0}}>
                {prop.units.map((unit,ui)=>(
                  <div key={unit.num} style={{padding:"18px 24px",borderRight:ui<prop.units.length-1?`1px solid ${BORDER}`:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <span style={{fontFamily:SERIF,fontSize:18,color:TEXT}}>Unit {unit.num}</span>
                      <Badge text={unit.status==="occupied"?"Occupied":"Available"} color={unit.status==="occupied"?"green":"amber"}/>
                    </div>
                    <div style={{display:"flex",gap:16,marginBottom:10}}>
                      <span style={{fontSize:12,color:MUTED,display:"flex",alignItems:"center",gap:4}}><Bed size={12}/>{unit.beds} bed</span>
                      <span style={{fontSize:12,color:MUTED,display:"flex",alignItems:"center",gap:4}}><Bath size={12}/>{unit.baths} bath</span>
                    </div>
                    <p style={{fontFamily:SERIF,fontSize:22,color:TEXT,marginBottom:unit.tenant?6:0}}>${unit.rent.toLocaleString()}<span style={{fontSize:12,color:MUTED,fontFamily:SANS}}>/mo</span></p>
                    {unit.tenant&&<p style={{fontSize:12,color:MUTED}}>{unit.tenant}</p>}
                  </div>
                ))}
              </div>
            </KCard>
          ))}
        </div>

        {/* Add modal */}
        <AnimatePresence>
          {showAdd&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
              <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}}
                style={{background:"#fff",borderRadius:20,padding:36,width:440,boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
                  <p style={{fontFamily:SERIF,fontSize:24,color:TEXT}}>Add Property</p>
                  <button onClick={()=>setShowAdd(false)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><X size={20} color={MUTED}/></button>
                </div>
                {[
                  {label:"Address",key:"address",placeholder:"e.g. 123 King Street"},
                  {label:"City",key:"city",placeholder:"e.g. Toronto"},
                ].map(f=>(
                  <div key={f.key} style={{marginBottom:16}}>
                    <p style={{...label,marginBottom:6}}>{f.label}</p>
                    <input value={newProp[f.key as keyof typeof newProp]} onChange={e=>setNewProp({...newProp,[f.key]:e.target.value})}
                      placeholder={f.placeholder}
                      style={{width:"100%",padding:"11px 14px",border:`1px solid ${BORDER}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TEXT,outline:"none"}}/>
                  </div>
                ))}
                <div style={{marginBottom:24}}>
                  <p style={{...label,marginBottom:6}}>Type</p>
                  <select value={newProp.type} onChange={e=>setNewProp({...newProp,type:e.target.value})}
                    style={{width:"100%",padding:"11px 14px",border:`1px solid ${BORDER}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TEXT,outline:"none",background:"#fff"}}>
                    {["Condo","Apartment Building","Townhouse","House"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <button onClick={()=>{ if(newProp.address&&newProp.city){setProperties([...properties,{id:properties.length+1,...newProp,units:[]}]);setShowAdd(false);setNewProp({address:"",city:"",province:"ON",type:"Condo"});} }}
                  style={{width:"100%",padding:"13px",background:TEXT,border:"none",borderRadius:10,color:"#fff",fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                  Add Property →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROPERTY DETAIL
// ═══════════════════════════════════════════════════════════════
export function PropertyDetail() {
  const {id} = useParams();
  const [tab, setTab] = useState("overview");

  const property = {
    id:1, name:"King Street Residences", address:"123 King Street", city:"Toronto", province:"ON",
    type:"Condo", yearBuilt:2018, totalUnits:2, occupiedUnits:1,
    description:"Modern luxury condo building in downtown Toronto with 24/7 concierge, fitness centre, rooftop terrace, and stunning city views.",
    amenities:["24/7 Concierge","Fitness Centre","Swimming Pool","Rooftop Terrace","Underground Parking","Bicycle Storage","Pet Friendly","In-Suite Laundry"],
    units:[
      {id:1,num:"4A",beds:2,baths:1,sqft:950,floor:4,rent:2300,deposit:2300,status:"occupied",tenant:"John Doe",leaseStart:"Jan 1, 2024",leaseEnd:"Dec 31, 2024",parking:true,parkingFee:150,petsAllowed:true},
      {id:2,num:"5A",beds:2,baths:1,sqft:975,floor:5,rent:2400,deposit:2400,status:"available",tenant:null,leaseStart:null,leaseEnd:null,parking:true,parkingFee:150,petsAllowed:true},
    ],
    docs:[
      {name:"Property Deed",type:"Legal",date:"Jan 15, 2024"},
      {name:"Insurance Policy",type:"Insurance",date:"Feb 1, 2024"},
      {name:"Floor Plans",type:"Plans",date:"Dec 20, 2023"},
    ],
  };

  const tabs = ["overview","units","documents"];

  return (
    <div style={page}>
      <div style={wrap}>
        {/* Back */}
        <Link to="/properties" style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:G,fontWeight:600,textDecoration:"none",marginBottom:28}}>
          <ArrowLeft size={14}/>Back to Properties
        </Link>

        {/* Hero */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:36}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <p style={label}>Property — #{id}</p>
              <h1 style={{...serif(44),marginTop:8,marginBottom:12}}>{property.name}</h1>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:MUTED}}>
                  <MapPin size={13}/>{property.address}, {property.city}, {property.province}
                </div>
                <Badge text={property.type} color="gray"/>
                <Badge text={`Built ${property.yearBuilt}`} color="gray"/>
                <Badge text={`${property.occupiedUnits}/${property.totalUnits} occupied`} color="green"/>
              </div>
            </div>
            <button style={{display:"flex",alignItems:"center",gap:8,padding:"11px 20px",border:`1px solid ${BORDER}`,borderRadius:10,background:"transparent",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:TEXT}}>
              <Edit size={14}/>Edit Property
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:32}}>
          {[
            {label:"Total Units",value:String(property.totalUnits)},
            {label:"Occupied",value:String(property.occupiedUnits)},
            {label:"Monthly Revenue",value:`$${property.units.filter(u=>u.status==="occupied").reduce((s,u)=>s+u.rent,0).toLocaleString()}`},
            {label:"Year Built",value:String(property.yearBuilt)},
          ].map((s,i)=>(
            <KCard key={s.label} delay={i*0.07} style={{padding:"20px 22px"}}>
              <p style={label}>{s.label}</p>
              <p style={{...serif(32),marginTop:8}}>{s.value}</p>
            </KCard>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:0,borderBottom:`1px solid ${BORDER}`,marginBottom:28}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              style={{padding:"12px 24px",background:"none",border:"none",borderBottom:`2px solid ${tab===t?G:"transparent"}`,fontSize:13,fontWeight:tab===t?600:400,color:tab===t?G:MUTED,cursor:"pointer",fontFamily:SANS,textTransform:"capitalize",transition:"all 0.15s"}}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab: overview */}
        {tab==="overview"&&(
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20}}>
              <KCard style={{padding:"28px"}}>
                <p style={{...serif(20),marginBottom:16}}>About this property</p>
                <p style={{fontSize:14,color:MUTED,lineHeight:1.7,marginBottom:24}}>{property.description}</p>
                <p style={{...label,marginBottom:12}}>Amenities</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {property.amenities.map(a=><Badge key={a} text={a} color="green"/>)}
                </div>
              </KCard>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {icon:CheckCircle,label:"Pets Allowed",val:"Yes"},
                  {icon:Car,label:"Parking",val:"Underground"},
                  {icon:Wifi,label:"Internet",val:"Not included"},
                  {icon:Shield,label:"Security",val:"24/7 Concierge"},
                ].map(f=>(
                  <KCard key={f.label} style={{padding:"16px 18px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:32,height:32,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <f.icon size={14} color={G}/>
                      </div>
                      <div>
                        <p style={{...label}}>{f.label}</p>
                        <p style={{fontSize:13,fontWeight:600,color:TEXT,marginTop:3}}>{f.val}</p>
                      </div>
                    </div>
                  </KCard>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: units */}
        {tab==="units"&&(
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",gap:16}}>
            {property.units.map((u,i)=>(
              <KCard key={u.id} delay={i*0.08} style={{padding:"24px 28px",borderLeft:`3px solid ${u.status==="occupied"?G:"#B45309"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                      <p style={{...serif(22)}}>Unit {u.num}</p>
                      <Badge text={u.status==="occupied"?"Occupied":"Available"} color={u.status==="occupied"?"green":"amber"}/>
                    </div>
                    <div style={{display:"flex",gap:20}}>
                      {[{i:Bed,v:`${u.beds} bed`},{i:Bath,v:`${u.baths} bath`},{i:Ruler,v:`${u.sqft} sqft`}].map(f=>(
                        <span key={f.v} style={{fontSize:12,color:MUTED,display:"flex",alignItems:"center",gap:4}}><f.i size={12}/>{f.v}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <p style={{fontFamily:SERIF,fontSize:28,color:TEXT}}>${u.rent.toLocaleString()}<span style={{fontSize:13,color:MUTED,fontFamily:SANS}}>/mo</span></p>
                    {u.parkingFee&&<p style={{fontSize:12,color:MUTED}}>+${u.parkingFee} parking</p>}
                  </div>
                </div>
                {u.tenant&&(
                  <div style={{paddingTop:16,borderTop:`1px solid ${BORDER}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G}}>
                        {u.tenant.split(" ").map(n=>n[0]).join("")}
                      </div>
                      <div>
                        <p style={{fontSize:13,fontWeight:600,color:TEXT}}>{u.tenant}</p>
                        <p style={{fontSize:11,color:MUTED}}>{u.leaseStart} — {u.leaseEnd}</p>
                      </div>
                    </div>
                    <button style={{padding:"7px 14px",border:`1px solid ${BORDER}`,borderRadius:8,background:"transparent",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:TEXT}}>View Lease</button>
                  </div>
                )}
              </KCard>
            ))}
          </motion.div>
        )}

        {/* Tab: documents */}
        {tab==="documents"&&(
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            <KCard style={{overflow:"hidden"}}>
              {property.docs.map((d,i)=>(
                <div key={d.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 24px",borderBottom:i<property.docs.length-1?`1px solid ${BORDER}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:34,height:34,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <FileText size={14} color={G}/>
                    </div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:TEXT}}>{d.name}</p>
                      <p style={{fontSize:11,color:MUTED}}>{d.type} · {d.date}</p>
                    </div>
                  </div>
                  <button style={{padding:"7px 14px",border:`1px solid ${BORDER}`,borderRadius:8,background:"transparent",fontSize:12,cursor:"pointer",fontFamily:SANS,color:MUTED,display:"flex",alignItems:"center",gap:5}}>
                    <Download size={12}/>Download
                  </button>
                </div>
              ))}
            </KCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAYMENTS
// ═══════════════════════════════════════════════════════════════
export function Payments() {
  const [month, setMonth] = useState("March 2026");

  const payments = [
    {tenant:"John Doe",unit:"123 King St · 4A",amount:2300,due:"Mar 1",paid:"Mar 1",status:"paid"},
    {tenant:"Alice Smith",unit:"456 Queen St · 1C",amount:2800,due:"Mar 1",paid:"Mar 1",status:"paid"},
    {tenant:"Bob Johnson",unit:"456 Queen St · 3A",amount:2200,due:"Mar 1",paid:null,status:"overdue"},
    {tenant:"Emma Wilson",unit:"789 Bloor St · Unit 1",amount:3200,due:"Mar 1",paid:"Mar 3",status:"late"},
    {tenant:"David Lee",unit:"789 Bloor St · Unit 2",amount:3200,due:"Mar 1",paid:"Mar 1",status:"paid"},
  ];

  const totalCollected = payments.filter(p=>p.status!=="overdue").reduce((s,p)=>s+p.amount,0);
  const outstanding = payments.filter(p=>p.status==="overdue").reduce((s,p)=>s+p.amount,0);

  return (
    <div style={page}>
      <div style={wrap}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={label}>Rent Collection</p>
            <h1 style={{...serif(48),marginTop:8}}>Payments <em style={{fontStyle:"italic",color:G}}>&amp; Revenue</em></h1>
          </div>
          <select value={month} onChange={e=>setMonth(e.target.value)}
            style={{padding:"10px 16px",border:`1px solid ${BORDER}`,borderRadius:10,fontFamily:SANS,fontSize:13,background:"#fff",color:TEXT,outline:"none"}}>
            {["March 2026","February 2026","January 2026"].map(m=><option key={m}>{m}</option>)}
          </select>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
          {[
            {label:"Collected",value:`$${totalCollected.toLocaleString()}`,sub:"this month",trend:"+"},
            {label:"Outstanding",value:`$${outstanding.toLocaleString()}`,sub:"1 unit overdue"},
            {label:"Collection Rate",value:`${Math.round((totalCollected/(totalCollected+outstanding))*100)}%`,sub:"of expected"},
            {label:"Avg Rent",value:`$${Math.round(payments.reduce((s,p)=>s+p.amount,0)/payments.length).toLocaleString()}`,sub:"per unit"},
          ].map((s,i)=>(
            <KCard key={s.label} delay={i*0.07} style={{padding:"22px 26px"}}>
              <p style={label}>{s.label}</p>
              <div style={{display:"flex",alignItems:"baseline",gap:6,marginTop:8}}>
                <p style={{fontFamily:SERIF,fontSize:32,color:TEXT,lineHeight:1}}>{s.value}</p>
              </div>
              <p style={{fontSize:12,color:MUTED,marginTop:6}}>{s.sub}</p>
            </KCard>
          ))}
        </div>

        {/* Payment list */}
        <KCard>
          <div style={{padding:"22px 28px",borderBottom:`1px solid ${BORDER}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TEXT}}>Rent Payments — {month}</p>
            <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:BG,border:`1px solid ${BORDER}`,borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:TEXT}}>
              <Download size={12}/>Export
            </button>
          </div>
          {payments.map((p,i)=>(
            <motion.div key={p.tenant} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 28px",borderBottom:i<payments.length-1?`1px solid ${BORDER}`:"none",
                borderLeft:`3px solid ${p.status==="paid"?G:p.status==="late"?"#B45309":"#C0392B"}`}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:p.status==="paid"?GL:p.status==="late"?"#FEF3C7":"#FDECEA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:p.status==="paid"?G:p.status==="late"?"#B45309":"#C0392B"}}>
                  {p.tenant.split(" ").map(n=>n[0]).join("")}
                </div>
                <div>
                  <p style={{fontSize:14,fontWeight:600,color:TEXT}}>{p.tenant}</p>
                  <p style={{fontSize:12,color:MUTED}}>{p.unit}</p>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:24}}>
                <div style={{textAlign:"right"}}>
                  <p style={{fontFamily:SERIF,fontSize:20,color:TEXT}}>${p.amount.toLocaleString()}</p>
                  <p style={{fontSize:11,color:MUTED}}>Due {p.due}{p.paid?` · Paid ${p.paid}`:""}</p>
                </div>
                <div style={{width:90,textAlign:"center"}}>
                  {p.status==="paid"&&<span style={{background:GL,color:G,fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20}}>✓ Paid</span>}
                  {p.status==="late"&&<span style={{background:"#FEF3C7",color:"#B45309",fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20}}>Late</span>}
                  {p.status==="overdue"&&<span style={{background:"#FDECEA",color:"#C0392B",fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20}}>Overdue</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </KCard>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAINTENANCE
// ═══════════════════════════════════════════════════════════════
export function Maintenance() {
  const [view, setView] = useState<"kanban"|"list">("kanban");
  const [showNew, setShowNew] = useState(false);

  const requests = [
    {id:1,title:"Kitchen sink leak",unit:"456 Queen St · 3A",tenant:"Bob Johnson",priority:"high",status:"open",date:"Mar 12",est:"$180"},
    {id:2,title:"HVAC not cooling",unit:"123 King St · 4A",tenant:"John Doe",priority:"high",status:"in_progress",date:"Mar 10",est:"$350"},
    {id:3,title:"Broken window latch",unit:"789 Bloor St · Unit 1",tenant:"Emma Wilson",priority:"medium",status:"in_progress",date:"Mar 9",est:"$90"},
    {id:4,title:"Dryer not heating",unit:"456 Queen St · 1C",tenant:"Alice Smith",priority:"medium",status:"open",date:"Mar 14",est:"$220"},
    {id:5,title:"Door lock replacement",unit:"789 Bloor St · Unit 2",tenant:"David Lee",priority:"low",status:"completed",date:"Mar 8",est:"$120"},
  ];

  const columns = [
    {key:"open",label:"Open",color:"#C0392B",bg:"#FDECEA"},
    {key:"in_progress",label:"In Progress",color:"#1E5FA8",bg:"#EBF2FB"},
    {key:"completed",label:"Completed",color:G,bg:GL},
  ];

  const priority = (p:string) => ({high:["#FDECEA","#C0392B"],medium:["#FEF3C7","#B45309"],low:[BG,MUTED]})[p]||[BG,MUTED];

  return (
    <div style={page}>
      <div style={wrap}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={label}>Operations</p>
            <h1 style={{...serif(48),marginTop:8}}>Maintenance <em style={{fontStyle:"italic",color:G}}>Requests</em></h1>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",background:"#fff",border:`1px solid ${BORDER}`,borderRadius:10,overflow:"hidden"}}>
              {(["kanban","list"] as const).map(v=>(
                <button key={v} onClick={()=>setView(v)}
                  style={{padding:"9px 16px",background:view===v?TEXT:"transparent",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,color:view===v?"#fff":MUTED,fontFamily:SANS}}>
                  {v==="kanban"?<LayoutGrid size={14}/>:<List size={14}/>}
                </button>
              ))}
            </div>
            <button onClick={()=>setShowNew(true)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"11px 20px",background:TEXT,border:"none",borderRadius:11,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
              <Plus size={14}/>New Request
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
          {[
            {label:"Open",value:"2",color:G},
            {label:"In Progress",value:"2",color:"#1E5FA8"},
            {label:"Completed",value:"1",color:G},
            {label:"Avg Cost",value:"$192",color:TEXT},
          ].map((s,i)=>(
            <KCard key={s.label} delay={i*0.07} style={{padding:"20px 22px"}}>
              <p style={label}>{s.label}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:s.color,marginTop:8,lineHeight:1}}>{s.value}</p>
            </KCard>
          ))}
        </div>

        {/* Kanban */}
        {view==="kanban"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {columns.map(col=>(
              <div key={col.key}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:col.color}}/>
                  <span style={{fontSize:12,fontWeight:600,color:TEXT}}>{col.label}</span>
                  <span style={{fontSize:11,color:MUTED,marginLeft:2}}>({requests.filter(r=>r.status===col.key).length})</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {requests.filter(r=>r.status===col.key).map((r,i)=>{
                    const [pbg,pc]=priority(r.priority);
                    return (
                      <motion.div key={r.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                        whileHover={{y:-2,boxShadow:"0 8px 24px rgba(0,0,0,0.08)"}}
                        style={{...card,padding:"18px 20px",cursor:"pointer"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                          <span style={{background:pbg,color:pc,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"uppercase",letterSpacing:"0.3px"}}>{r.priority}</span>
                          <span style={{fontSize:11,color:MUTED}}>{r.date}</span>
                        </div>
                        <p style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:6}}>{r.title}</p>
                        <p style={{fontSize:12,color:MUTED,marginBottom:12}}>{r.unit}</p>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`1px solid ${BORDER}`}}>
                          <span style={{fontSize:12,color:MUTED}}>{r.tenant}</span>
                          <span style={{fontSize:12,fontWeight:600,color:TEXT}}>{r.est}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List view */}
        {view==="list"&&(
          <KCard>
            {requests.map((r,i)=>{
              const [pbg,pc]=priority(r.priority);
              const col=columns.find(c=>c.key===r.status)!;
              return (
                <div key={r.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:i<requests.length-1?`1px solid ${BORDER}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:36,height:36,borderRadius:9,background:pbg,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Wrench size={14} color={pc}/>
                    </div>
                    <div>
                      <p style={{fontSize:13,fontWeight:600,color:TEXT}}>{r.title}</p>
                      <p style={{fontSize:11,color:MUTED}}>{r.unit} · {r.tenant}</p>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <span style={{background:pbg,color:pc,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"uppercase"}}>{r.priority}</span>
                    <span style={{background:col.bg,color:col.color,fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20}}>{col.label}</span>
                    <span style={{fontSize:12,fontWeight:600,color:TEXT,minWidth:40,textAlign:"right"}}>{r.est}</span>
                  </div>
                </div>
              );
            })}
          </KCard>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MESSAGES
// ═══════════════════════════════════════════════════════════════
export function Messages() {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState("");

  const convos = [
    {
      id:0,name:"Bob Johnson",unit:"456 Queen St · 3A",unread:2,last:"The sink is still leaking...",time:"2m",
      msgs:[
        {from:"tenant",text:"Hey, the kitchen sink is still leaking. Been 3 days now.",time:"9:12 AM"},
        {from:"tenant",text:"Water is getting under the cabinet too. Can someone come today?",time:"9:14 AM"},
        {from:"me",text:"Hi Bob, I've scheduled a plumber for this afternoon between 2–4 PM. They'll contact you directly.",time:"9:45 AM"},
        {from:"tenant",text:"The sink is still leaking after yesterday's visit.",time:"2:10 PM"},
      ]
    },
    {
      id:1,name:"Sarah Kim",unit:"Application · Unit 5A",unread:1,last:"When can I move in?",time:"1h",
      msgs:[
        {from:"tenant",text:"Hi! My application was approved — when can I move in?",time:"Yesterday"},
        {from:"me",text:"Congratulations Sarah! Move-in is available April 1st. I'll send over the lease today.",time:"Yesterday"},
        {from:"tenant",text:"When can I move in?",time:"10:30 AM"},
      ]
    },
    {
      id:2,name:"Emma Wilson",unit:"789 Bloor St · Unit 1",unread:0,last:"Thanks for the quick response",time:"3h",
      msgs:[
        {from:"me",text:"Hi Emma, your maintenance request has been completed. Everything fixed?",time:"Yesterday"},
        {from:"tenant",text:"Thanks for the quick response! Everything looks good now.",time:"Yesterday"},
      ]
    },
  ];

  const [chats, setChats] = useState(convos);
  const current = chats[active];

  const send = () => {
    if(!input.trim()) return;
    const updated = chats.map((c,i)=>i===active ? {...c,msgs:[...c.msgs,{from:"me",text:input,time:"Now"}],last:input} : c);
    setChats(updated);
    setInput("");
  };

  return (
    <div style={page}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"48px 40px 0"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:28}}>
          <p style={label}>Communication</p>
          <h1 style={{...serif(48),marginTop:8}}><em style={{fontStyle:"italic",color:G}}>Messages</em></h1>
        </motion.div>
        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[{l:"Conversations",v:"12"},{l:"Unread",v:"3"},{l:"Active",v:"5"},{l:"Resolved today",v:"8"}].map((s,i)=>(
            <KCard key={s.l} delay={i*0.07} style={{padding:"16px 18px"}}>
              <p style={label}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:28,color:TEXT,marginTop:6,lineHeight:1}}>{s.v}</p>
            </KCard>
          ))}
        </div>
      </div>

      {/* Chat UI */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"320px 1fr",gap:0,height:"calc(100vh - 320px)",minHeight:500}}>
        {/* Sidebar */}
        <div style={{background:"#fff",borderRadius:"16px 0 0 0",border:`1px solid ${BORDER}`,borderRight:"none",overflowY:"auto"}}>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${BORDER}`}}>
            <div style={{position:"relative"}}>
              <Search size={13} color={MUTED} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
              <input placeholder="Search conversations..." style={{width:"100%",padding:"9px 12px 9px 32px",border:`1px solid ${BORDER}`,borderRadius:9,fontFamily:SANS,fontSize:12,color:TEXT,outline:"none",background:BG}}/>
            </div>
          </div>
          {chats.map((c,i)=>(
            <div key={c.id} onClick={()=>setActive(i)}
              style={{padding:"16px 18px",borderBottom:`1px solid ${BORDER}`,cursor:"pointer",background:active===i?GL:"transparent",borderLeft:`3px solid ${active===i?G:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G,flexShrink:0}}>
                    {c.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p style={{fontSize:13,fontWeight:600,color:TEXT}}>{c.name}</p>
                    <p style={{fontSize:10,color:MUTED}}>{c.unit}</p>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                  <span style={{fontSize:10,color:MUTED}}>{c.time}</span>
                  {c.unread>0&&<span style={{width:16,height:16,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>{c.unread}</span>}
                </div>
              </div>
              <p style={{fontSize:11,color:MUTED,paddingLeft:40,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{c.last}</p>
            </div>
          ))}
        </div>

        {/* Chat pane */}
        <div style={{background:"#fff",border:`1px solid ${BORDER}`,borderLeft:"none",borderRadius:"0 16px 0 0",display:"flex",flexDirection:"column"}}>
          {/* Header */}
          <div style={{padding:"16px 24px",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:G}}>
              {current.name.split(" ").map(n=>n[0]).join("")}
            </div>
            <div>
              <p style={{fontSize:14,fontWeight:600,color:TEXT}}>{current.name}</p>
              <p style={{fontSize:11,color:MUTED}}>{current.unit}</p>
            </div>
          </div>
          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:12}}>
            {current.msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"70%",padding:"11px 16px",borderRadius:m.from==="me"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.from==="me"?TEXT:"#fff",border:m.from==="me"?"none":`1px solid ${BORDER}`,fontSize:13,color:m.from==="me"?"#fff":TEXT,lineHeight:1.55}}>
                  <p>{m.text}</p>
                  <p style={{fontSize:10,opacity:0.5,marginTop:4,textAlign:m.from==="me"?"right":"left"}}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div style={{padding:"14px 20px",borderTop:`1px solid ${BORDER}`,display:"flex",gap:10,alignItems:"center"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder={`Reply to ${current.name.split(" ")[0]}...`}
              style={{flex:1,padding:"11px 16px",border:`1px solid ${BORDER}`,borderRadius:10,fontFamily:SANS,fontSize:13,color:TEXT,outline:"none"}}/>
            <button onClick={send} disabled={!input.trim()}
              style={{width:40,height:40,borderRadius:10,background:input.trim()?TEXT:BG,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:input.trim()?"pointer":"default"}}>
              <Send size={15} color={input.trim()?"#fff":MUTED}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
