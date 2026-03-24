import { useState } from "react";
import { toast } from "sonner";
import { CMHC_RENTAL_DATA } from "../utils/canadianHousingData";
import { PublicNav } from "../components/PublicNav";
import { Home, Building2, Building, Layers, Briefcase, ShoppingBag, Warehouse, GraduationCap, Laptop, Lock } from "lucide-react";

type LIcon=React.ComponentType<{size?:number;color?:string}>;
const TYPE_ICON:Record<string,LIcon>={
  condo:Building2,apartment:Home,townhouse:Building,house:Home,
  office:Briefcase,retail:ShoppingBag,warehouse:Warehouse,
  "mixed-use":Layers,flex:Laptop,
};
function getListingIcon(type:string):LIcon{return TYPE_ICON[type]||Building2;}

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

function Badge({t,c="green"}:{t:string,c?:string}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],blue:["#EBF2FB","#1E5FA8"],gray:[BG,MU],purple:["#F3F0FF","#6D28D9"]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{t}</span>;
}

// ─── Residential Listings ────────────────────────────────────────────────────
const residentialListings=[
  {id:1,title:"Modern 2BR Downtown Condo",addr:"123 King St W, Toronto, ON",city:"Toronto",beds:2,baths:1,sqft:975,rent:2400,img:"🏢",verified:true,avail:"Apr 1",tags:["Parking","Laundry","Gym"],landlord:"John M.",resp:"< 1h",tours:3,type:"condo"},
  {id:2,title:"Bright 1BR Queen West Studio",addr:"456 Queen St W, Toronto, ON",city:"Toronto",beds:1,baths:1,sqft:620,rent:1950,img:"🏠",verified:true,avail:"Apr 15",tags:["Pet Friendly","Balcony","Transit"],landlord:"Sarah K.",resp:"< 2h",tours:1,type:"apartment"},
  {id:3,title:"Spacious 3BR Annex Townhouse",addr:"789 Bloor St W, Toronto, ON",city:"Toronto",beds:3,baths:2,sqft:1400,rent:3800,img:"🏡",verified:true,avail:"May 1",tags:["Backyard","Parking","Storage"],landlord:"Mike P.",resp:"< 4h",tours:5,type:"townhouse"},
  {id:4,title:"Cozy 1BR Liberty Village",addr:"88 East Liberty St, Toronto, ON",city:"Toronto",beds:1,baths:1,sqft:540,rent:1800,img:"🏗",verified:false,avail:"Immediate",tags:["Rooftop","Gym","Concierge"],landlord:"Ava R.",resp:"< 6h",tours:2,type:"condo"},
  {id:5,title:"Luxury 2BR Yorkville Suite",addr:"4 Ava Rd, Toronto, ON",city:"Toronto",beds:2,baths:2,sqft:1100,rent:3400,img:"🌆",verified:true,avail:"Apr 1",tags:["Pool","Valet","Doorman"],landlord:"David L.",resp:"< 30m",tours:8,type:"condo"},
  {id:6,title:"New 2BR Etobicoke Build",addr:"300 Bloor W, Etobicoke, ON",city:"Etobicoke",beds:2,baths:1,sqft:900,rent:2200,img:"🏙",verified:true,avail:"Apr 15",tags:["Parking","Laundry","Near Transit"],landlord:"Emma T.",resp:"< 3h",tours:0,type:"apartment"},
  {id:7,title:"Sun-Filled 2BR Ottawa Condo",addr:"150 Rideau St, Ottawa, ON",city:"Ottawa",beds:2,baths:1,sqft:850,rent:1850,img:"🏛",verified:true,avail:"Apr 1",tags:["Balcony","In-suite Laundry","Hardwood"],landlord:"Marie G.",resp:"< 2h",tours:4,type:"condo"},
  {id:8,title:"Spacious 3BR Family Home",addr:"45 Hamilton Ave, Hamilton, ON",city:"Hamilton",beds:3,baths:2,sqft:1600,rent:2100,img:"🏘",verified:true,avail:"May 15",tags:["Garage","Backyard","Quiet Street"],landlord:"Tom B.",resp:"< 5h",tours:2,type:"house"},
  {id:9,title:"Modern 1BR Kitchener Loft",addr:"30 Duke St W, Kitchener, ON",city:"Kitchener",beds:1,baths:1,sqft:700,rent:1700,img:"🏭",verified:true,avail:"Immediate",tags:["Open Concept","Exposed Brick","Transit"],landlord:"Nina R.",resp:"< 1h",tours:6,type:"apartment"},
  {id:10,title:"Luxury Studio Near U of T",addr:"220 Bloor St E, Toronto, ON",city:"Toronto",beds:0,baths:1,sqft:420,rent:1500,img:"🎓",verified:true,avail:"Sep 1",tags:["All-inclusive","Furnished","Security"],landlord:"Campus Prop.",resp:"< 1h",tours:12,type:"apartment"},
  {id:11,title:"4BR London Detached House",addr:"55 Wonderland Rd, London, ON",city:"London",beds:4,baths:2,sqft:2200,rent:2600,img:"🏠",verified:false,avail:"June 1",tags:["Garage","Driveway","Near Schools"],landlord:"Robert S.",resp:"< 8h",tours:1,type:"house"},
  {id:12,title:"Renovated 2BR Windsor Unit",addr:"900 Riverside Dr E, Windsor, ON",city:"Windsor",beds:2,baths:1,sqft:1000,rent:1300,img:"🌅",verified:true,avail:"Apr 15",tags:["River View","Parking","Laundry"],landlord:"Sandra M.",resp:"< 3h",tours:3,type:"apartment"},
];

