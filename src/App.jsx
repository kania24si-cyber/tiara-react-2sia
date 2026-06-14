import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

function App() {
  // Lazy Loading untuk Halaman Utama / List
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Products = React.lazy(() => import("./pages/Products"));
  const Transactions = React.lazy(() => import("./pages/Transactions"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const Memberships = React.lazy(() => import("./pages/Memberships"));
  const Promos = React.lazy(() => import("./pages/Promos")); 
  const Reviews = React.lazy(() => import("./pages/Reviews")); 
  const Users = React.lazy(() => import("./pages/Users"));

  // Lazy Loading untuk Halaman Detail (Berbasis ID)
  const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));
  const TransactionsDetail = React.lazy(() => import("./pages/TransactionsDetail"));
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"));
  const MembershipsDetail = React.lazy(() => import("./pages/MembershipsDetail"));
  const PromosDetail = React.lazy(() => import("./pages/PromosDetail")); 
  const ReviewsDetail = React.lazy(() => import("./pages/ReviewsDetail")); // PERBAIKAN: Ditambahkan rute detail review
  const UsersDetail = React.lazy(() => import("./pages/UsersDetail"));

  // Lazy Loading untuk Modul Otentikasi (Auth)
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  // Lazy Loading untuk Layout Utama Component
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        {/* ================= DASHBOARD PROTECTED ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("isLoggedIn") === "true" ? (
              <MainLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Main Index Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Modul Barang & Produk */}
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductsDetail />} />

          {/* Modul Kasir & Invoice Transaksi */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<TransactionsDetail />} />

          {/* Modul Keanggotaan & Data Pelanggan */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomersDetail />} />

          {/* Modul Tingkatan Membership Tier */}
          <Route path="memberships" element={<Memberships />} />
          <Route path="memberships/:id" element={<MembershipsDetail />} />

          {/* Modul Manajemen Kupon Potongan Harga / Promos */}
          <Route path="promos" element={<Promos />} />
          <Route path="promos/:id" element={<PromosDetail />} />

          {/* Modul Review & Komentar Pelanggan */}
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:id" element={<ReviewsDetail />} /> {/* PERBAIKAN: Route parameter ID aktif */}

          {/* Modul Manajemen Akses Karyawan / Users */}
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UsersDetail />} />
        </Route>

        {/* CATCH ALL: Menangani jika user mengetik asal URL yang tidak terdaftar */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;