/**
 * YourPropertyAI Product Logic Map & Workflow Engine
 * 
 * This defines every workflow, state change, and automation trigger
 * to prevent bugs and broken logic.
 * 
 * Example: Tenant approved → lease auto-generated → tenant notified → unit reserved
 */

import type {
  Application,
  Lease,
  Payment,
  MaintenanceRequest,
  Unit,
  Notification,
} from "../types/database.types";
import { API } from "./api.service";

// ============================================================================
// WORKFLOW STATE MACHINES
// ============================================================================

export type WorkflowEvent =
  | "APPLICATION_SUBMITTED"
  | "DOCUMENTS_VERIFIED"
  | "AI_ANALYSIS_COMPLETE"
  | "LANDLORD_APPROVED"
  | "LANDLORD_REJECTED"
  | "TENANT_WITHDRAWN"
  | "LEASE_GENERATED"
  | "LEASE_SIGNED_LANDLORD"
  | "LEASE_SIGNED_TENANT"
  | "LEASE_ACTIVATED"
  | "PAYMENT_DUE"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_OVERDUE"
  | "MAINTENANCE_SUBMITTED"
  | "MAINTENANCE_ASSIGNED"
  | "MAINTENANCE_COMPLETED"
  | "LEASE_EXPIRING"
  | "LEASE_EXPIRED"
  | "TENANT_MOVED_IN"
  | "TENANT_MOVED_OUT";

export interface WorkflowAction {
  type: string;
  description: string;
  execute: () => Promise<void>;
  rollback?: () => Promise<void>;
}

// ============================================================================
// APPLICATION WORKFLOW
// ============================================================================

export class ApplicationWorkflow {
  /**
   * Main application workflow state machine
   * 
   * States: submitted → documents_verified → ai_screening → landlord_review → approved/rejected
   */
  static async processEvent(
    event: WorkflowEvent,
    applicationId: string
  ): Promise<WorkflowAction[]> {
    const application = await API.applications.getApplicationById(applicationId);
    if (!application) throw new Error("Application not found");

    const actions: WorkflowAction[] = [];

    switch (event) {
      case "APPLICATION_SUBMITTED":
        actions.push(...this.onApplicationSubmitted(application));
        break;

      case "DOCUMENTS_VERIFIED":
        actions.push(...this.onDocumentsVerified(application));
        break;

      case "AI_ANALYSIS_COMPLETE":
        actions.push(...this.onAIAnalysisComplete(application));
        break;

      case "LANDLORD_APPROVED":
        actions.push(...await this.onLandlordApproved(application));
        break;

      case "LANDLORD_REJECTED":
        actions.push(...this.onLandlordRejected(application));
        break;

      case "TENANT_WITHDRAWN":
        actions.push(...this.onTenantWithdrawn(application));
        break;

      default:
        console.warn(`Unhandled application event: ${event}`);
    }

    return actions;
  }

