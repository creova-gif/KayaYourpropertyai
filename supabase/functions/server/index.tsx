import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================================================
// MIDDLEWARE - Authentication
// ============================================================================

async function requireAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
    return c.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    console.log('Auth error during user verification:', error);
    return c.json({ error: 'Unauthorized - Invalid or expired token' }, { status: 401 });
  }

  // Attach user to context
  c.set('user', user);
  c.set('userId', user.id);
  
  await next();
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get("/make-server-2071350e/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

// Sign up new user
app.post("/make-server-2071350e/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role = 'landlord' } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm email since we haven't configured an email server
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, { status: 400 });
    }

    // Store user profile in KV store
    const userProfile = {
      id: data.user.id,
      email,
      name,
      role,
      verificationStatus: 'email_verified',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subscriptionTier: 'trial', // Start with trial tier
      subscriptionStatus: 'active',
      trialStartDate: new Date().toISOString(), // Track when trial started
      trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      isTrialActive: true,
    };

    await kv.set(`user:${data.user.id}`, userProfile);

    return c.json({ 
      success: true, 
      user: userProfile,
      message: 'Account created successfully. You can now log in.' 
    });

  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, { status: 500 });
  }
});

// Get current session/user
app.get("/make-server-2071350e/auth/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ user: null, session: null });
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ user: null, session: null });
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    return c.json({ 
      user: userProfile || { id: user.id, email: user.email, ...user.user_metadata },
      session: { access_token: accessToken }
    });

  } catch (error) {
    console.log('Session check error:', error);
    return c.json({ user: null, session: null });
  }
});

// Check trial status
app.get("/make-server-2071350e/auth/trial-status", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    // Get user profile from KV store
    const userProfile = await kv.get(`user:${userId}`);
    
    if (!userProfile) {
      return c.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check if trial is still valid
    const now = new Date();
    const trialEndDate = new Date(userProfile.trialEndDate);
    const isTrialExpired = now > trialEndDate;
    const daysRemaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // If trial expired and user still on trial tier, update status
    if (isTrialExpired && userProfile.subscriptionTier === 'trial') {
      const updatedProfile = {
        ...userProfile,
        isTrialActive: false,
        subscriptionStatus: 'trial_expired',
        updatedAt: new Date().toISOString(),
      };
      await kv.set(`user:${userId}`, updatedProfile);
      
      return c.json({ 
        isTrialActive: false,
        trialExpired: true,
        daysRemaining: 0,
        trialEndDate: userProfile.trialEndDate,
        subscriptionTier: userProfile.subscriptionTier,
        message: 'Your 7-day free trial has expired. Please upgrade to continue using KAYA.'
      });
    }

    return c.json({ 
      isTrialActive: !isTrialExpired && userProfile.subscriptionTier === 'trial',
      trialExpired: isTrialExpired,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      trialStartDate: userProfile.trialStartDate,
      trialEndDate: userProfile.trialEndDate,
      subscriptionTier: userProfile.subscriptionTier,
      subscriptionStatus: userProfile.subscriptionStatus,
    });

  } catch (error) {
    console.log('Error checking trial status:', error);
    return c.json({ error: 'Failed to check trial status' }, { status: 500 });
  }
});

// ============================================================================
// USER PROFILE ROUTES
// ============================================================================

// Get user profile
app.get("/make-server-2071350e/users/:userId", requireAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const currentUserId = c.get('userId');

    // Users can only view their own profile (unless admin)
    if (userId !== currentUserId) {
      return c.json({ error: 'Forbidden - Cannot view other user profiles' }, { status: 403 });
    }

    const profile = await kv.get(`user:${userId}`);

    if (!profile) {
      return c.json({ error: 'User profile not found' }, { status: 404 });
    }

    return c.json({ profile });

  } catch (error) {
    console.log('Error fetching user profile:', error);
    return c.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
});

// Update user profile
app.put("/make-server-2071350e/users/:userId", requireAuth, async (c) => {
  try {
    const userId = c.req.param('userId');
    const currentUserId = c.get('userId');
    const body = await c.req.json();

    if (userId !== currentUserId) {
      return c.json({ error: 'Forbidden - Cannot update other user profiles' }, { status: 403 });
    }

    const existingProfile = await kv.get(`user:${userId}`);

    if (!existingProfile) {
      return c.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Update allowed fields
    const updatedProfile = {
      ...existingProfile,
      ...body,
      id: userId, // Prevent ID modification
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, updatedProfile);

    return c.json({ profile: updatedProfile });

  } catch (error) {
    console.log('Error updating user profile:', error);
    return c.json({ error: 'Failed to update profile' }, { status: 500 });
  }
});

// ============================================================================
// PROPERTY ROUTES
// ============================================================================

// Create property
app.post("/make-server-2071350e/properties", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    // Check subscription limits
    const userProfile = await kv.get(`user:${userId}`);
    const subscriptionTier = userProfile?.subscriptionTier || 'free';
    
    // Get user's existing properties
    const userProperties = await kv.getByPrefix(`property:${userId}:`);
    
    // Enforce limits: Free=1, Pro=10, Enterprise=unlimited
    const limits: Record<string, number> = { free: 1, pro: 10, enterprise: 999999 };
    if (userProperties.length >= limits[subscriptionTier]) {
      return c.json({ 
        error: `Property limit reached for ${subscriptionTier} plan. Upgrade to add more properties.`,
        limit: limits[subscriptionTier],
        current: userProperties.length
      }, { status: 403 });
    }

    const propertyId = crypto.randomUUID();
    const property = {
      id: propertyId,
      ownerId: userId,
      ...body,
      verified: false, // Properties start unverified
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`property:${userId}:${propertyId}`, property);

    return c.json({ property }, { status: 201 });

  } catch (error) {
    console.log('Error creating property:', error);
    return c.json({ error: 'Failed to create property' }, { status: 500 });
  }
});

