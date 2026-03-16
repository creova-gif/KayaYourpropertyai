/**
 * AI Lease Generation System
 * Jurisdiction-aware legal templates for Ontario, BC, Alberta, Quebec, California, etc.
 * 
 * CRITICAL: This system MUST comply with local rental laws
 * - Ontario: Landlord and Tenant Board (LTB) Standard Lease
 * - BC: Residential Tenancy Act
 * - Alberta: Residential Tenancies Act
 * - Quebec: Civil Code of Québec
 * - California: California Civil Code §1940-1954.1
 */

import type { Lease, Property, Unit, Application, User } from "../types/database.types";

// ============================================================================
// JURISDICTION DETECTION
// ============================================================================

export interface Jurisdiction {
  country: string;
  province?: string;
  state?: string;
  city?: string;
  template: LeaseTemplate;
  regulatoryBody: string;
  mandatoryInclusions: string[];
}

export type LeaseTemplate =
  | "ontario_standard"
  | "bc_residential"
  | "alberta_residential"
  | "quebec_residential"
  | "california_residential"
  | "generic";

export class JurisdictionDetector {
  static detect(property: Property): Jurisdiction {
    const { country, province } = property;

    if (country === "Canada") {
      return this.detectCanadianJurisdiction(province);
    } else if (country === "USA" || country === "United States") {
      return this.detectUSJurisdiction(province);
    }

    return this.getGenericJurisdiction();
  }

  private static detectCanadianJurisdiction(province: string): Jurisdiction {
    switch (province) {
      case "Ontario":
      case "ON":
        return {
          country: "Canada",
          province: "Ontario",
          template: "ontario_standard",
          regulatoryBody: "Landlord and Tenant Board of Ontario",
          mandatoryInclusions: [
            "Standard Lease Form 2229E",
            "Rent amount and payment terms",
            "Services and utilities included",
            "Rent discounts",
            "Rent deposit",
            "Key deposit",
            "Tenant's responsibilities",
            "Smoking",
            "Additional terms",
          ],
        };

      case "British Columbia":
      case "BC":
        return {
          country: "Canada",
          province: "British Columbia",
          template: "bc_residential",
          regulatoryBody: "Residential Tenancy Branch",
          mandatoryInclusions: [
            "Residential Tenancy Agreement",
            "Move-in condition inspection report",
            "Security deposit details",
            "Pet damage deposit (if applicable)",
            "Dispute resolution procedures",
          ],
        };

      case "Alberta":
      case "AB":
        return {
          country: "Canada",
          province: "Alberta",
          template: "alberta_residential",
          regulatoryBody: "Residential Tenancy Dispute Resolution Service",
          mandatoryInclusions: [
            "Residential Tenancy Agreement",
            "Security deposit regulations",
            "Notice requirements",
            "Maintenance responsibilities",
          ],
        };

      case "Quebec":
      case "QC":
        return {
          country: "Canada",
          province: "Quebec",
          template: "quebec_residential",
          regulatoryBody: "Tribunal administratif du logement",
          mandatoryInclusions: [
            "Lease in French (mandatory)",
            "Régie du logement lease form",
            "Heating costs inclusion",
            "Right to assign or sublet",
          ],
        };

      default:
        return this.getGenericJurisdiction();
    }
  }

  private static detectUSJurisdiction(state: string): Jurisdiction {
    switch (state) {
      case "California":
      case "CA":
        return {
          country: "United States",
          state: "California",
          template: "california_residential",
          regulatoryBody: "California Department of Consumer Affairs",
          mandatoryInclusions: [
            "Lead-based paint disclosure",
            "Mold disclosure",
            "Bedbug disclosure",
            "Shared utility arrangements",
            "Security deposit itemization",
          ],
        };

      default:
        return this.getGenericJurisdiction();
    }
  }

  private static getGenericJurisdiction(): Jurisdiction {
    return {
      country: "Generic",
      template: "generic",
      regulatoryBody: "Local Housing Authority",
      mandatoryInclusions: [
        "Parties identification",
        "Property description",
        "Rent amount and due date",
        "Lease term",
        "Security deposit",
        "Tenant responsibilities",
        "Landlord responsibilities",
      ],
    };
  }
}

