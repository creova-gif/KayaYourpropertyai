import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, AlertTriangle, CheckCircle2, Clock, FileText, ChevronRight, ChevronDown, Download, Send, Phone, Calendar, Circle, ArrowRight, Info, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};

function Badge({t,c="green"}:{t:string;c?:"green"|"amber"|"red"|"gray"|"blue"}){
  const m:{[k:string]:[string,string]}={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MU],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[c]||[BG,MU];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{t}</span>;
}

const STEPS=[
  {
    id:1, title:"Non-Payment Detected", icon:"💰", tag:"Step 1",
    description:"Rent is overdue. Document the missed payment before anything else.",
    timeline:"Day 1–3",
    actions:[
      "Confirm rent was due and not received",
      "Send a friendly reminder by text/email",
      "Wait 1–2 business days for a response",
      "Log the non-payment in Kaya's rent tracker",
    ],
    form:null,
    tip:"Many late payments resolve with a simple reminder. Only proceed to N4 if the tenant hasn't paid after a few days.",
    status:"complete"
  },
  {
    id:2, title:"Issue N4 Notice to End Tenancy", icon:"📄", tag:"Step 2",
    description:"Serve the tenant a Notice to End Tenancy Early for Non-payment of Rent (N4).",
    timeline:"Day 4–7",
    actions:[
      "Fill out the N4 form with exact rent owed and due date",
      "Specify the termination date (14 days from serving)",
      "Serve the N4 in person, by mail, or by courier",
      "Keep a copy — you'll need it at the LTB hearing",
    ],
    form:"N4",
    tip:"Double-check the rent amount and dates. Since 2024, minor clerical errors won't auto-dismiss your case, but accuracy matters.",
    status:"active"
  },
  {
    id:3, title:"Wait 14 Days", icon:"⏳", tag:"Step 3",
    description:"The tenant has 14 days to pay the full amount or move out voluntarily.",
    timeline:"Day 7–21",
    actions:[
      "Do not harass, threaten, or lock out the tenant",
      "Keep all communication professional and in writing",
      "If tenant pays in full, void the N4 — the tenancy continues",
      "If tenant doesn't pay or vacate, proceed to L1",
    ],
    form:null,
    tip:"If the tenant pays all arrears before the LTB hearing, the application is often dismissed. This is normal.",
    status:"pending"
  },
  {
    id:4, title:"File L1 Application with LTB", icon:"⚖️", tag:"Step 4",
    description:"File the L1 Application to Evict a Tenant for Non-payment of Rent with the Landlord and Tenant Board.",
    timeline:"Day 22–30",
    actions:[
      "Complete the L1 form (referencing your N4)",
      "Pay the LTB filing fee (~$201 online, $186 in-person)",
      "File online at Tribunals Ontario Portal or in-person",
      "Keep your Application Number for tracking",
    ],
    form:"L1",
    tip:"Filing online is faster. You'll receive a hearing date by mail or email — typically 4–12 weeks away depending on location.",
    status:"pending"
  },
  {
    id:5, title:"Gather Evidence for Hearing", icon:"📂", tag:"Step 5",
    description:"Prepare your case for the LTB hearing. Evidence wins cases.",
    timeline:"2–8 weeks before hearing",
    actions:[
      "Compile rent payment history (Kaya exports this automatically)",
      "Gather bank records, e-transfer records, or cheque copies",
      "Print the original signed lease agreement",
      "Collect all written communications with the tenant",
      "Prepare a ledger showing all amounts owed",
    ],
    form:null,
    tip:"The LTB now allows digital evidence. Share your Kaya rent ledger export directly at the hearing.",
    status:"pending"
  },
  {
    id:6, title:"Attend LTB Hearing", icon:"🏛️", tag:"Step 6",
    description:"Present your case at the scheduled LTB hearing (most are done by video or phone).",
    timeline:"Hearing date",
    actions:[
      "Join via Microsoft Teams or phone as directed",
      "Present your N4, L1, lease, and payment ledger",
      "Be professional — state facts, not emotions",
      "If tenant doesn't appear, the order is typically granted",
      "Request a 'standard order' for eviction + arrears",
    ],
    form:null,
    tip:"Most L1 hearings are under 30 minutes. The adjudicator will ask for the rent owing, the notice date, and whether the tenant has paid anything since filing.",
    status:"pending"
  },
  {
    id:7, title:"Receive LTB Order", icon:"📋", tag:"Step 7",
    description:"The LTB issues a written order — typically within 5–10 business days of the hearing.",
    timeline:"5–10 days after hearing",
    actions:[
      "Review the order for accuracy (amounts, dates, names)",
      "File for review/appeal within 30 days if there's an error",
      "If tenant pays in full before enforcement, the eviction stops",
      "Proceed to Sheriff enforcement if tenant won't vacate",
    ],
    form:null,
    tip:"The order usually gives the tenant one last opportunity to pay (called 'Relief from Eviction'). Many landlords recover funds at this stage.",
    status:"pending"
  },
  {
    id:8, title:"Sheriff Enforcement", icon:"🔑", tag:"Step 8",
    description:"If the tenant still hasn't vacated, file with the Court Enforcement Office (Sheriff) to carry out the eviction.",
    timeline:"2–6 weeks after order",
    actions:[
      "File the LTB Order with your local Court Enforcement Office",
      "Pay the Sheriff enforcement fee (~$355 in Ontario)",
      "The Sheriff will schedule an enforcement date",
      "Be present on enforcement day — you may change locks immediately after",
      "Document the unit condition with timestamped photos",
    ],
    form:null,
    tip:"Sheriff wait times vary by region. Toronto can take 4–8 weeks; smaller cities may be faster. You cannot change locks until the Sheriff executes the order.",
    status:"pending"
  },
];