// Get all properties for user (with analytics)
app.get("/make-server-2071350e/properties", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const properties = await kv.getByPrefix(`property:${userId}:`);

    // Calculate portfolio analytics for each property
    const propertiesWithAnalytics = await Promise.all(
      properties.map(async (property: any) => {
        // Get units for this property
        const allUnits = await kv.getByPrefix(`unit:${userId}:`);
        const propertyUnits = allUnits.filter((u: any) => u.propertyId === property.id);
        
        // Calculate occupancy
        const occupiedUnits = propertyUnits.filter((u: any) => u.status === 'occupied').length;
        const availableUnits = propertyUnits.filter((u: any) => u.status === 'available').length;
        const totalUnits = propertyUnits.length;
        const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

        // Calculate revenue
        const totalRevenue = propertyUnits.reduce((sum: number, u: any) => {
          if (u.status === 'occupied') {
            return sum + (u.rentPrice || 0);
          }
          return sum;
        }, 0);

        return {
          ...property,
          analytics: {
            totalUnits,
            occupiedUnits,
            availableUnits,
            vacantUnits: totalUnits - occupiedUnits,
            occupancyRate: Math.round(occupancyRate),
            monthlyRevenue: totalRevenue,
          },
        };
      })
    );

    return c.json({ properties: propertiesWithAnalytics });

  } catch (error) {
    console.log('Error fetching properties:', error);
    return c.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
});

// Get single property
app.get("/make-server-2071350e/properties/:propertyId", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');

    const property = await kv.get(`property:${userId}:${propertyId}`);

    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    return c.json({ property });

  } catch (error) {
    console.log('Error fetching property:', error);
    return c.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
});

// Update property
app.put("/make-server-2071350e/properties/:propertyId", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    const existingProperty = await kv.get(`property:${userId}:${propertyId}`);

    if (!existingProperty) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    const updatedProperty = {
      ...existingProperty,
      ...body,
      id: propertyId,
      ownerId: userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`property:${userId}:${propertyId}`, updatedProperty);

    return c.json({ property: updatedProperty });

  } catch (error) {
    console.log('Error updating property:', error);
    return c.json({ error: 'Failed to update property' }, { status: 500 });
  }
});

// Delete property
app.delete("/make-server-2071350e/properties/:propertyId", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');

    await kv.del(`property:${userId}:${propertyId}`);

    return c.json({ success: true, message: 'Property deleted' });

  } catch (error) {
    console.log('Error deleting property:', error);
    return c.json({ error: 'Failed to delete property' }, { status: 500 });
  }
});

// ============================================================================
// UNIT ROUTES
// ============================================================================

// Create unit
app.post("/make-server-2071350e/properties/:propertyId/units", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    // Verify property ownership
    const property = await kv.get(`property:${userId}:${propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    const unitId = crypto.randomUUID();
    const unit = {
      id: unitId,
      propertyId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`unit:${userId}:${propertyId}:${unitId}`, unit);

    return c.json({ unit }, { status: 201 });

  } catch (error) {
    console.log('Error creating unit:', error);
    return c.json({ error: 'Failed to create unit' }, { status: 500 });
  }
});

// Get all units for a property
app.get("/make-server-2071350e/properties/:propertyId/units", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');

    const units = await kv.getByPrefix(`unit:${userId}:${propertyId}:`);

    return c.json({ units });

  } catch (error) {
    console.log('Error fetching units:', error);
    return c.json({ error: 'Failed to fetch units' }, { status: 500 });
  }
});

// ============================================================================
// BUILDING ROUTES (Multi-Building Support)
// ============================================================================

// Create building
app.post("/make-server-2071350e/properties/:propertyId/buildings", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    // Verify property ownership
    const property = await kv.get(`property:${userId}:${propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    const buildingId = crypto.randomUUID();
    const building = {
      id: buildingId,
      propertyId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`building:${userId}:${propertyId}:${buildingId}`, building);

    return c.json({ building }, { status: 201 });

  } catch (error) {
    console.log('Error creating building:', error);
    return c.json({ error: 'Failed to create building' }, { status: 500 });
  }
});

// Get all buildings for a property
app.get("/make-server-2071350e/properties/:propertyId/buildings", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');

    const buildings = await kv.getByPrefix(`building:${userId}:${propertyId}:`);

    return c.json({ buildings });

  } catch (error) {
    console.log('Error fetching buildings:', error);
    return c.json({ error: 'Failed to fetch buildings' }, { status: 500 });
  }
});

// ============================================================================
// AMENITIES ROUTES
// ============================================================================

// Add amenity to property
app.post("/make-server-2071350e/properties/:propertyId/amenities", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    // Verify property ownership
    const property = await kv.get(`property:${userId}:${propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    // Get existing amenities or create new array
    const existingAmenities = property.amenities || [];
    const updatedAmenities = [...existingAmenities, ...body.amenities];

    // Update property with new amenities
    const updatedProperty = {
      ...property,
      amenities: updatedAmenities,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`property:${userId}:${propertyId}`, updatedProperty);

    return c.json({ amenities: updatedAmenities });

  } catch (error) {
    console.log('Error adding amenities:', error);
    return c.json({ error: 'Failed to add amenities' }, { status: 500 });
  }
});

// ============================================================================
// VERIFICATION ROUTES
// ============================================================================

// Submit property for verification
app.post("/make-server-2071350e/properties/:propertyId/verify", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    const property = await kv.get(`property:${userId}:${propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    // Create verification record
    const verificationId = crypto.randomUUID();
    const verification = {
      id: verificationId,
      propertyId,
      userId,
      documents: {
        governmentId: body.governmentId || false,
        propertyTax: body.propertyTax || false,
        titleDeed: body.titleDeed || false,
        utilityBill: body.utilityBill || false,
      },
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
      notes: body.notes || '',
    };

    await kv.set(`verification:${userId}:${propertyId}:${verificationId}`, verification);

    // Update property verification status
    const updatedProperty = {
      ...property,
      verificationStatus: 'under_review',
      verificationId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`property:${userId}:${propertyId}`, updatedProperty);

    return c.json({ verification });

  } catch (error) {
    console.log('Error submitting verification:', error);
    return c.json({ error: 'Failed to submit verification' }, { status: 500 });
  }
});

