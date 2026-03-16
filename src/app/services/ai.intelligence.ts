/**
 * CREOVA AI Intelligence Engine
 * 
 * Market Differentiators:
 * 1. AI Rent Intelligence (Market comparison, pricing optimization)
 * 2. Vacancy Prediction AI (Churn risk, timing forecasting)
 * 3. Tenant Retention Analytics
 * 4. Revenue Optimization
 */

import type { Property, Unit, Lease, Payment, Application } from "../types/database.types";

// ============================================================================
// AI RENT INTELLIGENCE ENGINE
// ============================================================================

export interface RentIntelligence {
  currentRent: number;
  marketAverage: number;
  marketMedian: number;
  percentile: number; // Where you rank vs market
  suggestedRent: number;
  increaseOpportunity: number;
  confidence: number; // 0-100
  
  // Market Analysis
  marketData: {
    lowEnd: number;
    highEnd: number;
    luxuryPremium: number;
  };
  
  // Comparable Properties
  comparables: {
    address: string;
    rent: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    distance: number; // km
    amenities: string[];
  }[];
  
  // Trend Analysis
  trends: {
    period: string;
    averageRent: number;
    changePercent: number;
  }[];
  
  // Recommendations
  recommendations: {
    action: "increase" | "maintain" | "decrease";
    amount: number;
    timing: string;
    reasoning: string[];
    expectedImpact: string;
  };
}

export class AIRentIntelligence {
  /**
   * Analyze market rent and provide pricing recommendations
   */
  static async analyzeRent(unit: Unit, property: Property): Promise<RentIntelligence> {
    // Simulate AI analysis - in production, this would call real market data APIs
    await this.delay(2000);
    
    const currentRent = unit.rentPrice;
    
    // Simulate market analysis based on location and property type
    const marketMultiplier = this.getMarketMultiplier(property.city, property.province);
    const bedroomMultiplier = this.getBedroomMultiplier(unit.bedrooms);
    
    const marketAverage = Math.round(1500 * marketMultiplier * bedroomMultiplier);
    const marketMedian = Math.round(marketAverage * 0.95);
    
    // Calculate where current rent sits in the market
    const percentile = Math.round((currentRent / marketAverage) * 100);
    
    // AI-suggested optimal rent
    const suggestedRent = Math.round(marketAverage * 1.08); // Slight premium for quality
    const increaseOpportunity = suggestedRent - currentRent;
    
    // Analyze trends
    const trends = this.generateTrends(marketAverage);
    
    // Generate comparables
    const comparables = this.generateComparables(unit, property);
    
    // Determine recommendation
    const recommendations = this.generateRecommendation(
      currentRent,
      marketAverage,
      suggestedRent,
      property
    );
    
    return {
      currentRent,
      marketAverage,
      marketMedian,
      percentile,
      suggestedRent,
      increaseOpportunity,
      confidence: 87,
      marketData: {
        lowEnd: Math.round(marketAverage * 0.75),
        highEnd: Math.round(marketAverage * 1.35),
        luxuryPremium: Math.round(marketAverage * 1.5),
      },
      comparables,
      trends,
      recommendations,
    };
  }

  private static getMarketMultiplier(city: string, province: string): number {
    const marketMultipliers: Record<string, number> = {
      "Toronto": 2.1,
      "Vancouver": 2.3,
      "Montreal": 1.4,
      "Ottawa": 1.6,
      "Calgary": 1.5,
      "Edmonton": 1.3,
      "Waterloo": 1.5,
      "Hamilton": 1.4,
      "London": 1.2,
    };
    
    return marketMultipliers[city] || 1.0;
  }

  private static getBedroomMultiplier(bedrooms: number): number {
    const multipliers: Record<number, number> = {
      0: 0.7,  // Studio
      1: 1.0,  // 1BR
      2: 1.4,  // 2BR
      3: 1.8,  // 3BR
      4: 2.2,  // 4BR
    };
    
    return multipliers[bedrooms] || 1.0;
  }

