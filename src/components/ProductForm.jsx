import Button from "./Button";

export default function ProductForm({ dataForm, handleChange, handleSubmit, isEdit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      {/* PERUBAHAN: name="name" -> name="nama_produk" */}
      <input 
        type="text" 
        name="nama_produk" 
        placeholder="Product Name" 
        value={dataForm.nama_produk || ""} 
        onChange={handleChange} 
        className="input-beauty" 
        required 
      />
      <input type="text" name="brand" placeholder="Brand" value={dataForm.brand || ""} onChange={handleChange} className="input-beauty" required />
      <input type="text" name="shade" placeholder="Shade" value={dataForm.shade || ""} onChange={handleChange} className="input-beauty" />
      <input type="number" name="price" placeholder="Price" value={dataForm.price || ""} onChange={handleChange} className="input-beauty" required />
      <input type="number" name="stock" placeholder="Stock" value={dataForm.stock || ""} onChange={handleChange} className="input-beauty" required />
      <input type="number" step="0.1" name="rating" placeholder="Rating" value={dataForm.rating || ""} onChange={handleChange} className="input-beauty" />
      <input type="text" name="image" placeholder="Image URL (Direct Link)" value={dataForm.image || ""} onChange={handleChange} className="input-beauty" />

      <select name="category" value={dataForm.category || ""} onChange={handleChange} className="input-beauty" required>
        <option value="" disabled>Pilih Category</option>
        <option value="Lipstick">Lipstick 💄</option>
        <option value="Foundation">Foundation 🧴</option>
        <option value="Blush">Blush 🌸</option>
        <option value="Mascara">Mascara ✨</option>
        <option value="Eyeshadow">Eyeshadow 🎨</option>
      </select>

      <select name="status" value={dataForm.status || "Available"} onChange={handleChange} className="input-beauty">
        <option value="Available">Available</option>
        <option value="Out Of Stock">Out Of Stock</option>
      </select>

      <div className="md:col-span-2">
        <Button type="primary" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Product ✨" : "Save Product 💄"}
        </Button>
      </div>
    </form>
  );
}