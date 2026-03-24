import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Info, Lock, Eye, FileText, Users, Bell, ChevronRight, Download, Building2 } from "lucide-react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

type Status="compliant"|"action_required"|"review";

interface ComplianceItem{
  id:string;title:string;description:string;status:Status;category:string;
  actions:string[];law:string;severity:"high"|"medium"|"low";
}

const COMPLIANCE_ITEMS:ComplianceItem[]=[
  {
    id:"pipeda_consent",title:"Tenant Data Collection Consent",
    description:"You must obtain explicit, informed consent from tenants before collecting personal information (name, SIN, employment, credit history).",
    status:"action_required",category:"Privacy",
    actions:["Add a consent checkbox to your rental application form","Explain what data is collected and why","Provide option to withdraw consent at any time","Store consent records with timestamp"],
    law:"PIPEDA s.6–7 / Bill C-27",severity:"high"
  },
  {
    id:"commercial_hst",title:"HST Registration — Commercial Landlord",
    description:"Landlords who collect commercial rent exceeding $30,000/year must register for and collect HST (13%) on base rent, CAM charges, and parking. Residential rent is HST-exempt; mixed-use properties must apportion.",
    status:"action_required",category:"Commercial",
    actions:["Register for a GST/HST business number via CRA My Business Account","Charge 13% HST on all commercial rent invoices","File HST returns (monthly, quarterly, or annually based on revenue)","Apportion HST for mixed-use properties using square footage ratio","Issue annual HST reconciliation statements to commercial tenants"],
    law:"Excise Tax Act (ETA) s.123 / CRA RC4022",severity:"high"
  },
  {
    id:"commercial_lease_law",title:"Commercial Tenancies Act — Landlord Obligations",
    description:"Commercial leases in Ontario are governed by the Commercial Tenancies Act, not the RTA. Landlords retain the right to distress (seizing goods for unpaid rent) and remedies differ significantly from residential.",
    status:"review",category:"Commercial",
    actions:["Ensure commercial leases include clear distress rights clause","Document all rent arrears with dated invoices","Understand that LTB has NO jurisdiction — commercial disputes go to Superior Court","Include dispute resolution clause in all commercial leases","Review right to re-enter and re-let provisions with a commercial real estate lawyer"],
    law:"Commercial Tenancies Act, R.S.O. 1990, c. L.7",severity:"high"
  },
  {
    id:"cam_disclosure",title:"CAM Charges — Disclosure & Reconciliation",
    description:"Common Area Maintenance (CAM) charges must be clearly defined in the lease. Landlords must provide annual CAM reconciliation statements showing estimated vs. actual costs.",
    status:"review",category:"Commercial",
    actions:["Define all CAM components in the lease (insurance, taxes, maintenance, utilities)","Issue estimated CAM schedule at lease start and each year","Provide audited CAM reconciliation within 90–120 days of year-end","Cap CAM increases in lease (e.g., 5% per year controllable costs)","Allow tenant audit rights for CAM charges"],
    law:"Commercial Tenancies Act + common law disclosure duties",severity:"medium"
  },
  {
    id:"corporate_entity_screening",title:"Business Tenant Due Diligence (LOI to Lease)",
    description:"Before executing a commercial lease, landlords must verify the tenant's corporate standing, creditworthiness, and obtain personal guarantees from principals where appropriate.",
    status:"action_required",category:"Commercial",
    actions:["Obtain a Certificate of Status from the Ontario Business Registry","Pull Dun & Bradstreet or Equifax Business credit report","Require financial statements for last 2 years (new businesses: 2-year projection)","Obtain personal guarantee from director(s) with >25% ownership","Verify HST registration number if tenant will be collecting HST"],
    law:"REBBA / CRA Business Registry / Commercial Tenancies Act",severity:"high"
  },
  {
    id:"superior_court_commercial",title:"Commercial Dispute Resolution — Superior Court",
    description:"Unlike residential tenancies, commercial rent disputes, evictions, and lease breaches are NOT heard by the LTB. Landlords must pursue remedies through the Ontario Superior Court of Justice.",
    status:"compliant",category:"Commercial",
    actions:["Kaya generates commercial demand letters for Superior Court filing","Do not file N4 or LTB forms for commercial tenants — these are invalid","For unpaid rent, pursue Small Claims (under $35K) or Superior Court (over $35K)","Retain a commercial real estate litigation lawyer for lease terminations","Include arbitration clauses in leases to reduce litigation costs"],
    law:"Courts of Justice Act / Commercial Tenancies Act s.19",severity:"medium"
  },
  {
    id:"ai_explainability",title:"AI Screening Decisions — Explainability",
    description:"When AI-assisted screening affects a rental decision, you must be able to explain how the decision was reached and give tenants the right to contest.",
    status:"action_required",category:"AI / Fairness",
    actions:["Enable AI decision explanations in Tenant Screening settings","Document the scoring factors used","Allow tenants to request a manual review","Keep a record of decisions for 2 years"],
    law:"PIPEDA s.4.3 / Ontario Human Rights Code",severity:"high"
  },
  {
    id:"human_rights",title:"Fair Screening — No Prohibited Grounds",
    description:"Tenant screening must not use prohibited grounds under the Ontario Human Rights Code: source of income, family status, race, religion, age, disability, and more.",
    status:"compliant",category:"Human Rights",
    actions:["Kaya's AI screening does not use prohibited ground variables","Do not ask about immigration status, children, or disability","Do not refuse ODSP/OW recipients without other cause","Train anyone helping with applications on OHRC rules"],
    law:"Ontario Human Rights Code s.2",severity:"high"
  },
  {
    id:"data_residency",title:"Canadian Data Residency",
    description:"Tenant data collected in Canada should be stored and processed in Canada to comply with provincial privacy laws and PIPEDA requirements.",
    status:"compliant",category:"Privacy",
    actions:["Kaya uses Supabase Canada (ca-central-1) for all data storage","No tenant data is transferred to US servers","Audit third-party integrations for cross-border data flows"],
    law:"PIPEDA s.4.1.3",severity:"medium"
  },
  {
    id:"credit_check_consent",title:"Credit Check Authorization",
    description:"Landlords must obtain written authorization from applicants before pulling a credit report through Equifax or TransUnion.",
    status:"action_required",category:"Privacy",
    actions:["Include explicit credit check authorization in application form","Specify which bureau(s) will be checked","Retain signed authorization for 2 years","Inform applicant if credit denial was a factor in rejection"],
    law:"PIPEDA + Equifax/TransUnion Terms",severity:"high"
  },
  {
    id:"data_retention",title:"Personal Data Retention Limits",
    description:"You cannot keep tenant personal information longer than necessary. Applications from rejected applicants should be deleted within a defined retention period.",
    status:"review",category:"Privacy",
    actions:["Set a 90-day auto-delete policy for rejected applications","Retain signed leases for 7 years (CRA requirement)","Shred or encrypt paper records before disposal","Document your retention policy in writing"],
    law:"PIPEDA s.4.5",severity:"medium"
  },
  {
    id:"casl",title:"Email & SMS Marketing Consent (CASL)",
    description:"Canada's Anti-Spam Legislation (CASL) requires explicit opt-in consent before sending promotional communications to tenants or leads.",
    status:"compliant",category:"Marketing",
    actions:["Kaya only sends transactional emails by default","Marketing emails require an explicit opt-in checkbox","All marketing emails include an unsubscribe link","CASL consent records are stored with timestamp"],
    law:"Canada Anti-Spam Legislation (CASL)",severity:"medium"
  },
  {
    id:"n4_accuracy",title:"LTB Notice Accuracy Requirements",
    description:"N-forms (N4, N5, N12, etc.) must include accurate dates, amounts, and addresses. Errors can be grounds for tenant challenges at the LTB.",
    status:"compliant",category:"LTB Compliance",
    actions:["Kaya auto-populates N4 from your rent ledger","Double-check termination dates using the LTB date calculator","Confirm service method matches what you'll declare","Keep a copy of all served notices"],
    law:"Residential Tenancies Act, 2006",severity:"medium"
  },
];

