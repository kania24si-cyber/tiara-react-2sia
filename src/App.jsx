import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

function App() {
  // ================= ADMIN PAGES =================
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Products = React.lazy(() => import("./pages/Products"));
  const Transactions = React.lazy(() => import("./pages/Transactions"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const Memberships = React.lazy(() => import("./pages/Memberships"));
  const Promos = React.lazy(() => import("./pages/Promos"));
  const Reviews = React.lazy(() => import("./pages/Reviews"));
  const Users = React.lazy(() => import("./pages/Users"));

  const ProductsDetail = React.lazy(() =>
    import("./pages/ProductsDetail")
  );

  const TransactionsDetail = React.lazy(() =>
    import("./pages/TransactionsDetail")
  );

  const CustomersDetail = React.lazy(() =>
    import("./pages/CustomersDetail")
  );

  const MembershipsDetail = React.lazy(() =>
    import("./pages/MembershipsDetail")
  );

  const PromosDetail = React.lazy(() =>
    import("./pages/PromosDetail")
  );

  const ReviewsDetail = React.lazy(() =>
    import("./pages/ReviewsDetail")
  );

  const UsersDetail = React.lazy(() =>
    import("./pages/UsersDetail")
  );

  // ================= AUTH =================
  const Login = React.lazy(() =>
    import("./pages/auth/Login")
  );

  const Register = React.lazy(() =>
    import("./pages/auth/Register")
  );

  const Forgot = React.lazy(() =>
    import("./pages/auth/Forgot")
  );

  // ================= LAYOUT =================
  const MainLayout = React.lazy(() =>
    import("./layouts/MainLayout")
  );

  const AuthLayout = React.lazy(() =>
    import("./layouts/AuthLayout")
  );

  const MemberLayout = React.lazy(() =>
    import("./layouts/MemberLayout")
  );

  // ================= MEMBER =================
  const MemberDashboard = React.lazy(() =>
    import("./pages/member/MemberDashboard")
  );

  const MemberProducts = React.lazy(() =>
    import("./pages/member/MemberProducts")
  );

  const MemberProductDetail = React.lazy(() =>
    import("./pages/member/MemberProductDetail")
  );

  const MemberOrders = React.lazy(() =>
    import("./pages/member/MemberOrders")
  );

  const MemberPromos = React.lazy(() =>
    import("./pages/member/MemberPromos")
  );

  const MemberReviews = React.lazy(() =>
    import("./pages/member/MemberReviews")
  );

  const MemberProfile = React.lazy(() =>
    import("./pages/member/MemberProfile")
  );

  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("isLoggedIn") === "true"
              ? <MainLayout />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductsDetail />} />

          <Route path="transactions" element={<Transactions />} />
          <Route
            path="transactions/:id"
            element={<TransactionsDetail />}
          />

          <Route path="customers" element={<Customers />} />
          <Route
            path="customers/:id"
            element={<CustomersDetail />}
          />

          <Route
            path="memberships"
            element={<Memberships />}
          />
          <Route
            path="memberships/:id"
            element={<MembershipsDetail />}
          />

          <Route path="promos" element={<Promos />} />
          <Route
            path="promos/:id"
            element={<PromosDetail />}
          />

          <Route path="reviews" element={<Reviews />} />
          <Route
            path="reviews/:id"
            element={<ReviewsDetail />}
          />

          <Route path="users" element={<Users />} />
          <Route
            path="users/:id"
            element={<UsersDetail />}
          />
        </Route>

        {/* ================= MEMBER ================= */}
        <Route
          path="/member"
          element={
            localStorage.getItem("isLoggedIn") === "true"
              ? <MemberLayout />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<MemberDashboard />} />

          <Route
            path="products"
            element={<MemberProducts />}
          />

          <Route
            path="products/:id"
            element={<MemberProductDetail />}
          />

          <Route
            path="orders"
            element={<MemberOrders />}
          />

          <Route
            path="promos"
            element={<MemberPromos />}
          />

          <Route
            path="reviews"
            element={<MemberReviews />}
          />

          <Route
            path="profile"
            element={<MemberProfile />}
          />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;