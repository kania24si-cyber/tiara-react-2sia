import Button from "./Button";

export default function UserForm({ dataForm, handleChange, handleSubmit, loading, isEdit }) {
  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-2">
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-xs font-semibold text-gray-500">Avatar Image URL</label>
        <input
          type="url" // Menggunakan tipe url agar mendeteksi validasi link penuh otomatis
          name="avatar_url"
          placeholder="https://example.com/foto-profil.jpg"
          value={dataForm.avatar_url}
          onChange={handleChange}
          disabled={loading}
          className="input-beauty"
        />
        <p className="text-[10px] text-gray-400 mt-0.5">
          *Masukkan tautan langsung gambar utuh (harus diawali dengan https://)
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500">Username *</label>
        <input
          type="text"
          name="username"
          placeholder="e.g. Admin"
          value={dataForm.username}
          onChange={handleChange}
          disabled={loading}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500">Email *</label>
        <input
          type="email"
          name="email"
          placeholder="e.g. admin@beautypos.com"
          value={dataForm.email}
          onChange={handleChange}
          disabled={loading}
          className="input-beauty"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500">
          {isEdit ? "Password (Biarkan jika tak ingin diubah)" : "Password *"}
        </label>
        <input
          type="text"
          name="password"
          placeholder="••••••••"
          value={dataForm.password}
          onChange={handleChange}
          disabled={loading}
          className="input-beauty"
          required={!isEdit}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500">Otoritas Role *</label>
        <select
          name="role"
          value={dataForm.role}
          onChange={handleChange}
          disabled={loading}
          className="input-beauty"
          required
        >
          <option value="">Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>

      <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
        <Button type="primary" disabled={loading} className="w-full justify-center">
          {loading ? "Mohon Tunggu..." : isEdit ? "Update User Account" : "Register User to Dashboard"}
        </Button>
      </div>
    </form>
  );
}