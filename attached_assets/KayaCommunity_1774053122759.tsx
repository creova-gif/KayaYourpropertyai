// ═══════════════════════════════════════════════════════════════
// KAYA COMMUNITY EXPANSION — 6 New Pages
// PublicSearch, AISearch, RoommateFinder, MoveInCoordinator,
// NeighbourhoodInsights, BuildingCommunity
// ═══════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

function Badge({t,c="green"}:{t:string,c?:string}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],blue:["#EBF2FB","#1E5FA8"],gray:[BG,MU]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{t}</span>;
}

// ═══════════════════════════════════════════════════════════════
// 1. PUBLIC LISTING SEARCH — the front door for all renters
// ═══════════════════════════════════════════════════════════════
const listings=[
  {id:1,title:"Modern 2BR Downtown Condo",addr:"123 King St W, Toronto",beds:2,baths:1,sqft:975,rent:2400,img:"🏢",verified:true,avail:"Apr 1",tags:["Parking","Laundry","Gym"],score:96,landlord:"John M.",resp:"< 1h",tours:3},
  {id:2,title:"Bright 1BR Queen West Studio",addr:"456 Queen St W, Toronto",beds:1,baths:1,sqft:620,rent:1950,img:"🏠",verified:true,avail:"Apr 15",tags:["Pet Friendly","Balcony","Transit"],score:91,landlord:"Sarah K.",resp:"< 2h",tours:1},
  {id:3,title:"Spacious 3BR Annex Townhouse",addr:"789 Bloor St, Toronto",beds:3,baths:2,sqft:1400,rent:3800,img:"🏡",verified:true,avail:"May 1",tags:["Backyard","Parking","Storage"],score:88,landlord:"Mike P.",resp:"< 4h",tours:5},
  {id:4,title:"Cozy 1BR Liberty Village",addr:"88 East Liberty, Toronto",beds:1,baths:1,sqft:540,rent:1800,img:"🏗",verified:false,avail:"Immediate",tags:["Rooftop","Gym","Concierge"],score:82,landlord:"Ava R.",resp:"< 6h",tours:2},
  {id:5,title:"Luxury 2BR Yorkville",addr:"4 Ava Rd, Toronto",beds:2,baths:2,sqft:1100,rent:3400,img:"🌆",verified:true,avail:"Apr 1",tags:["Pool","Valet","Doorman"],score:94,landlord:"David L.",resp:"< 30m",tours:8},
  {id:6,title:"New 2BR Etobicoke",addr:"300 Bloor W, Etobicoke",beds:2,baths:1,sqft:900,rent:2200,img:"🏙",verified:true,avail:"Apr 15",tags:["Parking","Laundry","Near Transit"],score:85,landlord:"Emma T.",resp:"< 3h",tours:0},
];

