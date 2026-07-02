import React, { useState } from "react";

export default function GuestPromoDesire({ promos, navigate }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (kode) => {
    navigator.clipboard.writeText(kode).catch(() => {});
    setCopied(kode);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="promo" className="py-14 sm:py-20 bg-white relative overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #ED346C, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="section-pill mb-3">Limited Offers</span>
          <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
            Exclusive <span className="text-gradient-pink">Beauty Deals</span>
          </h2>
          <p className="mt-2 font-barlow text-sm font-medium text-abu">
            Manjakan diri Anda dengan penawaran terbatas dan <em>beauty reward</em> spesial yang dikurasi untuk Anda.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {promos.map((p, i) => (
            <div
              key={p.id}
              className="voucher-card flex flex-col justify-between animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Active indicator bar */}
              {p.is_active && (
                <div className="h-1 w-full rounded-t-[28px] overflow-hidden">
                  <div className="h-full animate-shimmer"
                    style={{ background: "linear-gradient(90deg, #FF7B7B, #ED346C, #FF7B7B)", backgroundSize: "200% auto" }} />
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Top */}
                <div className="flex items-start justify-between gap-4 text-left">
                  <div className="flex-1">
                    <span className={`font-poppins text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                      p.is_active
                        ? "text-pink-utama bg-rose-50 border border-pink-border"
                        : "text-gray-400 bg-gray-50 border border-gray-200"
                    }`}>
                      {p.is_active ? "✓ Verified Voucher" : "× Expired"}
                    </span>

                    {/* Promo Code — click to copy */}
                    <button
                      type="button"
                      onClick={() => handleCopy(p.kode)}
                      className="mt-5 flex items-center gap-3 group/code cursor-pointer"
                      title="Klik untuk menyalin kode"
                    >
                      <h3 className="font-poppins text-2xl font-black text-gray-900 tracking-widest bg-pink-50 border border-dashed border-pink-200 px-5 py-2 rounded-xl uppercase select-all group-hover/code:border-pink-utama group-hover/code:bg-pink-100/50 transition-all duration-200">
                        {p.kode}
                      </h3>
                      <span className={`text-xs font-bold transition-all duration-300 ${copied === p.kode ? "text-green-500" : "text-abu group-hover/code:text-pink-utama"}`}>
                        {copied === p.kode ? "✓ Disalin!" : "Salin"}
                      </span>
                    </button>

                    <p className="mt-3 font-barlow text-sm font-medium text-abu leading-relaxed">{p.deskripsi}</p>
                  </div>

                  {/* Discount Badge */}
                  <div className="text-right shrink-0">
                    <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-abu">Hemat</p>
                    <div className="mt-1 font-poppins text-5xl font-black text-gradient-pink leading-none">
                      {p.diskonPct}%
                    </div>
                    <span className="text-[10px] font-bold text-abu block mt-0.5 uppercase tracking-wider">OFF</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 text-left">
                  <div>
                    <p className="font-poppins text-[9px] font-extrabold uppercase tracking-widest text-pink-utama">Valid Until</p>
                    <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">s/d {p.berlaku}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    disabled={!p.is_active}
                    className="w-full sm:w-auto btn-pink-premium cursor-pointer !py-2.5 !px-6 !rounded-xl text-xs font-extrabold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Klaim Voucher →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}