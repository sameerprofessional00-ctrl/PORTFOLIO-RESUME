// Static site generator for Sameer's portfolio detail pages.
// Run: node generate.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'pages');
if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR);

const EMAIL = 'sameerprofessional00@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/sameer-cafinal';

// ---------- shared fragments ----------
const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`;

const MAIL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 6-10 7L2 6"></path></svg>`;
const LI_SVG = `<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`;

// Hand-drawn line icons (stroke=currentColor via CSS) used instead of app screenshots.
const ICONS = {
  grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
  percentBadge: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><line x1="8" y1="16" x2="16" y2="8"></line><circle cx="8.7" cy="8.7" r="1"></circle><circle cx="15.3" cy="15.3" r="1"></circle></svg>`,
  percent: `<svg viewBox="0 0 24 24"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`,
  compare: `<svg viewBox="0 0 24 24"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="M16 21l4-4-4-4"></path><path d="M20 17H4"></path></svg>`,
  bolt: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  fileCheck: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></svg>`,
  fileSignature: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 17s1-1 2-1 1.5 1 2.5 1 1.5-1.5 1.5-1.5"></path></svg>`,
  wallet: `<svg viewBox="0 0 24 24"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v3"></path><path d="M3 9v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path><path d="M18 13a1.5 1.5 0 0 0 0 3h3v-3Z"></path></svg>`
};

function iconBox(iconKey, sizeClass){
  return `<div class="icon-box ${sizeClass || ''}">${ICONS[iconKey]}</div>`;
}

// White line-icon rendered directly onto the textured blue banner (no wrapping box).
function bannerIcon(iconKey){
  return ICONS[iconKey].replace('<svg ', '<svg class="tex-blue-icon-lg" ');
}

function connectDongle(){
  return `<div class="connect-dongle">
        <span class="cd-label">Connect</span>
        <a class="mail" href="mailto:${EMAIL}" title="Email me">${MAIL_SVG}</a>
        <a class="li" href="${LINKEDIN}" target="_blank" rel="noopener" title="LinkedIn">${LI_SVG}</a>
      </div>`;
}

function header(rootPrefix){
  return `<header class="site-header">
  <nav class="wrap">
    <a class="logo" href="${rootPrefix}index.html">Sameer<span>.</span></a>
    <div class="navlinks">
      <a href="${rootPrefix}index.html#about">About</a>
      <a href="${rootPrefix}index.html#work">Work</a>
      <a href="${rootPrefix}index.html#skills">Skills</a>
      <a href="${rootPrefix}index.html#experience">Experience</a>
      <a href="${rootPrefix}index.html#contact">Contact</a>
    </div>
    ${connectDongle()}
    <button class="burger" id="burger"><span></span><span></span><span></span></button>
  </nav>
</header>`;
}

function footer(){
  return `<footer class="site-footer section-invert bg-dark">
  <div class="wrap">© 2026 Sameer · CA Finalist · Surat, Gujarat, India</div>
</footer>`;
}

const SCRIPT = `<script>
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.1});
  revealEls.forEach(el=>io.observe(el));
</script>`;

