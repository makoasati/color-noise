const https=require('https')
const FREE=/^(CC0|CC BY|CC BY-SA|Public domain|PD)/i
function api(p){const q=new URLSearchParams({...p,format:'json'}).toString()
 return new Promise((res,rej)=>https.get({host:'commons.wikimedia.org',path:'/w/api.php?'+q,
  headers:{'User-Agent':'ColorNoise-editorial/1.0 (masatian@uchicago.edu)'}},
  r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})}).on('error',rej))}
async function find(q,must){
  const s=await api({action:'query',list:'search',srsearch:q+' filetype:bitmap',srnamespace:'6',srlimit:'40'})
  const hits=((s.query||{}).search)||[]
  for(let i=0;i<hits.length;i+=20){
    const b=hits.slice(i,i+20)
    const info=await api({action:'query',titles:b.map(h=>h.title).join('|'),prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1600'})
    const pages=(info.query||{}).pages||{}
    for(const h of b){
      const pg=Object.values(pages).find(x=>x.title===h.title); if(!pg)continue
      const ii=(pg.imageinfo||[])[0]; if(!ii)continue
      const t=pg.title.replace(/^File:/,''); if(!/\.(jpe?g|png)$/i.test(t))continue
      const lic=(((ii.extmetadata||{}).LicenseShortName||{}).value||'').trim(); if(!FREE.test(lic))continue
      if(!must.some(w=>t.toLowerCase().includes(w)))continue
      return {t,lic}
    }
  }
  return null
}
const C={
 D3:['Buckingham Fountain Chicago',['buckingham','grant park']],
 D14:['Ukrainian Village Chicago Chicago Avenue',['chicago avenue','ukrainian','west town']],
 D19:['Jay Pritzker Pavilion',['pritzker']],
 D21:['Grant Park Chicago bandshell',['grant park','petrillo']],
 D35:['Armitage Avenue Chicago',['armitage']],
 D38:['Halsted Street Chicago Boystown rainbow pylon',['halsted','boystown','pylon']],
 D39:['Halsted Street Chicago Lakeview',['halsted']],
 D41:['Humboldt Park Chicago boathouse',['humboldt']],
 D43:['Little Village Chicago arch 26th Street',['little village','26th']],
 D44:['Grant Park Chicago Butler Field bandshell',['grant park','butler','petrillo']],
 D53:['Lincoln Avenue Chicago',['lincoln avenue','lincoln ave']],
 D54:['Belmont Avenue Chicago',['belmont']],
 D55:['Pilsen Chicago 18th Street mural',['pilsen','18th']],
 D58:['Hutchinson Field Grant Park Chicago',['hutchinson','grant park']],
 DX1:['Little Village Chicago arch 26th Street',['little village','26th']],
 'D65-GC':['Grant Park Chicago Butler Field',['grant park','butler']],
 'D65-RAW':['Ravenswood Chicago',['ravenswood']],
}
;(async()=>{let n=0
 for(const [k,[q,m]] of Object.entries(C)){const r=await find(q,m)
  if(r)n++
  console.log((r?'ok   ':'none ')+k.padEnd(9)+(r?r.t.slice(0,56)+'  ['+r.lic+']':''))}
 console.log('\nmatched',n,'of',Object.keys(C).length)})()
