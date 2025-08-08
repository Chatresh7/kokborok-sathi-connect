import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/i18n";
import { useSEO } from "@/hooks/use-seo";
import { db, offers } from "@/mocks/api";

export default function SalesOffersPage() {
  const { t } = useI18n();
  useSEO("My Sales & Offers — KichingConnect", t("hero.subtext"));
  const [list, setList] = useState(offers);

  const accept = (id: string) => setList((l) => l.map(o => o.id===id? { ...o, status: "Accepted", escrowStatus: "In Transit" } : o));
  const counter = (id: string) => setList((l) => l.map(o => o.id===id? { ...o, status: "Countered" } : o));
  const cancel = (id: string) => setList((l) => l.map(o => o.id===id? { ...o, status: "Cancelled" } : o));

  return (
    <main className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-semibold">{t("tiles.salesOffers")}</h1>
      {list.map((o) => {
        const listing = db.listings.find(l=>l.id===o.listingId)!;
        return (
          <Card key={o.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{listing.type.toUpperCase()} • {listing.grade} • {listing.quantityKg}kg</p>
                  <p className="text-xs text-muted-foreground">₹{o.pricePerKg}/kg • Escrow: {o.escrowStatus}</p>
                </div>
                <div className="text-xs text-muted-foreground">{o.status}</div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button size="sm" onClick={()=>accept(o.id)}>{t("actions.acceptOffer")}</Button>
                <Button size="sm" variant="secondary" onClick={()=>counter(o.id)}>{t("actions.counterOffer")}</Button>
                <Button size="sm" variant="outline" onClick={()=>cancel(o.id)}>{t("actions.cancel")}</Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </main>
  );
}