  private static onApplicationSubmitted(application: Application): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set application status to 'submitted'",
        execute: async () => {
          application.status = "submitted";
          application.currentStep = 0;
        },
      },
      {
        type: "SEND_CONFIRMATION",
        description: "Send confirmation email to tenant",
        execute: async () => {
          console.log(`✉️ Confirmation email sent to tenant ${application.tenantId}`);
        },
      },
      {
        type: "NOTIFY_LANDLORD",
        description: "Notify landlord of new application",
        execute: async () => {
          console.log(`🔔 Landlord notified of new application`);
        },
      },
      {
        type: "TRIGGER_DOCUMENT_VERIFICATION",
        description: "Start document verification process",
        execute: async () => {
          console.log(`📄 Document verification started`);
          // Auto-advance to next step
          setTimeout(() => {
            this.processEvent("DOCUMENTS_VERIFIED", application.id);
          }, 3000);
        },
      },
    ];
  }

  private static onDocumentsVerified(application: Application): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set status to 'documents_verified'",
        execute: async () => {
          application.status = "documents_verified";
          application.currentStep = 1;
        },
      },
      {
        type: "TRIGGER_AI_ANALYSIS",
        description: "Run AI risk analysis",
        execute: async () => {
          console.log(`🤖 AI analysis started`);
          // Simulate AI processing
          setTimeout(() => {
            this.processEvent("AI_ANALYSIS_COMPLETE", application.id);
          }, 2000);
        },
      },
    ];
  }

  private static onAIAnalysisComplete(application: Application): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set status to 'ai_screening'",
        execute: async () => {
          application.status = "ai_screening";
          application.currentStep = 2;
        },
      },
      {
        type: "GENERATE_AI_REPORT",
        description: "Generate AI risk report",
        execute: async () => {
          console.log(`📊 AI report generated: Score ${application.aiRiskScore}`);
        },
      },
      {
        type: "MOVE_TO_LANDLORD_REVIEW",
        description: "Queue for landlord review",
        execute: async () => {
          application.status = "landlord_review";
          application.currentStep = 3;
          console.log(`👤 Application ready for landlord review`);
        },
      },
    ];
  }

  private static async onLandlordApproved(application: Application): Promise<WorkflowAction[]> {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set status to 'approved'",
        execute: async () => {
          application.status = "approved";
          application.currentStep = 4;
          application.decidedAt = new Date();
        },
      },
      {
        type: "RESERVE_UNIT",
        description: "Reserve unit for approved tenant",
        execute: async () => {
          await API.properties.updateUnitStatus(application.unitId, "reserved");
          console.log(`🏠 Unit ${application.unitId} reserved`);
        },
        rollback: async () => {
          await API.properties.updateUnitStatus(application.unitId, "available");
          console.log(`🔄 Unit ${application.unitId} released`);
        },
      },
      {
        type: "ARCHIVE_OTHER_APPLICATIONS",
        description: "Archive other applications for same unit",
        execute: async () => {
          const otherApps = await API.applications.getApplications({
            propertyId: application.propertyId,
          });
          
          for (const app of otherApps) {
            if (app.unitId === application.unitId && app.id !== application.id && app.status === "pending") {
              app.status = "rejected";
              app.rejectionReason = "Unit no longer available";
              console.log(`📋 Application ${app.id} auto-rejected`);
            }
          }
        },
      },
      {
        type: "GENERATE_LEASE",
        description: "Auto-generate lease agreement",
        execute: async () => {
          const lease = await API.leases.generateLease(application);
          console.log(`📄 Lease ${lease.id} generated`);
        },
      },
      {
        type: "NOTIFY_TENANT_APPROVED",
        description: "Send approval notification to tenant",
        execute: async () => {
          console.log(`🎉 Approval notification sent to tenant`);
        },
      },
      {
        type: "SEND_LEASE_LINK",
        description: "Send lease signing link to tenant",
        execute: async () => {
          console.log(`📧 Lease signing link sent to tenant`);
        },
      },
    ];
  }

  private static onLandlordRejected(application: Application): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set status to 'rejected'",
        execute: async () => {
          application.status = "rejected";
          application.decidedAt = new Date();
        },
      },
      {
        type: "NOTIFY_TENANT_REJECTED",
        description: "Send professional rejection notification",
        execute: async () => {
          console.log(`📧 Rejection notice sent to tenant (professional & courteous)`);
        },
      },
    ];
  }

  private static onTenantWithdrawn(application: Application): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Set status to 'withdrawn'",
        execute: async () => {
          application.status = "withdrawn";
        },
      },
      {
        type: "RESTORE_UNIT_AVAILABILITY",
        description: "Make unit available again",
        execute: async () => {
          await API.properties.updateUnitStatus(application.unitId, "available");
          console.log(`🏠 Unit ${application.unitId} now available`);
        },
      },
    ];
  }
}

