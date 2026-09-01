(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Smooth Optimized Cursor Glow ---------- */

var glow = document.getElementById('cursor-glow');

if (glow && window.matchMedia('(pointer: fine)').matches) {

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;

  var glowX = mouseX;
  var glowY = mouseY;

  var animationFrame = null;
  var isAnimating = false;

  function animateGlow() {

    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.transform =
      'translate(' + glowX + 'px, ' + glowY + 'px) translate(-50%, -50%)';

    var distance =
      Math.abs(mouseX - glowX) +
      Math.abs(mouseY - glowY);

    if (distance > 0.5) {
      animationFrame = requestAnimationFrame(animateGlow);
    } else {
      isAnimating = false;
      animationFrame = null;
    }
  }

  window.addEventListener('mousemove', function(e) {

    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isAnimating) {
      isAnimating = true;
      animationFrame = requestAnimationFrame(animateGlow);
    }

  }, { passive: true });

}


  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById('progress-bar');

  function updateProgress(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var height = h.scrollHeight - h.clientHeight;
    var pct = height > 0 ? (scrolled / height) * 100 : 0;

    progressBar.style.width = pct + '%';
  }

  var ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      updateProgress();
      ticking = false;
    });

    ticking = true;
  }
}, { passive: true });


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
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + id
          );
        });
      }

    });
  }, {
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(function(s){
    navObserver.observe(s);
  });


  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(
    '.reveal, .reveal-stagger'
  );

  var revealObserver = new IntersectionObserver(function(entries, obs){

    entries.forEach(function(entry){

      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.14
  });

  revealEls.forEach(function(el){
    revealObserver.observe(el);
  });


  /* ---------- Skill bar fill on scroll ---------- */
  var skillFills = document.querySelectorAll('.skill-fill');

  var skillObserver = new IntersectionObserver(function(entries, obs){

    entries.forEach(function(entry){

      if(entry.isIntersecting){

        var el = entry.target;

        el.style.width =
          el.getAttribute('data-fill') + '%';

        obs.unobserve(el);
      }

    });

  }, {
    threshold: 0.4
  });

  skillFills.forEach(function(el){
    skillObserver.observe(el);
  });

    /* ---------- Contact Form AJAX ---------- */

  var form = document.getElementById('contactForm');
  var popup = document.getElementById('successPopup');
  var closePopup = document.getElementById('closePopup');
  var submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function(e) {

    e.preventDefault();

    var originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })

    .then(function(response) {

      if (response.ok) {

        form.reset();

        popup.classList.add('show');

      } else {

        alert('Oops! Something went wrong. Please try again.');

      }

    })

    .catch(function(error) {

      alert('Network error! Please check your internet connection.');

    })

    .finally(function() {

      submitButton.textContent = originalText;
      submitButton.disabled = false;

    });

  });


  /* ---------- Close Success Popup ---------- */

  closePopup.addEventListener('click', function() {

    popup.classList.remove('show');

  });


  /* Close popup when clicking outside */

  popup.addEventListener('click', function(e) {

    if (e.target === popup) {
      popup.classList.remove('show');
    }

  });
  /* ---------- Dark Light Mode ---------- */

var themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeToggle.textContent="☀️";
        localStorage.setItem("theme","light");
    }
    else{
        themeToggle.textContent="🌙";
        localStorage.setItem("theme","dark");
    }

});


// Remember user choice

if(localStorage.getItem("theme")==="light"){

    document.body.classList.add("light-mode");
    themeToggle.textContent="☀️";

}


})();

 function openCV(){

    document.getElementById("cvModal").style.display="flex";

}


function closeCV(){

    document.getElementById("cvModal").style.display="none";

}


document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");
    const shareBtn = document.getElementById("shareBtn");


    /* =====================
       BACK TO TOP
    ===================== */

    if (backToTop) {

        function toggleBackToTop() {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        }

        window.addEventListener("scroll", toggleBackToTop, {
            passive: true
        });

        toggleBackToTop();


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }



    /* =====================
       SHARE BUTTON
    ===================== */

    if (shareBtn) {

        shareBtn.addEventListener("click", async function () {

            const shareData = {
                title: "MD. Hasibul Hasan | Portfolio",
                text: "Check out the personal portfolio of MD. Hasibul Hasan.",
                url: window.location.href
            };


            /* Mobile / supported browser */

            if (navigator.share) {

                try {

                    await navigator.share(shareData);

                } catch (error) {

                    console.log("Share cancelled");

                }

            }


            /* Desktop fallback */

            else {

                try {

                    await navigator.clipboard.writeText(window.location.href);

                    const oldHTML = shareBtn.innerHTML;

                    shareBtn.innerHTML = `
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"
                                fill="currentColor">
                            </path>
                        </svg>
                    `;

                    setTimeout(function () {
                        shareBtn.innerHTML = oldHTML;
                    }, 1500);

                } catch (error) {

                    alert("Portfolio URL: " + window.location.href);

                }

            }

        });

    }

});
