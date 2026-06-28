import { Outlet } from "react-router-dom";
// Tambahkan /guest_component/ sebelum nama filenya
import GuestLandingHeader from "../components/guest_component/GuestLandingHeader";
import GuestFooter from "../components/guest_component/GuestFooter";

export default function GuestLayout() {
  const navigateHeader = () => {
    // placeholder to satisfy props shape
  };

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB]">
      <GuestLandingHeader
        navigate={(path) => (typeof navigateHeader === "function" ? navigateHeader(path) : undefined)}
        scrollToId={scrollToId}
      />

      <main>
        <Outlet />
      </main>

      <GuestFooter />
    </div>
  );
}