function page({title, description, rootPrefix, bodyHtml}){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
${FONT_LINK}
<link rel="stylesheet" href="${rootPrefix}style.css">
</head>
<body>
${header(rootPrefix)}
${bodyHtml}
${footer()}
${SCRIPT}
</body>
</html>
`;
}

function detailPage({slug, tag, title, lede, meta, icon, overview, features, stack, sideMeta, ctaTitle, ctaText}){
  const rootPrefix = '../';
  const body = `<section class="detail-hero section-tint" style="border-bottom:none; padding-bottom:0;">
  <div class="wrap">
    <a class="back-link" href="${rootPrefix}index.html#work">&larr; Back to portfolio</a>
    <span class="detail-tag">${tag}</span>
    <h1 class="detail-title">${title}</h1>
    <p class="detail-lede">${lede}</p>
    <div class="detail-meta-row">
      ${meta.map(m => `<div><span>${m.k}</span><b>${m.v}</b></div>`).join('\n      ')}
    </div>
    <div class="detail-banner tex-blue">${bannerIcon(icon)}</div>
  </div>
</section>

<section class="detail-body" style="border-bottom:1px solid var(--border);">
  <div class="wrap" style="display:grid; grid-template-columns:1.6fr 1fr; gap:64px;">
    <div>
      <div class="prose reveal">
        <h3>Overview</h3>
        ${overview.map(p => `<p>${p}</p>`).join('\n        ')}
      </div>
      <div class="reveal">
        <h3>Key features</h3>
        <ul class="feature-list">
          ${features.map(f => `<li>${f}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    <div class="side-card reveal">
      <h4>Tech stack</h4>
      <div class="stack-tags">${stack.map(s => `<span>${s}</span>`).join('')}</div>
      <h4>Details</h4>
      <div class="side-meta">
        ${sideMeta.map(m => `<div><span>${m.k}</span><b>${m.v}</b></div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>

<section class="detail-cta section-invert bg-dark">
  <div class="wrap">
    <h2>${ctaTitle}</h2>
    <p>${ctaText}</p>
    <div class="detail-cta-actions">
      <a class="btn primary" href="mailto:${EMAIL}">Email me →</a>
      <a class="btn ghost" href="${rootPrefix}index.html">Back to portfolio</a>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(PAGES_DIR, slug + '.html'), page({
    title: `${title} — Sameer`,
    description: lede,
    rootPrefix,
    bodyHtml: body
  }));
}

function simplePage({slug, tag, title, lede, meta, body, ctaTitle, ctaText}){
  const rootPrefix = '../';
  const full = `<section class="detail-hero section-tint">
  <div class="wrap">
    <a class="back-link" href="${rootPrefix}index.html#experience">&larr; Back to portfolio</a>
    <span class="detail-tag">${tag}</span>
    <h1 class="detail-title">${title}</h1>
    <p class="detail-lede">${lede}</p>
    <div class="detail-meta-row">
      ${meta.map(m => `<div><span>${m.k}</span><b>${m.v}</b></div>`).join('\n      ')}
    </div>
  </div>
</section>
<section style="border-bottom:1px solid var(--border);">
  <div class="wrap" style="max-width:760px;">
    <div class="prose reveal">
      ${body.map(p => `<p style="color:var(--muted); font-size:16.5px; margin-bottom:20px;">${p}</p>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="detail-cta section-invert bg-dark">
  <div class="wrap">
    <h2>${ctaTitle}</h2>
    <p>${ctaText}</p>
    <div class="detail-cta-actions">
      <a class="btn primary" href="mailto:${EMAIL}">Email me →</a>
      <a class="btn ghost" href="${rootPrefix}index.html">Back to portfolio</a>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(PAGES_DIR, slug + '.html'), page({
    title: `${title} — Sameer`,
    description: lede,
    rootPrefix,
    bodyHtml: full
  }));
}

