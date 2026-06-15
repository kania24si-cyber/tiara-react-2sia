import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productsAPI } from "../services/productsAPI";

import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";

import { ArrowLeft, Star, Package, Layers, ShieldCheck, AlertCircle } from "lucide-react";

const formatProductId = (id) => id ? `PR-${String(id).padStart(4, '0')}` : "";

export default function ProductsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { loadProduct(); }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true); setError("");
      const data = await productsAPI.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError("Gagal memuat detail produk kosmetik atau produk tidak ditemukan 🌟");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Product Details" breadcrumb={["Dashboard", "Products", "Detail"]} />
        <div className="bg-white rounded-2xl border border-pink-100/50 shadow-sm flex flex-col justify-center items-center py-20">
          <LoadingSpinner text="Sedang mengambil detail produk estetik..." />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Product Details" breadcrumb={["Dashboard", "Products", "Not Found"]} />
        <div className="bg-white border border-rose-100 rounded-2xl max-w-xl mx-auto p-8 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full"><AlertCircle size={28} /></div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Produk Gagal Dimuat</h3>
            <p className="text-xs text-gray-500 mt-1">{error || "Ups! Produk kecantikan yang kamu cari tidak ditemukan."}</p>
          </div>
          <button onClick={() => navigate("/dashboard/products")} className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-6 rounded-full font-semibold transition-colors shadow-sm flex items-center gap-2">
            <ArrowLeft size={14} /> Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      <PageHeader title={`Profile ${formatProductId(product.id)}`} subtitle="Informasi detail formulasi produk, klasifikasi varian warna, kategori kecantikan, serta pantauan inventaris toko." breadcrumb={["Dashboard", "Products", formatProductId(product.id)]}>
        <button onClick={() => navigate("/dashboard/products")} className="border border-pink-200 text-gray-600 hover:bg-pink-50 text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold transition-all duration-150 bg-white shadow-sm">
          <ArrowLeft size={14} /> Back to Store
        </button>
      </PageHeader>

      <div className="bg-white rounded-3xl border border-pink-100/60 shadow-md overflow-hidden max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-5 bg-gradient-to-br from-pink-50/30 to-pink-100/30 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-50">
            <div className="relative group">
              <img
                src={product.image || "https://placehold.co/400?text=No+Image"}
                // SINKRONISASI: product.nama_produk
                alt={product.nama_produk}
                className="w-64 h-64 object-cover rounded-2xl shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400?text=Image+Error";
                }}
              />
              <span className={`absolute top-3 right-3 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm uppercase ${product.status === "Available" ? "bg-emerald-500 border border-emerald-400 text-white" : "bg-rose-500 border border-rose-400 text-white"}`}>
                {product.status || "Out Of Stock"}
              </span>
            </div>
            {product.rating && (
              <div className="mt-5 flex items-center gap-1.5 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full border border-amber-100 text-xs font-bold shadow-sm">
                <Star size={14} fill="currentColor" />
                <span>{Number(product.rating).toFixed(1)} / 5.0 Global Rating</span>
              </div>
            )}
          </div>

          <div className="md:col-span-7 p-8 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-pink-50 text-[#ED346C] px-3 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider mb-3 border border-pink-100/60">
                  <Layers size={11} /> {product.category || "Cosmetics"}
                </span>
                {/* SINKRONISASI: product.name -> product.nama_produk */}
                <h1 className="text-2xl font-black text-gray-800 leading-tight tracking-tight">{product.nama_produk}</h1>
                <p className="text-xs text-gray-400 font-medium mt-1">Brand: <span className="text-gray-600 font-bold">{product.brand || "BLOOM"}</span></p>
              </div>

              <div className="border-t border-gray-100" />

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Product Code ID</span>
                  <span className="text-xs font-mono font-bold text-[#ED346C]">{formatProductId(product.id)}</span>
                </div>
                <div className="bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Variant / Shade</span>
                  <span className="text-xs font-bold text-gray-700">{product.shade || "No Variant"}</span>
                </div>
                <div className="bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Stok Etalase</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mt-0.5">
                    <Package size={13} className="text-gray-400" />
                    <span>{product.stock ?? 0} pcs tersedia</span>
                  </div>
                </div>
                <div className="bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Jaminan Produk</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-0.5"><ShieldCheck size={13} /><span>100% Original BPOM</span></div>
                </div>
              </div>

              <div className="bg-pink-50/10 border border-pink-100/70 p-4 rounded-2xl border-l-4 border-l-[#ED346C]">
                <span className="text-[10px] font-bold text-[#ED346C] uppercase tracking-widest block mb-1">Best Representative Price</span>
                <p className="text-2xl font-black text-gray-800 tracking-tight">Rp {Number(product.price || 0).toLocaleString("id-ID")}</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate("/dashboard/products")} className="w-full sm:w-1/3 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-2.5 px-4 rounded-full transition duration-150 text-xs flex items-center justify-center gap-2">Kembali</button>
              <Link to="/dashboard/products" className="w-full sm:flex-1">
                <button className="w-full bg-[#ED346C] hover:bg-[#d62659] text-white font-semibold py-2.5 px-4 rounded-full transition duration-150 text-xs flex items-center justify-center gap-2 shadow-sm">Kelola Stok Toko</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}