export function PublicSearch(){
  const [search,setSearch]=useState("");
  const [bedF,setBedF]=useState("any");
  const [maxRent,setMaxRent]=useState(5000);
  const [saved,setSaved]=useState<number[]>([]);
  const [view,setView]=useState<number|null>(null);

  const filtered=listings.filter(l=>{
    const q=search.toLowerCase();
    const matchQ=!q||l.title.toLowerCase().includes(q)||l.addr.toLowerCase().includes(q)||l.tags.some(t=>t.toLowerCase().includes(q));
    const matchB=bedF==="any"||l.beds===parseInt(bedF)||+(bedF.replace("+",""))<=l.beds;
    return matchQ&&matchB&&l.rent<=maxRent;
  });

  return(
    <div style={pg}>
      {/* Hero search */}
      <div style={{background:TX,padding:"52px 40px 40px",textAlign:"center"}}>
        <p style={{fontFamily:SERIF,fontSize:52,color:"#fff",lineHeight:1,letterSpacing:"-1.5px",marginBottom:10}}>Find your <em style={{color:G,fontStyle:"italic"}}>perfect home.</em></p>
        <p style={{fontSize:14,color:"rgba(255,255,255,.45)",marginBottom:28}}>2,400+ verified listings across Canada · Zero scam guarantee</p>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",gap:8,flexWrap:"wrap"}}>
          <input style={{...inp,flex:"1",minWidth:240,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",padding:"13px 18px"}} placeholder="Neighbourhood, city, or address..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <select style={{...inp,width:130,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.8)",padding:"13px 14px"}} value={bedF} onChange={e=>setBedF(e.target.value)}>
            <option value="any">Any beds</option>
            <option value="1">1 bed</option>
            <option value="2">2 beds</option>
            <option value="3">3+ beds</option>
          </select>
          <button style={{padding:"13px 24px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Search →</button>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
          {["Downtown","Liberty Village","Annex","Yorkville","Etobicoke"].map(n=>(
            <button key={n} onClick={()=>setSearch(n)} style={{padding:"5px 12px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:20,color:"rgba(255,255,255,.6)",fontSize:11,cursor:"pointer",fontFamily:SANS}}>{n}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 36px 80px"}}>
        {/* Filters + stats */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <p style={{fontFamily:SERIF,fontSize:24,color:TX}}><em style={{color:G}}>{filtered.length}</em> listings found</p>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:12,color:MU}}>Max rent: ${maxRent.toLocaleString()}</span>
            <input type="range" min={1000} max={6000} step={100} value={maxRent} onChange={e=>setMaxRent(+e.target.value)} style={{width:120}}/>
          </div>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {filtered.map((l,i)=>(
            <div key={l.id} style={{...cd,overflow:"hidden",cursor:"pointer",transition:"all .2s"}}
              onMouseOver={e=>(e.currentTarget.style.transform="translateY(-3px)")}
              onMouseOut={e=>(e.currentTarget.style.transform="")}
              onClick={()=>setView(view===l.id?null:l.id)}>
              {/* Image area */}
              <div style={{height:140,background:`linear-gradient(135deg,${i%2?"#1a1a1a":"#0d1117"} 0%,${G}22 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative"}}>
                {l.img}
                <div style={{position:"absolute",top:10,left:10,display:"flex",gap:5}}>
                  {l.verified&&<Badge t="✓ Verified" c="green"/>}
                  {l.tours>0&&<Badge t={`${l.tours} tours booked`} c="blue"/>}
                </div>
                <button onClick={e=>{e.stopPropagation();setSaved(s=>s.includes(l.id)?s.filter(x=>x!==l.id):[...s,l.id])}}
                  style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {saved.includes(l.id)?"♥":"♡"}
                </button>
              </div>
              <div style={{padding:"16px 18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <p style={{fontFamily:SERIF,fontSize:17,color:TX,marginBottom:3}}>{l.title}</p>
                    <p style={{fontSize:11,color:MU}}>{l.addr}</p>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                    <p style={{fontFamily:SERIF,fontSize:22,color:TX}}>${l.rent.toLocaleString()}</p>
                    <p style={{fontSize:10,color:MU}}>/mo</p>
                  </div>
                </div>
                <div style={{display:"flex",gap:12,fontSize:12,color:MU,marginBottom:10}}>
                  <span>{l.beds} bed</span><span>·</span><span>{l.baths} bath</span><span>·</span><span>{l.sqft} sqft</span><span>·</span><span>Available {l.avail}</span>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
                  {l.tags.map(t=><Badge key={t} t={t} c="gray"/>)}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`1px solid ${BD}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:G}}>{l.landlord.split(" ").map(x=>x[0]).join("")}</div>
                    <div><p style={{fontSize:11,fontWeight:600,color:TX}}>{l.landlord}</p><p style={{fontSize:9,color:MU}}>Replies {l.resp}</p></div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={e=>e.stopPropagation()} style={{padding:"6px 12px",background:GL,color:G,border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Tour</button>
                    <button onClick={e=>e.stopPropagation()} style={{padding:"6px 12px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. AI NATURAL LANGUAGE SEARCH
// ═══════════════════════════════════════════════════════════════
const aiResults=[
  {title:"Bright 1BR near Ossington Station",addr:"22 Ossington Ave",rent:1980,beds:1,baths:1,match:98,reason:"Transit score 98 · 3min walk to Ossington · Under your $2,200 budget",tags:["Pet OK","Laundry","Balcony"]},
  {title:"Cozy 1BR Liberty Village",addr:"88 East Liberty St",rent:1850,beds:1,baths:1,match:95,reason:"Highly walkable · Quiet street · Gym in building",tags:["Gym","Rooftop","No Smoking"]},
  {title:"Modern 1BR Queen West",addr:"456 Queen St W",rent:2100,beds:1,baths:1,match:91,reason:"Near Dundas West · Very pet-friendly building · Bike storage",tags:["Pet Friendly","Bike Storage","Dishwasher"]},
];

const aiSuggestions=[
  "cozy 1BR near subway pet friendly under $2,200",
  "2 bedroom with parking and laundry downtown Toronto",
  "furnished room available immediately near UofT",
  "quiet neighbourhood for families 3BR under $3,500",
];

export function AISearch(){
  const [query,setQuery]=useState("");
  const [searching,setSearching]=useState(false);
  const [results,setResults]=useState<typeof aiResults|null>(null);
  const [filters,setFilters]=useState<{[k:string]:string}>({});

  function doSearch(q:string){
    setQuery(q);
    setSearching(true);
    setResults(null);
    setTimeout(()=>{setSearching(false);setResults(aiResults);},1400);
  }

  return(
    <div style={pg}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"60px 36px 80px"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:GL,padding:"5px 14px",borderRadius:40,fontSize:12,fontWeight:600,color:G,marginBottom:20}}>✦ Powered by Kaya AI</div>
          <h1 style={{fontFamily:SERIF,fontSize:52,color:TX,lineHeight:1,letterSpacing:"-1.5px",marginBottom:12}}>
            Search like you're<br/><em style={{fontStyle:"italic",color:G}}>talking to a friend.</em>
          </h1>
          <p style={{fontSize:15,color:MU,lineHeight:1.7}}>Describe exactly what you want in plain language. No filters, no forms.</p>
        </div>

        <div style={{...cd,padding:"24px",marginBottom:24}}>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <input style={{...inp,flex:1,padding:"13px 16px",fontSize:14}} placeholder='Try: "cozy 1BR near subway, pet friendly, under $2,200"...'
              value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch(query)}/>
            <button onClick={()=>doSearch(query)} disabled={!query.trim()||searching}
              style={{padding:"13px 22px",background:searching?MU:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",transition:"background .2s"}}>
              {searching?"Searching…":"Search →"}
            </button>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {aiSuggestions.map(s=>(
              <button key={s} onClick={()=>doSearch(s)} style={{padding:"5px 11px",background:BG,border:`1px solid ${BD}`,borderRadius:20,fontSize:11,cursor:"pointer",fontFamily:SANS,color:MU}}>
                "{s.length>35?s.slice(0,35)+"…":s}"
              </button>
            ))}
          </div>
        </div>

        {searching&&(
          <div style={{...cd,padding:"28px",textAlign:"center",marginBottom:20}}>
            <div style={{width:40,height:40,borderRadius:"50%",border:`3px solid ${BD}`,borderTop:`3px solid ${G}`,animation:"spin 1s linear infinite",margin:"0 auto 14px"}}/>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:6}}>Kaya AI is searching…</p>
            <p style={{fontSize:12,color:MU}}>Analysing 2,400+ listings for "{query}"</p>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {results&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>Found <em style={{color:G}}>{results.length} matches</em> for "{query}"</p>
              <Badge t="AI-ranked by fit" c="blue"/>
            </div>
            {results.map((r,i)=>(
              <div key={i} style={{...cd,padding:"20px",marginBottom:12,borderLeft:`3px solid ${i===0?G:i===1?"#1E5FA8":MU}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>{r.title}</p>
                      <div style={{background:i===0?GL:"#EBF2FB",borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700,color:i===0?G:"#1E5FA8"}}>{r.match}% match</div>
                    </div>
                    <p style={{fontSize:12,color:MU,marginBottom:8}}>{r.addr}</p>
                    <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:BG,borderRadius:8,marginBottom:10}}>
                      <span style={{fontSize:14,color:G}}>✦</span>
                      <span style={{fontSize:12,color:"#085040"}}>{r.reason}</span>
                    </div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {r.tags.map(t=><Badge key={t} t={t} c="gray"/>)}
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:20}}>
                    <p style={{fontFamily:SERIF,fontSize:28,color:TX}}>${r.rent.toLocaleString()}</p>
                    <p style={{fontSize:10,color:MU,marginBottom:12}}>/mo · {r.beds}bd/{r.baths}ba</p>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      <button style={{padding:"8px 18px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Apply Now →</button>
                      <button style={{padding:"8px 18px",background:GL,color:G,border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Book Tour</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. ROOMMATE FINDER
// ═══════════════════════════════════════════════════════════════
const roommates=[
  {id:1,name:"Priya Nair",age:26,occ:"UX Designer at Shopify",budget:"$1,200–$1,600",area:"Downtown / West End",move:"Apr 1",life:{sleep:"11pm–7am",social:"Occasionally social",clean:"Very clean",pets:"No pets",smoke:"Non-smoker",wfh:"Sometimes"},desc:"Quiet, tidy professional looking for a chill roomie. Big on cooking at home and weekend hikes. No drama please!",match:94},
  {id:2,name:"Marcus Osei",age:29,occ:"Software Engineer at Shopify",budget:"$1,100–$1,500",area:"Anywhere accessible",move:"Apr 15",life:{sleep:"10pm–6am",social:"More of a homebody",clean:"Clean",pets:"Have a cat",smoke:"Non-smoker",wfh:"Full-time WFH"},desc:"Remote dev, love my quiet time. Looking for someone who respects work hours. Happy to share chores equally.",match:87},
  {id:3,name:"Zoe Tremblay",age:24,occ:"Nursing student, Ryerson",budget:"$900–$1,200",area:"Near Ryerson/Eaton Centre",move:"Immediately",life:{sleep:"Varies (shifts)",social:"Love having friends over",clean:"Reasonable",pets:"Love animals",smoke:"Non-smoker",wfh:"Never"},desc:"On shift work so I keep odd hours. Super friendly, love to host small get-togethers on off days.",match:79},
];

export function RoommateFinder(){
  const [tab,setTab]=useState<"find"|"list">("find");
  const [selected,setSelected]=useState<number|null>(null);
  const [sent,setSent]=useState<number[]>([]);

  return(
    <div style={pg}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"48px 36px 80px"}}>
        <div style={{marginBottom:40}}>
          <p style={{...lb,marginBottom:8}}>Community</p>
          <h1 style={{fontFamily:SERIF,fontSize:48,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:10}}>
            Find your <em style={{fontStyle:"italic",color:G}}>perfect roommate.</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>AI-matched by lifestyle, budget, and schedule — not just location.</p>
        </div>

        {/* Role toggle */}
        <div style={{display:"flex",gap:0,border:`1px solid ${BD}`,borderRadius:40,padding:3,maxWidth:280,marginBottom:28}}>
          {(["find","list"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px",borderRadius:36,border:"none",fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",background:tab===t?TX:"transparent",color:tab===t?"#fff":MU,transition:"all .2s",textTransform:"capitalize"}}>
              {t==="find"?"Find a Roommate":"List my Room"}
            </button>
          ))}
        </div>

        {tab==="find"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16}}>
              {/* Filters */}
              <div>
                <div style={{...cd,padding:"16px",marginBottom:12}}>
                  <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:12}}>Your preferences</p>
                  {[{l:"Budget",t:"range",min:500,max:3000,v:1400},{l:"Move-in",t:"select",opts:["Apr 1","Apr 15","May 1","Flexible"]}].map(f=>(
                    <div key={f.l} style={{marginBottom:12}}>
                      <p style={{...lb,marginBottom:6}}>{f.l}</p>
                      {f.t==="range"?<input type="range" min={f.min} max={f.max} defaultValue={f.v} style={{width:"100%"}}/>:<select style={{...inp,padding:"8px 10px"}}>{f.opts?.map(o=><option key={o}>{o}</option>)}</select>}
                    </div>
                  ))}
                  {["Quiet schedule","Pet friendly","WFH OK","Non-smoker"].map(opt=>(
                    <label key={opt} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer"}}>
                      <input type="checkbox" defaultChecked style={{accentColor:G}}/>
                      <span style={{fontSize:12,color:TX}}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Profiles */}
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {roommates.map(r=>(
                  <div key={r.id} style={{...cd,padding:"20px",cursor:"pointer",borderLeft:`3px solid ${r.match>=90?G:r.match>=80?"#1E5FA8":MU}`}}
                    onClick={()=>setSelected(selected===r.id?null:r.id)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:52,height:52,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:SERIF,fontSize:20,color:G}}>{r.name.charAt(0)}</div>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                            <p style={{fontFamily:SERIF,fontSize:18,color:TX}}>{r.name}</p>
                            <div style={{background:r.match>=90?GL:"#EBF2FB",borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700,color:r.match>=90?G:"#1E5FA8"}}>{r.match}% match</div>
                          </div>
                          <p style={{fontSize:12,color:MU}}>{r.age} · {r.occ}</p>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>{r.budget}</p>
                        <p style={{fontSize:10,color:MU}}>per month · {r.area}</p>
                        <p style={{fontSize:10,color:G,marginTop:3}}>Move-in {r.move}</p>
                      </div>
                    </div>

                    <p style={{fontSize:12,color:TX,lineHeight:1.65,marginBottom:12}}>{r.desc}</p>

                    {/* Lifestyle grid */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:12}}>
                      {Object.entries(r.life).map(([k,v])=>(
                        <div key={k} style={{background:BG,borderRadius:7,padding:"6px 9px"}}>
                          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px",marginBottom:2}}>{k}</p>
                          <p style={{fontSize:11,fontWeight:600,color:TX}}>{v}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{display:"flex",gap:8}}>
                      <button onClick={e=>{e.stopPropagation();setSent(s=>[...s,r.id]);}} disabled={sent.includes(r.id)}
                        style={{flex:1,padding:"9px",background:sent.includes(r.id)?GL:TX,color:sent.includes(r.id)?G:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,transition:"all .2s"}}>
                        {sent.includes(r.id)?"✓ Request Sent":"Send Connection Request"}
                      </button>
                      <button onClick={e=>e.stopPropagation()} style={{padding:"9px 16px",background:"transparent",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>Message</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab==="list"&&(
          <div style={{...cd,padding:"28px",maxWidth:560}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:18}}>Create your profile</p>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {[{l:"Your name",p:"Full name"},{l:"Age",p:"e.g. 27"},{l:"Occupation",p:"e.g. Designer at Shopify"},{l:"Budget / month",p:"e.g. $1,200–$1,500"}].map(f=>(
                <div key={f.l}><p style={{...lb,marginBottom:6}}>{f.l}</p><input style={inp} placeholder={f.p}/></div>
              ))}
              <div><p style={{...lb,marginBottom:6}}>About you (shown to potential roommates)</p>
                <textarea style={{...inp,height:90,resize:"none"}} placeholder="Describe your lifestyle, schedule, and what you're looking for..."/></div>
              <div><p style={{...lb,marginBottom:8}}>My lifestyle</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[{l:"Sleep schedule",o:["Early bird","Night owl","Varies"]},{l:"Social life",o:["Homebody","Occasionally social","Very social"]},{l:"Cleanliness",o:["Very clean","Clean","Relaxed"]},{l:"Smoking",o:["Non-smoker","Smoke outside","Smoke inside"]}].map(f=>(
                    <div key={f.l}><p style={{fontSize:10,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>{f.l}</p>
                    <select style={{...inp,padding:"7px 9px"}}>{f.o.map(o=><option key={o}>{o}</option>)}</select></div>
                  ))}
                </div>
              </div>
              <button style={{padding:"12px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>Create Profile & Get Matched →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4. MOVE-IN COORDINATOR
// ═══════════════════════════════════════════════════════════════
const moveSteps=[
  {id:"keys",title:"Get your keys",desc:"Confirm key handover time and location with your landlord",done:true,action:"Done"},
  {id:"inspect",title:"Complete move-in inspection",desc:"Walk through unit, document any existing damage with photos",done:true,action:"Done"},
  {id:"hydro",title:"Set up Hydro One",desc:"Transfer electricity to your name for your move-in date",done:false,action:"Set up →",link:"https://www.hydroone.com"},
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
      <div style={{maxWidth:760,margin:"0 auto",padding:"48px 36px 80px"}}>
        <div style={{marginBottom:32}}>
          <p style={{...lb,marginBottom:8}}>Welcome to your new home</p>
          <h1 style={{fontFamily:SERIF,fontSize:44,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Move-in <em style={{fontStyle:"italic",color:G}}>Coordinator</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>Everything you need to do when moving into a new place — organized and tracked.</p>
        </div>

        {/* Progress */}
        <div style={{...cd,padding:"22px",marginBottom:24,background:TX}}>
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

        {/* Task list */}
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

        {/* Quick links */}
        <div style={{...cd,padding:"20px"}}>
          <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>Useful for new residents</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {[["🚍","Transit (TTC)","Plan your commute"],["🏥","Nearest clinic","Find a doctor"],["🛒","Grocery stores","What's nearby"],["🐾","Pet services","Vet, grooming, park"],["📦","Parcel lockers","Building info"],["🔑","Building access","Key fob setup"]].map(i=>(
              <div key={i[1]} style={{background:BG,borderRadius:10,padding:"12px",cursor:"pointer",textAlign:"center"}} onMouseOver={e=>(e.currentTarget.style.background=GL)} onMouseOut={e=>(e.currentTarget.style.background=BG)}>
                <div style={{fontSize:20,marginBottom:5}}>{i[0]}</div>
                <p style={{fontSize:12,fontWeight:600,color:TX,marginBottom:2}}>{i[1]}</p>
                <p style={{fontSize:10,color:MU}}>{i[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 5. NEIGHBOURHOOD INSIGHTS
// ═══════════════════════════════════════════════════════════════
const neighbourhoods:{[k:string]:any}={
  "Downtown Core":{walk:98,transit:99,bike:85,safe:72,noise:"High",vibe:"Urban, vibrant",avgRent:2800,schools:7,parks:4,cafes:140,commute:"5–12 min",pros:["Everything walkable","Best transit in city","Great dining scene"],cons:["Expensive","Noisy","Less green space"]},
  "Annex":{walk:92,transit:88,bike:90,safe:85,noise:"Medium",vibe:"Leafy, intellectual",avgRent:2300,schools:12,parks:8,cafes:60,commute:"15–25 min",pros:["Quiet tree-lined streets","Great schools","Strong community"],cons:["Fewer new builds","Pricier for the size","Limited parking"]},
  "Liberty Village":{walk:85,transit:75,bike:80,safe:88,noise:"Medium",vibe:"Young professional",avgRent:2150,schools:3,parks:5,cafes:45,commute:"20–30 min",pros:["Modern buildings","Active social scene","Dog friendly"],cons:["TTC coverage gaps","Weekend traffic","Gets crowded"]},
  "Scarborough":{walk:65,transit:70,bike:55,safe:80,noise:"Low",vibe:"Family-oriented",avgRent:1800,schools:28,parks:22,cafes:35,commute:"35–50 min",pros:["Much more affordable","Larger units","Quiet and safe"],cons:["Long commute downtown","Car usually needed","Less nightlife"]},
};

export function NeighbourhoodInsights(){
  const [hood,setHood]=useState("Downtown Core");
  const d=neighbourhoods[hood];
  const scores=[{l:"Walkability",v:d.walk,c:G},{l:"Transit",v:d.transit,c:"#1E5FA8"},{l:"Bikeability",v:d.bike,c:"#B45309"},{l:"Safety",v:d.safe,c:G}];

  return(
    <div style={pg}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"48px 36px 80px"}}>
        <div style={{marginBottom:32}}>
          <p style={{...lb,marginBottom:8}}>Location Intelligence</p>
          <h1 style={{fontFamily:SERIF,fontSize:44,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Neighbourhood <em style={{fontStyle:"italic",color:G}}>Insights</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>Deep-dive on any Toronto neighbourhood before you sign a lease.</p>
        </div>

        {/* Neighbourhood selector */}
        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {Object.keys(neighbourhoods).map(n=>(
            <button key={n} onClick={()=>setHood(n)} style={{padding:"9px 18px",borderRadius:20,border:`1px solid`,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",background:hood===n?TX:BG,color:hood===n?"#fff":MU,borderColor:hood===n?TX:BD,transition:"all .15s"}}>{n}</button>
          ))}
        </div>

        {/* Scores */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {scores.map(s=>(
            <div key={s.l} style={{...cd,padding:"16px 18px"}}>
              <p style={{...lb,marginBottom:10}}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:36,color:s.c,lineHeight:1,marginBottom:6}}>{s.v}</p>
              <div style={{height:5,background:BD,borderRadius:3}}>
                <div style={{height:5,background:s.c,borderRadius:3,width:`${s.v}%`,transition:"width .5s"}}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          {/* Stats */}
          <div style={{...cd,padding:"20px"}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>At a glance</p>
            {[["Avg rent / month",`$${d.avgRent.toLocaleString()}`],["Noise level",d.noise],["Vibe",d.vibe],["Commute downtown",d.commute],["Cafes & restaurants",d.cafes],["Parks & green space",d.parks],["Schools nearby",d.schools]].map(r=>(
              <div key={r[0]} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                <span style={{fontSize:12,color:MU}}>{r[0]}</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{r[1]}</span>
              </div>
            ))}
          </div>
          {/* Pros/cons */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{...cd,padding:"18px",flex:1}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:10}}>Why people love it</p>
              {d.pros.map((p:string)=>(
                <div key={p} style={{display:"flex",gap:8,marginBottom:7}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:8,color:G}}>✓</span></div>
                  <span style={{fontSize:12,color:TX}}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{...cd,padding:"18px",flex:1}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:10}}>Things to consider</p>
              {d.cons.map((c:string)=>(
                <div key={c} style={{display:"flex",gap:8,marginBottom:7}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:8,color:"#B45309"}}>!</span></div>
                  <span style={{fontSize:12,color:TX}}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{...cd,padding:"18px",background:GL,borderColor:"rgba(10,122,82,.15)"}}>
          <p style={{fontSize:12,fontWeight:700,color:G,marginBottom:6}}>✦ Kaya AI Verdict on {hood}</p>
          <p style={{fontSize:12,color:"#085040",lineHeight:1.7}}>
            {hood==="Downtown Core"?"Best for young professionals who want maximum walkability and nightlife — be ready to pay a premium and trade space for location."
            :hood==="Annex"?"Ideal for those who value community, quiet streets, and great schools. Strong rental demand means good availability of quality units."
            :hood==="Liberty Village"?"Perfect for 25–35 year olds who want a young community feel with modern buildings. TTC coverage improving but still car-helpful."
            :"Great value pick for families and those prioritizing space and safety over commute time. Dollar for dollar, best quality of life in the city."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 6. BUILDING COMMUNITY BOARD
// ═══════════════════════════════════════════════════════════════
type Post={id:number,author:string,type:string,title:string,body:string,time:string,likes:number,replies:number,pinned?:boolean};
const initPosts:Post[]=[
  {id:1,author:"Management",type:"announcement",title:"Water shutoff — March 20, 9am–2pm",body:"Annual maintenance. Please fill water before 9am. Apologies for the inconvenience.",time:"2h ago",likes:4,replies:7,pinned:true},
  {id:2,author:"Sarah K. (4A)",type:"lost-found",title:"Found: grey tabby cat — lobby",body:"Found wandering the lobby around 8pm. Very friendly. Has a collar but no tag. Come to 4A!",time:"3h ago",likes:12,replies:5},
  {id:3,author:"John M. (2B)",type:"recommend",title:"Best pizza on King St",body:"Honestly Terroni is overrated. Found this tiny spot on Bathurst — Pizzeria Libretto — absolutely incredible wood-fired neapolitan. 10/10 recommend.",time:"5h ago",likes:8,replies:3},
  {id:4,author:"Emma W. (3A)",type:"offer",title:"Free moving boxes — must go today",body:"Just finished unpacking. Have about 20 large boxes and packing paper. First come first served, lobby storage room.",time:"7h ago",likes:6,replies:2},
  {id:5,author:"David L. (1C)",type:"ask",title:"Any recommendations for a good locksmith?",body:"Lost my spare key. Looking for someone reliable and not too pricey. Bonus if they can come same day.",time:"1d ago",likes:2,replies:4},
];

export function BuildingCommunity(){
  const [posts,setPosts]=useState(initPosts);
  const [liked,setLiked]=useState<number[]>([]);
  const [filter,setFilter]=useState("all");
  const [compose,setCompose]=useState(false);
  const [newTitle,setNewTitle]=useState("");
  const [newBody,setNewBody]=useState("");
  const [newType,setNewType]=useState("ask");

  const typeColors:{[k:string]:[string,string]}={
    announcement:["#FEF3C7","#B45309"],
    "lost-found":["#FDECEA","#C0392B"],
    recommend:["#E5F4EE","#0A7A52"],
    offer:["#EBF2FB","#1E5FA8"],
    ask:[BG,MU],
  };

  const filtered=filter==="all"?posts:posts.filter(p=>p.type===filter);

  function likePost(id:number){
    setLiked(l=>l.includes(id)?l.filter(x=>x!==id):[...l,id]);
    setPosts(ps=>ps.map(p=>p.id===id?{...p,likes:p.likes+(liked.includes(id)?-1:1)}:p));
  }

  function addPost(){
    if(!newTitle.trim())return;
    const np:Post={id:Date.now(),author:"Justin M. (5A)",type:newType,title:newTitle,body:newBody,time:"Just now",likes:0,replies:0};
    setPosts([np,...posts]);
    setCompose(false);setNewTitle("");setNewBody("");
  }

  return(
    <div style={pg}>
      <div style={{maxWidth:720,margin:"0 auto",padding:"48px 36px 80px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <div>
            <p style={{...lb,marginBottom:8}}>123 King Street West</p>
            <h1 style={{fontFamily:SERIF,fontSize:42,color:TX,lineHeight:1,letterSpacing:"-1px"}}>
              Building <em style={{fontStyle:"italic",color:G}}>Community</em>
            </h1>
          </div>
          <button onClick={()=>setCompose(!compose)} style={{padding:"10px 18px",background:TX,color:"#fff",border:"none",borderRadius:10,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            + Post
          </button>
        </div>

        {/* Compose */}
        {compose&&(
          <div style={{...cd,padding:"20px",marginBottom:20,borderColor:G}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>New post</p>
            <div style={{marginBottom:10}}>
              <select style={{...inp,padding:"8px 10px",marginBottom:10,width:"auto"}} value={newType} onChange={e=>setNewType(e.target.value)}>
                {Object.keys(typeColors).map(t=><option key={t} value={t}>{t.replace("-"," ")}</option>)}
              </select>
              <input style={{...inp,marginBottom:8}} placeholder="Title..." value={newTitle} onChange={e=>setNewTitle(e.target.value)}/>
              <textarea style={{...inp,height:80,resize:"none"}} placeholder="What's on your mind? (optional)" value={newBody} onChange={e=>setNewBody(e.target.value)}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addPost} style={{padding:"9px 20px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>Post to building →</button>
              <button onClick={()=>setCompose(false)} style={{padding:"9px 16px",background:"transparent",border:`1px solid ${BD}`,borderRadius:9,fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
          {["all","announcement","lost-found","recommend","offer","ask"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 13px",borderRadius:20,border:`1px solid`,fontFamily:SANS,fontSize:11,fontWeight:600,cursor:"pointer",background:filter===f?TX:BG,color:filter===f?"#fff":MU,borderColor:filter===f?TX:BD,textTransform:"capitalize",transition:"all .15s"}}>
              {f==="all"?"All posts":f.replace("-"," ")}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(p=>{
            const [tbg,ttc]=typeColors[p.type]||[BG,MU];
            return(
              <div key={p.id} style={{...cd,padding:"18px 20px",borderLeft:p.pinned?`3px solid ${G}`:`3px solid transparent`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G,flexShrink:0}}>{p.author.charAt(0)}</div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:12,fontWeight:600,color:TX}}>{p.author}</span>
                        <span style={{background:tbg,color:ttc,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,textTransform:"capitalize"}}>{p.type.replace("-"," ")}</span>
                        {p.pinned&&<span style={{background:GL,color:G,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20}}>📌 Pinned</span>}
                      </div>
                      <span style={{fontSize:10,color:MU}}>{p.time}</span>
                    </div>
                  </div>
                </div>
                <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:5}}>{p.title}</p>
                {p.body&&<p style={{fontSize:12,color:MU,lineHeight:1.65,marginBottom:12}}>{p.body}</p>}
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <button onClick={()=>likePost(p.id)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:12,color:liked.includes(p.id)?G:MU,fontFamily:SANS,fontWeight:liked.includes(p.id)?600:400}}>
                    {liked.includes(p.id)?"♥":"♡"} {p.likes}
                  </button>
                  <button style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:12,color:MU,fontFamily:SANS}}>
                    💬 {p.replies} replies
                  </button>
                  <button style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:11,color:MU,fontFamily:SANS}}>Share</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
