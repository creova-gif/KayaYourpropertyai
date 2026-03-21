import { useState } from "react";
import { motion } from "motion/react";
import { Receipt, Download, CheckCircle2, Info, TrendingUp, Home, Wrench, DollarSign, FileText, ChevronRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SANS="'DM Sans',system-ui,sans-serif";
const SERIF="'Instrument Serif',Georgia,serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

type LineItem={label:string;amount:number;category:string;eligible:boolean;ccaClass?:string};

const SAMPLE_INCOME:LineItem[]=[
  {label:"Unit 1 — 123 Main St, Toronto",amount:24000,category:"rental_income",eligible:true},
  {label:"Unit 2 — 123 Main St (Basement)",amount:15600,category:"rental_income",eligible:true},
  {label:"45 Maple Ave, Hamilton",amount:19800,category:"rental_income",eligible:true},
  {label:"Parking — 123 Main St",amount:1800,category:"rental_income",eligible:true},
];

const SAMPLE_EXPENSES:LineItem[]=[
  {label:"Property Tax — 123 Main St",amount:4200,category:"property_tax",eligible:true},
  {label:"Property Tax — 45 Maple Ave",amount:3100,category:"property_tax",eligible:true},
  {label:"Mortgage Interest (not principal)",amount:18400,category:"interest",eligible:true},
  {label:"Property Insurance",amount:2800,category:"insurance",eligible:true},
  {label:"Maintenance & Repairs",amount:3750,category:"repairs",eligible:true},
  {label:"Property Management Fees",amount:2400,category:"management",eligible:true},
  {label:"Accounting / Legal Fees",amount:1200,category:"professional",eligible:true},
  {label:"Advertising (Listing Syndication)",amount:480,category:"advertising",eligible:true},
  {label:"Utilities (Landlord-paid)",amount:3600,category:"utilities",eligible:true},
  {label:"Landscaping & Snow Removal",amount:1800,category:"maintenance",eligible:true},
  {label:"Office Supplies / Software (Kaya)",amount:828,category:"software",eligible:true},
];

const CCA_ITEMS:LineItem[]=[
  {label:"New Roof — 45 Maple Ave",amount:18000,category:"cca",eligible:true,ccaClass:"Class 1 (4%)"},
  {label:"New HVAC System",amount:7500,category:"cca",eligible:true,ccaClass:"Class 8 (20%)"},
  {label:"New Appliances",amount:3200,category:"cca",eligible:true,ccaClass:"Class 8 (20%)"},
];

const TAX_CATEGORIES=[
  {key:"rental_income",label:"Gross Rental Income",icon:"🏠",color:G},
  {key:"property_tax",label:"Property Taxes",icon:"🏛️",color:"#1E5FA8"},
  {key:"interest",label:"Mortgage Interest",icon:"📊",color:"#7C3AED"},
  {key:"insurance",label:"Insurance",icon:"🛡️",color:"#B45309"},
  {key:"repairs",label:"Repairs & Maintenance",icon:"🔧",color:"#059669"},
  {key:"management",label:"Management Fees",icon:"👤",color:"#DC2626"},
  {key:"professional",label:"Professional Fees",icon:"⚖️",color:"#0891B2"},
  {key:"advertising",label:"Advertising",icon:"📢",color:"#7C3AED"},
  {key:"utilities",label:"Utilities",icon:"⚡",color:"#D97706"},
  {key:"software",label:"Software & Subscriptions",icon:"💻",color:G},
  {key:"maintenance",label:"Other Maintenance",icon:"🌿",color:"#059669"},
];

const TAX_YEAR="2025";

export default function T776Report(){
  const [taxYear,setTaxYear]=useState(TAX_YEAR);
  const [activeTab,setActiveTab]=useState<"income"|"expenses"|"cca"|"summary">("summary");
  const [editingItem,setEditingItem]=useState<number|null>(null);
  const [expenses,setExpenses]=useState(SAMPLE_EXPENSES);

  const grossIncome=SAMPLE_INCOME.reduce((s,i)=>s+i.amount,0);
  const totalExpenses=expenses.reduce((s,i)=>s+i.amount,0);
  const ccaCurrentYear=CCA_ITEMS.reduce((s,i)=>{
    if(i.ccaClass?.includes("Class 1")) return s+(i.amount*0.04);
    if(i.ccaClass?.includes("Class 8")) return s+(i.amount*0.20);
    return s;
  },0);
  const netIncome=grossIncome-totalExpenses-ccaCurrentYear;

  const tabs=[
    {key:"summary",label:"Summary"},
    {key:"income",label:"Rental Income"},
    {key:"expenses",label:"Expenses"},
    {key:"cca",label:"CCA Claims"},
  ] as const;

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"40px 24px 80px"}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:12,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Receipt size={22} color={G}/>
              </div>
              <div>
                <h1 style={{fontSize:26,fontWeight:700,color:TX,fontFamily:SERIF,margin:0}}>CRA T776 Tax Report</h1>
                <p style={{fontSize:14,color:MU,margin:0}}>Statement of Real Estate Rentals — automatically generated from your Kaya data</p>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <select value={taxYear} onChange={e=>setTaxYear(e.target.value)}
                style={{padding:"9px 14px",border:`1px solid ${BD}`,borderRadius:9,fontSize:13,color:TX,fontFamily:SANS,background:"#fff",outline:"none"}}>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <button onClick={()=>{toast.success("T776 PDF generated",{description:"Your CRA T776 Statement of Real Estate Rentals has been prepared. In production, this downloads a CRA-compliant PDF."})}} style={{padding:"9px 18px",background:G,color:"#fff",borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                <Download size={14}/> Export PDF
              </button>
            </div>
          </div>

          {/* Info banner */}
          <div style={{background:"#EBF2FB",border:"1px solid #BFDBFE",borderRadius:12,padding:"13px 18px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <Info size={16} color="#1E5FA8" style={{flexShrink:0,marginTop:1}}/>
            <p style={{fontSize:13,color:"#1E5FA8",margin:0}}>The T776 form is filed with your personal T1 tax return each year. All rental income and deductible expenses must be reported. Capital improvements are claimed through CCA (Capital Cost Allowance), not as direct expenses.</p>
          </div>
        </motion.div>

        {/* Summary cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Gross Rental Income",value:`$${grossIncome.toLocaleString()}`,icon:"🏠",color:G,sub:"All units combined"},
            {label:"Total Deductions",value:`$${(totalExpenses+ccaCurrentYear).toLocaleString()}`,icon:"📉",color:"#1E5FA8",sub:"Expenses + CCA"},
            {label:"Net Rental Income",value:`$${netIncome.toLocaleString()}`,icon:"📊",color:netIncome>=0?G:"#C0392B",sub:"Line 9600 on T776"},
            {label:"CCA This Year",value:`$${Math.round(ccaCurrentYear).toLocaleString()}`,icon:"🏗️",color:"#7C3AED",sub:"Capital Cost Allowance"},
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{...cd,padding:"18px 20px"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.color,fontFamily:SERIF}}>{s.value}</div>
              <div style={{fontSize:12,fontWeight:600,color:TX,marginTop:2}}>{s.label}</div>
              <div style={{fontSize:11,color:MU,marginTop:2}}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,background:"#fff",padding:5,borderRadius:12,border:`1px solid ${BD}`,marginBottom:24,width:"fit-content"}}>
          {tabs.map(t=>(
            <button key={t.key} onClick={()=>setActiveTab(t.key)}
              style={{padding:"8px 18px",borderRadius:9,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",
                background:activeTab===t.key?G:"transparent",color:activeTab===t.key?"#fff":MU,transition:"all .2s"}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Summary Tab */}
        {activeTab==="summary"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{...cd,padding:24}}>
                <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 18px",fontFamily:SERIF}}>T776 Income Summary — {taxYear}</h3>
                <div style={{display:"flex",flexDirection:"column",gap:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${BD}`}}>
                    <span style={{fontSize:14,color:TX,fontWeight:500}}>Gross Rental Income</span>
                    <span style={{fontSize:14,fontWeight:700,color:G}}>${grossIncome.toLocaleString()}</span>
                  </div>
                  {TAX_CATEGORIES.filter(c=>c.key!=="rental_income").map(cat=>{
                    const catTotal=expenses.filter(e=>e.category===cat.key).reduce((s,e)=>s+e.amount,0);
                    if(!catTotal) return null;
                    return(
                      <div key={cat.key} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${BD}`}}>
                        <span style={{fontSize:13,color:MU}}>{cat.icon} {cat.label}</span>
                        <span style={{fontSize:13,color:TX}}>(${ catTotal.toLocaleString()})</span>
                      </div>
                    );
                  })}
                  <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${BD}`}}>
                    <span style={{fontSize:13,color:MU}}>🏗️ CCA — Capital Cost Allowance</span>
                    <span style={{fontSize:13,color:TX}}>(${Math.round(ccaCurrentYear).toLocaleString()})</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0",background:GL,marginTop:4,borderRadius:8,paddingInline:12}}>
                    <span style={{fontSize:15,fontWeight:700,color:TX}}>Net Rental Income (Line 9600)</span>
                    <span style={{fontSize:15,fontWeight:700,color:netIncome>=0?G:"#C0392B"}}>${netIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Properties breakdown */}
              <div style={{...cd,padding:24}}>
                <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 16px",fontFamily:SERIF}}>Properties Included</h3>
                {SAMPLE_INCOME.map((p,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:BG,borderRadius:9,marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <Home size={16} color={G}/>
                      <span style={{fontSize:13,fontWeight:500,color:TX}}>{p.label}</span>
                    </div>
                    <span style={{fontSize:13,fontWeight:600,color:G}}>${p.amount.toLocaleString()}/yr</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{...cd,padding:20}}>
                <h3 style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 14px"}}>📋 T776 Checklist</h3>
                {[
                  {t:"All rental income reported",done:true},
                  {t:"Property address listed",done:true},
                  {t:"Co-ownership % declared",done:false},
                  {t:"Expenses documented",done:true},
                  {t:"CCA schedule completed",done:true},
                  {t:"HST/GST filed (if applicable)",done:false},
                  {t:"Signed by all owners",done:false},
                ].map((c,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${BD}`}}>
                    <CheckCircle2 size={15} color={c.done?G:BD}/>
                    <span style={{fontSize:12,color:c.done?TX:MU}}>{c.t}</span>
                  </div>
                ))}
              </div>

              <div style={{...cd,padding:20}}>
                <h3 style={{fontSize:14,fontWeight:700,color:TX,margin:"0 0 12px"}}>🗓️ Filing Deadlines</h3>
                {[
                  {label:"T1 Personal Return",date:"April 30, 2026"},
                  {label:"Self-employed",date:"June 15, 2026"},
                  {label:"Balance owing due",date:"April 30, 2026"},
                  {label:"RRSP contribution",date:"March 1, 2026"},
                ].map(d=>(
                  <div key={d.label} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${BD}`}}>
                    <span style={{fontSize:12,color:MU}}>{d.label}</span>
                    <span style={{fontSize:12,fontWeight:600,color:TX}}>{d.date}</span>
                  </div>
                ))}
              </div>

              <div style={{...cd,padding:20,background:"#FEF3C7",border:"1px solid #F59E0B"}}>
                <AlertTriangle size={18} color="#B45309" style={{marginBottom:8}}/>
                <h4 style={{fontSize:13,fontWeight:700,color:"#92400E",margin:"0 0 6px"}}>Not Tax Advice</h4>
                <p style={{fontSize:12,color:"#92400E",margin:0}}>This report is a convenience tool. Always verify with a CPA or tax professional before filing.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Income Tab */}
        {activeTab==="income"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{...cd,padding:24}}>
            <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 18px",fontFamily:SERIF}}>Rental Income by Property</h3>
            {SAMPLE_INCOME.map((item,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px",background:BG,borderRadius:9,marginBottom:10}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:TX}}>{item.label}</div>
                  <div style={{fontSize:12,color:MU,marginTop:2}}>Monthly: ${Math.round(item.amount/12).toLocaleString()} · Annual: ${item.amount.toLocaleString()}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:16,fontWeight:700,color:G}}>${item.amount.toLocaleString()}</div>
                  <div style={{fontSize:11,color:MU}}>per year</div>
                </div>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:GL,borderRadius:9,marginTop:4}}>
              <span style={{fontSize:14,fontWeight:700,color:TX}}>Total Gross Rental Income</span>
              <span style={{fontSize:16,fontWeight:700,color:G}}>${grossIncome.toLocaleString()}</span>
            </div>
          </motion.div>
        )}

        {/* Expenses Tab */}
        {activeTab==="expenses"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{...cd,padding:24}}>
            <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 18px",fontFamily:SERIF}}>Deductible Expenses</h3>
            {expenses.map((item,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px",background:i%2===0?BG:"#fff",borderRadius:9,marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <CheckCircle2 size={14} color={G}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:TX}}>{item.label}</div>
                    <div style={{fontSize:11,color:MU,textTransform:"capitalize"}}>{item.category.replace("_"," ")}</div>
                  </div>
                </div>
                <span style={{fontSize:14,fontWeight:600,color:TX}}>${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:"#FDECEA",borderRadius:9,marginTop:8}}>
              <span style={{fontSize:14,fontWeight:700,color:TX}}>Total Deductible Expenses</span>
              <span style={{fontSize:16,fontWeight:700,color:"#C0392B"}}>${totalExpenses.toLocaleString()}</span>
            </div>
          </motion.div>
        )}

        {/* CCA Tab */}
        {activeTab==="cca"&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{...cd,padding:24}}>
              <h3 style={{fontSize:16,fontWeight:700,color:TX,margin:"0 0 8px",fontFamily:SERIF}}>Capital Cost Allowance (CCA)</h3>
              <p style={{fontSize:13,color:MU,margin:"0 0 20px"}}>Capital improvements (new roof, HVAC, appliances) cannot be expensed directly. They must be depreciated over time using CRA's CCA classes.</p>
              {CCA_ITEMS.map((item,i)=>(
                <div key={i} style={{...cd,padding:16,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:TX}}>{item.label}</div>
                      <div style={{fontSize:12,color:MU,marginTop:3}}>{item.ccaClass}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:13,color:MU}}>Cost: ${item.amount.toLocaleString()}</div>
                      <div style={{fontSize:14,fontWeight:700,color:"#7C3AED"}}>
                        CCA Year 1: ${Math.round(
                          item.ccaClass?.includes("Class 1")?item.amount*0.04:item.amount*0.20
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:"#F3E8FF",borderRadius:9,marginTop:4}}>
                <span style={{fontSize:14,fontWeight:700,color:TX}}>Total CCA Deduction ({taxYear})</span>
                <span style={{fontSize:16,fontWeight:700,color:"#7C3AED"}}>${Math.round(ccaCurrentYear).toLocaleString()}</span>
              </div>
            </div>
            <div style={{...cd,padding:20,background:"#EBF2FB",border:"1px solid #BFDBFE"}}>
              <Info size={16} color="#1E5FA8" style={{marginBottom:8}}/>
              <p style={{fontSize:13,color:"#1E5FA8",margin:0}}><strong>Half-Year Rule:</strong> In the year you acquire an asset, you can only claim half of the normal CCA deduction. Kaya automatically applies this rule to Year 1 claims.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