// ============================================================================
// LEASE CLAUSE LIBRARY
// ============================================================================

export interface LeaseClause {
  id: string;
  section: string;
  title: string;
  content: string;
  mandatory: boolean;
  editable: boolean;
  variables?: string[]; // Template variables like {{LANDLORD_NAME}}
}

export class LeaseClauseLibrary {
  /**
   * Ontario Standard Lease Clauses (Form 2229E)
   */
  static getOntarioStandardClauses(): LeaseClause[] {
    return [
      {
        id: "ON_001",
        section: "1",
        title: "Parties to the Agreement",
        content: `This lease agreement is entered into on {{LEASE_DATE}} between:

LANDLORD: {{LANDLORD_NAME}}
Address: {{LANDLORD_ADDRESS}}
Phone: {{LANDLORD_PHONE}}
Email: {{LANDLORD_EMAIL}}

and

TENANT: {{TENANT_NAME}}
Phone: {{TENANT_PHONE}}
Email: {{TENANT_EMAIL}}`,
        mandatory: true,
        editable: false,
        variables: [
          "LEASE_DATE",
          "LANDLORD_NAME",
          "LANDLORD_ADDRESS",
          "LANDLORD_PHONE",
          "LANDLORD_EMAIL",
          "TENANT_NAME",
          "TENANT_PHONE",
          "TENANT_EMAIL",
        ],
      },
      {
        id: "ON_002",
        section: "2",
        title: "Rental Unit",
        content: `The landlord will rent to the tenant the following rental unit:

Address: {{PROPERTY_ADDRESS}}
Unit: {{UNIT_NUMBER}}
City: {{CITY}}
Province: Ontario
Postal Code: {{POSTAL_CODE}}

The rental unit includes the following parking space(s): {{PARKING_SPACES}}`,
        mandatory: true,
        editable: false,
        variables: [
          "PROPERTY_ADDRESS",
          "UNIT_NUMBER",
          "CITY",
          "POSTAL_CODE",
          "PARKING_SPACES",
        ],
      },
      {
        id: "ON_003",
        section: "3",
        title: "Term of Tenancy Agreement",
        content: `This tenancy agreement begins on {{LEASE_START}} and:
☐ Continues on a month-to-month basis
☑ Ends on {{LEASE_END}}`,
        mandatory: true,
        editable: false,
        variables: ["LEASE_START", "LEASE_END"],
      },
      {
        id: "ON_004",
        section: "4",
        title: "Rent",
        content: `The tenant will pay rent to the landlord as follows:

Lawful rent: ${{MONTHLY_RENT}} per month
Rent is due on day {{DUE_DAY}} of each month

Payment method: {{PAYMENT_METHOD}}

The landlord's account information for payment is:
{{PAYMENT_DETAILS}}

The tenant will pay rent to the landlord for any period before the term of this agreement begins: ${{PRE_RENT}} for the period from {{PRE_RENT_START}} to {{PRE_RENT_END}}.`,
        mandatory: true,
        editable: false,
        variables: [
          "MONTHLY_RENT",
          "DUE_DAY",
          "PAYMENT_METHOD",
          "PAYMENT_DETAILS",
          "PRE_RENT",
          "PRE_RENT_START",
          "PRE_RENT_END",
        ],
      },
      {
        id: "ON_005",
        section: "5",
        title: "Services and Utilities",
        content: `The landlord will provide the following services and utilities:
{{#each UTILITIES_INCLUDED}}
☑ {{this}}
{{/each}}

The tenant is responsible for the following services and utilities:
{{#each UTILITIES_TENANT}}
☐ {{this}}
{{/each}}`,
        mandatory: true,
        editable: true,
        variables: ["UTILITIES_INCLUDED", "UTILITIES_TENANT"],
      },
      {
        id: "ON_006",
        section: "6",
        title: "Rent Discounts",
        content: `The landlord is giving the tenant the following rent discounts:
{{RENT_DISCOUNTS}}

If there are no rent discounts, write "None" or "N/A".`,
        mandatory: true,
        editable: true,
        variables: ["RENT_DISCOUNTS"],
      },
      {
        id: "ON_007",
        section: "7",
        title: "Rent Deposit",
        content: `The tenant agrees to pay the landlord a rent deposit of ${{RENT_DEPOSIT}} on or before {{DEPOSIT_DUE_DATE}}.

The landlord will keep this money during the tenancy and use it for the rent for the last rental period before the tenancy ends. The landlord will not use this money for anything else, such as to pay for damages to the rental unit.

The landlord will pay the tenant interest on the rent deposit every 12 months, at the rate set under the Residential Tenancies Act, 2006.`,
        mandatory: true,
        editable: false,
        variables: ["RENT_DEPOSIT", "DEPOSIT_DUE_DATE"],
      },
      {
        id: "ON_008",
        section: "8",
        title: "Key Deposit",
        content: `The tenant agrees to pay the landlord a key deposit of ${{KEY_DEPOSIT}} on or before {{KEY_DEPOSIT_DUE}}.

The landlord will return this deposit to the tenant when the tenant returns all keys, remote entry devices, and passes at the end of the tenancy.`,
        mandatory: true,
        editable: true,
        variables: ["KEY_DEPOSIT", "KEY_DEPOSIT_DUE"],
      },
      {
        id: "ON_009",
        section: "9",
        title: "Smoking",
        content: `Smoking of any substance is {{SMOKING_POLICY}} in the rental unit, building and property.`,
        mandatory: true,
        editable: true,
        variables: ["SMOKING_POLICY"],
      },
      {
        id: "ON_010",
        section: "10",
        title: "Tenant's Responsibilities",
        content: `The tenant agrees to:
• Pay the rent on time
• Keep the rental unit clean
• Repair any damage caused by the tenant or guests
• Not disturb other tenants or the landlord
• Get the landlord's written permission before subletting or assigning the rental unit
• Follow the rules and responsibilities in the Residential Tenancies Act, 2006`,
        mandatory: true,
        editable: false,
      },
      {
        id: "ON_011",
        section: "11",
        title: "Additional Terms",
        content: `{{ADDITIONAL_TERMS}}

NOTE: Additional terms cannot take away or change any rights under the Residential Tenancies Act, 2006. If they do, those additional terms are void (not valid) and cannot be enforced.`,
        mandatory: false,
        editable: true,
        variables: ["ADDITIONAL_TERMS"],
      },
    ];
  }

