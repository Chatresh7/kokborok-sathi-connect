import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n";
import { useSEO } from "@/hooks/use-seo";
import { toast } from "@/hooks/use-toast";

export default function HelpSupportPage() {
  const { t } = useI18n();
  useSEO("Help & Support — KichingConnect", t("hero.subtext"));

  const smsList = t("sms.template.listRubber");
  const smsPrice = t("sms.template.requestPrice");

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ description: t("actions.copySms") + " ✅" });
  };

  return (
    <main className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-semibold">{t("tiles.helpSupport")}</h1>
      <Card>
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm">{t("support.needHelp")}</p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary">{t("actions.callAgent")}</Button>
            <Button variant="outline">{t("actions.requestOfficer")}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <h2 className="font-medium">SMS Templates</h2>
          <div className="bg-muted rounded-md p-3 text-xs">
            <div className="font-mono">{smsList}</div>
            <Button size="sm" className="mt-2" onClick={() => copy(smsList)}>{t("actions.copySms")}</Button>
          </div>
          <div className="bg-muted rounded-md p-3 text-xs">
            <div className="font-mono">{smsPrice}</div>
            <Button size="sm" className="mt-2" onClick={() => copy(smsPrice)}>{t("actions.copySms")}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-2">
          <h2 className="font-medium">Demo scenarios</h2>
          <ol className="list-decimal pl-4 text-sm space-y-1">
            <li>Register & List (voice): Use Kokborok, create a 50kg sheet listing.</li>
            <li>Buyer purchase & escrow: Accept offer, simulate pickup, show escrow release.</li>
            <li>Price alert (SMS): Set threshold and simulate alert via SMS template.</li>
          </ol>
        </CardContent>
      </Card>
    </main>
  );
}
