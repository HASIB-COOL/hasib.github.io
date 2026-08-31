(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById('cursor-glow');
  var gx = window.innerWidth/2, gy = window.innerHeight/2, cx = gx, cy = gy;
  window.addEventListener('mousemove', function(e){ gx = e.clientX; gy = e.clientY; });
  function animateGlow(){
    cx += (gx - cx) * 0.08;
    cy += (gy - cy) * 0.08;
    if(glow){ glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)'; }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById('progress-bar');
  function updateProgress(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var height = h.scrollHeight - h.clientHeight;
    var pct = height > 0 ? (scrolled / height) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function(){
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = navLinks.querySelectorAll('a');
  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function(s){ navObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  var revealObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealEls.forEach(function(el){ revealObserver.observe(el); });

  /* ---------- Skill bar fill on scroll ---------- */
  var skillFills = document.querySelectorAll('.skill-fill');
  var skillObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        el.style.width = el.getAttribute('data-fill') + '%';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(function(el){ skillObserver.observe(el); });

 

})();
