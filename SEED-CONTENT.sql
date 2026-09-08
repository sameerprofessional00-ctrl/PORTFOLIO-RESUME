-- Run this once in Supabase SQL Editor to pre-fill Website Content
-- with your current Experience, Education and Projects,
-- so you can edit/delete them from the admin panel instead of starting blank.

insert into site_timeline (kind, title, date_label, description, link, order_num) values
('experience','Founder, KWIK','Nov 2025 — Present','Building AI-powered tools and automation products for CA firms and finance workflows.','pages/exp-kwik.html',1),
('experience','Article Trainee, VCAS & Co LLP','Nov 2025 — Present','GST compliance, statutory audit and taxation — plus building the internal VCAS Suite of tools.','pages/exp-vcas.html',2),
('experience','Internal Audit Job Simulation, Goldman Sachs','Apr — May 2026','Simulated internal audit engagement — risk assessment, controls testing, audit reporting.','pages/exp-goldman-sachs.html',3),
('experience','CA Final, ICAI','Nov 2025 — Present','Advanced subjects: SFM, Direct & Indirect Tax Laws, Advanced Auditing, Strategic Cost Management.','pages/exp-ca-final.html',4),
('education','CA Intermediate — ICAI','Cleared','Both groups cleared under The Institute of Chartered Accountants of India.','pages/edu-ca-intermediate.html',1),
('education','CA Foundation — ICAI','December 2022','Entry-level CA examination, cleared December 2022.','pages/edu-ca-foundation.html',2),
('education','Bachelor of Commerce (B.Com) — GLA University','Completed','Core commerce and accounting foundation alongside CA studies.','pages/edu-bcom.html',3),
('education','Higher Secondary Certificate — Kendriya Vidyalaya','Completed','Science stream, before moving into commerce and the CA track.','pages/edu-hsc.html',4),
('education','Secondary School Certificate — Kendriya Vidyalaya','Completed','Secondary schooling.','pages/edu-ssc.html',5)
on conflict do nothing;

insert into site_projects (title, description, tag, stack, link, featured, order_num) values
('VCAS Suite','One launcher to install, update and run every VCAS office tool. Auto-detects installed apps, silently installs/updates via a custom update server, and gives the whole firm one place to manage its software stack — no more hunting for installers.','Flagship · Electron Desktop App','Electron, Node.js, NSIS Installer, Auto-Update Server','pages/project-vcas-suite.html',true,1),
('VCAS GST Suite','GST reconciliation suite that matches GSTR-2B against purchase registers, flags mismatches, and cuts hours of manual cross-checking down to minutes.','GST','Reconciliation, GSTR-2B','pages/project-gst-suite.html',false,2),
('KWIK TDS','Simplifies TDS computation, deduction tracking and return prep — built to keep Article Trainees from re-doing the same TDS math by hand every quarter.','Direct Tax','TDS, Compliance','pages/project-tds.html',false,3),
('VCAS Tally Reco','Reconciles Tally ledgers against bank statements and external records automatically, surfacing only the entries that actually need a human look.','Audit','Tally Integration, Reconciliation','pages/project-tally-reco.html',false,4),
('VCAS Tally Entry Automation','Reads source data and pushes structured voucher entries straight into Tally — replacing hours of repetitive manual data entry for the firm.','Automation','Tally XML/API, Bulk Entry','pages/project-tally-entry-automation.html',false,5),
('Ledger Confirm Pro','Generates and tracks balance confirmation letters for debtors/creditors during statutory audits — from drafting to follow-up in one place.','Audit','Audit Confirmations, Templates','pages/project-ledger-confirm-pro.html',false,6),
('VCAS Engagement Letter Generator','Auto-generates client engagement letters from a firm-standard template, cutting drafting time from an hour to a couple of minutes per client.','Practice Management','Document Generation, Templates','pages/project-engagement-letter.html',false,7),
('KWIK Salary Tool','Computes salary structures, deductions and payslips for client staff — built under KWIK, my own venture, for fast, error-free payroll runs.','Payroll','Payroll, Payslip Generation','pages/project-salary-tool.html',false,8)
on conflict do nothing;
