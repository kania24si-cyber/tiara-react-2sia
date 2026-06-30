import { Outlet, useNavigate } from "react-router-dom";
import GuestLandingHeader from "../components/guest_component/GuestLandingHeader";
import GuestFooter from "../components/guest_component/GuestFooter";

export default function GuestLayout() {
  const navigate = useNavigate();

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB]">
      <GuestLandingHeader
        navigate={navigate}
        scrollToId={scrollToId}
      />

      <main>
        <Outlet />
      </main>

      <GuestFooter />
    </div>
  );
}