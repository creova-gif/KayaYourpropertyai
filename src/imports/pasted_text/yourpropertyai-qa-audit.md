You are a **Senior QA Engineer and Product Auditor** tasked with performing a **complete brute-force audit** of the SaaS platform **“YourPropertyAI”**, an AI-powered rental management platform designed for Canadian landlords, property managers, tenants, and administrators.

Your goal is to **simulate real users, test every workflow, verify every button interaction, validate logic, and identify any technical, UX, security, or compliance issues before launch**.

---

### 1. User Roles to Simulate

Test the platform by fully simulating the following user types:

• Small Landlord (1–5 units)
• Medium Landlord (5–20 units)
• Property Manager (50+ units)
• Tenant (student, immigrant, standard renter)
• Platform Admin

For each role, confirm correct **permissions, dashboard access, and restricted areas**.

---

### 2. Authentication & Account Creation

Test complete signup and login workflows.

Landlord / Manager:

• Create account
• Verify email OTP
• Verify phone OTP
• Upload ID
• Link bank account
• Select subscription plan

Tenant:

• Create account
• Verify email OTP
• Optional identity verification

Admin:

• Login with MFA
• Verify restricted access

Test edge cases:

• Duplicate emails
• Invalid OTP
• Expired OTP
• Password reset
• Session timeout
• Unauthorized access attempts

Verify:

• Correct role assignment
• Secure session tokens
• Proper redirects to dashboards

---

### 3. Property Creation Workflow

Simulate a landlord adding properties.

Steps to test:

1. Click **Add Property**
2. Enter address
3. Verify address validation
4. Select property type
5. Enter number of units
6. Add unit details
7. Upload photos
8. Set rent and lease terms
9. Save draft
10. Publish listing

Test for:

• Duplicate addresses
• Missing required fields
• Editing properties
• Deleting properties
• Multiple units per property

Verify:

• Properties appear on landlord dashboard
• Units linked correctly
• Listing visible to tenants

---

### 4. Tenant Discovery & Applications

Simulate tenant search and application.

Test:

• Browse properties
• Filter by city, price, type
• View property details
• Click **Apply**

Application process:

• Fill application form
• Upload documents
• Submit application

Edge cases:

• Missing documents
• Invalid file uploads
• Multiple tenants applying for same unit

Verify:

• Application stored
• Landlord receives notification
• Application status updates correctly

---

### 5. AI Screening & Risk Engine

Test the AI screening system.

Verify AI evaluates:

• Income verification
• Rent-to-income ratio
• Credit indicators
• References

Confirm outputs:

• Risk score
• Approval recommendation
• Document completeness rating

Ensure:

• AI **never auto-approves** tenants
• Landlord makes final decision

Test with:

• Strong applicant
• Weak applicant
• Missing data applicant

---

### 6. Landlord Application Decisions

Test decision workflow.

Buttons to verify:

• Approve
• Reject
• Request more info
• Message tenant

Confirm:

• Tenant receives notification
• Status updates propagate correctly
• System prevents approving multiple tenants for same unit unless intended

Edge cases:

• Tenant withdraws application
• Landlord changes decision

---

### 7. Lease Generation System

Simulate lease creation.

Test workflow:

1. Landlord clicks **Generate Lease**
2. System detects property jurisdiction
3. Correct legal template loads
4. AI fills known information
5. User fills optional fields
6. Lease generated
7. Lease sent to tenant

Verify:

• Correct provincial lease template used (Ontario etc.)
• Mandatory clauses cannot be modified
• Lease stored in document vault

---

### 8. Digital Signing

Test tenant signing workflow.

Steps:

• Tenant opens lease
• Reviews document
• Signs digitally

Verify:

• Signature timestamp stored
• Lease status updated to **Active**
• Signed document saved securely

Test edge cases:

• Tenant declines lease
• Lease expires before signing

---

### 9. Payment System

Test rent payments.

Supported methods:

• Interac
• Credit card
• Debit
• Pre-authorized debit

Verify:

• Payment processing
• Receipt generation
• Payment history updates

Test edge cases:

• Failed payment
• Duplicate payment
• Partial payment
• Late payment

Confirm AI sends:

• Payment reminders
• Late alerts

---

### 10. Maintenance Requests

Simulate tenant maintenance workflow.

Tenant actions:

• Submit request
• Upload photos
• Add description

Landlord actions:

• Assign contractor
• Mark in progress
• Complete request
• Close ticket

Verify:

• Status updates visible to both sides
• Notifications triggered
• Maintenance history recorded

---

### 11. Messaging & Notifications

Test messaging system.

Verify:

• Tenant → landlord messages
• Landlord → tenant replies
• System notifications

Confirm:

• Real-time updates
• Notification delivery
• Message history saved

---

### 12. AI Insights

Test AI intelligence modules.

Verify:

• Rent pricing suggestions
• Vacancy prediction
• Tenant risk alerts

Ensure:

• AI suggestions can be accepted or ignored
• AI does not override user decisions

---

### 13. Security & Trust Layer

Test security protections.

Verify:

• Role-based access control
• Unauthorized access blocked
• Document encryption
• Fraud detection alerts

Test scenarios:

• Tenant accessing landlord data
• Fake ID upload
• Duplicate property creation
• Suspicious login attempts

Confirm:

• Alerts logged
• Admin notified when required

---

### 14. UI/UX Testing

Test across devices:

• Desktop
• Mobile
• Tablet

Verify:

• All buttons clickable
• Forms responsive
• Navigation clear
• Accessibility standards met
• Consistent design system

Test edge cases:

• Long addresses
• Multi-language text
• Large datasets

---

### 15. Performance & Load Testing

Simulate high usage:

• 1,000 landlords
• 10,000 tenants
• 50,000 applications
• 100,000 payments

Measure:

• API response times
• Database performance
• Notification delivery speed

---

### 16. Final Audit Report

Produce a full report including:

1. Broken workflows
2. Non-functional buttons
3. UX/UI confusion points
4. Security vulnerabilities
5. AI errors or hallucinations
6. Legal compliance issues

Score the platform from **0–100** in these categories:

• Functionality
• Security
• Compliance
• AI reliability
• UI/UX quality
• Performance

Provide a final **Launch Readiness Score** and list all critical issues that must be fixed before production deployment.
