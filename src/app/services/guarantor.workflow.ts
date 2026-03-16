/**
 * CREOVA Guarantor Workflow System
 * 
 * Market Differentiator: Support for international students & newcomers
 * Features:
 * - Parent/Guardian guarantor support
 * - International income verification
 * - Credit alternative scoring
 * - Multi-country document support
 */

import type { Application, User } from "../types/database.types";

// ============================================================================
// GUARANTOR TYPES
// ============================================================================

export type GuarantorType = "parent" | "guardian" | "sponsor" | "employer" | "institution";
export type GuarantorStatus = "pending" | "documents_uploaded" | "verified" | "approved" | "rejected";
export type DocumentType = 
  | "government_id"
  | "proof_of_income"
  | "bank_statement"
  | "employment_letter"
  | "tax_return"
  | "property_deed"
  | "credit_report"
  | "guarantor_agreement";

export interface Guarantor {
  id: string;
  applicationId: string;
  type: GuarantorType;
  status: GuarantorStatus;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
  
  // Address
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  
  // Financial Information
  annualIncome: number;
  employer?: string;
  jobTitle?: string;
  yearsEmployed?: number;
  
  // Documents
  documents: {
    [key in DocumentType]?: {
      uploaded: boolean;
      url?: string;
      verified?: boolean;
      verifiedAt?: Date;
    };
  };
  
  // Verification
  verificationScore: number; // 0-100
  verificationNotes: string[];
  
  // Agreement
  agreementSigned: boolean;
  signedAt?: Date;
  digitalSignature?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// INTERNATIONAL STUDENT APPLICATION
// ============================================================================

export interface InternationalStudentApplication extends Application {
  // Student Status
  isInternationalStudent: boolean;
  studentType: "undergraduate" | "graduate" | "postgraduate" | "language" | "exchange";
  
  // School Information
  institution: string;
  program: string;
  expectedGraduation: Date;
  enrollmentLetter: boolean;
  
  // Immigration Status
  studyPermit: {
    number: string;
    expiryDate: Date;
    documentUrl?: string;
    verified: boolean;
  };
  
  // Financial Support
  fundingSource: "family" | "scholarship" | "savings" | "employment" | "loan" | "sponsor";
  proofOfFunds: {
    amount: number;
    currency: string;
    documentUrl?: string;
    verified: boolean;
  };
  
  // Guarantor
  requiresGuarantor: boolean;
  guarantor?: Guarantor;
  
  // Home Country
  homeCountry: string;
  yearsInCanada: number;
  
