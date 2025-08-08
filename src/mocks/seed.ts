export type Farmer = {
  id: string;
  name: string;
  village: string;
  phone: string;
  status: "Pending" | "Verified";
};

export type Buyer = {
  id: string;
  name: string;
  company: string;
  location: string;
};

export type Listing = {
  id: string;
  farmerId: string;
  type: "latex" | "sheet";
  quantityKg: number;
  grade: "A" | "B" | "C";
  moisturePct: number;
  expectedPrice: number;
  status: "Active" | "Sold" | "Cancelled";
  escrowRequired: boolean;
  createdAt: string;
};

export type Offer = {
  id: string;
  listingId: string;
  buyerId: string;
  pricePerKg: number;
  status: "Pending" | "Accepted" | "Countered" | "Cancelled";
  escrowStatus: "Pending" | "In Transit" | "Completed";
};

export const farmers: Farmer[] = [
  { id: "f1", name: "Rakesh Debbarma", village: "Ambassa", phone: "+91-90000 11111", status: "Verified" },
  { id: "f2", name: "Purnima Reang", village: "Udaipur", phone: "+91-90000 22222", status: "Pending" },
  { id: "f3", name: "Bikash Jamatia", village: "Kailashahar", phone: "+91-90000 33333", status: "Verified" },
];

export const buyers: Buyer[] = [
  { id: "b1", name: "Tripura Rubber Co.", company: "TRC Pvt Ltd", location: "Agartala" },
  { id: "b2", name: "Northeast Polymers", company: "NEP Ltd", location: "Guwahati" },
];

export const listings: Listing[] = [
  { id: "l1", farmerId: "f1", type: "sheet", quantityKg: 80, grade: "A", moisturePct: 6, expectedPrice: 160, status: "Active", escrowRequired: true, createdAt: new Date().toISOString() },
  { id: "l2", farmerId: "f1", type: "latex", quantityKg: 120, grade: "B", moisturePct: 12, expectedPrice: 145, status: "Active", escrowRequired: true, createdAt: new Date().toISOString() },
  { id: "l3", farmerId: "f2", type: "sheet", quantityKg: 60, grade: "C", moisturePct: 14, expectedPrice: 130, status: "Active", escrowRequired: false, createdAt: new Date().toISOString() },
  { id: "l4", farmerId: "f3", type: "sheet", quantityKg: 50, grade: "A", moisturePct: 5, expectedPrice: 162, status: "Active", escrowRequired: true, createdAt: new Date().toISOString() },
  { id: "l5", farmerId: "f3", type: "latex", quantityKg: 90, grade: "B", moisturePct: 11, expectedPrice: 148, status: "Active", escrowRequired: true, createdAt: new Date().toISOString() },
];

export const offers: Offer[] = [
  { id: "o1", listingId: "l1", buyerId: "b1", pricePerKg: 158, status: "Pending", escrowStatus: "Pending" },
  { id: "o2", listingId: "l2", buyerId: "b2", pricePerKg: 147, status: "Pending", escrowStatus: "Pending" },
];
