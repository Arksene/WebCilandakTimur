import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  // --- STATE UTAMA ---
  const [isOpen, setIsOpen] = useState(false); // Status Buka/Tutup Chat
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! 👋 Saya Asisten Virtual Kelurahan Cilandak Timur. Ada yang bisa dibantu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll ke bawah saat chat dibuka atau ada pesan baru
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Fungsi Kirim Pesan (Sama seperti sebelumnya)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Pastikan Port Backend sesuai (default: 5000)
      const response = await fetch("http://localhost:3000/api/chat", {
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
    // CONTAINER UTAMA (FIXED POSITION)
    // z-50 memastikan dia selalu di atas elemen lain (navbar, footer, dll)
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* --- 1. KOTAK CHAT (Hanya muncul jika isOpen = true) --- */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header Chat */}
          <div className="bg-slate-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold text-sm">Layanan Cilandak Timur</h3>
                <p className="text-xs text-slate-300">Online 24 Jam</p>
              </div>
            </div>

            {/* Tombol Close (X) Kecil di Header */}
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-slate-700 p-1 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Isi Pesan */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {/* BAGIAN INI YANG HILANG (MAPPING) */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
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
            {/* TUTUP MAPPING */}

            {/* Indikator Loading */}
            {isLoading && (
              <div className="self-start bg-gray-200 text-gray-500 text-xs px-3 py-2 rounded-full animate-pulse">
                Mengetik...
              </div>
            )}

            {/* Auto Scroll dummy div */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition"
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

      {/* --- 2. TOMBOL MELAYANG (FLOATING BUTTON) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {isOpen ? (
          // Ikon X (Tutup)
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
          // Ikon Chat (Buka)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
