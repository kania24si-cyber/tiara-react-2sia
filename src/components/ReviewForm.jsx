import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // Memanfaatkan spinner yang sudah kamu punya

export default function ReviewForm({ dataForm, handleChange, handleSubmit, loading, isEdit }) {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [fetchingOptions, setFetchingOptions] = useState(true); // State pelindung data dropdown

  // Mengambil opsi produk & customer untuk dropdown Select Field
  useEffect(() => {
    const headers = {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWhibGhjdWFwZ3l1aWJpZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQ1OTIsImV4cCI6MjA5Njg0MDU5Mn0.64KWiU7oZUeGVAwqIR_WXh6EErqoIRzxRzYJNfafLKk`
    };

    // Menggunakan Promise.all agar loading selesai bersamaan
    Promise.all([
      // PERBAIKAN DISINI: Mengubah select=id,name & order=name menjadi nama_produk 🛒
      axios.get("https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/products?select=id,nama_produk&order=nama_produk.asc", { headers }),
      axios.get("https://bjehblhcuapgyuibidfe.supabase.co/rest/v1/customers?select=id,nama_lengkap&order=nama_lengkap.asc", { headers })
    ])
      .then(([resProducts, resCustomers]) => {
        setProducts(resProducts.data);
        setCustomers(resCustomers.data);
      })
      .catch((err) => console.error("Gagal memuat referensi database:", err))
      .finally(() => {
        setFetchingOptions(false); // Dropdown siap dipasangkan dengan dataForm tanpa bug
      });
  }, []);

  // Tampilkan loading spinner bawaan jika data opsi dari database belum tiba
  if (fetchingOptions) {
    return (
      <div className="py-8 flex justify-center items-center">
        <LoadingSpinner text="Menghubungkan ke database BLOOM..." />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-gray-700">
      
      {/* PILIH PRODUCT */}
      <div>
        <label className="block mb-1 font-semibold">Pilih Produk</label>
        <select
          name="product_id"
          value={dataForm.product_id}
          onChange={handleChange}
          required
          disabled={isEdit}
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-pink-300 disabled:bg-gray-100"
        >
          <option value="">-- Pilih Produk BLOOM --</option>
          {products.map((p) => (
            // PERBAIKAN DISINI: Mengubah p.name menjadi p.nama_produk ✨
            <option key={p.id} value={p.id}>{p.nama_produk}</option>
          ))}
        </select>
      </div>

      {/* PILIH CUSTOMER */}
      <div>
        <label className="block mb-1 font-semibold">Nama Pelanggan (Customer)</label>
        <select
          name="customer_id"
          value={dataForm.customer_id}
          onChange={handleChange}
          required
          disabled={isEdit}
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-pink-300 disabled:bg-gray-100"
        >
          <option value="">-- Pilih Member --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.nama_lengkap}</option>
          ))}
        </select>
      </div>

      {/* BERI RATING */}
      <div>
        <label className="block mb-1 font-semibold">Rating Ulasan</label>
        <select
          name="rating"
          value={dataForm.rating}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-pink-300"
        >
          <option value="">-- Berikan Skor Bintang --</option>
          <option value="5">⭐⭐⭐⭐⭐ (5 Bintang - Sempurna)</option>
          <option value="4">⭐⭐⭐⭐ (4 Bintang - Puas)</option>
          <option value="3">⭐⭐⭐ (3 Bintang - Biasa Saja)</option>
          <option value="2">⭐⭐ (2 Bintang - Kurang Puas)</option>
          <option value="1">⭐ (1 Bintang - Kecewa)</option>
        </select>
      </div>

      {/* ISI KOMENTAR */}
      <div>
        <label className="block mb-1 font-semibold">Isi Komentar / Ulasan</label>
        <textarea
          name="komentar"
          value={dataForm.komentar || ""}
          onChange={handleChange}
          placeholder="Tulis testimoni atau umpan balik pelanggan di sini..."
          rows={4}
          className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300 resize-none"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white py-2.5 px-6 rounded-full font-semibold shadow-sm transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : isEdit ? "Perbarui Ulasan ✨" : "Kirim Ulasan 🌸"}
        </button>
      </div>
    </form>
  );
}