import { useEffect, useState } from "react";
import { MapPin, Save } from "lucide-react";

export default function MemberAddress() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const storageKey = `address_${user.id}`;
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    receiver: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    note: ""
  });

  const loadAddress = () => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
    setForm({
      receiver: stored.receiver || user.username || "",
      phone: stored.phone || "",
      address: stored.address || "",
      city: stored.city || "",
      postalCode: stored.postalCode || "",
      note: stored.note || ""
    });
  };

  useEffect(() => {
    loadAddress();

    const handleMemberDataChanged = () => {
      loadAddress();
    };

    window.addEventListener("member-data-updated", handleMemberDataChanged);

    const intervalId = setInterval(() => {
      // realtime-like sync lintas tab
      loadAddress();
    }, 6000);

    return () => {
      window.removeEventListener("member-data-updated", handleMemberDataChanged);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, user.username]);


  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(form));
    // trigger realtime sync for other member pages/tabs
    window.dispatchEvent(new Event("member-data-updated"));

    setSaved(true);

    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-7 pb-10 font-[var(--font-barlow)]">
      <section className="rounded-[32px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 shadow-sm sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-pink-utama)] border border-pink-200">
          <MapPin size={12} /> Shipping Address
        </span>
        <h2 className="mt-3 font-[var(--font-poppins)] text-xl font-black text-slate-950">Alamat Pengiriman Member</h2>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">Isi rincian tempat tinggal Anda untuk mempercepat checkout pengiriman logistik kosmetik.</p>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm text-left">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Nama Penerima Paket</label>
            <input
              type="text"
              value={form.receiver}
              onChange={(event) => setForm({ ...form, receiver: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
              placeholder="Nama Lengkap"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Nomor Telepon HP</label>
            <input
              type="text"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
              placeholder="Contoh: 0812345678"
              required
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Alamat Rumah Lengkap</label>
            <textarea
              rows="2"
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)] resize-none"
              placeholder="Nama Jalan, Blok, Nomor Rumah..."
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Kota / Kabupaten</label>
            <input
              type="text"
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
              placeholder="Kota/Kabupaten"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Kode Pos</label>
            <input
              type="text"
              value={form.postalCode}
              onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
              placeholder="Kode pos"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Catatan Tambahan Kurir</label>
            <input
              type="text"
              value={form.note}
              onChange={(event) => setForm({ ...form, note: event.target.value })}
              className="input-beauty w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
              placeholder="Opsional, contoh: rumah pagar putih sebelah warung"
            />
          </div>

          {saved && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700 lg:col-span-2">
              Alamat pengiriman berhasil diperbarui dan disimpan.
            </div>
          )}

          <div className="lg:col-span-2 mt-2">
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-pink-utama)] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-rose-700 shadow-sm">
              <Save size={16} /> Simpan Alamat Sekarang
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}