// ─── Commercial Listings ─────────────────────────────────────────────────────
const commercialListings=[
  {id:101,title:"Class A Office Suite — 3,200 sqft",addr:"123 King St W, Toronto, ON",city:"Toronto",sqft:3200,pricePerSqft:30,monthly:8000,img:"🏢",verified:true,avail:"Immediate",tags:["24/7 Security","EV Parking","Gym","Conference Rooms"],broker:"CBRE Toronto",resp:"< 1h",type:"office",class:"A",leaseType:"NNN",zoning:"Commercial",term:"3–10 yr"},
  {id:102,title:"Downtown Retail Flagship — 2,100 sqft",addr:"900 Yonge St, Toronto, ON",city:"Toronto",sqft:2100,pricePerSqft:45,monthly:7875,img:"🏪",verified:true,avail:"May 1",tags:["Corner Unit","High Foot Traffic","Signage Rights","HVAC"],broker:"Colliers",resp:"< 2h",type:"retail",class:"A",leaseType:"Gross",zoning:"Retail Corridor",term:"5 yr min"},
  {id:103,title:"Industrial Warehouse Bay — 18,000 sqft",addr:"890 Queensway E, Mississauga, ON",city:"Mississauga",sqft:18000,pricePerSqft:15,monthly:22500,img:"🏭",verified:true,avail:"Apr 2026",tags:["Dock-Level Loading","3-Phase Power","Drive-In Door","Sprinklers"],broker:"Avison Young",resp:"< 3h",type:"warehouse",class:"B",leaseType:"NNN",zoning:"Industrial M1",term:"3–7 yr"},
  {id:104,title:"Mixed-Use Ground Floor — 1,800 sqft",addr:"45 Bloor St E, Toronto, ON",city:"Toronto",sqft:1800,pricePerSqft:38,monthly:5700,img:"🛍",verified:true,avail:"Immediate",tags:["Live/Work Eligible","Street Frontage","Patio Rights","High Visibility"],broker:"Cushman & Wakefield",resp:"< 1h",type:"mixed-use",class:"B",leaseType:"Modified Gross",zoning:"Mixed-Use CR",term:"Flexible"},
  {id:105,title:"Medical Office Suite — 2,500 sqft",addr:"150 Elgin St, Ottawa, ON",city:"Ottawa",sqft:2500,pricePerSqft:28,monthly:5833,img:"🏥",verified:true,avail:"Jun 1",tags:["Accessible Entrance","Exam Rooms","Waiting Area","Lab-Ready"],broker:"JLL Ottawa",resp:"< 2h",type:"office",class:"B",leaseType:"NNN",zoning:"Institutional",term:"5 yr min"},
  {id:106,title:"Tech Campus Flex Space — 6,000 sqft",addr:"175 Longwood Rd S, Hamilton, ON",city:"Hamilton",sqft:6000,pricePerSqft:22,monthly:11000,img:"💻",verified:false,avail:"Immediate",tags:["Open Plan","Server Room","Fibre Internet","Bike Storage"],broker:"RE/MAX Commercial",resp:"< 4h",type:"flex",class:"B",leaseType:"Gross",zoning:"Commercial",term:"2–5 yr"},
  {id:107,title:"Prestige Class A Office — 9,500 sqft",addr:"200 Bay St, Toronto, ON",city:"Toronto",sqft:9500,pricePerSqft:55,monthly:43542,img:"🌆",verified:true,avail:"Jul 1",tags:["Bay St Address","Full Floor","Panoramic Views","Concierge"],broker:"CBRE Toronto",resp:"< 30m",type:"office",class:"A",leaseType:"NNN",zoning:"Financial District",term:"5–15 yr"},
  {id:108,title:"Kitchener Innovation Hub — 4,200 sqft",addr:"30 Duke St W, Kitchener, ON",city:"Kitchener",sqft:4200,pricePerSqft:24,monthly:8400,img:"🔬",verified:true,avail:"Immediate",tags:["Lab-Ready","Meeting Rooms","Secure Keycard","Fibre"],broker:"Avison Young",resp:"< 2h",type:"office",class:"B",leaseType:"Modified Gross",zoning:"Innovation District",term:"1–5 yr"},
  {id:109,title:"Retail Strip Plaza — 3 Units Available",addr:"400 Dundas St W, London, ON",city:"London",sqft:1200,pricePerSqft:20,monthly:2000,img:"🏬",verified:true,avail:"Immediate",tags:["End Cap Available","Pylon Signage","Ample Parking","Anchor Tenant"],broker:"Colliers London",resp:"< 3h",type:"retail",class:"C",leaseType:"Gross",zoning:"Retail",term:"1–5 yr"},
  {id:110,title:"Cold Storage Facility — 12,000 sqft",addr:"660 Alness St, North York, ON",city:"North York",sqft:12000,pricePerSqft:18,monthly:18000,img:"❄️",verified:true,avail:"May 15",tags:["Cold/Freezer Rooms","-18°C Capable","Loading Dock","24/7 Access"],broker:"Cushman & Wakefield",resp:"< 4h",type:"warehouse",class:"B",leaseType:"NNN",zoning:"Industrial M2",term:"3–5 yr"},
];

