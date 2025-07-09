import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategoryPage from "./pages/AdminCategoryPage";

import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CampaignProvider } from "./context/CampaignContext";

import IndianWearPage from "./pages/IndianWearPage";
import WesternWearPage from "./pages/WesternWearPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* ✅ Wrap ENTIRE app with all needed providers */}
        <ProductProvider>
          <CategoryProvider>
            <CampaignProvider>
              <Routes>
                {/* Customer UI routes (wrapped in Layout) */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="collections/:category" element={<Collections />} />
                  <Route path="product/:id" element={<Product />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="appointment" element={<Appointment />} />
                  <Route path="indian-wear" element={<IndianWearPage />} /> {/* ✅ Fixed */}
                  <Route path="western-wear" element={<WesternWearPage />} /> {/* ✅ Fixed */}
                  <Route path="*" element={<NotFound />} />
                </Route>


                {/* Admin UI routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/categories" element={<AdminCategoryPage />} />
              </Routes>
            </CampaignProvider>
          </CategoryProvider>
        </ProductProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
