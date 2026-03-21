import { useState } from "react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

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

        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {Object.keys(neighbourhoods).map(n=>(
            <button key={n} onClick={()=>setHood(n)} style={{padding:"9px 18px",borderRadius:20,border:`1px solid`,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",background:hood===n?TX:BG,color:hood===n?"#fff":MU,borderColor:hood===n?TX:BD,transition:"all .15s"}}>{n}</button>
          ))}
        </div>

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
          <div style={{...cd,padding:"20px"}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>At a glance</p>
            {[["Avg rent / month",`$${d.avgRent.toLocaleString()}`],["Noise level",d.noise],["Vibe",d.vibe],["Commute downtown",d.commute],["Cafes & restaurants",String(d.cafes)],["Parks & green space",String(d.parks)],["Schools nearby",String(d.schools)]].map(r=>(
              <div key={r[0]} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                <span style={{fontSize:12,color:MU}}>{r[0]}</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{r[1]}</span>
              </div>
            ))}
          </div>
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
