// ── Clock ──
function updateClock() {
  const el = document.getElementById('nav-clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// ── Uptime ──
const startTime = Date.now();
function updateUptime() {
  const el = document.getElementById('uptime');
  if (!el) return;
  const s = Math.floor((Date.now() - startTime) / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  el.textContent = `${h}:${m}:${sec}`;
}
setInterval(updateUptime, 1000);

// ── Mobile menu ──
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// ── Active nav link ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  a.classList.remove('active');
  if (a.getAttribute('href') === path) a.classList.add('active');
});

// ── Skill bar animation ──
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(el => {
    const pct = getComputedStyle(el).getPropertyValue('--w').trim() || el.dataset.w;
    if (pct) el.style.width = pct;
  });
}
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateSkills(); skillObs.disconnect(); } });
}, { threshold: 0.1 });
const skillSection = document.querySelector('.skills-section');
if (skillSection) skillObs.observe(skillSection);

// ── Fade-up on scroll ──
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.card, .proj-card, .tl-item, .research-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});