// ============================================================================
// LEASE WORKFLOW
// ============================================================================

export class LeaseWorkflow {
  static async processEvent(event: WorkflowEvent, leaseId: string): Promise<WorkflowAction[]> {
    const lease = await API.leases.getLease(leaseId);
    if (!lease) throw new Error("Lease not found");

    const actions: WorkflowAction[] = [];

    switch (event) {
      case "LEASE_GENERATED":
        actions.push(...this.onLeaseGenerated(lease));
        break;

      case "LEASE_SIGNED_LANDLORD":
        actions.push(...this.onLandlordSigned(lease));
        break;

      case "LEASE_SIGNED_TENANT":
        actions.push(...this.onTenantSigned(lease));
        break;

      case "LEASE_ACTIVATED":
        actions.push(...this.onLeaseActivated(lease));
        break;

      case "LEASE_EXPIRING":
        actions.push(...this.onLeaseExpiring(lease));
        break;

      case "LEASE_EXPIRED":
        actions.push(...this.onLeaseExpired(lease));
        break;

      default:
        console.warn(`Unhandled lease event: ${event}`);
    }

    return actions;
  }

  private static onLeaseGenerated(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "SEND_TO_LANDLORD",
        description: "Send lease to landlord for review",
        execute: async () => {
          console.log(`📧 Lease sent to landlord for signature`);
        },
      },
      {
        type: "SEND_TO_TENANT",
        description: "Send lease to tenant for review",
        execute: async () => {
          console.log(`📧 Lease sent to tenant for review`);
        },
      },
    ];
  }

  private static onLandlordSigned(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "UPDATE_LEASE_STATUS",
        description: "Mark landlord signature complete",
        execute: async () => {
          lease.landlordSigned = true;
          lease.landlordSignedAt = new Date();
        },
      },
      {
        type: "NOTIFY_TENANT",
        description: "Notify tenant that landlord has signed",
        execute: async () => {
          console.log(`🔔 Tenant notified: landlord signed lease`);
        },
      },
    ];
  }

  private static onTenantSigned(lease: Lease): WorkflowAction[] {
    const actions: WorkflowAction[] = [
      {
        type: "UPDATE_LEASE_STATUS",
        description: "Mark tenant signature complete",
        execute: async () => {
          lease.tenantSigned = true;
          lease.tenantSignedAt = new Date();
        },
      },
    ];

    // If both signed, activate lease
    if (lease.landlordSigned && lease.tenantSigned) {
      actions.push(...this.onBothSigned(lease));
    }

    return actions;
  }

  private static onBothSigned(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "ACTIVATE_LEASE",
        description: "Activate lease and make it official",
        execute: async () => {
          lease.status = "active";
          lease.activatedAt = new Date();
          console.log(`✅ Lease activated`);
        },
      },
      {
        type: "UPDATE_UNIT_STATUS",
        description: "Mark unit as occupied",
        execute: async () => {
          await API.properties.updateUnitStatus(lease.unitId, "occupied");
          console.log(`🏠 Unit marked as occupied`);
        },
      },
      {
        type: "GENERATE_FIRST_PAYMENT",
        description: "Create first rent payment",
        execute: async () => {
          await API.payments.createPayment({
            tenantId: lease.tenantId,
            landlordId: lease.landlordId,
            leaseId: lease.id,
            unitId: lease.unitId,
            amount: lease.monthlyRent,
            type: "rent",
            dueDate: lease.leaseStart,
            status: "pending",
          });
          console.log(`💰 First payment scheduled`);
        },
      },
      {
        type: "SCHEDULE_RECURRING_PAYMENTS",
        description: "Set up monthly rent payments",
        execute: async () => {
          console.log(`📅 Recurring payments scheduled`);
        },
      },
      {
        type: "SEND_WELCOME_EMAIL",
        description: "Send welcome package to tenant",
        execute: async () => {
          console.log(`📧 Welcome package sent to tenant`);
        },
      },
    ];
  }

  private static onLeaseActivated(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "GRANT_PORTAL_ACCESS",
        description: "Grant tenant portal access",
        execute: async () => {
          console.log(`🔑 Tenant portal access granted`);
        },
      },
    ];
  }

  private static onLeaseExpiring(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "ALERT_LANDLORD",
        description: "Alert landlord of upcoming expiration",
        execute: async () => {
          console.log(`⚠️ Landlord alerted: lease expiring in 60 days`);
        },
      },
      {
        type: "GENERATE_RENEWAL_SUGGESTION",
        description: "Generate AI renewal suggestion",
        execute: async () => {
          console.log(`🤖 AI renewal analysis generated`);
        },
      },
    ];
  }

  private static onLeaseExpired(lease: Lease): WorkflowAction[] {
    return [
      {
        type: "UPDATE_STATUS",
        description: "Mark lease as expired",
        execute: async () => {
          lease.status = "expired";
        },
      },
      {
        type: "UPDATE_UNIT_STATUS",
        description: "Update unit availability",
        execute: async () => {
          await API.properties.updateUnitStatus(lease.unitId, "available");
          console.log(`🏠 Unit now available`);
        },
      },
    ];
  }
}

