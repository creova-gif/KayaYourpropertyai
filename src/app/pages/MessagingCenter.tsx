import { useState } from "react";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Check, CheckCheck, Pin, Archive, Trash2, Filter, Star, UserCircle, Building2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  delivered: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'tenant' | 'landlord' | 'contractor' | 'admin';
  participantAvatar?: string;
  property?: string;
  unit?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  pinned: boolean;
  starred: boolean;
  messages: Message[];
}

export function MessagingCenter() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantName: 'Sarah Johnson',
      participantRole: 'tenant',
      property: 'Maple Tower',
      unit: '204',
      lastMessage: 'Thank you! I\'ll submit the documents by tomorrow.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      unreadCount: 2,
      pinned: true,
      starred: false,
      messages: [
        {
          id: 'm1',
          senderId: 'landlord',
          text: 'Hi Sarah, welcome to Maple Tower! Please submit your signed lease and proof of insurance.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm2',
          senderId: 'sarah',
          text: 'Thank you! I have a quick question about the parking permit.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm3',
          senderId: 'landlord',
          text: 'Of course! You can apply for the parking permit through the tenant portal. It costs $50/month and is processed within 48 hours.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm4',
          senderId: 'sarah',
          text: 'Thank you! I\'ll submit the documents by tomorrow.',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          read: false,
          delivered: true,
        },
      ],
    },
    {
      id: '2',
      participantName: 'John Smith',
      participantRole: 'tenant',
      property: 'Oak Residences',
      unit: '305',
      lastMessage: 'The heater is working perfectly now. Thanks!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      unreadCount: 0,
      pinned: false,
      starred: true,
      messages: [
        {
          id: 'm1',
          senderId: 'john',
          text: 'Hi, the heater in my unit seems to not be working properly.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm2',
          senderId: 'landlord',
          text: 'Sorry to hear that! I\'ll send a technician over this afternoon. Will you be available around 2 PM?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm3',
          senderId: 'john',
          text: 'Yes, I\'ll be home. Thank you!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          read: true,
          delivered: true,
        },
        {
          id: 'm4',
          senderId: 'john',
          text: 'The heater is working perfectly now. Thanks!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          read: true,
          delivered: true,
        },
      ],
    },
    {
      id: '3',
      participantName: 'Elite Plumbing Toronto',
      participantRole: 'contractor',
      lastMessage: 'Job completed. Invoice attached.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unreadCount: 1,
      pinned: false,
      starred: false,
      messages: [
        {
          id: 'm1',
          senderId: 'contractor',
          text: 'Job completed. Invoice attached.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          read: false,
          delivered: true,
          attachments: [{ name: 'invoice-march-2026.pdf', url: '#', type: 'pdf' }],
        },
      ],
    },
    {
      id: '4',
      participantName: 'Emma Wilson',
      participantRole: 'tenant',
      property: 'Maple Tower',
      unit: '102',
      lastMessage: 'Sure, that works for me.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      unreadCount: 0,
      pinned: false,
      starred: false,
      messages: [],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    // Add message sending logic here
    setMessageInput('');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatFullTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'tenant': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contractor': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'admin': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredConversations = conversations.filter(c =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.property?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.unit?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* Conversations Sidebar */}
      <div className="w-96 bg-white border-r border-[rgba(0,0,0,0.08)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.08)]">
          <h1 
            className="text-2xl text-[#0E0F0C] mb-4"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Messages
          </h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#767570]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F8F7F4] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 focus:border-[#0A7A52]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 border-b border-[rgba(0,0,0,0.08)] hover:bg-[#F8F7F4] transition-colors text-left relative ${
                selectedConversation?.id === conversation.id ? 'bg-[#E5F4EE]' : ''
              }`}
            >
              {/* Unread indicator */}
              {conversation.unreadCount > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#0A7A52] rounded-r-full" />
              )}

              <div className="flex items-start gap-3 pl-2">
                {/* Avatar */}
                <div className="size-12 rounded-full bg-[#0A7A52]/10 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="size-7 text-[#0A7A52]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0E0F0C] text-sm truncate">
                        {conversation.participantName}
                      </h3>
                      {conversation.pinned && <Pin className="size-3 text-[#767570]" />}
                      {conversation.starred && <Star className="size-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <span className="text-xs text-[#767570] flex-shrink-0">
                      {formatMessageTime(conversation.lastMessageTime)}
                    </span>
                  </div>

                  {/* Property/Unit info */}
                  {conversation.property && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-md border ${getRoleBadgeColor(conversation.participantRole)}`}>
                        {conversation.participantRole}
                      </span>
                      <span className="text-xs text-[#767570]">
                        {conversation.property} • {conversation.unit}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-semibold text-[#0E0F0C]' : 'text-[#767570]'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 size-5 rounded-full bg-[#0A7A52] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-[#0A7A52]/10 flex items-center justify-center">
                  <UserCircle className="size-7 text-[#0A7A52]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#0E0F0C] text-lg">
                    {selectedConversation.participantName}
                  </h2>
                  {selectedConversation.property && (
                    <p className="text-sm text-[#767570]">
                      {selectedConversation.property} • Unit {selectedConversation.unit}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => toast.info("Phone call feature coming soon")} className="p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                  <Phone className="size-5" />
                </button>
                <button onClick={() => toast.info("Video call feature coming soon")} className="p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                  <Video className="size-5" />
                </button>
                <button onClick={() => toast.info("More options coming soon")} className="p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                  <MoreVertical className="size-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {selectedConversation.messages.map((message) => {
              const isOwnMessage = message.senderId === 'landlord';
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-lg ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-[#0A7A52] text-white rounded-br-sm'
                        : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#0E0F0C] rounded-bl-sm'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <Paperclip className="size-3" />
                              <span>{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 px-1">
                      <span className="text-xs text-[#767570]">
                        {formatFullTime(message.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <>
                          {message.read ? (
                            <CheckCheck className="size-3 text-[#0A7A52]" />
                          ) : message.delivered ? (
                            <CheckCheck className="size-3 text-[#767570]" />
                          ) : (
                            <Check className="size-3 text-[#767570]" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-[rgba(0,0,0,0.08)] p-6">
            <div className="flex items-end gap-3">
              <button onClick={() => toast.info("File attachment coming soon")} className="p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors text-[#767570]">
                <Paperclip className="size-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#F8F7F4] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 focus:border-[#0A7A52] resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button onClick={() => toast.info("Emoji picker coming soon")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767570] hover:text-[#0A7A52] transition-colors">
                  <Smile className="size-5" />
                </button>
              </div>

              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="p-3 rounded-xl bg-[#0A7A52] text-white hover:bg-[#085D3D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#F8F7F4]">
          <div className="text-center">
            <div className="size-20 rounded-full bg-[#0A7A52]/10 flex items-center justify-center mx-auto mb-4">
              <Send className="size-10 text-[#0A7A52]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0E0F0C] mb-2">
              Select a conversation
            </h3>
            <p className="text-[#767570]">
              Choose a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
