import { PublicNav } from "../components/PublicNav";
import { useState } from "react";
import { Pin, MessageCircle } from "lucide-react";

const G="#0A7A52",GL="#E5F4EE",BG="#F8F7F4",TX="#0E0F0C",MU="#767570";
const BD="rgba(0,0,0,0.07)";
const SERIF="'Instrument Serif',Georgia,serif",SANS="'DM Sans',system-ui,sans-serif";
const cd:React.CSSProperties={background:"#fff",border:`1px solid ${BD}`,borderRadius:16};
const pg:React.CSSProperties={minHeight:"100vh",background:BG,fontFamily:SANS};
const inp:React.CSSProperties={width:"100%",padding:"11px 14px",border:`1px solid ${BD}`,borderRadius:9,fontFamily:SANS,fontSize:13,color:TX,outline:"none",background:"#fff"};

type Post={id:number,author:string,type:string,title:string,body:string,time:string,likes:number,replies:number,pinned?:boolean};

const initPosts:Post[]=[
  {id:1,author:"Management",type:"announcement",title:"Water shutoff — March 20, 9am–2pm",body:"Annual maintenance. Please fill water before 9am. Apologies for the inconvenience.",time:"2h ago",likes:4,replies:7,pinned:true},
  {id:2,author:"Sarah K. (4A)",type:"lost-found",title:"Found: grey tabby cat — lobby",body:"Found wandering the lobby around 8pm. Very friendly. Has a collar but no tag. Come to 4A!",time:"3h ago",likes:12,replies:5},
  {id:3,author:"John M. (2B)",type:"recommend",title:"Best pizza on King St",body:"Honestly Terroni is overrated. Found this tiny spot on Bathurst — Pizzeria Libretto — absolutely incredible wood-fired neapolitan. 10/10 recommend.",time:"5h ago",likes:8,replies:3},
  {id:4,author:"Emma W. (3A)",type:"offer",title:"Free moving boxes — must go today",body:"Just finished unpacking. Have about 20 large boxes and packing paper. First come first served, lobby storage room.",time:"7h ago",likes:6,replies:2},
  {id:5,author:"David L. (1C)",type:"ask",title:"Any recommendations for a good locksmith?",body:"Lost my spare key. Looking for someone reliable and not too pricey. Bonus if they can come same day.",time:"1d ago",likes:2,replies:4},
  {id:6,author:"Nadia B. (2C)",type:"recommend",title:"Parking tip: Meter 3B near the alley is free after 6pm",body:"Just found this out — the meter right by the alley entrance (3B) stops charging at 6pm. Saved me $4 last night. Pass it on!",time:"2d ago",likes:21,replies:8},
];

