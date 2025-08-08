import hero from "@/assets/hero-rubber.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n";
import { useSEO } from "@/hooks/use-seo";
import { NavLink } from "react-router-dom";
import { Megaphone, IndianRupee, ClipboardList, HelpCircle, UserCog, Mic } from "lucide-react";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { LanguageSelector } from "@/components/LanguageSelector";

const tiles = [
  { to: "/list", icon: ClipboardList, key: "tiles.listRubber" },
  { to: "/prices", icon: IndianRupee, key: "tiles.viewPrices" },
  { to: "/sales", icon: Megaphone, key: "tiles.salesOffers" },
  { to: "/help", icon: HelpCircle, key: "tiles.helpSupport" },
  { to: "/profile", icon: UserCog, key: "tiles.profileSettings" },
];

const Index = () => {
  const { t } = useI18n();
  useSEO("KichingConnect — Home", t("hero.subtext"));

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 pt-4">
        <h1 className="text-2xl font-bold font-brand">{t("app.name", "KichingConnect")}</h1>
      </header>

      <main>
        <section className="px-4 pt-4">
          <article className="overflow-hidden rounded-2xl shadow-soft">
            <img src={hero} alt="Rubber plantation Tripura, fair trade marketplace" className="w-full h-44 object-cover" loading="eager" />
          </article>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{t("hero.tagline")}</h2>
            <p className="text-muted-foreground mt-1">{t("hero.subtext")}</p>
          </div>
        </section>

        <section className="px-4 mt-6 grid grid-cols-2 gap-3">
          {tiles.map(({ to, icon: Icon, key }) => (
            <NavLink key={to} to={to} className="block">
              <Card className="hover:shadow-elevated transition-shadow">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Icon className="mb-2" />
                  <span className="text-sm text-center font-medium">{t(key)}</span>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </section>

        <section className="px-4 mt-6">
          <Card>
            <CardContent className="py-4">
              <blockquote className="text-sm italic">“Success must give back to the soil that raised it.”</blockquote>
              <p className="text-xs text-muted-foreground mt-1">— Maharshi (inspiration for KichingConnect)</p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Floating controls */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-3">
        <VoiceAssistant />
      </div>
      <div className="fixed right-4 bottom-6">
        <LanguageSelector floating />
      </div>
    </div>
  );
};

export default Index;
