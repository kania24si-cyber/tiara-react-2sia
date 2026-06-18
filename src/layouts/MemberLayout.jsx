import { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";

import MemberSidebar from "../components/MemberSidebar";
import MemberHeader from "../components/MemberHeader";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MemberLayout() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const user = JSON.parse(
    localStorage.getItem("admin") || "null"
  );

  // Belum login atau data user hilang
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin tidak boleh masuk ke area Member
  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFFBFB] flex text-xs text-slate-800 antialiased font-sans">
      {/* Sidebar */}
      <MemberSidebar />

      {/* Content Area */}
      <div className="flex-1 ml-[210px] min-h-screen flex flex-col">
        {/* Header */}
        <MemberHeader user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Suspense
            fallback={
              <div className="py-20 flex justify-center">
                <LoadingSpinner text="Memuat Member Area BLOOM..." />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}