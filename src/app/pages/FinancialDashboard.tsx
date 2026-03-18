import { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, TrendingUp, Download, Building2, Receipt, Wallet, ArrowUpRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TEXT="#0E0F0C",MUTED="#767570",BORDER="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif", SANS="'DM Sans',system-ui,sans-serif";

function Badge({label,color="green"}:{label:string;color?:"green"|"amber"|"gray"}) {
  const m={green:[GL,G],amber:["#FEF3C7","#B45309"],gray:[BG,MUTED]};
  const [bg,tc]=m[color];
  return <span style={{background:bg,color:tc,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{label}</span>;
}

export function FinancialDashboard() {
  const [range, setRange] = useState("12months");

  const monthly = [
    {m:"Jan",rev:42000,exp:8200,profit:33800,id:"jan-2024"},
    {m:"Feb",rev:44500,exp:7800,profit:36700,id:"feb-2024"},
    {m:"Mar",rev:46200,exp:9100,profit:37100,id:"mar-2024"},
    {m:"Apr",rev:47800,exp:8400,profit:39400,id:"apr-2024"},
    {m:"May",rev:49200,exp:8900,profit:40300,id:"may-2024"},
    {m:"Jun",rev:51000,exp:9500,profit:41500,id:"jun-2024"},
    {m:"Jul",rev:52500,exp:10200,profit:42300,id:"jul-2024"},
    {m:"Aug",rev:54000,exp:9800,profit:44200,id:"aug-2024"},
    {m:"Sep",rev:55500,exp:10100,profit:45400,id:"sep-2024"},
    {m:"Oct",rev:56800,exp:9600,profit:47200,id:"oct-2024"},
    {m:"Nov",rev:58200,exp:10400,profit:47800,id:"nov-2024"},
    {m:"Dec",rev:59500,exp:11200,profit:48300,id:"dec-2024"},
  ];

  const expenses = [
    {name:"Maintenance",value:42000,color:G},{name:"Property Tax",value:35000,color:"#9FD8C0"},
    {name:"Utilities",value:28000,color:"#D4EDE4"},{name:"Insurance",value:18000,color:"#B45309"},
    {name:"Management",value:15000,color:BG},
  ];

  const properties = [
    {name:"123 King St",units:2,rev:4700,exp:890,profit:3810,occ:100},
    {name:"456 Queen St W",units:3,rev:6950,exp:1240,profit:5710,occ:100},
    {name:"789 Bloor St",units:2,rev:6400,exp:1180,profit:5220,occ:100},
  ];

  const metrics = [
    {label:"Total Revenue",value:"$59,500",trend:"+12.3%",icon:DollarSign},
    {label:"Net Profit",value:"$48,300",trend:"+14.8%",icon:TrendingUp},
    {label:"Total Expenses",value:"$11,200",trend:"+5.2%",icon:Wallet},
    {label:"Profit Margin",value:"81.2%",trend:"+2.1%",icon:Receipt},
  ];

  const ttStyle = { background:TEXT, border:"none", borderRadius:8, color:"#fff", fontSize:12, padding:"8px 12px" };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12" style={{ background: '#F8F7F4', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className="mb-8">
          <p className="text-[10px] font-semibold text-[#767570] uppercase tracking-wider mb-2">Financial Operations</p>
          <h1 className="text-[48px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-1px' }}>Financial Dashboard</h1>
          <p className="mt-2 text-[14px] text-[#767570]">Complete overview of your rental property finances</p>
        </div>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40}}>
          <div>
            <p style={{fontSize:10,fontWeight:600,color:MUTED,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Financial Overview</p>
            <h1 style={{fontFamily:SERIF,fontSize:48,fontWeight:400,color:TEXT,lineHeight:1,letterSpacing:"-1px"}}>
              Financial <em style={{fontStyle:"italic",color:G}}>Dashboard</em>
            </h1>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <select value={range} onChange={e=>setRange(e.target.value)}
              style={{padding:"10px 16px",border:`1px solid ${BORDER}`,borderRadius:10,fontFamily:SANS,fontSize:13,background:"#fff",color:TEXT,outline:"none",cursor:"pointer"}}>
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
              <option value="ytd">Year to date</option>
            </select>
            <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:TEXT,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:SANS}}>
              <Download size={14}/>Export
            </button>
          </div>
        </motion.div>

        {/* Metrics */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
          {metrics.map((m,i)=>(
            <motion.div key={m.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              whileHover={{boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}}
              style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16,padding:"22px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <m.icon size={17} color={G}/>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:G}}>
                  <ArrowUpRight size={13}/>{m.trend}
                </div>
              </div>
              <p style={{fontSize:10,fontWeight:600,color:MUTED,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:6}}>{m.label}</p>
              <p style={{fontFamily:SERIF,fontSize:32,color:TEXT,lineHeight:1}}>{m.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,marginBottom:32}}>
          {/* Revenue vs expenses */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16,padding:"28px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
              <div>
                <p style={{fontFamily:SERIF,fontSize:22,color:TEXT,marginBottom:4}}>Revenue vs Expenses</p>
                <p style={{fontSize:11,color:MUTED}}>12-month comparison</p>
              </div>
              <div style={{display:"flex",gap:16}}>
                {[{c:G,l:"Revenue"},{c:"#B45309",l:"Expenses"},{c:"#9FD8C0",l:"Profit"}].map(x=>(
                  <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:MUTED}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:x.c}}/>{x.l}
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthly} margin={{left:-20}}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER}/>
                <XAxis dataKey="m" stroke="none" tick={{fill:MUTED,fontSize:11}}/>
                <YAxis stroke="none" tick={{fill:MUTED,fontSize:11}}/>
                <Tooltip contentStyle={ttStyle} formatter={(v:number)=>[`$${v.toLocaleString()}`,""] }/>
                <Line key="revenue" type="monotone" dataKey="rev" stroke={G} strokeWidth={2} dot={false} activeDot={{r:4,fill:G}}/>
                <Line key="expenses" type="monotone" dataKey="exp" stroke="#B45309" strokeWidth={2} dot={false} activeDot={{r:4,fill:"#B45309"}}/>
                <Line key="profit" type="monotone" dataKey="profit" stroke="#9FD8C0" strokeWidth={2} dot={false} activeDot={{r:4}}/>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense breakdown */}
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16,padding:"28px"}}>
            <p style={{fontFamily:SERIF,fontSize:22,color:TEXT,marginBottom:4}}>Expense Breakdown</p>
            <p style={{fontSize:11,color:MUTED,marginBottom:16}}>Total: $138,000</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={expenses} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                  {expenses.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={ttStyle} formatter={(v:number)=>[`$${v.toLocaleString()}`,""] }/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
              {expenses.map((e,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:e.color,flexShrink:0}}/>
                    <span style={{fontSize:12,color:MUTED}}>{e.name}</span>
                  </div>
                  <span style={{fontSize:12,fontWeight:600,color:TEXT}}>${e.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Property performance */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
          style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:16,overflow:"hidden",marginBottom:32}}>
          <div style={{padding:"22px 28px",borderBottom:`1px solid ${BORDER}`}}>
            <p style={{fontFamily:SERIF,fontSize:24,color:TEXT}}>Property Performance</p>
            <p style={{fontSize:11,color:MUTED,marginTop:4}}>Revenue, expenses, and profitability by property</p>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:BG}}>
                {["Property","Units","Revenue","Expenses","Net Profit","Occupancy"].map(h=>(
                  <th key={h} style={{padding:"12px 24px",textAlign:"left",fontSize:10,fontWeight:600,color:MUTED,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.map((p,i)=>(
                <tr key={p.name} style={{borderTop:`1px solid ${BORDER}`}}
                  onMouseEnter={e=>(e.currentTarget.style.background=BG)}
                  onMouseLeave={e=>(e.currentTarget.style.background="#fff")}>
                  <td style={{padding:"18px 24px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:34,height:34,borderRadius:9,background:GL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Building2 size={15} color={G}/>
                      </div>
                      <span style={{fontSize:13,fontWeight:600,color:TEXT}}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{padding:"18px 24px",fontSize:13,color:MUTED}}>{p.units} units</td>
                  <td style={{padding:"18px 24px",fontSize:13,fontWeight:600,color:TEXT}}>${p.rev.toLocaleString()}</td>
                  <td style={{padding:"18px 24px",fontSize:13,color:MUTED}}>${p.exp.toLocaleString()}</td>
                  <td style={{padding:"18px 24px",fontSize:14,fontWeight:700,color:G}}>${p.profit.toLocaleString()}</td>
                  <td style={{padding:"18px 24px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:80,height:5,background:BORDER,borderRadius:3}}>
                        <div style={{height:5,background:G,borderRadius:3,width:`${p.occ}%`}}/>
                      </div>
                      <span style={{fontSize:12,fontWeight:600,color:TEXT}}>{p.occ}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {label:"Generate Invoice",sub:"Create and send to tenants",color:G,bg:GL},
            {label:"Download Report",sub:"Export financial statements",color:"#1E5FA8",bg:"#EBF2FB"},
            {label:"Schedule Review",sub:"Set up financial planning",color:"#B45309",bg:"#FEF3C7"},
          ].map((a,i)=>(
            <motion.button key={a.label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.5+i*0.07}}
              whileHover={{y:-3,boxShadow:"0 12px 32px rgba(0,0,0,0.08)"}}
              style={{background:"#fff",border:`1px solid ${BORDER}`,borderRadius:14,padding:"20px 22px",cursor:"pointer",textAlign:"left",fontFamily:SANS,transition:"box-shadow 0.2s"}}>
              <div style={{width:36,height:36,borderRadius:10,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                <DollarSign size={16} color={a.color}/>
              </div>
              <p style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:4}}>{a.label}</p>
              <p style={{fontSize:12,color:MUTED}}>{a.sub}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}