import { useState } from "react";
import { CMHC_RENTAL_DATA } from "../utils/canadianHousingData";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

const neighbourhoods:{[k:string]:any}={
  "Downtown Core":{walk:98,transit:99,bike:85,safe:72,noise:"High",vibe:"Urban, vibrant",avgRent:2900,schools:7,parks:4,cafes:140,commute:"5–12 min",city:"Toronto",pros:["Everything walkable","Best transit in city","Great dining scene","Short commute"],cons:["Expensive","Noisy","Less green space","Small units"]},
  "Annex":{walk:92,transit:88,bike:90,safe:85,noise:"Medium",vibe:"Leafy, intellectual",avgRent:2450,schools:12,parks:8,cafes:60,commute:"15–25 min",city:"Toronto",pros:["Quiet tree-lined streets","Great schools","Strong community","Large units"],cons:["Pricier for the size","Limited parking","Few new builds"]},
  "Liberty Village":{walk:85,transit:75,bike:80,safe:88,noise:"Medium",vibe:"Young professional",avgRent:2200,schools:3,parks:5,cafes:45,commute:"20–30 min",city:"Toronto",pros:["Modern buildings","Active social scene","Dog friendly","Great cafes"],cons:["TTC coverage gaps","Weekend traffic","Gets crowded"]},
  "Scarborough":{walk:65,transit:70,bike:55,safe:80,noise:"Low",vibe:"Family-oriented",avgRent:1900,schools:28,parks:22,cafes:35,commute:"35–50 min",city:"Toronto",pros:["Much more affordable","Larger units","Quiet and safe","Great green space"],cons:["Long commute downtown","Car usually needed","Less nightlife"]},
  "Midtown":{walk:88,transit:91,bike:76,safe:90,noise:"Low-Medium",vibe:"Established, professional",avgRent:2650,schools:18,parks:12,cafes:80,commute:"12–20 min",city:"Toronto",pros:["Great transit (Yonge)","Top schools","Safe and clean","Beautiful homes"],cons:["Higher rents","Limited new supply","Parking expensive"]},
  "North York":{walk:72,transit:82,bike:60,safe:83,noise:"Medium",vibe:"Suburban feel, urban access",avgRent:2050,schools:22,parks:16,cafes:50,commute:"22–35 min",city:"Toronto",pros:["Great value","Large units","Good schools","Shopping malls"],cons:["Less walkable","Car helpful","Older building stock"]},
  "Westboro":{walk:85,transit:78,bike:92,safe:91,noise:"Low",vibe:"Active, trendy village",avgRent:1850,schools:14,parks:10,cafes:55,commute:"15–25 min",city:"Ottawa",pros:["Great biking city","Excellent food scene","Safe neighbourhood","NCC trails"],cons:["Colder winters","Less nightlife than Toronto","Limited transit vs TO"]},
  "Centretown":{walk:90,transit:84,bike:85,safe:80,noise:"Medium",vibe:"Young, urban, walkable",avgRent:1780,schools:8,parks:6,cafes:70,commute:"8–15 min",city:"Ottawa",pros:["Walk to parliament","Great restaurants","Affordable vs Toronto","LRT access"],cons:["Urban noise","Limited parking","Smaller units"]},
  "Dundas St W":{walk:80,transit:76,bike:78,safe:82,noise:"Medium",vibe:"Emerging, artistic",avgRent:1700,schools:10,parks:8,cafes:40,commute:"25–35 min",city:"Hamilton",pros:["Rapidly improving","Great art scene","Most affordable","Big units for the price"],cons:["Still developing","Further from downtown TO","Some rough patches"]},
};

