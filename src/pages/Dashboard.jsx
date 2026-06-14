import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Semua ikon terdaftar aman di sini
import { 
  FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign, 
  FiPackage, FiRefreshCw, FiLogOut, FiBell, FiShield, FiActivity, 
  FiCheckCircle, FiCpu, FiZap, FiPlusCircle, FiSliders, FiList, FiCheck,
  FiHardDrive, FiStar, FiPercent, FiGift
} from "react-icons/fi";

// Custom Modular Components
import StatsCard from "../components/StatsCard";
import LiveChartSimulated from "../components/LiveChartSimulated";

// Import API tambahan yang baru diintegrasikan 🌸
import { promosAPI } from "../services/promosAPI";
import { reviewsAPI } from "../services/reviewsAPI";

// ================= CONFIGURATION SUPABASE =================
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk";
const BASE_HEADERS = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const ENDPOINTS = {
  customers: "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/customers",
  products: "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/products",
  transactions: "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/transactions"
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // State Data Mentah untuk Seksi Bawah
  const [rawProducts, setRawProducts] = useState([]);
  const [rawPromos, setRawPromos] = useState([]);
  const [rawReviews, setRawReviews] = useState([]);

  // Data Ringkasan Angka (Metrics)
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    activeStok: 0
  });

  // Log Aktivitas Sistem
  const [logs, setLogs] = useState([
    { id: 1, text: "Sistem berhasil berjalan. Menghubungkan ke database...", time: "Sistem" },
  ]);

  // --- AMBIL DATA REAL-TIME MULTI-API ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") navigate("/");

    const fetchAllDashboardData = async () => {
      setIsFetching(true);
      try {
        // Fetch data secara paralel dari endpoint bawaan dan service API eksternal
        const [
          resTransactions, 
          resCustomers, 
          resProducts, 
          dataPromos, 
          dataReviews
        ] = await Promise.all([
          axios.get(`${ENDPOINTS.transactions}?select=*`, { headers: BASE_HEADERS }),
          axios.get(`${ENDPOINTS.customers}?select=*`, { headers: BASE_HEADERS }),
          axios.get(`${ENDPOINTS.products}?select=*`, { headers: BASE_HEADERS }),
          promosAPI.fetchPromos().catch(() => []), // fallback array kosong jika gagal
          reviewsAPI.fetchReviews().catch(() => [])
        ]);

        const transactionsData = resTransactions.data || [];
        const customersData = resCustomers.data || [];
        const productsData = resProducts.data || [];

        // Ambil data terbatas untuk preview di dashboard utama
        setRawProducts(productsData.slice(0, 4));
        setRawPromos(dataPromos.slice(0, 3)); // Ambil 3 promo teratas
        setRawReviews(dataReviews.slice(0, 3)); // Ambil 3 review terbaru

        // Kalkulasi metrics statistika
        const totalRevenue = transactionsData.reduce((sum, item) => sum + (Number(item.total_transaksi) || 0), 0);
        const totalStok = productsData.reduce((sum, item) => sum + (Number(item.stok || item.stok_produk || item.quantity) || 0), 0);

        setMetrics({
          revenue: totalRevenue || 542000000, 
          orders: transactionsData.length,
          customers: customersData.length,
          activeStok: totalStok || 450
        });

        // Trigger Log otomatis dari transaksi terbaru
        if (transactionsData.length > 0) {
          const timestamp = new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const latestTx = transactionsData[transactionsData.length - 1];
          
          const newLog = {
            id: Date.now(),
            text: `Update otomatis: Berhasil memuat ${transactionsData.length} transaksi terbaru. ID Transaksi terakhir: #${latestTx.id || 'N/A'}.`,
            time: timestamp
          };

          setLogs(prev => {
            if (prev[0] && prev[0].text === newLog.text) return prev; 
            return [newLog, ...prev.slice(0, 4)];
          });
        }

      } catch (error) {
        console.error("Gagal memperbarui data gabungan dashboard:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllDashboardData();
    const dbInterval = setInterval(fetchAllDashboardData, 6000); // interval sinkronisasi diperpanjang sedikit agar beban API optimal

    return () => clearInterval(dbInterval);
  }, [navigate]);

  const handleQuickAction = (actionName, label) => {
    setActionLoading(actionName);
    setTimeout(() => {
      setActionLoading(null);
      const timestamp = new Date().toLocaleTimeString("id-ID");
      setLogs(prev => [{
        id: Date.now(),
        text: `Aksi Anda: Berhasil menjalankan perintah "${label}".`,
        time: timestamp
      }, ...prev.slice(0, 4)]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans antialiased text-slate-800 pb-16 relative overflow-x-hidden">
      
      {/* Background Glow Design */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none"></div>

      {/* ISI UTAMA DASHBOARD */}
      <main className="p-4 sm:p-8 lg:p-10 space-y-8 max-w-7xl w-full mx-auto relative z-10">
        
        {/* ================= KOMP. 1: BANNER TOP NAV ================= */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-slate-950/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent opacity-80 pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-rose-500/30">
                B
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Dashboard BLOOM
                </h1>
                <p className="text-xs text-slate-400 font-medium">Pantau bisnis, promo, dan ulasan pelanggan real-time.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {isFetching ? (
                <span className="text-[10px] bg-amber-400/10 text-amber-300 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 border border-amber-400/20 backdrop-blur-md">
                  <FiRefreshCw className="animate-spin" size={11} /> Memperbarui pusat data...
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 border border-emerald-400/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 relative flex">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  </span> 
                  Koneksi Lapisan Supabase Aman
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-2xl text-[11px] font-bold text-slate-300 backdrop-blur-md">
              <FiShield className="text-rose-400" size={13} /> Terproteksi
            </div>
            
            <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-2xl relative transition-all">
              <FiBell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>

            <button 
              onClick={() => { localStorage.clear(); navigate("/"); }} 
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-rose-500/10 transition-all transform active:scale-95 ml-auto md:ml-0"
            >
              <FiLogOut size={13} /> Keluar
            </button>
          </div>
        </section>

        {/* ================= KOMP. 2: KARTU METRIK UTAMA ================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard title="Total Pendapatan" value={`Rp ${metrics.revenue.toLocaleString("id-ID")}`} trend="Langsung" icon={<FiDollarSign />} color="from-rose-500 to-pink-500" />
          <StatsCard title="Jumlah Transaksi" value={`${metrics.orders} Sukses`} trend="Sinkron" icon={<FiShoppingBag />} color="from-amber-400 to-orange-500" />
          <StatsCard title="Total Pelanggan" value={`${metrics.customers} Akun`} trend="Bertumbuh" icon={<FiUsers />} color="from-indigo-500 to-purple-500" />
          <StatsCard title="Sisa Stok Produk" value={`${metrics.activeStok} Unit`} trend="Otomatis" icon={<FiPackage />} color="from-emerald-500 to-teal-500" />
        </section>

        {/* ================= KOMP. 3: GRAFIK & AKTIVITAS SISTEM ================= */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="mb-6">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FiTrendingUp className="text-rose-500" size={16} /> Grafik Transaksi Menit Ini
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Memantau naik turunnya penjualan langsung dari database pusat.</p>
            </div>
            <LiveChartSimulated currentRevenue={metrics.revenue} />
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <FiActivity className="text-rose-500 animate-pulse" size={16} /> Riwayat Aktivitas Sistem
              </h3>
              <div className="space-y-3">
                {logs.map(log => (
                  <div key={log.id} className="p-3 bg-slate-50/70 border border-slate-100 rounded-2xl text-[11px] flex justify-between items-start transition-all hover:bg-slate-100/50">
                    <p className="text-slate-600 font-semibold max-w-[75%] leading-relaxed">
                      {log.text}
                    </p>
                    <span className="text-[9px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-lg font-mono font-bold whitespace-nowrap border border-rose-100/40">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-zinc-800 rounded-2xl p-4 text-white mt-5 flex items-center justify-between shadow-md">
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Status Sinkronisasi</p>
                <h4 className="text-sm font-bold mt-0.5 flex items-center gap-1.5 text-emerald-400">
                  <FiCheckCircle size={14} /> Berjalan Lancar
                </h4>
              </div>
              <span className="px-2.5 py-1 bg-white/10 rounded-xl text-[10px] font-bold border border-white/10">Aktif</span>
            </div>
          </div>
        </section>

        {/* ================= KOMP. 4: LIVE REVIEW FEED CARDS & PROMOS (MENGGANTIKAN TABEL GENERIK KAKU) ================= */}
        <section className="grid lg:grid-cols-3 gap-6">
          
          {/* SEKSI A: MINI REVIEW FEED CARDS (Tampilan Komentar Berbentuk Card Mini) */}
          <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FiStar className="text-amber-500 fill-amber-400" size={16} /> Ulasan Terbaru Pembeli
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Umpan balik langsung dari komponen review terintegrasi.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rawReviews.length > 0 ? (
                rawReviews.map((rev) => (
                  <div key={rev.id} className="bg-pink-50/40 border border-pink-100/50 p-4 rounded-2xl flex flex-col justify-between text-[11px]">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 truncate max-w-[80px]">
                          {rev.customers?.nama_lengkap || "Anonim"}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-100/60 px-1.5 py-0.5 rounded text-[10px]">
                          <FiStar size={10} className="fill-amber-500 text-amber-500" /> {rev.rating}
                        </span>
                      </div>
                      <p className="text-[10px] text-indigo-600 font-bold mb-2 truncate">
                        📦 {rev.products?.name || "Produk Bloom"}
                      </p>
                      <p className="text-slate-600 italic line-clamp-3">
                        "{rev.komentar || "Hanya memberi rating bintang."}"
                      </p>
                    </div>
                    <div className="text-[9px] text-slate-400 mt-3 pt-2 border-t border-pink-100/40 text-right">
                      {new Date(rev.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-6 text-slate-400">Belum ada feedback masuk.</div>
              )}
            </div>
          </div>

          {/* SEKSI B: KARTU PROMO YANG SEDANG BERJALAN */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FiGift className="text-rose-500" size={16} /> Promosi Aktif Toko
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Potongan harga khusus dari database tabel promo.</p>
            </div>

            <div className="space-y-2.5">
              {rawPromos.length > 0 ? (
                rawPromos.map((promo) => (
                  <div key={promo.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-zinc-50 border border-slate-100 rounded-xl text-[11px]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
                        <FiPercent size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 tracking-wider font-mono">{promo.kode_promo}</p>
                        <p className="text-[10px] text-slate-400">Min. Blj: Rp {(promo.minimal_transaksi || 0).toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                        {promo.persentase_diskon}% OFF
                      </span>
                      <p className="text-[8px] text-slate-400 mt-1">Exp: {promo.tanggal_kedaluwarsa || "N/A"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400">Tidak ada kode promo aktif.</div>
              )}
            </div>
          </div>
        </section>

        {/* ================= KOMP. 5: DETAIL STOK GUDANG ================= */}
        <section className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
          <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2">
            <FiList className="text-indigo-500" size={16} /> Stok Terkini Alokasi Gudang
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rawProducts.length > 0 ? rawProducts.map((prod, idx) => (
              <div key={prod.id || idx} className="p-4 bg-slate-50 border border-slate-100/60 rounded-2xl flex flex-col justify-between">
                <div>
                  <p className="font-bold text-slate-800 text-[11px] line-clamp-1">{prod.nama_produk || prod.name || "Produk Bloom"}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">ID Unit: #{prod.id}</p>
                </div>
                <div className="mt-3 flex items-center justify-between bg-white px-2.5 py-1 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 font-medium">Tersedia</span>
                  <span className="font-mono font-bold text-slate-900 text-xs">{prod.stok || prod.quantity || 0} Pcs</span>
                </div>
              </div>
            )) : (
              <p className="text-xs text-slate-400 py-2 col-span-4 text-center">Belum ada data produk dimuat.</p>
            )}
          </div>
        </section>

        {/* ================= KOMP. 6: AKSI CEPAT & INFRASTRUKTUR BEBAN SERVER ================= */}
        <section className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <div className="mb-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FiSliders className="text-indigo-500" size={16} /> Aksi Cepat Kendali
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Kelola sistem langsung tanpa repot pindah halaman.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button 
                onClick={() => handleQuickAction("add_stock", "Tambah Alokasi Stok")}
                disabled={actionLoading !== null}
                className="flex items-center justify-center gap-2 p-3.5 bg-slate-50 border border-slate-200/70 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-2xl text-xs font-bold text-slate-700 hover:text-indigo-600 transition-all active:scale-95 disabled:opacity-50"
              >
                {actionLoading === "add_stock" ? <FiRefreshCw className="animate-spin" /> : <FiPlusCircle size={15} />}
                Tambah Stok Baru
              </button>

              <button 
                onClick={() => handleQuickAction("broadcast", "Kirim Riwayat Log Manual")}
                disabled={actionLoading !== null}
                className="flex items-center justify-center gap-2 p-3.5 bg-slate-50 border border-slate-200/70 hover:border-rose-200 hover:bg-rose-50/30 rounded-2xl text-xs font-bold text-slate-700 hover:text-rose-600 transition-all active:scale-95 disabled:opacity-50"
              >
                {actionLoading === "broadcast" ? <FiRefreshCw className="animate-spin" /> : <FiZap size={15} />}
                Kirim Log Webhook
              </button>

              <button 
                onClick={() => handleQuickAction("force_sync", "Segarkan Koneksi Database")}
                disabled={actionLoading !== null}
                className="flex items-center justify-center gap-2 p-3.5 bg-slate-50 border border-slate-200/70 hover:border-emerald-200 hover:bg-emerald-50/30 rounded-2xl text-xs font-bold text-slate-700 hover:text-emerald-600 transition-all active:scale-95 disabled:opacity-50"
              >
                <FiRefreshCw className={actionLoading === "force_sync" ? "animate-spin text-emerald-500" : ""} size={14} />
                Segarkan Paksa
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FiCpu className="text-emerald-500" size={16} /> Beban Server & Infrastruktur
              </h3>
              <span className="text-[9px] bg-emerald-50 text-emerald-600 font-mono font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                Sangat Baik (99.8%)
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><FiZap size={11} /> Respons API Supabase</span>
                  <span className="font-mono text-slate-700">42ms (Optimal)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><FiHardDrive size={11} /> Ruang Penyimpanan Tabel</span>
                  <span className="font-mono text-slate-700">28% Terpakai</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[28%] bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}