// ============================================================================
// BULK IMPORT ROUTES
// ============================================================================

// Bulk import units via CSV data
app.post("/make-server-2071350e/properties/:propertyId/bulk-import", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const propertyId = c.req.param('propertyId');
    const body = await c.req.json();

    // Verify property ownership
    const property = await kv.get(`property:${userId}:${propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, { status: 404 });
    }

    const { units } = body; // Array of unit objects

    if (!Array.isArray(units) || units.length === 0) {
      return c.json({ error: 'Units array is required' }, { status: 400 });
    }

    // Create all units
    const createdUnits = [];
    for (const unitData of units) {
      const unitId = crypto.randomUUID();
      const unit = {
        id: unitId,
        propertyId,
        ...unitData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await kv.set(`unit:${userId}:${propertyId}:${unitId}`, unit);
      createdUnits.push(unit);
    }

    return c.json({ 
      success: true, 
      imported: createdUnits.length,
      units: createdUnits 
    });

  } catch (error) {
    console.log('Error bulk importing units:', error);
    return c.json({ error: 'Failed to import units' }, { status: 500 });
  }
});

// ============================================================================
// ANALYTICS ROUTES
// ============================================================================

// Get dashboard analytics
app.get("/make-server-2071350e/analytics/dashboard", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');

    const properties = await kv.getByPrefix(`property:${userId}:`);
    const applications = await kv.getByPrefix(`application:landlord:${userId}:`);
    const payments = await kv.getByPrefix(`payment:${userId}:`);

    const analytics = {
      totalProperties: properties.length,
      totalUnits: properties.reduce((sum: number, p: any) => sum + (p.totalUnits || 0), 0),
      totalApplications: applications.length,
      pendingApplications: applications.filter((a: any) => a.status === 'submitted' || a.status === 'landlord_review').length,
      totalRevenue: payments
        .filter((p: any) => p.status === 'completed')
        .reduce((sum: number, p: any) => sum + p.amount, 0),
      pendingPayments: payments.filter((p: any) => p.status === 'pending').length,
    };

    return c.json({ analytics });

  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
});

// ============================================================================
// CONTRACTOR MARKETPLACE ROUTES
// ============================================================================

// Register contractor
app.post("/make-server-2071350e/contractors/register", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    const contractorId = crypto.randomUUID();
    const contractor = {
      id: contractorId,
      userId,
      ...body,
      rating: 0,
      jobsCompleted: 0,
      verified: false,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`contractor:${contractorId}`, contractor);
    await kv.set(`contractor:user:${userId}`, contractorId); // Link user to contractor

    return c.json({ contractor }, { status: 201 });

  } catch (error) {
    console.log('Error registering contractor:', error);
    return c.json({ error: 'Failed to register contractor' }, { status: 500 });
  }
});

// Get all contractors (for marketplace browsing)
app.get("/make-server-2071350e/contractors", async (c) => {
  try {
    const trade = c.req.query('trade');
    const radius = c.req.query('radius');
    const verified = c.req.query('verified');

    let contractors = await kv.getByPrefix(`contractor:`);
    
    // Filter out user mappings
    contractors = contractors.filter((c: any) => c.name);

    // Filter by trade
    if (trade) {
      contractors = contractors.filter((c: any) => c.trade?.toLowerCase() === trade.toLowerCase());
    }

    // Filter verified only
    if (verified === 'true') {
      contractors = contractors.filter((c: any) => c.verified === true);
    }

    // Sort by rating
    contractors.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));

    return c.json({ contractors });

  } catch (error) {
    console.log('Error fetching contractors:', error);
    return c.json({ error: 'Failed to fetch contractors' }, { status: 500 });
  }
});

// Get single contractor
app.get("/make-server-2071350e/contractors/:contractorId", async (c) => {
  try {
    const contractorId = c.req.param('contractorId');
    const contractor = await kv.get(`contractor:${contractorId}`);

    if (!contractor) {
      return c.json({ error: 'Contractor not found' }, { status: 404 });
    }

    // Get recent jobs for this contractor
    const allJobs = await kv.getByPrefix(`job:`);
    const contractorJobs = allJobs.filter((j: any) => 
      j.assignedContractorId === contractorId && j.status === 'completed'
    ).slice(0, 10);

    return c.json({ contractor, recentJobs: contractorJobs });

  } catch (error) {
    console.log('Error fetching contractor:', error);
    return c.json({ error: 'Failed to fetch contractor' }, { status: 500 });
  }
});

// Verify contractor
app.post("/make-server-2071350e/contractors/:contractorId/verify", requireAuth, async (c) => {
  try {
    const contractorId = c.req.param('contractorId');
    const body = await c.req.json();

    const contractor = await kv.get(`contractor:${contractorId}`);
    if (!contractor) {
      return c.json({ error: 'Contractor not found' }, { status: 404 });
    }

    // Create verification record
    const verificationId = crypto.randomUUID();
    const verification = {
      id: verificationId,
      contractorId,
      documents: {
        governmentId: body.governmentId || false,
        tradeLicense: body.tradeLicense || false,
        insurance: body.insurance || false,
        backgroundCheck: body.backgroundCheck || false,
      },
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
    };

    await kv.set(`contractor:verification:${contractorId}`, verification);

    // Update contractor status
    const updatedContractor = {
      ...contractor,
      verificationStatus: 'under_review',
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`contractor:${contractorId}`, updatedContractor);

    return c.json({ verification });

  } catch (error) {
    console.log('Error verifying contractor:', error);
    return c.json({ error: 'Failed to verify contractor' }, { status: 500 });
  }
});

// ============================================================================
// JOB ROUTES (Contractor Jobs)
// ============================================================================

// Create job
app.post("/make-server-2071350e/jobs", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    const jobId = crypto.randomUUID();
    
    // AI Classification (simplified for demo)
    const aiCategory = body.title?.toLowerCase().includes('leak') ? 'plumbing' :
                       body.title?.toLowerCase().includes('heat') ? 'hvac' :
                       body.title?.toLowerCase().includes('electric') ? 'electrical' :
                       body.category || 'general';

    const aiPriority = body.urgency === 'emergency' ? 'high' :
                       body.urgency === 'high' ? 'medium' : 'low';

    const aiEstimatedCost = aiCategory === 'plumbing' ? { min: 120, max: 350 } :
                            aiCategory === 'hvac' ? { min: 200, max: 600 } :
                            aiCategory === 'electrical' ? { min: 150, max: 400 } :
                            { min: 100, max: 300 };

    const job = {
      id: jobId,
      landlordId: userId,
      ...body,
      category: aiCategory,
      priority: aiPriority,
      estimatedCost: aiEstimatedCost,
      status: 'open',
      applicationsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`job:${userId}:${jobId}`, job);

    return c.json({ job }, { status: 201 });

  } catch (error) {
    console.log('Error creating job:', error);
    return c.json({ error: 'Failed to create job' }, { status: 500 });
  }
});

// Get all jobs (landlord view)
app.get("/make-server-2071350e/jobs", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const status = c.req.query('status');

    let jobs = await kv.getByPrefix(`job:${userId}:`);

    if (status) {
      jobs = jobs.filter((j: any) => j.status === status);
    }

    return c.json({ jobs });

  } catch (error) {
    console.log('Error fetching jobs:', error);
    return c.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
});

// Get available jobs (contractor view)
app.get("/make-server-2071350e/jobs/marketplace", requireAuth, async (c) => {
  try {
    const category = c.req.query('category');
    
    // Get all open jobs
    const allJobs = await kv.getByPrefix(`job:`);
    let openJobs = allJobs.filter((j: any) => j.status === 'open');

    // Filter by category if specified
    if (category) {
      openJobs = openJobs.filter((j: any) => j.category === category);
    }

    // Sort by urgency and date
    openJobs.sort((a: any, b: any) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ jobs: openJobs });

  } catch (error) {
    console.log('Error fetching marketplace jobs:', error);
    return c.json({ error: 'Failed to fetch marketplace jobs' }, { status: 500 });
  }
});

// Get single job
app.get("/make-server-2071350e/jobs/:jobId", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const jobId = c.req.param('jobId');

    const job = await kv.get(`job:${userId}:${jobId}`);

    if (!job) {
      // Try to find in all jobs (for contractors)
      const allJobs = await kv.getByPrefix(`job:`);
      const foundJob = allJobs.find((j: any) => j.id === jobId);
      
      if (!foundJob) {
        return c.json({ error: 'Job not found' }, { status: 404 });
      }

      return c.json({ job: foundJob });
    }

    // Get applications for this job
    const applications = await kv.getByPrefix(`job:application:${jobId}:`);

    return c.json({ job, applications });

  } catch (error) {
    console.log('Error fetching job:', error);
    return c.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
});

// ============================================================================
// JOB APPLICATION ROUTES
// ============================================================================

// Apply for job (contractor)
app.post("/make-server-2071350e/jobs/:jobId/apply", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const jobId = c.req.param('jobId');
    const body = await c.req.json();

    // Get contractor ID for this user
    const contractorId = await kv.get(`contractor:user:${userId}`);
    if (!contractorId) {
      return c.json({ error: 'User is not registered as a contractor' }, { status: 403 });
    }

    const applicationId = crypto.randomUUID();
    const application = {
      id: applicationId,
      jobId,
      contractorId,
      ...body,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    await kv.set(`job:application:${jobId}:${applicationId}`, application);

    // Update job applications count
    const allJobs = await kv.getByPrefix(`job:`);
    const job = allJobs.find((j: any) => j.id === jobId);
    
    if (job) {
      const jobKey = Object.keys(await kv.getByPrefix(`job:`))
        .find(key => key.includes(jobId));
      
      if (jobKey) {
        const updatedJob = {
          ...job,
          applicationsCount: (job.applicationsCount || 0) + 1,
          updatedAt: new Date().toISOString(),
        };
        await kv.set(jobKey, updatedJob);
      }
    }

    return c.json({ application }, { status: 201 });

  } catch (error) {
    console.log('Error applying for job:', error);
    return c.json({ error: 'Failed to apply for job' }, { status: 500 });
  }
});

// Accept contractor (landlord assigns job)
app.post("/make-server-2071350e/jobs/:jobId/assign", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const jobId = c.req.param('jobId');
    const body = await c.req.json();

    const job = await kv.get(`job:${userId}:${jobId}`);
    if (!job) {
      return c.json({ error: 'Job not found' }, { status: 404 });
    }

    // Update job with assigned contractor
    const updatedJob = {
      ...job,
      status: 'assigned',
      assignedContractorId: body.contractorId,
      assignedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`job:${userId}:${jobId}`, updatedJob);

    // Update application status
    const applications = await kv.getByPrefix(`job:application:${jobId}:`);
    for (const app of applications) {
      const appKey = `job:application:${jobId}:${app.id}`;
      if (app.contractorId === body.contractorId) {
        await kv.set(appKey, { ...app, status: 'accepted' });
      } else {
        await kv.set(appKey, { ...app, status: 'rejected' });
      }
    }

    return c.json({ job: updatedJob });

  } catch (error) {
    console.log('Error assigning job:', error);
    return c.json({ error: 'Failed to assign job' }, { status: 500 });
  }
});

// Complete job
app.post("/make-server-2071350e/jobs/:jobId/complete", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const jobId = c.req.param('jobId');
    const body = await c.req.json();

    const job = await kv.get(`job:${userId}:${jobId}`);
    if (!job) {
      return c.json({ error: 'Job not found' }, { status: 404 });
    }

    // Create completion record
    const completionId = crypto.randomUUID();
    const completion = {
      id: completionId,
      jobId,
      contractorId: job.assignedContractorId,
      actualCost: body.actualCost,
      notes: body.notes || '',
      photos: body.photos || [],
      completedAt: new Date().toISOString(),
    };

    await kv.set(`job:completion:${jobId}`, completion);

    // Update job status
    const updatedJob = {
      ...job,
      status: 'completed',
      actualCost: body.actualCost,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`job:${userId}:${jobId}`, updatedJob);

    return c.json({ job: updatedJob, completion });

  } catch (error) {
    console.log('Error completing job:', error);
    return c.json({ error: 'Failed to complete job' }, { status: 500 });
  }
});

// Rate contractor
app.post("/make-server-2071350e/jobs/:jobId/rate", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const jobId = c.req.param('jobId');
    const body = await c.req.json();

    const job = await kv.get(`job:${userId}:${jobId}`);
    if (!job || job.status !== 'completed') {
      return c.json({ error: 'Job not found or not completed' }, { status: 404 });
    }

    // Add rating to job
    const updatedJob = {
      ...job,
      rating: body.rating,
      review: body.review,
      ratedAt: new Date().toISOString(),
    };

    await kv.set(`job:${userId}:${jobId}`, updatedJob);

    // Update contractor's overall rating
    const contractor = await kv.get(`contractor:${job.assignedContractorId}`);
    if (contractor) {
      const currentRating = contractor.rating || 0;
      const currentJobs = contractor.jobsCompleted || 0;
      const newRating = ((currentRating * currentJobs) + body.rating) / (currentJobs + 1);

      const updatedContractor = {
        ...contractor,
        rating: Math.round(newRating * 10) / 10, // Round to 1 decimal
        jobsCompleted: currentJobs + 1,
        updatedAt: new Date().toISOString(),
      };

      await kv.set(`contractor:${job.assignedContractorId}`, updatedContractor);
    }

    return c.json({ job: updatedJob });

  } catch (error) {
    console.log('Error rating contractor:', error);
    return c.json({ error: 'Failed to rate contractor' }, { status: 500 });
  }
});

// ============================================================================
// MARKETPLACE ANALYTICS
// ============================================================================

// Get maintenance analytics
app.get("/make-server-2071350e/analytics/maintenance", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');

    const jobs = await kv.getByPrefix(`job:${userId}:`);

    const analytics = {
      total: jobs.length,
      open: jobs.filter((j: any) => j.status === 'open').length,
      assigned: jobs.filter((j: any) => j.status === 'assigned').length,
      inProgress: jobs.filter((j: any) => j.status === 'in_progress').length,
      completed: jobs.filter((j: any) => j.status === 'completed').length,
      averageCost: jobs
        .filter((j: any) => j.actualCost)
        .reduce((sum: number, j: any, _, arr) => sum + (j.actualCost / arr.length), 0),
      byCategory: jobs.reduce((acc: any, j: any) => {
        acc[j.category] = (acc[j.category] || 0) + 1;
        return acc;
      }, {}),
      totalSpent: jobs
        .filter((j: any) => j.actualCost)
        .reduce((sum: number, j: any) => sum + j.actualCost, 0),
    };

    return c.json({ analytics });

  } catch (error) {
    console.log('Error fetching maintenance analytics:', error);
    return c.json({ error: 'Failed to fetch maintenance analytics' }, { status: 500 });
  }
});

// ============================================================================
// NOTIFICATION ROUTES
// ============================================================================

// Get all notifications for a user
app.get("/make-server-2071350e/notifications/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const notifications = await kv.getByPrefix(`notification:${userId}:`);
    
    // Sort by timestamp (newest first)
    const sortedNotifications = notifications.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json({ notifications: sortedNotifications });
  } catch (error) {
    console.log('Error fetching notifications:', error);
    return c.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
});

// Get unread notification count
app.get("/make-server-2071350e/notifications/:userId/unread-count", async (c) => {
  try {
    const userId = c.req.param('userId');
    const notifications = await kv.getByPrefix(`notification:${userId}:`);
    const unreadCount = notifications.filter((n: any) => !n.read).length;

    return c.json({ count: unreadCount });
  } catch (error) {
    console.log('Error fetching unread count:', error);
    return c.json({ error: 'Failed to fetch unread count' }, { status: 500 });
  }
});

// Mark notification as read
app.put("/make-server-2071350e/notifications/:notificationId/read", async (c) => {
  try {
    const notificationId = c.req.param('notificationId');
    
    // Find the notification by searching all user notifications
    const allNotifications = await kv.getByPrefix(`notification:`);
    const notification = allNotifications.find((n: any) => n.id === notificationId);
    
    if (!notification) {
      return c.json({ error: 'Notification not found' }, { status: 404 });
    }

    const updatedNotification = { ...notification, read: true };
    await kv.set(`notification:${notification.userId}:${notificationId}`, updatedNotification);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error marking notification as read:', error);
    return c.json({ error: 'Failed to mark notification as read' }, { status: 500 });
  }
});

// Mark all notifications as read
app.put("/make-server-2071350e/notifications/:userId/read-all", async (c) => {
  try {
    const userId = c.req.param('userId');
    const notifications = await kv.getByPrefix(`notification:${userId}:`);

    const updatePromises = notifications.map((notification: any) => {
      const updatedNotification = { ...notification, read: true };
      return kv.set(`notification:${userId}:${notification.id}`, updatedNotification);
    });

    await Promise.all(updatePromises);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error marking all notifications as read:', error);
    return c.json({ error: 'Failed to mark all notifications as read' }, { status: 500 });
  }
});

// Delete notification
app.delete("/make-server-2071350e/notifications/:notificationId", async (c) => {
  try {
    const notificationId = c.req.param('notificationId');
    
    const allNotifications = await kv.getByPrefix(`notification:`);
    const notification = allNotifications.find((n: any) => n.id === notificationId);
    
    if (!notification) {
      return c.json({ error: 'Notification not found' }, { status: 404 });
    }

    await kv.del(`notification:${notification.userId}:${notificationId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting notification:', error);
    return c.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
});

// Create new notification
app.post("/make-server-2071350e/notifications", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, type, title, message, priority, actionUrl, metadata } = body;

    if (!userId || !type || !title || !message) {
      return c.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const notificationId = crypto.randomUUID();
    const notification = {
      id: notificationId,
      userId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      priority: priority || 'medium',
      actionUrl,
      metadata,
    };

    await kv.set(`notification:${userId}:${notificationId}`, notification);

    return c.json({ success: true, notification });
  } catch (error) {
    console.log('Error creating notification:', error);
    return c.json({ error: 'Failed to create notification' }, { status: 500 });
  }
});