// ================= PROJECTS =================
const projects = [
  {
    slug:'project-vcas-suite', tag:'Flagship · Electron Desktop App', title:'VCAS Suite',
    lede:'One launcher to install, update and run every VCAS office tool — built so the firm never has to hunt for an installer again.',
    icon:'grid',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'Desktop Launcher'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'VCAS Suite is the control center for every tool I\'ve built for the firm. Instead of each team member downloading and managing 7 separate installers, VCAS Suite gives them one app that detects what\'s installed, pulls the latest version from a private update server, and launches any tool in one click.',
      'It talks to a custom-built Node.js update server (also self-hosted) that tracks version manifests for every tool in the suite, so pushing an update to one tool rolls out to every machine running VCAS Suite — no manual redistribution, no "which version are you on" confusion.'
    ],
    features:[
      'Auto-detects which VCAS tools are already installed on a machine',
      'One-click silent install/update for every tool via NSIS installers',
      'Talks to a private auto-update server to always ship the latest build',
      'Custom tool tiles with icons, install status and version tracking',
      'Add-your-own-tool support for future in-house apps'
    ],
    stack:['Electron','Node.js','NSIS Installer','Custom Auto-Update Server','JavaScript'],
    sideMeta:[{k:'Category',v:'Practice Management'},{k:'Platform',v:'Windows Desktop'},{k:'Users',v:'VCAS & Co LLP team'}],
    ctaTitle:'Curious how the update server works?',
    ctaText:'Happy to walk through the architecture — reach out.'
  },
  {
    slug:'project-gst-suite', tag:'GST', title:'VCAS GST Suite',
    lede:'A reconciliation suite that matches GSTR-2B against purchase registers automatically, cutting hours of manual cross-checking down to minutes.',
    icon:'percentBadge',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'GST Reconciliation'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'Every GST-registered business has to reconcile its purchase register against GSTR-2B every month — line by line, invoice by invoice. Done manually, it eats an entire day per client. VCAS GST Suite automates the matching, flags mismatches (rate differences, missing invoices, vendor-side non-filing) and produces a clean reconciliation report.',
      'Built directly from the reconciliation workflow I run at VCAS & Co LLP, so every rule in it reflects a real mismatch pattern the firm has actually hit — not a theoretical spec.'
    ],
    features:[
      'Bulk-imports GSTR-2B and purchase register data',
      'Auto-matches invoices on GSTIN, invoice number and value',
      'Flags mismatches: missing invoices, rate/value differences, unfiled vendors',
      'Generates a client-ready reconciliation summary report',
      'Built for repeat monthly use across multiple clients'
    ],
    stack:['GSTR-2B Parsing','Reconciliation Engine','Excel/CSV I/O','Electron'],
    sideMeta:[{k:'Category',v:'Indirect Tax'},{k:'Platform',v:'Windows Desktop'},{k:'Frequency',v:'Monthly, per client'}],
    ctaTitle:'Reconciling GST manually every month?',
    ctaText:'Let\'s talk about automating it for your firm or business.'
  },
  {
    slug:'project-tds', tag:'Direct Tax', title:'KWIK TDS',
    lede:'Simplifies TDS computation, deduction tracking and return prep — built to stop Article Trainees re-doing the same TDS math by hand every quarter.',
    icon:'percent',
    meta:[{k:'Role',v:'Founder / Developer'},{k:'Type',v:'TDS Compliance'},{k:'Status',v:'Live, KWIK product'}],
    overview:[
      'TDS deduction, threshold tracking and quarterly return prep involve a lot of repetitive rate lookups and manual computation across sections (194C, 194J, 194Q and more). KWIK TDS centralizes that: enter the transaction, it applies the right section and rate, tracks running thresholds per deductee, and keeps everything return-ready.',
      'Built under KWIK, the venture I founded to package these internal workflow fixes into standalone products other firms and students can use.'
    ],
    features:[
      'Section-wise TDS rate application (194C, 194J, 194Q and more)',
      'Running threshold tracking per deductee across the year',
      'Deduction register maintained automatically',
      'Return-ready summary exports',
      'Built for CA firms handling multiple clients\' TDS compliance'
    ],
    stack:['Direct Tax Rules Engine','Electron','Data Export (Excel/CSV)'],
    sideMeta:[{k:'Category',v:'Direct Tax'},{k:'Platform',v:'Windows Desktop'},{k:'Product line',v:'KWIK'}],
    ctaTitle:'Want KWIK TDS for your firm?',
    ctaText:'Get in touch to discuss access or a walkthrough.'
  },
  {
    slug:'project-tally-reco', tag:'Audit', title:'VCAS Tally Reco',
    lede:'Reconciles Tally ledgers against bank statements and external records automatically, surfacing only the entries that actually need a human look.',
    icon:'compare',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'Ledger Reconciliation'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'Bank reconciliation and ledger scrutiny during statutory audit means comparing hundreds of Tally entries against bank statements line by line. VCAS Tally Reco automates the matching — pulling data straight out of Tally — and only surfaces the genuine mismatches, timing differences and unmatched entries that need audit judgement.',
      'This directly cuts down the most repetitive part of fieldwork during audit engagements at VCAS & Co LLP.'
    ],
    features:[
      'Pulls ledger data directly from Tally',
      'Auto-matches entries against bank statements / external records',
      'Highlights only genuine mismatches and unmatched entries',
      'Speeds up ledger scrutiny during statutory audit fieldwork',
      'Reduces hours of manual line-by-line checking to minutes'
    ],
    stack:['Tally ODBC/XML Integration','Reconciliation Engine','Electron'],
    sideMeta:[{k:'Category',v:'Statutory Audit'},{k:'Platform',v:'Windows Desktop'},{k:'Integrates with',v:'Tally ERP / Prime'}],
    ctaTitle:'Buried in manual ledger scrutiny?',
    ctaText:'Let\'s talk about automating your reconciliation workflow.'
  },
  {
    slug:'project-tally-entry-automation', tag:'Automation', title:'VCAS Tally Entry Automation',
    lede:'Reads source data and pushes structured voucher entries straight into Tally — replacing hours of repetitive manual data entry.',
    icon:'bolt',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'Voucher Automation'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'A huge share of an Article Trainee\'s time goes into typing voucher entries into Tally one at a time from source documents. VCAS Tally Entry Automation reads structured source data (bank statements, sales/purchase registers, expense sheets) and pushes properly formatted voucher entries directly into Tally in bulk.',
      'It\'s the single tool at VCAS & Co LLP that has saved the most raw hours — turning a full day of data entry into a short review-and-confirm pass.'
    ],
    features:[
      'Reads structured source data (bank, sales, purchase, expense sheets)',
      'Maps and validates entries before posting',
      'Bulk-pushes voucher entries directly into Tally',
      'Cuts manual data entry time from hours to minutes',
      'Built-in error/duplicate checks before posting'
    ],
    stack:['Tally XML/API Integration','Data Mapping Engine','Electron'],
    sideMeta:[{k:'Category',v:'Bookkeeping Automation'},{k:'Platform',v:'Windows Desktop'},{k:'Integrates with',v:'Tally ERP / Prime'}],
    ctaTitle:'Still typing every voucher by hand?',
    ctaText:'Let\'s talk about automating your Tally data entry.'
  },
  {
    slug:'project-ledger-confirm-pro', tag:'Audit', title:'Ledger Confirm Pro',
    lede:'Generates and tracks balance confirmation letters for debtors/creditors during statutory audits — from drafting to follow-up in one place.',
    icon:'fileCheck',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'Audit Confirmations'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'Balance confirmation is a mandatory audit step — but drafting individual confirmation letters for every debtor and creditor, tracking who has responded, and chasing the rest is a manual, spreadsheet-heavy grind. Ledger Confirm Pro generates the letters from ledger data directly, and tracks confirmation status so nothing falls through during fieldwork.',
      'Removes the drafting and tracking overhead so audit teams can spend their time reviewing actual discrepancies, not chasing paperwork.'
    ],
    features:[
      'Auto-generates balance confirmation letters from ledger data',
      'Tracks confirmation status per party (sent / confirmed / pending)',
      'Standardized, firm-branded letter templates',
      'Follow-up tracking for non-responders',
      'Speeds up the confirmation stage of statutory audit'
    ],
    stack:['Document Generation','Templating Engine','Electron'],
    sideMeta:[{k:'Category',v:'Statutory Audit'},{k:'Platform',v:'Windows Desktop'},{k:'Output',v:'Confirmation letters + status tracker'}],
    ctaTitle:'Confirmation letters eating your audit timeline?',
    ctaText:'Let\'s talk about streamlining your confirmation process.'
  },
  {
    slug:'project-engagement-letter', tag:'Practice Management', title:'VCAS Engagement Letter Generator',
    lede:'Auto-generates client engagement letters from a firm-standard template, cutting drafting time from an hour to a couple of minutes per client.',
    icon:'fileSignature',
    meta:[{k:'Role',v:'Sole Developer'},{k:'Type',v:'Document Generation'},{k:'Status',v:'Live, in daily use'}],
    overview:[
      'Every new client engagement needs a properly worded, firm-compliant engagement letter — scope, fees, responsibilities, terms. Drafting each one from scratch (or copy-pasting and manually editing the last one) is slow and error-prone. This tool takes client details as input and generates a complete, firm-standard engagement letter instantly.',
      'Keeps the firm\'s documentation consistent across every client while freeing up the time that used to go into repetitive drafting.'
    ],
    features:[
      'Firm-standard engagement letter templates by service type',
      'Auto-fills client details, scope and fee terms',
      'Consistent formatting and terms across every client',
      'Cuts drafting time from ~1 hour to a couple of minutes',
      'Exports ready-to-send documents'
    ],
    stack:['Document Generation','Templating Engine','Electron'],
    sideMeta:[{k:'Category',v:'Practice Management'},{k:'Platform',v:'Windows Desktop'},{k:'Output',v:'Client-ready engagement letters'}],
    ctaTitle:'Drafting engagement letters from scratch every time?',
    ctaText:'Let\'s talk about automating your client onboarding paperwork.'
  },
  {
    slug:'project-salary-tool', tag:'Payroll', title:'KWIK Salary Tool',
    lede:'Computes salary structures, deductions and payslips for client staff — built under KWIK for fast, error-free payroll runs.',
    icon:'wallet',
    meta:[{k:'Role',v:'Founder / Developer'},{k:'Type',v:'Payroll'},{k:'Status',v:'Live, KWIK product'}],
    overview:[
      'Running payroll for client staff involves computing gross-to-net salary, statutory deductions (PF, ESI, PT, TDS on salary) and generating individual payslips every cycle — all of which is easy to get wrong by hand. KWIK Salary Tool handles the full computation and produces clean, accurate payslips in bulk.',
      'Another product built under KWIK, aimed at CA firms and small businesses that need reliable payroll without a full HR/payroll system.'
    ],
    features:[
      'Computes gross-to-net salary with configurable structures',
      'Handles statutory deductions (PF, ESI, PT, TDS on salary)',
      'Bulk payslip generation for multiple employees',
      'Consistent, audit-ready payroll records',
      'Built for CA firms running payroll for multiple clients'
    ],
    stack:['Payroll Computation Engine','Document Generation','Electron'],
    sideMeta:[{k:'Category',v:'Payroll'},{k:'Platform',v:'Windows Desktop'},{k:'Product line',v:'KWIK'}],
    ctaTitle:'Running payroll manually every month?',
    ctaText:'Let\'s talk about getting KWIK Salary Tool set up for you.'
  }
];

