import { useEffect, useState } from "react";
import { productsAPI } from "../../services/productsAPI";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import SelectField from "../../components/SelectField";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { SearchX } from "lucide-react";

const formatProductId = (id) => id ? `PR-${String(id).padStart(4, '0')}` : "";

export default function MemberProducts() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("m_prod_filter_cat") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("m_prod_filter_search") || "");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => { sessionStorage.setItem("m_prod_filter_cat", categoryFilter); }, [categoryFilter]);
  useEffect(() => { sessionStorage.setItem("m_prod_filter_search", search); }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.fetchProducts();
      // Member hanya bisa melihat produk dengan status "Available"
      setProducts((data || []).filter(p => p.status === "Available"));
    } catch (err) {
      setError("Gagal memuat katalog kosmetik.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = (product) => {
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
    alert(`Sukses memesan ${qty} pcs ${product.nama_produk}! Periksa tab 'Orders' Anda. 🛒`);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand?.toLowerCase().includes(search.toLowerCase()) ||
                        formatProductId(p.id).toLowerCase().includes(search.toLowerCase());
    return matchSearch && (categoryFilter === "all" || p.category === categoryFilter);
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Glow Catalog" subtitle="Pilih produk kecantikan kosmetik BLOOM premium terlaris Anda." breadcrumb={["Member", "Products"]} />

      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 font-medium">{error}</div>}

      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari nama kosmetik, brand, atau kode id..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} options={[{ value: "all", label: "Semua Kategori" }, { value: "Lipstick", label: "Lipstick 💄" }, { value: "Foundation", label: "Foundation 🧴" }, { value: "Blush", label: "Blush 🌸" }, { value: "Mascara", label: "Mascara ✨" }, { value: "Eyeshadow", label: "Eyeshadow 🎨" }]} />
        </div>
      </div>

      {loading && <LoadingSpinner text="Menyusun rak kosmetik digital..." />}
      {!loading && products.length === 0 && <EmptyState text="Tidak ada produk kosmetik yang aktif." />}
      {!loading && products.length > 0 && filteredProducts.length === 0 && (
        <div className="p-12 bg-white rounded-2xl flex flex-col items-center text-center gap-2 border border-pink-50">
          <SearchX size={24} className="text-slate-300" />
          <p className="font-semibold text-slate-600">Kosmetik tidak ditemukan</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-4 group hover:shadow-md hover:border-pink-200 transition-all duration-200">
              <div>
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-pink-50 mb-3">
                  <img src={product.image || "https://placehold.co/300?text=No+Image"} alt={product.nama_produk} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 bg-white/90 text-[10px] font-bold text-[#ED346C] px-2 py-0.5 rounded-full border border-pink-50 shadow-sm">⭐ {product.rating || "0.0"}</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{product.brand} {product.shade ? `• ${product.shade}` : ""}</p>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{product.nama_produk}</h3>
                <p className="text-sm font-bold text-[#ED346C] mb-1">Rp {Number(product.price).toLocaleString("id-ID")}</p>
                <p className="text-[11px] text-gray-400 mb-3">Stok: <span className="font-semibold text-gray-700">{product.stock} pcs</span></p>
              </div>
              <button onClick={() => handleOrderNow(product)} className="w-full py-2.5 bg-[#ED346C] hover:bg-[#d62659] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98]">
                🛒 Order Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}