// ============================================================================
// MESSAGING ROUTES (Unread Count)
// ============================================================================

// Get unread message count
app.get("/make-server-2071350e/messages/unread-count", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    // Get all conversations where this user is a participant
    const allMessages = await kv.getByPrefix(`message:`);
    const unreadCount = allMessages.filter((m: any) => 
      m.recipientId === userId && m.read === false
    ).length;

    return c.json({ count: unreadCount });
  } catch (error) {
    console.log('Error fetching unread message count:', error);
    return c.json({ error: 'Failed to fetch unread message count' }, { status: 500 });
  }
});

// ============================================================================
// STRIPE SUBSCRIPTION ROUTES
// ============================================================================

// Create Stripe checkout session for subscription
app.post("/make-server-2071350e/stripe/create-checkout-session", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { priceId, planName } = body;

    if (!priceId || !planName) {
      return c.json({ error: 'Price ID and plan name are required' }, { status: 400 });
    }

    // Get user profile
    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile) {
      return c.json({ error: 'User profile not found' }, { status: 404 });
    }

    const Stripe = (await import('npm:stripe@20')).default;
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2024-12-18.acacia',
    });

    // Create or get Stripe customer
    let customerId = userProfile.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userProfile.email,
        metadata: {
          userId: userId,
          name: userProfile.name,
        },
      });
      customerId = customer.id;
      
      // Save customer ID to user profile
      await kv.set(`user:${userId}`, {
        ...userProfile,
        stripeCustomerId: customerId,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${c.req.header('origin') || 'http://localhost:5173'}/settings?subscription=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${c.req.header('origin') || 'http://localhost:5173'}/pricing?subscription=cancelled`,
      metadata: {
        userId: userId,
        planName: planName,
      },
    });

    return c.json({ sessionId: session.id, url: session.url });

  } catch (error) {
    console.log('Error creating Stripe checkout session:', error);
    return c.json({ error: 'Failed to create checkout session', details: error.message }, { status: 500 });
  }
});

// Create Stripe portal session for subscription management
app.post("/make-server-2071350e/stripe/create-portal-session", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile || !userProfile.stripeCustomerId) {
      return c.json({ error: 'No active subscription found' }, { status: 404 });
    }

    const Stripe = (await import('npm:stripe@20')).default;
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2024-12-18.acacia',
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: userProfile.stripeCustomerId,
      return_url: `${c.req.header('origin') || 'http://localhost:5173'}/settings`,
    });

    return c.json({ url: session.url });

  } catch (error) {
    console.log('Error creating Stripe portal session:', error);
    return c.json({ error: 'Failed to create portal session', details: error.message }, { status: 500 });
  }
});

// Stripe webhook handler
app.post("/make-server-2071350e/stripe/webhook", async (c) => {
  try {
    const Stripe = (await import('npm:stripe@20')).default;
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2024-12-18.acacia',
    });

    const sig = c.req.header('stripe-signature');
    const body = await c.req.text();
    
    let event;
    
    try {
      // In production, you should set STRIPE_WEBHOOK_SECRET
      const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
      } else {
        // For testing without webhook secret
        event = JSON.parse(body);
      }
    } catch (err) {
      console.log('Webhook signature verification failed:', err);
      return c.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planName = session.metadata?.planName;

        if (userId) {
          const userProfile = await kv.get(`user:${userId}`);
          if (userProfile) {
            await kv.set(`user:${userId}`, {
              ...userProfile,
              subscriptionTier: planName.toLowerCase(),
              subscriptionStatus: 'active',
              stripeSubscriptionId: session.subscription,
              updatedAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (customer && !customer.deleted) {
          const userId = customer.metadata?.userId;
          
          if (userId) {
            const userProfile = await kv.get(`user:${userId}`);
            if (userProfile) {
              await kv.set(`user:${userId}`, {
                ...userProfile,
                subscriptionStatus: subscription.status,
                updatedAt: new Date().toISOString(),
              });
            }
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (customer && !customer.deleted) {
          const userId = customer.metadata?.userId;
          
          if (userId) {
            const userProfile = await kv.get(`user:${userId}`);
            if (userProfile) {
              await kv.set(`user:${userId}`, {
                ...userProfile,
                subscriptionTier: 'free',
                subscriptionStatus: 'cancelled',
                stripeSubscriptionId: null,
                updatedAt: new Date().toISOString(),
              });
            }
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });

  } catch (error) {
    console.log('Webhook error:', error);
    return c.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
});

// ============================================================================
// PROPERTY LISTINGS ROUTES
// ============================================================================

// Get all listings
app.get("/make-server-2071350e/listings", async (c) => {
  try {
    const listings = await kv.getByPrefix("listing:");
    return c.json({ 
      success: true, 
      listings: listings.map(l => l.value) 
    });
  } catch (error) {
    console.log('Error fetching listings:', error);
    return c.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
});

// Create new listing
app.post("/make-server-2071350e/listings", async (c) => {
  try {
    const listing = await c.req.json();
    
    if (!listing.id) {
      listing.id = Date.now().toString();
    }
    
    await kv.set(`listing:${listing.id}`, listing);
    
    return c.json({ 
      success: true, 
      listing 
    });
  } catch (error) {
    console.log('Error creating listing:', error);
    return c.json({ error: 'Failed to create listing' }, { status: 500 });
  }
});

// Delete listing
app.delete("/make-server-2071350e/listings/:id", async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`listing:${id}`);
    
    return c.json({ 
      success: true, 
      message: 'Listing deleted' 
    });
  } catch (error) {
    console.log('Error deleting listing:', error);
    return c.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
});

// ============================================================================
// CLAUDE AI ROUTES
// ============================================================================

// AI Rent Estimate
app.post("/make-server-2071350e/ai/rent-estimate", async (c) => {
  try {
    const body = await c.req.json();
    const { address, city, province, bedrooms, bathrooms, sqft, amenities } = body;

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    const prompt = `You are a Canadian real estate expert. Analyze this rental property and provide a detailed rent estimate.

Property Details:
- Address: ${address}, ${city}, ${province}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Square Feet: ${sqft}
- Amenities: ${amenities?.join(', ') || 'None specified'}

Please provide:
1. Estimated monthly rent range (low and high)
2. Key factors affecting the price
3. Market comparison insights
4. Recommendations for landlords or tenants

Format your response in JSON with this structure:
{
  "estimatedRent": { "low": number, "high": number },
  "averageRent": number,
  "confidence": "high" | "medium" | "low",
  "factors": [string],
  "marketInsights": string,
  "recommendations": string
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      estimatedRent: { low: 1500, high: 2500 },
      averageRent: 2000,
      confidence: "medium",
      factors: ["Location", "Size", "Amenities"],
      marketInsights: "Market analysis unavailable",
      recommendations: "Please provide more property details"
    };

    return c.json({ success: true, analysis });

  } catch (error) {
    console.log('AI rent estimate error:', error);
    return c.json({ error: 'Failed to generate rent estimate', details: error.message }, { status: 500 });
  }
});

