import { useState } from "react";
import { toast } from "sonner";
import { CMHC_RENTAL_DATA } from "../utils/canadianHousingData";
import { PublicNav } from "../components/PublicNav";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

function Badge({t,c="green"}:{t:string,c?:string}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],blue:["#EBF2FB","#1E5FA8"],gray:[BG,MU]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{t}</span>;
}

const listings=[
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

type Listing = typeof listings[0];

function TourModal({l,onClose}:{l:Listing,onClose:()=>void}){
  const [date,setDate]=useState("");
  const [time,setTime]=useState("10:00");
  const [name,setName]=useState("");
  const [submitted,setSubmitted]=useState(false);

  const submit=()=>{
    if(!date||!name){toast.error("Please fill in all fields");return;}
    setSubmitted(true);
    setTimeout(()=>{
      onClose();
      toast.success("Tour booked!",{description:`Your tour for ${l.title} on ${date} at ${time} has been confirmed. ${l.landlord} will email you a confirmation shortly.`});
    },1000);
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

function ApplyModal({l,onClose}:{l:Listing,onClose:()=>void}){
  const [step,setStep]=useState(1);
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
          <span style={{fontSize:16}}>🔒</span>
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

export function PublicSearch(){
  const [search,setSearch]=useState("");
  const [bedF,setBedF]=useState("any");
  const [maxRent,setMaxRent]=useState(5000);
  const [saved,setSaved]=useState<number[]>([]);
  const [sort,setSort]=useState<"price_asc"|"price_desc"|"newest">("price_asc");
  const [typeF,setTypeF]=useState("all");
  const [tourListing,setTourListing]=useState<Listing|null>(null);
  const [applyListing,setApplyListing]=useState<Listing|null>(null);
  const [cityF,setCityF]=useState("");

  const filtered=listings.filter(l=>{
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

  const torontoCMHC=CMHC_RENTAL_DATA.find(c=>c.city==="Toronto");

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <PublicNav />
      {/* Hero search */}
      <div style={{background:TX,padding:"114px 40px 44px",textAlign:"center"}}>
        <p style={{fontFamily:SERIF,fontSize:52,color:"#fff",lineHeight:1,letterSpacing:"-1.5px",marginBottom:10}}>Find your <em style={{color:G,fontStyle:"italic"}}>perfect home.</em></p>
        <p style={{fontSize:14,color:"rgba(255,255,255,.45)",marginBottom:28}}>
          {listings.length}+ verified listings across Ontario · Zero scam guarantee
        </p>
        <div style={{maxWidth:700,margin:"0 auto",display:"flex",gap:8,flexWrap:"wrap"}}>
          <input
            style={{flex:"1",minWidth:220,padding:"13px 18px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:SANS,fontSize:13,outline:"none"}}
            placeholder="City, neighbourhood, or address..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            aria-label="Search listings by city or address"
          />
          <select aria-label="Filter by bedrooms" style={{padding:"13px 14px",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.85)",fontFamily:SANS,fontSize:13,outline:"none"}} value={bedF} onChange={e=>setBedF(e.target.value)}>
            <option value="any">Any beds</option>
            <option value="0">Studio</option>
            <option value="1">1 bed</option>
            <option value="2">2 beds</option>
            <option value="3+">3+ beds</option>
          </select>
          <button onClick={()=>toast.success(`${filtered.length} listings found`,{description:"Showing results matching your search. Adjust the rent slider or filters to narrow down."})} style={{padding:"13px 28px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
            Search →
          </button>
        </div>
        {/* City quick-pills */}
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
          {["Toronto","Ottawa","Hamilton","Kitchener","London","Windsor"].map(n=>(
            <button key={n}
              onClick={()=>{setSearch(n);setCityF(n)}}
              aria-label={`Search ${n} listings`}
              style={{padding:"5px 14px",background:search===n?"rgba(255,255,255,.25)":"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:20,color:search===n?"#fff":"rgba(255,255,255,.6)",fontSize:11,cursor:"pointer",fontFamily:SANS,fontWeight:search===n?600:400}}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* CMHC Market Data Banner */}
      {torontoCMHC&&(
        <div style={{background:"#fff",borderBottom:`1px solid ${BD}`,padding:"12px 36px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",flexShrink:0}}>📊 CMHC Market Data 2024</span>
            {[
              ["Toronto avg 1BR",`$${torontoCMHC.avgRent1BR.toLocaleString()}/mo`],
              ["Toronto avg 2BR",`$${torontoCMHC.avgRent2BR.toLocaleString()}/mo`],
              ["Toronto vacancy",`${torontoCMHC.vacancyRate}%`],
              ["Annual rent change",`+${torontoCMHC.annualRentChange}%`],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:12,color:MU}}>{k}:</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{v}</span>
              </div>
            ))}
            <span style={{fontSize:10,color:MU,marginLeft:"auto"}}>Source: CMHC Rental Market Report · cmhc-schl.gc.ca</span>
          </div>
        </div>
      )}

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 36px 80px"}}>
        {/* Filters + sort row */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <p style={{fontFamily:SERIF,fontSize:22,color:TX,margin:0}}>
            <em style={{color:G}}>{filtered.length}</em> listings found
            {search&&<span style={{fontSize:14,color:MU,fontFamily:SANS}}> in "{search}"</span>}
          </p>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            {/* Type filter */}
            <select value={typeF} onChange={e=>setTypeF(e.target.value)} aria-label="Filter by property type" style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
              <option value="all">All types</option>
              <option value="condo">Condo</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
              <option value="house">House</option>
            </select>
            {/* Sort */}
            <select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} aria-label="Sort listings" style={{padding:"8px 12px",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="newest">Most tours</option>
            </select>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:12,color:MU,whiteSpace:"nowrap"}}>Max: ${maxRent.toLocaleString()}</span>
              <input type="range" min={1000} max={6000} step={100} value={maxRent} onChange={e=>setMaxRent(+e.target.value)} style={{width:100}} aria-label="Maximum rent filter"/>
            </div>
          </div>
        </div>

        {/* Listings grid */}
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:MU}}>
            <p style={{fontSize:40,marginBottom:12}}>🏠</p>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:8}}>No listings match your search</p>
            <p style={{fontSize:14}}>Try adjusting your filters, increasing the max rent, or searching a different city.</p>
            <button onClick={()=>{setSearch("");setBedF("any");setMaxRent(5000);setTypeF("all")}} style={{marginTop:16,padding:"10px 24px",background:G,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>Clear all filters</button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
            {filtered.map((l,i)=>(
              <div key={l.id} style={{...cd,overflow:"hidden",cursor:"pointer",transition:"transform .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                <div style={{height:140,background:`linear-gradient(135deg,${i%2?"#1a1a1a":"#0d1117"} 0%,${G}22 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative"}}>
                  {l.img}
                  <div style={{position:"absolute",top:10,left:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                    {l.verified&&<Badge t="✓ Verified" c="green"/>}
                    {l.tours>0&&<Badge t={`${l.tours} tours booked`} c="blue"/>}
                  </div>
                  <button
                    onClick={e=>{e.stopPropagation();setSaved(s=>s.includes(l.id)?s.filter(x=>x!==l.id):[...s,l.id]);toast.info(saved.includes(l.id)?"Removed from saved":"Saved!",{description:l.title})}}
                    aria-label={saved.includes(l.id)?"Remove from saved":"Save listing"}
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
                      <button
                        onClick={e=>{e.stopPropagation();setTourListing(l)}}
                        aria-label={`Book a tour for ${l.title}`}
                        style={{padding:"7px 14px",background:GL,color:G,border:`1px solid ${G}33`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                        Tour
                      </button>
                      <button
                        onClick={e=>{e.stopPropagation();setApplyListing(l)}}
                        aria-label={`Apply for ${l.title}`}
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
          <p style={{fontSize:11,color:MU,marginTop:14}}>
            Source: Canada Mortgage and Housing Corporation (CMHC) Rental Market Survey, Autumn 2024.
            Data reflects purpose-built rental apartments. <a href="https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research" target="_blank" rel="noopener noreferrer" style={{color:G}}>View source →</a>
          </p>
        </div>
      </div>

      {/* Tour modal */}
      {tourListing&&<TourModal l={tourListing} onClose={()=>setTourListing(null)}/>}
      {/* Apply modal */}
      {applyListing&&<ApplyModal l={applyListing} onClose={()=>setApplyListing(null)}/>}
    </div>
  );
}
