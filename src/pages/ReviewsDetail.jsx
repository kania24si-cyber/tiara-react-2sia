import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

import { ChevronLeft, Star, User, ShoppingBag, Calendar, MessageSquare } from "lucide-react";

export default function ReviewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Menggunakan join di url fetch Supabase
        const response = await fetch(
          `https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/reviews?id=eq.${id}&select=*,products(*),customers(*)`,
          {
            headers: {
              apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk`
            }
          }
        );
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("Ulasan tidak ditemukan");
        setReview(data[0]);
      } catch (err) {
        setError(err.message || "Gagal memuat detail ulasan");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FFFBFB]"><LoadingSpinner text="Membuka berkas testimoni..." /></div>;
  if (error) return <div className="p-6 text-center text-rose-600">{error}</div>;

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen text-xs text-gray-600">
      <div className="flex items-center gap-2">
        <Link to="/dashboard/reviews" className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-pink-50">
          <ChevronLeft size={16} />
        </Link>
        <div>
          <h1 className="text-base font-bold text-gray-800">Ulasan & Feedback Detail</h1>
          <p className="text-[11px] text-gray-400">REV-{String(review.id).padStart(4, '0')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SCORE BINTANG & INFO UTAMA */}
        <div className="bg-white p-6 rounded-2xl border border-pink-100/60 shadow-sm text-center flex flex-col items-center justify-center space-y-2">
          <div className="flex gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className={i < review.rating ? "fill-amber-400 stroke-amber-500" : "text-gray-200"} />
            ))}
          </div>
          <p className="text-lg font-bold text-gray-800 mt-2">{review.rating} / 5 Bintang</p>
          <div className="flex items-center gap-1 text-gray-400 text-[10px]">
            <Calendar size={12} />
            <span>{new Date(review.created_at).toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* REKAPAN KONTEN ULASAN */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-pink-100/60 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2">Konten Testimoni</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={14} className="text-[#ED346C]" />
              <span className="font-semibold">Nama Pembeli:</span>
              <span className="text-gray-600">{review.customers?.nama_lengkap || "Anonim Member"}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <ShoppingBag size={14} className="text-purple-500" />
              <span className="font-semibold">Produk Diulas:</span>
              <span className="text-gray-600">{review.products?.name || "Produk tidak teridentifikasi"}</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mt-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase flex items-center gap-1 mb-1">
                <MessageSquare size={10} /> Isi Komentar
              </p>
              <p className="text-gray-700 font-normal italic leading-relaxed">
                "{review.komentar || "Pelanggan tidak menulis pesan tekstual."}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}