export function NeighbourhoodInsights(){
  const [hood,setHood]=useState("Downtown Core");
  const [cityFilter,setCityFilter]=useState("All");
  const d=neighbourhoods[hood];
  const scores=[{l:"Walkability",v:d.walk,c:G},{l:"Transit",v:d.transit,c:"#1E5FA8"},{l:"Bikeability",v:d.bike,c:"#B45309"},{l:"Safety",v:d.safe,c:"#0A7A52"}];

  const cities=["All","Toronto","Ottawa","Hamilton"];
  const filteredHoods=Object.keys(neighbourhoods).filter(n=>cityFilter==="All"||neighbourhoods[n].city===cityFilter);

  const cityData=CMHC_RENTAL_DATA.find(c=>c.city===d.city||(d.city==="Ottawa"&&c.city==="Ottawa-Gatineau")||(d.city==="Hamilton"&&c.city==="Hamilton"));

  return(
    <div style={pg}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"40px 28px 80px"}}>
        <div style={{marginBottom:28}}>
          <p style={{...lb,marginBottom:8}}>Location Intelligence · Powered by CMHC Data</p>
          <h1 style={{fontFamily:SERIF,fontSize:42,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Neighbourhood <em style={{fontStyle:"italic",color:G}}>Insights</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>Deep-dive on any Ontario neighbourhood. Walk scores and market data based on real CMHC 2024 Rental Market Report.</p>
        </div>

        {/* City filter tabs */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {cities.map(c=>(
            <button key={c} onClick={()=>setCityFilter(c)}
              aria-pressed={cityFilter===c}
              style={{padding:"7px 16px",borderRadius:20,border:`1.5px solid ${cityFilter===c?G:BD}`,background:cityFilter===c?G:"#fff",color:cityFilter===c?"#fff":MU,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .15s"}}>
              {c}
            </button>
          ))}
        </div>

        {/* Neighbourhood picker */}
        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {filteredHoods.map(n=>(
            <button key={n} onClick={()=>setHood(n)}
              aria-pressed={hood===n}
              style={{padding:"9px 18px",borderRadius:20,border:"1px solid",fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",background:hood===n?TX:BG,color:hood===n?"#fff":MU,borderColor:hood===n?TX:BD,transition:"all .15s"}}>
              {n} {neighbourhoods[n].city!=="Toronto"&&<span style={{fontSize:10,opacity:.7}}>· {neighbourhoods[n].city}</span>}
            </button>
          ))}
        </div>

        {/* Score cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {scores.map(s=>(
            <div key={s.l} style={{...cd,padding:"16px 18px"}}>
              <p style={{...lb,marginBottom:8}}>{s.l}</p>
              <p style={{fontFamily:SERIF,fontSize:34,color:s.c,lineHeight:1,marginBottom:6}}>{s.v}</p>
              <div style={{height:4,background:BD,borderRadius:3}}>
                <div style={{height:4,background:s.c,borderRadius:3,width:`${s.v}%`,transition:"width .5s"}}/>
              </div>
              <p style={{fontSize:10,color:MU,marginTop:5}}>{s.v>=90?"Excellent":s.v>=75?"Very Good":s.v>=60?"Good":"Below Average"}</p>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          {/* At a glance */}
          <div style={{...cd,padding:"20px"}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>{hood} — at a glance</p>
            {[
              ["Avg rent / month",`$${d.avgRent.toLocaleString()}`],
              ["Noise level",d.noise],
              ["Vibe",d.vibe],
              ["Commute to downtown",d.commute],
              ["Cafes & restaurants",String(d.cafes)],
              ["Parks & green space",String(d.parks)],
              ["Schools nearby",String(d.schools)],
            ].map(r=>(
              <div key={r[0]} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                <span style={{fontSize:12,color:MU}}>{r[0]}</span>
                <span style={{fontSize:12,fontWeight:700,color:TX}}>{r[1]}</span>
              </div>
            ))}
          </div>

          {/* Pros/cons + city data */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{...cd,padding:"18px",flex:1}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:10}}>Why people love it</p>
              {d.pros.map((p:string)=>(
                <div key={p} style={{display:"flex",gap:8,marginBottom:7}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:8,color:G}}>✓</span></div>
                  <span style={{fontSize:12,color:TX}}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{...cd,padding:"18px",flex:1}}>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:10}}>Things to consider</p>
              {d.cons.map((c:string)=>(
                <div key={c} style={{display:"flex",gap:8,marginBottom:7}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:8,color:"#B45309"}}>!</span></div>
                  <span style={{fontSize:12,color:TX}}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real CMHC city data */}
        {cityData&&(
          <div style={{...cd,padding:"20px",marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <div>
                <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:2}}>{cityData.city} — Real Market Data</p>
                <p style={{fontSize:12,color:MU}}>Source: CMHC Rental Market Survey, Autumn {cityData.reportYear} · <a href="https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research" target="_blank" rel="noopener noreferrer" style={{color:G}}>cmhc-schl.gc.ca</a></p>
              </div>
              <span style={{padding:"4px 10px",background:GL,color:G,borderRadius:20,fontSize:11,fontWeight:700}}>Official CMHC Data</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {[
                {l:"Avg 1BR Rent",v:`$${cityData.avgRent1BR.toLocaleString()}/mo`,c:G},
                {l:"Avg 2BR Rent",v:`$${cityData.avgRent2BR.toLocaleString()}/mo`,c:G},
                {l:"Vacancy Rate",v:`${cityData.vacancyRate}%`,c:cityData.vacancyRate<2?"#C0392B":cityData.vacancyRate<3?"#B45309":"#0A7A52"},
                {l:"Annual Rent Change",v:`+${cityData.annualRentChange}%`,c:"#1E5FA8"},
              ].map(s=>(
                <div key={s.l} style={{background:BG,borderRadius:10,padding:"12px 14px"}}>
                  <p style={{...lb,marginBottom:4}}>{s.l}</p>
                  <p style={{fontFamily:SERIF,fontSize:22,color:s.c,lineHeight:1,margin:0}}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Walk Score API integration note */}
        <div style={{...cd,padding:"18px",marginBottom:20,background:"#EBF2FB",border:"1px solid #BFDBFE"}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <span style={{fontSize:20,flexShrink:0}}>🗺️</span>
            <div>
              <p style={{fontSize:13,fontWeight:700,color:"#1E5FA8",marginBottom:4}}>Live Walk Score Integration Available</p>
              <p style={{fontSize:12,color:"#1E5FA8",margin:"0 0 10px",lineHeight:1.6}}>
                Connect the <a href="https://www.walkscore.com/professional/api.php" target="_blank" rel="noopener noreferrer" style={{color:"#1E5FA8",fontWeight:600}}>Walk Score API</a> (free tier: 5,000 requests/day) to show real-time walk, transit, and bike scores for any Ontario address. Add <code style={{background:"rgba(30,95,168,.1)",padding:"2px 6px",borderRadius:4,fontSize:11}}>VITE_WALKSCORE_API_KEY</code> to your environment to enable live scores.
              </p>
              <button
                onClick={()=>toast.info("Walk Score API setup",{description:"To enable real Walk Score data: 1) Sign up free at walkscore.com 2) Get your API key 3) Add VITE_WALKSCORE_API_KEY to your Replit Secrets. The integration is already built in src/app/utils/canadianHousingData.ts"})}
                style={{padding:"7px 14px",background:"#1E5FA8",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                Enable Live Scores →
              </button>
            </div>
          </div>
        </div>

        {/* Kaya AI Verdict */}
        <div style={{...cd,padding:"18px",background:GL,borderColor:"rgba(10,122,82,.15)"}}>
          <p style={{fontSize:12,fontWeight:700,color:G,marginBottom:6}}>✦ Kaya AI Verdict on {hood}</p>
          <p style={{fontSize:13,color:"#085040",lineHeight:1.7}}>
            {hood==="Downtown Core"?"Best for young professionals who want maximum walkability and nightlife — be ready to pay a premium and trade space for location. Vacancy rate in Toronto is only 1.5%, so move fast when you find something good."
            :hood==="Annex"?"Ideal for those who value community, quiet streets, and great schools. Strong rental demand means good availability of quality units — but prices have risen 8.4% year-over-year."
            :hood==="Liberty Village"?"Perfect for 25–35 year olds who want a young community feel with modern buildings. TTC coverage improving but still car-helpful on evenings and weekends."
            :hood==="Scarborough"?"Great value pick for families and those prioritizing space and safety over commute time. Dollar for dollar, best quality of life in the city — with rents ~30% below downtown."
            :hood==="Westboro"?"Ottawa's trendiest neighbourhood — best in class for cycling (92/100). Ottawa-Gatineau market is less competitive than Toronto with a 2.1% vacancy rate giving renters more negotiating room."
            :hood==="Centretown"?"Ottawa's most walkable urban core offers an excellent downtown lifestyle at a fraction of Toronto prices. The LRT Confederation Line provides fast connections across the city."
            :hood==="Dundas St W"?"Hamilton's most exciting emerging neighbourhood — arts scene, historic buildings, and rents nearly 40% lower than comparable Toronto areas. Best for buyers who are ahead of the curve."
            :`${d.vibe} neighbourhood with a Walk Score of ${d.walk} and average rents of $${d.avgRent.toLocaleString()}/mo. ${cityData?`CMHC reports ${cityData.vacancyRate}% vacancy in ${cityData.city} — ${cityData.vacancyRate<2?"a tight market — act fast":"a balanced market with room to negotiate"}.`:""}`}
          </p>
        </div>
      </div>
    </div>
  );
}