// AI Compare Listings
app.post("/make-server-2071350e/ai/compare-listings", async (c) => {
  try {
    const body = await c.req.json();
    const { listings } = body;

    if (!listings || listings.length < 2) {
      return c.json({ error: 'At least 2 listings required for comparison' }, { status: 400 });
    }

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    const listingsText = listings.map((l: any, i: number) => `
Listing ${i + 1}:
- Title: ${l.title}
- Price: $${l.price}/month
- Location: ${l.address}, ${l.city}
- Bedrooms: ${l.beds}
- Bathrooms: ${l.baths}
- Square Feet: ${l.sqft}
- Tags: ${l.tags?.map((t: any) => t.label).join(', ')}
    `).join('\n');

    const prompt = `You are a Canadian real estate expert helping a tenant compare rental properties. Analyze these listings and provide a detailed comparison.

${listingsText}

Please provide:
1. Best overall value
2. Pros and cons for each listing
3. Which listing is best for different tenant profiles (budget-conscious, luxury-seeking, family, etc.)
4. Red flags or concerns
5. Final recommendation

Format your response in JSON with this structure:
{
  "bestValue": number (listing index),
  "comparisons": [
    {
      "listingIndex": number,
      "pros": [string],
      "cons": [string],
      "valueScore": number (1-10)
    }
  ],
  "recommendations": {
    "budgetConscious": number,
    "luxurySeeking": number,
    "family": number
  },
  "redFlags": [string],
  "summary": string
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const comparison = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      bestValue: 0,
      comparisons: [],
      recommendations: {},
      redFlags: [],
      summary: "Comparison unavailable"
    };

    return c.json({ success: true, comparison });

  } catch (error) {
    console.log('AI comparison error:', error);
    return c.json({ error: 'Failed to compare listings', details: error.message }, { status: 500 });
  }
});

// AI Explain Lease Terms
app.post("/make-server-2071350e/ai/explain-lease", async (c) => {
  try {
    const body = await c.req.json();
    const { question, leaseText, province } = body;

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    const prompt = question 
      ? `You are a Canadian tenant rights expert. Answer this question about lease terms in ${province || 'Canada'}:

Question: ${question}

${leaseText ? `Lease Context: ${leaseText}` : ''}

Provide a clear, helpful explanation in plain language. Include relevant tenant rights and landlord obligations under Canadian/provincial law.`
      : `You are a Canadian tenant rights expert. Explain common lease terms and tenant rights in ${province || 'Canada'}.

Provide:
1. Key lease terms explained in plain language
2. Tenant rights and protections
3. Landlord obligations
4. Red flags to watch for
5. Tips for first-time renters

Format as JSON:
{
  "explanation": string,
  "keyTerms": [{ "term": string, "definition": string }],
  "tenantRights": [string],
  "landlordObligations": [string],
  "redFlags": [string],
  "tips": [string]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    if (question) {
      return c.json({ success: true, explanation: responseText });
    } else {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const leaseGuide = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        explanation: responseText,
        keyTerms: [],
        tenantRights: [],
        landlordObligations: [],
        redFlags: [],
        tips: []
      };
      return c.json({ success: true, leaseGuide });
    }

  } catch (error) {
    console.log('AI lease explanation error:', error);
    return c.json({ error: 'Failed to explain lease terms', details: error.message }, { status: 500 });
  }
});

