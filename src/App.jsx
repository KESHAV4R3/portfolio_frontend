import { Suspense, lazy, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Header from "./components/application/Header";
import AdminPage from "./page/AdminPage";
import { Toaster } from "react-hot-toast";
// Other pages load lazily
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));
const App = () => {
  return (
    <div className="overflow-hidden h-full">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          }
        />

        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
