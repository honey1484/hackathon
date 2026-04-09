/* =========================================================
   NetScope AI — pages.js (All page rendering functions)
   ========================================================= */

/* -------- SVG Icons -------- */
const IC = {
  shield: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  search: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  bell: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  menu: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  x: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  arrow: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  eye: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  zap: '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  download: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  logout: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  chevDown: '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  chevRight: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
};
const NAV_ICONS = {
  dashboard:'📊',newscan:'🔍',subdomains:'🌐',ports:'🔌',services:'⚙️',ssl:'🔒',techstack:'🛠️',exposures:'⚠️',reports:'📄',profile:'👤'
};

/* -------- Landing -------- */
function renderLanding(){
  const features = [
    {icon:'🌐',t:'Asset Discovery',d:'Automatically find all subdomains, IPs, and connected assets across your infrastructure.'},
    {icon:'🔌',t:'Port Scanning',d:'Detect open ports and identify running services with risk classification.'},
    {icon:'🔒',t:'SSL Monitoring',d:'Track SSL certificates, detect misconfigurations, get expiry alerts.'},
    {icon:'⚠️',t:'Exposure Detection',d:'Find exposed admin panels, open RDP, public databases, and cloud misconfigs.'},
    {icon:'⚡',t:'Tech Detection',d:'Identify frameworks, languages, servers, and databases used on targets.'},
    {icon:'📄',t:'Smart Reports',d:'Generate comprehensive reports with risk scores and recommendations.'},
  ];
  const steps = [
    {n:'01',t:'Enter Target',d:'Provide a domain or IP range'},
    {n:'02',t:'Select Modules',d:'Choose which checks to run'},
    {n:'03',t:'Start Scan',d:'Launch automated discovery'},
    {n:'04',t:'View Results',d:'Explore interactive dashboard'},
    {n:'05',t:'Take Action',d:'Follow fix recommendations'},
  ];
  return `<div class="landing">
    <canvas id="networkCanvas" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;"></canvas>
    <div style="position:absolute;inset:0;background:rgba(2,6,23,0.55);z-index:2;pointer-events:none;"></div>
    <div class="bg-glow g1"></div><div class="bg-glow g2"></div><div class="bg-grid"></div>
    <nav class="landing-nav">
      <a href="#" class="nav-logo"><div class="logo-sq">${IC.shield}</div><span class="gradient-text" style="font-size:1.2rem;font-weight:800">NetScope AI</span></a>
      <div style="display:flex;gap:10px"><a href="#login" class="btn btn-outline btn-sm">Log In</a><a href="#signup" class="btn btn-primary btn-sm">Sign Up</a></div>
    </nav>
    <section class="hero">
      <div class="pill">${IC.zap} AI-Powered Security Intelligence</div>
      <h1>All Security Tools<span class="line2 gradient-text">in One Dashboard</span></h1>
      <p class="hero-sub">Scan your domain, discover assets, detect risks — all in one place. Automated network reconnaissance for modern security teams.</p>
      <div class="hero-btns">
        <a href="#signup" class="btn btn-primary btn-lg">Get Started ${IC.arrow}</a>
      </div>
      <div class="hero-stats">
        <div class="hs"><div class="hs-val">10k+</div><div class="hs-label">Assets Scanned</div></div>
        <div class="hs"><div class="hs-val">99.9%</div><div class="hs-label">Uptime</div></div>
        <div class="hs"><div class="hs-val">&lt; 30s</div><div class="hs-label">Scan Speed</div></div>
      </div>
    </section>
    <div class="preview-wrap"><div class="preview-frame glass neon-border"><div class="preview-inner">
      <div class="preview-grid-bg"></div>
      <div class="preview-content">
        <div class="preview-sidebar">
          ${['Dashboard','Scan Results','Exposures','Reports'].map((s,i)=>`<div class="ps-item ${i===0?'active':''}"><div class="ps-dot"></div>${s}</div>`).join('')}
        </div>
        <div class="preview-cards">
          <div class="pc"><div class="pc-label">Total Assets</div><div class="pc-value" style="color:#22d3ee">247</div></div>
          <div class="pc"><div class="pc-label">Subdomains</div><div class="pc-value" style="color:#3b82f6">38</div></div>
          <div class="pc"><div class="pc-label">Open Ports</div><div class="pc-value" style="color:#f59e0b">156</div></div>
          <div class="pc"><div class="pc-label">High Risk</div><div class="pc-value" style="color:#ef4444">12</div></div>
        </div>
      </div>
    </div></div></div>
    <section class="landing-section">
      <div class="section-header"><h2>Powerful Security Features</h2><p>Everything you need to discover, assess, and secure your network infrastructure.</p></div>
      <div class="features-grid">${features.map(f=>`<div class="feature-card glass animate-fade"><div class="fc-icon">${f.icon}</div><h3>${f.t}</h3><p>${f.d}</p></div>`).join('')}</div>
    </section>
    <section class="landing-section">
      <div class="section-header"><h2>How It Works</h2><p>Five simple steps from target to actionable security insights.</p></div>
      <div class="workflow-grid">${steps.map((s,i)=>`<div class="workflow-step glass animate-fade delay-${i+1}"><div class="step-num gradient-text">${s.n}</div><h3>${s.t}</h3><p>${s.d}</p>${i<4?'<div class="arr">›</div>':''}</div>`).join('')}</div>
    </section>
    <section class="landing-section"><div class="cta-box glass neon-border"><h2>Ready to Secure Your Network?</h2><p>Start discovering vulnerabilities and protecting your assets in minutes.</p><a href="#signup" class="btn btn-primary btn-lg">Start Free Scan ${IC.arrow}</a></div></section>
    <footer class="landing-footer"><div class="footer-inner">
      <div class="footer-logo"><div class="logo-sq-sm">${IC.shield}</div><span class="gradient-text" style="font-size:.85rem;font-weight:700">NetScope AI</span></div>
      <div class="footer-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
      <div class="copy">© 2026 NetScope AI. All rights reserved.</div>
    </div></footer>
  </div>`;
}