projects.forEach(detailPage);

// ================= EXPERIENCE =================
simplePage({
  slug:'exp-kwik', tag:'Experience · Founder', title:'KWIK',
  lede:'Founder — building AI-powered tools and automation products for CA firms and finance workflows.',
  meta:[{k:'Duration',v:'Nov 2025 — Present'},{k:'Location',v:'Surat'},{k:'Role',v:'Founder'}],
  body:[
    'KWIK is my own venture, born directly out of the manual-work problem I kept hitting as an Article Trainee: too much repetitive work, too little automation in how CA firms actually operate day to day.',
    'Under KWIK I design and build standalone tools — KWIK TDS for direct tax compliance and KWIK Salary Tool for payroll — aimed at CA firms and small businesses that want reliable automation without adopting a heavy, generic ERP.',
    'Everything shipped under KWIK follows the same principle as my work at VCAS: build it for real use, not as a demo.'
  ],
  ctaTitle:'Interested in what KWIK is building?',
  ctaText:'Reach out — happy to share a demo or discuss a custom build.'
});

simplePage({
  slug:'exp-vcas', tag:'Experience · Article Trainee', title:'VCAS & Co LLP',
  lede:'Article Trainee — working across Statutory Audit, GST and Direct Tax, and building the firm\'s internal automation stack.',
  meta:[{k:'Duration',v:'Nov 2025 — Present'},{k:'Location',v:'Surat'},{k:'Role',v:'Article Trainee'}],
  body:[
    'At VCAS & Co LLP I work on GST compliance & filings, statutory audit and taxation assignments, with direct exposure to real business cases across sectors.',
    'Alongside client work, I built and maintain the firm\'s internal VCAS Suite — a set of 7 in-house desktop tools (GST reconciliation, Tally automation, TDS, audit confirmations, engagement letters and more) that the whole team now runs on daily.',
    'This dual role — practicing CA work and building the tools that make it faster — is the core of how I approach the profession.'
  ],
  ctaTitle:'Want to know more about the VCAS Suite build?',
  ctaText:'Get in touch — I\'m happy to walk through it.'
});

