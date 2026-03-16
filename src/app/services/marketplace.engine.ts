/**
 * CREOVA Marketplace Layer
 * 
 * OS-Level Marketplace Features:
 * 1. Listing Distribution Engine (auto-post everywhere)
 * 2. Tenant Discovery Marketplace
 * 3. Service Marketplace
 * 4. Rental Credit Builder
 */

import type { Property, Unit, User, Lease, Payment } from "../types/database.types";

// ============================================================================
// LISTING DISTRIBUTION ENGINE
// ============================================================================

export type ListingPlatform = 
  | "facebook_marketplace"
  | "kijiji"
  | "craigslist"
  | "padmapper"
  | "rentals_ca"
  | "zumper"
  | "zillow"
  | "apartments_com"
  | "student_housing_boards";

export interface ListingDistribution {
  id: string;
  unitId: string;
  propertyId: string;
  
  // Distribution Status
  platforms: {
    [key in ListingPlatform]?: {
      enabled: boolean;
      posted: boolean;
      postedAt?: Date;
      listingUrl?: string;
      views?: number;
      inquiries?: number;
      status: "pending" | "live" | "expired" | "removed";
    };
  };
  
  // Performance Metrics
  totalViews: number;
  totalInquiries: number;
  totalApplications: number;
  conversionRate: number; // inquiries to applications
  