  // Credit Alternative Scoring
  alternativeCreditScore: number; // 0-100
  alternativeCreditFactors: {
    factor: string;
    score: number;
    weight: number;
  }[];
}

// ============================================================================
// GUARANTOR WORKFLOW SERVICE
// ============================================================================

export class GuarantorWorkflowService {
  /**
   * Create guarantor request for international student
   */
  static async createGuarantorRequest(
    applicationId: string,
    guarantorInfo: Partial<Guarantor>
  ): Promise<Guarantor> {
    await this.delay(1000);
    
    const guarantor: Guarantor = {
      id: "guar_" + Date.now(),
      applicationId,
      type: guarantorInfo.type || "parent",
      status: "pending",
      firstName: guarantorInfo.firstName || "",
      lastName: guarantorInfo.lastName || "",
      email: guarantorInfo.email || "",
      phone: guarantorInfo.phone || "",
      relationship: guarantorInfo.relationship || "Parent",
      address: guarantorInfo.address || "",
      city: guarantorInfo.city || "",
      province: guarantorInfo.province || "",
      country: guarantorInfo.country || "",
      postalCode: guarantorInfo.postalCode || "",
      annualIncome: guarantorInfo.annualIncome || 0,
      employer: guarantorInfo.employer,
      jobTitle: guarantorInfo.jobTitle,
      yearsEmployed: guarantorInfo.yearsEmployed,
      documents: {},
      verificationScore: 0,
      verificationNotes: [],
      agreementSigned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Send email to guarantor
    await this.sendGuarantorInvitation(guarantor);
    
    return guarantor;
  }

  /**
   * Send invitation email to guarantor
   */
  private static async sendGuarantorInvitation(guarantor: Guarantor): Promise<void> {
    console.log(`📧 Guarantor invitation sent to ${guarantor.email}`);
    
    const emailTemplate = `
Dear ${guarantor.firstName} ${guarantor.lastName},

You have been requested to act as a guarantor for a rental application on CREOVA.

As a guarantor, you agree to be financially responsible if the tenant is unable to pay rent or damages.

Please click the link below to:
1. Review the guarantor agreement
2. Upload required documents (ID, proof of income, bank statements)
3. Sign the digital agreement

[COMPLETE GUARANTOR APPLICATION]

Required Documents:
- Government-issued ID
- Proof of income (pay stubs or tax returns)
- Bank statements (last 3 months)
- Employment verification letter

This process is secure and typically takes 10-15 minutes.

Thank you,
CREOVA Team
    `;
    
    // In production, send actual email via SendGrid/Resend
    await this.delay(500);
  }

  /**
   * Upload guarantor document
   */
  static async uploadDocument(
    guarantorId: string,
    documentType: DocumentType,
    fileUrl: string
  ): Promise<Guarantor> {
    await this.delay(800);
    
    // Mock: In production, upload to S3 and update database
    const guarantor: Partial<Guarantor> = {
      id: guarantorId,
      documents: {
        [documentType]: {
          uploaded: true,
          url: fileUrl,
          verified: false,
        },
      },
      status: "documents_uploaded",
      updatedAt: new Date(),
    };
    
    // Check if all required documents uploaded
    const requiredDocs: DocumentType[] = [
      "government_id",
      "proof_of_income",
      "bank_statement",
      "guarantor_agreement",
    ];
    
    // Auto-trigger verification if all docs uploaded
    const allUploaded = requiredDocs.every(doc => 
      guarantor.documents?.[doc]?.uploaded
    );
    
    if (allUploaded) {
      await this.triggerVerification(guarantorId);
    }
    
    return guarantor as Guarantor;
  }

  /**
   * Trigger AI verification of guarantor documents
   */
  private static async triggerVerification(guarantorId: string): Promise<void> {
    console.log(`🤖 AI verification triggered for guarantor ${guarantorId}`);
    
    // Simulate AI document verification
    await this.delay(2000);
    
    // In production: OCR, document fraud detection, income verification
    const verificationScore = 85; // Mock score
    
    console.log(`✅ Verification complete. Score: ${verificationScore}/100`);
  }

  /**
   * Sign guarantor agreement
   */
  static async signAgreement(
    guarantorId: string,
    signature: string
  ): Promise<Guarantor> {
    await this.delay(1000);
    
    const guarantor: Partial<Guarantor> = {
      id: guarantorId,
      agreementSigned: true,
      signedAt: new Date(),
      digitalSignature: signature,
      status: "approved",
      updatedAt: new Date(),
    };
    
    console.log(`✅ Guarantor agreement signed`);
    
    return guarantor as Guarantor;
  }

  /**
   * Verify guarantor financial capacity
   */
  static async verifyFinancialCapacity(
    guarantor: Guarantor,
    requiredRent: number
  ): Promise<{
    approved: boolean;
    score: number;
    reasons: string[];
  }> {
    await this.delay(1500);
    
    const incomeToRentRatio = guarantor.annualIncome / (requiredRent * 12);
    
    let score = 50;
    const reasons = [];
    
    // Income verification
    if (incomeToRentRatio >= 4) {
      score += 30;
      reasons.push(`Strong income: ${incomeToRentRatio.toFixed(1)}x annual rent`);
    } else if (incomeToRentRatio >= 3) {
      score += 20;
      reasons.push(`Adequate income: ${incomeToRentRatio.toFixed(1)}x annual rent`);
    } else {
      score -= 20;
      reasons.push(`Low income ratio: ${incomeToRentRatio.toFixed(1)}x annual rent`);
    }
    
    // Employment stability
    if (guarantor.yearsEmployed && guarantor.yearsEmployed >= 5) {
      score += 15;
      reasons.push("Long-term employment stability");
    } else if (guarantor.yearsEmployed && guarantor.yearsEmployed >= 2) {
      score += 10;
      reasons.push("Stable employment history");
    }
    
    // Document verification
    const requiredDocs: DocumentType[] = ["government_id", "proof_of_income", "bank_statement"];
    const verifiedDocs = requiredDocs.filter(doc => 
      guarantor.documents[doc]?.verified
    ).length;
    
    score += verifiedDocs * 5;
    reasons.push(`${verifiedDocs}/${requiredDocs.length} documents verified`);
    
    return {
      approved: score >= 70,
      score: Math.min(100, score),
      reasons,
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// ALTERNATIVE CREDIT SCORING (For No Canadian Credit)
// ============================================================================

export class AlternativeCreditScoring {
  /**
   * Calculate credit score for applicants without Canadian credit history
   */
  static async calculateScore(
    application: InternationalStudentApplication
  ): Promise<{
    score: number;
    factors: { factor: string; score: number; weight: number }[];
    recommendation: "approve" | "review" | "reject";
  }> {
    await this.delay(1500);
    
    const factors = [];
    let totalScore = 0;
    
    // Factor 1: Proof of Funds (30% weight)
    if (application.proofOfFunds) {
      const fundsToRentRatio = application.proofOfFunds.amount / (application.monthlyIncome * 12);
      let fundsScore = 0;
      
      if (fundsToRentRatio >= 2) fundsScore = 100;
      else if (fundsToRentRatio >= 1.5) fundsScore = 80;
      else if (fundsToRentRatio >= 1) fundsScore = 60;
      else fundsScore = 40;
      
      factors.push({
        factor: "Proof of Funds",
        score: fundsScore,
        weight: 30,
      });
      
      totalScore += fundsScore * 0.3;
    }
    
    // Factor 2: Guarantor Strength (25% weight)
    if (application.guarantor) {
      const guarantorVerification = await GuarantorWorkflowService.verifyFinancialCapacity(
        application.guarantor,
        application.monthlyIncome
      );
      
      factors.push({
        factor: "Guarantor Financial Capacity",
        score: guarantorVerification.score,
        weight: 25,
      });
      
      totalScore += guarantorVerification.score * 0.25;
    }
    
    // Factor 3: Student Status (20% weight)
    let studentScore = 0;
    if (application.enrollmentLetter) studentScore += 50;
    if (application.studyPermit.verified) studentScore += 50;
    
    factors.push({
      factor: "Student Verification",
      score: studentScore,
      weight: 20,
    });
    
    totalScore += studentScore * 0.2;
    
    // Factor 4: Funding Source (15% weight)
    let fundingScore = 0;
    if (application.fundingSource === "scholarship") fundingScore = 100;
    else if (application.fundingSource === "family") fundingScore = 80;
    else if (application.fundingSource === "employment") fundingScore = 90;
    else if (application.fundingSource === "savings") fundingScore = 70;
    else fundingScore = 60;
    
    factors.push({
      factor: "Funding Source Reliability",
      score: fundingScore,
      weight: 15,
    });
    
    totalScore += fundingScore * 0.15;
    
    // Factor 5: Time in Canada (10% weight)
    let timeScore = 0;
    if (application.yearsInCanada >= 2) timeScore = 100;
    else if (application.yearsInCanada >= 1) timeScore = 70;
    else if (application.yearsInCanada >= 0.5) timeScore = 50;
    else timeScore = 30;
    
    factors.push({
      factor: "Integration Period",
      score: timeScore,
      weight: 10,
    });
    
    totalScore += timeScore * 0.1;
    
    // Determine recommendation
    let recommendation: "approve" | "review" | "reject";
    if (totalScore >= 75) recommendation = "approve";
    else if (totalScore >= 60) recommendation = "review";
    else recommendation = "reject";
    
    return {
      score: Math.round(totalScore),
      factors,
      recommendation,
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export guarantor services
export const GuarantorService = {
  workflow: GuarantorWorkflowService,
  alternativeCredit: AlternativeCreditScoring,
};
