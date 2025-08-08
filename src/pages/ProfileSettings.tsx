import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/contexts/i18n";
import { useSEO } from "@/hooks/use-seo";

export default function ProfileSettingsPage() {
  const { t } = useI18n();
  useSEO("Profile & Settings — KichingConnect", t("hero.subtext"));

  return (
    <main className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-semibold">{t("tiles.profileSettings")}</h1>
      <Card>
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm">{t("profile.kycInstruction")}</p>
          <div>
            <Label>ID Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div>
            <Label>Plantation Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div>
            <Label>Bank (UPI/NEFT)</Label>
            <Input placeholder="UPI ID or Account Number" />
          </div>
          <div>
            <Label>Offline SMS phone</Label>
            <Input placeholder="e.g. +91-90000 12345" />
          </div>
          <Button className="w-full" variant="secondary">Save</Button>
        </CardContent>
      </Card>
    </main>
  );
}
