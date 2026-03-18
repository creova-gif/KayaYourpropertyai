import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "motion/react";
import { Wrench, AlertTriangle, Clock, CheckCircle2, Image as ImageIcon, Calendar } from "lucide-react";

interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  unit: string;
  priority: "low" | "medium" | "high";
  category: string;
  description: string;
  submittedDate: string;
  estimatedCost?: number;
  hasPhoto: boolean;
  assignedTo?: string;
}

interface KanbanColumnProps {
  title: string;
  status: string;
  requests: MaintenanceRequest[];
  onDrop: (requestId: string, newStatus: string) => void;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface DraggableCardProps {
  request: MaintenanceRequest;
}

const DraggableCard = ({ request }: DraggableCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "MAINTENANCE_REQUEST",
    item: { id: request.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const priorityConfig = {
    high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: "🔥" },
    medium: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: "⚠️" },
    low: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "ℹ️" }
  };

  const config = priorityConfig[request.priority];

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-lg border-2 ${config.border} p-4 cursor-move mb-3 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-slate-900 text-sm">{request.title}</h4>
        <span className="text-lg">{config.icon}</span>
      </div>

      <p className="text-xs text-slate-600 mb-3">
        {request.property} - {request.unit}
      </p>

      <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
        <Calendar className="size-3" />
        <span>{request.submittedDate}</span>
      </div>

      {request.hasPhoto && (
        <div className="flex items-center gap-1 text-xs text-indigo-600 mb-2">
          <ImageIcon className="size-3" />
          <span>Photo attached</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
          {request.priority}
        </span>
        {request.estimatedCost && (
          <span className="text-xs font-semibold text-slate-900">
            ${request.estimatedCost}
          </span>
        )}
      </div>

      {request.assignedTo && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Assigned to: <span className="font-medium text-slate-700">{request.assignedTo}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
};

const KanbanColumn = ({ title, status, requests, onDrop, icon: Icon, color }: KanbanColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MAINTENANCE_REQUEST",
    drop: (item: { id: string }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`bg-gradient-to-br ${color} rounded-xl p-4 mb-4`}>
        <div className="flex items-center gap-3 text-white">
          <Icon className="size-6" />
          <div className="flex-1">
            <h3 className="font-normal text-[20px] text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{title}</h3>
            <p className="text-[13px] text-white/80">{requests.length} requests</p>
          </div>
        </div>
      </div>

      <div
        ref={drop}
        className={`min-h-[400px] p-4 rounded-xl border-2 border-dashed transition-colors ${
          isOver ? "bg-[#E5F4EE] border-[#0A7A52]" : "bg-white border-[rgba(0,0,0,0.07)]"
        }`}
      >
        {requests.map((request) => (
          <DraggableCard key={request.id} request={request} />
        ))}
        {requests.length === 0 && (
          <div className="flex items-center justify-center h-32 text-[#767570] text-[14px]">
            No requests
          </div>
        )}
      </div>
    </div>
  );
};

export function MaintenanceKanban() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      title: "Leaking faucet in bathroom",
      property: "123 King St",
      unit: "Unit 4A",
      priority: "medium",
      category: "Plumbing",
      description: "Bathroom sink faucet dripping",
      submittedDate: "Mar 12, 2026",
      estimatedCost: 150,
      hasPhoto: true,
      assignedTo: "Mike's Plumbing"
    },
    {
      id: "2",
      title: "Broken dishwasher",
      property: "456 Queen St",
      unit: "Unit 2B",
      priority: "high",
      category: "Appliance",
      description: "Dishwasher not starting",
      submittedDate: "Mar 14, 2026",
      estimatedCost: 350,
      hasPhoto: true
    },
    {
      id: "3",
      title: "Heating issue",
      property: "123 King St",
      unit: "Unit 1A",
      priority: "high",
      category: "HVAC",
      description: "No heat in bedroom",
      submittedDate: "Mar 10, 2026",
      estimatedCost: 200,
      hasPhoto: false,
      assignedTo: "HVAC Pro"
    },
    {
      id: "4",
      title: "Door lock replacement",
      property: "789 Bloor St",
      unit: "Unit 3C",
      priority: "low",
      category: "Hardware",
      description: "Front door lock sticking",
      submittedDate: "Mar 13, 2026",
      estimatedCost: 80,
      hasPhoto: false
    },
    {
      id: "5",
      title: "Paint touch-up needed",
      property: "123 King St",
      unit: "Unit 5B",
      priority: "low",
      category: "Cosmetic",
      description: "Wall scuffs in hallway",
      submittedDate: "Mar 11, 2026",
      estimatedCost: 100,
      hasPhoto: true
    }
  ]);

  const [requestStatuses, setRequestStatuses] = useState<Record<string, string>>({
    "1": "in-progress",
    "2": "open",
    "3": "in-progress",
    "4": "open",
    "5": "completed"
  });

  const handleDrop = (requestId: string, newStatus: string) => {
    setRequestStatuses(prev => ({
      ...prev,
      [requestId]: newStatus
    }));
  };

  const columns = [
    {
      title: "Open",
      status: "open",
      icon: AlertTriangle,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "In Progress",
      status: "in-progress",
      icon: Clock,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Completed",
      status: "completed",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            requests={requests.filter(req => requestStatuses[req.id] === column.status)}
            onDrop={handleDrop}
            icon={column.icon}
            color={column.color}
          />
        ))}
      </div>
    </DndProvider>
  );
}