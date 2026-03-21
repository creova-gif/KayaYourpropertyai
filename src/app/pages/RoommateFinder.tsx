import { useState } from "react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

const roommates=[
  {id:1,name:"Priya Nair",age:26,occ:"UX Designer at Shopify",budget:"$1,200–$1,600",area:"Downtown / West End",move:"Apr 1",life:{sleep:"11pm–7am",social:"Occasionally social",clean:"Very clean",pets:"No pets",smoke:"Non-smoker",wfh:"Sometimes"},desc:"Quiet, tidy professional looking for a chill roomie. Big on cooking at home and weekend hikes. No drama please!",match:94},
  {id:2,name:"Marcus Osei",age:29,occ:"Software Engineer at Shopify",budget:"$1,100–$1,500",area:"Anywhere accessible",move:"Apr 15",life:{sleep:"10pm–6am",social:"More of a homebody",clean:"Clean",pets:"Have a cat",smoke:"Non-smoker",wfh:"Full-time WFH"},desc:"Remote dev, love my quiet time. Looking for someone who respects work hours. Happy to share chores equally.",match:87},
  {id:3,name:"Zoe Tremblay",age:24,occ:"Nursing student, Ryerson",budget:"$900–$1,200",area:"Near Ryerson/Eaton Centre",move:"Immediately",life:{sleep:"Varies (shifts)",social:"Love having friends over",clean:"Reasonable",pets:"Love animals",smoke:"Non-smoker",wfh:"Never"},desc:"On shift work so I keep odd hours. Super friendly, love to host small get-togethers on off days.",match:79},
];

export function RoommateFinder(){
  const [tab,setTab]=useState<"find"|"list">("find");
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

        <div style={{display:"flex",gap:0,border:`1px solid ${BD}`,borderRadius:40,padding:3,maxWidth:280,marginBottom:28}}>
          {(["find","list"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px",borderRadius:36,border:"none",fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer",background:tab===t?TX:"transparent",color:tab===t?"#fff":MU,transition:"all .2s",textTransform:"capitalize"}}>
              {t==="find"?"Find a Roommate":"List my Room"}
            </button>
          ))}
        </div>

        {tab==="find"&&(
          <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16}}>
            <div>
              <div style={{...cd,padding:"16px",marginBottom:12}}>
                <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginBottom:12}}>Your preferences</p>
                <div style={{marginBottom:12}}>
                  <p style={{...lb,marginBottom:6}}>Budget</p>
                  <input type="range" min={500} max={3000} defaultValue={1400} style={{width:"100%"}}/>
                </div>
                <div style={{marginBottom:12}}>
                  <p style={{...lb,marginBottom:6}}>Move-in</p>
                  <select style={{...inp,padding:"8px 10px"}}>
                    {["Apr 1","Apr 15","May 1","Flexible"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                {["Quiet schedule","Pet friendly","WFH OK","Non-smoker"].map(opt=>(
                  <label key={opt} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer"}}>
                    <input type="checkbox" defaultChecked style={{accentColor:G}}/>
                    <span style={{fontSize:12,color:TX}}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {roommates.map(r=>(
                <div key={r.id} style={{...cd,padding:"20px",borderLeft:`3px solid ${r.match>=90?G:r.match>=80?"#1E5FA8":MU}`}}>
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

                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:12}}>
                    {Object.entries(r.life).map(([k,v])=>(
                      <div key={k} style={{background:BG,borderRadius:7,padding:"6px 9px"}}>
                        <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px",marginBottom:2}}>{k}</p>
                        <p style={{fontSize:11,fontWeight:600,color:TX}}>{v}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setSent(s=>[...s,r.id])} disabled={sent.includes(r.id)}
                      style={{flex:1,padding:"9px",background:sent.includes(r.id)?GL:TX,color:sent.includes(r.id)?G:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,transition:"all .2s"}}>
                      {sent.includes(r.id)?"✓ Request Sent":"Send Connection Request"}
                    </button>
                    <button style={{padding:"9px 16px",background:"transparent",border:`1px solid ${BD}`,borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>Message</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="list"&&(
          <div style={{...cd,padding:"28px",maxWidth:560}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TX,marginBottom:18}}>Create your profile</p>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {[{l:"Your name",p:"Full name"},{l:"Age",p:"e.g. 27"},{l:"Occupation",p:"e.g. Designer at Shopify"},{l:"Budget / month",p:"e.g. $1,200–$1,500"}].map(f=>(
                <div key={f.l}><p style={{...lb,marginBottom:6}}>{f.l}</p><input style={inp} placeholder={f.p}/></div>
              ))}
              <div><p style={{...lb,marginBottom:6}}>About you</p>
                <textarea style={{...inp,height:90,resize:"none"}} placeholder="Describe your lifestyle, schedule, and what you're looking for..."/>
              </div>
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
