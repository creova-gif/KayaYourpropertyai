/**
 * Example: DashboardIntegrated
 * Shows how to connect real backend data to your UI
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Building2, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { MarketplaceAPI } from "../services/backend.service";

const G = "#0A7A52";
const GL = "#E5F4EE";
const BG = "#F8F7F4";
const TEXT = "#0E0F0C";
const MUTED = "#767570";
const BORDER = "rgba(0,0,0,0.07)";

export function DashboardIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load real data from backend
      const data = await MarketplaceAPI.getDashboardOverview();
      setDashboardData(data);
      
      console.log('✅ Dashboard data loaded:', data);
    } catch (err: any) {
      console.error('❌ Failed to load dashboard:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: BG, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 40,
              height: 40,
              border: `3px solid ${GL}`,
              borderTopColor: G,
              borderRadius: '50%',
              margin: '0 auto 16px'
            }}
          />
          <p style={{ color: MUTED, fontSize: 14 }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: BG, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: 20
      }}>
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #B45309',
          borderRadius: 12,
          padding: 20,
          maxWidth: 500,
          textAlign: 'center'
        }}>
          <AlertTriangle size={24} color="#B45309" style={{ marginBottom: 12 }} />
          <p style={{ color: '#B45309', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Failed to load dashboard
          </p>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 16 }}>
            {error}
          </p>
          <button
            onClick={loadDashboard}
            style={{
              background: '#B45309',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const portfolio = dashboardData?.portfolio?.overview || {};
  const properties = dashboardData?.properties || [];
  const applications = dashboardData?.applications || [];
  const aiInsights = dashboardData?.portfolio?.aiInsights || [];

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 40 }}
        >
          <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: 8 }}>
            Real-Time Data
          </p>
          <h1 style={{ 
            fontFamily: "'Instrument Serif', Georgia, serif", 
            fontSize: 48, 
            fontWeight: 400, 
            color: TEXT, 
            letterSpacing: '-1px',
            marginBottom: 8
          }}>
            Dashboard <em style={{ fontStyle: 'italic', color: G }}>Integrated</em>
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>
            Connected to live backend • {properties.length} properties • {applications.length} applications
          </p>
        </motion.div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Properties', value: portfolio.totalProperties || 0, icon: Building2 },
            { label: 'Total Units', value: portfolio.totalUnits || 0, icon: Building2 },
            { label: 'Occupancy Rate', value: `${portfolio.occupancyRate || 0}%`, icon: TrendingUp },
            { label: 'Monthly Revenue', value: `$${(portfolio.monthlyRevenue || 0).toLocaleString()}`, icon: TrendingUp },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#fff',
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: '24px',
              }}
            >
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 10, 
                background: GL, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <metric.icon size={18} color={G} />
              </div>
              <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 }}>
                {metric.label}
              </p>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: TEXT }}>
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: '#fff',
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: '28px',
              marginBottom: 32
            }}
          >
            <h2 style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontSize: 24, 
              fontWeight: 400, 
              color: TEXT,
              marginBottom: 20
            }}>
              AI Insights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {aiInsights.map((insight: any, i: number) => (
                <div 
                  key={i}
                  style={{
                    background: insight.severity === 'high' ? '#FEF3C7' : GL,
                    border: `1px solid ${insight.severity === 'high' ? '#B45309' : G}`,
                    borderRadius: 12,
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <AlertTriangle size={18} color={insight.severity === 'high' ? '#B45309' : G} style={{ marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 4 }}>
                        {insight.title}
                      </p>
                      <p style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>
                        {insight.description}
                      </p>
                      <p style={{ fontSize: 12, color: insight.severity === 'high' ? '#B45309' : G, fontWeight: 600 }}>
                        💡 {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Properties */}
        {properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontSize: 24, 
              fontWeight: 400, 
              color: TEXT,
              marginBottom: 20
            }}>
              Your Properties
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {properties.map((property: any, i: number) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    background: '#fff',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 16,
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 10, 
                      background: GL, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center'
                    }}>
                      <Building2 size={20} color={G} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>
                        {property.name || property.address}
                      </p>
                      <p style={{ fontSize: 12, color: MUTED }}>
                        {property.city}, {property.province}
                      </p>
                    </div>
                  </div>
                  
                  {property.analytics && (
                    <div style={{ 
                      background: BG, 
                      borderRadius: 10, 
                      padding: '14px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 8 
                    }}>
                      {[
                        ['Units', `${property.analytics.occupiedUnits} / ${property.analytics.totalUnits}`],
                        ['Occupancy', `${property.analytics.occupancyRate}%`],
                        ['Revenue', `$${property.analytics.monthlyRevenue.toLocaleString()}`],
                      ].map(([label, value]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12, color: MUTED }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Applications */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ marginTop: 32 }}
          >
            <h2 style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontSize: 24, 
              fontWeight: 400, 
              color: TEXT,
              marginBottom: 20
            }}>
              Recent Applications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {applications.map((app: any, i: number) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 + i * 0.1 }}
                  style={{
                    background: '#fff',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: app.aiScore >= 85 ? GL : app.aiScore >= 70 ? '#FEF3C7' : '#FDECEA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontWeight: 700,
                      color: app.aiScore >= 85 ? G : app.aiScore >= 70 ? '#B45309' : '#C0392B'
                    }}>
                      {app.aiScore}
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 3 }}>
                        {app.tenantName}
                      </p>
                      <p style={{ fontSize: 12, color: MUTED }}>
                        Income: ${app.monthlyIncome?.toLocaleString()} • Status: {app.status}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    background: app.aiRecommendation === 'approve' ? GL : '#FEF3C7',
                    color: app.aiRecommendation === 'approve' ? G : '#B45309',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 20
                  }}>
                    {app.aiRecommendation}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {properties.length === 0 && applications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: '#fff',
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              padding: '60px 40px',
              textAlign: 'center'
            }}
          >
            <div style={{ 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              background: GL, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Building2 size={28} color={G} />
            </div>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: TEXT, marginBottom: 8 }}>
              No properties yet
            </h3>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>
              Create your first property to get started with KAYA
            </p>
            <button style={{
              background: G,
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
              + Add Property
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
