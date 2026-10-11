const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const applyTheme = (theme) => {
  const root = document.documentElement;
  const isDark = theme === 'dark';
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeToggle) {
    themeToggle.innerHTML = isDark ? '<span aria-hidden="true">☀️</span>' : '<span aria-hidden="true">🌙</span>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  localStorage.setItem('acces-theme', theme);
};

const savedTheme = localStorage.getItem('acces-theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('is-open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  });
}
