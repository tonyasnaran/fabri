"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plane, Calendar, MapPin } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "I'm analyzing flight deals and availability for you. Based on your preferences, I found some great options. Try asking about specific destinations or dates!",
  japan:
    "✈️ Great choice! Tokyo in spring is incredible. I'm seeing LAX→NRT round trips from $650 on ANA in late March. Tip: Check OGG (Maui) and LGB (Long Beach) for hidden deals — sometimes $80 cheaper than LAX.",
  europe:
    "🇪🇺 For Europe, I'd recommend looking at Reykjavik (KEF) as a stopover — Iceland Air often prices transatlantic routes competitively. Right now seeing NYC→Paris from $420. Want me to scan April dates?",
  cheap:
    "💡 Hidden airport tip: Consider BUR, LGB, or ONT instead of LAX — rideshare costs are lower and security is faster. I'm seeing deals to Miami from BUR at $189 this month.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("japan") || lower.includes("tokyo")) return MOCK_RESPONSES.japan;
  if (lower.includes("europe") || lower.includes("paris")) return MOCK_RESPONSES.europe;
  if (lower.includes("cheap") || lower.includes("deal") || lower.includes("best"))
    return MOCK_RESPONSES.cheap;
  return MOCK_RESPONSES.default;
}

const flightDeals = [
  {
    route: "LAX → NRT",
    price: "$650",
    airline: "ANA",
    dates: "Mar 22 – Apr 1",
    verified: true,
    expires: "2026-06-01",
  },
  {
    route: "LAX → CDG",
    price: "$420",
    airline: "Air France",
    dates: "Apr 10 – Apr 20",
    verified: true,
    expires: "2026-05-28",
  },
  {
    route: "BUR → MIA",
    price: "$189",
    airline: "Southwest",
    dates: "May 15 – May 19",
    verified: false,
    expires: "2026-05-25",
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey! I'm your Travel AI. Tell me where you want to go, your ideal travel dates, or ask me to find flight deals. I'll check hidden airports, regional routes, and point redemptions.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(input),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Chat panel */}
      <div className="lg:col-span-2 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Plane size={16} className="text-[#722F37]" />
          <span className="text-sm font-medium">Travel AI</span>
          <span className="ml-auto text-xs text-muted-foreground">Powered by Anthropic</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-[#722F37] text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
                Scanning deals...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border p-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about destinations, dates, deals..."
            className="flex-1 bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#722F37]"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="bg-[#722F37] text-white px-4 py-2 rounded-md hover:bg-[#8B3A44] transition-colors disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Deals panel */}
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} className="text-[#722F37]" />
            <span className="text-xs font-medium tracking-widest uppercase">Date Scanner</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">From</label>
              <input
                type="date"
                className="w-full bg-muted border border-border rounded px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">To</label>
              <input
                type="date"
                className="w-full bg-muted border border-border rounded px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
          </div>
          <button className="mt-3 w-full text-xs py-2 border border-[#722F37] text-[#722F37] rounded hover:bg-[#722F37] hover:text-white transition-colors">
            Scan Availability
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-[#722F37]" />
            <span className="text-xs font-medium tracking-widest uppercase">Live Deals</span>
          </div>
          <div className="space-y-3">
            {flightDeals.map((deal, i) => (
              <div key={i} className="border border-border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold">{deal.route}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {deal.airline} · {deal.dates}
                    </div>
                  </div>
                  <div className="text-[#722F37] font-bold text-sm">{deal.price}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      deal.verified
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {deal.verified ? "✓ Verified" : "Unverified"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Exp: {deal.expires}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}