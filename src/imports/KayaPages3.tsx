// ═══════════════════════════════════════════════════════════════
// KAYA — InvoiceGenerator, LTBForms, NoticesManagement
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, Download, Send, Plus, X, Calendar, DollarSign,
  Building2, User, Hash, AlertTriangle, Home, Clock, Info, Bell,
  CheckCircle2, Eye, Filter, ChevronRight, ExternalLink,
} from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TEXT="#0E0F0C",MUTED="#767570";
const BORDER="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const page:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const wrap:React.CSSProperties={maxWidth:1100,margin:"0 auto",padding:"48px 40px 80px"};
const lbl:React.CSSProperties={fontSize:10,fontWeight:600,color:MUTED,textTransform:"uppercase",letterSpacing:"0.7px"};
const fieldStyle:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BORDER}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TEXT,outline:"none",background:"#fff"};

function Badge({text,color="green"}:{text:string;color?:"green"|"amber"|"red"|"gray"|"blue"}) {
  const m={green:[GL,G],amber:["#FEF3C7","#B45309"],red:["#FDECEA","#C0392B"],gray:[BG,MUTED],blue:["#EBF2FB","#1E5FA8"]};
  const [bg,tc]=m[color];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{text}</span>;
}

// ═══════════════════════════════════════════════════════════════
// INVOICE GENERATOR
// ═══════════════════════════════════════════════════════════════
interface Item { description:string; quantity:number; rate:number; amount:number; }

