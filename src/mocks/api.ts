import { buyers, farmers, listings, offers, type Listing, type Offer } from "./seed";

export type MarketPrice = {
  last_price: number; // ₹/kg
  trend: "up" | "down" | "flat";
  suggested_price_factor: number; // multiplier for fair price
  history7d: { day: string; price: number }[];
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getMarketPrice(type: "sheet" | "latex" = "sheet"): Promise<MarketPrice> {
  await delay(400);
  const base = type === "sheet" ? 152 : 138;
  const history7d = Array.from({ length: 7 }).map((_, i) => ({
    day: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    price: Math.round(base + Math.sin(i) * 4 + (Math.random() * 2 - 1)),
  }));
  const last = history7d[6].price;
  const prev = history7d[5].price;
  return {
    last_price: last,
    trend: last > prev ? "up" : last < prev ? "down" : "flat",
    suggested_price_factor: 1.05,
    history7d,
  };
}

export async function postListing(payload: Omit<Listing, "id" | "status" | "createdAt">): Promise<{ listing_id: string; escrow_required: boolean }>
{
  await delay(500);
  const id = `l${listings.length + 1}`;
  const newL: Listing = {
    id,
    createdAt: new Date().toISOString(),
    status: "Active",
    escrowRequired: true,
    ...payload,
  };
  listings.unshift(newL);
  return { listing_id: id, escrow_required: newL.escrowRequired };
}

export async function postOffer(payload: Omit<Offer, "id" | "status" | "escrowStatus">): Promise<{ offer_id: string; status: Offer["status"] }>{
  await delay(400);
  const id = `o${offers.length + 1}`;
  const ofr: Offer = { id, status: "Pending", escrowStatus: "Pending", ...payload } as Offer;
  offers.unshift(ofr);
  return { offer_id: id, status: ofr.status };
}

export async function postPickupRequest(listingId: string): Promise<{ scheduled_time: string; transporter_id: string }>{
  await delay(500);
  return { scheduled_time: new Date(Date.now() + 36 * 3600000).toISOString(), transporter_id: "T-TRIPURA-001" };
}

export const db = { farmers, buyers, listings, offers };
export { offers };