const FORMS:{[k:string]:{description:string;fields:string[];url:string}}={
  N4:{
    description:"Notice to End Tenancy Early for Non-payment of Rent",
    fields:["Tenant's name and address","Landlord's name and address","Amount of rent owed","Rental period (month/year)","Termination date (14 days from service)","Date of service","Method of service"],
    url:"https://tribunalsontario.ca/ltb/forms/"
  },
  L1:{
    description:"Application to Evict a Tenant for Non-payment of Rent and to Collect Rent the Tenant Owes",
    fields:["Reference to N4 served","Total rent arrears to date of application","Filing fee amount","Details of all months with unpaid rent","Prior payments made since N4","Requested termination date"],
    url:"https://tribunalsontario.ca/ltb/forms/"
  }
};

const TIMELINE_STATS=[
  {label:"Typical L1 to Hearing",value:"4–12 wks",icon:"📅",color:G},
  {label:"Sheriff Wait Time",value:"4–8 wks",icon:"🔑",color:"#B45309"},
  {label:"Total Door-to-Door",value:"5–8 mo",icon:"⏱️",color:"#C0392B"},
  {label:"LTB Filing Fee",value:"$201",icon:"💳",color:"#1E5FA8"},
];

export default function LTBWorkflow(){
  const [activeStep,setActiveStep]=useState(2);
  const [activeCase,setActiveCase]=useState<string|null>(null);
  const [showForm,setShowForm]=useState<string|null>(null);
  const [tenantName,setTenantName]=useState("");
  const [rentAmt,setRentAmt]=useState("");
  const [n4Date,setN4Date]=useState("");

  return(
    <div style={pg}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Scale size={22} color={G}/>
            </div>
            <div>
              <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>LTB Workflow Engine</h1>
              <p style={{fontSize:14,color:MU,margin:0}}>Ontario Landlord and Tenant Board — Step-by-step eviction guide</p>
            </div>
          </div>

          {/* Warning banner */}
          <div style={{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:12,padding:"14px 18px",display:"flex",gap:12,alignItems:"flex-start",marginTop:16}}>
            <TriangleAlert size={18} color="#B45309" style={{flexShrink:0,marginTop:1}}/>
            <div>
              <span style={{fontSize:13,fontWeight:600,color:"#92400E"}}>Legal Disclaimer: </span>
              <span style={{fontSize:13,color:"#92400E"}}>This workflow is a general guide only and does not constitute legal advice. For complex situations, consult a licensed Ontario paralegal or lawyer. Forms must be filed through the official <a href="https://tribunalsontario.ca/ltb/" target="_blank" rel="noopener noreferrer" style={{color:"#B45309"}}>Tribunals Ontario portal</a>.</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:32}}>
          {TIMELINE_STATS.map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{...cd,padding:"16px 18px",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
              <div style={{fontSize:12,color:MU,marginTop:2}}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:24,alignItems:"start"}}>

          {/* Steps */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {STEPS.map((step,i)=>{
              const isActive=activeStep===step.id;
              const isDone=step.status==="complete"||(step.id<activeStep);
              return(
                <motion.div key={step.id} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}>
                  <div
                    onClick={()=>setActiveStep(isActive?0:step.id)}
                    style={{...cd,cursor:"pointer",overflow:"hidden",border:`1.5px solid ${isActive?G:BD}`,transition:"all .25s"}}
                  >
                    {/* Step header */}
                    <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,background:isActive?GL:"#fff"}}>
                      <div style={{width:40,height:40,borderRadius:10,background:isDone?G:isActive?GL:"#F1F1EE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {isDone
                          ? <CheckCircle2 size={20} color="#fff"/>
                          : <span style={{fontSize:18}}>{step.icon}</span>
                        }
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                          <span style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.6px"}}>{step.tag}</span>
                          <Badge t={step.timeline} c={isDone?"green":isActive?"amber":"gray"}/>
                        </div>
                        <div style={{fontSize:15,fontWeight:600,color:TX}}>{step.title}</div>
                      </div>
                      {isActive
                        ? <ChevronDown size={18} color={MU}/>
                        : <ChevronRight size={18} color={MU}/>
                      }
                    </div>

                    {/* Step body */}
                    <AnimatePresence>
                      {isActive&&(
                        <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                          transition={{duration:.25}} style={{overflow:"hidden"}}>
                          <div style={{padding:"0 20px 20px",borderTop:`1px solid ${BD}`}}>
                            <p style={{fontSize:13,color:MU,marginTop:14,marginBottom:14}}>{step.description}</p>
                            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                              {step.actions.map((a,ai)=>(
                                <div key={ai} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                                  <div style={{width:22,height:22,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                                    <span style={{fontSize:11,fontWeight:700,color:G}}>{ai+1}</span>
                                  </div>
                                  <span style={{fontSize:13,color:TX}}>{a}</span>
                                </div>
                              ))}
                            </div>
                            {step.tip&&(
                              <div style={{background:"#EBF2FB",borderRadius:10,padding:"10px 14px",display:"flex",gap:8,marginBottom:14}}>
                                <Info size={15} color="#1E5FA8" style={{flexShrink:0,marginTop:1}}/>
                                <span style={{fontSize:12,color:"#1E5FA8"}}><strong>Tip:</strong> {step.tip}</span>
                              </div>
                            )}
                            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                              {step.form&&(
                                <button onClick={(e)=>{e.stopPropagation();setShowForm(step.form)}}
                                  style={{padding:"9px 16px",background:G,color:"#fff",borderRadius:9,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                                  <FileText size={14}/> Generate {step.form} Form
                                </button>
                              )}
                              {step.id===4&&(
                                <a href="https://tribunalsontario.ca/ltb/forms/" target="_blank" rel="noopener noreferrer"
                                  style={{padding:"9px 16px",background:"#fff",color:G,borderRadius:9,border:`1.5px solid ${G}`,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,textDecoration:"none"}}>
                                  <Send size={14}/> File Online with LTB
                                </a>
                              )}
                              {step.id<8&&(
                                <button onClick={(e)=>{e.stopPropagation();setActiveStep(step.id+1)}}
                                  style={{padding:"9px 16px",background:BG,color:TX,borderRadius:9,border:`1px solid ${BD}`,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                                  Next Step <ArrowRight size={14}/>
                                </button>
                              )}
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

          {/* Sidebar */}
          <div style={{display:"flex",flexDirection:"column",gap:16,position:"sticky",top:24}}>

            {/* Active Case Tracker */}
            <motion.div initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:.2}} style={{...cd,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 14px"}}>📁 Case Tracker</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {STEPS.map(s=>(
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:9,background:activeStep===s.id?GL:"transparent",cursor:"pointer"}}
                    onClick={()=>setActiveStep(s.id)}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:s.id<activeStep?G:activeStep===s.id?"#F59E0B":BG,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {s.id<activeStep
                        ? <CheckCircle2 size={12} color="#fff"/>
                        : <span style={{fontSize:10,fontWeight:700,color:activeStep===s.id?"#fff":MU}}>{s.id}</span>
                      }
                    </div>
                    <span style={{fontSize:12,fontWeight:activeStep===s.id?600:400,color:activeStep===s.id?TX:MU}}>{s.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Emergency contacts */}
            <motion.div initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:.3}} style={{...cd,padding:20}}>
              <h3 style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 14px"}}>📞 Key Contacts</h3>
              {[
                {label:"LTB Customer Service",value:"416-645-8080"},
                {label:"Tribunals Ontario",value:"1-888-332-3234"},
                {label:"Court Enforcement (Toronto)",value:"416-326-2300"},
                {label:"CLEO LTB Help",value:"cleo.on.ca"},
              ].map(c=>(
                <div key={c.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${BD}`}}>
                  <span style={{fontSize:12,color:MU}}>{c.label}</span>
                  <span style={{fontSize:12,fontWeight:600,color:TX}}>{c.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Paralegal CTA */}
            <motion.div initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:.35}}
              style={{...cd,padding:20,background:G,border:"none"}}>
              <div style={{fontSize:20,marginBottom:8}}>⚖️</div>
              <h3 style={{fontSize:14,fontWeight:700,color:"#fff",margin:"0 0 6px"}}>Need a Paralegal?</h3>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.75)",margin:"0 0 14px"}}>Connect with Ontario-licensed paralegals who specialize in LTB hearings for as low as $150/hearing.</p>
              <a href="/app/paralegal" style={{display:"block",padding:"10px",background:"rgba(255,255,255,0.15)",borderRadius:9,color:"#fff",fontWeight:600,fontSize:13,textAlign:"center",textDecoration:"none",border:"1px solid rgba(255,255,255,0.2)"}}>
                Browse Paralegals →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* N4 / L1 Form Modal */}
      <AnimatePresence>
        {showForm&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}
            onClick={()=>setShowForm(null)}>
            <motion.div initial={{scale:.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.95,opacity:0}}
              style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:560,maxHeight:"85vh",overflow:"auto"}}
              onClick={e=>e.stopPropagation()}>
              <div style={{padding:"24px 28px",borderBottom:`1px solid ${BD}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <h2 style={{fontSize:20,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>{showForm} Form Generator</h2>
                    <p style={{fontSize:13,color:MU,marginTop:4}}>{FORMS[showForm]?.description}</p>
                  </div>
                  <button onClick={()=>setShowForm(null)} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:MU}}>✕</button>
                </div>
              </div>
              <div style={{padding:"24px 28px"}}>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Tenant Name</label>
                    <input value={tenantName} onChange={e=>setTenantName(e.target.value)} placeholder="e.g. John Smith"
                      style={{width:"100%",padding:"10px 13px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Monthly Rent Amount (CAD)</label>
                    <input value={rentAmt} onChange={e=>setRentAmt(e.target.value)} placeholder="e.g. 2200"
                      style={{width:"100%",padding:"10px 13px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:MU,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>Date of Service</label>
                    <input type="date" value={n4Date} onChange={e=>setN4Date(e.target.value)}
                      style={{width:"100%",padding:"10px 13px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                </div>

                <div style={{marginTop:20,padding:16,background:BG,borderRadius:10}}>
                  <h4 style={{fontSize:12,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.5px",margin:"0 0 10px"}}>Required Fields for {showForm}</h4>
                  {FORMS[showForm]?.fields.map((f,i)=>(
                    <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
                      <CheckCircle2 size={13} color={G} style={{flexShrink:0,marginTop:2}}/>
                      <span style={{fontSize:12,color:TX}}>{f}</span>
                    </div>
                  ))}
                </div>

                <div style={{marginTop:18,display:"flex",gap:10}}>
                  <button onClick={()=>toast.success(`${showForm} form prepared`,{description:"Complete the fields above, then click Official LTB Form to file electronically at Tribunals Ontario. A PDF download will be available in the full release."})} style={{flex:1,padding:"11px",background:G,color:"#fff",borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    <Download size={14}/> Download {showForm} PDF
                  </button>
                  <a href={FORMS[showForm]?.url} target="_blank" rel="noopener noreferrer"
                    style={{flex:1,padding:"11px",background:"#fff",color:G,borderRadius:10,border:`1.5px solid ${G}`,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,textDecoration:"none"}}>
                    <Send size={14}/> Official LTB Form
                  </a>
                </div>
                <p style={{fontSize:11,color:MU,textAlign:"center",marginTop:10}}>Always verify the final form on the official Tribunals Ontario website before filing.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
