import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { reviewsAPI } from "../services/reviewsAPI";

import PageHeader from "../components/PageHeader";
import ReviewForm from "../components/ReviewForm";
import FormModal from "../components/FormModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import SelectField from "../components/SelectField";
import ReviewCard from "../components/ReviewCard"; // Import komponen baru kita 🌸

import { SearchX, Sparkles } from "lucide-react";

const INITIAL_FORM_STATE = {
  product_id: "",
  customer_id: "",
  rating: "",
  komentar: "",
};

const formatReviewId = (id) => (id ? `REV-${String(id).padStart(4, "0")}` : "");

const BASE_URL = "https://bjehblhcuapgyuibidfe.supabase.co/rest/v1";
const HEADERS = {
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk`,
  "Content-Type": "application/json",
};

export default function Reviews() {
  const [ratingFilter, setRatingFilter] = useState(
    () => sessionStorage.getItem("review_filter_rating") || "all",
  );
  const [search, setSearch] = useState(
    () => sessionStorage.getItem("review_filter_search") || "",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    loadReviews();
    loadDropdownOptions();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("review_filter_rating", ratingFilter);
  }, [ratingFilter]);
  useEffect(() => {
    sessionStorage.setItem("review_filter_search", search);
  }, [search]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await reviewsAPI.fetchReviews();
      setReviews(data);
    } catch (err) {
      setError("Gagal memuat data ulasan konsumen");
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownOptions = async () => {
    try {
      const [resCustomers, resProducts] = await Promise.all([
        axios.get(`${BASE_URL}/customers?select=id,nama_lengkap`, {
          headers: HEADERS,
        }),
        axios.get(`${BASE_URL}/products?select=id,nama_produk`, {
          headers: HEADERS,
        }),
      ]);
      setCustomers(resCustomers.data || []);
      setProducts(resProducts.data || []);
    } catch (err) {
      console.error("Gagal memuat opsi form:", err);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const dataToSubmit = {
        ...dataForm,
        rating: dataForm.rating ? parseInt(dataForm.rating, 10) : null,
      };

      if (isEdit) {
        // Saat edit, hanya update field yang boleh diubah (rating & komentar)
        const updatePayload = {
          rating: dataToSubmit.rating,
          komentar: dataToSubmit.komentar,
        };
        await reviewsAPI.updateReview(selectedId, updatePayload);
        setSuccess("Ulasan berhasil diperbarui! ✨");
      } else {
        const endpoint = `${BASE_URL}/reviews`;
        await axios.post(endpoint, dataToSubmit, { headers: HEADERS });
        setSuccess("Ulasan baru berhasil disimpan! 💌");
      }

      closeModal();
      await loadReviews();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kendala saat menyimpan ulasan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus ulasan/komentar ini secara permanen? ⚠️")) return;
    try {
      setLoading(true);
      setError("");
      await reviewsAPI.deleteReview(id);
      await loadReviews();
      setSuccess("Ulasan berhasil dihapus dari sistem");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus ulasan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setIsEdit(true);
    setSelectedId(review.id);
    setDataForm({
      product_id: review.product_id || "",
      customer_id: review.customer_id || "",
      rating: review.rating ? String(review.rating) : "",
      komentar: review.komentar || "",
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const filteredReviews = reviews.filter((r) => {
    const prettyId = formatReviewId(r.id).toLowerCase();
    const customerName = r.customers?.nama_lengkap?.toLowerCase() || "";
    const productName = r.products?.nama_produk?.toLowerCase() || "";
    const commentText = r.komentar?.toLowerCase() || "";

    const matchSearch =
      prettyId.includes(search.toLowerCase()) ||
      customerName.includes(search.toLowerCase()) ||
      productName.includes(search.toLowerCase()) ||
      commentText.includes(search.toLowerCase());

    const matchRating = ratingFilter === "all" || String(r.rating) === ratingFilter;

    return matchSearch && matchRating;
  });

  const totalRating = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen text-xs">
      {/* 1. HEADER UTAMA */}
      <PageHeader
        title="Product Reviews"
        subtitle="Pantau testimoni, keluhan, dan rating bintang yang diberikan oleh pembeli BLOOM."
        breadcrumb={["Dashboard", "Reviews"]}
      >
        <button
          onClick={() => {
            setIsEdit(false);
            setSelectedId(null);
            setDataForm(INITIAL_FORM_STATE);
            setShowForm(true);
          }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add New Review
        </button>
      </PageHeader>

      {/* ALERT NOTIFIKASI */}
      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 font-medium">{success}</div>}

      {/* POPUP MODAL FORM */}
      {showForm && (
        <FormModal title={isEdit ? "Edit Ulasan 📝" : "Write New Review 🌸"} onClose={closeModal}>
          <ReviewForm
            dataForm={dataForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            customers={customers}
            products={products}
            isEdit={isEdit}
          />
        </FormModal>
      )}

      {/* 2. AREA FILTER & CARI */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar
            placeholder="Cari ulasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <SelectField
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            options={[
              { value: "all", label: "Semua Rating" },
              { value: "5", label: "⭐⭐⭐⭐⭐ (5)" },
              { value: "4", label: "⭐⭐⭐⭐ (4)" },
              { value: "3", label: "⭐⭐⭐ (3)" },
              { value: "2", label: "⭐⭐ (2)" },
              { value: "1", label: "⭐ (1)" },
            ]}
          />
        </div>
      </div>

      {/* 3. PANEL STATISTIK */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Ulasan" value={reviews.length} color="text-[#ED346C] font-bold text-2xl" />
        <StatsCard title="Rata-rata Rating" value={`${averageRating} / 5.0`} color="text-amber-500 font-bold text-2xl" />
        <StatsCard title="Komentar Positif" value={reviews.filter((r) => r.rating >= 4).length} color="text-emerald-600 font-bold text-2xl" />
      </div>

      {/* 4. SEKSI UTAMA: FEEDBACK CARD GRID */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-50/50 px-2 py-1 rounded-lg">
          <h2 className="font-bold text-gray-700 tracking-wide uppercase text-[11px]">
            Feedback Feed Cards
          </h2>
          <span className="font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">
            {filteredReviews.length} Feedbacks
          </span>
        </div>

        {loading && (
          <div className="py-12">
            <LoadingSpinner text="Sinkronisasi ulasan..." />
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="py-12">
            <EmptyState text="Belum ada ulasan." />
          </div>
        )}

        {!loading && reviews.length > 0 && filteredReviews.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2 bg-white rounded-2xl border">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full">
              <SearchX size={20} />
            </div>
            <p className="font-semibold text-gray-600">Pencarian Tidak Ditemukan</p>
          </div>
        )}

        {/* RENDERING GRID CARDS */}
        {!loading && filteredReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                formatReviewId={formatReviewId}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}