simplePage({
  slug:'exp-ca-final', tag:'Experience · Chartered Accountancy Student', title:'CA Final, ICAI',
  lede:'Pursuing CA Final — advanced subjects including Strategic Financial Management, Direct & Indirect Tax Laws, Advanced Auditing, and Strategic Cost Management.',
  meta:[{k:'Duration',v:'Nov 2025 — Present'},{k:'Institute',v:'ICAI'},{k:'Level',v:'CA Final'}],
  body:[
    'Currently pursuing CA Final at The Institute of Chartered Accountants of India, covering Strategic Financial Management, Direct & Indirect Tax Laws, Advanced Auditing & Professional Ethics, and Strategic Cost Management & Performance Evaluation.',
    'Studying alongside full-time articleship at VCAS & Co LLP and building KWIK — which keeps every subject grounded in how it actually plays out in practice.'
  ],
  ctaTitle:'CA Final and building software at the same time?',
  ctaText:'Happy to talk about how I balance both — reach out.'
});

simplePage({
  slug:'exp-goldman-sachs', tag:'Experience · Job Simulation', title:'Goldman Sachs — Internal Audit Job Simulation',
  lede:'A simulated internal audit engagement covering risk assessment, controls testing and audit reporting.',
  meta:[{k:'Duration',v:'Apr 2026 — May 2026'},{k:'Type',v:'Job Simulation'},{k:'Focus',v:'Internal Audit'}],
  body:[
    'Completed Goldman Sachs\' Internal Audit Job Simulation, working through a realistic internal audit engagement — from risk assessment and scoping through controls testing to audit reporting.',
    'A useful contrast to statutory audit work at VCAS & Co LLP, reinforcing how internal audit and controls-based thinking apply in a large financial institution context.'
  ],
  ctaTitle:'Want to discuss internal audit / controls work?',
  ctaText:'Get in touch — always happy to talk shop.'
});

