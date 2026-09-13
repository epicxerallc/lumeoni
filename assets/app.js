const WHATSAPP_PHONE = '94770000000'; // Replace with your verified WhatsApp Business number.

const products = [
  {
    id:'red-panda', title:'Little Red Panda Discovery Pack', age:'Ages 2–4', tier:'toddler',
    usd:'$7.50', lkr:'LKR 2,450', image:'assets/images/red-panda-pack.svg',
    desc:'A gentle first nature pack with matching cards, paw-print play and simple woodland vocabulary.',
    features:['18 printable activity pages','A4 + US Letter friendly layouts','3-part cards and matching prompts','Quiet-play ideas for home or classroom']
  },
  {
    id:'seasons', title:'Four Seasons Sorting Board', age:'Ages 2–4', tier:'toddler',
    usd:'$6.00', lkr:'LKR 1,950', image:'assets/images/four-seasons.svg',
    desc:'Soft seasonal sorting with familiar leaves, weather clues and nature objects.',
    features:['Four seasonal sorting mats','Cut-and-place nature pieces','Simple parent prompt guide','Low-ink margin aware layout']
  },
  {
    id:'oak', title:'Woodland Oak Life Cycle', age:'Ages 5–7', tier:'early',
    usd:'$8.50', lkr:'LKR 2,750', image:'assets/images/oak-life-cycle.svg',
    desc:'Follow an acorn from seed to towering oak with sequencing cards and journaling prompts.',
    features:['Life-cycle sequencing wheel','Botanical vocabulary cards','Observation journal page','Cut, order and retell activities']
  },
  {
    id:'pond', title:'Freshwater Pond Ecosystem', age:'Ages 5–7', tier:'early',
    usd:'$9.00', lkr:'LKR 2,900', image:'assets/images/pond-ecosystem.svg',
    desc:'A calm introduction to pond life, food chains and the small creatures hiding at the waterline.',
    features:['Pond-zone matching activity','Species cards and labels','Simple food-chain builder','Nature journal extension prompts']
  },
  {
    id:'herbarium', title:'Wildflower Press Herbarium', age:'Ages 8–12', tier:'junior',
    usd:'$7.50', lkr:'LKR 2,450', image:'assets/images/wildflower-herbarium.svg',
    desc:'A field-study printable for leaf form, flower anatomy and keeping a beautiful home herbarium.',
    features:['Archival-style specimen sheets','Leaf and flower anatomy guide','Pressing and labeling notes','Nature poetry reflection page']
  },
  {
    id:'birds', title:'Birds of the World: Feathers', age:'Ages 8–12', tier:'junior',
    usd:'$8.00', lkr:'LKR 2,600', image:'assets/images/bird-feathers.svg',
    desc:'Explore feather shapes, function and careful observation through an elegant field-guide format.',
    features:['Feather-type reference page','Observation and compare prompts','Bird plumage vocabulary','Field notebook mini-project']
  },
  {
    id:'bundle', title:'Woodland Explorer Bundle', age:'Ages 2–12', tier:'bundle',
    usd:'$34.00', lkr:'LKR 9,900', image:'assets/images/woodland-bundle.svg',
    desc:'A mixed-age collection of nature printables made for siblings, co-ops and homeschool shelves.',
    features:['8 coordinated printable packs','Mixed-age learning prompts','A4 + US Letter formats','Single organized Drive delivery folder']
  },
  {
    id:'sampler', title:'Free Welcome Sampler', age:'Ages 2–7', tier:'free',
    usd:'FREE', lkr:'FREE', image:'assets/images/free-sampler.svg',
    desc:'Three-part acorn cards plus a soft woodland colouring sheet — a small hello from the studio.',
    features:['3-part acorn cards','1 colouring sheet','Print-at-home PDF','A gentle first look at Lumeoni']
  }
];

function qs(s, scope=document){return scope.querySelector(s)}
function qsa(s, scope=document){return [...scope.querySelectorAll(s)]}

