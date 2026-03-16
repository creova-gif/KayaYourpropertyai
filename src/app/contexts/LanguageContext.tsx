import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations
const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.properties": "Properties",
    "nav.applications": "Applications",
    "nav.tenants": "Tenants",
    "nav.finances": "Finances",
    "nav.payments": "Payments",
    "nav.rentCollection": "Rent Collection",
    "nav.financialDashboard": "Financial Dashboard",
    "nav.hstTracker": "HST/GST Tracker",
    "nav.invoices": "Invoices",
    "nav.operations": "Operations",
    "nav.maintenance": "Maintenance",
    "nav.documents": "Documents",
    "nav.ltbForms": "LTB Forms",
    "nav.leaseTemplates": "Lease Templates",
    "nav.notices": "Notices",
    "nav.insights": "Insights",
    "nav.rentalIntelligence": "Rental Intelligence",
    "nav.tenantPassport": "Tenant Passport",
    "nav.analytics": "Analytics",
    "nav.more": "More",
    "nav.messages": "Messages",
    "nav.admin": "Admin",
    "nav.settings": "Settings",

    // Common
    "common.search": "Search",
    "common.add": "Add",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.download": "Download",
    "common.upload": "Upload",
    "common.submit": "Submit",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Information",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No",
    
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.occupancyRate": "Occupancy Rate",
    "dashboard.monthlyRevenue": "Monthly Revenue",
    "dashboard.totalProperties": "Total Properties",
    "dashboard.pendingApplications": "Pending Applications",
    "dashboard.recentActivity": "Recent Activity",
    
    // Properties
    "properties.title": "Properties",
    "properties.addProperty": "Add Property",
    "properties.totalUnits": "Total Units",
    "properties.occupied": "Occupied",
    "properties.vacant": "Vacant",
    "properties.address": "Address",
    "properties.units": "Units",
    "properties.monthlyRent": "Monthly Rent",
    
    // Applications
    "applications.title": "Applications",
    "applications.pending": "Pending Review",
    "applications.approved": "Approved",
    "applications.rejected": "Rejected",
    "applications.viewDetails": "View Details",
    "applications.applicantName": "Applicant Name",
    "applications.property": "Property",
    "applications.submittedDate": "Submitted",
    
    // Tenants
    "tenants.title": "Tenants",
    "tenants.active": "Active",
    "tenants.total": "Total Tenants",
    "tenants.name": "Name",
    "tenants.unit": "Unit",
    "tenants.leaseEnd": "Lease End",
    "tenants.rentStatus": "Rent Status",
    
    // Rent Collection
    "rent.title": "Rent Collection",
    "rent.interac": "Interac e-Transfer",
    "rent.stripe": "Credit/Debit Card",
    "rent.pad": "Pre-Authorized Debit",
    "rent.expected": "Expected",
    "rent.collected": "Collected",
    "rent.pending": "Pending",
    "rent.late": "Late",
    
    // LTB Forms
    "ltb.title": "Ontario LTB Forms",
    "ltb.compliant": "RTA Compliant",
    "ltb.allForms": "All Forms",
    "ltb.evictionNotices": "Eviction Notices",
    "ltb.rentIncreases": "Rent Increases",
    "ltb.termination": "Termination",
    "ltb.generateForm": "Generate Form",
    "ltb.legalDeadline": "Legal Deadline",
    
    // Tax Tracker
    "tax.title": "HST/GST Tracker",
    "tax.totalExpenses": "Total Expenses",
    "tax.hstPaid": "HST/GST Paid",
    "tax.deductible": "Deductible Expenses",
    "tax.ytdTotal": "YTD Total",
    "tax.addExpense": "Add Expense",
    "tax.craCompliant": "CRA Compliant",
    
    // Lease Templates
    "lease.title": "Province Lease Templates",
    "lease.province": "Province",
    "lease.rentGuideline": "Rent Increase Guideline",
    "lease.noticeRequired": "Notice Required",
    "lease.generateLease": "Generate Lease",
    "lease.tenantName": "Tenant Name",
    "lease.monthlyRent": "Monthly Rent (CAD)",
    "lease.leaseStart": "Lease Start Date",
    "lease.leaseTerm": "Lease Term",
    
    // Settings
    "settings.language": "Language",
    "settings.english": "English",
    "settings.french": "Français",
    "settings.selectLanguage": "Select Language",
  },
  
  fr: {
    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.properties": "Propriétés",
    "nav.applications": "Candidatures",
    "nav.tenants": "Locataires",
    "nav.finances": "Finances",
    "nav.payments": "Paiements",
    "nav.rentCollection": "Perception des loyers",
    "nav.financialDashboard": "Tableau financier",
    "nav.hstTracker": "Suivi TPS/TVQ",
    "nav.invoices": "Factures",
    "nav.operations": "Opérations",
    "nav.maintenance": "Entretien",
    "nav.documents": "Documents",
    "nav.ltbForms": "Formulaires TAL",
    "nav.leaseTemplates": "Modèles de bail",
    "nav.notices": "Avis",
    "nav.insights": "Analyses",
    "nav.rentalIntelligence": "Intelligence locative",
    "nav.tenantPassport": "Passeport locataire",
    "nav.analytics": "Analytique",
    "nav.more": "Plus",
    "nav.messages": "Messages",
    "nav.admin": "Administration",
    "nav.settings": "Paramètres",

    // Common
    "common.search": "Rechercher",
    "common.add": "Ajouter",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.close": "Fermer",
    "common.download": "Télécharger",
    "common.upload": "Téléverser",
    "common.submit": "Soumettre",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.warning": "Avertissement",
    "common.info": "Information",
    "common.confirm": "Confirmer",
    "common.yes": "Oui",
    "common.no": "Non",
    
    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.welcome": "Bon retour",
    "dashboard.occupancyRate": "Taux d'occupation",
    "dashboard.monthlyRevenue": "Revenus mensuels",
    "dashboard.totalProperties": "Total des propriétés",
    "dashboard.pendingApplications": "Candidatures en attente",
    "dashboard.recentActivity": "Activité récente",
    
    // Properties
    "properties.title": "Propriétés",
    "properties.addProperty": "Ajouter une propriété",
    "properties.totalUnits": "Total des unités",
    "properties.occupied": "Occupées",
    "properties.vacant": "Vacantes",
    "properties.address": "Adresse",
    "properties.units": "Unités",
    "properties.monthlyRent": "Loyer mensuel",
    
    // Applications
    "applications.title": "Candidatures",
    "applications.pending": "En attente d'examen",
    "applications.approved": "Approuvées",
    "applications.rejected": "Refusées",
    "applications.viewDetails": "Voir les détails",
    "applications.applicantName": "Nom du candidat",
    "applications.property": "Propriété",
    "applications.submittedDate": "Date de soumission",
    
    // Tenants
    "tenants.title": "Locataires",
    "tenants.active": "Actifs",
    "tenants.total": "Total des locataires",
    "tenants.name": "Nom",
    "tenants.unit": "Unité",
    "tenants.leaseEnd": "Fin du bail",
    "tenants.rentStatus": "Statut du loyer",
    
    // Rent Collection
    "rent.title": "Perception des loyers",
    "rent.interac": "Virement Interac",
    "rent.stripe": "Carte de crédit/débit",
    "rent.pad": "Prélèvement préautorisé",
    "rent.expected": "Attendu",
    "rent.collected": "Perçu",
    "rent.pending": "En attente",
    "rent.late": "En retard",
    
    // LTB Forms (Quebec = TAL)
    "ltb.title": "Formulaires TAL Québec",
    "ltb.compliant": "Conforme à la loi",
    "ltb.allForms": "Tous les formulaires",
    "ltb.evictionNotices": "Avis d'éviction",
    "ltb.rentIncreases": "Augmentations de loyer",
    "ltb.termination": "Résiliation",
    "ltb.generateForm": "Générer le formulaire",
    "ltb.legalDeadline": "Délai légal",
    
    // Tax Tracker
    "tax.title": "Suivi TPS/TVQ",
    "tax.totalExpenses": "Total des dépenses",
    "tax.hstPaid": "TPS/TVQ payée",
    "tax.deductible": "Dépenses déductibles",
    "tax.ytdTotal": "Total annuel",
    "tax.addExpense": "Ajouter une dépense",
    "tax.craCompliant": "Conforme à l'ARC",
    
    // Lease Templates
    "lease.title": "Modèles de bail provinciaux",
    "lease.province": "Province",
    "lease.rentGuideline": "Directive d'augmentation",
    "lease.noticeRequired": "Préavis requis",
    "lease.generateLease": "Générer le bail",
    "lease.tenantName": "Nom du locataire",
    "lease.monthlyRent": "Loyer mensuel (CAD)",
    "lease.leaseStart": "Date de début du bail",
    "lease.leaseTerm": "Durée du bail",
    
    // Settings
    "settings.language": "Langue",
    "settings.english": "English",
    "settings.french": "Français",
    "settings.selectLanguage": "Sélectionner la langue",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