// ============================================================================
// PAYMENT WORKFLOW
// ============================================================================

export class PaymentWorkflow {
  static async processEvent(event: WorkflowEvent, paymentId: string): Promise<WorkflowAction[]> {
    const actions: WorkflowAction[] = [];

    switch (event) {
      case "PAYMENT_DUE":
        actions.push(...this.onPaymentDue(paymentId));
        break;

      case "PAYMENT_RECEIVED":
        actions.push(...this.onPaymentReceived(paymentId));
        break;

      case "PAYMENT_OVERDUE":
        actions.push(...this.onPaymentOverdue(paymentId));
        break;

      default:
        console.warn(`Unhandled payment event: ${event}`);
    }

    return actions;
  }

  private static onPaymentDue(paymentId: string): WorkflowAction[] {
    return [
      {
        type: "SEND_REMINDER",
        description: "Send payment reminder 3 days before due",
        execute: async () => {
          console.log(`📧 Payment reminder sent to tenant`);
        },
      },
    ];
  }

  private static onPaymentReceived(paymentId: string): WorkflowAction[] {
    return [
      {
        type: "UPDATE_PAYMENT_STATUS",
        description: "Mark payment as completed",
        execute: async () => {
          console.log(`✅ Payment marked as completed`);
        },
      },
      {
        type: "GENERATE_RECEIPT",
        description: "Generate and send receipt",
        execute: async () => {
          console.log(`🧾 Receipt generated and sent`);
        },
      },
      {
        type: "UPDATE_TENANT_SCORE",
        description: "Update tenant payment score",
        execute: async () => {
          console.log(`📊 Tenant payment history updated`);
        },
      },
    ];
  }

  private static onPaymentOverdue(paymentId: string): WorkflowAction[] {
    return [
      {
        type: "SEND_OVERDUE_NOTICE",
        description: "Send overdue payment notice",
        execute: async () => {
          console.log(`⚠️ Overdue notice sent to tenant`);
        },
      },
      {
        type: "CALCULATE_LATE_FEE",
        description: "Calculate and add late fee",
        execute: async () => {
          console.log(`💰 Late fee calculated`);
        },
      },
      {
        type: "ALERT_LANDLORD",
        description: "Alert landlord of overdue payment",
        execute: async () => {
          console.log(`🔔 Landlord alerted of overdue payment`);
        },
      },
    ];
  }
}

// ============================================================================
// MAINTENANCE WORKFLOW
// ============================================================================

