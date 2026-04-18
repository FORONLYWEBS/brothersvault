import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/style-assistant`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const StyleAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "🔮 Welcome to the Vault. Tell me your vibe — oversized? minimal? mysterious? — and I'll summon the perfect tee.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const products = getAllProducts().map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        tag: p.tag,
      }));

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON}`,
        },
        body: JSON.stringify({ messages: next, products }),
      });

      if (resp.status === 429) { toast.error("Too many requests. Please wait a moment."); setLoading(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted."); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("The Oracle is silent. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger — bottom-left */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 left-5 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent border border-primary/40 shadow-[0_0_30px_hsl(270_60%_55%/0.6)] flex items-center justify-center group"
        aria-label="Open Style Oracle"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        {open ? (
          <X className="w-6 h-6 text-primary-foreground relative z-10" />
        ) : (
          <Sparkles className="w-6 h-6 text-primary-foreground relative z-10" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed bottom-24 left-5 z-[60] w-[min(92vw,360px)] h-[min(70vh,520px)] flex flex-col bg-card/95 backdrop-blur-xl border border-primary/30 rounded-lg shadow-[0_0_50px_hsl(270_60%_55%/0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-primary/20 bg-gradient-to-r from-background/80 to-card/80 flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bebas tracking-[0.2em] text-sm">STYLE ORACLE</p>
                <p className="text-[10px] font-oswald tracking-wider text-muted-foreground">
                  AI-POWERED · WHISPERS FROM THE VAULT
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-sm rounded-md font-oswald tracking-wide leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary/90 text-primary-foreground"
                        : "bg-secondary/80 text-foreground border border-primary/10"
                    }`}
                  >
                    {m.content || (loading && i === messages.length - 1 ? "..." : "")}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 bg-secondary/80 rounded-md border border-primary/10">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 border-t border-primary/20 bg-background/60 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your vibe..."
                className="flex-1 px-3 py-2 bg-background border border-border text-sm font-oswald rounded-sm focus:outline-none focus:border-primary"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StyleAssistant;
