// src/pages/member/MemberProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "../../services/productsAPI";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ArrowLeft, ShoppingCart, ShieldCheck } from "lucide-react";

export default function MemberProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.fetchProducts();
        const found = data.find((p) => String(p.id) === String(id));
        if (found) {
          setProduct(found);
        } else {
          setError("Produk tidak ditemukan atau sudah tidak tersedia.");
        }
      } catch (err) {
        setError("Gagal memuat detail produk kosmetik.");
      } finally {
        setLoading(false);
      }
    };
    loadProductDetail();
  }, [id]);

  const handleOrderNow = () => {
    if (!product) return;
    const qtyInput = window.prompt(`Masukkan jumlah pesanan untuk ${product.nama_produk}:`, "1");
    const qty = parseInt(qtyInput, 10);
    
    if (isNaN(qty) || qty <= 0) return;
    if (qty > Number(product.stock)) {
      alert(`Stok tidak mencukupi! Sisa stok saat ini: ${product.stock} pcs`);
      return;
    }

    const totalPrice = qty * Number(product.price);
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");

    const newOrder = {
      id: Date.now(),
      user_id: user.id,
      product_id: product.id,
      product: {
        nama_produk: product.nama_produk,
        brand: product.brand,
        image: product.image,
        category: product.category
      },
      quantity: qty,
      total_price: totalPrice,
      status: "Pending",
      created_at: new Date().toISOString().split("T")[0]
    };

    localStorage.setItem(`orders_${user.id}`, JSON.stringify([newOrder, ...existingOrders]));
    alert(`Sukses memesan ${qty} pcs! Silakan periksa halaman Orders Anda. 🛒`);
    navigate("/member/orders");
  };

  if (loading) return <div className="py-20"><LoadingSpinner text="Membuka wadah kosmetik premium..." /></div>;
  if (error) return <div className="p-6 bg-rose-50 text-rose-700 rounded-xl border border-rose-100">{error}</div>;
  if (!product) return null;

  return (
    <div className="space-y-6 text-left">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#ED346C] transition-colors">
        <ArrowLeft size={14} /> Kembali ke Katalog
      </button>

      <PageHeader title="Product Aesthetics" subtitle="Detail spesifikasi tekstur, formula, dan kecocokan produk BLOOM." breadcrumb={["Member", "Products", "Detail"]} />

      <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sisi Kiri: Gambar */}
        <div className="aspect-square w-full rounded-2xl overflow-hidden bg-pink-50/50 border border-pink-100 flex items-center justify-center">
          <img src={product.image || "https://placehold.co/500?text=BLOOM"} alt={product.nama_produk} className="w-full h-full object-cover" />
        </div>

        {/* Sisi Kanan: Detail & Konfigurasi */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-[#ED346C] bg-pink-50 border border-pink-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {product.brand}
              </span>
              <h2 className="text-xl font-black text-gray-800 mt-2 tracking-tight">{product.nama_produk}</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Kategori: <span className="text-gray-600 font-semibold">{product.category}</span></p>
            </div>

            <div className="p-3 bg-pink-50/30 border border-pink-100/50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Harga Spesial Member</p>
                <p className="text-lg font-black text-[#ED346C]">Rp {Number(product.price).toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Ketersediaan</p>
                <p className="text-xs font-bold text-gray-700">{product.stock} Pcs Tersedia</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Deskripsi Formulasi</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                {product.deskripsi || "Formula premium BLOOM dirancang khusus untuk memberikan hasil akhir yang tahan lama, menjaga hidrasi kulit, serta memberikan pigmentasi maksimal sepanjang hari tanpa membuat kulit kering."}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100/60">
              <ShieldCheck size={14} /> 100% Original Terverifikasi & Lolos BPOM Resmi
            </div>
            <button onClick={handleOrderNow} className="w-full py-3 bg-[#ED346C] hover:bg-[#d62659] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]">
              <ShoppingCart size={15} /> Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}