// ================= EDUCATION =================
simplePage({
  slug:'edu-ca-intermediate', tag:'Education', title:'CA Intermediate',
  lede:'The Institute of Chartered Accountants of India (ICAI).',
  meta:[{k:'Institute',v:'ICAI'},{k:'Level',v:'CA Intermediate'},{k:'Status',v:'Cleared'}],
  body:[
    'Cleared CA Intermediate under The Institute of Chartered Accountants of India, covering both groups across Accounting, Corporate & Other Laws, Cost & Management Accounting, Taxation, Advanced Accounting, Auditing & Assurance, and Financial & Strategic Management.',
    'This stage built the technical foundation now being applied directly in articleship at VCAS & Co LLP and in CA Final preparation.'
  ],
  ctaTitle:'Questions about the CA path?',
  ctaText:'Happy to share what worked for me — reach out.'
});
simplePage({
  slug:'edu-ca-foundation', tag:'Education', title:'CA Foundation',
  lede:'The Institute of Chartered Accountants of India (ICAI) — completed December 2022.',
  meta:[{k:'Institute',v:'ICAI'},{k:'Level',v:'CA Foundation'},{k:'Completed',v:'December 2022'}],
  body:[
    'Cleared CA Foundation in December 2022, the entry-level examination for the Chartered Accountancy course, covering Principles of Accounting, Business Laws, Quantitative Aptitude and Business Economics.',
    'The first formal step into the CA journey that led to Intermediate, articleship at VCAS & Co LLP, and now CA Final.'
  ],
  ctaTitle:'Starting your own CA journey?',
  ctaText:'Happy to share pointers — get in touch.'
});
simplePage({
  slug:'edu-bcom', tag:'Education', title:'Bachelor of Commerce (B.Com)',
  lede:'GLA University.',
  meta:[{k:'Institute',v:'GLA University'},{k:'Degree',v:'B.Com'}],
  body:[
    'Completed a Bachelor of Commerce at GLA University, building the core commerce, accounting and business foundation alongside CA studies.'
  ],
  ctaTitle:'Want to know more?',
  ctaText:'Reach out any time.'
});
simplePage({
  slug:'edu-hsc', tag:'Education', title:'Higher Secondary Certificate — Science',
  lede:'Kendriya Vidyalaya.',
  meta:[{k:'Institute',v:'Kendriya Vidyalaya'},{k:'Stream',v:'Science'}],
  body:[
    'Completed Higher Secondary schooling in the Science stream at Kendriya Vidyalaya, before moving into commerce and the CA track.'
  ],
  ctaTitle:'Want to know more?',
  ctaText:'Reach out any time.'
});
simplePage({
  slug:'edu-ssc', tag:'Education', title:'Secondary School Certificate',
  lede:'Kendriya Vidyalaya.',
  meta:[{k:'Institute',v:'Kendriya Vidyalaya'},{k:'Level',v:'Secondary School'}],
  body:[
    'Completed Secondary School Certificate at Kendriya Vidyalaya.'
  ],
  ctaTitle:'Want to know more?',
  ctaText:'Reach out any time.'
});

