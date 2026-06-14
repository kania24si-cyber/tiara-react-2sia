import Button from "./Button";

export default function CustomerForm({
  dataForm,
  handleChange,
  handleSubmit,
  loading,
  isEdit,
}) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      {/* INPUT USER_ID SUDAH DIHAPUS DARI SINI */}

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Nama Lengkap</label>
        <input
          type="text"
          name="nama_lengkap"
          placeholder="Nama Lengkap"
          value={dataForm.nama_lengkap}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Jenis Kelamin</label>
        <select
          name="jenis_kelamin"
          value={dataForm.jenis_kelamin}
          onChange={handleChange}
          className="input-beauty"
          required
        >
          <option value="">Pilih Gender</option>
          <option value="L">Laki-Laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Tanggal Lahir</label>
        <input
          type="date"
          name="tanggal_lahir"
          value={dataForm.tanggal_lahir}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Nomor HP</label>
        <input
          type="text"
          name="nomor_hp"
          placeholder="Nomor HP"
          value={dataForm.nomor_hp}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Kota / Provinsi</label>
        <input
          type="text"
          name="kota_provinsi"
          placeholder="Kota / Provinsi"
          value={dataForm.kota_provinsi}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Alamat</label>
        <textarea
          name="alamat"
          placeholder="Alamat"
          value={dataForm.alamat}
          onChange={handleChange}
          className="input-beauty min-h-[100px] resize-none"
          required
        />
      </div>

      <div className="md:col-span-2">
        <Button type="primary" className="w-full justify-center" disabled={loading}>
          {loading
            ? "Mohon Tunggu..."
            : isEdit
            ? "Update Customer"
            : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}