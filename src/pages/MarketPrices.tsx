import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { useI18n } from "@/contexts/i18n";
import { getMarketPrice } from "@/mocks/api";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MarketPricesPage() {
  const { t } = useI18n();
  useSEO("Market Prices — KichingConnect", t("hero.subtext"));
  const [data, setData] = useState<{ day: string; price: number }[]>([]);
  const [last, setLast] = useState(0);

  useEffect(() => {
    (async () => {
      const mp = await getMarketPrice("sheet");
      setData(mp.history7d);
      setLast(mp.last_price);
    })();
  }, []);

  return (
    <main className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-semibold">{t("tiles.viewPrices")}</h1>
      <Card>
        <CardContent className="pt-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" hide/>
                <YAxis hide domain={["dataMin-5", "dataMax+5"]}/>
                <Tooltip formatter={(v) => `₹${v}/kg`} />
                <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm">{t("market.suggestedMin")} <span className="font-semibold">₹{Math.round(last*1.02)}/kg</span></p>
            <Button variant="secondary">{t("actions.setPriceAlert")}</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
