import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "support";
  text: string;
  timestamp: Date;
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message when chat opens
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            sender: "support",
            text: language === "fr"
              ? `Bonjour${user ? ` ${user.name}` : ""}! Comment puis-je vous aider aujourd'hui?`
              : `Hi${user ? ` ${user.name}` : ""}! How can I help you today?`,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen, language, user]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI/support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "support",
        text: language === "fr"
          ? "Merci pour votre message! Notre équipe de support vous répondra sous peu. Pour une assistance immédiate, veuillez contacter support@creova.one ou appeler le 1-416-555-KAYA."
          : "Thanks for your message! Our support team will respond shortly. For immediate assistance, please contact support@creova.one or call 1-416-555-KAYA.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 size-14 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white rounded-full shadow-2xl hover:shadow-[#0A7A52]/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle className="size-6" />
            <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="size-5" />
                </div>
                <div>
                  <div className="font-bold text-[14px]">
                    {language === "fr" ? "Support KAYA" : "KAYA Support"}
                  </div>
                  <div className="text-[12px] text-white/80">
                    {language === "fr" ? "En ligne maintenant" : "Online now"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="size-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  <Minimize2 className="size-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4 bg-[#F8F7F4]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white"
                            : "bg-white text-[#0E0F0C] shadow-sm"
                        }`}
                      >
                        <p className="text-[14px]">{message.text}</p>
                        <p
                          className={`text-[11px] mt-1 ${
                            message.sender === "user" ? "text-white/70" : "text-[#767570]"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString(language === "fr" ? "fr-CA" : "en-CA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                        <div className="flex gap-1">
                          <div className="size-2 bg-[#767570] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="size-2 bg-[#767570] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="size-2 bg-[#767570] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-[#D1D0CC]/30">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={language === "fr" ? "Tapez votre message..." : "Type your message..."}
                      className="flex-1 px-4 py-2 rounded-xl border border-[#D1D0CC]/30 focus:outline-none focus:ring-2 focus:ring-[#0A7A52]/20 text-[14px]"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="size-10 bg-gradient-to-r from-[#0A7A52] to-[#085D3D] text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="size-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#767570] mt-2 text-center">
                    {language === "fr"
                      ? "support@creova.one · 1-416-555-KAYA"
                      : "support@creova.one · 1-416-555-KAYA"}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
