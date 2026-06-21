import { useEffect, useMemo, useState } from "react";
import { promosAPI } from "../../services/promosAPI";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Check, Copy, Search, Ticket } from "lucide-react";

export default function MemberPromos() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [promos, setPromos] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      setLoading(true);
      const data = await promosAPI.fetchPromos();
      setPromos((data || []).filter((promo) => promo.is_active));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPromos = useMemo(() => {
    const keyword = search.toLowerCase();
    return promos.filter((promo) => {
      return (
        promo.kode_promo?.toLowerCase().includes(keyword) ||
        String(promo.persentase_diskon || "").includes(keyword)
      );
    });
  }, [promos, search]);

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 1600);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  return (
    <div className="space-y-7 pb-10 text-left font-[var(--font-barlow)]">
      {/* HEADER SECTION */}
      <section className="rounded-[32px] border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
              Bloom Vouchers
            </p>
            <h1 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">
              Voucher Promo Spesial
            </h1>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              Gunakan kode voucher di bawah ini untuk mendapatkan potongan harga saat checkout belanjaan Anda.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode promo atau diskon..."
              className="w-full rounded-full border border-pink-100 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition focus:border-[var(--color-pink-utama)] focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && <LoadingSpinner text="Memuat voucher promo aktif..." />}

      {/* EMPTY STATE */}
      {!loading && filteredPromos.length === 0 && (
        <EmptyState
          icon={Ticket}
          text="Tidak ada voucher promo aktif saat ini yang cocok dengan pencarian Anda."
        />
      )}

      {/* PROMOS GRID */}
      {!loading && filteredPromos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPromos.map((promo) => (
            <div
              key={promo.id || promo.kode_promo}
              className="group flex flex-col justify-between rounded-3xl border border-pink-100 bg-white p-5 shadow-sm transition hover:border-pink-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-pink-utama)]">
                    Kupon Belanja
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-600">
                    {promo.persentase_diskon}% OFF
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-pink-100 bg-pink-50/60 p-3 text-center">
                  <p className="font-mono text-lg font-black tracking-[0.18em] text-[var(--color-pink-utama)]">
                    {promo.kode_promo}
                  </p>
                </div>

                <p className="mt-4 text-xs font-semibold text-slate-500">
                  Minimal belanja{" "}
                  <span className="font-extrabold text-slate-800">
                    Rp {Number(promo.minimal_transaksi || 0).toLocaleString("id-ID")}
                  </span>
                </p>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="button"
                onClick={() => handleCopyCode(promo.kode_promo)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-pink-utama)] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-rose-700"
              >
                {copiedCode === promo.kode_promo ? <Check size={15} /> : <Copy size={15} />}
                {copiedCode === promo.kode_promo ? "Kode Disalin" : "Copy Voucher"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}