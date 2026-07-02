import React from "react";

export default function PromoForm({
  dataForm,
  handleChange,
  handleSubmit,
  loading,
  isEdit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-xs font-medium text-gray-700"
    >
      <div>
        <label className="block mb-1 font-semibold">Kode Promo</label>
        <input
          type="text"
          name="kode_promo"
          value={dataForm.kode_promo}
          onChange={handleChange}
          placeholder="Contoh: GLOWING10"
          required
          disabled={isEdit} // Mencegah perubahan kode unik jika sedang edit
          className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300 disabled:bg-gray-100 uppercase"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">
            Persentase Diskon (%)
          </label>
          <input
            type="number"
            name="persentase_diskon"
            value={dataForm.persentase_diskon}
            onChange={handleChange}
            placeholder="0"
            min="0"
            max="100"
            required
            className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">
            Minimal Transaksi (Rp)
          </label>
          <input
            type="number"
            name="minimal_transaksi"
            value={dataForm.minimal_transaksi}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
            className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">
            Tanggal Kedaluwarsa
          </label>
          <input
            type="date"
            name="tanggal_kedaluwarsa"
            value={dataForm.tanggal_kedaluwarsa}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status Aktif</label>
          <select
            name="is_active"
            value={String(dataForm.is_active)} // Pastikan diubah ke string agar cocok dengan nilai option
            onChange={handleChange} // Gunakan langsung fungsi dari parent
            className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-300"
          >
            <option value="true">Aktif 🟢</option>
            <option value="false">Nonaktif 🔴</option>
          </select>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white py-2.5 px-6 rounded-full font-semibold shadow-sm transition-colors disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
              ? "Perbarui Promo ✨"
              : "Simpan Promo 🎟️"}
        </button>
      </div>
    </form>
  );
}