/* -------- Auth -------- */
function renderLogin(){
  return `<div class="auth-page"><div class="bg-glow g1"></div><div class="bg-glow g2"></div>
    <div class="auth-card"><div class="auth-logo"><div class="logo-sq">${IC.shield}</div><span class="gradient-text" style="font-size:1.4rem;font-weight:800">NetScope AI</span></div>
    <div class="auth-form glass neon-border">
      <div class="auth-heading"><h2>Welcome Back</h2><p>Sign in to your security dashboard</p></div>
      <div id="loginError" style="display:none;padding:10px 14px;border-radius:10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171;font-size:.85rem;margin-bottom:16px"></div>
      <form id="loginForm">
        <div class="form-group"><label>Email</label><div class="input-wrap"><span class="input-icon">✉</span><input type="email" class="input" placeholder="you@example.com" required></div></div>
        <div class="form-group"><label>Password</label><div class="input-wrap"><span class="input-icon">🔑</span><input type="password" class="input" placeholder="••••••••" required></div></div>
        <div class="form-row"><label><input type="checkbox"> Remember me</label><a href="#">Forgot password?</a></div>
        <button type="submit" class="btn btn-primary" style="width:100%;padding:12px" id="loginBtn">Sign In ${IC.arrow}</button>
      </form>
      <div class="auth-footer">Don't have an account? <a href="#signup">Create one</a></div>
    </div></div>
  </div>`;
}

