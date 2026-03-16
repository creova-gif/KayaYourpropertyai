import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Bell, FileText, X } from "lucide-react";
import { useState, useEffect } from "react";

interface FeedbackMessage {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  description?: string;
  duration?: number;
}

let feedbackQueue: FeedbackMessage[] = [];
let listeners: Array<(messages: FeedbackMessage[]) => void> = [];

export const showFeedback = (message: Omit<FeedbackMessage, "id">) => {
  const newMessage: FeedbackMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    duration: message.duration || 4000,
  };

  feedbackQueue = [...feedbackQueue, newMessage];
  listeners.forEach((listener) => listener(feedbackQueue));

  setTimeout(() => {
    feedbackQueue = feedbackQueue.filter((m) => m.id !== newMessage.id);
    listeners.forEach((listener) => listener(feedbackQueue));
  }, newMessage.duration);
};

export function InstantFeedback() {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);

  useEffect(() => {
    listeners.push(setMessages);
    return () => {
      listeners = listeners.filter((l) => l !== setMessages);
    };
  }, []);

  const removeMessage = (id: string) => {
    feedbackQueue = feedbackQueue.filter((m) => m.id !== id);
    setMessages(feedbackQueue);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      <AnimatePresence>
        {messages.map((message) => {
          const Icon =
            message.type === "success" ? CheckCircle : message.type === "info" ? Bell : FileText;

          const bgColor =
            message.type === "success"
              ? "bg-green-50 border-green-200"
              : message.type === "info"
              ? "bg-blue-50 border-blue-200"
              : "bg-amber-50 border-amber-200";

          const textColor =
            message.type === "success"
              ? "text-green-900"
              : message.type === "info"
              ? "text-blue-900"
              : "text-amber-900";

          const iconColor =
            message.type === "success"
              ? "text-green-600"
              : message.type === "info"
              ? "text-blue-600"
              : "text-amber-600";

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`${bgColor} border rounded-xl p-4 shadow-lg backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <Icon className={`size-6 ${iconColor}`} />
                </motion.div>

                <div className="flex-1">
                  <h4 className={`font-semibold ${textColor}`}>{message.title}</h4>
                  {message.description && (
                    <p className={`text-sm ${textColor} opacity-80 mt-1`}>{message.description}</p>
                  )}

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: (message.duration || 4000) / 1000, ease: "linear" }}
                    className="h-1 bg-current opacity-20 rounded-full mt-3 origin-left"
                  />
                </div>

                <button
                  onClick={() => removeMessage(message.id)}
                  className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Example usage component
export function FeedbackTriggerExample() {
  return (
    <div className="p-8 space-y-4">
      <button
        onClick={() =>
          showFeedback({
            type: "success",
            title: "✓ Tenant Approved",
            description: "Lease generated • Notification sent",
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Approve Tenant
      </button>

      <button
        onClick={() =>
          showFeedback({
            type: "info",
            title: "Payment Received",
            description: "Unit 4A - $2,300",
          })
        }
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Record Payment
      </button>

      <button
        onClick={() =>
          showFeedback({
            type: "warning",
            title: "Maintenance Assigned",
            description: "Contractor notified",
          })
        }
        className="px-4 py-2 bg-amber-600 text-white rounded-lg"
      >
        Assign Contractor
      </button>
    </div>
  );
}
