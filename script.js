// ===== Sidebar open/close =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openSidebarBtn');
const closeBtn = document.getElementById('closeSidebarBtn');

function openSidebar(){
  sidebar.classList.add('open');
  overlay.classList.add('show');
  sidebar.setAttribute('aria-hidden', 'false');
  openBtn.setAttribute('aria-expanded', 'true');
  sidebar.querySelector('a,button')?.focus();
}
function closeSidebar(){
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  sidebar.setAttribute('aria-hidden', 'true');
  openBtn.setAttribute('aria-expanded', 'false');
}
openBtn?.addEventListener('click', openSidebar);
closeBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

// Close on Escape
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeSidebar() });

// ===== Intersection Observer (reveal + cards) =====
const revealEls = document.querySelectorAll('.reveal, .card');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry, index) => {
    if(entry.isIntersecting){
      setTimeout(() => {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }, index * 150); // Stagger delay
    }
  });
},{ threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== Smooth scroll & close sidebar on nav click =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeSidebar();
    }
  });
});

// ===== Simple contact form validation =====
const form = document.getElementById('contactForm');
const statusEl = document.querySelector('.form-status');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();
  if(!name || !email || !message){
    statusEl.textContent = 'Please fill in all fields.';
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!emailOk){
    statusEl.textContent = 'Please enter a valid email.';
    return;
  }
  statusEl.textContent = 'Sending...';
  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      statusEl.textContent = 'Thanks! Message sent successfully.';
      form.reset();
    } else {
      statusEl.textContent = 'Oops! There was a problem sending your message.';
    }
  }).catch(error => {
    statusEl.textContent = 'Oops! There was a problem sending your message.';
  });
});

// ===== Loading Screen =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
  }, 4000);
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Live Clock =====
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('liveClock').textContent = `Current Time: ${timeString}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// ===== Ripple Effect =====
document.querySelectorAll('.ripple').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = this;
    ripple.classList.add('active');
    setTimeout(() => {
      ripple.classList.remove('active');
    }, 600);
  });
});

// ===== Animated Counters =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;
      let count = 0;
      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// ===== Mouse Parallax Effect =====
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  const particles = document.querySelector('.particles');
  const moveX = (mouseX - 0.5) * 30;
  const moveY = (mouseY - 0.5) * 30;
  particles.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + mouseX * 0.1})`;
});

// ===== Typed Text Effect (hero) =====
const typedEl = document.getElementById('typed');
const words = ["Rinae Ramadi", "a Software Developer", "a Full-Stack Developer", "a Mobile Developer", "an Innovator"];
let wordIndex = 0, charIndex = 0, typing = true;

function typeEffect() {
  const current = words[wordIndex];
  if (typing) {
    if (charIndex < current.length) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeEffect, 90);
    } else {
      typing = false;
      setTimeout(typeEffect, 1500);
    }
  } else {
    if (charIndex > 0) {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 60);
    } else {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 250);
    }
  }
}
typeEffect();

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
});

// ===== Parallax Effect =====
const heroMedia = document.querySelector('.hero-media');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (scrolled < window.innerHeight) {
    heroMedia.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Touch Interactions =====
let startX, startY;
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
document.addEventListener('touchend', (e) => {
  if (!startX || !startY) return;
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = endX - startX;
  const diffY = endY - startY;
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0 && startX < 50 && !sidebar.classList.contains('open')) {
      openSidebar();
    } else if (diffX < 0 && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  }
  startX = null;
  startY = null;
});

// ===== Button Press Effect =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
  btn.addEventListener('mouseup', () => btn.classList.remove('pressed'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('pressed'));
});

