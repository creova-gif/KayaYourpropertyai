import { Check, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { ButtonSpinner } from "../components/LoadingSpinner";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function PricingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanClick = async (planName: string, priceId?: string) => {
    setLoadingPlan(planName);
    
    try {
      // If free plan, just redirect
      if (planName === "Free") {
        if (user) {
          navigate('/app');
        } else {
          navigate('/signup');
        }
        setLoadingPlan(null);
        return;
      }

      // Check if user is logged in
      if (!user) {
        toast.error("Please sign up or log in to subscribe");
        navigate('/signup');
        setLoadingPlan(null);
        return;
      }

      // Create Stripe checkout session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/stripe/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token || publicAnonKey}`,
          },
          body: JSON.stringify({
            priceId: priceId || 'price_test',
            planName: planName,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = url;

    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout');
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Free",
      nameFr: "Gratuit",
      price: "$0",
      period: "/month",
      periodFr: "/mois",
      description: "Perfect for testing KAYA",
      descriptionFr: "Parfait pour tester KAYA",
      features: [
        { text: "1 property", textFr: "1 propriété", included: true },
        { text: "Up to 5 tenants", textFr: "Jusqu'à 5 locataires", included: true },
        { text: "Basic LTB forms", textFr: "Formulaires TAL de base", included: true },
        { text: "Document storage (1GB)", textFr: "Stockage de documents (1GB)", included: true },
        { text: "AI tenant screening", textFr: "Vérification IA des locataires", included: false },
        { text: "Rent collection", textFr: "Perception des loyers", included: false },
        { text: "Priority support", textFr: "Support prioritaire", included: false },
      ],
      cta: "Get Started Free",
      ctaFr: "Commencer gratuitement",
      popular: false,
      priceId: null,
    },
    {
      name: "Starter",
      nameFr: "Démarrage",
      price: "$29",
      period: "/month",
      periodFr: "/mois",
      description: "For growing landlords",
      descriptionFr: "Pour propriétaires en croissance",
      features: [
        { text: "Up to 5 properties", textFr: "Jusqu'à 5 propriétés", included: true },
        { text: "Up to 25 tenants", textFr: "Jusqu'à 25 locataires", included: true },
        { text: "AI tenant screening", textFr: "Vérification IA des locataires", included: true },
        { text: "Rent collection (Interac + Stripe)", textFr: "Perception loyers (Interac + Stripe)", included: true },
        { text: "All LTB forms", textFr: "Tous formulaires TAL", included: true },
        { text: "Document storage (10GB)", textFr: "Stockage de documents (10GB)", included: true },
        { text: "Email support", textFr: "Support par courriel", included: true },
        { text: "API access", textFr: "Accès API", included: false },
      ],
      cta: "Start 7-Day Trial",
      ctaFr: "Essai gratuit 7 jours",
      popular: true,
      priceId: "price_1NqQ5kL0G0G0G0G0G0G0G0G0",
    },
    {
      name: "Pro",
      nameFr: "Pro",
      price: "$79",
      period: "/month",
      periodFr: "/mois",
      description: "For serious property managers",
      descriptionFr: "Pour gestionnaires sérieux",
      features: [
        { text: "Up to 20 properties", textFr: "Jusqu'à 20 propriétés", included: true },
        { text: "Up to 100 tenants", textFr: "Jusqu'à 100 locataires", included: true },
        { text: "Advanced AI screening", textFr: "Vérification IA avancée", included: true },
        { text: "Automated rent collection", textFr: "Perception automatisée", included: true },
        { text: "Contractor marketplace", textFr: "Marché entrepreneurs", included: true },
        { text: "HST/GST tax tracking", textFr: "Suivi TPS/TVQ", included: true },
        { text: "Financial reports", textFr: "Rapports financiers", included: true },
        { text: "Priority support", textFr: "Support prioritaire", included: true },
        { text: "Document storage (50GB)", textFr: "Stockage documents (50GB)", included: true },
      ],
      cta: "Start 7-Day Trial",
      ctaFr: "Essai gratuit 7 jours",
      popular: false,
      priceId: "price_1NqQ5kL0G0G0G0G0G0G0G0G1",
    },
    {
      name: "Enterprise",
      nameFr: "Entreprise",
      price: "$199",
      period: "/month",
      periodFr: "/mois",
      description: "For large property portfolios",
      descriptionFr: "Pour grands portefeuilles",
      features: [
        { text: "Unlimited properties", textFr: "Propriétés illimitées", included: true },
        { text: "Unlimited tenants", textFr: "Locataires illimités", included: true },
        { text: "Everything in Pro", textFr: "Tout dans Pro", included: true },
        { text: "White-label branding", textFr: "Marque blanche", included: true },
        { text: "API access", textFr: "Accès API", included: true },
        { text: "Custom integrations", textFr: "Intégrations personnalisées", included: true },
        { text: "Dedicated account manager", textFr: "Gestionnaire dédié", included: true },
        { text: "Unlimited storage", textFr: "Stockage illimité", included: true },
      ],
      cta: "Contact Sales",
      ctaFr: "Contacter les ventes",
      popular: false,
      priceId: "price_1NqQ5kL0G0G0G0G0G0G0G0G2",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 
            className="text-[56px] font-bold mb-6 leading-tight text-[#ffffff]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Simple, Transparent Pricing
          </h1>
          <p 
            className="text-[20px] text-white/90 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Choose the perfect plan for your property management needs. All plans include 7-day free trial.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                plan.popular ? "ring-4 ring-[#0A7A52]" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white px-4 py-1 text-[12px] font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 
                  className="text-[24px] font-bold text-[#0E0F0C] mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span 
                    className="text-[48px] font-bold text-[#0A7A52]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[16px] text-[#767570]">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-[#767570] mb-8">
                  {plan.description}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanClick(plan.name, plan.priceId)}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-[14px] transition-all duration-300 mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white hover:shadow-lg hover:shadow-[#0A7A52]/30"
                      : "bg-[#F8F7F4] text-[#0A7A52] hover:bg-[#0A7A52] hover:text-white"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {loadingPlan === plan.name ? <ButtonSpinner /> : plan.cta}
                </button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="size-5 text-[#0A7A52] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : (
                        <X className="size-5 text-[#D1D0CC] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      )}
                      <span 
                        className={`text-[14px] ${feature.included ? "text-[#0E0F0C]" : "text-[#767570]"}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 
            className="text-[40px] font-bold text-center mb-12 text-[#0E0F0C]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex) and Interac e-Transfer.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. No hidden charges. Pay only your monthly subscription.",
              },
              {
                q: "What happens after my free trial?",
                a: "After 7 days, you'll be charged for your selected plan. Cancel anytime during the trial at no cost.",
              },
              {
                q: "Do you offer discounts for annual payments?",
                a: "Yes! Save 20% when you pay annually. Contact support@creova.one for details.",
              },
              {
                q: "Is KAYA compliant with Ontario LTB regulations?",
                a: "Absolutely. All forms and workflows are updated to match 2024 LTB guidelines and RTA requirements.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 
                  className="text-[18px] font-bold text-[#0E0F0C] mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {faq.q}
                </h3>
                <p 
                  className="text-[14px] text-[#767570]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 
            className="text-[40px] font-bold text-[#0E0F0C] mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ready to get started?
          </h2>
          <p 
            className="text-[18px] text-[#767570] mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Join 500+ Ontario landlords managing their properties with KAYA.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white py-4 px-12 rounded-xl font-semibold text-[16px] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0A7A52]/30 hover:scale-105"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Start Your Free Trial
          </Link>
          <p className="mt-4 text-[14px] text-[#767570]">
            No credit card required · 7-day free trial · Cancel anytime
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex items-center justify-center gap-12 flex-wrap opacity-60">
          <div className="text-center">
            <div className="text-[32px] font-bold text-[#0A7A52]">500+</div>
            <div className="text-[12px] text-[#767570] uppercase tracking-wide">Properties Managed</div>
          </div>
          <div className="text-center">
            <div className="text-[32px] font-bold text-[#0A7A52]">2,500+</div>
            <div className="text-[12px] text-[#767570] uppercase tracking-wide">Tenants Screened</div>
          </div>
          <div className="text-center">
            <div className="text-[32px] font-bold text-[#0A7A52]">$2.5M</div>
            <div className="text-[12px] text-[#767570] uppercase tracking-wide">Rent Collected</div>
          </div>
          <div className="text-center">
            <div className="text-[32px] font-bold text-[#0A7A52]">4.9/5</div>
            <div className="text-[12px] text-[#767570] uppercase tracking-wide">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}