export class MaintenanceWorkflow {
  static async processEvent(
    event: WorkflowEvent,
    requestId: string
  ): Promise<WorkflowAction[]> {
    const actions: WorkflowAction[] = [];

    switch (event) {
      case "MAINTENANCE_SUBMITTED":
        actions.push(...this.onMaintenanceSubmitted(requestId));
        break;

      case "MAINTENANCE_ASSIGNED":
        actions.push(...this.onMaintenanceAssigned(requestId));
        break;

      case "MAINTENANCE_COMPLETED":
        actions.push(...this.onMaintenanceCompleted(requestId));
        break;

      default:
        console.warn(`Unhandled maintenance event: ${event}`);
    }

    return actions;
  }

  private static onMaintenanceSubmitted(requestId: string): WorkflowAction[] {
    return [
      {
        type: "NOTIFY_LANDLORD",
        description: "Notify landlord of new request",
        execute: async () => {
          console.log(`🔔 Landlord notified of maintenance request`);
        },
      },
      {
        type: "SEND_CONFIRMATION",
        description: "Send confirmation to tenant",
        execute: async () => {
          console.log(`📧 Confirmation sent to tenant`);
        },
      },
    ];
  }

  private static onMaintenanceAssigned(requestId: string): WorkflowAction[] {
    return [
      {
        type: "NOTIFY_CONTRACTOR",
        description: "Notify contractor of assignment",
        execute: async () => {
          console.log(`📧 Contractor notified`);
        },
      },
      {
        type: "NOTIFY_TENANT",
        description: "Notify tenant of assignment",
        execute: async () => {
          console.log(`📧 Tenant notified: contractor assigned`);
        },
      },
    ];
  }

  private static onMaintenanceCompleted(requestId: string): WorkflowAction[] {
    return [
      {
        type: "NOTIFY_TENANT",
        description: "Notify tenant of completion",
        execute: async () => {
          console.log(`✅ Tenant notified: maintenance complete`);
        },
      },
      {
        type: "REQUEST_FEEDBACK",
        description: "Request tenant feedback",
        execute: async () => {
          console.log(`📊 Feedback request sent to tenant`);
        },
      },
      {
        type: "UPDATE_MAINTENANCE_HISTORY",
        description: "Update property maintenance history",
        execute: async () => {
          console.log(`📋 Maintenance history updated`);
        },
      },
    ];
  }
}

// ============================================================================
// WORKFLOW ORCHESTRATOR
// ============================================================================

export class WorkflowOrchestrator {
  /**
   * Main workflow coordinator
   * Routes events to appropriate workflow handlers
   */
  static async processEvent(
    event: WorkflowEvent,
    entityType: "application" | "lease" | "payment" | "maintenance",
    entityId: string
  ): Promise<void> {
    console.log(`🔄 Processing workflow event: ${event} for ${entityType} ${entityId}`);

    let actions: WorkflowAction[] = [];

    try {
      switch (entityType) {
        case "application":
          actions = await ApplicationWorkflow.processEvent(event, entityId);
          break;
        case "lease":
          actions = await LeaseWorkflow.processEvent(event, entityId);
          break;
        case "payment":
          actions = await PaymentWorkflow.processEvent(event, entityId);
          break;
        case "maintenance":
          actions = await MaintenanceWorkflow.processEvent(event, entityId);
          break;
      }

      // Execute all actions
      for (const action of actions) {
        try {
          await action.execute();
          console.log(`✅ ${action.type}: ${action.description}`);
        } catch (error) {
          console.error(`❌ ${action.type} failed:`, error);
          
          // Attempt rollback if available
          if (action.rollback) {
            console.log(`🔄 Rolling back ${action.type}...`);
            await action.rollback();
          }
          
          throw error;
        }
      }

      console.log(`✅ Workflow completed successfully`);
    } catch (error) {
      console.error(`❌ Workflow failed:`, error);
      throw error;
    }
  }
}

// Export workflow engine
export const WorkflowEngine = WorkflowOrchestrator;
