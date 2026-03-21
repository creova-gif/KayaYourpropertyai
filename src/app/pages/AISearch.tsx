import { PublicNav } from "../components/PublicNav";
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

  function doSearch(q:string){
    setQuery(q);
    setSearching(true);
    setResults(null);
    setTimeout(()=>{setSearching(false);setResults(aiResults);},1400);
  }

  return(
    <div style={pg}>
      <PublicNav />
      <div style={{maxWidth:820,margin:"0 auto",padding:"110px 36px 80px"}}>
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
