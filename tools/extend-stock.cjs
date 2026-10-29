// Append new puzzles without ever replacing an already published day.
const fs=require('fs'),path=require('path'),{generate}=require('./generator.cjs'),bank=require('./bank.cjs');
const file=path.join(__dirname,'../puzzles.json'),data=JSON.parse(fs.readFileSync(file,'utf8'));
const used=new Set(Object.values(data.puzzles).flatMap(p=>p.entries.map(e=>e.id)));
const usedAnswers=new Set(Object.values(data.puzzles).flatMap(p=>p.entries.map(e=>e.answer)));
let pool=bank.filter(e=>!used.has(e.id)&&!usedAnswers.has(e.answer));let last=Object.keys(data.puzzles).sort().at(-1),count=0;
while(pool.length>=10){const date=new Date(last+'T00:00:00Z');date.setUTCDate(date.getUTCDate()+1);const stamp=date.toISOString().slice(0,10);let puzzle;try{puzzle=generate(pool,stamp);}catch{break;}puzzle.date=stamp;puzzle.number=Object.keys(data.puzzles).length+1;data.puzzles[stamp]=puzzle;const ids=new Set(puzzle.entries.map(e=>e.id));pool=pool.filter(e=>!ids.has(e.id));last=stamp;count++;}
if(count)fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');console.log(count+' new days added. Stock ends '+last+'. Add unique questions to tools/bank.cjs to extend.');
