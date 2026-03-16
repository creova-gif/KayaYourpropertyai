/**
 * CREOVA Internationalization System
 * 
 * Market Differentiator: Multi-language support for immigrant & student markets
 * Languages: English, French, Mandarin, Hindi, Arabic, Spanish
 */

export type SupportedLanguage = "en" | "fr" | "zh" | "hi" | "ar" | "es";

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl: boolean; // Right-to-left
  flag: string;
}

// ============================================================================
// LANGUAGE CONFIGURATION
// ============================================================================

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    rtl: false,
    flag: "🇨🇦",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    rtl: false,
    flag: "🇫🇷",
  },
  zh: {
    code: "zh",
    name: "Chinese (Mandarin)",
    nativeName: "中文",
    rtl: false,
    flag: "🇨🇳",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    rtl: false,
    flag: "🇮🇳",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    rtl: true,
    flag: "🇸🇦",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    rtl: false,
    flag: "🇪🇸",
  },
};

// ============================================================================
// TRANSLATION DICTIONARIES
// ============================================================================

export type TranslationKey = keyof typeof TRANSLATIONS.en;

export const TRANSLATIONS = {
  // English
  en: {
    // Common
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    search: "Search",
    filter: "Filter",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    // Navigation
    dashboard: "Dashboard",
    properties: "Properties",
    applications: "Applications",
    leases: "Leases",
    payments: "Payments",
    maintenance: "Maintenance",
    messages: "Messages",
    settings: "Settings",
    
    // Property Management
    addProperty: "Add Property",
    propertyDetails: "Property Details",
    unitNumber: "Unit Number",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    rent: "Rent",
    available: "Available",
    occupied: "Occupied",
    
    // Tenant Application
    applyNow: "Apply Now",
    applicationSubmitted: "Application Submitted",
    monthlyIncome: "Monthly Income",
    employer: "Employer",
    references: "References",
    uploadDocuments: "Upload Documents",
    
    // Lease
    signLease: "Sign Lease",
    leaseAgreement: "Lease Agreement",
    leaseStart: "Lease Start",
    leaseEnd: "Lease End",
    securityDeposit: "Security Deposit",
    
    // Payments
    payRent: "Pay Rent",
    paymentHistory: "Payment History",
    nextPayment: "Next Payment",
    amountDue: "Amount Due",
    
    // Maintenance
    submitRequest: "Submit Request",
    maintenanceRequest: "Maintenance Request",
    urgency: "Urgency",
    description: "Description",
    
    // Messages
    newMessage: "New Message",
    sendMessage: "Send Message",
    
    // International Student Features
    internationalStudent: "International Student",
    guarantorRequired: "Guarantor Required",
    parentGuarantor: "Parent/Guardian Guarantor",
    schoolEnrollment: "School Enrollment",
    studyPermit: "Study Permit",
    proofOfFunds: "Proof of Funds",
  },
  
  // French
  fr: {
    welcome: "Bienvenue",
    login: "Connexion",
    signup: "S'inscrire",
    logout: "Déconnexion",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    search: "Rechercher",
    filter: "Filtrer",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    
    dashboard: "Tableau de bord",
    properties: "Propriétés",
    applications: "Candidatures",
    leases: "Baux",
    payments: "Paiements",
    maintenance: "Entretien",
    messages: "Messages",
    settings: "Paramètres",
    
    addProperty: "Ajouter une propriété",
    propertyDetails: "Détails de la propriété",
    unitNumber: "Numéro d'unité",
    bedrooms: "Chambres",
    bathrooms: "Salles de bain",
    rent: "Loyer",
    available: "Disponible",
    occupied: "Occupé",
    
    applyNow: "Postuler maintenant",
    applicationSubmitted: "Candidature soumise",
    monthlyIncome: "Revenu mensuel",
    employer: "Employeur",
    references: "Références",
    uploadDocuments: "Télécharger des documents",
    
    signLease: "Signer le bail",
    leaseAgreement: "Contrat de location",
    leaseStart: "Début du bail",
    leaseEnd: "Fin du bail",
    securityDeposit: "Dépôt de garantie",
    
    payRent: "Payer le loyer",
    paymentHistory: "Historique des paiements",
    nextPayment: "Prochain paiement",
    amountDue: "Montant dû",
    
    submitRequest: "Soumettre une demande",
    maintenanceRequest: "Demande d'entretien",
    urgency: "Urgence",
    description: "Description",
    
    newMessage: "Nouveau message",
    sendMessage: "Envoyer un message",
    
    internationalStudent: "Étudiant international",
    guarantorRequired: "Garant requis",
    parentGuarantor: "Garant parent/tuteur",
    schoolEnrollment: "Inscription scolaire",
    studyPermit: "Permis d'études",
    proofOfFunds: "Preuve de fonds",
  },
  
  // Mandarin Chinese
  zh: {
    welcome: "欢迎",
    login: "登录",
    signup: "注册",
    logout: "登出",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    search: "搜索",
    filter: "筛选",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    
    dashboard: "仪表板",
    properties: "房产",
    applications: "申请",
    leases: "租约",
    payments: "付款",
    maintenance: "维护",
    messages: "消息",
    settings: "设置",
    
    addProperty: "添加房产",
    propertyDetails: "房产详情",
    unitNumber: "单元号",
    bedrooms: "卧室",
    bathrooms: "浴室",
    rent: "租金",
    available: "可用",
    occupied: "已出租",
    
    applyNow: "立即申请",
    applicationSubmitted: "申请已提交",
    monthlyIncome: "月收入",
    employer: "雇主",
    references: "推荐人",
    uploadDocuments: "上传文件",
    
    signLease: "签署租约",
    leaseAgreement: "租赁协议",
    leaseStart: "租约开始",
    leaseEnd: "租约结束",
    securityDeposit: "押金",
    
    payRent: "支付租金",
    paymentHistory: "付款历史",
    nextPayment: "下次付款",
    amountDue: "应付金额",
    
    submitRequest: "提交请求",
    maintenanceRequest: "维护请求",
    urgency: "紧急程度",
    description: "描述",
    
    newMessage: "新消息",
    sendMessage: "发送消息",
    
    internationalStudent: "国际学生",
    guarantorRequired: "需要担保人",
    parentGuarantor: "父母/监护人担保",
    schoolEnrollment: "学校注册",
    studyPermit: "学习许可",
    proofOfFunds: "资金证明",
  },
  
  // Hindi
  hi: {
    welcome: "स्वागत है",
    login: "लॉग इन करें",
    signup: "साइन अप करें",
    logout: "लॉग आउट",
    save: "सहेजें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    search: "खोजें",
    filter: "फ़िल्टर",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    
    dashboard: "डैशबोर्ड",
    properties: "संपत्ति",
    applications: "आवेदन",
    leases: "पट्टे",
    payments: "भुगतान",
    maintenance: "रखरखाव",
    messages: "संदेश",
    settings: "सेटिंग्स",
    
    addProperty: "संपत्ति जोड़ें",
    propertyDetails: "संपत्ति विवरण",
    unitNumber: "यूनिट नंबर",
    bedrooms: "बेडरूम",
    bathrooms: "बाथरूम",
    rent: "किराया",
    available: "उपलब्ध",
    occupied: "व्यस्त",
    
    applyNow: "अभी आवेदन करें",
    applicationSubmitted: "आवेदन जमा किया गया",
    monthlyIncome: "मासिक आय",
    employer: "नियोक्ता",
    references: "संदर्भ",
    uploadDocuments: "दस्तावेज़ अपलोड करें",
    
    signLease: "पट्टा पर हस्ताक्षर करें",
    leaseAgreement: "पट्टा समझौता",
    leaseStart: "पट्टा शुरू",
    leaseEnd: "पट्टा समाप्त",
    securityDeposit: "सुरक्षा जमा",
    
    payRent: "किराया भुगतान करें",
    paymentHistory: "भुगतान इतिहास",
    nextPayment: "अगला भुगतान",
    amountDue: "बकाया राशि",
    
    submitRequest: "अनुरोध सबमिट करें",
    maintenanceRequest: "रखरखाव अनुरोध",
    urgency: "तात्कालिकता",
    description: "विवरण",
    
    newMessage: "नया संदेश",
    sendMessage: "संदेश भेजें",
    
    internationalStudent: "अंतर्राष्ट्रीय छात्र",
    guarantorRequired: "गारंटर आवश्यक",
    parentGuarantor: "माता-पिता/अभिभावक गारंटर",
    schoolEnrollment: "स्कूल नामांकन",
    studyPermit: "अध्ययन परमिट",
    proofOfFunds: "धन का प्रमाण",
  },
  
  // Arabic
  ar: {
    welcome: "أهلاً وسهلاً",
    login: "تسجيل الدخول",
    signup: "التسجيل",
    logout: "تسجيل الخروج",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    search: "بحث",
    filter: "تصفية",
    loading: "جار التحميل...",
    error: "خطأ",
    success: "نجاح",
    
    dashboard: "لوحة التحكم",
    properties: "العقارات",
    applications: "الطلبات",
    leases: "عقود الإيجار",
    payments: "المدفوعات",
    maintenance: "الصيانة",
    messages: "الرسائل",
    settings: "الإعدادات",
    
    addProperty: "إضافة عقار",
    propertyDetails: "تفاصيل العقار",
    unitNumber: "رقم الوحدة",
    bedrooms: "غرف النوم",
    bathrooms: "الحمامات",
    rent: "الإيجار",
    available: "متاح",
    occupied: "مشغول",
    
    applyNow: "قدم الآن",
    applicationSubmitted: "تم إرسال الطلب",
    monthlyIncome: "الدخل الشهري",
    employer: "صاحب العمل",
    references: "المراجع",
    uploadDocuments: "تحميل المستندات",
    
    signLease: "توقيع عقد الإيجار",
    leaseAgreement: "اتفاقية الإيجار",
    leaseStart: "بداية الإيجار",
    leaseEnd: "نهاية الإيجار",
    securityDeposit: "وديعة الضمان",
    
    payRent: "دفع الإيجار",
    paymentHistory: "سجل المدفوعات",
    nextPayment: "الدفعة التالية",
    amountDue: "المبلغ المستحق",
    
    submitRequest: "إرسال طلب",
    maintenanceRequest: "طلب صيانة",
    urgency: "الإلحاح",
    description: "الوصف",
    
    newMessage: "رسالة جديدة",
    sendMessage: "إرسال رسالة",
    
    internationalStudent: "طالب دولي",
    guarantorRequired: "مطلوب ضامن",
    parentGuarantor: "ضامن الوالد/الوصي",
    schoolEnrollment: "التسجيل في المدرسة",
    studyPermit: "تصريح الدراسة",
    proofOfFunds: "إثبات الأموال",
  },
  
  // Spanish
  es: {
    welcome: "Bienvenido",
    login: "Iniciar sesión",
    signup: "Registrarse",
    logout: "Cerrar sesión",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    search: "Buscar",
    filter: "Filtrar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    
    dashboard: "Panel",
    properties: "Propiedades",
    applications: "Solicitudes",
    leases: "Contratos",
    payments: "Pagos",
    maintenance: "Mantenimiento",
    messages: "Mensajes",
    settings: "Configuración",
    
    addProperty: "Agregar Propiedad",
    propertyDetails: "Detalles de la Propiedad",
    unitNumber: "Número de Unidad",
    bedrooms: "Dormitorios",
    bathrooms: "Baños",
    rent: "Alquiler",
    available: "Disponible",
    occupied: "Ocupado",
    
    applyNow: "Aplicar Ahora",
    applicationSubmitted: "Solicitud Enviada",
    monthlyIncome: "Ingreso Mensual",
    employer: "Empleador",
    references: "Referencias",
    uploadDocuments: "Subir Documentos",
    
    signLease: "Firmar Contrato",
    leaseAgreement: "Acuerdo de Arrendamiento",
    leaseStart: "Inicio del Contrato",
    leaseEnd: "Fin del Contrato",
    securityDeposit: "Depósito de Seguridad",
    
    payRent: "Pagar Alquiler",
    paymentHistory: "Historial de Pagos",
    nextPayment: "Próximo Pago",
    amountDue: "Monto Adeudado",
    
    submitRequest: "Enviar Solicitud",
    maintenanceRequest: "Solicitud de Mantenimiento",
    urgency: "Urgencia",
    description: "Descripción",
    
    newMessage: "Nuevo Mensaje",
    sendMessage: "Enviar Mensaje",
    
    internationalStudent: "Estudiante Internacional",
    guarantorRequired: "Se Requiere Garante",
    parentGuarantor: "Garante Padre/Tutor",
    schoolEnrollment: "Inscripción Escolar",
    studyPermit: "Permiso de Estudio",
    proofOfFunds: "Prueba de Fondos",
  },
};

// ============================================================================
// TRANSLATION HOOK
// ============================================================================

export class I18nService {
  private static currentLanguage: SupportedLanguage = "en";
  
  static setLanguage(lang: SupportedLanguage) {
    this.currentLanguage = lang;
    
    // Update HTML dir attribute for RTL languages
    if (typeof document !== "undefined") {
      document.documentElement.dir = SUPPORTED_LANGUAGES[lang].rtl ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }
  
  static getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }
  
  static translate(key: TranslationKey): string {
    return TRANSLATIONS[this.currentLanguage][key] || TRANSLATIONS.en[key] || key;
  }
  
  static t(key: TranslationKey): string {
    return this.translate(key);
  }
}

// Convenience export
export const t = (key: TranslationKey) => I18nService.translate(key);
export const setLanguage = (lang: SupportedLanguage) => I18nService.setLanguage(lang);
