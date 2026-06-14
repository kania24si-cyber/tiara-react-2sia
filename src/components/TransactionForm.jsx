import Button from "./Button";

export default function TransactionForm({ dataForm, handleChange, handleSubmit, isEdit }) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Customer ID</label>
        <input
          type="number"
          name="customer_id"
          placeholder="Contoh: 12"
          value={dataForm.customer_id}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Product ID</label>
        <input
          type="number"
          name="product_id"
          placeholder="Contoh: 45"
          value={dataForm.product_id}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Metode Pembayaran</label>
        <select 
          name="metode_pembayaran" 
          value={dataForm.metode_pembayaran} 
          onChange={handleChange} 
          className="input-beauty" 
          required
        >
          <option value="QRIS">QRIS</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="E-Wallet">E-Wallet</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Total Transaksi (Rp)</label>
        <input
          type="number"
          name="total_transaksi"
          placeholder="Masukkan nominal angka"
          value={dataForm.total_transaksi}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Tanggal Transaksi</label>
        <input
          type="date"
          name="tanggal_transaksi"
          value={dataForm.tanggal_transaksi}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="md:col-span-2 mt-2">
        <Button type="primary" className="w-full justify-center">
          {isEdit ? "Update Transaksi" : "Simpan Transaksi"}
        </Button>
      </div>
    </form>
  );
}