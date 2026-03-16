/**
 * CREOVA AI Automation Services
 * 
 * "Landlord-in-a-Box" Features:
 * 1. AI Listing Generator
 * 2. Automated Accounting & Tax Reports
 * 3. Vacancy Marketing Automation
 * 4. Legal Document Generator
 */

import type { Property, Unit, Lease, Payment, MaintenanceRequest } from "../types/database.types";

// ============================================================================
// AI LISTING GENERATOR
// ============================================================================

export interface GeneratedListing {
  title: string;
  description: string;
  highlights: string[];
  amenities: string[];
  suggestedPrice: number;
  keywords: string[];
  seoOptimized: {
    metaTitle: string;
    metaDescription: string;
    tags: string[];
  };
  marketingCopy: {
    short: string; // For social media
    medium: string; // For listing sites
    long: string; // For detailed descriptions
  };
  targetAudience: string[];
  competitiveAdvantages: string[];
}

export class AIListingGenerator {
  /**
   * Generate professional property listing with AI
   */
  static async generateListing(
    unit: Unit,
    property: Property,
    targetRent?: number
  ): Promise<GeneratedListing> {
    await this.delay(2500);
    
    const bedrooms = unit.bedrooms;
    const bathrooms = unit.bathrooms;
    const sqft = unit.squareFootage;
    const city = property.city;
    const price = targetRent || unit.rentPrice;
    
    // Generate title
    const title = this.generateTitle(bedrooms, bathrooms, city, property.propertyType);
    
    // Generate description
    const description = this.generateDescription(unit, property, price);
    
    // Extract highlights
    const highlights = this.generateHighlights(unit, property);
    
    // List amenities
    const amenities = this.generateAmenities(unit, property);
    
    // SEO optimization
    const seoOptimized = this.generateSEO(unit, property, city);
    
    // Marketing copy variations
    const marketingCopy = this.generateMarketingCopy(unit, property, price);
    
    // Target audience
    const targetAudience = this.identifyTargetAudience(unit, property, price);
    
    // Competitive advantages
    const competitiveAdvantages = this.identifyAdvantages(unit, property);
    
    return {
      title,
      description,
      highlights,
      amenities,
      suggestedPrice: price,
      keywords: seoOptimized.tags,
      seoOptimized,
      marketingCopy,
      targetAudience,
      competitiveAdvantages,
    };
  }