export function BuildingCommunity(){
  const [posts,setPosts]=useState(initPosts);
  const [liked,setLiked]=useState<number[]>([]);
  const [filter,setFilter]=useState("all");
  const [compose,setCompose]=useState(false);
  const [newTitle,setNewTitle]=useState("");
  const [newBody,setNewBody]=useState("");
  const [newType,setNewType]=useState("ask");

  const typeColors:{[k:string]:[string,string]}={
    announcement:["#FEF3C7","#B45309"],
    "lost-found":["#FDECEA","#C0392B"],
    recommend:["#E5F4EE","#0A7A52"],
    offer:["#EBF2FB","#1E5FA8"],
    ask:[BG,MU],
  };

  const filtered=filter==="all"?posts:posts.filter(p=>p.type===filter);

  function likePost(id:number){
    setLiked(l=>l.includes(id)?l.filter(x=>x!==id):[...l,id]);
    setPosts(ps=>ps.map(p=>p.id===id?{...p,likes:p.likes+(liked.includes(id)?-1:1)}:p));
  }

  function addPost(){
    if(!newTitle.trim())return;
    const np:Post={id:Date.now(),author:"Justin M. (5A)",type:newType,title:newTitle,body:newBody,time:"Just now",likes:0,replies:0};
    setPosts([np,...posts]);
    setCompose(false);setNewTitle("");setNewBody("");
  }

  return(
    <div style={pg}>
      <PublicNav />
      <div style={{maxWidth:720,margin:"0 auto",padding:"110px 36px 80px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
          <div>
            <p style={{fontSize:9,fontWeight:700,color:MU,textTransform:"uppercase",letterSpacing:".7px",marginBottom:8}}>123 King Street West</p>
            <h1 style={{fontFamily:SERIF,fontSize:42,color:TX,lineHeight:1,letterSpacing:"-1px"}}>
              Building <em style={{fontStyle:"italic",color:G}}>Community</em>
            </h1>
          </div>
          <button onClick={()=>setCompose(!compose)} style={{padding:"10px 18px",background:TX,color:"#fff",border:"none",borderRadius:10,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            + Post
          </button>
        </div>

        {compose&&(
          <div style={{...cd,padding:"20px",marginBottom:20,borderColor:G}}>
            <p style={{fontFamily:SERIF,fontSize:18,color:TX,marginBottom:14}}>New post</p>
            <div style={{marginBottom:10}}>
              <select style={{...inp,padding:"8px 10px",marginBottom:10,width:"auto"}} value={newType} onChange={e=>setNewType(e.target.value)}>
                {Object.keys(typeColors).map(t=><option key={t} value={t}>{t.replace("-"," ")}</option>)}
              </select>
              <input style={{...inp,marginBottom:8}} placeholder="Title..." value={newTitle} onChange={e=>setNewTitle(e.target.value)}/>
              <textarea style={{...inp,height:80,resize:"none"}} placeholder="What's on your mind? (optional)" value={newBody} onChange={e=>setNewBody(e.target.value)}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addPost} style={{padding:"9px 20px",background:TX,color:"#fff",border:"none",borderRadius:9,fontFamily:SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>Post to building →</button>
              <button onClick={()=>setCompose(false)} style={{padding:"9px 16px",background:"transparent",border:`1px solid ${BD}`,borderRadius:9,fontSize:12,cursor:"pointer",fontFamily:SANS,color:MU}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
          {["all","announcement","lost-found","recommend","offer","ask"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 13px",borderRadius:20,border:`1px solid`,fontFamily:SANS,fontSize:11,fontWeight:600,cursor:"pointer",background:filter===f?TX:BG,color:filter===f?"#fff":MU,borderColor:filter===f?TX:BD,textTransform:"capitalize",transition:"all .15s"}}>
              {f==="all"?"All posts":f.replace("-"," ")}
            </button>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(p=>{
            const [tbg,ttc]=typeColors[p.type]||[BG,MU];
            return(
              <div key={p.id} style={{...cd,padding:"18px 20px",borderLeft:p.pinned?`3px solid ${G}`:`3px solid transparent`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:GL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G,flexShrink:0}}>{p.author.charAt(0)}</div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:12,fontWeight:600,color:TX}}>{p.author}</span>
                        <span style={{background:tbg,color:ttc,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,textTransform:"capitalize"}}>{p.type.replace("-"," ")}</span>
                        {p.pinned&&<span style={{background:GL,color:G,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,display:"inline-flex",alignItems:"center",gap:3}}><Pin size={8}/> Pinned</span>}
                      </div>
                      <span style={{fontSize:10,color:MU}}>{p.time}</span>
                    </div>
                  </div>
                </div>
                <p style={{fontSize:14,fontWeight:600,color:TX,marginBottom:5}}>{p.title}</p>
                {p.body&&<p style={{fontSize:12,color:MU,lineHeight:1.65,marginBottom:12}}>{p.body}</p>}
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <button onClick={()=>likePost(p.id)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:12,color:liked.includes(p.id)?G:MU,fontFamily:SANS,fontWeight:liked.includes(p.id)?600:400}}>
                    {liked.includes(p.id)?"♥":"♡"} {p.likes}
                  </button>
                  <button style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:12,color:MU,fontFamily:SANS}}>
                    <MessageCircle size={12}/> {p.replies} replies
                  </button>
                  <button style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",fontSize:11,color:MU,fontFamily:SANS}}>Share</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