// ================= CERTIFICATIONS =================
simplePage({
  slug:'cert-icitss', tag:'Certification', title:'ICITSS-IT',
  lede:'ICAI Information Technology training, mandatory under the CA curriculum.',
  meta:[{k:'Issuer',v:'ICAI'},{k:'Area',v:'Information Technology'}],
  body:[
    'ICITSS-IT is ICAI\'s Information Technology training program, covering IT tools, systems and controls relevant to modern accounting and audit practice — the foundation that later fed into building AI-powered tools for the profession.'
  ],
  ctaTitle:'Want the details?',
  ctaText:'Get in touch.'
});
simplePage({
  slug:'cert-goldman-sachs', tag:'Certification', title:'Goldman Sachs — Internal Audit Job Simulation',
  lede:'Completed Apr–May 2026, covering risk assessment, controls testing and audit reporting.',
  meta:[{k:'Issuer',v:'Goldman Sachs'},{k:'Duration',v:'Apr — May 2026'}],
  body:[
    'A simulated internal audit engagement covering the full cycle — risk assessment, scoping, controls testing, and audit reporting — in a large financial institution context.'
  ],
  ctaTitle:'Want the details?',
  ctaText:'Get in touch.'
});
simplePage({
  slug:'cert-copilot-studio', tag:'Certification', title:'Microsoft Copilot Studio',
  lede:'Certification in building and deploying AI copilots/agents using Microsoft Copilot Studio.',
  meta:[{k:'Issuer',v:'Microsoft'},{k:'Area',v:'AI Agents'}],
  body:[
    'Covers designing, building and deploying custom AI copilots using Microsoft Copilot Studio — directly feeding into the AI-agent and automation tooling built for VCAS & Co LLP and KWIK.'
  ],
  ctaTitle:'Want the details?',
  ctaText:'Get in touch.'
});
simplePage({
  slug:'cert-google-analytics', tag:'Certification', title:'Google Analytics Certification',
  lede:'Certification covering web/app analytics fundamentals and reporting.',
  meta:[{k:'Issuer',v:'Google'},{k:'Area',v:'Analytics'}],
  body:[
    'Covers analytics fundamentals — tracking, reporting and interpreting data — applied to e-commerce and business operations work.'
  ],
  ctaTitle:'Want the details?',
  ctaText:'Get in touch.'
});
simplePage({
  slug:'cert-excel-chatgpt', tag:'Certification', title:'Excel Automation using ChatGPT',
  lede:'Certification covering AI-assisted Excel automation techniques.',
  meta:[{k:'Area',v:'Excel Automation'},{k:'Tooling',v:'ChatGPT'}],
  body:[
    'Covers using AI to build and automate Excel workflows — a direct precursor to the automation-first approach behind every tool in the VCAS Suite and KWIK product line.'
  ],
  ctaTitle:'Want the details?',
  ctaText:'Get in touch.'
});

console.log(`Generated ${projects.length} project pages + experience/education/certification pages in /pages`);
