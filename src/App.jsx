import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

import Loading from "./components/Loading";
import MembershipsDetail from "./pages/MembershipsDetail";

function App() {
  const Products = React.lazy(() => import("./pages/Products"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const Memberships = React.lazy(() => import("./pages/Memberships"));

  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"));
  const ProductsDetail = React.lazy(() => import("./pages/ProductsDetail"));
  const OrderDetail = React.lazy(() => import("./pages/OrderDetail"));
  const MembershipsDetail = React.lazy(() => import("./pages/MembershipsDetail"));
  const BloomComponents = React.lazy(() => import("./pages/BloomComponents"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        {/* MAIN */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="/Customers/:id" element={<CustomersDetail />} />
          <Route path="/Products/:id" element={<ProductsDetail />} />
          <Route path="/Orders/:id" element={<OrderDetail />} />
          <Route path="BloomComponents" element={<BloomComponents />} />
          <Route path="Memberships" element={<Memberships />} />
          <Route path="/Memberships/:id" element={<MembershipsDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
