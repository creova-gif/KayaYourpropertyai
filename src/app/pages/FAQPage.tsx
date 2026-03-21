import { useState } from "react";
import { ChevronDown, Search, Mail, MessageCircle, Phone, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { PublicNav } from "../components/PublicNav";

interface FAQItem {
  category: string;
  categoryFr: string;
  questions: {
    q: string;
    qFr: string;
    a: string;
    aFr: string;
  }[];
}

export function FAQPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("General");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "General",
      categoryFr: "Général",
      questions: [
        {
          q: "What is KAYA?",
          qFr: "Qu'est-ce que KAYA?",
          a: "KAYA is an AI-powered property management platform designed specifically for Ontario landlords. It handles tenant screening, rent collection, LTB compliance, maintenance tracking, and financial reporting—all in one place.",
          aFr: "KAYA est une plateforme de gestion immobilière alimentée par l'IA conçue spécifiquement pour les propriétaires de l'Ontario. Elle gère la sélection des locataires, la perception des loyers, la conformité TAL, le suivi de la maintenance et les rapports financiers—le tout en un seul endroit.",
        },
        {
          q: "Is KAYA available in French?",
          qFr: "KAYA est-il disponible en français?",
          a: "Yes! KAYA is fully bilingual with English and French support. You can switch languages anytime from the top navigation bar.",
          aFr: "Oui! KAYA est entièrement bilingue avec support en anglais et en français. Vous pouvez changer de langue à tout moment depuis la barre de navigation supérieure.",
        },
        {
          q: "How does the 14-day free trial work?",
          qFr: "Comment fonctionne l'essai gratuit de 14 jours?",
          a: "Sign up for any paid plan and get full access for 14 days. No credit card required. If you decide KAYA isn't for you, simply cancel before the trial ends at no cost.",
          aFr: "Inscrivez-vous à n'importe quel plan payant et obtenez un accès complet pendant 14 jours. Aucune carte de crédit requise. Si vous décidez que KAYA ne vous convient pas, annulez simplement avant la fin de l'essai sans frais.",
        },
      ],
    },
    {
      category: "Pricing & Billing",
      categoryFr: "Tarification et facturation",
      questions: [
        {
          q: "What payment methods do you accept?",
          qFr: "Quels modes de paiement acceptez-vous?",
          a: "We accept all major credit cards (Visa, Mastercard, Amex) through Stripe. For Enterprise plans, we also accept wire transfers and ACH payments.",
          aFr: "Nous acceptons toutes les principales cartes de crédit (Visa, Mastercard, Amex) via Stripe. Pour les plans Entreprise, nous acceptons également les virements bancaires et les paiements ACH.",
        },
        {
          q: "Can I change my plan anytime?",
          qFr: "Puis-je changer de plan à tout moment?",
          a: "Absolutely! Upgrade or downgrade your plan at any time from Settings > Subscription. Upgrades take effect immediately, and downgrades apply at the next billing cycle.",
          aFr: "Absolument! Améliorez ou réduisez votre plan à tout moment depuis Paramètres > Abonnement. Les améliorations prennent effet immédiatement, et les réductions s'appliquent au prochain cycle de facturation.",
        },
        {
          q: "Are there any hidden fees?",
          qFr: "Y a-t-il des frais cachés?",
          a: "No hidden fees. Your subscription covers all features in your plan. For rent collection, Stripe charges standard processing fees (2.9% + $0.30), which can be passed to tenants.",
          aFr: "Aucuns frais cachés. Votre abonnement couvre toutes les fonctionnalités de votre plan. Pour la perception des loyers, Stripe facture des frais de traitement standards (2,9% + 0,30$), qui peuvent être transférés aux locataires.",
        },
        {
          q: "Do you offer annual discounts?",
          qFr: "Offrez-vous des rabais annuels?",
          a: "Yes! Save 20% when you pay annually. Contact support@creova.one to switch to annual billing.",
          aFr: "Oui! Économisez 20% en payant annuellement. Contactez support@creova.one pour passer à la facturation annuelle.",
        },
      ],
    },
    {
      category: "Tenant Screening",
      categoryFr: "Sélection des locataires",
      questions: [
        {
          q: "How does AI tenant screening work?",
          qFr: "Comment fonctionne la sélection des locataires par IA?",
          a: "Our AI analyzes credit scores, employment history, rental history, and income verification to generate a risk score (0-100). It also flags red flags like eviction history and validates identity documents.",
          aFr: "Notre IA analyse les scores de crédit, l'historique d'emploi, l'historique de location et la vérification des revenus pour générer un score de risque (0-100). Elle signale également les drapeaux rouges comme l'historique d'expulsion et valide les documents d'identité.",
        },
        {
          q: "Is tenant screening LTB-compliant?",
          qFr: "La sélection des locataires est-elle conforme au TAL?",
          a: "Yes. All screening criteria comply with the Ontario Human Rights Code and Residential Tenancies Act. We never screen based on protected grounds (race, religion, family status, etc.).",
          aFr: "Oui. Tous les critères de sélection sont conformes au Code des droits de la personne de l'Ontario et à la Loi sur la location à usage d'habitation. Nous ne sélectionnons jamais en fonction de motifs protégés (race, religion, statut familial, etc.).",
        },
        {
          q: "Can tenants apply directly through KAYA?",
          qFr: "Les locataires peuvent-ils postuler directement via KAYA?",
          a: "Yes! Share your property listing link and tenants can submit applications online with digital signatures. You'll receive instant notifications when new applications arrive.",
          aFr: "Oui! Partagez votre lien de liste de propriétés et les locataires peuvent soumettre des candidatures en ligne avec des signatures numériques. Vous recevrez des notifications instantanées lorsque de nouvelles candidatures arrivent.",
        },
      ],
    },
    {
      category: "Rent Collection",
      categoryFr: "Perception des loyers",
      questions: [
        {
          q: "How does automated rent collection work?",
          qFr: "Comment fonctionne la perception automatisée des loyers?",
          a: "Tenants can pay rent via credit card, debit card, or pre-authorized debit. Payments are processed automatically on the 1st of each month and deposited to your bank account within 2-3 business days.",
          aFr: "Les locataires peuvent payer le loyer par carte de crédit, carte de débit ou débit pré-autorisé. Les paiements sont traités automatiquement le 1er de chaque mois et déposés sur votre compte bancaire dans 2-3 jours ouvrables.",
        },
        {
          q: "What happens if a tenant misses a payment?",
          qFr: "Que se passe-t-il si un locataire manque un paiement?",
          a: "KAYA automatically sends reminder emails 3 days before rent is due and late payment notices on the 2nd of the month. The system can also auto-generate N4 forms (Notice to End Tenancy for Non-payment).",
          aFr: "KAYA envoie automatiquement des e-mails de rappel 3 jours avant l'échéance du loyer et des avis de retard le 2 du mois. Le système peut également générer automatiquement des formulaires N4 (Avis de résiliation de location pour non-paiement).",
        },
        {
          q: "Can I collect rent via Interac e-Transfer?",
          qFr: "Puis-je percevoir le loyer via Virement Interac?",
          a: "Yes! Tenants can send Interac e-Transfers directly. KAYA tracks all payments and automatically reconciles them in your financial dashboard.",
          aFr: "Oui! Les locataires peuvent envoyer des virements Interac directement. KAYA suit tous les paiements et les réconcilie automatiquement dans votre tableau de bord financier.",
        },
      ],
    },
    {
      category: "LTB Forms & Compliance",
      categoryFr: "Formulaires TAL et conformité",
      questions: [
        {
          q: "What LTB forms does KAYA generate?",
          qFr: "Quels formulaires TAL KAYA génère-t-il?",
          a: "KAYA generates all major LTB forms including N4 (non-payment), N5 (damage), N8 (landlord personal use), N12 (demolition/renovation), L1 (eviction application), and more. All forms are updated to 2024 standards.",
          aFr: "KAYA génère tous les principaux formulaires TAL incluant N4 (non-paiement), N5 (dommages), N8 (usage personnel du propriétaire), N12 (démolition/rénovation), L1 (demande d'expulsion), et plus. Tous les formulaires sont mis à jour aux normes 2024.",
        },
        {
          q: "Does KAYA help with LTB hearings?",
          qFr: "KAYA aide-t-il avec les audiences du TAL?",
          a: "Yes. KAYA provides hearing preparation checklists, evidence packaging, and AI-generated summaries of key facts. We also offer templates for landlord testimonies and witness statements.",
          aFr: "Oui. KAYA fournit des listes de contrôle de préparation d'audience, un emballage de preuves et des résumés générés par IA des faits clés. Nous offrons également des modèles pour les témoignages de propriétaires et les déclarations de témoins.",
        },
        {
          q: "Is KAYA updated when LTB rules change?",
          qFr: "KAYA est-il mis à jour lorsque les règles du TAL changent?",
          a: "Absolutely. Our legal team monitors LTB guideline changes and updates all forms, workflows, and AI logic within 48 hours of any regulatory changes.",
          aFr: "Absolument. Notre équipe juridique surveille les changements de directives du TAL et met à jour tous les formulaires, flux de travail et logique d'IA dans les 48 heures suivant tout changement réglementaire.",
        },
      ],
    },
    {
      category: "Maintenance & Contractors",
      categoryFr: "Maintenance et entrepreneurs",
      questions: [
        {
          q: "How does the contractor marketplace work?",
          qFr: "Comment fonctionne le marché des entrepreneurs?",
          a: "Post maintenance jobs and receive bids from verified contractors (plumbers, electricians, HVAC). Compare quotes, read reviews, and hire directly through KAYA. All contractors are background-checked and insured.",
          aFr: "Publiez des travaux de maintenance et recevez des soumissions d'entrepreneurs vérifiés (plombiers, électriciens, CVC). Comparez les devis, lisez les avis et embauchez directement via KAYA. Tous les entrepreneurs ont fait l'objet d'une vérification des antécédents et sont assurés.",
        },
        {
          q: "Can tenants submit maintenance requests?",
          qFr: "Les locataires peuvent-ils soumettre des demandes de maintenance?",
          a: "Yes! Tenants can submit requests via their tenant portal with photos and urgency levels. You'll receive instant notifications and can track request status in real-time.",
          aFr: "Oui! Les locataires peuvent soumettre des demandes via leur portail locataire avec photos et niveaux d'urgence. Vous recevrez des notifications instantanées et pourrez suivre l'état de la demande en temps réel.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      categoryFr: "Sécurité et confidentialité",
      questions: [
        {
          q: "Is my data secure?",
          qFr: "Mes données sont-elles sécurisées?",
          a: "Yes. KAYA uses bank-level encryption (AES-256), two-factor authentication, and SOC 2 Type II compliance. All data is stored in Canadian data centers and never shared with third parties.",
          aFr: "Oui. KAYA utilise un chiffrement de niveau bancaire (AES-256), une authentification à deux facteurs et une conformité SOC 2 Type II. Toutes les données sont stockées dans des centres de données canadiens et ne sont jamais partagées avec des tiers.",
        },
        {
          q: "Who can access tenant information?",
          qFr: "Qui peut accéder aux informations des locataires?",
          a: "Only you (the property owner) have access to tenant data. KAYA staff cannot view your tenant information unless you explicitly grant support access for troubleshooting.",
          aFr: "Seul vous (le propriétaire) avez accès aux données des locataires. Le personnel de KAYA ne peut pas voir les informations de vos locataires sauf si vous accordez explicitement l'accès au support pour le dépannage.",
        },
      ],
    },
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <PublicNav />
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] text-white pt-[142px] pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center size-16 bg-white/10 rounded-full mb-6">
            <BookOpen className="size-8 text-white" />
          </div>
          <h1
            className="text-[56px] font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {language === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
          </h1>
          <p
            className="text-[20px] text-white/90 max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {language === "fr"
              ? "Trouvez des réponses rapides aux questions courantes sur KAYA"
              : "Find quick answers to common questions about KAYA"}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#767570]" />
            <input
              type="text"
              placeholder={language === "fr" ? "Rechercher dans les FAQ..." : "Search FAQs..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-[#0E0F0C] bg-white shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[18px] text-[#767570]">
              {language === "fr"
                ? "Aucun résultat trouvé. Essayez une autre recherche ou contactez le support."
                : "No results found. Try a different search or contact support."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() =>
                    setExpandedCategory(expandedCategory === category.category ? null : category.category)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-[#F8F7F4] transition-colors"
                >
                  <h2
                    className="text-[24px] font-bold text-[#0E0F0C]"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {language === "fr" ? category.categoryFr : category.category}
                  </h2>
                  <ChevronDown
                    className={`size-6 text-[#0A7A52] transition-transform ${
                      expandedCategory === category.category ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Questions */}
                {expandedCategory === category.category && (
                  <div className="border-t border-[#D1D0CC]/30">
                    {category.questions.map((question, qIndex) => (
                      <div key={qIndex} className="border-b border-[#D1D0CC]/30 last:border-0">
                        <button
                          onClick={() =>
                            setExpandedQuestion(
                              expandedQuestion === `${catIndex}-${qIndex}` ? null : `${catIndex}-${qIndex}`
                            )
                          }
                          className="w-full flex items-center justify-between p-6 hover:bg-[#F8F7F4] transition-colors text-left"
                        >
                          <h3
                            className="text-[16px] font-semibold text-[#0E0F0C] pr-4"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {language === "fr" ? question.qFr : question.q}
                          </h3>
                          <ChevronDown
                            className={`size-5 text-[#767570] flex-shrink-0 transition-transform ${
                              expandedQuestion === `${catIndex}-${qIndex}` ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {expandedQuestion === `${catIndex}-${qIndex}` && (
                          <div className="px-6 pb-6">
                            <p
                              className="text-[14px] text-[#767570] leading-relaxed"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {language === "fr" ? question.aFr : question.a}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Support Section */}
        <div className="mt-16 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] rounded-2xl p-8 text-white text-center">
          <h2
            className="text-[32px] font-bold mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {language === "fr" ? "Vous n'avez pas trouvé votre réponse?" : "Still have questions?"}
          </h2>
          <p
            className="text-[16px] text-white/90 mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {language === "fr"
              ? "Notre équipe de support est là pour vous aider 24/7"
              : "Our support team is here to help you 24/7"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:support@creova.one"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Mail className="size-8" />
              <div>
                <div className="font-semibold text-[14px]">
                  {language === "fr" ? "Support par courriel" : "Email Support"}
                </div>
                <div className="text-[12px] text-white/80">support@creova.one</div>
              </div>
            </a>

            <Link
              to="/contact"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="size-8" />
              <div>
                <div className="font-semibold text-[14px]">
                  {language === "fr" ? "Chat en direct" : "Live Chat"}
                </div>
                <div className="text-[12px] text-white/80">
                  {language === "fr" ? "Disponible 24/7" : "Available 24/7"}
                </div>
              </div>
            </Link>

            <a
              href="tel:+1-416-555-KAYA"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Phone className="size-8" />
              <div>
                <div className="font-semibold text-[14px]">
                  {language === "fr" ? "Support téléphonique" : "Phone Support"}
                </div>
                <div className="text-[12px] text-white/80">1-416-555-KAYA</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
