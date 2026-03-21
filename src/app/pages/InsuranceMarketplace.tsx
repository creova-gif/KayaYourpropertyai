import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Star, ChevronRight, CheckCircle2, Phone, ExternalLink, Info, TrendingDown, Home, DollarSign } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

interface InsuranceProvider{
  id:string;name:string;logo:string;rating:number;reviews:number;
  monthlyFrom:number;coverage:string[];highlights:string[];
  bestFor:string;badge?:string;brokerPartner:boolean;
  categories:string[];claimRating:number;
}

const PROVIDERS:InsuranceProvider[]=[
  {
    id:"square-one",name:"Square One Insurance",logo:"🟦",rating:4.8,reviews:2847,monthlyFrom:28,
    coverage:["Rental property","Liability ($2M)","Loss of rent (12 mo)","Water damage","Earthquake add-on"],
    highlights:["Instant online quotes","No broker needed","Cancel anytime","Covers short-term rentals"],
    bestFor:"Small landlords with 1–5 properties",badge:"Kaya Recommended",brokerPartner:true,
    categories:["landlord","condo","multi-unit"],claimRating:4.7
  },
  {
    id:"aviva",name:"Aviva Canada",logo:"🔴",rating:4.5,reviews:5213,monthlyFrom:35,
    coverage:["Rental dwelling","Personal liability ($1M–$5M)","Loss of rental income","Vandalism","Legal expense add-on"],
    highlights:["Canada's largest insurer","Multi-property discounts","LTB eviction cost coverage","24/7 claims"],
    bestFor:"Landlords with 5+ properties or commercial units",badge:undefined,brokerPartner:true,
    categories:["landlord","multi-unit","commercial"],claimRating:4.4
  },
  {
    id:"intact",name:"Intact Insurance",logo:"🟢",rating:4.6,reviews:4102,monthlyFrom:32,
    coverage:["Rental home","Liability up to $5M","Lost rent coverage","All-risk contents","Flood add-on"],
    highlights:["Largest P&C insurer in Canada","Fast claim payouts","Discount for alarm/sprinkler systems","Multi-policy bundle"],
    bestFor:"Landlords who want all-risk coverage with high limits",badge:undefined,brokerPartner:true,
    categories:["landlord","condo","multi-unit"],claimRating:4.5
  },
  {
    id:"brokerlink",name:"BrokerLink",logo:"🔷",rating:4.4,reviews:1689,monthlyFrom:30,
    coverage:["Rental property","Liability","Loss of income","Scheduled property","Umbrella policy"],
    highlights:["Shops 30+ insurers","One contact for all claims","Landlord bundle discounts","Kaya data export for claims"],
    bestFor:"Landlords who want a broker to compare and manage policies",badge:undefined,brokerPartner:true,
    categories:["landlord","commercial","specialty"],claimRating:4.3
  },
  {
    id:"wawanesa",name:"Wawanesa Insurance",logo:"🟡",rating:4.3,reviews:2104,monthlyFrom:26,
    coverage:["Rental property","Liability","Loss of rent","Fire & theft","Additional structures"],
    highlights:["Competitive pricing","No claims discount","Long-term customer rewards","Strong Western Canada presence"],
    bestFor:"Budget-conscious landlords, especially in Ontario and Western Canada",badge:"Best Value",brokerPartner:false,
    categories:["landlord","condo"],claimRating:4.2
  },
];

const COVERAGE_TYPES=[
  {icon:"🏠",title:"Rental Dwelling",desc:"Protects the physical structure of your rental property against fire, wind, water, and more."},
  {icon:"⚖️",title:"Personal Liability",desc:"Covers you if a tenant or visitor is injured on the property and sues for damages."},
  {icon:"💰",title:"Loss of Rental Income",desc:"Pays your lost rent if the property becomes uninhabitable due to a covered event."},
  {icon:"🔨",title:"Vandalism & Malicious Damage",desc:"Covers damage intentionally caused by tenants or third parties — critical for landlords."},
  {icon:"💧",title:"Water Damage",desc:"Covers sudden water damage (burst pipes, appliance leaks). Flood add-on often available."},
  {icon:"🏛️",title:"Legal Expense Coverage",desc:"Covers legal costs for LTB disputes, evictions, or tenant lawsuits. Add-on with select providers."},
];

const TIPS=[
  "Review your coverage annually — property values and replacement costs change",
  "Require tenants to have renter's insurance — it reduces your liability exposure",
  "Bundle with your home insurance for multi-policy discounts of 10–20%",
  "Keep a digital inventory of appliances and fixtures — photos + serial numbers",
  "Report all potential claims promptly — late reporting can void coverage",
];

function StarRating({rating,small=false}:{rating:number;small?:boolean}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:3}}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={small?10:13} fill={i<=Math.round(rating)?"#F59E0B":"none"} color="#F59E0B"/>
      ))}
      <span style={{fontSize:small?10:12,fontWeight:600,color:TX,marginLeft:2}}>{rating.toFixed(1)}</span>
    </div>
  );
}

