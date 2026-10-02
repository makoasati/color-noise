// Keyword-gated Commons search: only accept a file whose title actually
// matches the subject. No match -> no cover, rather than a random one.
const https=require('https')
const FREE=/^(CC0|CC BY|CC BY-SA|Public domain|PD)/i
function api(p){const q=new URLSearchParams({...p,format:'json'}).toString()
 return new Promise((res,rej)=>https.get({host:'commons.wikimedia.org',path:'/w/api.php?'+q,
  headers:{'User-Agent':'ColorNoise-editorial/1.0 (masatian@uchicago.edu)'}},
  r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})}).on('error',rej))}
async function search(terms,must){
  const s=await api({action:'query',list:'search',srsearch:terms+' filetype:bitmap',srnamespace:'6',srlimit:'25'})
  const hits=((s.query||{}).search)||[]
  if(!hits.length)return null
  const info=await api({action:'query',titles:hits.map(h=>h.title).join('|'),prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1600'})
  const pages=(info.query||{}).pages||{}
  for(const k of Object.keys(pages)){
    const t=pages[k].title.replace(/^File:/,'')
    const ii=((pages[k].imageinfo)||[])[0]; if(!ii)continue
    const lic=(((ii.extmetadata||{}).LicenseShortName||{}).value||'').trim()
    if(!FREE.test(lic))continue
    if(!/\.(jpg|jpeg|png)$/i.test(t))continue
    const low=t.toLowerCase()
    if(!must.some(w=>low.includes(w.toLowerCase())))continue
    const author=((((ii.extmetadata||{}).Artist)||{}).value||'').replace(/<[^>]+>/g,'').trim().slice(0,60)
    return {title:t,lic,author:author||'Unknown',url:(ii.thumburl||ii.url).split('?')[0].replace('//thumb.wikimedia.org/','//upload.wikimedia.org/')}
  }
  return null
}
const CASES=[
 ['D47 Chinatown fair',      'Chinatown Chicago Wentworth gate', ['chinatown']],
 ['D41 Paseo Boricua',       'Paseo Boricua Puerto Rican flag Division Street Chicago', ['paseo','boricua','puerto']],
 ['D45 Bud Billiken',        'Bud Billiken Parade Chicago', ['billiken']],
 ['D51 Taste of Chicago',    'Taste of Chicago', ['taste of chicago']],
 ['D66 Air and Water Show',  'Chicago Air and Water Show Thunderbirds', ['air','thunderbird']],
 ['D59 Greektown',           'Greektown Chicago Halsted', ['greektown']],
 ['D2 Douglass Park',        'Douglass Park Chicago', ['douglass','douglas park']],
 ['D56 Italian beef',        'Italian beef sandwich', ['italian beef']],
]
;(async()=>{for(const [label,q,must] of CASES){const r=await search(q,must)
  console.log((r?'ok   ':'none ')+label.padEnd(26)+(r?r.title.slice(0,58)+'  ['+r.lic+']':''))}})()
