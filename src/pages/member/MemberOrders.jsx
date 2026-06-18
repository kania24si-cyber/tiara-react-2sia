// src/pages/member/MemberOrders.jsx
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import OrderCard from "../../components/OrderCard"; 

export default function MemberOrders() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
    setOrders(stored);
    setLoading(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (!window.confirm("Batalkan dan hapus permanen data pesanan ini? ⚠️")) return;
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updated));
    setOrders(updated);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Purchase Orders" 
        subtitle="Pantau pelacakan status pesanan invoice kosmetik terbitan Anda." 
        breadcrumb={["Member", "Orders"]} 
      />

      {loading && <LoadingSpinner text="Memuat riwayat transaksi kupon..." />}
      {!loading && orders.length === 0 && <EmptyState text="Anda belum melakukan pemesanan kosmetik." />}

      {/* TAMPILAN LAYOUT GRID MENGGUNAKAN ORDER CARD */}
      {!loading && orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onDelete={handleDeleteOrder} 
            />
          ))}
        </div>
      )}
    </div>
  );
}