export default function InsuranceMarketplace(){
  const [activeFilter,setActiveFilter]=useState("All");
  const [selected,setSelected]=useState<string|null>(null);

  const filters=["All","landlord","condo","multi-unit","commercial"];
  const filtered=activeFilter==="All"?PROVIDERS:PROVIDERS.filter(p=>p.categories.includes(activeFilter));

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Shield size={22} color={G}/>
            </div>
            <div>
              <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>Landlord Insurance Marketplace</h1>
              <p style={{fontSize:14,color:MU,margin:0}}>Compare Canada's top landlord insurance providers — get quotes in minutes</p>
            </div>
          </div>
          <div style={{background:GL,border:`1px solid ${G}33`,borderRadius:12,padding:"13px 18px",display:"flex",gap:10,alignItems:"flex-start",marginTop:12}}>
            <Info size={15} color={G} style={{flexShrink:0,marginTop:1}}/>
            <span style={{fontSize:13,color:G}}>Kaya has partnerships with all providers below. When you request a quote, we send your property details automatically — no need to re-enter information.</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Avg. Monthly Premium",value:"$31",icon:"💳",color:G,sub:"For 1 rental property"},
            {label:"Avg. Savings vs. Standalone",value:"18%",icon:"📉",color:"#059669",sub:"With Kaya bundle discount"},
            {label:"Claims Paid in 2025",value:"94%",icon:"✅",color:G,sub:"Within 30 days — industry avg"},
            {label:"Partner Providers",value:"5",icon:"🤝",color:"#1E5FA8",sub:"Vetted Canadian insurers"},
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{...cd,padding:"16px 18px"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
              <div style={{fontSize:12,fontWeight:600,color:TX,marginTop:1}}>{s.label}</div>
              <div style={{fontSize:11,color:MU,marginTop:1}}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setActiveFilter(f)}
              style={{padding:"7px 16px",borderRadius:20,border:`1.5px solid ${activeFilter===f?G:BD}`,
                background:activeFilter===f?G:"#fff",color:activeFilter===f?"#fff":MU,
                fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s",textTransform:"capitalize"}}>
              {f==="All"?"All Types":f}
            </button>
          ))}
        </div>

        {/* Provider cards */}
        <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:32}}>
          {filtered.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              style={{...cd,overflow:"hidden",border:`1.5px solid ${selected===p.id?G:BD}`}}>
              <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"60px 1fr auto auto",gap:20,alignItems:"center"}}>
                <div style={{width:56,height:56,borderRadius:12,background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,border:`1px solid ${BD}`}}>
                  {p.logo}
                </div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:16,fontWeight:700,color:TX}}>{p.name}</span>
                    {p.badge&&<span style={{background:GL,color:G,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20}}>{p.badge}</span>}
                    {p.brokerPartner&&<span style={{background:"#EBF2FB",color:"#1E5FA8",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>Kaya Partner</span>}
                  </div>
                  <StarRating rating={p.rating}/>
                  <div style={{fontSize:12,color:MU,marginTop:4}}>{p.reviews.toLocaleString()} reviews · Claims satisfaction: {p.claimRating}/5</div>
                  <div style={{fontSize:12,color:MU,marginTop:3}}>✓ {p.bestFor}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:12,color:MU,marginBottom:3}}>From</div>
                  <div style={{fontSize:26,fontWeight:700,color:G,fontFamily:SERIF}}>${p.monthlyFrom}</div>
                  <div style={{fontSize:11,color:MU}}>/month</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <button style={{padding:"10px 20px",background:G,color:"#fff",borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                    Get Quote →
                  </button>
                  <button onClick={()=>setSelected(selected===p.id?null:p.id)}
                    style={{padding:"8px 16px",background:"transparent",color:MU,borderRadius:9,border:`1px solid ${BD}`,fontSize:12,fontWeight:500,cursor:"pointer"}}>
                    {selected===p.id?"Hide Details":"View Details"}
                  </button>
                </div>
              </div>

              {selected===p.id&&(
                <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                  style={{borderTop:`1px solid ${BD}`,overflow:"hidden"}}>
                  <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
                    <div>
                      <h4 style={{fontSize:13,fontWeight:700,color:TX,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Coverage Includes</h4>
                      {p.coverage.map((c,ci)=>(
                        <div key={ci} style={{display:"flex",gap:8,alignItems:"center",marginBottom:7}}>
                          <CheckCircle2 size={13} color={G}/>
                          <span style={{fontSize:13,color:TX}}>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 style={{fontSize:13,fontWeight:700,color:TX,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:"0.5px"}}>Why Landlords Choose {p.name}</h4>
                      {p.highlights.map((h,hi)=>(
                        <div key={hi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
                          <Star size={12} fill="#F59E0B" color="#F59E0B" style={{flexShrink:0,marginTop:2}}/>
                          <span style={{fontSize:13,color:TX}}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Coverage types education */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.4}} style={{...cd,padding:28,marginBottom:24}}>
          <h3 style={{fontSize:18,fontWeight:700,color:TX,margin:"0 0 4px",fontFamily:SERIF}}>What Should My Policy Cover?</h3>
          <p style={{fontSize:13,color:MU,margin:"0 0 20px"}}>A comprehensive landlord policy typically includes these coverage types:</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {COVERAGE_TYPES.map((c,i)=>(
              <div key={i} style={{background:BG,borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontSize:22,marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:TX,marginBottom:4}}>{c.title}</div>
                <div style={{fontSize:12,color:MU,lineHeight:1.5}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.5}} style={{...cd,padding:24}}>
          <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 14px",fontFamily:SERIF}}>Landlord Insurance Tips</h3>
          {TIPS.map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<TIPS.length-1?`1px solid ${BD}`:"none"}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:700,color:G}}>{i+1}</div>
              <span style={{fontSize:13,color:TX}}>{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
