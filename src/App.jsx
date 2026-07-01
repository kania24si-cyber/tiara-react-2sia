import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

function App() {
  const [authState, setAuthState] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("admin") || "{}");
      const logged = localStorage.getItem("isLoggedIn") === "true";
      return { isLoggedIn: logged, user: u };
    } catch {
      return { isLoggedIn: false, user: {} };
    }
  });

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const u = JSON.parse(localStorage.getItem("admin") || "{}");
        const logged = localStorage.getItem("isLoggedIn") === "true";
        setAuthState({ isLoggedIn: logged, user: u });
      } catch {
        setAuthState({ isLoggedIn: false, user: {} });
      }
    };
    window.addEventListener("auth-state-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const { isLoggedIn, user } = authState;

  // ================= ADMIN PAGES =================
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Products = React.lazy(() => import("./pages/Products"));
  const Transactions = React.lazy(() => import("./pages/Transactions"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const Memberships = React.lazy(() => import("./pages/Memberships"));
  const Promos = React.lazy(() => import("./pages/Promos"));
  const Reviews = React.lazy(() => import("./pages/Reviews"));
  const Users = React.lazy(() => import("./pages/Users"));

  const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));
  const TransactionsDetail = React.lazy(() => import("./pages/TransactionsDetail"));
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"));
  const MembershipsDetail = React.lazy(() => import("./pages/MembershipsDetail"));
  const PromosDetail = React.lazy(() => import("./pages/PromosDetail"));
  const ReviewsDetail = React.lazy(() => import("./pages/ReviewsDetail"));
  const UsersDetail = React.lazy(() => import("./pages/UsersDetail"));
  const AdminProfile = React.lazy(() => import("./pages/AdminProfile"));

  // ================= AUTH =================
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  // ================= LAYOUT =================
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
  const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));
  const GuestLayout = React.lazy(() => import("./layouts/GuestLayout")); // <--- SUDAH DI-IMPORT

  // ================= GUEST PAGES =================
  const GuestLandingShell = React.lazy(() => import("./pages/Guest/GuestLandingShell"));

  // ================= MEMBER =================
  const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
  const MemberProducts = React.lazy(() => import("./pages/member/MemberProducts"));
  const MemberProductDetail = React.lazy(() => import("./pages/member/MemberProductDetail"));
  const MemberOrders = React.lazy(() => import("./pages/member/MemberOrders"));
  const MemberPromos = React.lazy(() => import("./pages/member/MemberPromos"));
  const MemberReviews = React.lazy(() => import("./pages/member/MemberReviews"));
  const MemberProfile = React.lazy(() => import("./pages/member/MemberProfile"));
  const MemberWishlist = React.lazy(() => import("./pages/member/MemberWishlist"));
  const MemberAddress = React.lazy(() => import("./pages/member/MemberAddress"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ================= GUEST LANDING (Menggunakan GuestLayout) ================= */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<GuestLandingShell />} />
          <Route path="landing" element={<Navigate to="/" replace />} />
          {/* Kamu bisa tambah route guest lain di sini nanti, misal: */}
          {/* <Route path="about" element={<GuestAbout />} /> */}
        </Route>

        {/* ================= AUTH AREA ================= */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        {/* ================= ADMIN AREA (Hanya Boleh Diakses Admin) ================= */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && user.role === "admin" ? (
              <MainLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductsDetail />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<TransactionsDetail />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomersDetail />} />
          <Route path="memberships" element={<Memberships />} />
          <Route path="memberships/:id" element={<MembershipsDetail />} />
          <Route path="promos" element={<Promos />} />
          <Route path="promos/:id" element={<PromosDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:id" element={<ReviewsDetail />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UsersDetail />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* ================= MEMBER AREA (Hanya Boleh Diakses Member) ================= */}
        <Route
          path="/member"
          element={
            isLoggedIn && user.role === "member" ? (
              <MemberLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="products" element={<MemberProducts />} />
          <Route path="products/:id" element={<MemberProductDetail />} />
          <Route path="wishlist" element={<MemberWishlist />} />
          <Route path="orders" element={<MemberOrders />} />
          <Route path="promos" element={<MemberPromos />} />
          <Route path="reviews" element={<MemberReviews />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="address" element={<MemberAddress />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;