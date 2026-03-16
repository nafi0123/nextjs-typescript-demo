"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { chatAssistant } from "@/services/ai-actions.service";

export default function AIChatBot({ products }: { products: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  // মেসেজ হিস্ট্রি রাখার জন্য অ্যারে
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your beauty assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  
  // চ্যাট অটো-স্ক্রোল করার জন্য রেফ
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    // ১. ইউজারের মেসেজ অ্যাড করা
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // ২. এআই থেকে রিপ্লাই আনা
      const aiResponse = await chatAssistant(userMessage, products);
      
      // ৩. এআই এর মেসেজ অ্যাড করা
      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "I'm having a bit of trouble. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white border border-slate-200 w-80 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="bg-black p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-white text-[10px] font-black uppercase tracking-widest">AI Assistant</h3>
            </div>
            <X className="text-white w-4 h-4 cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 overflow-y-auto bg-[#FBF9F6] flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs shadow-sm ${
                  msg.role === "user" 
                  ? "bg-black text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none italic"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              className="flex-1 text-xs p-2 outline-none bg-slate-50 rounded-md" 
              placeholder="Ask: Products under 100..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button 
              disabled={loading} 
              onClick={handleSend} 
              className={`p-2 rounded-md text-white transition-colors ${loading ? "bg-slate-400" : "bg-black hover:bg-slate-800"}`}
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-black p-4 rounded-full shadow-lg text-white hover:scale-110 active:scale-95 transition-all"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}