import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Header from "./components/application/Header";
import Footer from "./components/application/Footer";
import AdminPage from "./page/AdminPage";
import ScrollToTop from "./components/application/ScrollToTop";
import { Toaster } from "react-hot-toast";

// Lazy-loaded pages for optimized performance and bundle sizes
const AboutPage = lazy(() => import("./page/AboutPage"));
const ExperiencePage = lazy(() => import("./page/ExperiencePage"));
const ProjectsPage = lazy(() => import("./page/ProjectsPage"));
const ServicesPage = lazy(() => import("./page/ServicesPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const BlogsPage = lazy(() => import("./page/BlogsPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-between">
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/experience"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <ExperiencePage />
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <BlogsPage />
              </Suspense>
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 text-sm">Loading...</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
