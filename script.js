    // LOADER
    const loaderTexts = ['Inicializando...', 'Cargando modulos...', 'Preparando interfaz...', 'Listo!'];
    let prog = 0;
    const loaderFill = document.getElementById('loaderFill');
    const loaderTxt = document.getElementById('loaderText');
    const loaderInterval = setInterval(function () {
      prog += Math.random() * 18 + 5;
      if (prog >= 100) { prog = 100; clearInterval(loaderInterval); }
      loaderFill.style.width = prog + '%';
      loaderTxt.textContent = loaderTexts[Math.min(Math.floor(prog / 26), 3)];
      if (prog >= 100) {
        setTimeout(function () {
          var loader = document.getElementById('loader');
          if (loader) loader.classList.add('hidden');
        }, 400);
      }
    }, 80);

    // CURSOR
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    function animCursor() {
      if (dot && ring) {
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      }
      requestAnimationFrame(animCursor);
    }
    animCursor();
    document.querySelectorAll('a,button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (ring) ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { if (ring) ring.classList.remove('hover'); });
    });

    // SCROLL
    window.addEventListener('scroll', function () {
      var sp = document.getElementById('scrollProgress');
      var navbar = document.getElementById('navbar');
      var btt = document.getElementById('backToTop');
      var st = window.scrollY;
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      if (sp) sp.style.width = (dh > 0 ? (st / dh * 100) : 0) + '%';
      if (navbar) navbar.classList.toggle('scrolled', st > 50);
      if (btt) btt.classList.toggle('visible', st > 400);
    }, { passive: true });

    // HAMBURGER
    var ham = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (ham && navLinks) {
      ham.addEventListener('click', function () {
        ham.classList.toggle('active');
        navLinks.classList.toggle('open');
        ham.setAttribute('aria-expanded', navLinks.classList.contains('open').toString());
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          ham.classList.remove('active'); navLinks.classList.remove('open');
          ham.setAttribute('aria-expanded', 'false');
        });
      });
      document.addEventListener('click', function (e) {
        if (!ham.contains(e.target) && !navLinks.contains(e.target)) {
          ham.classList.remove('active'); navLinks.classList.remove('open');
          ham.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // BACK TO TOP
    var bttBtn = document.getElementById('backToTop');
    if (bttBtn) bttBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // REVEAL ON SCROLL
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(function (el) { revealObs.observe(el); });

    // COUNTERS
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.target, current = 0;
        var step = target / (1500 / 16);
        var timer = setInterval(function () {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(function (el) { counterObs.observe(el); });

    // SKILL BARS
    var skillObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.skill-fill').forEach(function (bar) { bar.style.width = bar.dataset.width + '%'; });
        skillObs.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.about-card').forEach(function (card) { skillObs.observe(card); });

    // TYPING
    var phrases = ['Desarrollador Frontend', 'Desarrollador Backend', 'Desarrollador Full Stack', 'Disenador UI/UX', 'Apasionado por el codigo'];
    var pi = 0, ci = 0, deleting = false;
    var typingEl = document.getElementById('typingText');
    function type() {
      if (!typingEl) return;
      var phrase = phrases[pi];
      typingEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
      var delay = deleting ? 60 : 110;
      if (!deleting && ci > phrase.length) { deleting = true; delay = 1800; }
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; delay = 400; }
      setTimeout(type, delay);
    }
    setTimeout(type, 1200);

    // PARTICLES
    var canvas = document.getElementById('particleCanvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      var particles = [];
      function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });
      for (var i = 0; i < 55; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1
        });
      }
      function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,255,195,' + p.opacity + ')'; ctx.fill();
        });
        for (var a = 0; a < particles.length; a++) {
          for (var b = a + 1; b < particles.length; b++) {
            var d = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
            if (d < 100) {
              ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.strokeStyle = 'rgba(0,255,195,' + (0.06 * (1 - d / 100)) + ')';
              ctx.lineWidth = 0.5; ctx.stroke();
            }
          }
        }
        requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    // SLIDERS
    function initSlider(trackId, dotsId) {
      var track = document.getElementById(trackId);
      var dotsContainer = document.getElementById(dotsId);
      if (!track || !dotsContainer) return;
      var slides = track.children;
      var total = slides.length;
      var current = 0;
      dotsContainer.innerHTML = '';
      for (var i = 0; i < total; i++) {
        (function (idx) {
          var d = document.createElement('button');
          d.className = 'slider-dot' + (idx === 0 ? ' active' : '');
          d.setAttribute('aria-label', 'Slide ' + (idx + 1));
          d.addEventListener('click', function () { goTo(idx); });
          dotsContainer.appendChild(d);
        })(i);
      }
      function goTo(n) {
        current = ((n % total) + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dotsContainer.querySelectorAll('.slider-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
      var container = track.closest('.slider-container');
      var prevBtn = container.querySelector('.slider-btn.prev');
      var nextBtn = container.querySelector('.slider-btn.next');
      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
      var startX = 0;
      track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      track.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      }, { passive: true });
    }
    initSlider('sliderFinanzas', 'dotsFinanzas');
    initSlider('sliderStepstyle', 'dotsStepstyle');
    initSlider('sliderQuecafe', 'dotsQuecafe');