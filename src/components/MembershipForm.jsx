import Button from "./Button";

export default function MembershipForm({ dataForm, handleChange, handleSubmit, isEdit }) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Customer ID</label>
        <input
          type="text"
          name="customer_id"
          placeholder="Customer ID"
          value={dataForm.customer_id}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Tanggal Daftar</label>
        <input
          type="date"
          name="tanggal_daftar"
          value={dataForm.tanggal_daftar}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      {/* INPUT FIELD CREATOR CODE SUDAH DIHAPUS TOTAL DARI SINI */}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Status Member</label>
        <input
          type="text"
          name="status_member"
          placeholder="Contoh: Baru, Reguler, Loyal"
          value={dataForm.status_member}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Level Membership</label>
        <select name="level_membership" value={dataForm.level_membership} onChange={handleChange} className="input-beauty" required>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Status Aktif</label>
        <select name="status_aktif" value={dataForm.status_aktif} onChange={handleChange} className="input-beauty" required>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </div>

      <div className="md:col-span-2 mt-2">
        <Button type="primary" className="w-full justify-center">
          {isEdit ? "Update Membership" : "Save Membership"}
        </Button>
      </div>
    </form>
  );
}