/* =====================================================
   EL TOLDO — García Melín
   Script principal — sin dependencias externas.
   Recrea a mano el comportamiento del template de
   referencia MotionSites (loader, fade-in on scroll,
   marquee ligado al scroll, texto animado carácter a
   carácter, navbar con glassmorphism, etc.)
   ===================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------
     1. LOADER
     --------------------------------------------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add('is-hidden');
    }, 350);
  });

  /* ---------------------------------------------------
     2. NAVBAR — glassmorphism al hacer scroll + menú móvil
     --------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navbarToggle');
  var navLinks = document.getElementById('navbarLinks');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------
     3. FADE-IN ON SCROLL (equivalente a FadeIn/whileInView)
        Lee data-delay (ms), data-duration (ms), data-x, data-y
     --------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');
  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -50px 0px' }
  );

  fadeEls.forEach(function (el) {
    var delay = el.getAttribute('data-delay');
    var duration = el.getAttribute('data-duration');
    var x = el.getAttribute('data-x');
    var y = el.getAttribute('data-y');

    el.style.setProperty('--fdelay', (delay ? parseInt(delay, 10) : 0) / 1000 + 's');
    el.style.setProperty('--fdur', (duration ? parseInt(duration, 10) : 700) / 1000 + 's');
    el.style.setProperty('--fx', (x ? parseInt(x, 10) : 0) + 'px');
    el.style.setProperty('--fy', (y !== null ? parseInt(y, 10) : 30) + 'px');

    fadeObserver.observe(el);
  });

  /* ---------------------------------------------------
     4. MARQUEE — dos filas que se desplazan según el scroll
     --------------------------------------------------- */
  var track1 = document.getElementById('marqueeTrack1');
  var track2 = document.getElementById('marqueeTrack2');
  var marqueeSection = document.querySelector('.marquee-section');

  function tripleTrack(track) {
    if (!track) return;
    var original = Array.from(track.children);
    for (var i = 0; i < 2; i++) {
      original.forEach(function (node) {
        track.appendChild(node.cloneNode(true));
      });
    }
  }
  tripleTrack(track1);
  tripleTrack(track2);

  var marqueeTicking = false;
  function updateMarquee() {
    if (!marqueeSection) return;
    var rect = marqueeSection.getBoundingClientRect();
    var sectionTop = rect.top + window.scrollY;
    var offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

    if (track1) track1.style.transform = 'translateX(' + (offset - 200) + 'px)';
    if (track2) track2.style.transform = 'translateX(' + (-(offset - 200)) + 'px)';
    marqueeTicking = false;
  }
  window.addEventListener(
    'scroll',
    function () {
      if (!marqueeTicking) {
        window.requestAnimationFrame(updateMarquee);
        marqueeTicking = true;
      }
    },
    { passive: true }
  );
  updateMarquee();

  /* ---------------------------------------------------
     5. TEXTO ANIMADO — revela carácter a carácter según scroll
        (equivalente a AnimatedText, offset ['start 0.8','end 0.2'])
     --------------------------------------------------- */
  var animatedTextEl = document.getElementById('historiaTexto');
  if (animatedTextEl) {
    var rawText = animatedTextEl.textContent.trim();
    animatedTextEl.textContent = '';
    var chars = rawText.split('').map(function (ch) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.opacity = '0.2';
      animatedTextEl.appendChild(span);
      return span;
    });

    var atTicking = false;
    function updateAnimatedText() {
      var rect = animatedTextEl.getBoundingClientRect();
      var vh = window.innerHeight;
      // progress: 0 cuando el bloque entra al 80% del viewport, 1 cuando sale al 20%
      var start = vh * 0.8;
      var end = vh * 0.2;
      var progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      var total = chars.length;
      chars.forEach(function (span, i) {
        var charProgress = (progress * total - i) ;
        var opacity = 0.2 + Math.max(0, Math.min(1, charProgress)) * 0.8;
        span.style.opacity = opacity;
      });
      atTicking = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!atTicking) {
          window.requestAnimationFrame(updateAnimatedText);
          atTicking = true;
        }
      },
      { passive: true }
    );
    updateAnimatedText();
  }

  /* ---------------------------------------------------
     6. MENÚ — filtros por categoría
     --------------------------------------------------- */
  var menuFilters = document.querySelectorAll('.menu-filter');
  var menuCards = document.querySelectorAll('.menu-card');

  function applyMenuFilter(filter) {
    menuCards.forEach(function (card) {
      var show = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('is-shown', show);
    });
  }
  menuFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      menuFilters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyMenuFilter(btn.getAttribute('data-filter'));
    });
  });
  if (menuFilters.length) {
    applyMenuFilter(menuFilters[0].getAttribute('data-filter'));
  }

  /* ---------------------------------------------------
     7. CARRUSEL DE OPINIONES
     --------------------------------------------------- */
  var carouselTrack = document.getElementById('carouselTrack');
  var carouselDotsWrap = document.getElementById('carouselDots');
  var carouselPrev = document.getElementById('carouselPrev');
  var carouselNext = document.getElementById('carouselNext');

  if (carouselTrack) {
    var slides = Array.from(carouselTrack.children);
    var current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goToSlide(i); });
      carouselDotsWrap.appendChild(dot);
    });
    var dots = Array.from(carouselDotsWrap.children);

    function goToSlide(index) {
      current = (index + slides.length) % slides.length;
      carouselTrack.style.transform = 'translateX(' + (-current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    if (carouselPrev) carouselPrev.addEventListener('click', function () { goToSlide(current - 1); });
    if (carouselNext) carouselNext.addEventListener('click', function () { goToSlide(current + 1); });

    var autoplay = setInterval(function () { goToSlide(current + 1); }, 6000);
    var carouselEl = document.getElementById('carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    }
  }

  /* ---------------------------------------------------
     8. FORMULARIO DE RESERVAS — validación
     --------------------------------------------------- */
  var reservaForm = document.getElementById('reservaForm');
  if (reservaForm) {
    var successMsg = document.getElementById('formSuccess');

    var validators = {
      nombre: function (v) { return v.trim().length >= 2; },
      apellido: function (v) { return v.trim().length >= 2; },
      correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      telefono: function (v) { return /^[+\d][\d\s]{7,}$/.test(v.trim()); },
      fecha: function (v) {
        if (!v) return false;
        var selected = new Date(v + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      hora: function (v) {
        if (!v) return false;
        return v >= '12:00' && v <= '17:30';
      },
      personas: function (v) {
        var n = parseInt(v, 10);
        return n >= 1 && n <= 40;
      }
    };

    var errorMessages = {
      nombre: 'Ingresa tu nombre.',
      apellido: 'Ingresa tu apellido.',
      correo: 'Ingresa un correo válido.',
      telefono: 'Ingresa un teléfono válido.',
      fecha: 'Elige una fecha desde hoy en adelante.',
      hora: 'Nuestro horario es de 12:00 a 17:30 hrs.',
      personas: 'Indica entre 1 y 40 personas.'
    };

    reservaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      Object.keys(validators).forEach(function (field) {
        var input = reservaForm.querySelector('#' + field);
        var errorEl = document.getElementById('err-' + field);
        if (!input) return;
        var ok = validators[field](input.value);
        var group = input.closest('.form-group');
        if (!ok) {
          isValid = false;
          if (group) group.classList.add('has-error');
          if (errorEl) errorEl.textContent = errorMessages[field];
        } else {
          if (group) group.classList.remove('has-error');
          if (errorEl) errorEl.textContent = '';
        }
      });

      if (!isValid) {
        if (successMsg) successMsg.textContent = '';
        return;
      }

      // Sin backend: se deja lista la validación; aquí se podría integrar
      // un envío real (fetch a un endpoint, EmailJS, WhatsApp, etc.)
      if (successMsg) {
        successMsg.textContent = '¡Gracias! Tu solicitud de reserva fue registrada. Te confirmaremos a la brevedad.';
      }
      reservaForm.reset();
    });
  }

  /* ---------------------------------------------------
     9. BOTONES FLOTANTES — volver arriba
     --------------------------------------------------- */
  var btnTop = document.getElementById('btnTop');
  if (btnTop) {
    window.addEventListener(
      'scroll',
      function () {
        btnTop.classList.toggle('is-visible', window.scrollY > 500);
      },
      { passive: true }
    );
    btnTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------
     10. AÑO ACTUAL EN EL FOOTER
     --------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
