/* =========================================================
   NetScope AI — data.js  (Mock Data)
   ========================================================= */

const MOCK = {
  subdomains: [
    { subdomain:'app.targetsite.com', ip:'192.168.1.10', status:'Live' },
    { subdomain:'api.targetsite.com', ip:'192.168.1.11', status:'Live' },
    { subdomain:'mail.targetsite.com', ip:'192.168.1.12', status:'Live' },
    { subdomain:'dev.targetsite.com', ip:'192.168.1.13', status:'Dead' },
    { subdomain:'staging.targetsite.com', ip:'192.168.1.14', status:'Live' },
    { subdomain:'blog.targetsite.com', ip:'192.168.1.15', status:'Live' },
    { subdomain:'admin.targetsite.com', ip:'192.168.1.16', status:'Live' },
    { subdomain:'old.targetsite.com', ip:'192.168.1.17', status:'Dead' },
    { subdomain:'cdn.targetsite.com', ip:'192.168.1.18', status:'Live' },
    { subdomain:'vpn.targetsite.com', ip:'192.168.1.19', status:'Live' },
  ],
  ports: [
    { ip:'192.168.1.10', port:80, protocol:'TCP', status:'Open', risk:'Low', desc:'Web server is running normally' },
    { ip:'192.168.1.10', port:443, protocol:'TCP', status:'Open', risk:'Low', desc:'Secure web traffic (HTTPS) is active' },
    { ip:'192.168.1.11', port:22, protocol:'TCP', status:'Open', risk:'Medium', desc:'Remote access (SSH) is available from the internet' },
    { ip:'192.168.1.12', port:25, protocol:'TCP', status:'Open', risk:'Medium', desc:'Email service is publicly exposed' },
    { ip:'192.168.1.12', port:587, protocol:'TCP', status:'Open', risk:'Low', desc:'Secure email submission port' },
    { ip:'192.168.1.13', port:3389, protocol:'TCP', status:'Open', risk:'High', desc:'Remote Desktop is open and may be risky' },
    { ip:'192.168.1.14', port:8080, protocol:'TCP', status:'Open', risk:'Medium', desc:'Development server is publicly visible' },
    { ip:'192.168.1.15', port:3306, protocol:'TCP', status:'Open', risk:'High', desc:'Database is directly accessible from the internet' },
    { ip:'192.168.1.16', port:21, protocol:'TCP', status:'Open', risk:'High', desc:'File transfer service is exposed (FTP)' },
    { ip:'192.168.1.17', port:8443, protocol:'TCP', status:'Open', risk:'Low', desc:'Alternate secure port is running' },
  ],
  services: [
    { ip:'192.168.1.10', port:80, service:'Nginx', version:'1.18.0', outdated:true },
    { ip:'192.168.1.10', port:443, service:'Nginx', version:'1.18.0', outdated:true },
    { ip:'192.168.1.11', port:22, service:'OpenSSH', version:'8.9p1', outdated:false },
    { ip:'192.168.1.12', port:25, service:'Postfix', version:'3.4.13', outdated:true },
    { ip:'192.168.1.13', port:3389, service:'MS RDP', version:'10.0', outdated:false },
    { ip:'192.168.1.14', port:8080, service:'Apache Tomcat', version:'8.5.50', outdated:true },
    { ip:'192.168.1.15', port:3306, service:'MySQL', version:'5.7.33', outdated:true },
    { ip:'192.168.1.16', port:21, service:'vsftpd', version:'3.0.3', outdated:false },
    { ip:'192.168.1.17', port:8443, service:'Node.js', version:'18.17.0', outdated:false },
    { ip:'192.168.1.18', port:443, service:'CloudFront', version:'Latest', outdated:false },
  ],
  ssl: [
    { domain:'app.targetsite.com', status:'Valid', issuer:"Let's Encrypt X3", expiry:'2026-05-15', days:36, grade:'A+', proto:'TLS 1.3' },
    { domain:'api.targetsite.com', status:'Valid', issuer:'DigiCert Inc', expiry:'2027-01-20', days:286, grade:'A', proto:'TLS 1.3' },
    { domain:'mail.targetsite.com', status:'Expiring Soon', issuer:'Comodo CA', expiry:'2026-04-25', days:16, grade:'B', proto:'TLS 1.2' },
    { domain:'staging.targetsite.com', status:'Expired', issuer:'Self-Signed', expiry:'2026-03-01', days:-39, grade:'F', proto:'TLS 1.1' },
    { domain:'blog.targetsite.com', status:'Valid', issuer:"Let's Encrypt X3", expiry:'2026-08-10', days:123, grade:'A', proto:'TLS 1.3' },
  ],
  tech: [
    { name:'React', version:'18.2.0', cat:'Frontend', icon:'⚛️' },
    { name:'Vue.js', version:'3.3.4', cat:'Frontend', icon:'💚' },
    { name:'jQuery', version:'3.6.0', cat:'Frontend', icon:'📜' },
    { name:'Node.js', version:'18.17.0', cat:'Backend', icon:'🟢' },
    { name:'Express.js', version:'4.18.2', cat:'Backend', icon:'🚂' },
    { name:'PHP', version:'7.4.33', cat:'Backend', icon:'🐘' },
    { name:'Python', version:'3.11.4', cat:'Backend', icon:'🐍' },
    { name:'Nginx', version:'1.18.0', cat:'Server', icon:'🌐' },
    { name:'Apache', version:'2.4.54', cat:'Server', icon:'🪶' },
    { name:'MySQL', version:'5.7.33', cat:'Database', icon:'🗃️' },
    { name:'MongoDB', version:'6.0.8', cat:'Database', icon:'🍃' },
    { name:'Redis', version:'7.0.12', cat:'Database', icon:'🔴' },
  ],
  exposures: [
    { id:1, title:'Remote Desktop is open to the internet', severity:'High', asset:'192.168.1.13:3389', desc:'Remote Desktop Protocol (RDP) is accessible from the internet. Attackers can try to guess passwords and gain full access to this computer.', rec:'Restrict RDP access through a VPN or firewall rules. Enable Network Level Authentication.' },
    { id:2, title:'Admin panel is publicly accessible', severity:'High', asset:'admin.targetsite.com', desc:'The admin control panel can be accessed by anyone on the internet without any IP restriction.', rec:'Restrict admin panel access to specific IP addresses. Add two-factor authentication.' },
    { id:3, title:'Software version is outdated', severity:'Medium', asset:'192.168.1.10 (Nginx 1.18.0)', desc:'The web server is running an older version with known security issues.', rec:'Update Nginx to the latest stable version (1.25.x or newer).' },
    { id:4, title:'Cloud storage is public', severity:'High', asset:'cdn.targetsite.com (S3 Bucket)', desc:'The cloud storage bucket allows public access. Anyone can view, download, or modify stored files.', rec:'Set bucket policy to private. Enable server-side encryption.' },
    { id:5, title:'Database directly accessible from internet', severity:'High', asset:'192.168.1.15:3306', desc:'MySQL database is directly accessible from the internet without a firewall.', rec:'Block direct database access. Only allow connections from application servers.' },
    { id:6, title:'SSL certificate is about to expire', severity:'Medium', asset:'mail.targetsite.com', desc:'SSL certificate will expire in 16 days. Users will see security warnings.', rec:'Renew the SSL certificate immediately. Set up auto-renewal.' },
    { id:7, title:'FTP service is exposed', severity:'Medium', asset:'192.168.1.16:21', desc:'FTP sends data without encryption. Passwords and files can be intercepted.', rec:'Replace FTP with SFTP or SCP for encrypted file transfers.' },
    { id:8, title:'Email server is openly accessible', severity:'Low', asset:'192.168.1.12:25', desc:'Email server port is open. While necessary, it should be configured to prevent spam relay.', rec:'Ensure proper spam filtering and relay restrictions.' },
  ],
  reports: [
    { id:1, name:'Full Scan - targetsite.com', date:'2026-04-09', risk:78, status:'Completed', assets:47, issues:12 },
    { id:2, name:'Quick Scan - api.targetsite.com', date:'2026-04-08', risk:45, status:'Completed', assets:12, issues:3 },
    { id:3, name:'Port Scan - 192.168.1.0/24', date:'2026-04-07', risk:62, status:'Completed', assets:28, issues:8 },
    { id:4, name:'SSL Audit - *.targetsite.com', date:'2026-04-06', risk:34, status:'Completed', assets:5, issues:2 },
    { id:5, name:'Full Scan - devsite.io', date:'2026-04-05', risk:89, status:'Completed', assets:65, issues:18 },
  ],
  recentScans: [
    { domain:'targetsite.com', type:'Full Scan', date:'2 hours ago', status:'Completed', risk:78 },
    { domain:'api.targetsite.com', type:'Quick Scan', date:'5 hours ago', status:'Completed', risk:45 },
    { domain:'192.168.1.0/24', type:'Port Scan', date:'1 day ago', status:'Completed', risk:62 },
    { domain:'devsite.io', type:'Full Scan', date:'2 days ago', status:'In Progress', risk:null },
  ],
  riskData: [
    { name:'High', value:5, color:'#ef4444' },
    { name:'Medium', value:8, color:'#f59e0b' },
    { name:'Low', value:12, color:'#10b981' },
    { name:'Info', value:22, color:'#0ea5e9' },
  ],
  scanModules: [
    { id:'subdomains', name:'Subdomains', desc:'Find all subdomains linked to the target', icon:'🌐' },
    { id:'ports', name:'Open Ports', desc:'Detect all open network ports', icon:'🔓' },
    { id:'services', name:'Running Services', desc:'Identify services and their versions', icon:'⚙️' },
    { id:'ssl', name:'SSL Certificate Details', desc:'Check SSL/TLS security configuration', icon:'🔒' },
    { id:'techstack', name:'Technology Stack', desc:'Detect technologies used on the target', icon:'🛠️' },
    { id:'rdp', name:'Open RDP', desc:'Check for exposed Remote Desktop services', icon:'🖥️' },
    { id:'admin', name:'Exposed Admin Panels', desc:'Find publicly accessible admin pages', icon:'👤' },
    { id:'outdated', name:'Outdated Software', desc:'Detect old versions with known issues', icon:'📦' },
    { id:'cloud', name:'Cloud Misconfiguration', desc:'Check for insecure cloud settings', icon:'☁️' },
  ],
  user: { name:'Alex Johnson', email:'alex.johnson@netscope.ai', role:'Security Analyst', joined:'January 2026', scansRun:47 }
};

/* Badge helper */
function badge(text) {
  const m = { Live:'green', Dead:'red', Open:'yellow', Closed:'green', Valid:'green',
    'Expiring Soon':'yellow', Expired:'red', Completed:'green', 'In Progress':'blue',
    High:'red', Medium:'yellow', Low:'green', Info:'blue' };
  return '<span class="badge badge-'+(m[text]||'blue')+'">'+text+'</span>';
}
function riskColor(r){ return r>=70?'#ef4444':r>=40?'#f59e0b':'#10b981'; }
