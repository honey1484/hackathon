/* =========================================================
   NetScope AI — app.js  (Router + Auth + Interactivity)
   ========================================================= */

const app = document.getElementById('app');

/* -------- Toast Notification -------- */
function showToast(msg, type) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const colors = {
    success: 'border-color:#10b981;background:rgba(16,185,129,.12);color:#34d399;',
    error:   'border-color:#ef4444;background:rgba(239,68,68,.12);color:#f87171;',
    info:    'border-color:#0ea5e9;background:rgba(14,165,233,.12);color:#38bdf8;',
  };
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `position:fixed;top:24px;right:24px;z-index:9999;padding:14px 22px;border-radius:12px;font-size:.88rem;font-weight:600;border-left:4px solid;backdrop-filter:blur(12px);animation:fadeIn .3s ease;max-width:380px;${colors[type]||colors.info}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* -------- Theme Toggle -------- */
function initTheme() {
  const isLight = localStorage.getItem('theme') === 'light';
  if (isLight) document.body.classList.add('light-theme');
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
}
// Init immediately
initTheme();

/* -------- Auth State -------- */
let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch('/api/me');
    const data = await res.json();
    if (data.success) { currentUser = data.user; return true; }
    currentUser = null; return false;
  } catch { currentUser = null; return false; }
}

/* -------- Protected pages list -------- */
const protectedPages = ['dashboard','newscan','subdomains','ports','services','ssl','techstack','exposures','reports','profile'];

/* -------- Hash Router -------- */
const routes = {
  '': renderLanding,
  'login': renderLogin,
  'signup': renderSignup,
  'dashboard': renderDashboard,
  'newscan': renderNewScan,
  'subdomains': renderSubdomains,
  'ports': renderPorts,
  'services': renderServices,
  'ssl': renderSSL,
  'techstack': renderTechStack,
  'exposures': renderExposures,
  'reports': renderReports,
  'profile': renderProfile,
};

async function navigate() {
  const hash = location.hash.replace('#', '') || '';

  // If trying to access a protected page, check auth first
  if (protectedPages.includes(hash)) {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) {
      showToast('Please log in to access the dashboard', 'error');
      location.hash = '#login';
      return;
    }
  }

  const render = routes[hash];
  if (render) {
    app.innerHTML = render();
    window.scrollTo(0, 0);
    bindPageEvents(hash);
  } else {
    app.innerHTML = renderLanding();
    window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

/* -------- Page-specific event bindings -------- */
function bindPageEvents(page) {
  // Mobile sidebar toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      menuBtn.innerHTML = sidebar.classList.contains('open') ? IC.x : IC.menu;
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      menuBtn.innerHTML = IC.menu;
    });
  }

  if (page === '') {
    initNetworkCanvas();
  }

  // ── Login form — real API call ──
  if (page === 'login') {
    const form = document.getElementById('loginForm');
    const errBox = document.getElementById('loginError');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (errBox) errBox.style.display = 'none';
        const btn = document.getElementById('loginBtn');
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;

        btn.innerHTML = '<div class="login-spinner"></div>';
        btn.disabled = true;

        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          if (data.success) {
            currentUser = data.user;
            showToast('Welcome back, ' + data.user.name + '!', 'success');
            setTimeout(() => { location.hash = '#dashboard'; }, 600);
          } else {
            if (errBox) { errBox.textContent = data.message; errBox.style.display = 'block'; }
            showToast(data.message, 'error');
            btn.innerHTML = 'Sign In ' + IC.arrow;
            btn.disabled = false;
          }
        } catch (err) {
          showToast('Cannot connect to server', 'error');
          btn.innerHTML = 'Sign In ' + IC.arrow;
          btn.disabled = false;
        }
      });
    }
  }

  // ── Signup form — real API call ──
  if (page === 'signup') {
    const form = document.getElementById('signupForm');
    const errBox = document.getElementById('signupError');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (errBox) errBox.style.display = 'none';
        const btn = document.getElementById('signupBtn');
        const inputs = form.querySelectorAll('input');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value;
        const confirmPassword = inputs[3].value;

        btn.innerHTML = '<div class="login-spinner"></div>';
        btn.disabled = true;

        try {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
          });
          const data = await res.json();
          if (data.success) {
            currentUser = data.user;
            showToast('Account created! Welcome, ' + data.user.name + '!', 'success');
            setTimeout(() => { location.hash = '#dashboard'; }, 600);
          } else {
            if (errBox) { errBox.textContent = data.message; errBox.style.display = 'block'; }
            showToast(data.message, 'error');
            btn.innerHTML = 'Create Account ' + IC.arrow;
            btn.disabled = false;
          }
        } catch (err) {
          showToast('Cannot connect to server', 'error');
          btn.innerHTML = 'Create Account ' + IC.arrow;
          btn.disabled = false;
        }
      });
    }
  }

  // ── Profile page — load user data & change password ──
  if (page === 'profile') {
    loadProfileData();
    const pwForm = document.getElementById('changePasswordForm');
    if (pwForm) {
      pwForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = pwForm.querySelectorAll('input');
        const currentPassword = inputs[0].value;
        const newPassword = inputs[1].value;
        const confirmNewPassword = inputs[2].value;

        try {
          const res = await fetch('/api/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
          });
          const data = await res.json();
          if (data.success) {
            showToast('Password updated successfully!', 'success');
            inputs.forEach(i => i.value = '');
          } else {
            showToast(data.message, 'error');
          }
        } catch { showToast('Cannot connect to server', 'error'); }
      });
    }
  }
}

/* -------- Load real user data into profile -------- */
async function loadProfileData() {
  if (!currentUser) await checkAuth();
  if (currentUser) {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const headerName = document.getElementById('profileHeaderName');
    const headerRole = document.getElementById('profileHeaderRole');
    const avatarEl = document.getElementById('profileAvatar');
    if (nameEl) nameEl.value = currentUser.name;
    if (emailEl) emailEl.value = currentUser.email;
    if (headerName) headerName.textContent = currentUser.name;
    if (headerRole) headerRole.textContent = currentUser.role || 'Security Analyst';
    if (avatarEl) avatarEl.textContent = currentUser.name.split(' ').map(n=>n[0]).join('');
  }
}

/* -------- Logout -------- */
async function doLogout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
    currentUser = null;
    showToast('Logged out successfully', 'info');
    location.hash = '#';
  } catch { location.hash = '#'; }
}

/* -------- New Scan interactions -------- */
function selectScanType(btn) {
  document.querySelectorAll('.scan-type-btn').forEach(b => b.classList.remove('active-type'));
  btn.classList.add('active-type');
  btn.style.background = 'rgba(14,165,233,.12)';
  btn.style.borderColor = '#0ea5e9';
  btn.style.color = '#38bdf8';
  document.querySelectorAll('.scan-type-btn:not(.active-type)').forEach(b => {
    b.style.background = '';
    b.style.borderColor = '';
    b.style.color = '';
  });
}

function toggleModule(card) {
  card.classList.toggle('selected');
}

function startScan() {
  const target = document.getElementById('scanTarget');
  if (!target || !target.value.trim()) {
    target.style.borderColor = '#ef4444';
    target.style.boxShadow = '0 0 0 3px rgba(239,68,68,.15)';
    target.focus();
    setTimeout(() => { target.style.borderColor = ''; target.style.boxShadow = ''; }, 2000);
    return;
  }
  const btn = document.getElementById('startScanBtn');
  const loader = document.getElementById('scanLoading');
  const status = document.getElementById('scanStatus');
  btn.style.display = 'none';
  loader.style.display = 'flex';

  const msgs = [
    'Resolving DNS records...',
    'Enumerating subdomains...',
    'Scanning open ports...',
    'Detecting running services...',
    'Checking SSL certificates...',
    'Analyzing technology stack...',
    'Identifying exposures...',
    'Generating report...',
  ];
  let i = 0;
  const interval = setInterval(() => {
    i++;
    if (i < msgs.length) {
      status.textContent = msgs[i];
    } else {
      clearInterval(interval);
      setTimeout(() => { location.hash = '#dashboard'; }, 600);
    }
  }, 400);
}

/* -------- Subdomain search filter -------- */
function filterSubdomains() {
  const q = document.getElementById('subSearch').value.toLowerCase();
  const rows = document.querySelectorAll('#subTable tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

/* -------- Initialize active scan type styling -------- */
const style = document.createElement('style');
style.textContent = `.scan-type-btn.active-type{background:rgba(14,165,233,.12)!important;border-color:#0ea5e9!important;color:#38bdf8!important;}`;
document.head.appendChild(style);

/* -------- Network Background Animation -------- */
let networkAnimFrame = null;
function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const nodes = [];
  const numNodes = Math.min(Math.floor(window.innerWidth / 15), 70);
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
      isRisk: Math.random() > 0.93,
      pulsePhase: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLightMod = document.body.classList.contains('light-theme');
    
    // Lines
    for (let i = 0; i < nodes.length; i++) {
      const p1 = nodes[i];
      p1.x += p1.vx;
      p1.y += p1.vy;
      p1.pulsePhase += 0.04;
      
      if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
      if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++) {
        const p2 = nodes[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 130) {
          ctx.beginPath();
          const baseOp = 0.15 - dist/130 * 0.15;
          ctx.strokeStyle = isLightMod ? `rgba(14, 165, 233, ${baseOp})` : `rgba(0, 240, 255, ${baseOp})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    for (const p of nodes) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.shadowBlur = 8;
      
      if (p.isRisk) {
        const alpha = Math.sin(p.pulsePhase) * 0.3 + 0.5;
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
      } else {
        ctx.fillStyle = isLightMod ? 'rgba(14, 165, 233, 0.7)' : 'rgba(0, 240, 255, 0.6)';
        ctx.shadowColor = isLightMod ? 'rgba(14, 165, 233, 0.5)' : 'rgba(0, 240, 255, 0.5)';
      }
      ctx.fill();
    }
    
    if (document.getElementById('networkCanvas')) {
      networkAnimFrame = requestAnimationFrame(draw);
    }
  }
  
  if (networkAnimFrame) cancelAnimationFrame(networkAnimFrame);
  draw();
}
