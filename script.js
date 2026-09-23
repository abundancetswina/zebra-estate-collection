(function(){
  var root = document.documentElement;
  var nav = document.getElementById('nav');
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');
  var background = document.querySelectorAll('#nav, main, footer');

  /* one orchestrated load moment */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ root.classList.add('is-ready'); });
  });

  /* nav background on scroll */
  var onScroll = function(){
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  /* mobile menu */
  function setMenu(open){
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    /* keep keyboard focus inside the overlay while it is open */
    background.forEach(function(el){ el.inert = open; });
    if (open) closeBtn.focus(); else openBtn.focus();
  }
  openBtn.addEventListener('click', function(){ setMenu(true); });
  closeBtn.addEventListener('click', function(){ setMenu(false); });
  document.querySelectorAll('[data-menu-link]').forEach(function(a){
    a.addEventListener('click', function(){ setMenu(false); });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });
})();
