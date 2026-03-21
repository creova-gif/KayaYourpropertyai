import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};
const lb:React.CSSProperties={fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px"};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

function KCard({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){
  return(
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay,duration:.4,ease:[.22,1,.36,1]}}
      whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}} style={{...cd,...style}}>
      {children}
    </motion.div>
  );
}

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

export function VendorMarketplace(){
  const [cat,setCat]=useState("all");
  const [booking,setBooking]=useState<string|null>(null);

  const filtered=cat==="all"?vendors:vendors.filter(v=>v.cat===cat);

  return(
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

        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {categories.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{padding:"8px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:cat===c.id?TX:"#fff",color:cat===c.id?"#fff":MU,borderColor:cat===c.id?TX:BD,transition:"all .15s"}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

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
                      {v.badge==="Top rated"?<Badge t="★ Top rated" c="amber"/>:<Badge t="✓ Verified" c="green"/>}
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
                <button onClick={()=>setBooking(v.id)} style={{flex:1,padding:"9px",background:G,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
                  Book now
                </button>
                <button style={{padding:"9px 14px",border:`1px solid ${BD}`,borderRadius:8,background:"transparent",fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>
                  View profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {booking&&(()=>{
            const v=vendors.find(x=>x.id===booking)!;
            return(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}}>
                <motion.div initial={{scale:.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.92,opacity:0}}
                  style={{background:"#fff",borderRadius:20,padding:32,width:440,maxHeight:"80vh",overflowY:"auto"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
                    <p style={{fontFamily:SERIF,fontSize:24,color:TX}}>Book {v.name}</p>
                    <button onClick={()=>setBooking(null)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={MU}/></button>
                  </div>
                  {["Assign to maintenance request","Preferred date","Access instructions"].map(f=>(
                    <div key={f} style={{marginBottom:14}}>
                      <p style={{...lb,marginBottom:7}}>{f}</p>
                      <input style={inp} placeholder={f.includes("request")?"Select maintenance ticket...":f.includes("date")?"Select date...":"e.g. Key under mat, call on arrival"}/>
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