const STATUS_CONFIG:{[k in Status]:{label:string;color:string;bg:string;icon:React.ReactNode}}={
  compliant:{label:"Compliant",color:G,bg:GL,icon:<CheckCircle2 size={14}/>},
  action_required:{label:"Action Required",color:"#C0392B",bg:"#FDECEA",icon:<XCircle size={14}/>},
  review:{label:"Review Needed",color:"#B45309",bg:"#FEF3C7",icon:<AlertTriangle size={14}/>},
};

const SEVERITY_COLOR:{[k:string]:string}={high:"#C0392B",medium:"#B45309",low:G};

export default function ComplianceCenter(){
  const [activeItem,setActiveItem]=useState<string|null>(null);
  const [filterCat,setFilterCat]=useState("All");
  const [mode,setMode]=useState<"residential"|"commercial">("residential");

  const switchMode=(m:"residential"|"commercial")=>{setMode(m);setFilterCat("All");setActiveItem(null);};

  const allItems = mode==="commercial"
    ? COMPLIANCE_ITEMS.filter(i=>i.category==="Commercial"||i.category==="Privacy"||i.category==="Marketing")
    : COMPLIANCE_ITEMS.filter(i=>i.category!=="Commercial");

  const cats=["All",...Array.from(new Set(allItems.map(i=>i.category)))];
  const filtered=filterCat==="All"?allItems:allItems.filter(i=>i.category===filterCat);

  const compliantCount=allItems.filter(i=>i.status==="compliant").length;
  const actionCount=allItems.filter(i=>i.status==="action_required").length;
  const reviewCount=allItems.filter(i=>i.status==="review").length;
  const score=Math.round((compliantCount/allItems.length)*100);

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <ShieldCheck size={22} color={G}/>
              </div>
              <div>
                <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>Compliance Centre</h1>
                <p style={{fontSize:14,color:MU,margin:0}}>
                  {mode==="residential"?"PIPEDA · Ontario Human Rights Code · CASL · LTB Requirements":"Commercial Tenancies Act · HST (ETA) · REBBA · Superior Court"}
                </p>
              </div>
            </div>
            {/* Mode toggle */}
            <div style={{display:"flex",background:"#fff",border:`1px solid ${BD}`,borderRadius:10,padding:4,gap:4,flexShrink:0}}>
              {(["residential","commercial"] as const).map(m=>(
                <button key={m} onClick={()=>switchMode(m)}
                  style={{padding:"7px 16px",borderRadius:7,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",
                    background:mode===m?TX:"transparent",color:mode===m?"#fff":MU,transition:"all .2s",display:"flex",alignItems:"center",gap:6}}>
                  {m==="commercial"&&<Building2 size={13}/>}
                  {m.charAt(0).toUpperCase()+m.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Score cards */}
        <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20,marginBottom:28}}>
          {/* Score circle */}
          <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} style={{...cd,padding:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{position:"relative",width:100,height:100,marginBottom:12}}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke={BD} strokeWidth="8"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke={score>=80?G:score>=60?"#F59E0B":"#C0392B"} strokeWidth="8"
                  strokeDasharray={`${score*2.64} 264`} strokeLinecap="round" transform="rotate(-90 50 50)"/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:24,fontWeight:700,color:TX}}>{score}%</span>
              </div>
            </div>
            <div style={{fontSize:13,fontWeight:700,color:TX,textAlign:"center"}}>Compliance Score</div>
            <div style={{fontSize:11,color:MU,marginTop:2,textAlign:"center"}}>{compliantCount}/{COMPLIANCE_ITEMS.length} items passing</div>
          </motion.div>

          {/* Status breakdown */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {[
              {label:"Compliant",value:compliantCount,color:G,bg:GL,icon:"✅"},
              {label:"Action Required",value:actionCount,color:"#C0392B",bg:"#FDECEA",icon:"🚨"},
              {label:"Review Needed",value:reviewCount,color:"#B45309",bg:"#FEF3C7",icon:"⚠️"},
            ].map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
                style={{...cd,padding:"18px 20px"}}>
                <div style={{fontSize:26,marginBottom:6}}>{s.icon}</div>
                <div style={{fontSize:28,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
                <div style={{fontSize:13,fontWeight:600,color:TX}}>{s.label}</div>
              </motion.div>
            ))}
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.3}}
              style={{...cd,padding:"18px 20px",gridColumn:"1/-1",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Info size={16} color="#1E5FA8"/>
                <span style={{fontSize:13,color:"#1E5FA8"}}>
                  {actionCount>0
                    ? `You have ${actionCount} high-priority compliance action${actionCount>1?"s":""} to address. Resolve these before your next tenant application.`
                    : "Your compliance posture is strong. Continue reviewing items marked for review."}
                </span>
              </div>
              <button onClick={()=>toast.success("Compliance report ready",{description:"Your PIPEDA, Human Rights Code, and CASL compliance summary has been prepared. A full PDF report will be available in the pro tier."})} style={{padding:"8px 16px",background:"#EBF2FB",color:"#1E5FA8",borderRadius:8,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                Download Report
              </button>
            </motion.div>
          </div>
        </div>

        {/* Category filter */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setFilterCat(c)}
              style={{padding:"7px 16px",borderRadius:20,border:`1.5px solid ${filterCat===c?G:BD}`,
                background:filterCat===c?G:"#fff",color:filterCat===c?"#fff":MU,
                fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>
              {c}
            </button>
          ))}
        </div>

        {/* Compliance items */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtered.map((item,i)=>{
            const st=STATUS_CONFIG[item.status];
            const isOpen=activeItem===item.id;
            return(
              <motion.div key={item.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
                <div style={{...cd,overflow:"hidden",border:`1.5px solid ${isOpen?G:item.status==="action_required"?"#FECACA":BD}`}}>
                  <div onClick={()=>setActiveItem(isOpen?null:item.id)}
                    style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:st.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:st.color}}>
                      {st.icon}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                        <span style={{fontSize:14,fontWeight:600,color:TX}}>{item.title}</span>
                        <span style={{background:st.bg,color:st.color,fontSize:11,fontWeight:600,padding:"2px 9px",borderRadius:20}}>{st.label}</span>
                        <span style={{background:SEVERITY_COLOR[item.severity]+"15",color:SEVERITY_COLOR[item.severity],fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"uppercase",letterSpacing:"0.5px"}}>{item.severity}</span>
                      </div>
                      <div style={{fontSize:12,color:MU}}>{item.category} · {item.law}</div>
                    </div>
                    <ChevronRight size={16} color={MU} style={{transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}/>
                  </div>

                  <AnimatePresence>
                    {isOpen&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                        transition={{duration:.25}} style={{overflow:"hidden"}}>
                        <div style={{padding:"0 20px 20px",borderTop:`1px solid ${BD}`}}>
                          <p style={{fontSize:13,color:MU,margin:"14px 0"}}>{item.description}</p>
                          <h4 style={{fontSize:12,fontWeight:700,color:TX,textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 10px"}}>Required Actions</h4>
                          <div style={{display:"flex",flexDirection:"column",gap:7}}>
                            {item.actions.map((a,ai)=>(
                              <div key={ai} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 12px",background:BG,borderRadius:8}}>
                                <div style={{width:20,height:20,borderRadius:"50%",background:item.status==="compliant"?GL:"#FDECEA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                                  {item.status==="compliant"
                                    ? <CheckCircle2 size={11} color={G}/>
                                    : <span style={{fontSize:10,fontWeight:700,color:"#C0392B"}}>{ai+1}</span>
                                  }
                                </div>
                                <span style={{fontSize:13,color:TX}}>{a}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{marginTop:14,padding:"10px 14px",background:"#EBF2FB",borderRadius:9,display:"flex",gap:8}}>
                            <Lock size={13} color="#1E5FA8" style={{flexShrink:0,marginTop:1}}/>
                            <span style={{fontSize:12,color:"#1E5FA8"}}><strong>Legal reference:</strong> {item.law}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resources section */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.5}}
          style={{...cd,padding:24,marginTop:24}}>
          <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 16px",fontFamily:SERIF}}>Compliance Resources</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[
              {title:"PIPEDA Privacy Law Guide",desc:"Office of the Privacy Commissioner of Canada",url:"https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/",icon:"🔒"},
              {title:"Ontario Human Rights Code",desc:"OHRC tenant screening guidelines",url:"https://www.ohrc.on.ca/en/human-rights-and-rental-housing",icon:"⚖️"},
              {title:"CASL Compliance Guide",desc:"Anti-Spam Legislation — landlord obligations",url:"https://fightspam.gc.ca/eic/site/030.nsf/eng/home",icon:"📧"},
            ].map(r=>(
              <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{...{background:BG,border:`1px solid ${BD}`,borderRadius:12,padding:"14px",display:"flex",gap:10,textDecoration:"none"}}}>
                <span style={{fontSize:22}}>{r.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:TX,marginBottom:3}}>{r.title}</div>
                  <div style={{fontSize:11,color:MU}}>{r.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
