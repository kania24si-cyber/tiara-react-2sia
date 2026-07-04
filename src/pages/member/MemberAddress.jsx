import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { customersAPI } from "../../services/customersAPI";
import CustomerForm from "../../components/CustomerForm";

const INITIAL_FORM_STATE = {
  user_id: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  nomor_hp: "",
  kota_provinsi: "",
  alamat: "",
};

// [KONSEP] Parent Component & Component dengan Javascript (Logic)
// Komponen ini menjadi Induk (Parent) yang mengelola logika bisnis (state, API data) dan merender Child Component.
export default function MemberAddress() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");

  // [KONSEP] useState
  // Hook untuk menyimpan state lokal (saved, loading, dataForm) agar tampilan (UI) render ulang saat data berubah.
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Requirement: form pengisian customer “sama persis” (field & mapping schema ke database customers)
  // sehingga submit menggunakan payload sesuai schema customer.
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  const loadCustomerAddress = async () => {
    if (!user.id) return;

    // Auto-terhubung dengan tabel users: ambil data customer (alamat) + data user (nama/email) bila perlu.
    // Untuk requirement ini, kita isi field customer form dari record customer yang sudah ada,
    // sehingga user tidak perlu mengisi ulang (kecuali ada field yang memang belum tersedia).
    try {
      setLoading(true);
      const customer = await customersAPI.fetchCustomerById(user.id);
      if (!customer) return;

      setDataForm({
        // customer form butuh user_id untuk relasi (di dropdown),
        // untuk member aktif kita pakai user login.
        user_id: user.id,
        nama_lengkap: customer.nama_lengkap || "",
        jenis_kelamin: customer.jenis_kelamin || "",
        tanggal_lahir: customer.tanggal_lahir || "",
        nomor_hp: customer.nomor_hp || "",
        kota_provinsi: customer.kota_provinsi || "",
        alamat: customer.alamat || "",
      });
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  // [KONSEP] useEffect
  // Hook untuk menjalankan efek samping (side effects) seperti mengambil data dari API, 
  // mengatur timer interval, dan menambahkan event listener global saat komponen dimuat.
  useEffect(() => {
    loadCustomerAddress();

    const handleMemberDataChanged = () => {
      loadCustomerAddress();
    };

    window.addEventListener("member-data-updated", handleMemberDataChanged);

    const intervalId = setInterval(() => {
      loadCustomerAddress();
    }, 6000);

    return () => {
      window.removeEventListener("member-data-updated", handleMemberDataChanged);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, user.username]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) return;

    try {
      setLoading(true);

      // Pastikan user_id terset agar update customer masuk ke record yang benar.
      const payload = {
        user_id: user.id,
        nama_lengkap: dataForm.nama_lengkap,
        nomor_hp: dataForm.nomor_hp,
        kota_provinsi: dataForm.kota_provinsi,
        alamat: dataForm.alamat,
        // Field lain ikut dikirim sesuai skema CustomerForm agar payload konsisten.
        // Jika user membiarkan kosong, backend kemungkinan menolak (sesuai requirement form customer).
        jenis_kelamin: dataForm.jenis_kelamin,
        tanggal_lahir: dataForm.tanggal_lahir,
      };

      await customersAPI.updateCustomer(user.id, payload);

      window.dispatchEvent(new Event("member-data-updated"));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
      // jika update gagal
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7 pb-10 font-[var(--font-barlow)]">
      <section className="rounded-[32px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 shadow-sm sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-pink-utama)] border border-pink-200">
          <MapPin size={12} /> Shipping Address
        </span>
        <h2 className="mt-3 font-[var(--font-poppins)] text-xl font-black text-slate-950">Edit Alamat pengiriman member dan data member</h2>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          Isi rincian tempat tinggal Anda untuk mempercepat checkout pengiriman logistik kosmetik.
        </p>
      </section>

      <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-7 shadow-sm text-left">
        {saved && (
          <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
            Alamat pengiriman berhasil diperbarui dan disimpan.
          </div>
        )}

        {/* [KONSEP] Props Component (Pemanggilan Child Component) */}
        {/* Mengirimkan data (state) dan callback function (handleChange, handleSubmit) ke Child Component melalui properti (Props). */}
        <CustomerForm
          dataForm={{
            ...dataForm,
            user_id: user.id || "",
          }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isEdit={true}
          userList={[]}
          hideUserSelect={true}
        />
      </div>
    </div>
  );
}

