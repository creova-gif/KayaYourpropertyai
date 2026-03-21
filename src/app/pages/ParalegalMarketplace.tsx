import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, Star, MapPin, CheckCircle2, Clock, Phone, MessageSquare, Filter, Search, Award, TrendingUp, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

interface Paralegal{
  id:string;name:string;firm:string;city:string;rating:number;reviews:number;
  successRate:number;hearingsHandled:number;perHearingFee:number;consultFee:number;
  specialties:string[];bio:string;languages:string[];availability:"available"|"limited"|"waitlist";
  badge?:string;photo:string;responseTime:string;
}

const PARALEGALS:Paralegal[]=[
  {
    id:"p1",name:"Maria Santos",firm:"Santos Tenant & Landlord Services",city:"Toronto, ON",
    rating:4.9,reviews:312,successRate:94,hearingsHandled:847,perHearingFee:185,consultFee:75,
    specialties:["L1/L2 Evictions","Rent Arrears","N4 Preparation","LTB Hearings"],
    bio:"10+ years exclusively in LTB matters. Former legal clinic advocate now representing Ontario landlords. Fluent in English, Portuguese, and Spanish.",
    languages:["English","Portuguese","Spanish"],availability:"available",
    badge:"Top Rated",photo:"MS",responseTime:"Usually responds in 2 hours"
  },
  {
    id:"p2",name:"David Kim",firm:"Kim & Associates Paralegal",city:"Mississauga, ON",
    rating:4.7,reviews:198,successRate:91,hearingsHandled:524,perHearingFee:165,consultFee:60,
    specialties:["N12 Own Use","AGI Applications","Rent Arrears","Commercial Tenancy"],
    bio:"Specialized in above-guideline rent increases and own-use evictions. Former property manager who became a licensed paralegal — understands both sides.",
    languages:["English","Korean"],availability:"limited",
    badge:undefined,photo:"DK",responseTime:"Usually responds within 4 hours"
  },
  {
    id:"p3",name:"Aisha Thompson",firm:"Thompson Legal Services",city:"Ottawa, ON",
    rating:4.8,reviews:241,successRate:92,hearingsHandled:631,perHearingFee:175,consultFee:65,
    specialties:["L1/L2 Evictions","Damage Claims","N5 Notices","Arrears + Enforcement"],
    bio:"Bilingual EN/FR paralegal based in Ottawa with extensive LTB experience. Excellent with complex multi-issue applications and tenant damage claims.",
    languages:["English","French"],availability:"available",
    badge:"Bilingual",photo:"AT",responseTime:"Usually responds in 1 hour"
  },
  {
    id:"p4",name:"Raj Patel",firm:"Patel Property Law Group",city:"Brampton, ON",
    rating:4.6,reviews:156,successRate:89,hearingsHandled:389,perHearingFee:150,consultFee:50,
    specialties:["N4/L1 Non-payment","Small Landlord Support","Document Prep","Mediation"],
    bio:"Affordable services for small landlords (1–5 units). Fixed-fee pricing with no surprise billings. Kaya partner since 2024.",
    languages:["English","Hindi","Gujarati","Punjabi"],availability:"available",
    badge:"Budget Friendly",photo:"RP",responseTime:"Usually responds in 3 hours"
  },
  {
    id:"p5",name:"Christine Leblanc",firm:"Leblanc Droit Immobilier",city:"Hamilton, ON",
    rating:4.5,reviews:89,successRate:88,hearingsHandled:201,perHearingFee:160,consultFee:70,
    specialties:["AGI Applications","Rent Control Exemptions","N13 Renovations","Appeals"],
    bio:"Specialist in above-guideline rent increase applications and capital expenditure cases. Highly experienced with LTB appeals.",
    languages:["English","French"],availability:"waitlist",
    badge:undefined,photo:"CL",responseTime:"3–5 business days"
  },
];

