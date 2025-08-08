import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, Mic, Square, Send, Languages, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/i18n";
import convo from "@/data/conversation-map.json";
import { getMarketPrice } from "@/mocks/api";

interface ChatMsg { role: "user" | "assistant"; text: string }

function speak(text: string, lang: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {}
}

export function VoiceAssistant() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([{
    role: "assistant",
    text: t("support.needHelp", "Need help? Talk to RubberSathi (voice) or send SMS."),
  }]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const langCode = useMemo(() => ({ kok: "en-IN", bn: "bn-IN", hi: "hi-IN", en: "en-IN" } as const)[locale], [locale]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: content }]);

    // Very simple intent routing
    const lc = content.toLowerCase();
    if (/(price|দাম|कितना|phai)/.test(lc)) {
      const mp = await getMarketPrice("sheet");
      const reply = locale === "bn"
        ? `আজ বাজার দাম ₹${mp.last_price}/কেজি। আপনার জন্য প্রস্তাবিত মূল্য ₹${Math.round(mp.last_price*1.05)}/কেজি।`
        : locale === "hi"
        ? `आज का बाज़ार मूल्य ₹${mp.last_price}/किग्रा। आपके लिए सुझाया गया ₹${Math.round(mp.last_price*1.05)}/किग्रा।`
        : locale === "kok"
        ? `Bazar phai: ₹${mp.last_price}/kg. Suggested: ₹${Math.round(mp.last_price*1.05)}/kg.`
        : `Today market price is ₹${mp.last_price}/kg. Suggested fair price: ₹${Math.round(mp.last_price*1.05)}/kg.`;
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      speak(reply, langCode);
      return;
    }

    // Fallback scripted response from map, else default help
    const scripted = (convo as any).fallback?.[locale] || (convo as any).fallback?.en;
    const reply = scripted ?? "How can I help you today?";
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    speak(reply, langCode);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="lg" className="rounded-full shadow-elevated animate-floaty" aria-label="Open voice assistant">
          <Bot className="mr-2" /> {t("assistant.name", "RubberSathi")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-brand">{t("assistant.name", "RubberSathi")} — {locale.toUpperCase()}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-auto space-y-3 pr-1">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "assistant" ? "bg-muted rounded-lg p-3" : "text-right"}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here…" />
          <Button onClick={() => handleSend()} aria-label="Send"><Send /></Button>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><Languages size={16} /> {locale.toUpperCase()}</div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} /> Voice simulation with TTS
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
