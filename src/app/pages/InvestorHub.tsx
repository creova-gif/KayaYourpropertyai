import { useState, useEffect } from "react";
import { toast } from "sonner";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const portfolio=[
  {id:1,name:"123 King St W",units:12,income:18400,expenses:6200,cap:6.8,coc:12.4},
  {id:2,name:"456 Queen St W",units:8,income:11600,expenses:4100,cap:5.9,coc:9.8},
  {id:3,name:"789 Bloor St W",units:20,income:32000,expenses:11800,cap:7.2,coc:14.1},
  {id:4,name:"300 Bloor W",units:6,income:8800,expenses:3200,cap:5.4,coc:8.6},
];

interface Calc{price:number;down:number;rent:number;expenses:number;rate:number;}

function fmtK(n:number){return n>=1000?`$${(n/1000).toFixed(1)}k`:`$${n}`;}

export function InvestorHub(){
  const [calc,setCalc]=useState<Calc>({price:750000,down:150000,rate:5.5,rent:3200,expenses:1100});
  const [result,setResult]=useState({cashflow:0,coc:0,cap:0,breakEven:0});

  function compute(c:Calc){
    const loan=c.price-c.down;
    const monthlyRate=c.rate/100/12;
    const n=300;
    const mortgage=monthlyRate?loan*(monthlyRate*Math.pow(1+monthlyRate,n))/(Math.pow(1+monthlyRate,n)-1):loan/n;
    const cashflow=c.rent-c.expenses-mortgage;
    const annualCashflow=cashflow*12;
    const coc=(annualCashflow/c.down)*100;
    const noi=(c.rent-c.expenses)*12;
    const cap=(noi/c.price)*100;
    const breakEven=annualCashflow>0?Math.round(c.down/annualCashflow*10)/10:0;
    setResult({cashflow:Math.round(cashflow),coc:Math.round(coc*10)/10,cap:Math.round(cap*10)/10,breakEven});
  }

  useEffect(()=>{compute(calc);},[]);

  function update(key:keyof Calc,val:number){
    const nc={...calc,[key]:val};
    setCalc(nc);
    compute(nc);
  }

  const cashflowPositive=result.cashflow>=0;

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <div style={{maxWidth:1050,margin:"0 auto",padding:"32px 28px 80px"}}>
        <div style={{marginBottom:28}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Insights</p>
          <h1 style={{fontFamily:SERIF,fontSize:38,color:TX,lineHeight:1,letterSpacing:"-1px",margin:0}}>
            Investor <em style={{fontStyle:"italic",color:G}}>Hub</em>
          </h1>
        </div>

        {/* AI Market Signal */}
        <div style={{background:TX,borderRadius:18,padding:"24px 28px",marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(10,122,82,.3)",padding:"3px 12px",borderRadius:20,marginBottom:8}}>
                <span style={{fontSize:10,fontWeight:700,color:"#5DCAA5"}}>✦ Kaya AI Market Signal</span>
              </div>
              <p style={{fontFamily:SERIF,fontSize:22,color:"#fff",marginBottom:4}}>Toronto market showing strong rental demand</p>
              <p style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>
                Vacancy rates hit 1.5% in Q1 2026 — 20-year low. Average rents up 8.4% YoY. Highest opportunity corridors: Etobicoke (14% appreciation), East York (11%), Hamilton (18%).
              </p>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <p style={{fontSize:10,color:"rgba(255,255,255,.4)",marginBottom:4}}>Demand Index</p>
              <p style={{fontFamily:SERIF,fontSize:48,color:G,lineHeight:1}}>94</p>
              <p style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>out of 100</p>
            </div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {["Buy signal: Strong","Rate forecast: Stable","Supply: Very tight","Rent growth: +8.4%"].map(t=>(
              <span key={t} style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:12}}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:16,marginBottom:24}}>
          {/* ROI Calculator */}
          <div style={cd}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${BD}`}}>
              <p style={{fontFamily:SERIF,fontSize:20,color:TX}}>ROI Calculator</p>
              <p style={{fontSize:12,color:MU}}>Adjust inputs — results update in real time</p>
            </div>
            <div style={{padding:"20px"}}>
              {([
                {key:"price" as const,label:"Purchase Price",min:200000,max:2000000,step:25000,fmt:(v:number)=>`$${v.toLocaleString()}`},
                {key:"down" as const,label:"Down Payment",min:50000,max:600000,step:5000,fmt:(v:number)=>`$${v.toLocaleString()}`},
                {key:"rate" as const,label:"Mortgage Rate",min:2,max:10,step:0.1,fmt:(v:number)=>`${v}%`},
                {key:"rent" as const,label:"Monthly Rent",min:1000,max:8000,step:50,fmt:(v:number)=>`$${v.toLocaleString()}`},
                {key:"expenses" as const,label:"Monthly Expenses",min:200,max:4000,step:50,fmt:(v:number)=>`$${v.toLocaleString()}`},
              ]).map(f=>(
                <div key={f.key} style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <label style={{fontSize:11,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px"}}>{f.label}</label>
                    <span style={{fontSize:13,fontWeight:700,color:TX}}>{f.fmt(calc[f.key])}</span>
                  </div>
                  <input type="range" min={f.min} max={f.max} step={f.step} value={calc[f.key]}
                    onChange={e=>update(f.key,parseFloat(e.target.value))} style={{width:"100%",accentColor:G}}/>
                </div>
              ))}
            </div>
          </div>

          {/* Results panel */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {l:"Monthly Cashflow",v:result.cashflow,fmt:(n:number)=>`${n>=0?"":"-"}$${Math.abs(n).toLocaleString()}`,good:cashflowPositive},
              {l:"Cash-on-Cash Return",v:result.coc,fmt:(n:number)=>`${n.toFixed(1)}%`,good:result.coc>=8},
              {l:"Cap Rate",v:result.cap,fmt:(n:number)=>`${n.toFixed(1)}%`,good:result.cap>=5},
              {l:"Break-Even",v:result.breakEven,fmt:(n:number)=>n>0?`${n} yrs`:"Never",good:result.breakEven>0&&result.breakEven<15},
            ].map(r=>(
              <div key={r.l} style={{...cd,padding:"18px"}}>
                <p style={{fontSize:11,color:MU,marginBottom:4}}>{r.l}</p>
                <p style={{fontFamily:SERIF,fontSize:30,color:r.good?G:"#C0392B",lineHeight:1}}>{r.fmt(r.v)}</p>
                <div style={{display:"flex",alignItems:"center",gap:4,marginTop:6}}>
                  <span style={{fontSize:12}}>{r.good?"✅":"⚠️"}</span>
                  <span style={{fontSize:10,color:MU}}>{r.good?"Looks good":"Below benchmark"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio table */}
        <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>Portfolio Performance</p>
        <div style={cd}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:BG}}>
                {["Property","Units","Gross Income/mo","Expenses/mo","Cap Rate","Cash-on-Cash","Action"].map(h=>(
                  <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".5px"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.map(p=>(
                <tr key={p.id} style={{borderTop:`1px solid ${BD}`}}>
                  <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,color:TX}}>{p.name}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:MU}}>{p.units}</td>
                  <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,color:TX}}>{fmtK(p.income)}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:MU}}>{fmtK(p.expenses)}</td>
                  <td style={{padding:"12px 16px"}}><span style={{fontWeight:700,color:G}}>{p.cap}%</span></td>
                  <td style={{padding:"12px 16px"}}><span style={{fontWeight:700,color:p.coc>=10?G:"#B45309"}}>{p.coc}%</span></td>
                  <td style={{padding:"12px 16px"}}>
                    <button onClick={()=>toast.success(`Full analysis for ${p.name}`)} style={{padding:"6px 12px",background:GL,color:G,border:"none",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                      Full Analysis →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