const STATUS_CONFIG:{[k:string]:{label:string;color:string;bg:string}}={
  available:{label:"Available Now",color:G,bg:GL},
  limited:{label:"Limited Availability",color:"#B45309",bg:"#FEF3C7"},
  waitlist:{label:"Waitlist",color:"#C0392B",bg:"#FDECEA"},
};

function StarRating({rating,count}:{rating:number;count:number}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={12} fill={i<=Math.round(rating)?"#F59E0B":"none"} color="#F59E0B"/>
      ))}
      <span style={{fontSize:12,fontWeight:600,color:TX,marginLeft:2}}>{rating.toFixed(1)}</span>
      <span style={{fontSize:11,color:MU}}>({count} reviews)</span>
    </div>
  );
}

function Avatar({initials}:{initials:string}){
  return(
    <div style={{width:52,height:52,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:G,flexShrink:0}}>
      {initials}
    </div>
  );
}

export default function ParalegalMarketplace(){
  const [searchQ,setSearchQ]=useState("");
  const [cityFilter,setCityFilter]=useState("All");
  const [activeP,setActiveP]=useState<string|null>(null);
  const [bookingP,setBookingP]=useState<Paralegal|null>(null);

  const cities=["All",...Array.from(new Set(PARALEGALS.map(p=>p.city.split(",")[0])))];
  const filtered=PARALEGALS.filter(p=>{
    const matchQ=searchQ===""||p.name.toLowerCase().includes(searchQ.toLowerCase())||p.specialties.some(s=>s.toLowerCase().includes(searchQ.toLowerCase()));
    const matchCity=cityFilter==="All"||p.city.startsWith(cityFilter);
    return matchQ&&matchCity;
  });

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Scale size={22} color={G}/>
            </div>
            <div>
              <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>Paralegal Marketplace</h1>
              <p style={{fontSize:14,color:MU,margin:0}}>Ontario-licensed paralegals specializing in LTB hearings — from $150/session</p>
            </div>
          </div>

          <div style={{background:"#EBF2FB",border:"1px solid #BFDBFE",borderRadius:12,padding:"13px 18px",display:"flex",gap:10,marginTop:12}}>
            <Award size={15} color="#1E5FA8" style={{flexShrink:0,marginTop:1}}/>
            <span style={{fontSize:13,color:"#1E5FA8"}}>All paralegals are licensed by the Law Society of Ontario (LSO). Kaya verifies credentials annually and monitors client satisfaction scores.</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Avg. Hearing Fee",value:"$168",icon:"💼",color:G},
            {label:"Avg. Success Rate",color:"#059669",value:"91%",icon:"✅"},
            {label:"Median Response Time",value:"2 hrs",icon:"⚡",color:"#1E5FA8"},
            {label:"Hearings Handled",value:"2,591",icon:"⚖️",color:"#7C3AED"},
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{...cd,padding:"16px 18px"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
              <div style={{fontSize:12,color:MU,marginTop:2}}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{display:"flex",gap:12,marginBottom:20}}>
          <div style={{flex:1,position:"relative"}}>
            <Search size={15} color={MU} style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}/>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search by name or specialty…"
              style={{width:"100%",padding:"10px 14px 10px 38px",border:`1px solid ${BD}`,borderRadius:10,fontSize:13,color:TX,fontFamily:SANS,outline:"none",background:"#fff",boxSizing:"border-box"}}/>
          </div>
          <select value={cityFilter} onChange={e=>setCityFilter(e.target.value)}
            style={{padding:"10px 14px",border:`1px solid ${BD}`,borderRadius:10,fontSize:13,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
            {cities.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Paralegal cards */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {filtered.map((p,i)=>{
            const st=STATUS_CONFIG[p.availability];
            const isOpen=activeP===p.id;
            return(
              <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                <div style={{...cd,overflow:"hidden",border:`1.5px solid ${isOpen?G:BD}`}}>
                  <div style={{padding:"20px 22px",display:"grid",gridTemplateColumns:"auto 1fr auto",gap:16,alignItems:"flex-start"}}>
                    <Avatar initials={p.photo}/>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                        <span style={{fontSize:15,fontWeight:700,color:TX}}>{p.name}</span>
                        {p.badge&&<span style={{background:GL,color:G,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>{p.badge}</span>}
                        <span style={{background:st.bg,color:st.color,fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:20}}>{st.label}</span>
                      </div>
                      <div style={{fontSize:12,color:MU,marginBottom:5}}>{p.firm} · {p.city}</div>
                      <StarRating rating={p.rating} count={p.reviews}/>
                      <div style={{display:"flex",gap:12,marginTop:6}}>
                        <span style={{fontSize:12,color:MU}}>✅ {p.successRate}% success rate</span>
                        <span style={{fontSize:12,color:MU}}>⚖️ {p.hearingsHandled} hearings</span>
                        <span style={{fontSize:12,color:MU}}>⏱️ {p.responseTime}</span>
                      </div>
                      <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                        {p.specialties.slice(0,3).map(s=>(
                          <span key={s} style={{background:BG,border:`1px solid ${BD}`,borderRadius:20,padding:"3px 10px",fontSize:11,color:MU}}>{s}</span>
                        ))}
                        {p.specialties.length>3&&<span style={{fontSize:11,color:MU}}>+{p.specialties.length-3} more</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",minWidth:130}}>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:11,color:MU}}>Per hearing</div>
                        <div style={{fontSize:22,fontWeight:700,color:G,fontFamily:SERIF}}>${p.perHearingFee}</div>
                      </div>
                      <button onClick={()=>setBookingP(p)}
                        style={{padding:"9px 18px",background:p.availability==="waitlist"?BG:G,color:p.availability==="waitlist"?MU:"#fff",borderRadius:9,border:`1px solid ${p.availability==="waitlist"?BD:G}`,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                        {p.availability==="waitlist"?"Join Waitlist":"Book Now"}
                      </button>
                      <button onClick={()=>setActiveP(isOpen?null:p.id)}
                        style={{padding:"7px 14px",background:"transparent",color:MU,borderRadius:8,border:`1px solid ${BD}`,fontSize:12,cursor:"pointer"}}>
                        {isOpen?"Hide":"View Profile"}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                        transition={{duration:.25}} style={{overflow:"hidden"}}>
                        <div style={{padding:"0 22px 20px",borderTop:`1px solid ${BD}`}}>
                          <p style={{fontSize:13,color:TX,margin:"14px 0",lineHeight:1.6}}>{p.bio}</p>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
                            {[
                              {label:"Free Consultation",value:p.consultFee===0?"Free":`$${p.consultFee}`,icon:"📞"},
                              {label:"Per LTB Hearing",value:`$${p.perHearingFee}`,icon:"⚖️"},
                              {label:"Languages",value:p.languages.join(", "),icon:"🌐"},
                            ].map(m=>(
                              <div key={m.label} style={{background:BG,borderRadius:9,padding:"12px 14px"}}>
                                <div style={{fontSize:18,marginBottom:4}}>{m.icon}</div>
                                <div style={{fontSize:13,fontWeight:700,color:TX}}>{m.value}</div>
                                <div style={{fontSize:11,color:MU}}>{m.label}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>setBookingP(p)}
                              style={{padding:"9px 18px",background:G,color:"#fff",borderRadius:9,border:"none",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                              Book a Consultation
                            </button>
                            <button onClick={()=>toast.info("Message sent",{description:`Your inquiry has been sent to ${p.name}. You'll receive a reply via the Kaya messaging centre within 24 hours.`})} style={{padding:"9px 14px",background:"#fff",color:MU,borderRadius:9,border:`1px solid ${BD}`,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                              <MessageSquare size={13}/> Message
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How it works */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.5}}
          style={{...cd,padding:28,marginTop:32}}>
          <h3 style={{fontSize:18,fontWeight:700,color:TX,margin:"0 0 4px",fontFamily:SERIF}}>How Kaya's Paralegal Marketplace Works</h3>
          <p style={{fontSize:13,color:MU,margin:"0 0 20px"}}>We connect you with qualified, vetted Ontario paralegals — no cold calls, no searching.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
            {[
              {step:"01",title:"Select a Paralegal",desc:"Browse profiles, specialties, success rates, and pricing."},
              {step:"02",title:"Book a Consultation",desc:"Typically $50–$75 for 30–45 minutes. Discuss your situation."},
              {step:"03",title:"Share Your Kaya Case File",desc:"One click exports your rent ledger, notices, and LTB timeline."},
              {step:"04",title:"Win Your Hearing",desc:"Your paralegal appears and advocates at the LTB on your behalf."},
            ].map(s=>(
              <div key={s.step} style={{background:BG,borderRadius:10,padding:"16px"}}>
                <div style={{fontSize:22,fontWeight:800,color:G,fontFamily:SERIF,marginBottom:8}}>{s.step}</div>
                <div style={{fontSize:13,fontWeight:700,color:TX,marginBottom:4}}>{s.title}</div>
                <div style={{fontSize:12,color:MU,lineHeight:1.5}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {bookingP&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}
            onClick={()=>setBookingP(null)}>
            <motion.div initial={{scale:.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.95,opacity:0}}
              style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:480}}
              onClick={e=>e.stopPropagation()}>
              <div style={{padding:"24px 28px",borderBottom:`1px solid ${BD}`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>
                    <h2 style={{fontSize:18,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>Book with {bookingP.name}</h2>
                    <p style={{fontSize:13,color:MU,marginTop:4}}>{bookingP.firm}</p>
                  </div>
                  <button onClick={()=>setBookingP(null)} style={{background:"none",border:"none",cursor:"pointer",color:MU,fontSize:18}}>✕</button>
                </div>
              </div>
              <div style={{padding:"24px 28px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                  {[
                    {label:"Consultation",fee:`$${bookingP.consultFee}`,selected:true},
                    {label:"Full Representation",fee:`$${bookingP.perHearingFee}/hearing`,selected:false},
                  ].map(o=>(
                    <div key={o.label} style={{border:`2px solid ${o.selected?G:BD}`,borderRadius:10,padding:"12px",background:o.selected?GL:"#fff",cursor:"pointer"}}>
                      <div style={{fontSize:13,fontWeight:600,color:TX}}>{o.label}</div>
                      <div style={{fontSize:16,fontWeight:700,color:G,marginTop:4}}>{o.fee}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {[
                    {label:"Your Name",placeholder:"Full name"},
                    {label:"Email Address",placeholder:"you@example.com"},
                    {label:"Phone Number",placeholder:"416-555-0123"},
                  ].map(f=>(
                    <div key={f.label}>
                      <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.4px"}}>{f.label}</label>
                      <input placeholder={f.placeholder}
                        style={{width:"100%",padding:"10px 13px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,outline:"none",boxSizing:"border-box"}}/>
                    </div>
                  ))}
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.4px"}}>Brief Description</label>
                    <textarea placeholder="What is the issue? (e.g. non-payment, own use, damage)" rows={3}
                      style={{width:"100%",padding:"10px 13px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,outline:"none",resize:"none",boxSizing:"border-box"}}/>
                  </div>
                </div>
                <button onClick={()=>{toast.success("Booking request submitted!",{description:`${bookingP?.name} will confirm your consultation time within 24 hours. Check your Kaya inbox for next steps.`});setBookingP(null)}} style={{width:"100%",padding:"12px",background:G,color:"#fff",borderRadius:10,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:16}}>
                  Request Booking
                </button>
                <p style={{fontSize:11,color:MU,textAlign:"center",marginTop:8}}>Kaya takes a 10% platform fee from the paralegal's session fee — no extra charge to you.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
