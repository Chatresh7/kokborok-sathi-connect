import { Globe } from "lucide-react";
import { useI18n, type Locale } from "@/contexts/i18n";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const langs: { code: Locale; label: string }[] = [
  { code: "kok", label: "Kokborok" },
  { code: "bn", label: "বাংলা" },
  { code: "hi", label: "हिन्दी" },
  { code: "en", label: "English" },
];

export function LanguageSelector({ floating = false }: { floating?: boolean }) {
  const { locale, setLocale } = useI18n();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={floating ? "hero" : "outline"}
          size={floating ? "lg" : "sm"}
          className={floating ? "rounded-full shadow-elevated" : ""}
          aria-label="Language"
        >
          <Globe className="mr-2" /> {floating ? langs.find((l) => l.code === locale)?.label : locale.toUpperCase()}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44">
        <div className="flex flex-col gap-1">
          {langs.map((l) => (
            <Button key={l.code} variant={l.code === locale ? "secondary" : "ghost"} onClick={() => setLocale(l.code)}>
              {l.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