function renderSignup(){
  return `<div class="auth-page"><div class="bg-glow g1"></div><div class="bg-glow g2"></div>
    <div class="auth-card"><div class="auth-logo"><div class="logo-sq">${IC.shield}</div><span class="gradient-text" style="font-size:1.4rem;font-weight:800">NetScope AI</span></div>
    <div class="auth-form glass neon-border">
      <div class="auth-heading"><h2>Create Account</h2><p>Join NetScope AI for free</p></div>
      <div id="signupError" style="display:none;padding:10px 14px;border-radius:10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171;font-size:.85rem;margin-bottom:16px"></div>
      <form id="signupForm">
        <div class="form-group"><label>Full Name</label><div class="input-wrap"><span class="input-icon">👤</span><input type="text" class="input" placeholder="Your full name" required style="padding-left:40px"></div></div>
        <div class="form-group"><label>Email</label><div class="input-wrap"><span class="input-icon">✉</span><input type="email" class="input" placeholder="you@example.com" required style="padding-left:40px"></div></div>
        <div class="form-group"><label>Password</label><div class="input-wrap"><span class="input-icon">🔑</span><input type="password" class="input" placeholder="Min. 6 characters" required style="padding-left:40px"></div></div>
        <div class="form-group"><label>Confirm Password</label><div class="input-wrap"><span class="input-icon">🔑</span><input type="password" class="input" placeholder="Confirm password" required style="padding-left:40px"></div></div>
        <button type="submit" class="btn btn-primary" style="width:100%;padding:12px" id="signupBtn">Create Account ${IC.arrow}</button>
      </form>
      <div class="auth-footer">Already have an account? <a href="#login">Sign in</a></div>
    </div></div>
  </div>`;
}

/* -------- Sidebar + Topbar shell -------- */
function dashboardShell(pageKey, content){
  const items = [
    {key:'dashboard',label:'Dashboard',icon:NAV_ICONS.dashboard},
    {key:'newscan',label:'New Scan',icon:NAV_ICONS.newscan},
    {key:'subdomains',label:'Subdomains',icon:NAV_ICONS.subdomains},
    {key:'ports',label:'Open Ports',icon:NAV_ICONS.ports},
    {key:'services',label:'Services',icon:NAV_ICONS.services},
    {key:'ssl',label:'SSL Details',icon:NAV_ICONS.ssl},
    {key:'techstack',label:'Tech Stack',icon:NAV_ICONS.techstack},
    {key:'exposures',label:'Exposures',icon:NAV_ICONS.exposures},
    {key:'reports',label:'Reports',icon:NAV_ICONS.reports},
    {key:'profile',label:'Profile',icon:NAV_ICONS.profile},
  ];
  return `
  <button class="mobile-menu-btn" id="mobileMenuBtn">${IC.menu}</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="logo-area"><div class="logo-icon">${IC.shield}</div><div class="logo-text"><div class="gradient-text" style="font-weight:800;font-size:.95rem">NetScope AI</div><div style="font-size:.6rem;color:#475569">Security Dashboard</div></div></div>
    <nav>${items.map(i=>`<a href="#${i.key}" class="nav-item ${pageKey===i.key?'active':''}"><span class="nav-icon">${i.icon}</span><span>${i.label}</span></a>`).join('')}</nav>
    <div class="sidebar-footer"><a href="#" class="nav-item" onclick="event.preventDefault();doLogout()"><span class="nav-icon">${IC.logout}</span><span>Sign Out</span></a></div>
  </aside>
  <div class="main-area">
    <header class="topbar">
      <div style="width:36px" class="mobile-spacer"></div>
      <div class="search-box"><span class="search-icon">${IC.search}</span><input type="text" placeholder="Search assets, domains, IPs..."></div>
      <div class="topbar-right">
        <button class="notif-btn" id="themeToggleBtn" title="Toggle Theme" onclick="toggleTheme()">${document.body.classList.contains('light-theme') ? '🌙' : '☀️'}</button>
        <button class="notif-btn">${IC.bell}<span class="notif-dot"></span></button>
        <div class="user-chip">
          <div class="avatar">${(typeof currentUser !== 'undefined' && currentUser && currentUser.name) ? currentUser.name.charAt(0).toUpperCase() : 'A'}</div>
          <div class="user-info"><p>${(typeof currentUser !== 'undefined' && currentUser && currentUser.name) ? currentUser.name : 'Alex Johnson'}</p><small>${(typeof currentUser !== 'undefined' && currentUser && currentUser.role) ? currentUser.role : 'Security Analyst'}</small></div>
          ${IC.chevDown}
        </div>
      </div>
    </header>
    <div class="page-content">${content}</div>
  </div>`;
}

