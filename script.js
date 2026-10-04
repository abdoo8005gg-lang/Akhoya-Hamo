/* ===== حكاية حمو — المنطق ===== */
// ----- ✏️ عدّل الصور هنا. ضع الملفات في assets/images/ بنفس الأسماء -----
const PHOTOS=[
 ["28373.jpg","اخويا وحبيبي والله"],["28584.jpg","احلى حمو في الدنيا"],
 ["28590.jpg","احلى ذكريات حياتي انت موجود فيها "],["28403.jpg","روح قلبي"],
 ["28498.jpg","كل سنة وانت طيب  يا اخويا "],["28486.jpg","اخويا"],
 ["28497.jpg","يوم حلو","حمو حبيبي"],["28489.jpg","لسه الجاي أحلى","قمر والله يعم في كل حالاتك"]];
const $=s=>document.querySelector(s), scenes=[...document.querySelectorAll('.scene')];
let cur=-1, busy=false;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),3200)}

// ----- الموسيقى (اختيارية، لا تعمل تلقائيًا) -----
const au=$('#audio');
$('#music').onclick = () => { if (au.paused) { au.play().catch(() => toast('عفواً، تعذر تشغيل الصوت')); $('#music').textContent = '🔇 إيقاف الموسيقى'; } else { au.pause(); $('#music').textContent = '🎵 تشغيل الموسيقى'; } };
// ----- التنقل بين الفصول -----
function go(i){
  if(i>=scenes.length)return;
  scenes.forEach(s=>s.classList.remove('on')); cur=i; const s=scenes[i]; s.classList.add('on'); s.scrollTop=0;
  s.querySelectorAll('.ln').forEach((l,k)=>{ if(i<14) l.style.animationDelay=(.4+k*.9)+'s' });
  $('#next').style.display=(i>0&&i<14)?'block':'none';
  $('#next').disabled=false;
  $("#back").style.display = i>0 ? "block" : "none";
  if(i==10){$('#next').style.display='none'}
  if(i==11)showPhoto(0);
  if(i==14)finale();
}
$('#next').onclick=()=>go(cur+1);
$("#back").onclick=()=>go(cur-1);
// ----- شاشة البداية: كتابة حرفًا حرفًا -----
async function typeLine(el,t){for(const c of t){el.textContent+=c;await wait(55)}}
async function intro(){
  scenes[0].classList.add('on'); const p=$('#type');
  const lines=["في يوم من الأيام...","اتولد واحد اسمه محمد عبد المقصود.","بس أنا بحب اقولو  ..."];
  for(const l of lines){p.textContent='';await typeLine(p,l);await wait(1000)}
  p.textContent='';$('#hamo').style.opacity=1;await wait(1500);$('#start').style.display='inline-block';
}
$('#start').onclick=()=>go(1);

// ----- تفاعلات الفصول -----
$('#crimes').onclick=e=>{$('#crimeGrid').hidden=false;e.target.style.display='none'};
document.querySelectorAll('#s5 .card').forEach(c=>c.onclick=()=>toast(c.dataset.m));
$('#egg1').onclick=()=>toast('🌟 سر 1: النجمة دي اتولدت يوم 8 أكتوبر.');
$('#egg2').onclick=()=>toast('💪🏻 سر 2: "يلا نكمّل... بس بعد البرجر" 🍔');
$('#gift').onclick=async()=>{ $('#gift').textContent='🎉'; burst(80); await wait(500); $('#gift').style.display='none'; const g=$('#giftText');g.hidden=false;g.querySelectorAll('.ln').forEach((l,k)=>l.style.animationDelay=k*1.2+'s'); await wait(4500); $('#next').style.display='block'; };

// ----- معرض الصور (3 تأثيرات انتقال) -----
let pi=0;
function showPhoto(i){
  pi=(i+PHOTOS.length)%PHOTOS.length; const [f,t,c]=PHOTOS[pi], el=$('#pol');
  el.className='pol t'+(pi%3+1); void el.offsetWidth;
el.innerHTML=`<div class="ph"><span>${f.replace('.jpg','')}</span><img src="${f}" alt="${t}" onerror="this.remove()"></div><p class="big" style="margin-top:8px">${pi+1}/8 — ${t}</p><p style="font-size:.9rem">${c}</p>`;}
$('#nxt').onclick=()=>showPhoto(pi+1); $('#prev').onclick=()=>showPhoto(pi-1);

// ----- الكونفيتي والنجوم (خفيف: canvas واحد) -----
const cv=$('#fx'),cx=cv.getContext('2d'); let parts=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight} size(); addEventListener('resize',size);
function burst(n){
  const col=['#c9a25a','#f3ead8','#7a1f2e','#ffd98a'];
  for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*14,vy:Math.random()*-12-2,r:2+Math.random()*4,c:col[i%4],life:140+Math.random()*80});
  if(!run){run=true;requestAnimationFrame(tick)}
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts=parts.filter(p=>p.life-->0);
  parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.18;cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.life/40);cx.fillRect(p.x,p.y,p.r,p.r*1.6)});
  if(parts.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}

// ----- اللحظة الكبرى -----
async function finale(){
  const d1=$('#d1'),d2=$('#d2'); d1.textContent='';d2.textContent='';
  [$('#hb'),$('#f1'),$('#f2'),$('#f3')].forEach(e=>{e.style.animation='none';e.style.opacity=0;e.style.transition='opacity 2s'});
  await wait(1500); await typeLine(d1,'8 OCTOBER 2026'); await wait(1200);
  await typeLine(d2,'19 YEARS OF MOHAMED'); await wait(1500);
  burst(140); $('#hb').style.opacity=1; await wait(600); burst(100);
  await wait(2000); $('#f1').style.opacity=1; await wait(2500); $('#f2').style.opacity=1; burst(60);
  await wait(3000); $('#f3').style.opacity=1; await wait(4000); $('#egg3').hidden=false;
}
$('#egg3').onclick=()=>{burst(120);toast('😂 سر 3: كل سنة وإنت طيب... والحكاية فعلاً لسه في أولها. ورايح أعملك مفاجأة تانية قريب.')};

// ----- بدء -----
intro();
