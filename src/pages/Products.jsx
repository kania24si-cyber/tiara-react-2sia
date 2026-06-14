import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../services/productsAPI";

import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import SelectField from "../components/SelectField";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import FormModal from "../components/FormModal";
import ProductForm from "../components/ProductForm";

import { Trash2, Pencil, Eye, Sparkles, SearchX } from "lucide-react";

// SINKRONISASI 1: Ubah properti state awal menjadi 'image'
const INITIAL_FORM_STATE = {
  name: "", 
  category: "", 
  brand: "", 
  shade: "", 
  price: "", 
  stock: "", 
  rating: "", 
  image: "", 
  status: "Available"
};

const formatProductId = (id) => id ? `PR-${String(id).padStart(4, '0')}` : "";

export default function Products() {
  const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("product_filter_category") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("product_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => { sessionStorage.setItem("product_filter_category", categoryFilter); }, [categoryFilter]);
  useEffect(() => { sessionStorage.setItem("product_filter_search", search); }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true); setError("");
      const data = await productsAPI.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat data produk");
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
      
      // SINKRONISASI 2: Mapping payload ke kolom 'image' sesuai Supabase
      const payload = {
        name: dataForm.name,
        brand: dataForm.brand,
        category: dataForm.category,
        shade: dataForm.shade || null,
        status: dataForm.status || "Available",
        image: dataForm.image || null, 
        price: Number(dataForm.price) || 0,
        stock: Object.is(Number(dataForm.stock), NaN) ? 0 : Number(dataForm.stock),
        rating: dataForm.rating ? Number(dataForm.rating) : null
      };

      if (isEdit) {
        await productsAPI.updateProduct(selectedId, payload);
        setSuccess("Produk berhasil diperbarui ✨");
      } else {
        await productsAPI.createProduct(payload);
        setSuccess("Produk baru berhasil ditambahkan! 💄");
      }
      
      closeModal();
      await loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.hint || err.message;
      setError(`Gagal menyimpan ke database: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini? ⚠️")) return;
    try {
      setLoading(true); setError("");
      await productsAPI.deleteProduct(id);
      setSuccess("Produk berhasil dihapus");
      await loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus produk");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setSelectedId(product.id);
    // SINKRONISASI 3: Isi value dataForm dari data baris 'product.image'
    setDataForm({
      name: product.name, 
      category: product.category, 
      brand: product.brand,
      shade: product.shade || "", 
      price: product.price, 
      stock: product.stock,
      rating: product.rating || "", 
      image: product.image || "", 
      status: product.status || "Available",
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false); 
    setIsEdit(false); 
    setSelectedId(null);
  };

  const filteredProducts = products.filter((product) => {
    const prettyProdId = formatProductId(product.id).toLowerCase();
    const matchSearch = 
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      prettyProdId.includes(search.toLowerCase());
      
    return matchSearch && (categoryFilter === "all" || product.category === categoryFilter);
  });

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      <PageHeader title="Glow Products" breadcrumb={["Dashboard", "Products"]} subtitle="Kelola katalog etalase, varian warna, harga, serta ketersediaan stok produk BLOOM.">
        <button 
          onClick={() => { setIsEdit(false); setSelectedId(null); setDataForm(INITIAL_FORM_STATE); setShowForm(true); }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add Product
        </button>
      </PageHeader>

      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {showForm && (
        <FormModal title={isEdit ? "Modify Product Details 📝" : "Add New Esthetic Product 🌸"} onClose={closeModal}>
          <ProductForm dataForm={dataForm} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} loading={loading} />
        </FormModal>
      )}

      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari nama, brand, atau kode (Contoh: PR-0012)..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} options={[{ value: "all", label: "Semua Kategori" }, { value: "Lipstick", label: "Lipstick 💄" }, { value: "Foundation", label: "Foundation 🧴" }, { value: "Blush", label: "Blush 🌸" }, { value: "Mascara", label: "Mascara ✨" }, { value: "Eyeshadow", label: "Eyeshadow 🎨" }]} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Products" value={products.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Lipstick" value={products.filter((p) => p.category === "Lipstick").length} color="text-purple-600 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Foundation" value={products.filter((p) => p.category === "Foundation").length} color="text-blue-600 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Low Stock (&lt; 10)" value={products.filter((p) => Number(p.stock) < 10).length} color="text-rose-500 font-bold text-2xl" /></div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100/40 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase">Product Catalog Directory</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredProducts.length} Products</span>
        </div>

        {loading && <div className="py-12"><LoadingSpinner text="Memuat data produk..." /></div>}
        {!loading && products.length === 0 && <div className="py-12"><EmptyState text="Belum ada produk di etalase." /></div>}

        {!loading && products.length > 0 && filteredProducts.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-gray-600">Produk Tidak Ditemukan</p>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[1100px]">
              <GenericTable
                columns={["Product ID", "Image", "Product Details", "Category", "Price", "Stock", "Rating", "Status", "Actions"]}
                data={filteredProducts}
                renderRow={(product) => (
                  <>
                    <td className="px-6 py-4 font-mono font-bold text-[#ED346C] whitespace-nowrap">{formatProductId(product.id)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* SINKRONISASI 4: Ubah src dari product.image_url ke product.image */}
                      <img 
                        src={product.image || "https://placehold.co/100?text=No+Image"} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-xl shadow-sm border border-gray-100 bg-gray-50" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/100?text=Error";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-sm text-gray-800 tracking-tight">{product.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{product.brand} {product.shade ? `• ${product.shade}` : ""}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 font-semibold whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">Rp {Number(product.price).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                      <span className={Number(product.stock) < 10 ? "text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md" : "text-gray-600 font-medium"}>
                        {product.stock} pcs
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-amber-500 font-bold whitespace-nowrap">⭐ {product.rating || "0.0"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${product.status === "Available" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                        {product.status || "Available"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1.5 justify-start">
                        <Link to={`/dashboard/products/${product.id}`}>
                          <button className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-lg transition-colors" title="Lihat Detail"><Eye size={14} /></button>
                        </Link>
                        <button onClick={() => handleEdit(product)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ubah Produk"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={14} /></button>
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