  /**
   * Generic Residential Lease Clauses
   */
  static getGenericClauses(): LeaseClause[] {
    return [
      {
        id: "GEN_001",
        section: "1",
        title: "Parties",
        content: `This Residential Lease Agreement ("Agreement") is entered into on {{LEASE_DATE}} between {{LANDLORD_NAME}} ("Landlord") and {{TENANT_NAME}} ("Tenant").`,
        mandatory: true,
        editable: false,
        variables: ["LEASE_DATE", "LANDLORD_NAME", "TENANT_NAME"],
      },
      {
        id: "GEN_002",
        section: "2",
        title: "Property",
        content: `Landlord agrees to rent to Tenant the property located at {{PROPERTY_ADDRESS}}, Unit {{UNIT_NUMBER}}, {{CITY}}, {{PROVINCE}}, {{POSTAL_CODE}}.`,
        mandatory: true,
        editable: false,
        variables: [
          "PROPERTY_ADDRESS",
          "UNIT_NUMBER",
          "CITY",
          "PROVINCE",
          "POSTAL_CODE",
        ],
      },
      {
        id: "GEN_003",
        section: "3",
        title: "Term",
        content: `The term of this lease shall begin on {{LEASE_START}} and end on {{LEASE_END}}, unless terminated earlier in accordance with the terms of this Agreement.`,
        mandatory: true,
        editable: false,
        variables: ["LEASE_START", "LEASE_END"],
      },
      {
        id: "GEN_004",
        section: "4",
        title: "Rent",
        content: `Tenant agrees to pay rent in the amount of ${{MONTHLY_RENT}} per month, due on the {{DUE_DAY}} day of each month. Payment shall be made to {{PAYMENT_DETAILS}}.`,
        mandatory: true,
        editable: false,
        variables: ["MONTHLY_RENT", "DUE_DAY", "PAYMENT_DETAILS"],
      },
      {
        id: "GEN_005",
        section: "5",
        title: "Security Deposit",
        content: `Tenant has paid a security deposit of ${{DEPOSIT}} to Landlord. This deposit will be held as security for damages beyond normal wear and tear and will be returned within {{DEPOSIT_RETURN_DAYS}} days after the lease ends, less any lawful deductions.`,
        mandatory: true,
        editable: false,
        variables: ["DEPOSIT", "DEPOSIT_RETURN_DAYS"],
      },
    ];
  }

