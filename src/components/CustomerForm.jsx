import Button from "./Button";

export default function CustomerForm({
  dataForm,
  handleChange,
  handleSubmit,
  loading,
  isEdit,
  userList = [] // Menampung data baris akun dari usersAPI
}) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
      
      {/* Kolom Pilihan Akun (Username dari Tabel User) */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">
          {isEdit ? "Ubah Hubungan Akun (Username)" : "Pilih Akun Member (Username)"}
        </label>
        <select
          name="user_id" 
          value={dataForm.user_id || ""}
          onChange={handleChange}
          className="input-beauty"
          required
        >
          <option value="">-- Pilih Username dari Database --</option>
          {userList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {isEdit && (
          <p className="text-[10px] text-amber-600 mt-0.5">
            *Sedang mengedit. Anda dapat memindahkan relasi customer ini ke username lain jika diperlukan.
          </p>
        )}
      </div>

      {/* Nama Lengkap */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Nama Lengkap</label>
        <input
          type="text"
          name="nama_lengkap"
          placeholder="Nama Lengkap"
          value={dataForm.nama_lengkap || ""} 
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      {/* Jenis Kelamin */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Jenis Kelamin</label>
        <select
          name="jenis_kelamin"
          value={dataForm.jenis_kelamin || ""}
          onChange={handleChange}
          className="input-beauty"
          required
        >
          <option value="">Pilih Gender</option>
          <option value="L">Laki-Laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>

      {/* Tanggal Lahir */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Tanggal Lahir</label>
        <input
          type="date"
          name="tanggal_lahir"
          value={dataForm.tanggal_lahir || ""}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      {/* Nomor HP */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-semibold">Nomor HP</label>
        <input
          type="text"
          name="nomor_hp"
          placeholder="Nomor HP"
          value={dataForm.nomor_hp || ""}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      {/* Kota / Provinsi */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Kota / Provinsi</label>
        <input
          type="text"
          name="kota_provinsi"
          placeholder="Kota / Provinsi"
          value={dataForm.kota_provinsi || ""}
          onChange={handleChange}
          className="input-beauty"
          required
        />
      </div>

      {/* Alamat */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs text-gray-500 font-semibold">Alamat</label>
        <textarea
          name="alamat"
          placeholder="Alamat"
          value={dataForm.alamat || ""}
          onChange={handleChange}
          className="input-beauty min-h-[100px] resize-none"
          required
        />
      </div>

      {/* Tombol Aksi Akhir */}
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