import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-soft px-4">
      <div className="card-beauty w-full max-w-md p-8 text-center">
        {/* LOGO */}
        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 BeautyBloom Makeup Store Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
