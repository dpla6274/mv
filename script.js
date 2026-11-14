/**
 * 링크 설정: 이동할 주소를 따옴표 안에 입력한 후 Cloudflare에 재업로드.
 * 중앙 두 인물은 하나의 링크(couple)로 통합했습니다.
 * 인물의 이름만 외부 링크이고 연대기와 붉은 문장은 일반 텍스트입니다.
 */
const LINKS = {
  couple: 'https://youtube.com/playlist?list=PLPOv65CdoMiw&si=33Mn_ayC2dG6dNeY',
  'maria-title': 'https://x.com/DPLA_6274',
  'vittorio-title': 'https://caveduck.io/ko/share/characters/4dd9205a-b982-496f-9597-72c5ddfc8b49?rc=1qQMZ53X9o&_share_hash=',
  newspaper: 'https://dpla.tistory.com/category/VITTORIO/VITTORIO',
  notebook: 'https://dpla-g6274.tistory.com/category/VITTORIO',
};

const LABELS = {
  couple: 'MARIA & VITTORIO — CHARACTERS',
  'maria-title': 'MARIA PARK',
  'vittorio-title': 'VITTORIO',
  newspaper: 'THE NEWSPAPER',
  notebook: 'THE NOTEBOOK',
};
const viewport = document.querySelector('#viewport');
const scene = document.querySelector('#scene');
const label = document.querySelector('#cursor-label');
const mobileMode = window.matchMedia('(max-width: 700px) and (orientation: portrait)');
let scale=1, panX=0, maxPan=0, drag=null, blockNextClick=false, messageTimer;
function hideMessage() {label.classList.remove('show');}
function showMessage(message,x,y) {
  clearTimeout(messageTimer);
  label.textContent=message;
  label.style.left=`${Math.max(5,Math.min(x,window.innerWidth-325))}px`;
  label.style.top=`${Math.max(5,Math.min(y,window.innerHeight-85))}px`;
  label.classList.add('show');
  messageTimer=setTimeout(hideMessage,2300);
}
function fit() {
  const w=viewport.clientWidth, h=viewport.clientHeight;
  scale=Math.max(w/1920,h/1080);
  maxPan=mobileMode.matches ? Math.max(0,(1920*scale-w)/2) : 0;
  panX=Math.max(-maxPan,Math.min(maxPan,panX));
  render();
}
function render() {scene.style.transform=`translate(-50%, -50%) translateX(${panX}px) scale(${scale})`;}
window.addEventListener('resize',fit,{passive:true});
window.addEventListener('orientationchange',fit);
fit();

for(const a of document.querySelectorAll('[data-id]')) {
  const id=a.dataset.id;
  const url=LINKS[id];
  if(url) {
    // SVG <a>의 .href는 SVGAnimatedString이므로 속성을 명시적으로 교체해야 작동함.
    a.setAttribute('href',url);
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener noreferrer');
  }
  a.addEventListener('click',e=>{
    if(blockNextClick){e.preventDefault();return;}
    if(url) return;
    e.preventDefault();
    const r=a.getBoundingClientRect();
    showMessage(`${LABELS[id]} · 링크 주소 미설정 (script.js)`,r.left,r.top);
  });
  if(a.classList.contains('hotspot')) {
    a.addEventListener('pointerenter',()=>{
      if(mobileMode.matches) return;
      scene.dataset.hover=id;
    });
    a.addEventListener('pointerleave',()=>{
      if(scene.dataset.hover===id) scene.removeAttribute('data-hover');
    });
    a.addEventListener('focus',()=>{scene.dataset.hover=id;});
    a.addEventListener('blur',()=>scene.removeAttribute('data-hover'));
  }
}
// 모바일 세로에서는 일러스트를 좌우로 움직이며 둘러볼 수 있습니다.
viewport.addEventListener('pointerdown',e=>{
  if(!mobileMode.matches) return;
  drag={pointerId:e.pointerId,startX:e.clientX,startPan:panX,moved:false};
  // 탭 링크를 살리기 위해 여기서는 포인터를 강제로 캡처하지 않습니다.
  // 실제 드래그가 시작된 경우에만 캡처합니다.
  blockNextClick=false;
});
viewport.addEventListener('pointermove',e=>{
  if(!drag||!mobileMode.matches||drag.pointerId!==e.pointerId) return;
  const delta=e.clientX-drag.startX;
  if(Math.abs(delta)>7) drag.moved=true;
  if(drag.moved){
    if(!viewport.hasPointerCapture(e.pointerId)) viewport.setPointerCapture(e.pointerId);
    panX=Math.max(-maxPan,Math.min(maxPan,drag.startPan+delta));
    render();
    viewport.classList.add('is-dragging');
  }
});
function stopDrag(e){
  if(!drag||drag.pointerId!==e.pointerId) return;
  if(drag.moved){blockNextClick=true;setTimeout(()=>blockNextClick=false,60);}
  drag=null;viewport.classList.remove('is-dragging');
}
viewport.addEventListener('pointerup',stopDrag);
viewport.addEventListener('pointercancel',stopDrag);
