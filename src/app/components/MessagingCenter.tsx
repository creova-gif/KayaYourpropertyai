import { useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Paperclip,
  Image,
  File,
  X,
  Check,
  CheckCheck,
  Clock,
  User,
  Building2,
} from "lucide-react";

interface Message {
  id: number;
  conversationId: number;
  sender: "landlord" | "tenant";
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: { name: string; type: string; url: string }[];
}

interface Conversation {
  id: number;
  participantName: string;
  participantRole: "tenant" | "applicant";
  property: string;
  unit?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export function MessagingCenter() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      participantName: "Sarah Kim",
      participantRole: "tenant",
      property: "123 King Street",
      unit: "Unit 4A",
      lastMessage: "Thank you! The maintenance issue has been resolved.",
      lastMessageTime: "2 min ago",
      unreadCount: 0,
      online: true,
    },
    {
      id: 2,
      participantName: "Michael Patel",
      participantRole: "applicant",
      property: "456 Queen Street West",
      unit: "Unit 2B",
      lastMessage: "I'd like to schedule a viewing for this weekend.",
      lastMessageTime: "15 min ago",
      unreadCount: 2,
      online: true,
    },
    {
      id: 3,
      participantName: "Emma Rodriguez",
      participantRole: "applicant",
      property: "123 King Street",
      unit: "Unit 5A",
      lastMessage: "Could you provide more details about parking?",
      lastMessageTime: "1 hour ago",
      unreadCount: 1,
      online: false,
    },
    {
      id: 4,
      participantName: "Jason Lee",
      participantRole: "tenant",
      property: "789 Bloor Street",
      unit: "Unit 1",
      lastMessage: "The rent payment has been processed.",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      online: false,
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      conversationId: 1,
      sender: "tenant",
      senderName: "Sarah Kim",
      content: "Hi, the kitchen faucet is leaking. Can someone take a look?",
      timestamp: "10:30 AM",
      read: true,
    },
    {
      id: 2,
      conversationId: 1,
      sender: "landlord",
      senderName: "You",
      content: "I'll send a plumber tomorrow morning. Is 9 AM convenient?",
      timestamp: "10:45 AM",
      read: true,
    },
    {
      id: 3,
      conversationId: 1,
      sender: "tenant",
      senderName: "Sarah Kim",
      content: "Yes, 9 AM works perfectly. Thank you!",
      timestamp: "10:47 AM",
      read: true,
    },
    {
      id: 4,
      conversationId: 1,
      sender: "landlord",
      senderName: "You",
      content: "Great! The plumber will be there at 9 AM sharp.",
      timestamp: "11:00 AM",
      read: true,
    },
    {
      id: 5,
      conversationId: 1,
      sender: "tenant",
      senderName: "Sarah Kim",
      content: "Thank you! The maintenance issue has been resolved.",
      timestamp: "2 min ago",
      read: true,
    },
  ];

  const selectedConv = conversations.find((c) => c.id === selectedConversation);
  const conversationMessages = messages.filter((m) => m.conversationId === selectedConversation);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Send message logic here
    setMessageText("");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-xl border border-[rgba(0,0,0,0.07)] overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-[rgba(0,0,0,0.07)] flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-[rgba(0,0,0,0.07)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#767570]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-[#0A7A52]"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F8F7F4] transition-colors text-left ${
                selectedConversation === conv.id ? "bg-[#E5F4EE] hover:bg-[#E5F4EE]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center text-white font-semibold">
                    {conv.participantName.charAt(0)}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 size-3 bg-[#0A7A52] rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#0E0F0C] text-sm truncate">
                      {conv.participantName}
                    </h3>
                    <span className="text-xs text-[#767570]">{conv.lastMessageTime}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        conv.participantRole === "tenant"
                          ? "bg-[#E5F4EE] text-[#0A7A52]"
                          : "bg-[#E3F2FD] text-[#1976D2]"
                      }`}
                    >
                      {conv.participantRole}
                    </span>
                    <span className="text-xs text-[#767570] truncate">
                      {conv.property} {conv.unit && `• ${conv.unit}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#767570] truncate flex-1">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 size-5 rounded-full bg-[#0A7A52] text-white text-xs flex items-center justify-center font-medium">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-[rgba(0,0,0,0.07)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center text-white font-semibold">
                    {selectedConv.participantName.charAt(0)}
                  </div>
                  {selectedConv.online && (
                    <div className="absolute bottom-0 right-0 size-3 bg-[#0A7A52] rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0E0F0C]">
                    {selectedConv.participantName}
                  </h3>
                  <p className="text-sm text-[#767570]">
                    {selectedConv.property} {selectedConv.unit && `• ${selectedConv.unit}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedConv.participantRole === "tenant"
                      ? "bg-[#E5F4EE] text-[#0A7A52]"
                      : "bg-[#E3F2FD] text-[#1976D2]"
                  }`}
                >
                  {selectedConv.participantRole}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "landlord" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md ${ message.sender === "landlord" ? "bg-[#0A7A52] text-white" : "bg-[#F8F7F4] text-[#0E0F0C]" } rounded-2xl px-4 py-3`}
                >
                  <p className="text-sm text-[#000000]">{message.content}</p>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <span
                      className={`text-xs ${
                        message.sender === "landlord" ? "text-white/70" : "text-[#767570]"
                      }`}
                    >
                      {message.timestamp}
                    </span>
                    {message.sender === "landlord" && (
                      <CheckCheck
                        className={`size-4 ${
                          message.read ? "text-white/70" : "text-white/90"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-[rgba(0,0,0,0.07)]">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-[#0A7A52] resize-none"
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-3 rounded-lg border border-[rgba(0,0,0,0.07)] hover:bg-[#F8F7F4] transition-colors">
                  <Paperclip className="size-5 text-[#767570]" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className={`p-3 rounded-lg transition-colors ${
                    messageText.trim()
                      ? "bg-[#0A7A52] hover:bg-[#0A7A52]/90 text-white"
                      : "bg-[#F8F7F4] text-[#767570] cursor-not-allowed"
                  }`}
                >
                  <Send className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="size-16 text-[#767570]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0E0F0C] mb-2">
              Select a conversation
            </h3>
            <p className="text-[#767570]">
              Choose a conversation from the left to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}