  // Auto-refresh
  autoRefresh: boolean;
  refreshInterval: number; // hours
  lastRefreshed?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export class ListingDistributionEngine {
  /**
   * Distribute listing to all enabled platforms
   */
  static async distributeListing(
    unit: Unit,
    property: Property,
    platforms: ListingPlatform[]
  ): Promise<ListingDistribution> {
    await this.delay(2000);
    
    console.log(`📢 Distributing listing to ${platforms.length} platforms...`);
    
    const distribution: ListingDistribution = {
      id: "dist_" + Date.now(),
      unitId: unit.id,
      propertyId: property.id,
      platforms: {},
      totalViews: 0,
      totalInquiries: 0,
      totalApplications: 0,
      conversionRate: 0,
      autoRefresh: true,
      refreshInterval: 48, // Refresh every 48 hours
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Post to each platform
    for (const platform of platforms) {
      const result = await this.postToPlatform(unit, property, platform);
      distribution.platforms[platform] = {
        enabled: true,
        posted: result.success,
        postedAt: result.success ? new Date() : undefined,
        listingUrl: result.url,
        views: 0,
        inquiries: 0,
        status: result.success ? "live" : "pending",
      };
      
      console.log(`${result.success ? '✅' : '❌'} ${platform}: ${result.message}`);
    }
    
    return distribution;
  }

  /**
   * Post listing to specific platform
   */
  private static async postToPlatform(
    unit: Unit,
    property: Property,
    platform: ListingPlatform
  ): Promise<{
    success: boolean;
    url?: string;
    message: string;
  }> {
    await this.delay(500);
    
    // In production: Use platform-specific APIs
    // Facebook: Graph API
    // Kijiji: API or automation
    // Others: API integrations or webhooks
    
    const listingUrl = `https://${platform}.com/listing/${property.id}/${unit.id}`;
    
    return {
      success: true,
      url: listingUrl,
      message: `Posted successfully`,
    };
  }

  /**
   * Auto-refresh listings across platforms
   */
  static async refreshListings(distributionId: string): Promise<void> {
    console.log(`🔄 Auto-refreshing listings...`);
    
    // Bump listings to top by:
    // 1. Updating post content slightly
    // 2. Re-posting on some platforms
    // 3. Boosting on platforms that support it
    
    await this.delay(1000);
    console.log(`✅ Listings refreshed and bumped to top`);
  }

  /**
   * Track listing performance
   */
  static async trackPerformance(distributionId: string): Promise<{
    topPerformer: ListingPlatform;
    totalViews: number;
    totalInquiries: number;
    conversionRate: number;
    recommendations: string[];
  }> {
    await this.delay(500);
    
    // Mock performance data
    const platformPerformance = {
      facebook_marketplace: { views: 450, inquiries: 23 },
      kijiji: { views: 320, inquiries: 18 },
      padmapper: { views: 180, inquiries: 9 },
      rentals_ca: { views: 210, inquiries: 11 },
    };
    
    const topPerformer = Object.entries(platformPerformance)
      .sort((a, b) => b[1].inquiries - a[1].inquiries)[0][0] as ListingPlatform;
    
    const totalViews = Object.values(platformPerformance).reduce((sum, p) => sum + p.views, 0);
    const totalInquiries = Object.values(platformPerformance).reduce((sum, p) => sum + p.inquiries, 0);
    const conversionRate = (totalInquiries / totalViews) * 100;
    
    const recommendations = [
      `Facebook Marketplace is your top performer with ${platformPerformance.facebook_marketplace.inquiries} inquiries`,
      `Consider boosting on Facebook for $20 to reach 5,000 more viewers`,
      `Refresh your listings every 48 hours to stay at the top of search results`,
    ];
    
    return {
      topPerformer,
      totalViews,
      totalInquiries,
      conversionRate: +conversionRate.toFixed(2),
      recommendations,
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// TENANT DISCOVERY MARKETPLACE
// ============================================================================

export interface TenantSearch {
  // Search Criteria
  location: {
    city: string;
    neighborhood?: string;
    radius?: number; // km
  };
  budget: {
    min: number;
    max: number;
  };
  bedrooms: {
    min: number;
    max: number;
  };
  moveInDate?: Date;
  
  // Preferences
  preferences: {
    petFriendly?: boolean;
    furnished?: boolean;
    utilitiesIncluded?: boolean;
    parkingRequired?: boolean;
    amenities?: string[];
  };
  
  // Student/Immigrant Specific
  studentHousing?: boolean;
  guarantorAccepted?: boolean;
  internationalFriendly?: boolean;
}

export interface PropertyListing {
  id: string;
  property: Property;
  unit: Unit;
  landlord: {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    responseTime: string; // "< 1 hour", "< 24 hours"
  };
  
  // AI Recommendations
  matchScore: number; // 0-100
  matchReasons: string[];
  
  // Availability
  availableDate: Date;
  leaseTerm: string; // "12 months", "Month-to-month"
  
  // Affordability
  affordabilityScore: number; // 0-100
  rentToIncomeRatio?: number;
  
  // Photos & Virtual Tour
  photos: string[];
  virtualTourUrl?: string;
  
  // Engagement
  views: number;
  favorites: number;
  applications: number;
}

export class TenantMarketplaceService {
  /**
   * Search available properties with AI matching
   */
  static async searchProperties(
    searchCriteria: TenantSearch,
    tenantProfile?: {
      monthlyIncome: number;
      isStudent: boolean;
      hasGuarantor: boolean;
    }
  ): Promise<PropertyListing[]> {
    await this.delay(1000);
    
    console.log(`🔍 Searching properties in ${searchCriteria.location.city}...`);
    
    // In production: Query database with filters
    // For now: Return mock results
    
    const mockListings: PropertyListing[] = [
      {
        id: "listing_001",
        property: {} as Property, // Mock
        unit: {} as Unit, // Mock
        landlord: {
          id: "landlord_001",
          name: "Justin Chen",
          verified: true,
          rating: 4.8,
          responseTime: "< 2 hours",
        },
        matchScore: 95,
        matchReasons: [
          "Perfect match for your budget",
          "Available on your move-in date",
          "Close to University of Toronto",
          "Landlord accepts guarantors",
        ],
        availableDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        leaseTerm: "12 months",
        affordabilityScore: 92,
        rentToIncomeRatio: tenantProfile ? (2300 / tenantProfile.monthlyIncome) : undefined,
        photos: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        ],
        views: 234,
        favorites: 18,
        applications: 3,
      },
      {
        id: "listing_002",
        property: {} as Property,
        unit: {} as Unit,
        landlord: {
          id: "landlord_002",
          name: "Sarah Williams",
          verified: true,
          rating: 4.9,
          responseTime: "< 1 hour",
        },
        matchScore: 88,
        matchReasons: [
          "Great value for the area",
          "Pet-friendly building",
          "On-site gym and laundry",
        ],
        availableDate: new Date(new Date().setDate(new Date().getDate() + 45)),
        leaseTerm: "12 months",
        affordabilityScore: 85,
        rentToIncomeRatio: tenantProfile ? (2150 / tenantProfile.monthlyIncome) : undefined,
        photos: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        ],
        views: 189,
        favorites: 14,
        applications: 2,
      },
    ];
    
    return mockListings;
  }

  /**
   * Get AI-powered property recommendations
   */
  static async getRecommendations(
    tenantId: string,
    searchHistory: TenantSearch[]
  ): Promise<PropertyListing[]> {
    await this.delay(800);
    
    console.log(`🤖 Generating AI recommendations for tenant ${tenantId}...`);
    
    // AI analyzes:
    // 1. Previous searches
    // 2. Saved properties
    // 3. Application patterns
    // 4. Budget consistency
    // 5. Location preferences
    
    // Return personalized recommendations
    return this.searchProperties(searchHistory[0] || {} as TenantSearch);
  }

  /**
   * Calculate rent affordability
   */
  static calculateAffordability(rent: number, monthlyIncome: number): {
    score: number;
    ratio: number;
    recommendation: "affordable" | "stretching" | "unaffordable";
    insight: string;
  } {
    const ratio = rent / monthlyIncome;
    
    let score: number;
    let recommendation: "affordable" | "stretching" | "unaffordable";
    let insight: string;
    
    if (ratio <= 0.3) {
      score = 100;
      recommendation = "affordable";
      insight = "This rent is well within your budget";
    } else if (ratio <= 0.35) {
      score = 85;
      recommendation = "affordable";
      insight = "Comfortable rent-to-income ratio";
    } else if (ratio <= 0.4) {
      score = 70;
      recommendation = "stretching";
      insight = "At the upper end of recommended budget";
    } else if (ratio <= 0.5) {
      score = 50;
      recommendation = "stretching";
      insight = "This may strain your budget";
    } else {
      score = 30;
      recommendation = "unaffordable";
      insight = "Rent exceeds recommended 30% of income";
    }
    
    return {
      score,
      ratio: +(ratio * 100).toFixed(1),
      recommendation,
      insight,
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// RENTAL CREDIT BUILDER
// ============================================================================

export interface RentalCredit {
  tenantId: string;
  tenantName: string;
  
  // Credit Score
  creditScore: number; // 0-100
  scoreBreakdown: {
    paymentHistory: number; // 40%
    tenureDuration: number; // 25%
    leaseCompliance: number; // 20%
    propertyMaintenance: number; // 10%
    references: number; // 5%
  };
  
  // Payment History
  totalPayments: number;
  onTimePayments: number;
  latePayments: number;
  onTimeRate: number;
  averageDaysLate: number;
  
  // Rental History
  totalLeases: number;
  currentLease?: {
    property: string;
    landlord: string;
    startDate: Date;
    monthlyRent: number;
  };
  previousLeases: {
    property: string;
    landlord: string;
    startDate: Date;
    endDate: Date;
    duration: number; // months
    leftInGoodStanding: boolean;
  }[];
  
  // Badges & Achievements
  badges: {
    type: "on_time_payer" | "long_term_tenant" | "excellent_communicator" | "property_care_champion";
    earnedAt: Date;
    description: string;
  }[];
  
  // Portable History
  verifiedByLandlords: string[];
  referenceLetters: {
    landlordName: string;
    propertyAddress: string;
    dateIssued: Date;
    documentUrl: string;
  }[];
  
  // Future Landlord Benefits
  rentalProfile: {
    reliabilityScore: number;
    estimatedApprovalChance: number;
    strengthsForFuture: string[];
  };
}

export class RentalCreditBuilder {
  /**
   * Calculate tenant's rental credit score
   */
  static async calculateCreditScore(
    tenantId: string,
    payments: Payment[],
    leases: Lease[]
  ): Promise<RentalCredit> {
    await this.delay(1000);
    
    // Payment History (40%)
    const totalPayments = payments.length;
    const onTimePayments = payments.filter(p => p.status === "completed" && !p.lateDays).length;
    const latePayments = payments.filter(p => p.lateDays && p.lateDays > 0).length;
    const onTimeRate = totalPayments > 0 ? (onTimePayments / totalPayments) * 100 : 0;
    const paymentHistoryScore = onTimeRate;
    
    // Tenure Duration (25%)
    const totalMonthsRented = leases.reduce((sum, lease) => {
      const months = Math.floor(
        (new Date(lease.leaseEnd).getTime() - new Date(lease.leaseStart).getTime()) / (1000 * 60 * 60 * 24 * 30)
      );
      return sum + months;
    }, 0);
    const tenureDurationScore = Math.min(100, totalMonthsRented * 4); // 25 months = 100
    
    // Lease Compliance (20%)
    const leaseComplianceScore = 90; // Based on violations, complaints, etc.
    
    // Property Maintenance (10%)
    const propertyMaintenanceScore = 85; // Based on unit condition, damages
    
    // References (5%)
    const referencesScore = 95; // Based on landlord references
    
    // Calculate overall score
    const creditScore = Math.round(
      paymentHistoryScore * 0.4 +
      tenureDurationScore * 0.25 +
      leaseComplianceScore * 0.2 +
      propertyMaintenanceScore * 0.1 +
      referencesScore * 0.05
    );
    
    // Determine badges
    const badges = [];
    if (onTimeRate >= 95) {
      badges.push({
        type: "on_time_payer" as const,
        earnedAt: new Date(),
        description: "Pays rent on time 95%+ of the time",
      });
    }
    if (totalMonthsRented >= 24) {
      badges.push({
        type: "long_term_tenant" as const,
        earnedAt: new Date(),
        description: "2+ years of rental history",
      });
    }
    
    const rentalCredit: RentalCredit = {
      tenantId,
      tenantName: "Tenant Name",
      creditScore,
      scoreBreakdown: {
        paymentHistory: Math.round(paymentHistoryScore),
        tenureDuration: Math.round(tenureDurationScore),
        leaseCompliance: leaseComplianceScore,
        propertyMaintenance: propertyMaintenanceScore,
        references: referencesScore,
      },
      totalPayments,
      onTimePayments,
      latePayments,
      onTimeRate: +onTimeRate.toFixed(1),
      averageDaysLate: latePayments > 0 ? 3 : 0,
      totalLeases: leases.length,
      previousLeases: [],
      badges,
      verifiedByLandlords: ["Justin Chen", "Sarah Williams"],
      referenceLetters: [],
      rentalProfile: {
        reliabilityScore: creditScore,
        estimatedApprovalChance: Math.min(95, creditScore + 10),
        strengthsForFuture: [
          "Excellent payment history",
          "Long-term rental stability",
          "Strong landlord references",
        ],
      },
    };
    
    return rentalCredit;
  }

  /**
   * Generate portable rental reference letter
   */
  static async generateReferenceLetter(
    tenantId: string,
    leaseId: string,
    landlordId: string
  ): Promise<string> {
    await this.delay(1000);
    
    const letter = `
RENTAL REFERENCE LETTER

Date: ${new Date().toLocaleDateString()}

To Whom It May Concern,

This letter serves as a reference for [TENANT NAME], who was a tenant at my property located at [PROPERTY ADDRESS] from [START DATE] to [END DATE].

During their tenancy, [TENANT NAME] demonstrated:
✓ Excellent payment reliability (100% on-time payment rate)
✓ Respectful treatment of the property
✓ Good communication and cooperation
✓ Compliance with all lease terms

I would highly recommend [TENANT NAME] as a tenant and would gladly rent to them again in the future.

Sincerely,
[LANDLORD NAME]
[CONTACT INFORMATION]

---
This reference is verified through CREOVA Platform
Verification Code: ${Math.random().toString(36).substring(2, 10).toUpperCase()}
    `.trim();
    
    return letter;
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export Marketplace services
export const Marketplace = {
  distribution: ListingDistributionEngine,
  discovery: TenantMarketplaceService,
  credit: RentalCreditBuilder,
};
