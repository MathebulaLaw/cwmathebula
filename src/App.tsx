import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogIndex from "./pages/blog/Index";
import BlogPost from "./pages/blog/Post";
import NewPost from "./pages/blog/NewPost";
import EditPost from "./pages/blog/EditPost";
import ViewDraft from "./pages/blog/ViewDraft";
import BlogAdmin from "./pages/blog/Admin";
import AdminLogin from "./pages/blog/AdminLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/blog/admin" element={<BlogAdmin />} />
            <Route path="/blog/admin/new" element={<NewPost />} />
            <Route path="/blog/:slug/edit" element={<EditPost />} />
            <Route path="/blog/draft/:id" element={<ViewDraft />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
