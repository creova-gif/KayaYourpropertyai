import { useState } from "react";
import { Sparkles, MessageSquare, Mic, UserCheck } from "lucide-react";
import { AIAssistant } from "../components/AIAssistant";
import { VoiceCommandPanel } from "../components/VoiceCommandPanel";
import { AITenantScreeningModal } from "../components/AITenantScreeningModal";
import { PublicNav } from "../components/PublicNav";

export function AIFeaturesDemo() {
  const [showChat, setShowChat] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showScreening, setShowScreening] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <PublicNav />
      <div className="max-w-6xl mx-auto px-8 pt-[90px] pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E1F5EE] text-[#0F6E56] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="size-4" />
            Powered by Claude AI
          </div>
          <h1 className="text-5xl font-normal text-[#0E0F0C] tracking-tight mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            AI Features Demo
          </h1>
          <p className="text-lg text-[#767570] max-w-2xl mx-auto">
            All AI features are now fully functional and connected to Claude AI. Test them below!
          </p>
        </div>

        {/* Features Grid - ENHANCED WITH DEEP INTEGRATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* AI Chat */}
          <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8 hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center mb-4">
              <MessageSquare className="size-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0E0F0C] mb-2">AI Chat Assistant</h3>
            <p className="text-sm text-[#767570] mb-6 leading-relaxed">
              Chat with Claude 3.5 Sonnet about Canadian tenant law, LTB procedures, lease agreements, and property management. Now with context awareness!
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#0A7A52]">✓</span>
                <span>Real-time Claude AI responses</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#0A7A52]">✓</span>
                <span>Conversation memory in database</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#0A7A52]">✓</span>
                <span>Page-aware contextual responses</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#0A7A52]">✓</span>
                <span>Available everywhere via floating button</span>
              </div>
            </div>
            <button
              onClick={() => setShowChat(true)}
              className="w-full px-6 py-3 bg-[#0A7A52] text-white rounded-[10px] font-medium hover:bg-[#085D3D] transition"
            >
              Open AI Chat
            </button>
          </div>

          {/* Voice AI */}
          <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8 hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-4">
              <Mic className="size-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0E0F0C] mb-2">Voice Commands + AI Command Palette</h3>
            <p className="text-sm text-[#767570] mb-6 leading-relaxed">
              Use voice commands or press ⌘K/Ctrl+K anywhere to access AI-powered actions and navigate instantly with natural language.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#6366F1]">✓</span>
                <span>Natural language understanding</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#6366F1]">✓</span>
                <span>Context-aware with your real data</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#6366F1]">✓</span>
                <span>Command palette (⌘K) on every page</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#6366F1]">✓</span>
                <span>Instant AI answers and navigation</span>
              </div>
            </div>
            <button
              onClick={() => setShowVoice(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-[10px] font-medium hover:opacity-90 transition"
            >
              Open Voice AI
            </button>
          </div>

          {/* Tenant Screening */}
          <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8 hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center mb-4">
              <UserCheck className="size-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0E0F0C] mb-2">AI Tenant Screening</h3>
            <p className="text-sm text-[#767570] mb-6 leading-relaxed">
              Analyze tenant applications with Claude AI-powered risk assessment. Get detailed insights, risk scores, and recommendations instantly.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#F59E0B]">✓</span>
                <span>AI risk score calculation (0-100)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#F59E0B]">✓</span>
                <span>Strengths, concerns, and red flags</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#F59E0B]">✓</span>
                <span>Canadian compliance-aware</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#F59E0B]">✓</span>
                <span>Actionable next steps</span>
              </div>
            </div>
            <button
              onClick={() => setShowScreening(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white rounded-[10px] font-medium hover:opacity-90 transition"
            >
              Screen a Tenant
            </button>
          </div>

          {/* Property Listings AI */}
          <div className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8 hover:shadow-lg transition-shadow">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] flex items-center justify-center mb-4">
              <Sparkles className="size-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0E0F0C] mb-2">Property Listings AI</h3>
            <p className="text-sm text-[#767570] mb-6 leading-relaxed">
              Get AI rent estimates, compare listings intelligently, and understand lease terms with our marketplace AI. Fully connected to Claude!
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#1D9E75]">✓</span>
                <span>Market-based rent intelligence</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#1D9E75]">✓</span>
                <span>Intelligent listing comparison</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#1D9E75]">✓</span>
                <span>Lease term explanations</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <span className="text-[#1D9E75]">✓</span>
                <span>Real-time AI analysis</span>
              </div>
            </div>
            <a
              href="/property-listings-redesign"
              className="block w-full px-6 py-3 bg-[#1D9E75] text-white rounded-[10px] font-medium hover:bg-[#0F6E56] transition text-center"
            >
              View Property Listings
            </a>
          </div>
        </div>

        {/* Enhanced Integration Info */}
        <div className="bg-gradient-to-br from-[#0A7A52] to-[#085D3D] border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8 mb-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Sparkles className="size-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">🚀 Deep AI Integration Complete!</h3>
              <p className="text-white/90 leading-relaxed">
                All AI features are now fully functional with Claude 3.5 Sonnet, plus we've added powerful new integrations throughout the entire platform!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🌐</span> Always-Available AI
              </h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Floating AI button on every page</li>
                <li>• Context-aware responses based on current page</li>
                <li>• Conversation memory saved in database</li>
                <li>• Proactive suggestions on key pages</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">⚡</span> Command Palette
              </h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Press ⌘K or Ctrl+K anywhere</li>
                <li>• Navigate instantly with AI</li>
                <li>• Ask questions and get answers</li>
                <li>• Access all features in seconds</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span> Smart Context
              </h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• AI knows your property data</li>
                <li>• Personalized recommendations</li>
                <li>• Real-time data integration</li>
                <li>• Canadian law compliance built-in</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🔧</span> Enhanced Backend
              </h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Improved AI prompts</li>
                <li>• Better error handling</li>
                <li>• Optimized response times</li>
                <li>• Conversation history tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-br from-[#E1F5EE] to-[#E6F1FB] border border-[rgba(0,0,0,0.05)] rounded-[14px] p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Sparkles className="size-6 text-[#0A7A52]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#0E0F0C] mb-2">✅ All Core AI Features Connected!</h3>
              <p className="text-sm text-[#767570] leading-relaxed mb-4">
                Every AI feature uses Claude 3.5 Sonnet via Supabase backend with enhanced prompts, context awareness, and conversation memory.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">AI Chat Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">Voice Commands + Palette</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">AI Tenant Screening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">Property Listings AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">Global AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#6B7280]">Command Palette (⌘K)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Components */}
      <AIAssistant isOpen={showChat} onClose={() => setShowChat(false)} />
      <VoiceCommandPanel isOpen={showVoice} onClose={() => setShowVoice(false)} />
      <AITenantScreeningModal isOpen={showScreening} onClose={() => setShowScreening(false)} />
    </div>
  );
}
