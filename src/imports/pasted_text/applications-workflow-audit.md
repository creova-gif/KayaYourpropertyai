You are a senior product QA engineer, proptech workflow architect, and UX auditor.

Your task is to perform a FULL SYSTEM WORKFLOW AUDIT of the “Applications Page” for a property management platform used by:

• Individual landlords
• Property managers managing multiple buildings
• Real estate companies managing hundreds of units
• Commercial property leasing teams
• Residential rental landlords
• Students applying for rentals
• Tenants applying for residential or commercial spaces

The system must work for:
• Residential rentals
• Student housing
• Multi-unit apartment buildings
• Commercial retail spaces
• Office leasing
• Mixed-use buildings

The goal is to verify that the ENTIRE APPLICATION FLOW works smoothly for both landlords and tenants and follows a seamless UX design.

--------------------------------------------------

STEP 1 — TEST APPLICATION CREATION

Audit how tenant applications are created.

Test these scenarios:

1. Tenant finds a property listing and clicks "Apply".
2. Tenant creates an account OR logs in.
3. Tenant uploads required documents:
   • ID
   • proof of income
   • credit report
   • references
   • employment details

Check that:

• Required documents are validated
• Missing documents are flagged
• Application progress is visible
• The tenant receives confirmation of submission
• The application is linked to the specific property

Evaluate UX clarity for tenants applying.

Questions to answer:

• Can tenants track their application status?
• Can they edit their application?
• Can they withdraw their application?
• Can they apply to multiple properties?

--------------------------------------------------

STEP 2 — TEST LANDLORD / PROPERTY MANAGER VIEW

Audit the Applications Dashboard.

Landlords and property managers should see:

• list of applications
• applicant details
• property applied to
• application status
• AI risk score
• document verification status
• income-to-rent ratio
• employment verification
• references

Test UI interactions:

• open application details
• compare applicants
• view documents
• message applicant

Check that all information is clearly visible and organized.

--------------------------------------------------

STEP 3 — ACCEPT APPLICATION WORKFLOW

Test what happens when a landlord accepts an application.

Verify the full workflow:

1. Landlord clicks "Approve Application".
2. System confirms approval with a confirmation modal.
3. AI generates lease agreement.
4. Tenant receives notification immediately.
5. Tenant is redirected to the lease signing page.
6. Property unit status updates to "Reserved" or "Leased".
7. Application status changes to "Approved".

Check the tenant side:

• Does the tenant receive email notification?
• Do they receive an in-app notification?
• Do they receive instructions for the next steps?
• Can they digitally sign the lease?

--------------------------------------------------

STEP 4 — REJECT APPLICATION WORKFLOW

Test what happens when a landlord rejects an application.

Verify the process:

1. Landlord clicks "Reject".
2. System asks if they want to include a rejection reason.
3. Application status updates to "Rejected".
4. Tenant receives notification.

Test the tenant experience:

• Do they receive an email or in-app message?
• Does the message explain that the application was unsuccessful?
• Does the system encourage applying to other listings?

Ensure rejection messaging is respectful and compliant.

--------------------------------------------------

STEP 5 — PROPERTY MANAGER MULTI-PROPERTY WORKFLOW

Audit how property managers handle applications across many properties.

Test these features:

• filtering by property
• filtering by building
• sorting by risk score
• sorting by income ratio
• sorting by application date

Check if managers can:

• approve multiple applicants quickly
• assign applicants to specific units
• communicate with multiple tenants simultaneously

Ensure performance works with hundreds of applications.

--------------------------------------------------

STEP 6 — TENANT JOURNEY

Audit the full tenant journey.

Tenant flow should be:

1. Browse property
2. Apply
3. Upload documents
4. Track application
5. Receive decision
6. Sign lease
7. Move into tenant portal

Verify tenant portal includes:

• lease documents
• receipts
• rent payment history
• notices
• maintenance requests

--------------------------------------------------

STEP 7 — COMMERCIAL PROPERTY APPLICATIONS

Test if the system works for commercial tenants.

Commercial applications should allow:

• business name
• incorporation documents
• financial statements
• lease term negotiation
• square footage selection

Verify the system supports both:

• residential tenant applications
• commercial leasing applications

--------------------------------------------------

STEP 8 — EDGE CASE TESTING

Test edge cases:

• landlord rejects accidentally
• tenant uploads incorrect documents
• multiple tenants apply for same unit
• landlord approves multiple tenants
• tenant withdraws application
• landlord cancels listing

Verify system handles these correctly.

--------------------------------------------------

STEP 9 — UX AND PERFORMANCE AUDIT

Evaluate:

• speed of loading applications
• clarity of UI
• ease of approving or rejecting tenants
• mobile usability
• accessibility

Check that workflows require minimal clicks.

--------------------------------------------------

FINAL OUTPUT REQUIRED

Provide a report including:

1. Broken workflows
2. UX confusion points
3. Missing features
4. Compliance risks
5. Recommended UI improvements
6. Recommended automation improvements

Score the Applications Page readiness from 0–100.

Provide a prioritized list of fixes.

The goal is to ensure the Applications Page workflow is seamless for landlords, property managers, and tenants across residential and commercial leasing scenarios.