import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { transactionsAPI } from "../services/transactionsAPI";

import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";

import { ArrowLeft, Receipt, Calendar, CreditCard, User, Box, Sparkles, AlertCircle } from "lucide-react";

// --- FUNGSI HELPER FORMAT ID ESTETIK ---
const formatTransactionId = (id) => {
  if (!id) return "";
  return `TX-${String(id).padStart(4, '0')}`;
};

const formatCustomerId = (id) => {
  if (!id) return "";
  return `CS-${String(id).padStart(4, '0')}`;
};

const formatProductId = (id) => {
  if (!id) return "";
  return `PR-${String(id).padStart(4, '0')}`;
};

export default function TransactionsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTransactionDetail();
  }, [id]);

  const loadTransactionDetail = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await transactionsAPI.getTransactionById(id);
      if (data) {
        setTransaction(data);
      } else {
        setError("Nota transaksi tidak ditemukan atau sudah dihapus 🌟");
      }
    } catch (err) {
      setError("Gagal memuat detail data transaksi dari database");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Transaction Details" breadcrumb={["Dashboard", "Transactions", "Detail"]} />
        <div className="bg-white rounded-2xl border border-pink-100/50 shadow-sm flex flex-col justify-center items-center py-20">
          <LoadingSpinner text="Sedang menerbitkan berkas nota transaksi..." />
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Transaction Details" breadcrumb={["Dashboard", "Transactions", "Not Found"]} />
        <div className="bg-white border border-rose-100 rounded-2xl max-w-xl mx-auto p-8 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Riwayat Gagal Dimuat</h3>
            <p className="text-xs text-gray-500 mt-1">{error || "Riwayat invoice transaksi tidak berhasil ditemukan."}</p>
          </div>
          <button 
            onClick={() => navigate("/dashboard/transactions")}
            className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-6 rounded-full font-semibold transition-colors shadow-sm flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Kembali ke Riwayat Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader 
        title={`Invoice #${formatTransactionId(transaction.id)}`} 
        subtitle="Rincian pembayaran kasir, verifikasi referensi produk, dan total kalkulasi nilai penjualan."
        breadcrumb={["Dashboard", "Transactions", formatTransactionId(transaction.id)]}
      >
        <button 
          onClick={() => navigate("/dashboard/transactions")}
          className="border border-pink-200 text-gray-600 hover:bg-pink-50 text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold transition-all duration-150 bg-white shadow-sm"
        >
          <ArrowLeft size={14} /> Kembali
        </button>
      </PageHeader>

      {/* 2. AREA PREVIEW INVOICE NOTA KASIR */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-pink-100/60 shadow-md overflow-hidden">
        
        {/* Banner Gradasi Invoice Header */}
        <div className="bg-gradient-to-r from-pink-500 via-[#ED346C] to-purple-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
              <Receipt size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Nota Pembayaran Resmi</h3>
              <p className="text-[10px] text-pink-100 tracking-wider font-mono mt-0.5">
                ID NO: {formatTransactionId(transaction.id)}
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider flex items-center gap-1 uppercase">
            <Sparkles size={11} /> Success
          </span>
        </div>

        {/* Konten Utama Struk */}
        <div className="p-6 space-y-6">
          
          {/* Metadata Grid (Tanggal & Metode Pembayaran) */}
          <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-50 text-[#ED346C] rounded-xl">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tanggal Pembelian</p>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">{transaction.tanggal_transaksi}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-50 text-[#ED346C] rounded-xl">
                <CreditCard size={16} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Metode Pembayaran</p>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{transaction.metode_pembayaran}</p>
              </div>
            </div>
          </div>

          {/* Relasi Hubungan Identitas (Customer & Produk) */}
          <div className="space-y-3 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Audit Ledger References</p>
            
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <User size={14} className="text-gray-400" /> Customer Referensi
              </span>
              <Link 
                to={`/dashboard/customers/${transaction.customer_id}`} 
                className="font-mono font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100/60 transition-colors"
              >
                {formatCustomerId(transaction.customer_id)}
              </Link>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2 text-gray-500 font-medium">
                <Box size={14} className="text-gray-400" /> Kode Produk Dibeli
              </span>
              <Link 
                to={`/dashboard/products/${transaction.product_id}`} 
                className="font-mono font-bold text-[#ED346C] hover:text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-100/60 transition-colors"
              >
                {formatProductId(transaction.product_id)}
              </Link>
            </div>
          </div>

          {/* Total Ringkasan Finansial Kasir */}
          <div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-center px-1">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Grand Total Balance</span>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Sudah termasuk pajak &amp; biaya admin</p>
            </div>
            <span className="text-2xl font-black text-[#ED346C] tracking-tight">
              Rp {Number(transaction.total_transaksi).toLocaleString("id-ID")}
            </span>
          </div>

        </div>

        {/* Footer Nota */}
        <div className="bg-gray-50 px-6 py-4 text-center text-[11px] text-gray-400 font-medium border-t border-gray-100 tracking-wide">
          Sistem Pembukuan Finansial Otomatis • GLOW &amp; BLOOM Co.
        </div>

      </div>
    </div>
  );
}