  static getClausesForJurisdiction(jurisdiction: Jurisdiction): LeaseClause[] {
    switch (jurisdiction.template) {
      case "ontario_standard":
        return this.getOntarioStandardClauses();
      case "bc_residential":
      case "alberta_residential":
      case "quebec_residential":
      case "california_residential":
        return this.getGenericClauses(); // Placeholder - would have specific clauses
      case "generic":
      default:
        return this.getGenericClauses();
    }
  }
}

// ============================================================================
// AI LEASE GENERATOR
// ============================================================================

export class AILeaseGenerator {
  /**
   * Main lease generation workflow
   */
  static async generateLease(
    property: Property,
    unit: Unit,
    application: Application,
    landlord: User,
    tenant: User
  ): Promise<{ lease: Lease; pdf: string; warnings: string[] }> {
    const warnings: string[] = [];

    // Step 1: Detect jurisdiction
    const jurisdiction = JurisdictionDetector.detect(property);
    console.log(`📍 Jurisdiction detected: ${jurisdiction.province || jurisdiction.state}`);
    console.log(`📋 Template: ${jurisdiction.template}`);
    console.log(`🏛️ Regulatory body: ${jurisdiction.regulatoryBody}`);

    // Step 2: Load legal template
    const clauses = LeaseClauseLibrary.getClausesForJurisdiction(jurisdiction);
    console.log(`📄 Loaded ${clauses.length} clauses`);

    // Step 3: Prepare data variables
    const variables = this.prepareVariables(property, unit, application, landlord, tenant);

    // Step 4: Fill template with data
    const filledClauses = this.fillClauses(clauses, variables);

    // Step 5: Validate mandatory clauses
    const validation = this.validateClauses(filledClauses, jurisdiction);
    if (!validation.valid) {
      warnings.push(...validation.warnings);
      console.warn(`⚠️ Validation warnings:`, validation.warnings);
    }

    // Step 6: Generate lease object
    const lease: Lease = {
      id: "lease_" + Date.now(),
      tenantId: tenant.id,
      landlordId: landlord.id,
      propertyId: property.id,
      unitId: unit.id,
      applicationId: application.id,
      leaseStart: new Date(new Date().setDate(new Date().getDate() + 30)),
      leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      monthlyRent: unit.rentPrice,
      deposit: unit.deposit,
      dueDay: 1,
      jurisdiction: `${jurisdiction.province || jurisdiction.state}, ${jurisdiction.country}`,
      legalTemplate: jurisdiction.template,
      templateVersion: "1.0.0",
      mandatoryClauses: filledClauses.filter((c) => c.mandatory),
      optionalClauses: filledClauses.filter((c) => !c.mandatory),
      landlordSigned: false,
      tenantSigned: false,
      status: "awaiting_signature",
      generatedAt: new Date(),
      utilitiesIncluded: unit.utilitiesIncluded || [],
      petsAllowed: application.pets || false,
      petPolicy: application.petDetails,
      smokingAllowed: false,
      parkingSpaces: unit.parkingSpaces || 0,
    };

    // Step 7: Generate PDF
    const pdf = this.generatePDF(lease, filledClauses, landlord, tenant);

    return { lease, pdf, warnings };
  }