/* -------- Dashboard Home -------- */
function renderDashboard(){
  const total = MOCK.riskData.reduce((s,d)=>s+d.value,0);
  let cumAngle = 0;
  const pieSlices = MOCK.riskData.map(d => {
    const angle = (d.value/total)*360;
    const start = cumAngle;
    cumAngle += angle;
    return {color:d.color, start, angle, name:d.name, value:d.value};
  });
  const pieGradient = pieSlices.map(s=>`${s.color} ${s.start}deg ${s.start+s.angle}deg`).join(',');

  return dashboardShell('dashboard', `
    <h1 class="page-title">Dashboard Overview</h1>
    <p class="page-subtitle">Real-time summary of your network security posture</p>
    <div class="cards-row cols-4">
      <div class="stat-card glass animate-fade"><div class="bar" style="background:#22d3ee"></div><div class="sc-top"><div class="sc-info"><p class="sc-label">Total Assets</p><p class="sc-val">247</p></div><div class="icon-box" style="color:#22d3ee">📊</div></div><div class="sc-bottom"><p class="sc-trend trend-up">↑ 12% from last scan</p></div></div>
      <div class="stat-card glass animate-fade delay-1"><div class="bar" style="background:#3b82f6"></div><div class="sc-top"><div class="sc-info"><p class="sc-label">Subdomains</p><p class="sc-val">38</p></div><div class="icon-box" style="color:#3b82f6">🌐</div></div><div class="sc-bottom"><p class="sc-trend trend-up">↑ 3 new found</p></div></div>
      <div class="stat-card glass animate-fade delay-2"><div class="bar" style="background:#f59e0b"></div><div class="sc-top"><div class="sc-info"><p class="sc-label">Open Ports</p><p class="sc-val">156</p></div><div class="icon-box" style="color:#f59e0b">🔌</div></div><div class="sc-bottom"><p class="sc-trend trend-down">↓ 5 more than before</p></div></div>
      <div class="stat-card glass animate-fade delay-3"><div class="bar" style="background:#ef4444"></div><div class="sc-top"><div class="sc-info"><p class="sc-label">High Risk Issues</p><p class="sc-val">12</p></div><div class="icon-box" style="color:#ef4444">⚠️</div></div><div class="sc-bottom"><p class="sc-trend trend-down">⚠ Needs attention</p></div></div>
    </div>
    <div class="two-col">
      <div class="glass" style="padding:24px">
        <h3 class="risk-section" style="margin-bottom:18px;font-size:.95rem;font-weight:700;color:#fff">Risk Distribution</h3>
        <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;justify-content:center">
          <div style="width:170px;height:170px;border-radius:50%;background:conic-gradient(${pieGradient});position:relative;box-shadow:0 0 30px rgba(0,0,0,.3)">
            <div style="position:absolute;inset:30px;border-radius:50%;background:#0f172a;display:flex;align-items:center;justify-content:center;flex-direction:column">
              <span style="font-size:1.5rem;font-weight:800;color:#fff">${total}</span>
              <span style="font-size:.65rem;color:#64748b">Total</span>
            </div>
          </div>
          <div class="pie-legend" style="flex-direction:column;align-items:flex-start">
            ${MOCK.riskData.map(d=>`<div class="pl-item"><div class="pl-dot" style="background:${d.color}"></div>${d.name}: ${d.value}</div>`).join('')}
          </div>
        </div>
      </div>
      <div class="glass" style="padding:24px">
        <h3 style="font-size:.95rem;font-weight:700;color:#fff;margin-bottom:14px">Recent Scans</h3>
        ${MOCK.recentScans.map(s=>`<div class="recent-scan-item">
          <div><div class="rs-domain">${s.domain}</div><div class="rs-meta">${s.type} • ${s.date}</div></div>
          <div class="rs-right">${badge(s.status)}${s.risk!==null?`<div class="risk-bar" style="margin-top:6px"><div class="rb-fill"><div class="rb-inner" style="width:${s.risk}%;background:${riskColor(s.risk)}"></div></div><div class="rb-val" style="color:${riskColor(s.risk)}">${s.risk}</div></div>`:''}</div>
        </div>`).join('')}
      </div>
    </div>
  `);
}

