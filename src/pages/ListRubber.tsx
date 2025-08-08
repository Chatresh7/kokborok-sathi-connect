import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/i18n";
import { useSEO } from "@/hooks/use-seo";
import { getMarketPrice, postListing } from "@/mocks/api";
import { toast } from "@/hooks/use-toast";

export default function ListRubberPage() {
  const { t } = useI18n();
  useSEO("List Rubber — KichingConnect", t("hero.subtext"));

  const [photo, setPhoto] = useState<File | null>(null);
  const [type, setType] = useState<"latex" | "sheet">("sheet");
  const [quantity, setQuantity] = useState<number>(50);
  const [grade, setGrade] = useState<"A" | "B" | "C">("A");
  const [moisture, setMoisture] = useState<number>(8);
  const [expectedPrice, setExpectedPrice] = useState<number>(160);
  const [suggested, setSuggested] = useState<number | null>(null);

  const onCalc = async () => {
    const mp = await getMarketPrice(type);
    let factor = mp.suggested_price_factor;
    if (grade === "A") factor += 0.03; else if (grade === "C") factor -= 0.03;
    factor -= Math.max(0, (moisture - 10)) * 0.002; // moisture penalty
    const s = Math.round(mp.last_price * factor);
    setSuggested(s);
    setExpectedPrice(s);
  };

  const onList = async (pickup: boolean) => {
    const res = await postListing({
      farmerId: "f1",
      type,
      quantityKg: quantity,
      grade,
      moisturePct: moisture,
      expectedPrice,
      escrowRequired: true,
    });
    toast({ description: t("toast.listedSuccess") });
  };

  const photoPreview = useMemo(() => (photo ? URL.createObjectURL(photo) : null), [photo]);

  return (
    <main className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-semibold">List Rubber</h1>
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div>
            <Label>{t("list.photo")}</Label>
            <Input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
            {photoPreview && <img src={photoPreview} alt="Listing photo" className="mt-2 h-32 w-full object-cover rounded-md" />}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("list.type")}</Label>
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger><SelectValue placeholder={t("list.type")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="latex">{t("list.type.latex")}</SelectItem>
                  <SelectItem value="sheet">{t("list.type.sheet")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("list.quantity")}</Label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value || "0"))} />
            </div>
            <div>
              <Label>{t("list.grade")}</Label>
              <Select value={grade} onValueChange={(v) => setGrade(v as any)}>
                <SelectTrigger><SelectValue placeholder={t("list.grade")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("list.moisture")}</Label>
              <Input type="number" value={moisture} onChange={(e) => setMoisture(parseInt(e.target.value || "0"))} />
            </div>
            <div className="col-span-2">
              <Label>{t("list.expectedPrice")}</Label>
              <Input type="number" value={expectedPrice} onChange={(e) => setExpectedPrice(parseInt(e.target.value || "0"))} />
            </div>
          </div>

          <div className="flex items-center justify-between bg-muted rounded-md p-3">
            <span className="text-sm">{t("list.fairPriceLabel")} {suggested ? `₹${suggested}/kg` : "—"}</span>
            <Button variant="outline" onClick={onCalc}>Calculate</Button>
          </div>

          <div className="flex gap-3">
            <Button variant="hero" className="flex-1" onClick={() => onList(false)}>{t("actions.list")}</Button>
            <Button className="flex-1" onClick={() => onList(true)}>{t("actions.requestPickup")}</Button>
          </div>
          <div>
            <Button variant="outline" className="w-full">{t("actions.storeTillBuyer")}</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
