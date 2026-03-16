YourPropertyAI — Brute Audit Test Plan
1. Audit Scope

Users to test:

Landlord (1–20 units, mid-large portfolios)

Property Manager (100+ units)

Tenant (student, immigrant, general)

Admin / Internal

Functional areas:

Onboarding / Signup

Property & Unit Management

Tenant Application Flow

Lease Generation & Signing

Payments & Receipts

Maintenance Requests

AI Recommendations & Prompts

Messaging & Notifications

Marketplace / Service Integration

Analytics & Insights

Security & Access Control

Legal / Compliance Enforcement

Mobile & Desktop UI/UX

2. Brute Audit Workflow
Step 1 — Account & Authentication Testing

Landlord / Property Manager signup → verify email, phone, ID, bank

Tenant signup → verify email, optional ID

Admin signup → MFA enabled

Edge tests: duplicate emails, invalid OTP, incomplete verification

Confirm session handling & logout

Audit checks:

Buttons function correctly

Proper validation errors displayed

Access levels enforced

Step 2 — Property & Unit Management

Landlord adds new property → verify AI rent suggestions

Add multiple units → ensure each unit tracks individually

Edit / Delete property → confirm state changes and notifications

Edge cases: duplicate addresses, incomplete fields

Audit checks:

UI reflects all changes

Audit log updated

Data validation correct

Step 3 — Tenant Application Process

Tenant applies to unit → upload documents, fill info

AI scoring evaluates application → risk score displayed

Landlord / Manager approves → lease auto-generated

Reject flow → tenant notified

Edge cases: missing documents, withdrawn application, multiple applicants

Audit checks:

AI suggestions appear correctly

Status updates propagate to tenant dashboard

Notifications sent reliably

Step 4 — Lease Generation & Signing

Generate lease → select jurisdiction (Canada → Ontario/BC/Quebec)

AI pre-fills info → prompts for missing optional fields

Digital signature by tenant → lease stored in vault

Edge cases: expired lease, missing mandatory fields

Audit checks:

Lease complies with provincial law

Digital signature works

Audit logs capture all actions

Step 5 — Payment & Receipts

Tenant makes payment via Interac / credit / debit

Automatic receipts generated

AI flags late or missing payments

Landlord dashboard updates accordingly

Edge cases: double payment, failed transaction, partial payment

Audit checks:

Receipts correct

AI alerts accurate

Payment history consistent

Step 6 — Maintenance Requests

Tenant submits request → uploads photos, selects category

AI categorizes urgency → landlord/manager notified

Contractor assigned → status updates to tenant

Edge cases: duplicate requests, high urgency, cancelled requests

Audit checks:

Notifications sent

Status updates reflected on dashboards

Audit log complete

Step 7 — AI Assistant / Recommendations

AI pricing suggestions → test for underpriced / overpriced units

AI risk scoring → verify correctness for tenant applications

AI vacancy prediction → triggers alerts to landlord

Edge cases: missing data, extreme values

Audit checks:

AI does not override decisions

Suggestions are actionable

Errors logged if AI fails

Step 8 — Messaging & Notifications

Tenant → Landlord messages

Landlord → Tenant responses

System notifications: payments due, maintenance updates, lease approvals

Edge cases: blocked tenants, deleted messages, high-volume messages

Audit checks:

Real-time updates

Push notifications delivered

Message history intact

Step 9 — Marketplace / Service Requests

Landlord books service → cleaning / virtual assistant / contractor

AI assigns tasks and tracks completion

Edge cases: service unavailable, duplicate bookings

Audit checks:

Booking reflected in dashboard

Notifications delivered

Status updated

Step 10 — Analytics & Insights

Occupancy rate, revenue, vacancy prediction

Tenant risk alerts, maintenance cost trends

Edge cases: zero tenants, incomplete data

Audit checks:

AI dashboards display correct insights

Graphs & tables update in real-time

Step 11 — Security & Compliance

Role-based access → tenants cannot access landlord-only data

Unauthorized attempts → blocked & logged

Data encryption → test file/document security

Edge cases: SQL injection, fake ID, session hijacking

Audit checks:

System resilient against breaches

Audit logs complete

Compliance with provincial/Canadian laws

Step 12 — UI/UX Audit

Mobile & desktop testing

Accessibility testing (WCAG)

Color contrast, font readability

Workflow clarity → buttons, alerts, error states

Edge cases: long addresses, multi-language support, rapid user actions

Audit checks:

No broken layouts

Buttons & forms responsive

UX intuitive and clear

3. Scoring System
Area	Score (0–100)
Functionality	
AI Accuracy	
Security	
Compliance	
UX/UI	
Notifications & Workflows	
Performance / Load	

Total: Weighted average → readiness score for launch

4. AI-Assisted Brute Audit Prompt

Use this for automated QA testing:

You are a QA AI for "YourPropertyAI".

Perform a full brute-force audit:

- Test all user types (Landlord, Tenant, Manager, Admin)
- Test all workflows: signup, property/unit management, tenant applications, AI scoring, lease generation, payments, maintenance, messaging, service marketplace, analytics
- Validate button functionality and state transitions
- Test AI prompts and recommendations (pricing, risk, vacancy)
- Test edge cases: duplicate entries, missing data, expired leases, late payments, high-volume actions
- Test security: unauthorized access, encrypted data, role permissions
- Test compliance: provincial lease templates, mandatory notices
- Test UI/UX: mobile responsiveness, font/color consistency, accessibility
- Produce a full report with: broken workflows, UI/UX issues, AI errors, security risks, compliance gaps
- Assign a score (0–100) for each category and overall readiness