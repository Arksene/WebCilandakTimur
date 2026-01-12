import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { BotMessageSquare } from "lucide-react";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! 👋 Saya Asisten Virtual Kelurahan Cilandak Timur. Ada yang bisa dibantu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    const Base_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${Base_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, koneksi terputus. Coba lagi nanti." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end gap-3 sm:gap-4 font-sans">
      {isOpen && (
        <div className="bg-white w-[calc(100vw-2rem)] sm:w-96 h-[70vh] sm:h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up transition-all">
          <div className="bg-slate-800 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold text-sm tracking-tight">
                  Layanan Cilandak Timur
                </h3>
                <p className="text-[10px] text-slate-300 uppercase font-bold tracking-widest">
                  Online 24 Jam
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-slate-700 p-1.5 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "self-end bg-blue-600 text-white rounded-br-none"
                    : "self-start bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-4 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-4 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <span className="font-bold" {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-gray-200 text-gray-500 text-[10px] font-bold px-4 py-2 rounded-full animate-pulse uppercase tracking-wider">
                Mengetik...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-none"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 ${
          isOpen
            ? "bg-rose-500 rotate-90"
            : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
        }`}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <BotMessageSquare color="white" size={30} />
        )}
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Chatbot;