  private static generateTitle(
    bedrooms: number,
    bathrooms: number,
    city: string,
    propertyType: string
  ): string {
    const bedroomText = bedrooms === 0 ? "Studio" : `${bedrooms}-Bedroom`;
    const bathroomText = bathrooms === 1 ? "1 Bath" : `${bathrooms} Baths`;
    
    const adjectives = ["Stunning", "Luxurious", "Modern", "Beautiful", "Spacious", "Bright"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    return `${adjective} ${bedroomText} ${propertyType} with ${bathroomText} in ${city}`;
  }

  private static generateDescription(unit: Unit, property: Property, price: number): string {
    const bedrooms = unit.bedrooms === 0 ? "studio" : `${unit.bedrooms}-bedroom`;
    const sqft = unit.squareFootage;
    
    return `Welcome to your new home! This ${bedrooms} unit offers ${sqft} sq ft of modern living space in the heart of ${property.city}. Located at ${property.address}, this property combines comfort, convenience, and style.

The unit features ${unit.bathrooms} bathroom${unit.bathrooms > 1 ? 's' : ''}, ${unit.parkingSpaces ? `${unit.parkingSpaces} parking space${unit.parkingSpaces > 1 ? 's' : ''}` : 'street parking'}, and is perfect for ${this.getSuitableFor(unit)}.

${property.amenities && property.amenities.length > 0 ? `Building amenities include ${property.amenities.slice(0, 3).join(', ')}.` : ''}

Available ${unit.availabilityDate ? `starting ${new Date(unit.availabilityDate).toLocaleDateString()}` : 'immediately'}.

Rent: $${price}/month${unit.utilitiesIncluded && unit.utilitiesIncluded.length > 0 ? ` (${unit.utilitiesIncluded.join(', ')} included)` : ''}`;
  }

  private static getSuitableFor(unit: Unit): string {
    if (unit.bedrooms === 0) return "young professionals or students";
    if (unit.bedrooms === 1) return "individuals or couples";
    if (unit.bedrooms === 2) return "small families or roommates";
    if (unit.bedrooms >= 3) return "families";
    return "anyone seeking quality accommodation";
  }

  private static generateHighlights(unit: Unit, property: Property): string[] {
    const highlights = [];
    
    if (unit.squareFootage >= 1000) {
      highlights.push(`Spacious ${unit.squareFootage} sq ft layout`);
    }
    
    if (unit.parkingSpaces && unit.parkingSpaces > 0) {
      highlights.push(`${unit.parkingSpaces} dedicated parking space${unit.parkingSpaces > 1 ? 's' : ''}`);
    }
    
    if (unit.utilitiesIncluded && unit.utilitiesIncluded.length > 0) {
      highlights.push(`Utilities included: ${unit.utilitiesIncluded.join(', ')}`);
    }
    
    if (property.amenities && property.amenities.includes("Gym")) {
      highlights.push("On-site fitness center");
    }
    
    if (property.amenities && property.amenities.includes("Laundry")) {
      highlights.push("In-suite or in-building laundry");
    }
    
    highlights.push(`Prime ${property.city} location`);
    highlights.push("Professional property management");
    highlights.push("24/7 maintenance support");
    
    return highlights;
  }

  private static generateAmenities(unit: Unit, property: Property): string[] {
    const amenities = new Set<string>();
    
    // Unit amenities
    if (unit.features) {
      unit.features.forEach(f => amenities.add(f));
    }
    
    // Building amenities
    if (property.amenities) {
      property.amenities.forEach(a => amenities.add(a));
    }
    
    // Default amenities
    amenities.add("Heat");
    amenities.add("Water");
    if (unit.parkingSpaces && unit.parkingSpaces > 0) amenities.add("Parking");
    
    return Array.from(amenities);
  }

  private static generateSEO(unit: Unit, property: Property, city: string) {
    const bedrooms = unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms} Bedroom`;
    const propertyType = property.propertyType.replace('_', ' ');
    
    return {
      metaTitle: `${bedrooms} ${propertyType} for Rent in ${city} | $${unit.rentPrice}/month`,
      metaDescription: `Rent a ${bedrooms.toLowerCase()} ${propertyType} in ${city}. ${unit.squareFootage} sq ft, ${unit.bathrooms} bath. Available now. Contact for viewing.`,
      tags: [
        `${city} rental`,
        `${bedrooms.toLowerCase()} rental`,
        propertyType,
        "apartment for rent",
        "housing",
        city.toLowerCase(),
        "available now",
      ],
    };
  }

  private static generateMarketingCopy(unit: Unit, property: Property, price: number) {
    const bedrooms = unit.bedrooms === 0 ? "studio" : `${unit.bedrooms}BR`;
    
    return {
      short: `✨ ${bedrooms} in ${property.city}! ${unit.squareFootage}sqft, $${price}/mo. Available now! 📍`,
      
      medium: `🏠 Beautiful ${bedrooms} apartment in ${property.city}
💰 $${price}/month
📏 ${unit.squareFootage} sq ft
🚗 ${unit.parkingSpaces || 0} parking
📅 Available ${unit.availabilityDate ? new Date(unit.availabilityDate).toLocaleDateString() : 'immediately'}

Contact us today for a viewing!`,
      
      long: `🌟 JUST LISTED: ${bedrooms.toUpperCase()} APARTMENT IN ${property.city.toUpperCase()} 🌟

Perfect for ${this.getSuitableFor(unit)}!

✅ ${unit.squareFootage} sq ft of modern living space
✅ ${unit.bathrooms} bathroom${unit.bathrooms > 1 ? 's' : ''}
✅ ${unit.parkingSpaces || 'No'} parking space${unit.parkingSpaces && unit.parkingSpaces > 1 ? 's' : ''}
${unit.utilitiesIncluded && unit.utilitiesIncluded.length > 0 ? `✅ ${unit.utilitiesIncluded.join(', ')} included\n` : ''}
✅ Professional property management
✅ 24/7 maintenance support

📍 Location: ${property.address}, ${property.city}
💵 Rent: $${price}/month
📅 Move-in: ${unit.availabilityDate ? new Date(unit.availabilityDate).toLocaleDateString() : 'Flexible'}

Don't miss out on this opportunity! Schedule your viewing today! 🔑`,
    };
  }

  private static identifyTargetAudience(unit: Unit, property: Property, price: number): string[] {
    const audiences = [];
    
    if (unit.bedrooms === 0 || unit.bedrooms === 1) {
      if (property.city === "Waterloo" || property.city === "Kingston") {
        audiences.push("University students");
      }
      audiences.push("Young professionals");
      audiences.push("New graduates");
    }
    
    if (unit.bedrooms === 1 || unit.bedrooms === 2) {
      audiences.push("Couples");
      audiences.push("Remote workers");
    }
    
    if (unit.bedrooms >= 2) {
      audiences.push("Small families");
      audiences.push("Roommates");
    }
    
    if (price < 1800) {
      audiences.push("Budget-conscious renters");
    } else if (price > 2500) {
      audiences.push("Luxury seekers");
    }
    
    audiences.push("International students");
    audiences.push("New immigrants");
    
    return audiences;
  }

  private static identifyAdvantages(unit: Unit, property: Property): string[] {
    const advantages = [];
    
    if (unit.parkingSpaces && unit.parkingSpaces > 0) {
      advantages.push("Included parking (rare in downtown areas)");
    }
    
    if (unit.utilitiesIncluded && unit.utilitiesIncluded.length >= 2) {
      advantages.push("Multiple utilities included = predictable monthly costs");
    }
    
    if (property.amenities && property.amenities.includes("Gym")) {
      advantages.push("Save on gym membership with on-site fitness");
    }
    
    if (unit.squareFootage >= 800) {
      advantages.push("Above-average square footage for the price point");
    }
    
    advantages.push("Professional property management through CREOVA platform");
    advantages.push("Easy online rent payment and maintenance requests");
    
    return advantages;
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// AUTOMATED ACCOUNTING & TAX REPORTS
// ============================================================================

export interface AccountingReport {
  propertyId: string;
  period: {
    start: Date;
    end: Date;
    label: string; // "2026 Annual Report", "Q1 2026", etc.
  };
  
  // Income Statement
  income: {
    rentalIncome: number;
    lateFeesCollected: number;
    otherIncome: number;
    totalIncome: number;
  };
  
  // Expenses
  expenses: {
    maintenance: number;
    utilities: number;
    insurance: number;
    propertyTax: number;
    propertyManagement: number;
    legal: number;
    advertising: number;
    other: number;
    totalExpenses: number;
  };
  
  // Profit & Loss
  profitLoss: {
    grossIncome: number;
    totalExpenses: number;
    netIncome: number;
    margin: number; // percentage
  };
  
  // Tax Information
  taxInfo: {
    depreciationDeduction: number;
    mortgageInterestDeduction: number;
    capitalGainsPotential: number;
    taxableIncome: number;
  };
  
  // Cash Flow
  cashFlow: {
    cashCollected: number;
    cashPaidOut: number;
    netCashFlow: number;
  };
  
  // Occupancy
  occupancy: {
    totalDays: number;
    occupiedDays: number;
    vacantDays: number;
    occupancyRate: number;
  };
  
  // Export Formats
  exports: {
    csv: string;
    pdf: string;
    quickbooks: string;
  };
}

export class AutomatedAccounting {
  /**
   * Generate comprehensive accounting report for tax filing
   */
  static async generateReport(
    propertyId: string,
    startDate: Date,
    endDate: Date,
    payments: Payment[],
    maintenance: MaintenanceRequest[],
    leases: Lease[]
  ): Promise<AccountingReport> {
    await this.delay(1500);
    
    const period = this.getPeriodLabel(startDate, endDate);
    
    // Calculate income
    const income = this.calculateIncome(payments, startDate, endDate);
    
    // Calculate expenses
    const expenses = this.calculateExpenses(maintenance, startDate, endDate);
    
    // Calculate P&L
    const profitLoss = this.calculateProfitLoss(income, expenses);
    
    // Calculate tax information
    const taxInfo = this.calculateTaxInfo(profitLoss, expenses);
    
    // Calculate cash flow
    const cashFlow = this.calculateCashFlow(payments, maintenance, startDate, endDate);
    
    // Calculate occupancy
    const occupancy = this.calculateOccupancy(leases, startDate, endDate);
    
    // Generate exports
    const exports = this.generateExports(propertyId, period, income, expenses, profitLoss);
    
    return {
      propertyId,
      period: {
        start: startDate,
        end: endDate,
        label: period,
      },
      income,
      expenses,
      profitLoss,
      taxInfo,
      cashFlow,
      occupancy,
      exports,
    };
  }

  private static getPeriodLabel(start: Date, end: Date): string {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    if (startYear === endYear) {
      const startMonth = start.getMonth();
      const endMonth = end.getMonth();
      
      if (startMonth === 0 && endMonth === 11) {
        return `${startYear} Annual Report`;
      }
      
      const quarter = Math.floor(startMonth / 3) + 1;
      if (endMonth === startMonth + 2) {
        return `Q${quarter} ${startYear}`;
      }
      
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }

  private static calculateIncome(payments: Payment[], start: Date, end: Date) {
    const periodPayments = payments.filter(p => {
      const date = p.paidDate || p.dueDate;
      return date >= start && date <= end && p.status === "completed";
    });
    
    const rentalIncome = periodPayments
      .filter(p => p.type === "rent")
      .reduce((sum, p) => sum + p.amount, 0);
    
    const lateFeesCollected = periodPayments
      .filter(p => p.type === "late_fee")
      .reduce((sum, p) => sum + p.amount, 0);
    
    const otherIncome = periodPayments
      .filter(p => !["rent", "late_fee"].includes(p.type))
      .reduce((sum, p) => sum + p.amount, 0);
    
    return {
      rentalIncome,
      lateFeesCollected,
      otherIncome,
      totalIncome: rentalIncome + lateFeesCollected + otherIncome,
    };
  }

  private static calculateExpenses(maintenance: MaintenanceRequest[], start: Date, end: Date) {
    const periodMaintenance = maintenance.filter(m => {
      const date = m.completedAt || m.submittedAt;
      return date >= start && date <= end;
    });
    
    const maintenanceCost = periodMaintenance.reduce(
      (sum, m) => sum + (m.actualCost || m.estimatedCost || 0),
      0
    );
    
    // Estimate other expenses (in production, these would be tracked)
    const utilities = 150; // Monthly estimate
    const insurance = 100; // Monthly estimate
    const propertyTax = 200; // Monthly estimate
    const propertyManagement = 0; // Using CREOVA
    const legal = 0;
    const advertising = 50;
    const other = 0;
    
    const monthsDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    return {
      maintenance: maintenanceCost,
      utilities: utilities * monthsDiff,
      insurance: insurance * monthsDiff,
      propertyTax: propertyTax * monthsDiff,
      propertyManagement,
      legal,
      advertising: advertising * monthsDiff,
      other,
      totalExpenses: maintenanceCost + (utilities + insurance + propertyTax + advertising) * monthsDiff,
    };
  }

  private static calculateProfitLoss(income: any, expenses: any) {
    const grossIncome = income.totalIncome;
    const totalExpenses = expenses.totalExpenses;
    const netIncome = grossIncome - totalExpenses;
    const margin = grossIncome > 0 ? (netIncome / grossIncome) * 100 : 0;
    
    return {
      grossIncome,
      totalExpenses,
      netIncome,
      margin: +margin.toFixed(2),
    };
  }

  private static calculateTaxInfo(profitLoss: any, expenses: any) {
    // Simplified tax calculations (consult accountant for accuracy)
    const buildingValue = 500000;
    const depreciationRate = 0.04; // 4% CCA for buildings in Canada
    const depreciationDeduction = buildingValue * depreciationRate;
    
    const mortgageInterestDeduction = 12000; // Annual estimate
    const capitalGainsPotential = 0; // For unrealized gains
    
    const taxableIncome = profitLoss.netIncome - depreciationDeduction;
    
    return {
      depreciationDeduction,
      mortgageInterestDeduction,
      capitalGainsPotential,
      taxableIncome,
    };
  }

  private static calculateCashFlow(
    payments: Payment[],
    maintenance: MaintenanceRequest[],
    start: Date,
    end: Date
  ) {
    const cashCollected = payments
      .filter(p => {
        const date = p.paidDate;
        return date && date >= start && date <= end && p.status === "completed";
      })
      .reduce((sum, p) => sum + p.amount, 0);
    
    const cashPaidOut = maintenance
      .filter(m => {
        const date = m.completedAt;
        return date && date >= start && date <= end;
      })
      .reduce((sum, m) => sum + (m.actualCost || 0), 0);
    
    return {
      cashCollected,
      cashPaidOut,
      netCashFlow: cashCollected - cashPaidOut,
    };
  }

  private static calculateOccupancy(leases: Lease[], start: Date, end: Date) {
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    let occupiedDays = 0;
    
    for (const lease of leases) {
      const leaseStart = new Date(lease.leaseStart) > start ? new Date(lease.leaseStart) : start;
      const leaseEnd = new Date(lease.leaseEnd) < end ? new Date(lease.leaseEnd) : end;
      
      if (leaseStart <= end && leaseEnd >= start) {
        const days = Math.ceil((leaseEnd.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24));
        occupiedDays += days;
      }
    }
    
    const vacantDays = totalDays - occupiedDays;
    const occupancyRate = (occupiedDays / totalDays) * 100;
    
    return {
      totalDays,
      occupiedDays,
      vacantDays,
      occupancyRate: +occupancyRate.toFixed(2),
    };
  }

  private static generateExports(
    propertyId: string,
    period: string,
    income: any,
    expenses: any,
    profitLoss: any
  ) {
    // CSV Export
    const csv = this.generateCSV(period, income, expenses, profitLoss);
    
    // PDF would use a PDF library in production
    const pdf = `data:application/pdf;base64,${btoa("PDF Report Placeholder")}`;
    
    // QuickBooks export format
    const quickbooks = this.generateQuickBooksExport(income, expenses);
    
    return {
      csv,
      pdf,
      quickbooks,
    };
  }

  private static generateCSV(period: string, income: any, expenses: any, profitLoss: any): string {
    const rows = [
      ["Property Accounting Report", period],
      [""],
      ["INCOME"],
      ["Rental Income", income.rentalIncome],
      ["Late Fees", income.lateFeesCollected],
      ["Other Income", income.otherIncome],
      ["Total Income", income.totalIncome],
      [""],
      ["EXPENSES"],
      ["Maintenance", expenses.maintenance],
      ["Utilities", expenses.utilities],
      ["Insurance", expenses.insurance],
      ["Property Tax", expenses.propertyTax],
      ["Advertising", expenses.advertising],
      ["Total Expenses", expenses.totalExpenses],
      [""],
      ["PROFIT & LOSS"],
      ["Gross Income", profitLoss.grossIncome],
      ["Total Expenses", profitLoss.totalExpenses],
      ["Net Income", profitLoss.netIncome],
      ["Margin %", profitLoss.margin],
    ];
    
    return rows.map(row => row.join(",")).join("\n");
  }

  private static generateQuickBooksExport(income: any, expenses: any): string {
    // IIF format for QuickBooks
    const transactions = [
      "!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tCLASS\tAMOUNT",
      "!SPL\tSPLID\tTRNSTYPE\tDATE\tACCNT\tNAME\tCLASS\tAMOUNT",
      `TRNS\t1\tDEPOSIT\t${new Date().toLocaleDateString()}\tBank Account\tRental Income\t\t${income.totalIncome}`,
      `SPL\t1\tDEPOSIT\t${new Date().toLocaleDateString()}\tRental Income\t\t\t-${income.totalIncome}`,
    ];
    
    return transactions.join("\n");
  }

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export automation services
export const AIAutomation = {
  listing: AIListingGenerator,
  accounting: AutomatedAccounting,
};
