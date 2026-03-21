// ═══════════════════════════════════════════════════════════════
// KAYA — New pages: ListingSyndication, DepositFree,
//         VendorMarketplace, RentCreditBuilding
// These close the biggest gaps vs AppFolio / Buildium / Obligo
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink, CheckCircle2, TrendingUp, Shield, Star, Zap,
  Plus, Search, Clock, DollarSign, Award, Phone, Mail, MapPin,
  Building2, Users, ArrowUpRight, ChevronRight, X, Filter,
  Wrench, Zap as Lightning, Droplets, Wind, Home, Check,
  CreditCard, TrendingDown, Calendar, AlertTriangle,
} from "lucide-react";

// ── Design tokens ──────────────────────────────────────────────
const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}) {
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

function KCard({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}) {
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay,duration:.4,ease:[.22,1,.36,1]}}
      whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}} style={{...cd,...style}}>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 1. LISTING SYNDICATION HUB
// ═══════════════════════════════════════════════════════════════
export function ListingSyndication() {
  const [published, setPublished]=useState<Record<string,boolean>>({zillow:true,kijiji:true,facebook:false,padmapper:true,zumper:false,rentals:false});
  const [selected, setSelected]=useState<string|null>(null);

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

  return (
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

        {/* Stats */}
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
          {/* Platform grid */}
          <div>
            <p style={{...lb,marginBottom:14}}>Distribution channels</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {platforms.map((p,i)=>(
                <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}
                  onClick={()=>setSelected(selected===p.id?null:p.id)}
                  style={{...cd,padding:"18px 20px",cursor:"pointer",borderLeft:`3px solid ${published[p.id]?G:BD}`,transition:"all .15s"}}
                  whileHover={{x:2}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:38,height:38,borderRadius:10,background:p.colorL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:p.color}}>
                        {p.logo}
                      </div>
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
                    {published[p.id]&&p.views>0&&(
                      <div style={{display:"flex",gap:10,fontSize:11,color:MU}}>
                        <span>{p.views} views</span>
                        <span>{p.leads} leads</span>
                      </div>
                    )}
                    {!published[p.id]&&<span style={{fontSize:11,color:MU}}>Not published</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
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
                {stage:"Inquiries",count:totalLeads,pct:Math.round(totalLeads/totalViews*100)||0},
                {stage:"Applications",count:3,pct:11},
                {stage:"Approved",count:1,pct:4},
              ].map((s,i)=>(
                <div key={s.stage} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,color:TX,fontWeight:i===0?600:400}}>{s.stage}</span>
                    <span style={{fontSize:12,fontWeight:600,color:TX}}>{s.count}</span>
                  </div>
                  <div style={{height:5,background:BD,borderRadius:3}}>
                    <div style={{height:5,background:G,borderRadius:3,width:`${s.pct}%`,opacity:.7+i*.075,transition:"width .5s"}}/>
                  </div>
                </div>
              ))}
            </KCard>

            <div style={{padding:"16px",background:GL,borderRadius:14,border:`1px solid rgba(10,122,82,.15)`}}>
              <p style={{fontSize:12,fontWeight:700,color:G,marginBottom:6}}>✦ AI Tip</p>
              <p style={{fontSize:12,color:"#085040",lineHeight:1.6}}>Enable Zumper to reach 13M additional renters. Your current vacancy matches high-demand profiles in Downtown Toronto right now.</p>
              <button style={{marginTop:10,padding:"7px 14px",background:G,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Enable Zumper →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. DEPOSIT-FREE RENTING
// ═══════════════════════════════════════════════════════════════
export function DepositFree() {
  const [tab,setTab]=useState<"tenant"|"landlord">("tenant");
  const [enrolled,setEnrolled]=useState(false);

  return (
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

        {/* Role tabs */}
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
              {/* Comparison */}
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

              {/* How it works */}
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
                      <div style={{width:36,height:36,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:SERIF,fontSize:18,color:G,margin:"0 auto 12px"}}>
                        {s.step}
                      </div>
                      <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{s.label}</p>
                      <p style={{fontSize:11,color:MU,lineHeight:1.55}}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </KCard>

              {/* CTA */}
              {!enrolled?(
                <div style={{...cd,padding:"28px",textAlign:"center"}}>
                  <p style={{fontFamily:SERIF,fontSize:24,color:TX,marginBottom:8}}>Enable Kaya Shield on your next rental</p>
                  <p style={{fontSize:14,color:MU,marginBottom:20}}>Available on all Kaya-verified listings · Instant approval</p>
                  <button onClick={()=>setEnrolled(true)}
                    style={{padding:"14px 40px",background:G,color:"#fff",border:"none",borderRadius:12,fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
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
                  {icon:Users,label:"40% more applicants",desc:"Removing the deposit barrier means more qualified tenants apply"},
                  {icon:Shield,label:"Fully protected",desc:"Kaya covers unpaid rent and damages up to $5,000 — same as a deposit"},
                  {icon:TrendingUp,label:"Faster leasing",desc:"Shield-listed units lease 3x faster than deposit-required units"},
                ].map((f,i)=>(
                  <KCard key={f.label} delay={i*.07} style={{padding:"20px"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                      <f.icon size={16} color={G}/>
                    </div>
                    <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:4}}>{f.label}</p>
                    <p style={{fontSize:12,color:MU,lineHeight:1.55}}>{f.desc}</p>
                  </KCard>
                ))}
              </div>
              <KCard style={{padding:"24px"}}>
                <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:16}}>Coverage details</p>
                {[
                  {label:"Unpaid rent",value:"Up to 3 months",c:G},
                  {label:"Property damage",value:"Up to $5,000",c:G},
                  {label:"Cleaning costs",value:"Up to $2,000",c:G},
                  {label:"Legal fees (LTB)",value:"Covered",c:G},
                  {label:"Your cost",value:"$0",c:G},
                ].map((r,i)=>(
                  <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:i>0?`1px solid ${BD}`:"none"}}>
                    <span style={{fontSize:13,color:MU}}>{r.label}</span>
                    <span style={{fontSize:13,fontWeight:700,color:r.c}}>{r.value}</span>
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

// ═══════════════════════════════════════════════════════════════
// 3. VENDOR MARKETPLACE
// ═══════════════════════════════════════════════════════════════
export function VendorMarketplace() {
  const [cat,setCat]=useState("all");
  const [booking,setBooking]=useState<string|null>(null);

  const categories=[
    {id:"all",label:"All",icon:"🔍"},
    {id:"plumbing",label:"Plumbing",icon:"💧"},
    {id:"electrical",label:"Electrical",icon:"⚡"},
    {id:"hvac",label:"HVAC",icon:"❄"},
    {id:"cleaning",label:"Cleaning",icon:"✨"},
    {id:"appliance",label:"Appliances",icon:"🔧"},
    {id:"painting",label:"Painting",icon:"🎨"},
  ];

  const vendors=[
    {id:"v1",name:"Quick Fix Plumbing",cat:"plumbing",rating:4.9,reviews:143,response:"< 2h",price:"$95–$250",verified:true,jobs:312,badge:"Top rated",bio:"Licensed master plumber. Serving Toronto since 2014."},
    {id:"v2",name:"AceElectric Pro",cat:"electrical",rating:4.8,reviews:97,response:"< 4h",price:"$110–$300",verified:true,jobs:201,badge:"Verified",bio:"ESA-certified electricians. Residential & commercial."},
    {id:"v3",name:"Cool Breeze HVAC",cat:"hvac",rating:4.7,reviews:86,response:"Same day",price:"$150–$400",verified:true,jobs:178,badge:"Verified",bio:"TECA-certified. Furnace, AC, heat pump specialists."},
    {id:"v4",name:"Spotless Clean Co.",cat:"cleaning",rating:4.9,reviews:211,response:"< 1h",price:"$80–$180",verified:true,jobs:445,badge:"Top rated",bio:"Move-in/out, deep clean, regular maintenance."},
    {id:"v5",name:"ApplianceMed",cat:"appliance",rating:4.6,reviews:67,response:"< 6h",price:"$75–$220",verified:true,jobs:134,badge:"Verified",bio:"All major brands. Washer, dryer, fridge, stove."},
    {id:"v6",name:"Premium Painters",cat:"painting",rating:4.8,reviews:54,response:"Next day",price:"$200–$800",verified:true,jobs:89,badge:"Verified",bio:"Interior & exterior. Turnover painting specialists."},
  ];

  const filtered=cat==="all"?vendors:vendors.filter(v=>v.cat===cat);

  return (
    <div style={pg}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 40px 80px"}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:36}}>
          <p style={lb}>Maintenance</p>
          <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TX,marginTop:8,lineHeight:1,letterSpacing:"-1px"}}>
            Vendor <em style={{fontStyle:"italic",color:G}}>Marketplace</em>
          </h1>
          <p style={{fontSize:14,color:MU,marginTop:8}}>Vetted, insured contractors — book directly from a maintenance ticket</p>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[{l:"Vetted Vendors",v:"48"},{l:"Avg Response",v:"< 3h"},{l:"Avg Rating",v:"4.8 ★"},{l:"Jobs Completed",v:"1,459"}].map((s,i)=>(
            <KCard key={s.l} delay={i*.07} style={{padding:"18px 20px"}}>
              <p style={lb}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:28,color:TX,marginTop:8,lineHeight:1}}>{s.v}</p>
            </KCard>
          ))}
        </div>

        {/* Category filter */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {categories.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{padding:"8px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:cat===c.id?TX:"#fff",color:cat===c.id?"#fff":MU,borderColor:cat===c.id?TX:BD,transition:"all .15s"}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Vendor grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {filtered.map((v,i)=>(
            <motion.div key={v.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}
              whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.09)"}}
              style={{...cd,padding:"20px 22px",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:G}}>
                    {v.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <p style={{fontSize:14,fontWeight:600,color:TX}}>{v.name}</p>
                      {v.badge==="Top rated"&&<Badge t="★ Top rated" c="amber"/>}
                      {v.badge==="Verified"&&<Badge t="✓ Verified" c="green"/>}
                    </div>
                    <p style={{fontSize:11,color:MU}}>{v.bio}</p>
                  </div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
                {[{l:"Rating",v:`${v.rating}★`},{l:"Reviews",v:String(v.reviews)},{l:"Response",v:v.response},{l:"Price",v:v.price}].map(s=>(
                  <div key={s.l} style={{background:BG,borderRadius:8,padding:"8px 6px",textAlign:"center"}}>
                    <p style={{fontSize:12,fontWeight:700,color:TX}}>{s.v}</p>
                    <p style={{fontSize:9,color:MU,marginTop:2}}>{s.l}</p>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setBooking(v.id)}
                  style={{flex:1,padding:"9px",background:G,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                  Book now
                </button>
                <button style={{padding:"9px 14px",border:`1px solid ${BD}`,borderRadius:8,background:"transparent",fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>
                  View profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking modal */}
        <AnimatePresence>
          {booking&&(()=>{
            const v=vendors.find(x=>x.id===booking)!;
            return (
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}}>
                <motion.div initial={{scale:.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.92,opacity:0}}
                  style={{background:"#fff",borderRadius:20,padding:32,width:440,maxHeight:"80vh",overflowY:"auto"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
                    <p style={{fontFamily:SERIF,fontSize:24,color:TX}}>Book {v.name}</p>
                    <button onClick={()=>setBooking(null)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={MU}/></button>
                  </div>
                  {[
                    {l:"Assign to maintenance request"},
                    {l:"Preferred date"},
                    {l:"Access instructions"},
                  ].map(f=>(
                    <div key={f.l} style={{marginBottom:14}}>
                      <p style={{...lb,marginBottom:7}}>{f.l}</p>
                      <input style={inp} placeholder={f.l.includes("request")?"Select maintenance ticket...":f.l.includes("date")?"Select date...":"e.g. Key under mat, call on arrival"}/>
                    </div>
                  ))}
                  <div style={{padding:"12px 14px",background:GL,borderRadius:9,marginBottom:16}}>
                    <p style={{fontSize:12,color:G,fontWeight:600,marginBottom:4}}>Estimated cost: {v.price}</p>
                    <p style={{fontSize:11,color:"#085040"}}>Final price confirmed by vendor before work begins</p>
                  </div>
                  <button onClick={()=>setBooking(null)} style={{width:"100%",padding:"13px",background:TX,color:"#fff",border:"none",borderRadius:10,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                    Confirm Booking →
                  </button>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4. RENT CREDIT BUILDING
// ═══════════════════════════════════════════════════════════════
export function RentCreditBuilding() {
  const [enrolled2, setEnrolled2]=useState(false);

  const history=[
    {month:"Mar 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+8"},
    {month:"Feb 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+7"},
    {month:"Jan 2026",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+9"},
    {month:"Dec 2025",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+6"},
    {month:"Nov 2025",amount:2300,status:"reported",bureau:"Equifax + TransUnion",points:"+8"},
  ];

  return (
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

        {/* Score simulator */}
        <KCard delay={.1} style={{padding:"28px",marginBottom:20,background:TX}}>
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

        {/* Benefits */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
          {[
            {icon:"🏠",title:"Buy a home sooner",desc:"A higher score means better mortgage rates and faster approval"},
            {icon:"💳",title:"Better credit cards",desc:"Qualify for premium cards with rewards, lower rates, and higher limits"},
            {icon:"🚗",title:"Lower loan rates",desc:"Save thousands on car loans and other financing over your lifetime"},
          ].map((b,i)=>(
            <KCard key={b.title} delay={.15+i*.07} style={{padding:"18px 20px"}}>
              <div style={{fontSize:24,marginBottom:10}}>{b.icon}</div>
              <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{b.title}</p>
              <p style={{fontSize:12,color:MU,lineHeight:1.55}}>{b.desc}</p>
            </KCard>
          ))}
        </div>

        {/* Reporting history */}
        {enrolled2&&(
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

        {/* CTA */}
        {!enrolled2?(
          <KCard style={{padding:"28px",textAlign:"center"}}>
            <p style={{fontFamily:SERIF,fontSize:26,color:TX,marginBottom:8}}>Start building credit today</p>
            <p style={{fontSize:14,color:MU,marginBottom:6}}>Free for all Kaya tenants · Setup takes 2 minutes</p>
            <p style={{fontSize:12,color:MU,marginBottom:24}}>Your landlord is automatically notified. No action required from them.</p>
            <button onClick={()=>setEnrolled2(true)}
              style={{padding:"14px 40px",background:G,color:"#fff",border:"none",borderRadius:12,fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}}>
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