  /**
   * Prepare template variables from data
   */
  private static prepareVariables(
    property: Property,
    unit: Unit,
    application: Application,
    landlord: User,
    tenant: User
  ): Record<string, any> {
    const today = new Date();
    const leaseStart = new Date(today);
    leaseStart.setDate(today.getDate() + 30);
    const leaseEnd = new Date(leaseStart);
    leaseEnd.setFullYear(leaseEnd.getFullYear() + 1);

    return {
      LEASE_DATE: today.toLocaleDateString(),
      LANDLORD_NAME: landlord.name,
      LANDLORD_ADDRESS: property.address,
      LANDLORD_PHONE: landlord.phone,
      LANDLORD_EMAIL: landlord.email,
      TENANT_NAME: tenant.name,
      TENANT_PHONE: tenant.phone,
      TENANT_EMAIL: tenant.email,
      PROPERTY_ADDRESS: property.address,
      UNIT_NUMBER: unit.unitNumber,
      CITY: property.city,
      PROVINCE: property.province,
      POSTAL_CODE: property.postalCode,
      LEASE_START: leaseStart.toLocaleDateString(),
      LEASE_END: leaseEnd.toLocaleDateString(),
      MONTHLY_RENT: unit.rentPrice.toString(),
      DUE_DAY: "1",
      PAYMENT_METHOD: "Bank Transfer",
      PAYMENT_DETAILS: "See tenant portal for details",
      RENT_DEPOSIT: unit.deposit.toString(),
      DEPOSIT_DUE_DATE: leaseStart.toLocaleDateString(),
      KEY_DEPOSIT: "100",
      KEY_DEPOSIT_DUE: leaseStart.toLocaleDateString(),
      PARKING_SPACES: (unit.parkingSpaces || 0).toString(),
      UTILITIES_INCLUDED: unit.utilitiesIncluded || [],
      UTILITIES_TENANT: [],
      RENT_DISCOUNTS: "None",
      SMOKING_POLICY: "prohibited",
      ADDITIONAL_TERMS: application.pets
        ? `Pets: ${application.petDetails || "Pet approved with conditions"}`
        : "",
      DEPOSIT: unit.deposit.toString(),
      DEPOSIT_RETURN_DAYS: "30",
    };
  }

  /**
   * Fill template clauses with variables
   */
  private static fillClauses(
    clauses: LeaseClause[],
    variables: Record<string, any>
  ): LeaseClause[] {
    return clauses.map((clause) => {
      let content = clause.content;

      // Simple template variable replacement
      for (const [key, value] of Object.entries(variables)) {
        const placeholder = `{{${key}}}`;
        if (Array.isArray(value)) {
          content = content.replace(placeholder, value.join(", "));
        } else {
          content = content.replace(new RegExp(placeholder, "g"), String(value));
        }
      }

      return { ...clause, content };
    });
  }

  /**
   * Validate that all mandatory clauses are present
   */
  private static validateClauses(
    clauses: LeaseClause[],
    jurisdiction: Jurisdiction
  ): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const mandatoryClauses = clauses.filter((c) => c.mandatory);

    // Check all mandatory inclusions
    for (const required of jurisdiction.mandatoryInclusions) {
      const found = mandatoryClauses.some(
        (clause) =>
          clause.title.toLowerCase().includes(required.toLowerCase()) ||
          clause.content.toLowerCase().includes(required.toLowerCase())
      );

      if (!found) {
        warnings.push(`Missing mandatory inclusion: ${required}`);
      }
    }

    return {
      valid: warnings.length === 0,
      warnings,
    };
  }

  /**
   * Generate PDF representation (mock)
   */
  private static generatePDF(
    lease: Lease,
    clauses: LeaseClause[],
    landlord: User,
    tenant: User
  ): string {
    // In production, this would use a PDF library like pdfkit or puppeteer
    const pdfContent = `
===========================================
RESIDENTIAL LEASE AGREEMENT
===========================================

Jurisdiction: ${lease.jurisdiction}
Template: ${lease.legalTemplate}
Generated: ${lease.generatedAt.toLocaleString()}

-------------------------------------------

${clauses.map((clause) => `
SECTION ${clause.section}: ${clause.title}
${clause.content}
`).join("\n-------------------------------------------\n")}

-------------------------------------------
SIGNATURES
-------------------------------------------

LANDLORD: ${landlord.name}
Signature: ________________________
Date: ____________________________

TENANT: ${tenant.name}
Signature: ________________________
Date: ____________________________

===========================================
END OF LEASE AGREEMENT
===========================================
    `.trim();

    return `data:text/plain;base64,${btoa(pdfContent)}`;
  }
}

// Export main generator
export const LeaseGenerator = AILeaseGenerator;
