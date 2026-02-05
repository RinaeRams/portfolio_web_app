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

// ===== Enhanced Intersection Observer (reveal + stagger) =====
const revealEls = document.querySelectorAll('.reveal, .card, .project-card, .cert-item, .edu-card, .exp-item');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry, index) => {
    if(entry.isIntersecting){
      setTimeout(() => {
        entry.target.classList.add('show');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1) rotateX(0)';
      }, index * 100);
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px) scale(0.95)';
  el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  io.observe(el);
});

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
  }, 3000);
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

// ===== Enhanced Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = Math.min(scrollPercent, 100) + '%';
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
      const duration = 2000;
      const increment = target / (duration / 16);
      let count = 0;
      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
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

// ===== Enhanced Mouse Parallax Effect =====
const particles = document.querySelector('.particles');
const extraParticles = document.querySelector('.extra-particles');
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  // Particles move opposite to mouse
  const moveX = (mouseX - 0.5) * 20;
  const moveY = (mouseY - 0.5) * 20;
  
  if (particles) {
    particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
  if (extraParticles) {
    extraParticles.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
  }
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
      setTimeout(typeEffect, 80);
    } else {
      typing = false;
      setTimeout(typeEffect, 2000);
    }
  } else {
    if (charIndex > 0) {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300);
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

// ===== Enhanced Parallax Effects =====
const heroMedia = document.querySelector('.hero-media');
const heroText = document.querySelector('.hero-text');
const floatingCards = document.querySelector('.floating-cards');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.getElementById('home');
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  
  // Hero parallax
  if (scrolled < heroSection.offsetHeight) {
    const parallaxFactor = scrolled * 0.4;
    if (heroMedia) {
      heroMedia.style.transform = `translateY(${parallaxFactor}px)`;
      heroMedia.style.opacity = 1 - (scrolled / heroSection.offsetHeight);
    }
    if (heroText) {
      heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    if (floatingCards) {
      floatingCards.style.transform = `translateY(${scrolled * 0.15}px) translateX(${(window.innerWidth - scrolled) * 0.02}px)`;
      floatingCards.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 1.5;
    }
  }
});

// ===== Section-specific parallax =====
const sections = document.querySelectorAll('.section');
sections.forEach((section, index) => {
  const parallaxElements = section.querySelectorAll('[class*="parallax"]');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrolled = window.pageYOffset;
      
      if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const speed = 0.1 + (index * 0.02);
        parallaxElements.forEach((el, i) => {
          const yPos = (scrolled - sectionTop) * speed * (i + 1) * 0.1;
          el.style.transform = `translateY(${yPos}px)`;
        });
      }
    });
  }
});

// ===== Scroll-based element reveal with rotation =====
const rotateReveal = document.querySelectorAll('.rotate-reveal');
const rotateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.style.transform = 'rotate(0deg) scale(1)';
    }
  });
}, { threshold: 0.2 });
rotateReveal.forEach(el => {
  el.style.transform = 'rotate(10deg) scale(0.9)';
  el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  rotateObserver.observe(el);
});

// ===== Scale on scroll =====
const scaleOnScroll = document.querySelectorAll('.scale-on-scroll');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  scaleOnScroll.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      const scale = 1 + ((window.innerHeight - rect.top) / window.innerHeight) * 0.1;
      el.style.transform = `scale(${Math.min(scale, 1.1)})`;
    }
  });
});

// ===== Magnetic effect on cards =====
document.querySelectorAll('.project-card, .edu-card, .cert-item, .exp-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
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

// ===== Active nav link highlighting =====
const navLinks = document.querySelectorAll('.topnav a, .menu a');
const sectionsMap = {};
sections.forEach(section => {
  sectionsMap[section.id] = section.offsetTop;
});

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  let currentSection = '';
  
  Object.keys(sectionsMap).forEach(id => {
    if (sectionsMap[id] <= scrolled + 100) {
      currentSection = id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ===== Scroll to top button =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border: none;
  color: #0a0e1a;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0,212,255,0.4);
`;
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.visibility = 'visible';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
  }
});

scrollBtn.addEventListener('mouseenter', () => {
  scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
});
scrollBtn.addEventListener('mouseleave', () => {
  scrollBtn.style.transform = 'translateY(0) scale(1)';
});