// AI General Chat (for AIAssistant sidebar and Premium page) - ENHANCED
app.post("/make-server-2071350e/ai/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { message, context, conversationHistory, pageContext, userId } = body;

    // Save conversation to KV store if userId provided (conversation memory)
    if (userId && userId !== 'demo-user') {
      const conversationId = `conversation:${userId}:${Date.now()}`;
      await kv.set(conversationId, {
        userId,
        message,
        context,
        pageContext,
        timestamp: new Date().toISOString(),
      });
    }

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    // Build conversation messages
    const messages = [];
    
    // Add conversation history if provided
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      });
    }
    
    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // ENHANCED SYSTEM PROMPT with comprehensive Canadian landlord context
    const systemPrompt = `You are KAYA AI, an expert assistant for Canadian landlords and property managers powered by Claude 3.5 Sonnet. You are specifically trained on:

📚 EXPERTISE AREAS:
1. Canadian Residential Tenancies Act (RTA) and all provincial tenant laws across Canada
2. Landlord and Tenant Board (LTB) procedures, forms (N4, N5, N7, N12, L1, L2, etc.), and hearing processes
3. Property management best practices and optimization strategies
4. Advanced tenant screening, risk assessment, and application evaluation
5. Lease agreements, legal compliance, and contractual obligations
6. Rent collection, arrears management, and financial planning
7. Maintenance coordination and contractor management
8. Canadian tax implications for rental properties
9. Multi-province compliance (BC, AB, SK, MB, ON, QC, NB, NS, PE, NL)

🎯 YOUR ROLE:
- Provide accurate, actionable, and professional advice
- Reference specific laws, regulations, and LTB decisions when applicable
- Be concise but thorough - aim for clarity and practical application
- Use Canadian terminology (e.g., "tenant" not "renter", "LTB" not "court")
- Consider both landlord rights AND tenant protections
- Flag potential legal risks and suggest compliant alternatives
- Provide step-by-step guidance when appropriate

${pageContext ? `\n📍 CURRENT CONTEXT: The user is on the "${pageContext}" page of KAYA platform.\nProvide responses relevant to this context when applicable.` : ''}

${context ? `\n💡 ADDITIONAL CONTEXT: ${context}` : ''}

Remember: You're not just answering questions - you're helping landlords run better, more compliant, and more profitable rental businesses across Canada.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    // Save AI response to conversation history (memory)
    if (userId && userId !== 'demo-user') {
      const responseId = `conversation:${userId}:response:${Date.now()}`;
      await kv.set(responseId, {
        userId,
        response: responseText,
        timestamp: new Date().toISOString(),
      });
    }

    return c.json({ 
      success: true, 
      response: responseText,
      messageId: Date.now().toString()
    });

  } catch (error) {
    console.log('AI chat error:', error);
    return c.json({ error: 'Failed to process chat message', details: error.message }, { status: 500 });
  }
});

// AI Voice Commands - ENHANCED with context awareness
app.post("/make-server-2071350e/ai/voice-command", async (c) => {
  try {
    const body = await c.req.json();
    const { command, userId, userContext } = body;

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    // Get user's data context if userId provided (makes AI smarter)
    let contextualInfo = '';
    if (userId && userId !== 'demo-user') {
      try {
        const properties = await kv.getByPrefix(`property:${userId}:`);
        const applications = await kv.getByPrefix(`application:landlord:${userId}:`);
        const payments = await kv.getByPrefix(`payment:${userId}:`);
        
        const pendingApps = applications.filter((a: any) => a.status === 'submitted' || a.status === 'landlord_review').length;
        const completedPayments = payments.filter((p: any) => p.status === 'completed');
        const totalRevenue = completedPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
        
        contextualInfo = `