/* -------- New Scan -------- */
function renderNewScan(){
  return dashboardShell('newscan', `
    <h1 class="page-title">New Scan</h1>
    <p class="page-subtitle">Enter a target and choose which security modules to run</p>
    <div class="glass" style="padding:28px;margin-bottom:24px">
      <label style="font-size:.78rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:8px">Target Domain or IP Range</label>
      <input type="text" class="input" placeholder="e.g. example.com or 192.168.1.0/24" id="scanTarget" style="max-width:500px;margin-bottom:18px">
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-outline btn-sm scan-type-btn active-type" data-type="scan" style="cursor:default">🚀 Scan</button>
      </div>
    </div>
    <h3 style="font-size:.88rem;font-weight:600;color:#fff;margin-bottom:4px">Select Modules</h3>
    <p style="font-size:.78rem;color:#64748b;margin-bottom:12px">Choose which security checks to include in your scan</p>
    <div class="module-grid" id="moduleGrid">
      ${MOCK.scanModules.map(m=>`<div class="module-card selected" data-id="${m.id}" onclick="toggleModule(this)">
        <div class="check">✓</div>
        <div class="mod-icon">${m.icon}</div>
        <div class="mod-info"><h4>${m.name}</h4><p>${m.desc}</p></div>
      </div>`).join('')}
    </div>
    <div style="margin-top:24px"><button class="btn btn-primary btn-lg" id="startScanBtn" onclick="startScan()">🚀 Start Scan</button></div>
    <div id="scanLoading" style="display:none" class="scan-loading">
      <div class="spinner"></div>
      <p id="scanStatus">Initializing scan...</p>
      <div class="scan-bar"><div class="scan-fill"></div></div>
    </div>
  `);
}