function whatsappUrl(product){
  const text = `Hello Lumeoni Studio! 🌿\nI would like to order this printable pack:\n\n📦 Product: *${product.title}*\n🎯 Target Age: *${product.age}*\n💰 Price: *${product.usd} (${product.lkr})*\n📁 Delivery: *Google Drive Link via WhatsApp*\n\nPlease send payment details so I can receive the download link. Thank you!`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function productCard(p){
  const tierLabel = p.tier === 'toddler' ? 'Toddler' : p.tier === 'early' ? 'Early Explorer' : p.tier === 'junior' ? 'Junior Botanist' : p.tier === 'bundle' ? 'Bundle' : 'Welcome Gift';
  return `<article class="product-card reveal" data-tier="${p.tier}">
    <div class="product-art"><img src="${p.image}" alt="Watercolour-inspired preview for ${p.title}" loading="lazy"></div>
    <div class="product-body">
      <div class="product-meta"><span class="badge">${tierLabel}</span><span class="badge panda">${p.age}</span></div>
      <h3>${p.title}</h3><p>${p.desc}</p>
      <div class="product-footer"><div class="price">${p.usd}<small>${p.lkr}</small></div><button class="btn btn-ghost btn-small" data-product="${p.id}">View pack</button></div>
    </div>
  </article>`;
}

function renderProducts(targetSelector, limit){
  const target = qs(targetSelector); if(!target) return;
  const list = typeof limit === 'number' ? products.slice(0,limit) : products;
  target.innerHTML = list.map(productCard).join('');
  bindProductButtons();
  observeReveal();
}

function bindProductButtons(){
  qsa('[data-product]').forEach(btn=>btn.addEventListener('click',()=>openProduct(btn.dataset.product)));
}

function openProduct(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  const modal = qs('#productModal'); if(!modal) return;
  qs('#modalImage').src = p.image;
  qs('#modalImage').alt = `Preview for ${p.title}`;
  qs('#modalAge').textContent = p.age;
  qs('#modalTitle').textContent = p.title;
  qs('#modalDesc').textContent = p.desc;
  qs('#modalPrice').innerHTML = `${p.usd} <small>${p.lkr}</small>`;
  qs('#modalFeatures').innerHTML = p.features.map(x=>`<li>${x}</li>`).join('');
  qs('#modalWhatsApp').href = whatsappUrl(p);
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  const modal=qs('#productModal'); if(modal) modal.classList.remove('open');
  document.body.style.overflow='';
}

function observeReveal(){
  const items=qsa('.reveal:not(.visible)');
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
  items.forEach(x=>io.observe(x));
}

function setYear(){qsa('[data-year]').forEach(el=>el.textContent=new Date().getFullYear())}

function bindNav(){
  const btn=qs('.mobile-toggle'), menu=qs('.mobile-menu');
  if(btn&&menu) btn.addEventListener('click',()=>{menu.classList.toggle('open');btn.setAttribute('aria-expanded',menu.classList.contains('open'))});
}

function bindModal(){
  const modal=qs('#productModal'); if(!modal) return;
  qs('.modal-close',modal)?.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
}

function bindFilters(){
  const buttons=qsa('.filter-btn'); if(!buttons.length) return;
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    const f=btn.dataset.filter;
    qsa('.product-card').forEach(card=>{card.style.display=(f==='all'||card.dataset.tier===f)?'flex':'none'});
  }));
}

function bindFaq(){qsa('.faq button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq').classList.toggle('open')))}

function bindContact(){
  const form=qs('#contactForm'); if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const msg=`Hello Lumeoni Studio! 🌿\n\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nTopic: ${fd.get('topic')}\n\n${fd.get('message')}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  });
}

function bindKidsRoom(){
  const items=qsa('.find-item'); if(!items.length) return;
  let found=0;
  const total=items.length, count=qs('#findCount'), bar=qs('#findProgress'), status=qs('#findStatus');
  items.forEach(item=>item.addEventListener('click',()=>{
    if(item.classList.contains('found')) return;
    item.classList.add('found'); found++;
    count.textContent=`${found}/${total}`; bar.style.width=`${(found/total)*100}%`;
    status.textContent = found===total ? 'You found the whole woodland set! 🌿' : item.dataset.label + ' found!';
  }));

  let audioCtx;
  const notes=[261.63,293.66,329.63,392,440,523.25];
  qsa('.chime').forEach((pad,i)=>pad.addEventListener('click',()=>{
    audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.type='sine'; osc.frequency.value=notes[i%notes.length];
    gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.16,audioCtx.currentTime+.02);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+1.15);
    osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+1.2);
    pad.classList.add('active');setTimeout(()=>pad.classList.remove('active'),280);
  }));
}

function decorateWhatsAppLinks(){
  qsa('[data-whatsapp]').forEach(a=>{a.href=`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello Lumeoni Studio! 🌿 I would love some help choosing a printable pack.')}`});
}

function includeModal(){
  if(qs('#productModal')) return;
  document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="productModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-panel">
      <button class="modal-close" aria-label="Close">×</button>
      <div class="modal-grid"><div class="modal-media"><img id="modalImage" src="" alt=""></div>
      <div class="modal-copy"><span class="badge panda" id="modalAge"></span><h2 class="display" id="modalTitle"></h2><p id="modalDesc"></p>
      <ul class="feature-list" id="modalFeatures"></ul><div class="price" id="modalPrice"></div>
      <div style="display:flex;gap:.7rem;flex-wrap:wrap;margin-top:22px"><a id="modalWhatsApp" class="btn btn-primary" target="_blank" rel="noopener">Order via WhatsApp</a><button class="btn btn-ghost" onclick="closeModal()">Keep browsing</button></div>
      <p class="small" style="margin-top:14px">After payment confirmation, your files are delivered as a Google Drive link via WhatsApp.</p></div></div>
    </div></div>`);
}

document.addEventListener('DOMContentLoaded',()=>{
  includeModal(); setYear(); bindNav(); bindModal(); bindFilters(); bindFaq(); bindContact(); bindKidsRoom(); decorateWhatsAppLinks(); observeReveal(); bindProductButtons();
});