USER DATA CONTEXT (Real-time from database):
- Total Properties: ${properties.length}
- Pending Applications: ${pendingApps}
- Total Revenue (All-time): $${totalRevenue.toLocaleString()}
- Recent Payments: ${payments.length}
`;
      } catch (e) {
        console.log('Could not fetch user context:', e);
      }
    }

    const systemPrompt = `You are KAYA Voice AI, an intelligent voice assistant for Canadian landlords and property managers.

🎤 YOUR CAPABILITIES:
When given a voice command, provide:
1. A natural, conversational response (as if speaking to the user)
2. Actionable data and specific insights
3. Suggested follow-up actions
4. Proactive recommendations based on the data

${contextualInfo}

📋 SAMPLE COMMANDS YOU HANDLE:
- "Show me high-risk tenant applications"
- "What's my total revenue this month?"
- "List all maintenance requests"
- "Which properties have vacancies?"
- "Generate an N4 notice for late rent"
- "Summarize LTB hearing requirements"
- "Show me tenants with lease renewals coming up"
- "What's my occupancy rate?"
- "Find contractors for plumbing work"
- "Review my financial performance"

💬 RESPONSE STYLE:
- Conversational and professional (like a helpful assistant)
- Provide specific numbers and data when available
- If you need clarification, ask follow-up questions
- Suggest related actions the user might want to take next
- Use emojis sparingly for visual clarity

