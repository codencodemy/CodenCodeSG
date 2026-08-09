// codencode.sg — shared interactivity, mirrored from codencode.my's site behavior.

// Course slider drag scroll
(function(){
  const sl=document.getElementById('courseSlider');
  if(!sl)return;
  let down=false,startX,scrollL;
  sl.addEventListener('mousedown',e=>{down=true;startX=e.pageX-sl.offsetLeft;scrollL=sl.scrollLeft;sl.style.userSelect='none'});
  document.addEventListener('mouseup',()=>{down=false;sl.style.userSelect=''});
  sl.addEventListener('mouseleave',()=>down=false);
  sl.addEventListener('mousemove',e=>{if(!down)return;e.preventDefault();const x=e.pageX-sl.offsetLeft;sl.scrollLeft=scrollL-(x-startX)*1.5});
})();

// Mobile nav
var mobBtn=document.getElementById('mob-btn');
var mobMenu=document.getElementById('mob-menu');
if(mobBtn && mobMenu){
  mobBtn.addEventListener('click',()=>{
    mobMenu.classList.toggle('open');
    mobBtn.querySelector('i').className=mobMenu.classList.contains('open')?'fas fa-times':'fas fa-bars';
  });
  document.querySelectorAll('.mob-nav a').forEach(a=>a.addEventListener('click',()=>{
    mobMenu.classList.remove('open');
    mobBtn.querySelector('i').className='fas fa-bars';
  }));
}

// Smooth in-page anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  var href = a.getAttribute('href');
  if (href === '#') return;
  const t=document.querySelector(href);
  if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-68,behavior:'smooth'});}
}));

// Nav border brightens on scroll
var navbar = document.getElementById('navbar') || document.querySelector('.topnav');
if (navbar) {
  window.addEventListener('scroll',()=>{
    navbar.style.borderBottomColor=window.scrollY>50?'var(--bs)':'var(--b)';
  });
}

// THEME TOGGLE
(function(){
  const root=document.documentElement;
  const themeBtn=document.getElementById('theme-btn');
  const mobThemeBtn=document.getElementById('mob-theme-btn');
  const mobThemeLabel=document.getElementById('mob-theme-label');
  function applyTheme(theme){
    root.setAttribute('data-theme',theme);
    const icon=theme==='light'?'fa-moon':'fa-sun';
    if(themeBtn) themeBtn.innerHTML='<i class="fas '+icon+'"></i>';
    if(mobThemeBtn) mobThemeBtn.querySelector('i').className='fas '+icon;
    if(mobThemeLabel) mobThemeLabel.textContent=theme==='light'?'Dark Mode':'Light Mode';
  }
  const saved=localStorage.getItem('ccsg-theme');
  const preferred=saved||'dark';
  applyTheme(preferred);
  function toggleTheme(){
    const next=root.getAttribute('data-theme')==='light'?'dark':'light';
    localStorage.setItem('ccsg-theme',next);
    applyTheme(next);
  }
  if(themeBtn) themeBtn.addEventListener('click',toggleTheme);
  if(mobThemeBtn) mobThemeBtn.addEventListener('click',toggleTheme);
})();

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q=>{
  q.onclick=function(){
    const a=this.nextElementSibling,open=a.classList.contains('open');
    document.querySelectorAll('.faq-a').forEach(el=>el.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(el=>el.classList.remove('open'));
    if(!open){a.classList.add('open');this.classList.add('open');}
  };
});

// /paths.html — track filter tabs
function filterTrack(track, btn) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
    t.style.background = '';
    t.style.borderColor = '';
    t.style.color = '';
  });
  btn.classList.add('active');

  const colors = {
    all: 'var(--c1)', analyst: 'var(--c1)', scientist: 'var(--c2)',
    ml: 'var(--c3)', dev: 'var(--c4)', auto: 'var(--c5)', cyber: 'var(--c6)'
  };
  btn.style.background = colors[track] || 'var(--c1)';
  btn.style.borderColor = colors[track] || 'var(--c1)';
  btn.style.color = '#080c10';

  document.querySelectorAll('.roadmap').forEach(r => {
    if (track === 'all') {
      r.style.display = '';
    } else {
      r.style.display = r.dataset.track === track ? '' : 'none';
    }
  });
}


