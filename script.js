/* ══════════════════════════════════════
   CallGirlDehradun — Main JavaScript
   ══════════════════════════════════════ */

'use strict';

// ── Phone Number ──────────────────────────
const PHONE = '918057744241';
const WA_MSG = 'Hii.%20Dehradun%20call%20girl%20service';
const PHONE_DISPLAY = '+91-8057744241';

// ── Age Gate ──────────────────────────────
const ageGate = document.getElementById('ageGate');

function enterSite() {
  sessionStorage.setItem('ageVerified', 'true');
  ageGate.classList.add('hidden');
  document.body.style.overflow = '';
}

function leaveSite() {
  window.location.href = 'https://www.google.com';
}

(function initAgeGate() {
  if (sessionStorage.getItem('ageVerified') === 'true') {
    ageGate.classList.add('hidden');
  } else {
    document.body.style.overflow = 'hidden';
  }
})();

// ── Preloader ─────────────────────────────
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = sessionStorage.getItem('ageVerified') === 'true' ? '' : 'hidden';
    // trigger initial reveal
    revealElements();
  }, 2000);
});

// ── Header Scroll ─────────────────────────
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 80);
  backToTop.classList.toggle('visible', scrollY > 600);
  revealElements();
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile Nav ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function openMobileNav() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}
function closeMobileNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}
hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMobileNav());
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMobileNav();
});
navLinks.addEventListener('click', (e) => {
  if (e.target === navLinks) closeMobileNav();
});

// ── Hero Slider ───────────────────────────
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');
let autoSlide;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();

document.querySelectorAll('.hero-arrow').forEach(btn => {
  btn.addEventListener('click', resetAutoSlide);
});

// ── Gallery Filter ────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'cardFadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Counter Animation ─────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

let countersAnimated = false;
function checkCounters() {
  if (countersAnimated) return;
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  const rect = statsBar.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    countersAnimated = true;
    document.querySelectorAll('.stat-num').forEach(animateCounter);
  }
}

// ── Scroll Reveal ─────────────────────────
function revealElements() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('revealed');
    }
  });
  checkCounters();
}

// ── Add data-reveal to elements ───────────
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = [
    '.about-img-wrap',
    '.about-text',
    '.card',
    '.service-card',
    '.step',
    '.testi-card',
    '.why-item',
    '.contact-form-wrap',
    '.contact-card',
    '.stat-item',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.setAttribute('data-delay', String(i % 5));
    });
  });

  revealElements();
});

// ── Contact Form ──────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;

    if (!name || !phone || !service) {
      alert('Please fill in all required fields.');
      return;
    }

    const location = (document.getElementById('location') || {}).value || '';
    const msg = `Hello! I'd like to book a companion.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0ALocation: ${encodeURIComponent(location)}`;
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank');
  });
}

// ── Smooth anchor scroll ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── FAQ Accordion ────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Scroll event binding ──────────────────
window.addEventListener('scroll', revealElements, { passive: true });
