import { Outlet } from "react-router-dom";
// Tambahkan /guest_component/ sebelum nama filenya
import GuestLandingHeader from "../components/guest_component/GuestLandingHeader";
import GuestFooter from "../components/guest_component/GuestFooter";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-[#FFFBFB]">
      <GuestLandingHeader />

      <main>
        <Outlet />
      </main>

      <GuestFooter />
    </div>
  );
}