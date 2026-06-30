import React from "react";

const FEATURES = [
  {
    icon: "👤",
    t: "Personalized Profile",
    d: "Simpan preferensi undertone kulit dan riwayat belanja kecantikanmu dengan aman dalam satu tempat.",
    color: "from-pink-100 to-rose-50",
  },
  {
    icon: "💄",
    t: "Signature Look Catalog",
    d: "Eksplorasi koleksi kosmetik terkurasi lengkap dengan informasi shade, coverage, hingga kecocokan jenis kulit.",
    color: "from-fuchsia-100 to-pink-50",
  },
  {
    icon: "⭐",
    t: "Privilege Glow Tier",
    d: "Nikmati akumulasi poin otomatis dan naikkan status keanggotaanmu untuk membuka diskon belanja lebih besar.",
    color: "from-rose-100 to-red-50",
  },
  {
    icon: "🎁",
    t: "Beauty Voucher",
    d: "Akses penawaran kilat, potongan harga spesial hari raya, hingga kado produk gratis khusus member.",
    color: "from-pink-100 to-fuchsia-50",
  },
  {
    icon: "💬",
    t: "Honest Community Reviews",
    d: "Bagikan pengalaman pemakaian serum atau kosmetik favoritmu dan baca ulasan jujur dari sesama pengguna.",
    color: "from-rose-100 to-pink-50",
  },
  {
    icon: "🔄",
    t: "Integrated Skin Journey",
    d: "Sistem cerdas yang mengingat produk kecantikan andalanmu agar proses restock bulanan terasa instan.",
    color: "from-fuchsia-100 to-rose-50",
  },
];

export default function GuestFeaturesInterest({ navigate }) {
  return (
    <section className="py-14 sm:py-20 bg-[#fafafa] relative overflow-hidden" aria-label="Beauty Advantages">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(244,221,221,0.2) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left mb-10">
          <div>
            <span className="section-pill mb-3">Our Advantages</span>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
              Sentuhan Istimewa{" "}
              <span className="text-gradient-pink">BeautyBloom</span>
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Alasan mengapa para pencinta kecantikan mempercayakan <em>look</em> mereka bersama kami.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-outline cursor-pointer !py-2.5 !px-6 text-xs font-extrabold uppercase tracking-widest shrink-0"
          >
            Mulai Bersinar ✨
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((item, i) => (
            <div
              key={item.t}
              className="card-premium p-6 group cursor-default animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Gradient Icon Box */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {item.icon}
              </div>

              <p className="mt-5 font-poppins text-[11px] font-extrabold uppercase tracking-wider text-pink-utama">
                {item.t}
              </p>

              <p className="mt-2 font-barlow text-sm font-medium text-abu leading-relaxed">
                {item.d}
              </p>

              {/* Bottom accent line */}
              <div className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: "linear-gradient(90deg, #FF7B7B, #ED346C)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}