'use strict';
function random(seed){let n=2166136261;for(const c of seed)n=Math.imul(n^c.charCodeAt(0),16777619);return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function generate(pool,seed){const rng=random(seed),key=(r,c)=>r+','+c;
 for(let attempt=0;attempt<400;attempt++){
  const shuffled=pool.map(x=>({...x,rank:rng()})).sort((a,b)=>a.rank-b.rank),grid=new Map(),entries=[];let bounds=[0,0,0,0];
  function valid(word,r,c,dir){let crosses=0;const dr=dir==='down'?1:0,dc=1-dr;
   if(grid.has(key(r-dr,c-dc))||grid.has(key(r+dr*word.length,c+dc*word.length)))return false;
   for(let i=0;i<word.length;i++){const rr=r+dr*i,cc=c+dc*i,cell=grid.get(key(rr,cc));if(cell){if(cell.ch!==word[i]||cell.dirs.includes(dir))return false;crosses++;}else if(grid.has(key(rr+dc,cc+dr))||grid.has(key(rr-dc,cc-dr)))return false;}
   const endR=r+dr*(word.length-1),endC=c+dc*(word.length-1),b=[Math.min(bounds[0],r),Math.min(bounds[1],c),Math.max(bounds[2],endR),Math.max(bounds[3],endC)];
   return crosses>0&&b[2]-b[0]<19&&b[3]-b[1]<19?{crosses,b}:false;
  }
  function add(item,r,c,dir){const dr=dir==='down'?1:0,dc=1-dr;for(let i=0;i<item.answer.length;i++){const k=key(r+dr*i,c+dc*i),old=grid.get(k);if(old)old.dirs.push(dir);else grid.set(k,{ch:item.answer[i],dirs:[dir]});}entries.push({...item,r,c,dir});bounds=[Math.min(bounds[0],r),Math.min(bounds[1],c),Math.max(bounds[2],r+dr*(item.answer.length-1)),Math.max(bounds[3],c+dc*(item.answer.length-1))];}
  add(shuffled.shift(),0,0,'across');
  while(entries.length<10){const options=[];
   for(const item of shuffled){for(const [k,cell] of grid){if(cell.dirs.length>1)continue;const [rr,cc]=k.split(',').map(Number),dir=cell.dirs[0]==='across'?'down':'across';for(let i=0;i<item.answer.length;i++){if(item.answer[i]!==cell.ch)continue;const r=rr-(dir==='down'?i:0),c=cc-(dir==='across'?i:0),v=valid(item.answer,r,c,dir);if(v)options.push({item,r,c,dir,score:v.crosses*20-(v.b[2]-v.b[0]+1)*(v.b[3]-v.b[1]+1)*.06+rng()*12});}}}
   if(!options.length)break;options.sort((a,b)=>b.score-a.score);const best=options[0];add(best.item,best.r,best.c,best.dir);shuffled.splice(shuffled.indexOf(best.item),1);
  }
  if(entries.length===10){const sorted=entries.map(e=>({...e,r:e.r-bounds[0],c:e.c-bounds[1]})).sort((a,b)=>a.r-b.r||a.c-b.c);let number=0,last='';for(const e of sorted){const k=key(e.r,e.c);if(k!==last){number++;last=k;}e.number=number;delete e.rank;}return{rows:bounds[2]-bounds[0]+1,cols:bounds[3]-bounds[1]+1,entries:sorted};}
 }
 throw Error('Tidak bisa menyusun 10 soal yang saling silang dari stok tersisa.');
}
if(typeof module!=='undefined')module.exports={generate,random};
