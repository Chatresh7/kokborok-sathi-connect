import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ListRubberPage from "./pages/ListRubber";
import MarketPricesPage from "./pages/MarketPrices";
import SalesOffersPage from "./pages/SalesOffers";
import HelpSupportPage from "./pages/HelpSupport";
import ProfileSettingsPage from "./pages/ProfileSettings";
import { I18nProvider } from "./contexts/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/list" element={<ListRubberPage />} />
            <Route path="/prices" element={<MarketPricesPage />} />
            <Route path="/sales" element={<SalesOffersPage />} />
            <Route path="/help" element={<HelpSupportPage />} />
            <Route path="/profile" element={<ProfileSettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