type ResListing = typeof residentialListings[0];
type CommListing = typeof commercialListings[0];

// ─── Residential Modals ──────────────────────────────────────────────────────
function TourModal({l,onClose}:{l:ResListing,onClose:()=>void}){
  const [date,setDate]=useState("");
  const [time,setTime]=useState("10:00");
  const [name,setName]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const submit=()=>{
    if(!date||!name){toast.error("Please fill in all fields");return;}
    setSubmitted(true);
    setTimeout(()=>{onClose();toast.success("Tour booked!",{description:`Your tour for ${l.title} on ${date} at ${time} has been confirmed. ${l.landlord} will email you a confirmation shortly.`});},1000);
  };
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <h3 style={{fontFamily:SERIF,fontSize:22,color:TX,margin:"0 0 4px"}}>Book a Tour</h3>
        <p style={{fontSize:13,color:MU,margin:"0 0 20px"}}>{l.title}</p>
        {!submitted?(
          <>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Your Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{...inp}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Date</label>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} style={{...inp}}/>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Time</label>
                <select value={time} onChange={e=>setTime(e.target.value)} style={{...inp}}>
                  {["9:00","10:00","11:00","13:00","14:00","15:00","16:00"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button onClick={onClose} style={{flex:1,padding:"11px",background:BG,border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",color:MU}}>Cancel</button>
              <button onClick={submit} style={{flex:2,padding:"11px",background:G,border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",color:"#fff"}}>Confirm Tour</button>
            </div>
          </>
        ):(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:36,marginBottom:12}}>✅</div>
            <p style={{fontFamily:SERIF,fontSize:18,color:G}}>Booking confirmed!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ApplyModal({l,onClose}:{l:ResListing,onClose:()=>void}){
  const [income,setIncome]=useState("");
  const [msg,setMsg]=useState("");
  const submit=()=>{
    if(!income){toast.error("Please enter your annual income");return;}
    onClose();
    toast.success("Application submitted!",{description:`Your application for ${l.title} has been sent to ${l.landlord}. Kaya's AI will pre-screen it and notify you within 24 hours.`});
  };
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:440,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontFamily:SERIF,fontSize:22,color:TX,margin:0}}>Apply Now</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:MU}}>✕</button>
        </div>
        <div style={{background:BG,borderRadius:12,padding:"12px 16px",marginBottom:20}}>
          <p style={{fontSize:13,fontWeight:600,color:TX,margin:"0 0 2px"}}>{l.title}</p>
          <p style={{fontSize:12,color:MU,margin:0}}>{l.addr} · ${l.rent.toLocaleString()}/mo</p>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Annual Household Income (CAD)</label>
          <input value={income} onChange={e=>setIncome(e.target.value)} type="number" placeholder="e.g. 75000" style={{...inp}}/>
          <p style={{fontSize:11,color:MU,marginTop:4}}>Income is pre-verified by Kaya AI — no documents needed at this stage.</p>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Message to Landlord (optional)</label>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={3} placeholder="Tell the landlord about yourself..." style={{...inp,resize:"none"}}/>
        </div>
        <div style={{background:GL,borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}>
          <Lock size={16} color={G}/>
          <p style={{fontSize:12,color:G,margin:0}}>Your personal data is shared only with this landlord and is protected under PIPEDA. Kaya never stores your SIN.</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,padding:"11px",background:BG,border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",color:MU}}>Cancel</button>
          <button onClick={submit} style={{flex:2,padding:"11px",background:TX,border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",color:"#fff"}}>Submit Application</button>
        </div>
      </div>
    </div>
  );
}

// ─── Commercial Inquiry Modal ────────────────────────────────────────────────
function CommercialInquiryModal({l,onClose}:{l:CommListing,onClose:()=>void}){
  const [step,setStep]=useState(1);
  const [company,setCompany]=useState("");
  const [contact,setContact]=useState("");
  const [email,setEmail]=useState("");
  const [size,setSize]=useState("");
  const [timeline,setTimeline]=useState("0–3 months");
  const [submitted,setSubmitted]=useState(false);
  const submit=()=>{
    if(!company||!contact||!email){toast.error("Please complete all required fields");return;}
    setSubmitted(true);
  };
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:460,boxShadow:"0 20px 60px rgba(0,0,0,0.2)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontFamily:SERIF,fontSize:22,color:TX,margin:0}}>Commercial Inquiry</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:MU}}>✕</button>
        </div>
        {!submitted?(
          <>
            <div style={{background:BG,borderRadius:12,padding:"12px 16px",marginBottom:20}}>
              <p style={{fontSize:13,fontWeight:600,color:TX,margin:"0 0 2px"}}>{l.title}</p>
              <p style={{fontSize:12,color:MU,margin:0}}>{l.addr} · {l.sqft.toLocaleString()} sqft · ${l.monthly.toLocaleString()}/mo</p>
            </div>
            {step===1&&(
              <>
                {[{label:"Company / Business Name *",val:company,set:setCompany,ph:"Maple Tech Inc."},{label:"Contact Person *",val:contact,set:setContact,ph:"Jane Smith"},{label:"Business Email *",val:email,set:setEmail,ph:"jane@company.com"}].map(f=>(
                  <div key={f.label} style={{marginBottom:14}}>
                    <label style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:5}}>{f.label}</label>
                    <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={inp}/>
                  </div>
                ))}
                <div style={{display:"flex",gap:8,marginTop:4}}>
                  <button onClick={onClose} style={{flex:1,padding:"11px",background:BG,border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",color:MU}}>Cancel</button>
                  <button onClick={()=>{if(!company||!contact||!email){toast.error("Fill in all required fields");return;}setStep(2);}} style={{flex:2,padding:"11px",background:TX,border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",color:"#fff"}}>Next →</button>
                </div>
              </>
            )}
            {step===2&&(
              <>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:5}}>Team / Headcount</label>
                  <select value={size} onChange={e=>setSize(e.target.value)} style={inp}>
                    <option value="">Select size</option>
                    {["1–5","6–20","21–50","51–100","100–250","250+"].map(s=><option key={s}>{s} people</option>)}
                  </select>
                </div>
                <div style={{marginBottom:18}}>
                  <label style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:5}}>Desired Move-in</label>
                  <select value={timeline} onChange={e=>setTimeline(e.target.value)} style={inp}>
                    {["0–3 months","3–6 months","6–12 months","Flexible"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{background:"#EBF2FB",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <Building2 size={16} color="#1E5FA8"/>
                  <p style={{fontSize:12,color:"#1E5FA8",margin:0}}>A licensed commercial broker from {l.broker} will reach out within 1 business day to arrange a private showing.</p>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setStep(1)} style={{flex:1,padding:"11px",background:BG,border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",color:MU}}>Back</button>
                  <button onClick={submit} style={{flex:2,padding:"11px",background:G,border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",color:"#fff"}}>Send Inquiry</button>
                </div>
              </>
            )}
          </>
        ):(
          <div style={{textAlign:"center",padding:"28px 0"}}>
            <div style={{fontSize:44,marginBottom:14}}>✅</div>
            <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:6}}>Inquiry Submitted!</p>
            <p style={{fontSize:13,color:MU,marginBottom:20}}>{l.broker} will contact you within 1 business day to arrange a private viewing.</p>
            <button onClick={onClose} style={{padding:"10px 28px",background:G,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function PublicSearch(){
  const [mode,setMode]=useState<"residential"|"commercial">("residential");

  // Residential state
  const [search,setSearch]=useState("");
  const [bedF,setBedF]=useState("any");
  const [maxRent,setMaxRent]=useState(5000);
  const [saved,setSaved]=useState<number[]>([]);
  const [sort,setSort]=useState<"price_asc"|"price_desc"|"newest">("price_asc");
  const [typeF,setTypeF]=useState("all");
  const [tourListing,setTourListing]=useState<ResListing|null>(null);
  const [applyListing,setApplyListing]=useState<ResListing|null>(null);
  const [cityF,setCityF]=useState("");

  // Commercial state
  const [commSearch,setCommSearch]=useState("");
  const [commType,setCommType]=useState("all");
  const [commClass,setCommClass]=useState("all");
  const [commMaxSqft,setCommMaxSqft]=useState(20000);
  const [commSort,setCommSort]=useState<"price_asc"|"price_desc"|"sqft_asc"|"sqft_desc">("price_asc");
  const [inquiryListing,setInquiryListing]=useState<CommListing|null>(null);
  const [savedComm,setSavedComm]=useState<number[]>([]);

  const filtered=residentialListings.filter(l=>{
    const q=(search||cityF).toLowerCase();
    const matchQ=!q||l.title.toLowerCase().includes(q)||l.addr.toLowerCase().includes(q)||l.city.toLowerCase().includes(q)||l.tags.some(t=>t.toLowerCase().includes(q));
    const matchB=bedF==="any"||(bedF==="0"&&l.beds===0)||l.beds===parseInt(bedF)||(bedF==="3+"&&l.beds>=3);
    const matchR=l.rent<=maxRent;
    const matchT=typeF==="all"||l.type===typeF;
    return matchQ&&matchB&&matchR&&matchT;
  }).sort((a,b)=>{
    if(sort==="price_asc")return a.rent-b.rent;
    if(sort==="price_desc")return b.rent-a.rent;
    return b.tours-a.tours;
  });

  const filteredComm=commercialListings.filter(l=>{
    const q=commSearch.toLowerCase();
    const matchQ=!q||l.title.toLowerCase().includes(q)||l.addr.toLowerCase().includes(q)||l.city.toLowerCase().includes(q)||l.tags.some(t=>t.toLowerCase().includes(q));
    const matchT=commType==="all"||l.type===commType;
    const matchC=commClass==="all"||l.class===commClass;
    const matchS=l.sqft<=commMaxSqft;
    return matchQ&&matchT&&matchC&&matchS;
  }).sort((a,b)=>{
    if(commSort==="price_asc")return a.monthly-b.monthly;
    if(commSort==="price_desc")return b.monthly-a.monthly;
    if(commSort==="sqft_asc")return a.sqft-b.sqft;
    return b.sqft-a.sqft;
  });

  const torontoCMHC=CMHC_RENTAL_DATA.find(c=>c.city==="Toronto");
  const COMM_CITIES=["Toronto","Mississauga","Ottawa","Hamilton","Kitchener","London","North York"];

  const COMM_ICON:{[k:string]:LIcon}={office:Briefcase,retail:ShoppingBag,warehouse:Warehouse,"mixed-use":Layers,flex:Laptop};
  const CLASS_CONFIG:{[k:string]:{bg:string,color:string}}={A:{bg:GL,color:G},B:{bg:"#EBF2FB",color:"#1E5FA8"},C:{bg:"#F3F0FF",color:"#6D28D9"}};

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <PublicNav />

      {/* Hero */}
      <div style={{background:TX,padding:"114px 40px 44px",textAlign:"center"}}>
        {/* Mode toggle */}
        <div style={{display:"inline-flex",background:"rgba(255,255,255,.1)",borderRadius:12,padding:4,marginBottom:28,gap:4}}>
          {[{id:"residential",label:"Residential"},{ id:"commercial",label:"Commercial"}].map(m=>(
            <button key={m.id} onClick={()=>{setMode(m.id as typeof mode);setCommSearch("");setSearch("");}} style={{padding:"9px 22px",background:mode===m.id?"#fff":"transparent",color:mode===m.id?TX:"rgba(255,255,255,.7)",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s",fontFamily:SANS}}>
              {m.label}
            </button>
          ))}
        </div>

        {mode==="residential"?(
          <>
            <p style={{fontFamily:SERIF,fontSize:52,color:"#fff",lineHeight:1,letterSpacing:"-1.5px",marginBottom:10}}>Find your <em style={{color:G,fontStyle:"italic"}}>perfect home.</em></p>
            <p style={{fontSize:14,color:"rgba(255,255,255,.45)",marginBottom:28}}>{residentialListings.length}+ verified listings across Ontario · Zero scam guarantee</p>
            <div style={{maxWidth:700,margin:"0 auto",display:"flex",gap:8,flexWrap:"wrap"}}>
              <input
                style={{flex:"1",minWidth:220,padding:"13px 18px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:SANS,fontSize:13,outline:"none"}}
                placeholder="City, neighbourhood, or address..."
                value={search} onChange={e=>setSearch(e.target.value)}
              />
              <select style={{padding:"13px 14px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.85)",fontFamily:SANS,fontSize:13,outline:"none"}} value={bedF} onChange={e=>setBedF(e.target.value)}>
                <option value="any">Any beds</option>
                <option value="0">Studio</option>
                <option value="1">1 bed</option>
                <option value="2">2 beds</option>
                <option value="3+">3+ beds</option>
              </select>
              <button onClick={()=>toast.success(`${filtered.length} listings found`)} style={{padding:"13px 28px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Search →</button>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
              {["Toronto","Ottawa","Hamilton","Kitchener","London","Windsor"].map(n=>(
                <button key={n} onClick={()=>{setSearch(n);setCityF(n);}}
                  style={{padding:"5px 14px",background:search===n?"rgba(255,255,255,.25)":"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:20,color:search===n?"#fff":"rgba(255,255,255,.6)",fontSize:11,cursor:"pointer",fontFamily:SANS,fontWeight:search===n?600:400}}>
                  {n}
                </button>
              ))}
            </div>
          </>
        ):(
          <>
            <p style={{fontFamily:SERIF,fontSize:52,color:"#fff",lineHeight:1,letterSpacing:"-1.5px",marginBottom:10}}>Find your <em style={{color:G,fontStyle:"italic"}}>business space.</em></p>
            <p style={{fontSize:14,color:"rgba(255,255,255,.45)",marginBottom:28}}>{commercialListings.length}+ verified commercial spaces · Office · Retail · Industrial · Flex</p>
            <div style={{maxWidth:700,margin:"0 auto",display:"flex",gap:8,flexWrap:"wrap"}}>
              <input
                style={{flex:"1",minWidth:220,padding:"13px 18px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:SANS,fontSize:13,outline:"none"}}
                placeholder="City, address, or property type..."
                value={commSearch} onChange={e=>setCommSearch(e.target.value)}
              />
              <select value={commType} onChange={e=>setCommType(e.target.value)} style={{padding:"13px 14px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.85)",fontFamily:SANS,fontSize:13,outline:"none"}}>
                <option value="all">All types</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="warehouse">Industrial / Warehouse</option>
                <option value="flex">Flex / Tech</option>
                <option value="mixed-use">Mixed Use</option>
              </select>
              <button onClick={()=>toast.success(`${filteredComm.length} commercial spaces found`)} style={{padding:"13px 28px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Search →</button>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
              {COMM_CITIES.map(n=>(
                <button key={n} onClick={()=>setCommSearch(n)}
                  style={{padding:"5px 14px",background:commSearch===n?"rgba(255,255,255,.25)":"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:20,color:commSearch===n?"#fff":"rgba(255,255,255,.6)",fontSize:11,cursor:"pointer",fontFamily:SANS,fontWeight:commSearch===n?600:400}}>
                  {n}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CMHC Banner (residential only) */}
      {mode==="residential"&&torontoCMHC&&(
        <div style={{background:"#fff",borderBottom:`1px solid ${BD}`,padding:"12px 36px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",flexShrink:0}}>CMHC Market Data 2024</span>
            {[["Toronto avg 1BR",`$${torontoCMHC.avgRent1BR.toLocaleString()}/mo`],["Toronto avg 2BR",`$${torontoCMHC.avgRent2BR.toLocaleString()}/mo`],["Toronto vacancy",`${torontoCMHC.vacancyRate}%`],["Annual rent change",`+${torontoCMHC.annualRentChange}%`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:12,color:MU}}>{k}:</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{v}</span>
              </div>
            ))}
            <span style={{fontSize:10,color:MU,marginLeft:"auto"}}>Source: CMHC Rental Market Report · cmhc-schl.gc.ca</span>
          </div>
        </div>
      )}

      {/* Commercial market context */}
      {mode==="commercial"&&(
        <div style={{background:"#fff",borderBottom:`1px solid ${BD}`,padding:"12px 36px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",flexShrink:0}}>Ontario Commercial Market</span>
            {[["Toronto Office avg","$28–$55 psf"],["Industrial avg","$14–$20 psf"],["Retail avg","$20–$45 psf"],["Vacancy (GTA Office)","13.2%"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:12,color:MU}}>{k}:</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{v}</span>
              </div>
            ))}
            <span style={{fontSize:10,color:MU,marginLeft:"auto"}}>Indicative ranges · 2024 commercial brokerage data</span>
          </div>
        </div>
      )}

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 36px 80px"}}>

        {/* ── RESIDENTIAL MODE ────────────────────────────────────── */}
        {mode==="residential"&&(
          <>
            {/* Neighbourhood quick-filter pills */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {["Downtown Core","Annex","Liberty Village","Scarborough","Midtown","North York","Etobicoke"].map(n=>(
                <button key={n} onClick={()=>setSearch(search===n?"":n)}
                  style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${search===n?G:BD}`,background:search===n?G:"#fff",color:search===n?"#fff":MU,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS,transition:"all .15s"}}>
                  {n}
                </button>
              ))}
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:12}}>
              <p style={{fontFamily:SERIF,fontSize:22,color:TX,margin:0}}>
                <em style={{color:G}}>{filtered.length}</em> listings found
                {search&&<span style={{fontSize:14,color:MU,fontFamily:SANS}}> in "{search}"</span>}
              </p>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <select value={typeF} onChange={e=>setTypeF(e.target.value)} style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                  <option value="all">All types</option>
                  <option value="condo">Condo</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="house">House</option>
                </select>
                <select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="newest">Most tours</option>
                </select>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:12,color:MU,whiteSpace:"nowrap"}}>Max: ${maxRent.toLocaleString()}</span>
                  <input type="range" min={1000} max={6000} step={100} value={maxRent} onChange={e=>setMaxRent(+e.target.value)} style={{width:100}}/>
                </div>
              </div>
            </div>

            {filtered.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:MU}}>
                <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><Home size={40} color={MU}/></div>
                <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:8}}>No listings match your search</p>
                <p style={{fontSize:14}}>Try adjusting your filters, increasing the max rent, or searching a different city.</p>
                <button onClick={()=>{setSearch("");setBedF("any");setMaxRent(5000);setTypeF("all");}} style={{marginTop:16,padding:"10px 24px",background:G,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>Clear all filters</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
                {filtered.map((l,i)=>(
                  <div key={l.id} style={{...cd,overflow:"hidden",cursor:"pointer",transition:"transform .2s,box-shadow .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                    <div style={{height:140,background:`linear-gradient(135deg,${i%2?"#1a1a1a":"#0d1117"} 0%,${G}22 100%)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                      {(()=>{const LI=getListingIcon(l.type);return<LI size={52} color="rgba(255,255,255,0.4)"/>;})()}
                      <div style={{position:"absolute",top:10,left:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                        {l.verified&&<Badge t="✓ Verified" c="green"/>}
                        {l.tours>0&&<Badge t={`${l.tours} tours booked`} c="blue"/>}
                        <Badge t={`✦ ${l.verified?(l.tours>=10?94:l.tours>=5?89:84):76} AI`} c="purple"/>
                      </div>
                      <button onClick={e=>{e.stopPropagation();setSaved(s=>s.includes(l.id)?s.filter(x=>x!==l.id):[...s,l.id]);toast.info(saved.includes(l.id)?"Removed from saved":"Saved!",{description:l.title});}}
                        style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                        {saved.includes(l.id)?"♥":"♡"}
                      </button>
                    </div>
                    <div style={{padding:"16px 18px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                        <div style={{flex:1,minWidth:0}}>
                          <p style={{fontFamily:SERIF,fontSize:17,color:TX,marginBottom:2,lineHeight:1.3}}>{l.title}</p>
                          <p style={{fontSize:11,color:MU,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.addr}</p>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                          <p style={{fontFamily:SERIF,fontSize:22,color:TX,lineHeight:1}}>${l.rent.toLocaleString()}</p>
                          <p style={{fontSize:10,color:MU}}>/mo</p>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:10,fontSize:12,color:MU,marginBottom:10}}>
                        <span>{l.beds===0?"Studio":`${l.beds} bed`}</span>
                        <span>·</span>
                        <span>{l.baths} bath</span>
                        <span>·</span>
                        <span>{l.sqft} sqft</span>
                        <span>·</span>
                        <span style={{color:G,fontWeight:600}}>Avail {l.avail}</span>
                      </div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
                        {l.tags.map(t=><Badge key={t} t={t} c="gray"/>)}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`1px solid ${BD}`}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:26,height:26,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:G,flexShrink:0}}>
                            {l.landlord.split(" ").map(x=>x[0]).join("")}
                          </div>
                          <div>
                            <p style={{fontSize:11,fontWeight:600,color:TX,margin:0}}>{l.landlord}</p>
                            <p style={{fontSize:9,color:MU,margin:0}}>Replies {l.resp}</p>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          <button onClick={e=>{e.stopPropagation();setTourListing(l);}}
                            style={{padding:"7px 14px",background:GL,color:G,border:`1px solid ${G}33`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                            Tour
                          </button>
                          <button onClick={e=>{e.stopPropagation();setApplyListing(l);}}
                            style={{padding:"7px 14px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Market data footer */}
            <div style={{marginTop:48,padding:"24px",background:"#fff",borderRadius:16,border:`1px solid ${BD}`}}>
              <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:16}}>Ontario Rental Market — <em style={{color:G}}>CMHC 2024 Data</em></p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {CMHC_RENTAL_DATA.filter(c=>c.province.includes("Ontario")).map(c=>(
                  <div key={c.city} style={{background:BG,borderRadius:10,padding:"12px 14px"}}>
                    <p style={{fontSize:12,fontWeight:700,color:TX,margin:"0 0 6px"}}>{c.city}</p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                      <div><p style={{fontSize:9,color:MU,margin:"0 0 2px",textTransform:"uppercase",letterSpacing:"0.4px"}}>1BR avg</p><p style={{fontSize:13,fontWeight:700,color:G,margin:0}}>${c.avgRent1BR.toLocaleString()}</p></div>
                      <div><p style={{fontSize:9,color:MU,margin:"0 0 2px",textTransform:"uppercase",letterSpacing:"0.4px"}}>Vacancy</p><p style={{fontSize:13,fontWeight:700,color:TX,margin:0}}>{c.vacancyRate}%</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{fontSize:11,color:MU,marginTop:14}}>Source: Canada Mortgage and Housing Corporation (CMHC) Rental Market Survey, Autumn 2024.</p>
            </div>
          </>
        )}

        {/* ── COMMERCIAL MODE ────────────────────────────────────── */}
        {mode==="commercial"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:12}}>
              <p style={{fontFamily:SERIF,fontSize:22,color:TX,margin:0}}>
                <em style={{color:G}}>{filteredComm.length}</em> commercial spaces
                {commSearch&&<span style={{fontSize:14,color:MU,fontFamily:SANS}}> in "{commSearch}"</span>}
              </p>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <select value={commType} onChange={e=>setCommType(e.target.value)} style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                  <option value="all">All types</option>
                  <option value="office">Office</option>
                  <option value="retail">Retail</option>
                  <option value="warehouse">Industrial / Warehouse</option>
                  <option value="flex">Flex / Tech</option>
                  <option value="mixed-use">Mixed Use</option>
                </select>
                <select value={commClass} onChange={e=>setCommClass(e.target.value)} style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                  <option value="all">Any class</option>
                  <option value="A">Class A</option>
                  <option value="B">Class B</option>
                  <option value="C">Class C</option>
                </select>
                <select value={commSort} onChange={e=>setCommSort(e.target.value as typeof commSort)} style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                  <option value="price_asc">Rent: Low → High</option>
                  <option value="price_desc">Rent: High → Low</option>
                  <option value="sqft_asc">Sqft: Smallest</option>
                  <option value="sqft_desc">Sqft: Largest</option>
                </select>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:12,color:MU,whiteSpace:"nowrap"}}>Max: {(commMaxSqft/1000).toFixed(0)}K sqft</span>
                  <input type="range" min={1000} max={25000} step={1000} value={commMaxSqft} onChange={e=>setCommMaxSqft(+e.target.value)} style={{width:100}}/>
                </div>
              </div>
            </div>

            {filteredComm.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:MU}}>
                <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><Building2 size={40} color={MU}/></div>
                <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:8}}>No commercial spaces match</p>
                <p style={{fontSize:14}}>Try adjusting your filters or searching a different city.</p>
                <button onClick={()=>{setCommSearch("");setCommType("all");setCommClass("all");setCommMaxSqft(20000);}} style={{marginTop:16,padding:"10px 24px",background:G,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>Clear filters</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:14}}>
                {filteredComm.map((l,i)=>{
                  const cc=CLASS_CONFIG[l.class]||{bg:BG,color:MU};
                  return(
                    <div key={l.id} style={{...cd,overflow:"hidden",transition:"transform .2s,box-shadow .2s",cursor:"pointer"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                      {/* Header band */}
                      <div style={{height:130,background:`linear-gradient(135deg,#0a1628 0%,#1a3a5c 100%)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                        {(()=>{const CI=COMM_ICON[l.type]||Building2;return<CI size={52} color="rgba(255,255,255,0.35)"/>;})()}
                        <div style={{position:"absolute",top:10,left:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                          {l.verified&&<Badge t="✓ Verified" c="green"/>}
                          <span style={{background:cc.bg,color:cc.color,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20}}>Class {l.class}</span>
                        </div>
                        <button onClick={e=>{e.stopPropagation();setSavedComm(s=>s.includes(l.id)?s.filter(x=>x!==l.id):[...s,l.id]);toast.info(savedComm.includes(l.id)?"Removed from saved":"Saved!",{description:l.title});}}
                          style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                          {savedComm.includes(l.id)?"♥":"♡"}
                        </button>
                      </div>
                      <div style={{padding:"16px 18px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:2,lineHeight:1.3}}>{l.title}</p>
                            <p style={{fontSize:11,color:MU,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.addr}</p>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                            <p style={{fontFamily:SERIF,fontSize:20,color:TX,lineHeight:1}}>${l.monthly.toLocaleString()}</p>
                            <p style={{fontSize:10,color:MU}}>/mo</p>
                          </div>
                        </div>
                        {/* Key commercial stats */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                          {[["Sqft",l.sqft.toLocaleString()],["$/sqft",`$${l.pricePerSqft}`],["Lease",l.leaseType]].map(([k,v])=>(
                            <div key={k} style={{background:BG,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                              <p style={{fontSize:9,color:MU,margin:"0 0 2px",textTransform:"uppercase",letterSpacing:"0.4px",fontWeight:700}}>{k}</p>
                              <p style={{fontSize:13,fontWeight:700,color:TX,margin:0}}>{v}</p>
                            </div>
                          ))}
                        </div>
                        {/* Tags */}
                        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
                          {l.tags.slice(0,3).map(t=><Badge key={t} t={t} c="gray"/>)}
                          {l.tags.length>3&&<Badge t={`+${l.tags.length-3} more`} c="gray"/>}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`1px solid ${BD}`}}>
                          <div>
                            <p style={{fontSize:11,fontWeight:600,color:TX,margin:0}}>{l.broker}</p>
                            <p style={{fontSize:9,color:MU,margin:0}}>Avail: <span style={{color:G,fontWeight:600}}>{l.avail}</span> · Term: {l.term}</p>
                          </div>
                          <button onClick={e=>{e.stopPropagation();setInquiryListing(l);}}
                            style={{padding:"8px 18px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                            Inquire
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Commercial footer — why Kaya */}
            <div style={{marginTop:48,background:"#fff",border:`1px solid ${BD}`,borderRadius:16,padding:28}}>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:6}}>Looking to list a <em style={{color:G}}>commercial space?</em></p>
              <p style={{fontSize:13,color:MU,marginBottom:20}}>Kaya connects Ontario commercial landlords and property managers with verified business tenants. List spaces, manage leases, and track NNN income in one platform.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20}}>
                {[["Portfolio Management","Multi-property dashboards for enterprise landlords with commercial units"],["Lease Tracking","Monitor NNN, gross, and modified gross leases with expiry alerts"],["Team Access","Assign leasing managers, facilities staff, and accountants by property"],["Commercial Analytics","Sqft occupancy, CAM reconciliation, and rental income dashboards"]].map(([t,d])=>(
                  <div key={t} style={{background:BG,borderRadius:12,padding:"14px 16px"}}>
                    <p style={{fontSize:13,fontWeight:700,color:TX,margin:"0 0 4px"}}>{t}</p>
                    <p style={{fontSize:12,color:MU,margin:0}}>{d}</p>
                  </div>
                ))}
              </div>
              <button onClick={()=>toast.info("Commercial listing coming soon",{description:"Our commercial landlord portal is launching in Q2 2026. Sign up to be notified."})}
                style={{padding:"12px 28px",background:G,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                List Commercial Space →
              </button>
            </div>
          </>
        )}
      </div>

      {tourListing&&<TourModal l={tourListing} onClose={()=>setTourListing(null)}/>}
      {applyListing&&<ApplyModal l={applyListing} onClose={()=>setApplyListing(null)}/>}
      {inquiryListing&&<CommercialInquiryModal l={inquiryListing} onClose={()=>setInquiryListing(null)}/>}
    </div>
  );
}