  private static generateTrends(baseRent: number) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map((month, index) => {
      // Simulate seasonal trends
      const seasonalFactor = index >= 4 && index <= 8 ? 1.05 : 0.98; // Higher in summer
      const growthFactor = 1 + (index * 0.003); // 0.3% monthly growth
      
      return {
        period: month,
        averageRent: Math.round(baseRent * seasonalFactor * growthFactor),
        changePercent: +(((seasonalFactor * growthFactor - 1) * 100).toFixed(1)),
      };
    });
  }

  private static generateComparables(unit: Unit, property: Property) {
    const comparable1 = {
      address: "Similar property 0.3 km away",
      rent: unit.rentPrice + 150,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      sqft: unit.squareFootage + 50,
      distance: 0.3,
      amenities: ["Gym", "Parking", "Laundry"],
    };
    
    const comparable2 = {
      address: "Nearby building 0.5 km away",
      rent: unit.rentPrice + 200,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      sqft: unit.squareFootage,
      distance: 0.5,
      amenities: ["Gym", "Pool", "Concierge"],
    };
    
    const comparable3 = {
      address: "Neighbourhood property 0.8 km away",
      rent: unit.rentPrice - 100,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms - 0.5,
      sqft: unit.squareFootage - 100,
      distance: 0.8,
      amenities: ["Parking"],
    };
    
    return [comparable1, comparable2, comparable3];
  }

  private static generateRecommendation(
    currentRent: number,
    marketAverage: number,
    suggestedRent: number,
    property: Property
  ) {
    const gap = suggestedRent - currentRent;
    const percentGap = (gap / currentRent) * 100;
    
    if (gap > 100 && percentGap > 5) {
      return {
        action: "increase" as const,
        amount: gap,
        timing: "Next lease renewal (or with 90 days notice for current tenants)",
        reasoning: [
          `Currently priced ${percentGap.toFixed(1)}% below market average`,
          `Comparable properties charging $${gap} more`,
          `Strong rental demand in ${property.city}`,
          `Unit features justify premium pricing`,
        ],
        expectedImpact: `+$${gap * 12}/year (+${percentGap.toFixed(1)}% annual revenue)`,
      };
    } else if (gap > 0) {
      return {
        action: "maintain" as const,
        amount: 0,
        timing: "Current pricing is competitive",
        reasoning: [
          "Rent is within 5% of market average",
          "Maintaining competitive pricing aids tenant retention",
          "Consider increase at next renewal",
        ],
        expectedImpact: "Stable occupancy with current pricing",
      };
    } else {
      return {
        action: "maintain" as const,
        amount: 0,
        timing: "Premium pricing strategy",
        reasoning: [
          "Rent is above market average",
          "Premium pricing justified by property quality",
          "Monitor vacancy rates closely",
        ],
        expectedImpact: "Higher per-unit revenue, potential longer vacancy periods",
      };
    }
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// VACANCY PREDICTION AI
// ============================================================================

export interface VacancyPrediction {
  unitId: string;
  unitNumber: string;
  
  // Current Status
  currentTenant: string;
  leaseEndDate: Date;
  daysUntilExpiry: number;
  
  // Risk Scoring
  vacancyRisk: number; // 0-100
  riskLevel: "low" | "medium" | "high" | "critical";
  churnProbability: number; // 0-100
  
  // Predictive Factors
  factors: {
    factor: string;
    impact: "positive" | "negative" | "neutral";
    weight: number;
    description: string;
  }[];
  
  // Recommendations
  recommendations: {
    action: string;
    priority: "low" | "medium" | "high" | "urgent";
    description: string;
    timing: string;
  }[];
  
  // Financial Impact
  financialImpact: {
    expectedVacancyDays: number;
    estimatedLostRevenue: number;
    turnaroundCost: number;
    totalCost: number;
  };
}

export class AIVacancyPredictor {
  /**
   * Predict vacancy risk and tenant churn probability
   */
  static async predictVacancy(
    unit: Unit,
    lease: Lease,
    tenant: { id: string; name: string },
    paymentHistory: Payment[]
  ): Promise<VacancyPrediction> {
    await this.delay(1500);
    
    const today = new Date();
    const leaseEnd = new Date(lease.leaseEnd);
    const daysUntilExpiry = Math.floor((leaseEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate risk factors
    const factors = this.analyzeRiskFactors(lease, paymentHistory, daysUntilExpiry);
    
    // Calculate overall vacancy risk
    const vacancyRisk = this.calculateVacancyRisk(factors);
    const riskLevel = this.getRiskLevel(vacancyRisk);
    
    // Calculate churn probability
    const churnProbability = this.calculateChurnProbability(factors, daysUntilExpiry);
    
    // Generate recommendations
    const recommendations = this.generateVacancyRecommendations(
      vacancyRisk,
      daysUntilExpiry,
      churnProbability
    );
    
    // Calculate financial impact
    const financialImpact = this.calculateFinancialImpact(
      unit.rentPrice,
      vacancyRisk,
      churnProbability
    );
    
    return {
      unitId: unit.id,
      unitNumber: unit.unitNumber,
      currentTenant: tenant.name,
      leaseEndDate: leaseEnd,
      daysUntilExpiry,
      vacancyRisk,
      riskLevel,
      churnProbability,
      factors,
      recommendations,
      financialImpact,
    };
  }

  private static analyzeRiskFactors(
    lease: Lease,
    paymentHistory: Payment[],
    daysUntilExpiry: number
  ) {
    const factors = [];
    
    // Factor 1: Lease expiry timeline
    if (daysUntilExpiry <= 30) {
      factors.push({
        factor: "Lease Expiry Imminent",
        impact: "negative" as const,
        weight: 30,
        description: "Lease expires in less than 30 days",
      });
    } else if (daysUntilExpiry <= 60) {
      factors.push({
        factor: "Lease Expiring Soon",
        impact: "negative" as const,
        weight: 20,
        description: "Lease expires within 60 days",
      });
    } else if (daysUntilExpiry <= 90) {
      factors.push({
        factor: "Renewal Window Opening",
        impact: "neutral" as const,
        weight: 10,
        description: "Approaching optimal renewal period",
      });
    }
    
    // Factor 2: Payment behavior
    const latePayments = paymentHistory.filter(p => p.status === "overdue").length;
    const onTimeRate = ((paymentHistory.length - latePayments) / paymentHistory.length) * 100;
    
    if (onTimeRate >= 95) {
      factors.push({
        factor: "Excellent Payment History",
        impact: "positive" as const,
        weight: -15,
        description: `${onTimeRate.toFixed(0)}% on-time payment rate`,
      });
    } else if (onTimeRate < 80) {
      factors.push({
        factor: "Poor Payment History",
        impact: "negative" as const,
        weight: 25,
        description: `${latePayments} late payments`,
      });
    }
    
    // Factor 3: Lease duration
    const leaseMonths = Math.floor(
      (new Date(lease.leaseEnd).getTime() - new Date(lease.leaseStart).getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    
    if (leaseMonths >= 12) {
      factors.push({
        factor: "Long-term Tenancy",
        impact: "positive" as const,
        weight: -10,
        description: "12+ month lease indicates stability",
      });
    }
    
    // Factor 4: Market conditions
    factors.push({
      factor: "Strong Rental Demand",
      impact: "positive" as const,
      weight: -5,
      description: "High demand reduces vacancy risk",
    });
    
    // Factor 5: Seasonal timing
    const expiryMonth = new Date(lease.leaseEnd).getMonth();
    if (expiryMonth >= 4 && expiryMonth <= 8) {
      // Summer months - easier to re-rent
      factors.push({
        factor: "Favorable Seasonal Timing",
        impact: "positive" as const,
        weight: -8,
        description: "Summer expiry aids re-rental",
      });
    } else if (expiryMonth === 11 || expiryMonth === 0 || expiryMonth === 1) {
      // Winter - harder to re-rent
      factors.push({
        factor: "Challenging Seasonal Timing",
        impact: "negative" as const,
        weight: 12,
        description: "Winter expiry may slow re-rental",
      });
    }
    
    return factors;
  }

  private static calculateVacancyRisk(factors: any[]): number {
    const baseRisk = 35; // Base vacancy risk
    const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
    
    const risk = Math.max(0, Math.min(100, baseRisk + totalWeight));
    return Math.round(risk);
  }

  private static getRiskLevel(risk: number): "low" | "medium" | "high" | "critical" {
    if (risk >= 75) return "critical";
    if (risk >= 60) return "high";
    if (risk >= 40) return "medium";
    return "low";
  }

  private static calculateChurnProbability(factors: any[], daysUntilExpiry: number): number {
    const baseChurn = 45;
    const timeMultiplier = daysUntilExpiry < 30 ? 1.5 : daysUntilExpiry < 60 ? 1.2 : 1.0;
    const factorImpact = factors.reduce((sum, f) => sum + f.weight, 0);
    
    const churn = Math.max(0, Math.min(100, (baseChurn + factorImpact) * timeMultiplier));
    return Math.round(churn);
  }

  private static generateVacancyRecommendations(
    risk: number,
    daysUntilExpiry: number,
    churnProb: number
  ) {
    const recommendations = [];
    
    if (daysUntilExpiry <= 90) {
      recommendations.push({
        action: "Initiate Renewal Conversation",
        priority: daysUntilExpiry <= 30 ? ("urgent" as const) : ("high" as const),
        description: "Contact tenant to discuss lease renewal options",
        timing: "Immediately",
      });
    }
    
    if (risk >= 60) {
      recommendations.push({
        action: "Begin Pre-Marketing",
        priority: "high" as const,
        description: "Start preparing listing and photos in case of vacancy",
        timing: `${daysUntilExpiry - 30} days before expiry`,
      });
    }
    
    if (churnProb >= 50) {
      recommendations.push({
        action: "Offer Renewal Incentive",
        priority: "medium" as const,
        description: "Consider offering renewal bonus or minor upgrade to retain tenant",
        timing: "During renewal discussion",
      });
    }
    
    recommendations.push({
      action: "Schedule Unit Inspection",
      priority: "medium" as const,
      description: "Assess any needed repairs or upgrades before turnover",
      timing: `${Math.max(30, daysUntilExpiry - 30)} days before expiry`,
    });
    
    return recommendations;
  }

  private static calculateFinancialImpact(
    monthlyRent: number,
    vacancyRisk: number,
    churnProb: number
  ) {
    // Estimate vacancy days based on risk
    const baseVacancyDays = 15; // Average vacancy
    const riskMultiplier = 1 + (vacancyRisk / 100);
    const expectedVacancyDays = Math.round(baseVacancyDays * riskMultiplier);
    
    // Calculate lost revenue
    const dailyRent = monthlyRent / 30;
    const estimatedLostRevenue = Math.round(dailyRent * expectedVacancyDays);
    
    // Turnaround costs
    const turnaroundCost = 800; // Cleaning, minor repairs, admin
    
    // Total cost
    const totalCost = estimatedLostRevenue + turnaroundCost;
    
    return {
      expectedVacancyDays,
      estimatedLostRevenue,
      turnaroundCost,
      totalCost,
    };
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// TENANT RETENTION ANALYTICS
// ============================================================================

export interface TenantRetentionScore {
  tenantId: string;
  tenantName: string;
  retentionScore: number; // 0-100
  satisfactionLevel: "very_low" | "low" | "medium" | "high" | "very_high";
  
  // Behavior Metrics
  metrics: {
    paymentReliability: number;
    maintenanceRequestFrequency: number;
    communicationQuality: number;
    leaseComplianceScore: number;
    tenureDuration: number; // months
  };
  
  // Risk Indicators
  riskIndicators: string[];
  
  // Retention Strategies
  strategies: {
    strategy: string;
    impact: "high" | "medium" | "low";
    cost: number;
    description: string;
  }[];
}

export class AITenantRetention {
  static async analyzeRetention(
    tenant: { id: string; name: string },
    lease: Lease,
    payments: Payment[],
    maintenanceRequests: any[]
  ): Promise<TenantRetentionScore> {
    await this.delay(1000);
    
    // Calculate behavior metrics
    const paymentReliability = this.calculatePaymentReliability(payments);
    const maintenanceFrequency = maintenanceRequests.length;
    const tenureMonths = this.calculateTenure(lease);
    
    // Calculate retention score
    const retentionScore = this.calculateRetentionScore(
      paymentReliability,
      maintenanceFrequency,
      tenureMonths
    );
    
    const satisfactionLevel = this.getSatisfactionLevel(retentionScore);
    
    // Identify risk indicators
    const riskIndicators = this.identifyRiskIndicators(
      paymentReliability,
      maintenanceFrequency,
      maintenanceRequests
    );
    
    // Generate retention strategies
    const strategies = this.generateRetentionStrategies(retentionScore, riskIndicators);
    
    return {
      tenantId: tenant.id,
      tenantName: tenant.name,
      retentionScore,
      satisfactionLevel,
      metrics: {
        paymentReliability,
        maintenanceRequestFrequency: maintenanceFrequency,
        communicationQuality: 85,
        leaseComplianceScore: 92,
        tenureDuration: tenureMonths,
      },
      riskIndicators,
      strategies,
    };
  }

  private static calculatePaymentReliability(payments: Payment[]): number {
    const onTime = payments.filter(p => p.status === "completed").length;
    return Math.round((onTime / payments.length) * 100);
  }

  private static calculateTenure(lease: Lease): number {
    const start = new Date(lease.leaseStart);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  }

  private static calculateRetentionScore(
    paymentReliability: number,
    maintenanceFrequency: number,
    tenureMonths: number
  ): number {
    let score = 50; // Base score
    
    // Payment reliability (40% weight)
    score += (paymentReliability - 80) * 0.4;
    
    // Tenure bonus (30% weight)
    if (tenureMonths >= 24) score += 15;
    else if (tenureMonths >= 12) score += 10;
    else if (tenureMonths >= 6) score += 5;
    
    // Maintenance frequency (10% weight)
    if (maintenanceFrequency <= 2) score += 10;
    else if (maintenanceFrequency >= 8) score -= 10;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private static getSatisfactionLevel(score: number) {
    if (score >= 85) return "very_high" as const;
    if (score >= 70) return "high" as const;
    if (score >= 50) return "medium" as const;
    if (score >= 30) return "low" as const;
    return "very_low" as const;
  }

  private static identifyRiskIndicators(
    paymentReliability: number,
    maintenanceFrequency: number,
    maintenanceRequests: any[]
  ): string[] {
    const risks = [];
    
    if (paymentReliability < 90) {
      risks.push("Payment delays observed");
    }
    
    if (maintenanceFrequency > 6) {
      risks.push("High maintenance request volume");
    }
    
    const recentRequests = maintenanceRequests.filter(r => 
      new Date(r.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    
    if (recentRequests.length > 3) {
      risks.push("Multiple recent maintenance requests");
    }
    
    return risks;
  }

  private static generateRetentionStrategies(score: number, risks: string[]) {
    const strategies = [];
    
    if (score >= 80) {
      strategies.push({
        strategy: "Offer Loyalty Discount",
        impact: "high" as const,
        cost: 100,
        description: "Offer $100 rent discount for 12-month renewal to secure long-term tenant",
      });
    }
    
    if (risks.includes("Payment delays observed")) {
      strategies.push({
        strategy: "Set Up Pre-Authorized Payments",
        impact: "medium" as const,
        cost: 0,
        description: "Offer automated payment setup to improve on-time rate",
      });
    }
    
    if (risks.includes("High maintenance request volume")) {
      strategies.push({
        strategy: "Proactive Maintenance Review",
        impact: "high" as const,
        cost: 500,
        description: "Conduct unit inspection and address recurring issues",
      });
    }
    
    strategies.push({
      strategy: "Send Appreciation Message",
      impact: "low" as const,
      cost: 0,
      description: "Personalized thank-you message for being a great tenant",
    });
    
    return strategies;
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export AI Intelligence services
export const AIIntelligence = {
  rent: AIRentIntelligence,
  vacancy: AIVacancyPredictor,
  retention: AITenantRetention,
};