/* -------- Subdomains -------- */
function renderSubdomains(){
  return dashboardShell('subdomains', `
    <h1 class="page-title">Subdomains</h1>
    <p class="page-subtitle">All discovered subdomains for the target domain</p>
    <div style="margin-bottom:16px"><input type="text" class="input" placeholder="Search subdomains..." style="max-width:340px" id="subSearch" oninput="filterSubdomains()"></div>
    <div class="glass table-wrap" style="padding:4px">
      <table class="data-table" id="subTable">
        <thead><tr><th>Subdomain</th><th>IP Address</th><th>Status</th></tr></thead>
        <tbody>${MOCK.subdomains.map(s=>`<tr><td style="font-weight:600;color:#e2e8f0">${s.subdomain}</td><td style="font-family:monospace;color:#94a3b8">${s.ip}</td><td>${badge(s.status)}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  `);
}

/* -------- Open Ports -------- */
function renderPorts(){
  return dashboardShell('ports', `
    <h1 class="page-title">Open Ports</h1>
    <p class="page-subtitle">Network ports detected across scanned assets</p>
    <div class="glass table-wrap" style="padding:4px">
      <table class="data-table">
        <thead><tr><th>IP Address</th><th>Port</th><th>Protocol</th><th>Status</th><th>Risk Level</th><th>What it Means</th></tr></thead>
        <tbody>${MOCK.ports.map(p=>`<tr style="${p.risk==='High'?'background:rgba(239,68,68,.04)':''}">
          <td style="font-family:monospace;color:#94a3b8">${p.ip}</td>
          <td style="font-weight:700;color:#e2e8f0">${p.port}</td>
          <td>${p.protocol}</td>
          <td>${badge(p.status)}</td>
          <td>${badge(p.risk)}</td>
          <td style="font-size:.82rem;max-width:260px">${p.desc}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  `);
}

/* -------- Services -------- */
function renderServices(){
  return dashboardShell('services', `
    <h1 class="page-title">Running Services</h1>
    <p class="page-subtitle">Services and software versions detected on your assets</p>
    <div class="glass table-wrap" style="padding:4px">
      <table class="data-table">
        <thead><tr><th>IP Address</th><th>Port</th><th>Service</th><th>Version</th><th>Status</th></tr></thead>
        <tbody>${MOCK.services.map(s=>`<tr>
          <td style="font-family:monospace;color:#94a3b8">${s.ip}</td>
          <td style="font-weight:600">${s.port}</td>
          <td style="font-weight:600;color:#e2e8f0">${s.service}</td>
          <td style="font-family:monospace">${s.version}</td>
          <td>${s.outdated?'<span class="badge badge-red">Outdated</span>':'<span class="badge badge-green">Current</span>'}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  `);
}

/* -------- SSL -------- */
function renderSSL(){
  const gradeClass = g => g.startsWith('A')?'grade-a':g==='B'?'grade-b':'grade-f';
  return dashboardShell('ssl', `
    <h1 class="page-title">SSL Certificate Details</h1>
    <p class="page-subtitle">SSL/TLS certificate status for your domains</p>
    ${MOCK.ssl.some(s=>s.days<=30&&s.days>0)?`<div class="glass" style="padding:16px 20px;margin-bottom:20px;border-left:4px solid #f59e0b;background:rgba(245,158,11,.04)">
      <p style="font-size:.88rem;color:#fbbf24;font-weight:600">⚠️ Certificate Expiring Soon</p>
      <p style="font-size:.82rem;color:#94a3b8;margin-top:4px">One or more SSL certificates are expiring within 30 days. Renew them to prevent service disruption.</p>
    </div>`:''}
    <div class="cards-row cols-3" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
      ${MOCK.ssl.map(s=>`<div class="ssl-card glass ${gradeClass(s.grade)}">
        <div class="ssl-domain">${s.domain}</div>
        <div class="ssl-grade">${s.grade}</div>
        <div>${badge(s.status)}</div>
        <div class="ssl-detail" style="margin-top:10px">Issuer: ${s.issuer}</div>
        <div class="ssl-detail">Expires: ${s.expiry} ${s.days>0?`(${s.days} days)`:'(Expired)'}</div>
        <div class="ssl-detail">Protocol: ${s.proto}</div>
      </div>`).join('')}
    </div>
  `);
}

/* -------- Tech Stack -------- */
function renderTechStack(){
  const cats = ['Frontend','Backend','Server','Database'];
  return dashboardShell('techstack', `
    <h1 class="page-title">Technology Stack</h1>
    <p class="page-subtitle">Technologies detected on scanned targets</p>
    ${cats.map(c=>{
      const items = MOCK.tech.filter(t=>t.cat===c);
      if(!items.length) return '';
      return `<div class="tech-category"><h3>${c}</h3><div class="cards-row" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">${items.map(t=>`<div class="tech-card glass"><div class="tech-icon">${t.icon}</div><div class="tech-name">${t.name}</div><div class="tech-version">v${t.version}</div></div>`).join('')}</div></div>`;
    }).join('')}
  `);
}

/* -------- Exposures -------- */
function renderExposures(){
  return dashboardShell('exposures', `
    <h1 class="page-title">Security Exposures</h1>
    <p class="page-subtitle">Detected vulnerabilities explained in simple terms</p>
    <div style="display:grid;gap:16px">
      ${MOCK.exposures.map(e=>`<div class="exposure-card glass sev-${e.severity.toLowerCase()} animate-fade">
        <div class="exp-header"><div class="exp-title">⚠️ ${e.title}</div>${badge(e.severity)}</div>
        <div class="exp-asset">Affected: ${e.asset}</div>
        <div class="exp-desc">${e.desc}</div>
        <div class="exp-rec"><strong>💡 Recommendation:</strong> ${e.rec}</div>
      </div>`).join('')}
    </div>
  `);
}

/* -------- Reports -------- */
function renderReports(){
  return dashboardShell('reports', `
    <h1 class="page-title">Scan Reports</h1>
    <p class="page-subtitle">History of all scans with risk scores and actions</p>
    <div class="glass table-wrap" style="padding:4px">
      <table class="data-table">
        <thead><tr><th>Scan Name</th><th>Date</th><th>Assets</th><th>Issues</th><th>Risk Score</th><th>Actions</th></tr></thead>
        <tbody>${MOCK.reports.map(r=>`<tr>
          <td style="font-weight:600;color:#e2e8f0">${r.name}</td>
          <td style="color:#94a3b8">${r.date}</td>
          <td>${r.assets}</td>
          <td>${r.issues}</td>
          <td><div class="risk-bar"><div class="rb-fill"><div class="rb-inner" style="width:${r.risk}%;background:${riskColor(r.risk)}"></div></div><div class="rb-val" style="color:${riskColor(r.risk)}">${r.risk}</div></div></td>
          <td style="display:flex;gap:6px"><button class="btn btn-outline btn-sm">${IC.eye} View</button><button class="btn btn-outline btn-sm">${IC.download}</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  `);
}

/* -------- Profile -------- */
function renderProfile(){
  const u = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : MOCK.user;
  // Make sure we have standard fields if using mock fallback
  const joined = u.joined ? new Date(u.joined).toLocaleDateString() : (u.joinedDate || 'Just now');
  const scansRun = u.scansRun || 0;
  
  return dashboardShell('profile', `
    <h1 class="page-title">Profile Settings</h1>
    <p class="page-subtitle">Manage your account information</p>
    <div class="glass" style="padding:28px;margin-bottom:24px">
      <div class="profile-header">
        <div class="profile-avatar" id="profileAvatar">${(u.name||'A').split(' ').map(n=>n?n[0]:'').join('')}</div>
        <div class="profile-info"><h2 id="profileHeaderName">${u.name||''}</h2><p id="profileHeaderRole">${u.role||''}</p><p style="font-size:.78rem;color:#475569;margin-top:4px">Member since ${joined} • ${scansRun} scans run</p></div>
      </div>
    </div>
    <div class="two-col">
      <div class="glass" style="padding:24px">
        <h3 style="font-size:.95rem;font-weight:700;color:#fff;margin-bottom:18px">Account Information</h3>
        <div class="form-group" style="margin-bottom:16px"><label style="display:block;font-size:.72rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Full Name</label><input type="text" class="input" value="${u.name}" id="profileName"></div>
        <div class="form-group" style="margin-bottom:16px"><label style="display:block;font-size:.72rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Email</label><input type="email" class="input" value="${u.email}" id="profileEmail"></div>
        <button class="btn btn-primary btn-sm">Save Changes</button>
      </div>
      <div class="glass" style="padding:24px">
        <h3 style="font-size:.95rem;font-weight:700;color:#fff;margin-bottom:18px">Change Password</h3>
        <form id="changePasswordForm">
          <div class="form-group" style="margin-bottom:16px"><label style="display:block;font-size:.72rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Current Password</label><input type="password" class="input" placeholder="••••••••" required></div>
          <div class="form-group" style="margin-bottom:16px"><label style="display:block;font-size:.72rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">New Password</label><input type="password" class="input" placeholder="Min. 6 characters" required></div>
          <div class="form-group" style="margin-bottom:16px"><label style="display:block;font-size:.72rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Confirm New Password</label><input type="password" class="input" placeholder="••••••••" required></div>
          <button type="submit" class="btn btn-primary btn-sm">Update Password</button>
        </form>
      </div>
    </div>
    <div style="margin-top:24px"><button class="btn btn-danger" onclick="doLogout()">🚪 Logout</button></div>
  `);
}
