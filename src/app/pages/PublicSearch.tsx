import { useState } from "react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

function Badge({t,c="green"}:{t:string,c?:string}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],blue:["#EBF2FB","#1E5FA8"],gray:[BG,MU]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{t}</span>;
}

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

  const filtered=listings.filter(l=>{
    const q=search.toLowerCase();
    const matchQ=!q||l.title.toLowerCase().includes(q)||l.addr.toLowerCase().includes(q)||l.tags.some(t=>t.toLowerCase().includes(q));
    const matchB=bedF==="any"||l.beds===parseInt(bedF)||+(bedF.replace("+",""))<=l.beds;
    return matchQ&&matchB&&l.rent<=maxRent;
  });

  return(
    <div style={pg}>
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <p style={{fontFamily:SERIF,fontSize:24,color:TX}}><em style={{color:G}}>{filtered.length}</em> listings found</p>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:12,color:MU}}>Max rent: ${maxRent.toLocaleString()}</span>
            <input type="range" min={1000} max={6000} step={100} value={maxRent} onChange={e=>setMaxRent(+e.target.value)} style={{width:120}}/>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
          {filtered.map((l,i)=>(
            <div key={l.id} style={{...cd,overflow:"hidden",cursor:"pointer",transition:"all .2s"}}
              onMouseOver={e=>(e.currentTarget.style.transform="translateY(-3px)")}
              onMouseOut={e=>(e.currentTarget.style.transform="")}>
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
                    <button style={{padding:"6px 12px",background:GL,color:G,border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Tour</button>
                    <button style={{padding:"6px 12px",background:TX,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>Apply</button>
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
