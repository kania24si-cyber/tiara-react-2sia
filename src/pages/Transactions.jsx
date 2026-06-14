import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { transactionsAPI } from "../services/transactionsAPI";

import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import SelectField from "../components/SelectField";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import FormModal from "../components/FormModal";
import TransactionForm from "../components/TransactionForm";

import { Trash2, Pencil, Eye, Sparkles, SearchX } from "lucide-react";

const INITIAL_FORM_STATE = {
  customer_id: "",
  product_id: "",
  metode_pembayaran: "QRIS",
  total_transaksi: "",
  tanggal_transaksi: new Date().toISOString().split("T")[0]
};

const formatTransactionId = (id) => id ? `TX-${String(id).padStart(4, '0')}` : "";
const formatCustomerId = (id) => id ? `CS-${String(id).padStart(4, '0')}` : "";
const formatProductId = (id) => id ? `PR-${String(id).padStart(4, '0')}` : "";

export default function Transactions() {
  const [paymentFilter, setPaymentFilter] = useState(() => sessionStorage.getItem("transaction_filter_payment") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("transaction_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => { loadTransactions(); }, []);
  useEffect(() => { sessionStorage.setItem("transaction_filter_payment", paymentFilter); }, [paymentFilter]);
  useEffect(() => { sessionStorage.setItem("transaction_filter_search", search); }, [search]);

  const loadTransactions = async () => {
    try {
      setLoading(true); setError("");
      const data = await transactionsAPI.fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError("Gagal memuat data transaksi dari server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError(""); setSuccess("");
      
      if (isEdit) {
        await transactionsAPI.updateTransaction(selectedId, dataForm);
        setSuccess("Transaksi berhasil diperbarui ✨");
      } else {
        await transactionsAPI.createTransaction(dataForm);
        setSuccess("Transaksi baru berhasil ditambahkan! 🛒");
      }
      
      closeModal();
      await loadTransactions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus transaksi ini? ⚠️")) return;
    try {
      setLoading(true); setError("");
      await transactionsAPI.deleteTransaction(id);
      setSuccess("Transaksi berhasil dihapus");
      await loadTransactions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tx) => {
    setIsEdit(true);
    setSelectedId(tx.id);
    setDataForm({
      customer_id: tx.customer_id,
      product_id: tx.product_id,
      metode_pembayaran: tx.metode_pembayaran,
      total_transaksi: tx.total_transaksi,
      tanggal_transaksi: tx.tanggal_transaksi
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const prettyTxId = formatTransactionId(tx.id).toLowerCase();
    const prettyCustId = formatCustomerId(tx.customer_id).toLowerCase();
    const prettyProdId = formatProductId(tx.product_id).toLowerCase();

    const matchSearch = 
      prettyTxId.includes(search.toLowerCase()) ||
      prettyCustId.includes(search.toLowerCase()) ||
      prettyProdId.includes(search.toLowerCase()) ||
      String(tx.metode_pembayaran).toLowerCase().includes(search.toLowerCase());

    return matchSearch && (paymentFilter === "all" || tx.metode_pembayaran === paymentFilter);
  });

  const totalOmset = transactions.reduce((sum, tx) => sum + Number(tx.total_transaksi || 0), 0);

  const getPaymentBadgeStyles = (method) => {
    switch (method) {
      case "QRIS": return "bg-purple-50 text-purple-600 border border-purple-100";
      case "Transfer Bank": return "bg-blue-50 text-blue-600 border border-blue-100";
      case "E-Wallet": return "bg-amber-50 text-amber-600 border border-amber-100";
      default: return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    }
  };

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader title="Glow Transactions" subtitle="Pantau arus kas, pendapatan, dan seluruh riwayat transaksi produk BLOOM." breadcrumb={["Dashboard", "Transactions"]}>
        <button
          onClick={() => { setIsEdit(false); setDataForm(INITIAL_FORM_STATE); setShowForm(true); }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add Transaction
        </button>
      </PageHeader>

      {/* ALERT NOTIFIKASI */}
      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {/* POPUP MODAL FORM */}
      {showForm && (
        <FormModal title={isEdit ? "Edit Transaction 📝" : "Add New Transaction 🛍️"} onClose={closeModal}>
          <TransactionForm dataForm={dataForm} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} loading={loading} />
        </FormModal>
      )}

      {/* 2. AREA FILTER & CARI */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari Kode ID (Contoh: TX-0001, CS-0012, PR-0023)..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} options={[{ value: "all", label: "Semua Pembayaran" }, { value: "QRIS", label: "QRIS 📱" }, { value: "Transfer Bank", label: "Transfer Bank 🏦" }, { value: "E-Wallet", label: "E-Wallet 💳" }, { value: "Cash", label: "Cash 💵" }]} />
        </div>
      </div>

      {/* 3. PANEL STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Transactions" value={transactions.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Income" value={`Rp ${totalOmset.toLocaleString("id-ID")}`} color="text-emerald-600 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="QRIS Usage" value={transactions.filter((t) => t.metode_pembayaran === "QRIS").length} color="text-purple-600 font-bold text-2xl" /></div>
      </div>

      {/* 4. AREA DATA TABEL UTAMA */}
      <div className="bg-white rounded-2xl border border-pink-100/40 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase">Transaction Ledger</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredTransactions.length} Records</span>
        </div>

        {loading && <div className="py-12"><LoadingSpinner text="Memuat data riwayat transaksi..." /></div>}
        {!loading && transactions.length === 0 && <div className="py-12"><EmptyState text="Belum ada data transaksi terdaftar." /></div>}

        {!loading && transactions.length > 0 && filteredTransactions.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-gray-600">Transaksi Tidak Ditemukan</p>
          </div>
        )}

        {!loading && filteredTransactions.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[1000px]">
              <GenericTable
                columns={["Transaction ID", "Customer ID", "Product ID", "Tanggal", "Metode", "Total Harga", "Aksi"]}
                data={filteredTransactions}
                renderRow={(item) => (
                  <>
                    <td className="px-6 py-4 font-mono font-bold text-[#ED346C] whitespace-nowrap">{formatTransactionId(item.id)}</td>
                    <td className="px-6 py-4 font-mono text-gray-600 whitespace-nowrap">{formatCustomerId(item.customer_id)}</td>
                    <td className="px-6 py-4 font-mono text-gray-600 whitespace-nowrap">{formatProductId(item.product_id)}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.tanggal_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${getPaymentBadgeStyles(item.metode_pembayaran)}`}>
                        {item.metode_pembayaran}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800 whitespace-nowrap">Rp {Number(item.total_transaksi).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1.5 justify-start">
                        <Link to={`/dashboard/transactions/${item.id}`}>
                          <button className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-lg transition-colors" title="Lihat Invoice"><Eye size={14} /></button>
                        </Link>
                        <button onClick={() => handleEdit(item)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ubah Transaksi"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}