${userContext ? `\nUSER CONTEXT: ${userContext}` : ''}

Respond as if you're a knowledgeable assistant speaking directly to the user. Be helpful and proactive.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1200,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: command,
        },
      ],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    return c.json({ 
      success: true, 
      response: responseText,
      transcript: command
    });

  } catch (error) {
    console.log('AI voice command error:', error);
    return c.json({ error: 'Failed to process voice command', details: error.message }, { status: 500 });
  }
});

// AI Tenant Screening
app.post("/make-server-2071350e/ai/screen-tenant", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      tenantName,
      income,
      creditScore,
      employmentStatus,
      rentalHistory,
      references,
      additionalInfo 
    } = body;

    const Anthropic = (await import('npm:@anthropic-ai/sdk@0.32')).default;
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    const prompt = `You are an AI tenant screening expert for Canadian landlords. Analyze this tenant application and provide a detailed risk assessment.

Tenant Information:
- Name: ${tenantName}
- Annual Income: ${income ? `$${income}` : 'Not provided'}
- Credit Score: ${creditScore || 'Not provided'}
- Employment: ${employmentStatus || 'Not provided'}
- Rental History: ${rentalHistory || 'Not provided'}
- References: ${references || 'Not provided'}
- Additional Info: ${additionalInfo || 'None'}

Provide your analysis in JSON format:
{
  "riskScore": number (0-100, where 0 is lowest risk),
  "riskLevel": "low" | "medium" | "high",
  "recommendation": "approve" | "conditional" | "deny",
  "strengths": [string],
  "concerns": [string],
  "redFlags": [string],
  "verificationNeeded": [string],
  "summary": string,
  "incomeToRentRatio": string (if income provided),
  "suggestedActions": [string]
}

Consider Canadian tenant screening best practices and legal requirements.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    const screening = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      riskScore: 50,
      riskLevel: "medium",
      recommendation: "conditional",
      strengths: [],
      concerns: ["Insufficient data for complete analysis"],
      redFlags: [],
      verificationNeeded: ["All information"],
      summary: "Unable to complete screening with provided information",
      suggestedActions: ["Request complete application"]
    };

    return c.json({ success: true, screening });

  } catch (error) {
    console.log('AI tenant screening error:', error);
    return c.json({ error: 'Failed to screen tenant', details: error.message }, { status: 500 });
  }
});

Deno.serve(app.fetch);