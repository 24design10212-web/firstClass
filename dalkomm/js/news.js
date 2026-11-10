// 대표 뉴스 카드 슬라이드
document.addEventListener('DOMContentLoaded',function(){
 const image=document.querySelector('#news-feature-image'),category=document.querySelector('#news-feature-category'),title=document.querySelector('#news-feature-title'),summary=document.querySelector('#news-feature-summary'),current=document.querySelector('#news-slide-current'),prev=document.querySelector('#news-slide-prev'),next=document.querySelector('#news-slide-next');
 if(image&&category&&title&&summary&&current&&prev&&next){
  const slides=[
   {image:'img/img4.png',alt:'달콤.N 숙성라떼 이미지',category:'NEW MENU · 2026.07.29',title:'더 깊고, 진해졌다! 달콤.N 시그니처 숙성라떼',summary:'숙성우유의 묵직한 바디감과 고소한 풍미를 담은 달콤.N의 새로운 시그니처 메뉴를 만나보세요.'},
   {image:'img/img5.png',alt:'성수 다날스퀘어 달콤.N 팝업스토어 이미지',category:'BRAND STORY · 2026.07.09',title:'달콤.N 팝업스토어, 성수 다날스퀘어 입점',summary:'성수 에스팩토리 다날스퀘어에서 달콤.N의 커피와 디저트를 만나볼 수 있습니다.'},
   {image:'img/img6.png',alt:'달콤.N 여름 시즌 음료 이미지',category:'SEASON MENU · 2026.07.06',title:'무더위를 겨냥한 달콤.N 여름 시즌 신메뉴 3종',summary:'과일 스무디와 소다 음료로 구성한 달콤.N의 여름 시즌 메뉴를 소개합니다.'}
  ];let index=0;
  function render(){const s=slides[index];image.src=s.image;image.alt=s.alt;category.textContent=s.category;title.textContent=s.title;summary.textContent=s.summary;current.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0')}
  prev.addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;render()});
  next.addEventListener('click',()=>{index=(index+1)%slides.length;render()});
 }
});
// BRAND 드롭다운
document.addEventListener('DOMContentLoaded',function(){
 const item=document.querySelector('.nav-item--brand'),trigger=document.querySelector('.brand-trigger');if(!item||!trigger)return;
 function setOpen(open){item.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open))}
 trigger.addEventListener('click',e=>{e.stopPropagation();setOpen(!item.classList.contains('is-open'))});
 document.addEventListener('click',e=>{if(!item.contains(e.target))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&item.classList.contains('is-open')){setOpen(false);trigger.focus()}});
 item.querySelectorAll('.brand-dropdown a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
});