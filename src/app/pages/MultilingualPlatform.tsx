import { useState } from "react";
import { toast } from "sonner";
import { PublicNav } from "../components/PublicNav";
import { ClipboardList, Mail, Home, Phone, BookOpen, CreditCard, CheckCircle2, Target, Globe, FileText, Zap } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};

const LANGUAGES=[
  {code:"en",name:"English",native:"English",speakers:"38M in Canada",flag:"🇨🇦",selected:true},
  {code:"fr",name:"French",native:"Français",speakers:"7.5M in Canada",flag:"🇫🇷",selected:false},
  {code:"zh",name:"Simplified Chinese",native:"简体中文",speakers:"1.4M in Canada",flag:"🇨🇳",selected:false},
  {code:"pa",name:"Punjabi",native:"ਪੰਜਾਬੀ",speakers:"668K in Canada",flag:"🇮🇳",selected:false},
  {code:"es",name:"Spanish",native:"Español",speakers:"520K in Canada",flag:"🇪🇸",selected:false},
  {code:"ar",name:"Arabic",native:"العربية",speakers:"420K in Canada",flag:"🇸🇦",selected:false},
  {code:"tl",name:"Tagalog",native:"Tagalog",speakers:"380K in Canada",flag:"🇵🇭",selected:false},
  {code:"ur",name:"Urdu",native:"اردو",speakers:"310K in Canada",flag:"🇵🇰",selected:false},
];

const translated=[
  {icon:ClipboardList,title:"Lease Agreements",desc:"Full lease text translated with legal accuracy and provincial variants"},
  {icon:Mail,title:"Notices & Letters",desc:"N4, N5, N12, rent increase letters — all auto-translated"},
  {icon:Home,title:"Listing Descriptions",desc:"Property listings shown in your preferred language"},
  {icon:Phone,title:"Support Conversations",desc:"Live chat and support in your language"},
  {icon:BookOpen,title:"LTB Forms Guide",desc:"Plain-language guides to every LTB form in 8 languages"},
  {icon:CreditCard,title:"Payment Instructions",desc:"Rent payment instructions and receipts in your language"},
  {icon:CheckCircle2,title:"Tenant Rights Summary",desc:"Know your rights: Ontario Residential Tenancies Act explained clearly"},
];

const aiMetrics=[
  {label:"Translation Accuracy",val:"98.4%",icon:Target},
  {label:"Languages Supported",val:"8",icon:Globe},
  {label:"Documents Translated",val:"140K+",icon:FileText},
  {label:"Avg Translation Time",val:"< 2s",icon:Zap},
];

export function MultilingualPlatform(){
  const [langs,setLangs]=useState(LANGUAGES);
  const selected=langs.find(l=>l.selected)||langs[0];

  function select(code:string){
    setLangs(l=>l.map(x=>({...x,selected:x.code===code})));
    const lang=langs.find(l=>l.code===code);
    if(lang)toast.success(`Platform language set to ${lang.name}`);
  }

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:SANS}}>
      <PublicNav/>
      <div style={{maxWidth:1050,margin:"0 auto",padding:"100px 28px 80px"}}>
        <div style={{marginBottom:32}}>
          <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:8}}>Inclusive Platform</p>
          <h1 style={{fontFamily:SERIF,fontSize:44,color:TX,lineHeight:1,letterSpacing:"-1px",marginBottom:8}}>
            Multilingual <em style={{fontStyle:"italic",color:G}}>Support</em>
          </h1>
          <p style={{fontSize:14,color:MU}}>KAYA speaks your language — from lease agreements to tenant rights, everything is available in 8 languages.</p>
        </div>

        {/* AI quality metrics */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {aiMetrics.map(m=>{const MIcon=m.icon;return(
            <div key={m.label} style={{...cd,padding:"18px",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:6}}><MIcon size={24} color={G}/></div>
              <p style={{fontFamily:SERIF,fontSize:28,color:TX,margin:"4px 0 4px"}}>{m.val}</p>
              <p style={{fontSize:11,color:MU}}>{m.label}</p>
            </div>
          );})}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,marginBottom:28}}>
          {/* Language selector grid */}
          <div>
            <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>Choose Your Language</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
              {langs.map(l=>(
                <button key={l.code} onClick={()=>select(l.code)}
                  style={{...cd,padding:"16px",cursor:"pointer",outline:l.selected?`2px solid ${G}`:"none",outlineOffset:2,textAlign:"left",background:"#fff",transition:"all .2s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                    <span style={{fontSize:22}}>{l.flag}</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:13,fontWeight:700,color:l.selected?G:TX,margin:0}}>{l.name}</p>
                      <p style={{fontSize:11,color:MU,margin:0}}>{l.native}</p>
                    </div>
                    {l.selected&&(
                      <span style={{background:GL,color:G,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:12,whiteSpace:"nowrap"}}>✓ Selected</span>
                    )}
                  </div>
                  <p style={{fontSize:10,color:MU}}>{l.speakers}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected language detail */}
          <div>
            <div style={{...cd,padding:"22px",marginBottom:14,background:TX,border:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <span style={{fontSize:36}}>{selected.flag}</span>
                <div>
                  <p style={{fontFamily:SERIF,fontSize:20,color:"#fff",margin:0}}>{selected.name}</p>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.6)",margin:0}}>{selected.native}</p>
                </div>
              </div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.55)",marginBottom:4}}>{selected.speakers}</p>
              <div style={{marginTop:16}}>
                <button onClick={()=>toast.success(`Platform set to ${selected.name}`)}
                  style={{width:"100%",padding:"11px",background:G,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  Apply Language →
                </button>
              </div>
            </div>

            {/* Newcomer support CTA */}
            <div style={{...cd,padding:"20px"}}>
              <div style={{width:38,height:38,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:4}}><Globe size={18} color={G}/></div>
              <p style={{fontFamily:SERIF,fontSize:16,color:TX,marginTop:8,marginBottom:6}}>New to Canada?</p>
              <p style={{fontSize:12,color:MU,lineHeight:1.6,marginBottom:14}}>
                Our newcomer support team can help you understand your rental rights, navigate lease agreements, and find accessible housing in your language.
              </p>
              <button onClick={()=>toast.success("Connecting you with newcomer support...")}
                style={{width:"100%",padding:"10px",background:GL,color:G,border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                Get Newcomer Support →
              </button>
            </div>
          </div>
        </div>

        {/* What gets translated */}
        <p style={{fontFamily:SERIF,fontSize:20,color:TX,marginBottom:14}}>What Gets Translated</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
          {translated.map(t=>{const TIcon=t.icon;return(
            <div key={t.title} style={{...cd,padding:"18px",display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:38,height:38,borderRadius:10,background:GL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><TIcon size={18} color={G}/></div>
              <div>
                <p style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{t.title}</p>
                <p style={{fontSize:11,color:MU,lineHeight:1.5}}>{t.desc}</p>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}