export function InvoiceGenerator() {
  const [invNum, setInvNum] = useState("INV-2026-001");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [tenant, setTenant] = useState("");
  const [property, setProperty] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("Payment is due by the 1st of each month. Late payments are subject to a $50 fee.");
  const [items, setItems] = useState<Item[]>([
    {description:"Monthly Rent",quantity:1,rate:2300,amount:2300},
    {description:"Parking Fee",quantity:1,rate:150,amount:150},
  ]);

  const addItem = () => setItems([...items,{description:"",quantity:1,rate:0,amount:0}]);
  const removeItem = (i:number) => setItems(items.filter((_,idx)=>idx!==i));
  const updateItem = (i:number,field:keyof Item,val:string|number) => {
    const next=[...items];
    next[i]={...next[i],[field]:val};
    if(field==="quantity"||field==="rate") next[i].amount=Number(next[i].quantity)*Number(next[i].rate);
    setItems(next);
  };

  const subtotal = items.reduce((s,i)=>s+i.amount,0);
  const hst = subtotal*0.13;
  const total = subtotal+hst;

  return (
    <div style={page}>
      <div style={wrap}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={lbl}>Billing</p>
            <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TEXT,marginTop:8,lineHeight:1,letterSpacing:"-1px"}}>
              Invoice <em style={{fontStyle:"italic",color:G}}>Generator</em>
            </h1>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={{display:"flex",alignItems:"center",gap:7,padding:"10px 18px",border:`1px solid ${BORDER}`,borderRadius:10,background:"transparent",fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",color:TEXT}}>
              <Download size={14}/>Download PDF
            </button>
            <button style={{display:"flex",alignItems:"center",gap:7,padding:"10px 20px",background:G,border:"none",borderRadius:10,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer",color:"#fff"}}>
              <Send size={14}/>Send to Tenant
            </button>
          </div>
        </motion.div>

        {/* Invoice form */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:20,padding:"40px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)"}}>

          {/* Company + Invoice header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",paddingBottom:28,borderBottom:`1px solid ${BORDER}`,marginBottom:28}}>
            <div>
              <p style={{fontFamily:SERIF,fontSize:32,color:TEXT,marginBottom:6}}>Kaya<span style={{color:G}}>.</span></p>
              <p style={{fontSize:13,color:MUTED,lineHeight:1.7}}>
                123 Business Street<br/>Toronto, ON M5H 1A1<br/>info@kaya.ca
              </p>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:GL,padding:"8px 20px",borderRadius:10,marginBottom:16}}>
                <FileText size={16} color={G}/>
                <span style={{fontFamily:SERIF,fontSize:20,color:G}}>INVOICE</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {label:"Invoice #",val:invNum,setter:setInvNum},
                ].map(f=>(
                  <div key={f.label} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"flex-end"}}>
                    <span style={{...lbl}}>{f.label}</span>
                    <input value={f.val} onChange={e=>f.setter(e.target.value)}
                      style={{...fieldStyle,width:140,textAlign:"right",padding:"6px 10px"}}/>
                  </div>
                ))}
                {[
                  {label:"Issue Date",val:issueDate,setter:setIssueDate},
                  {label:"Due Date",val:dueDate,setter:setDueDate},
                ].map(f=>(
                  <div key={f.label} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"flex-end"}}>
                    <span style={{...lbl}}>{f.label}</span>
                    <input type="date" value={f.val} onChange={e=>f.setter(e.target.value)}
                      style={{...fieldStyle,width:160,padding:"6px 10px"}}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bill to */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:32}}>
            <div>
              <p style={{...lbl,marginBottom:10}}>Bill To</p>
              <div style={{position:"relative"}}>
                <User size={14} color={MUTED} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
                <input value={tenant} onChange={e=>setTenant(e.target.value)} placeholder="Tenant name"
                  style={{...fieldStyle,paddingLeft:34}}/>
              </div>
            </div>
            <div>
              <p style={{...lbl,marginBottom:10}}>Property Details</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{position:"relative"}}>
                  <Building2 size={14} color={MUTED} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
                  <input value={property} onChange={e=>setProperty(e.target.value)} placeholder="Property address"
                    style={{...fieldStyle,paddingLeft:34}}/>
                </div>
                <div style={{position:"relative"}}>
                  <Hash size={14} color={MUTED} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
                  <input value={unit} onChange={e=>setUnit(e.target.value)} placeholder="Unit number"
                    style={{...fieldStyle,paddingLeft:34}}/>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div style={{marginBottom:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <p style={lbl}>Line Items</p>
              <button onClick={addItem}
                style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",background:GL,border:"none",borderRadius:8,fontSize:12,fontWeight:600,color:G,cursor:"pointer",fontFamily:SANS}}>
                <Plus size={12}/>Add Item
              </button>
            </div>
            <div style={{border:`1px solid ${BORDER}`,borderRadius:12,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:BG}}>
                    {["Description","Qty","Rate","Amount",""].map(h=>(
                      <th key={h} style={{padding:"10px 16px",textAlign:"left",...lbl}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item,i)=>(
                    <tr key={i} style={{borderTop:`1px solid ${BORDER}`}}>
                      <td style={{padding:"10px 12px"}}>
                        <input value={item.description} onChange={e=>updateItem(i,"description",e.target.value)} placeholder="Item description"
                          style={{...fieldStyle,padding:"7px 10px"}}/>
                      </td>
                      <td style={{padding:"10px 8px",width:70}}>
                        <input type="number" value={item.quantity} onChange={e=>updateItem(i,"quantity",parseFloat(e.target.value)||0)}
                          style={{...fieldStyle,padding:"7px 10px",width:60}}/>
                      </td>
                      <td style={{padding:"10px 8px",width:120}}>
                        <div style={{position:"relative"}}>
                          <DollarSign size={12} color={MUTED} style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)"}}/>
                          <input type="number" value={item.rate} onChange={e=>updateItem(i,"rate",parseFloat(e.target.value)||0)}
                            style={{...fieldStyle,padding:"7px 10px 7px 22px",width:110}}/>
                        </div>
                      </td>
                      <td style={{padding:"10px 16px"}}>
                        <span style={{fontFamily:SERIF,fontSize:18,color:TEXT}}>${item.amount.toFixed(2)}</span>
                      </td>
                      <td style={{padding:"10px 8px",width:36}}>
                        <button onClick={()=>removeItem(i)} style={{background:"none",border:"none",cursor:"pointer",padding:4,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <X size={14} color="#C0392B"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:28}}>
            <div style={{width:280}}>
              {[
                {label:"Subtotal",value:`$${subtotal.toFixed(2)}`,bold:false},
                {label:"HST (13%)",value:`$${hst.toFixed(2)}`,bold:false},
              ].map(r=>(
                <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${BORDER}`}}>
                  <span style={{fontSize:13,color:MUTED}}>{r.label}</span>
                  <span style={{fontSize:13,fontWeight:600,color:TEXT}}>{r.value}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0",alignItems:"baseline"}}>
                <span style={{fontSize:14,fontWeight:600,color:TEXT}}>Total</span>
                <span style={{fontFamily:SERIF,fontSize:28,color:G}}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <p style={{...lbl,marginBottom:8}}>Notes / Terms</p>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
              style={{...fieldStyle,resize:"vertical",lineHeight:1.6}}/>
          </div>

          {/* Footer */}
          <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${BORDER}`,textAlign:"center",fontSize:12,color:MUTED}}>
            Thank you for your business · info@kaya.ca · kaya.ca
          </div>
        </motion.div>

        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:24}}>
          {[
            {label:"Save as Template",sub:"Reuse this invoice format",color:G,bg:GL},
            {label:"Schedule Recurring",sub:"Auto-generate monthly",color:"#1E5FA8",bg:"#EBF2FB"},
            {label:"Email to Tenant",sub:"Send with payment link",color:"#B45309",bg:"#FEF3C7"},
          ].map((a,i)=>(
            <motion.button key={a.label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.3+i*0.07}}
              whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.08)"}}
              style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:14,padding:"18px 20px",cursor:"pointer",textAlign:"left",fontFamily:SANS,transition:"box-shadow 0.2s"}}>
              <div style={{width:34,height:34,borderRadius:9,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
                <FileText size={14} color={a.color}/>
              </div>
              <p style={{fontSize:13,fontWeight:600,color:TEXT,marginBottom:3}}>{a.label}</p>
              <p style={{fontSize:11,color:MUTED}}>{a.sub}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LTB FORMS
// ═══════════════════════════════════════════════════════════════
const ltbForms = [
  {id:"n4",num:"N4",title:"Notice to End Tenancy — Non-payment of Rent",category:"eviction",desc:"First step in the eviction process when a tenant has not paid rent.",deadline:"14 days notice required",time:"5 min",use:"Most common eviction notice in Ontario"},
  {id:"n12",num:"N12",title:"Notice to End Tenancy — Landlord Requires Unit",category:"termination",desc:"Use when you or a purchaser need the unit for personal use. Compensation equal to 1 month's rent required.",deadline:"60 days notice required",time:"8 min",use:"When landlord or family needs to move in"},
  {id:"n5",num:"N5",title:"Notice to End Tenancy — Tenant Interfering",category:"eviction",desc:"For tenants who damage property, disturb neighbours, or have too many occupants.",deadline:"7 or 20 days depending on severity",time:"10 min",use:"Noise, damage, overcrowding, illegal activity"},
  {id:"n1",num:"N1",title:"Notice of Rent Increase",category:"rent-increase",desc:"Notify tenant of annual rent increase. Must follow Ontario's guideline (2.5% for 2026).",deadline:"90 days notice required",time:"4 min",use:"Annual rent increases up to the guideline"},
  {id:"n2",num:"N2",title:"Notice of Rent Increase (Above Guideline)",category:"rent-increase",desc:"Request increase above guideline due to capital improvements or increased utilities.",deadline:"Must apply to LTB first",time:"15 min",use:"Major renovations, new amenities"},
  {id:"n8",num:"N8",title:"Notice to End Tenancy — Tenant Has Not Met Obligations",category:"eviction",desc:"When tenant consistently pays late, has unauthorized occupants, or breaches lease terms.",deadline:"60 days notice required",time:"7 min",use:"Repeated late payments, lease violations"},
  {id:"n13",num:"N13",title:"Notice to End Tenancy — Demolition or Renovation",category:"termination",desc:"When you need to vacate the unit for demolition, conversion, or major renovation.",deadline:"120 days notice required",time:"12 min",use:"Condo conversions, major structural work"},
  {id:"n7",num:"N7",title:"Notice to End Tenancy — Cause",category:"eviction",desc:"For serious issues: illegal activity, serious damage, or impaired safety.",deadline:"10 or 30 days depending on severity",time:"10 min",use:"Drug dealing, assault, serious damage"},
];

export function LTBForms() {
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState<typeof ltbForms[0]|null>(null);

  const cats = [
    {id:"all",label:"All Forms"},
    {id:"eviction",label:"Eviction"},
    {id:"rent-increase",label:"Rent Increases"},
    {id:"termination",label:"Termination"},
  ];

  const filtered = cat==="all" ? ltbForms : ltbForms.filter(f=>f.category===cat);

  const catColor = (c:string):{bg:string,text:string} => ({
    eviction:{bg:"#FDECEA",text:"#C0392B"},
    "rent-increase":{bg:"#FEF3C7",text:"#B45309"},
    termination:{bg:"#EBF2FB",text:"#1E5FA8"},
    maintenance:{bg:GL,text:G},
  }[c]||{bg:BG,text:MUTED});

  return (
    <div style={page}>
      <div style={wrap}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:40}}>
          <p style={lbl}>Legal Tools</p>
          <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TEXT,marginTop:8,lineHeight:1,letterSpacing:"-1px"}}>
            LTB <em style={{fontStyle:"italic",color:G}}>Forms</em>
          </h1>
          <p style={{fontSize:14,color:MUTED,marginTop:10}}>Ontario Landlord and Tenant Board — AI-assisted form generation</p>
        </motion.div>

        {/* Alert */}
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{background:"#FEF3C7",border:"1px solid rgba(180,83,9,0.2)",borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"flex-start",gap:12,marginBottom:28}}>
          <AlertTriangle size={16} color="#B45309" style={{flexShrink:0,marginTop:2}}/>
          <p style={{fontSize:13,color:"#7C2D12",lineHeight:1.6}}>
            <strong>Legal Notice:</strong> Kaya AI can pre-fill these forms but always have a lawyer review before serving. LTB rules are strict — incorrectly served notices may be dismissed.
          </p>
        </motion.div>

        {/* Category filter */}
        <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{padding:"9px 18px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:cat===c.id?TEXT:"#fff",color:cat===c.id?"#fff":MUTED,borderColor:cat===c.id?TEXT:BORDER,transition:"all 0.15s"}}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Forms grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
          {filtered.map((f,i)=>{
            const cc=catColor(f.category);
            return (
              <motion.div key={f.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                onClick={()=>setSelected(f)}
                whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.08)"}}
                style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16,padding:"22px 24px",cursor:"pointer",borderLeft:`3px solid ${cc.text}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontFamily:SERIF,fontSize:22,color:TEXT}}>{f.num}</span>
                    <span style={{background:cc.bg,color:cc.text,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"capitalize"}}>{f.category.replace("-"," ")}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:MUTED}}>
                    <Clock size={11}/>{f.time}
                  </div>
                </div>
                <p style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:6,lineHeight:1.4}}>{f.title}</p>
                <p style={{fontSize:12,color:MUTED,lineHeight:1.6,marginBottom:12}}>{f.desc}</p>
                <div style={{paddingTop:12,borderTop:`1px solid ${BORDER}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,color:"#B45309",fontWeight:600}}>{f.deadline}</span>
                  <span style={{fontSize:12,color:G,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                    Generate <ChevronRight size={12}/>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}}>
              <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}}
                style={{background:"#fff",borderRadius:20,padding:36,width:560,maxHeight:"80vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.25)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
                  <div>
                    <p style={{fontFamily:SERIF,fontSize:28,color:TEXT,marginBottom:6}}>{selected.num}</p>
                    <p style={{fontSize:14,fontWeight:600,color:TEXT,lineHeight:1.4}}>{selected.title}</p>
                  </div>
                  <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><X size={20} color={MUTED}/></button>
                </div>
                <p style={{fontSize:13,color:MUTED,lineHeight:1.7,marginBottom:20}}>{selected.desc}</p>
                <div style={{background:BG,borderRadius:12,padding:"16px",marginBottom:20}}>
                  <p style={{...lbl,marginBottom:10}}>Legal Requirements</p>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                    <div><p style={{fontSize:11,color:MUTED}}>Deadline</p><p style={{fontSize:13,fontWeight:600,color:"#B45309"}}>{selected.deadline}</p></div>
                    <div><p style={{fontSize:11,color:MUTED}}>Time to complete</p><p style={{fontSize:13,fontWeight:600,color:TEXT}}>{selected.time}</p></div>
                  </div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button style={{flex:1,padding:"13px",background:TEXT,border:"none",borderRadius:10,color:"#fff",fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                    Generate with AI →
                  </button>
                  <button style={{padding:"13px 18px",border:`1px solid ${BORDER}`,borderRadius:10,background:"transparent",fontFamily:SANS,fontSize:13,cursor:"pointer",color:MUTED,display:"flex",alignItems:"center",gap:6}}>
                    <ExternalLink size={13}/>LTB Site
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NOTICES MANAGEMENT
// ═══════════════════════════════════════════════════════════════
export function NoticesManagement() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreate, setShowCreate] = useState(false);

  const notices = [
    {id:1,type:"rent_increase",title:"Rent Increase Notice — 90 Days",desc:"New monthly rent: $2,450 effective June 1, 2026",recipients:["John Doe","Sarah Kim"],property:"123 King Street",unit:"4A",sentDate:"Mar 1",status:"sent",priority:"high",due:"Jun 1, 2026"},
    {id:2,type:"lease_expiry",title:"Lease Renewal Notice",desc:"Your lease expires May 31, 2026. Please contact us to discuss renewal options.",recipients:["Emma Rodriguez"],property:"456 Queen St W",unit:"2B",sentDate:"Mar 10",status:"sent",priority:"medium",due:"May 31, 2026"},
    {id:3,type:"maintenance",title:"Building Maintenance — Water Shutoff",desc:"Water will be shut off March 20, 9 AM – 2 PM for plumbing repairs.",recipients:["All Tenants — 123 King Street"],property:"123 King Street",sentDate:"",status:"scheduled",priority:"high",due:"Mar 20, 2026"},
    {id:4,type:"policy_change",title:"Updated Pet Policy",desc:"New building pet policy effective April 1, 2026. Max 2 pets per unit.",recipients:["All Tenants"],property:"All Properties",sentDate:"Feb 28",status:"sent",priority:"low",due:""},
    {id:5,type:"general",title:"Holiday Office Hours",desc:"Management office closed March 17–18 for the holiday weekend.",recipients:["All Tenants"],property:"All Properties",sentDate:"",status:"draft",priority:"low",due:""},
  ];

  const templates = [
    {type:"rent_increase",name:"Rent Increase (90 Days)",icon:DollarSign},
    {type:"lease_expiry",name:"Lease Expiry Reminder",icon:Calendar},
    {type:"maintenance",name:"Maintenance Notification",icon:AlertTriangle},
    {type:"policy_change",name:"Policy Change",icon:FileText},
    {type:"violation",name:"Lease Violation",icon:AlertTriangle},
    {type:"general",name:"General Announcement",icon:Bell},
  ];

  const filtered = notices.filter(n=>filterStatus==="all"||n.status===filterStatus);

  const typeConfig:(t:string)=>{bg:string,color:string,label:string} = (t) => ({
    rent_increase:{bg:"#FEF3C7",color:"#B45309",label:"Rent Increase"},
    lease_expiry:{bg:"#EBF2FB",color:"#1E5FA8",label:"Lease Expiry"},
    maintenance:{bg:GL,color:G,label:"Maintenance"},
    policy_change:{bg:BG,color:MUTED,label:"Policy"},
    violation:{bg:"#FDECEA",color:"#C0392B",label:"Violation"},
    general:{bg:BG,color:MUTED,label:"General"},
  }[t]||{bg:BG,color:MUTED,label:t});

  const statusConfig:(s:string)=>{bg:string,color:string} = (s) => ({
    sent:{bg:GL,color:G},
    scheduled:{bg:"#EBF2FB",color:"#1E5FA8"},
    draft:{bg:BG,color:MUTED},
  }[s]||{bg:BG,color:MUTED});

  return (
    <div style={page}>
      <div style={wrap}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={lbl}>Communications</p>
            <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TEXT,marginTop:8,lineHeight:1,letterSpacing:"-1px"}}>
              Notices <em style={{fontStyle:"italic",color:G}}>&amp; Alerts</em>
            </h1>
          </div>
          <button onClick={()=>setShowCreate(true)}
            style={{display:"flex",alignItems:"center",gap:8,padding:"12px 22px",background:TEXT,border:"none",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
            <Plus size={14}/>Create Notice
          </button>
        </motion.div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Total Sent",value:String(notices.filter(n=>n.status==="sent").length)},
            {label:"Scheduled",value:String(notices.filter(n=>n.status==="scheduled").length)},
            {label:"Drafts",value:String(notices.filter(n=>n.status==="draft").length)},
            {label:"High Priority",value:String(notices.filter(n=>n.priority==="high").length)},
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              whileHover={{boxShadow:"0 8px 24px rgba(0,0,0,0.07)"}}
              style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:14,padding:"18px 20px"}}>
              <p style={lbl}>{s.label}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:TEXT,marginTop:8,lineHeight:1}}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:20}}>
          {/* Notices list */}
          <div>
            {/* Filter */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["all","sent","scheduled","draft"].map(s=>(
                <button key={s} onClick={()=>setFilterStatus(s)}
                  style={{padding:"7px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,border:"1px solid",background:filterStatus===s?TEXT:"#fff",color:filterStatus===s?"#fff":MUTED,borderColor:filterStatus===s?TEXT:BORDER,transition:"all 0.15s",textTransform:"capitalize"}}>
                  {s}
                </button>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {filtered.map((n,i)=>{
                const tc=typeConfig(n.type);
                const sc=statusConfig(n.status);
                return (
                  <motion.div key={n.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                    whileHover={{x:4}}
                    style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:14,padding:"18px 22px",cursor:"pointer",
                      borderLeft:`3px solid ${n.priority==="high"?"#C0392B":n.priority==="medium"?"#B45309":BORDER}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span style={{background:tc.bg,color:tc.color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{tc.label}</span>
                        <span style={{background:sc.bg,color:sc.color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"capitalize"}}>{n.status}</span>
                        {n.priority==="high"&&<span style={{background:"#FDECEA",color:"#C0392B",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>High Priority</span>}
                      </div>
                      {n.due&&<span style={{fontSize:11,color:MUTED}}>Due {n.due}</span>}
                    </div>
                    <p style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:4}}>{n.title}</p>
                    <p style={{fontSize:12,color:MUTED,marginBottom:10,lineHeight:1.5}}>{n.desc}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:`1px solid ${BORDER}`}}>
                      <span style={{fontSize:11,color:MUTED}}>{n.property}{n.unit?` · Unit ${n.unit}`:""} · {n.recipients.length===1?n.recipients[0]:`${n.recipients.length} recipients`}</span>
                      <div style={{display:"flex",gap:8}}>
                        <button style={{padding:"5px 12px",border:`1px solid ${BORDER}`,borderRadius:7,background:"transparent",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:MUTED,display:"flex",alignItems:"center",gap:4}}>
                          <Eye size={11}/>View
                        </button>
                        {n.status==="draft"&&<button style={{padding:"5px 12px",border:"none",borderRadius:7,background:G,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:"#fff",display:"flex",alignItems:"center",gap:4}}>
                          <Send size={11}/>Send
                        </button>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Templates sidebar */}
          <div>
            <p style={{...lbl,marginBottom:14}}>Quick Templates</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {templates.map((t,i)=>(
                <motion.button key={t.type} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
                  whileHover={{x:3}}
                  style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:11,padding:"12px 14px",cursor:"pointer",textAlign:"left",fontFamily:SANS,display:"flex",alignItems:"center",gap:10,transition:"all 0.15s"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <t.icon size={13} color={G}/>
                  </div>
                  <span style={{fontSize:12,fontWeight:600,color:TEXT}}>{t.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Create modal */}
        <AnimatePresence>
          {showCreate&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
              <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}}
                style={{background:"#fff",borderRadius:20,padding:36,width:480,boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                  <p style={{fontFamily:SERIF,fontSize:26,color:TEXT}}>Create Notice</p>
                  <button onClick={()=>setShowCreate(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={20} color={MUTED}/></button>
                </div>
                <p style={{...lbl,marginBottom:10}}>Template</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                  {templates.map(t=>(
                    <button key={t.type} style={{padding:"10px 12px",border:`1px solid ${BORDER}`,borderRadius:9,background:"transparent",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:SANS,color:TEXT,textAlign:"left"}}>
                      {t.name}
                    </button>
                  ))}
                </div>
                <button style={{width:"100%",padding:"13px",background:TEXT,border:"none",borderRadius:10,color:"#fff",fontFamily:SANS,fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={()=>setShowCreate(false)}>
                  Continue →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
