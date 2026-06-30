import React from "react";

function SoftPill({ children }) {
  return (
    <span className="section-pill animate-fade-up">
      <span className="w-1.5 h-1.5 rounded-full bg-pink-utama animate-pulse" />
      {children}
    </span>
  );
}

function Container({ children }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

const STATS = [
  { value: "2.5K+", label: "Beauty Members" },
  { value: "150+", label: "Premium Products" },
  { value: "4.9★", label: "Avg. Rating" },
];

export default function GuestHeroAttention({ navigate, scrollToId }) {
  return (
    <section id="home" className="relative overflow-hidden hero-guest-bg">
      {/* Animated Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-pulse-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,123,123,0.18) 0%, transparent 70%)" }} />
      <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full animate-pulse-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(237,52,108,0.12) 0%, transparent 70%)", animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full animate-pulse-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,221,221,0.3) 0%, transparent 70%)", animationDelay: "4s" }} />

      <Container>
        <div className="py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left">
            <SoftPill>Curated Beauty Retail ✨</SoftPill>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] font-poppins text-black tracking-tight leading-[1.1] animate-fade-up-delay-1">
              Temukan Shade &amp;
              <span className="block mt-2 text-gradient-animated">
                Look Terbaikmu
              </span>
            </h1>

            <p className="mt-5 font-barlow text-sm sm:text-base font-medium text-abu max-w-lg leading-relaxed animate-fade-up-delay-2">
              Sempurnakan riasan harianmu dengan kurasi produk kosmetik premium berpigmen tinggi. Kumpulkan <em>beauty points</em> di setiap transaksi dan nikmati hak istimewa sebagai member VIP.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto animate-fade-up-delay-3">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto btn-pink-premium cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest"
              >
                Join Beauty Club — Gratis 🌸
              </button>
              <button
                type="button"
                onClick={() => scrollToId("products")}
                className="w-full sm:w-auto btn-outline cursor-pointer text-xs font-extrabold uppercase tracking-widest"
              >
                Eksplorasi Produk
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-up-delay-4">
              {STATS.map((s, i) => (
                <div key={i} className="text-left">
                  <p className="font-poppins text-2xl font-black text-black">{s.value}</p>
                  <p className="font-barlow text-[11px] font-bold text-abu uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Luxury Beauty Perks Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
              {[
                { title: "Personalized Shade", desc: "Kecocokan warna akurat sesuai undertone kulitmu." },
                { title: "Glow Tier Reward", desc: "Makin tinggi level, makin melimpah kupon spesial." },
                { title: "Verified Reviews", desc: "Ulasan tekstur dan coverage nyata dari komunitas." },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="card-glass p-4 hover:shadow-md transition-all duration-300 group"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <p className="font-poppins text-[11px] font-extrabold uppercase tracking-widest text-pink-utama group-hover:translate-x-1 transition-transform duration-200">
                    {item.title}
                  </p>
                  <p className="font-barlow text-xs font-medium text-abu mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none animate-float">
            {/* Ambient Shadow Backdrop */}
            <div className="absolute -inset-8 rounded-[48px] blur-3xl animate-pulse-slow pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(237,52,108,0.15) 0%, rgba(255,123,123,0.1) 40%, transparent 70%)" }} />

            {/* Main Showcase Card */}
            <div className="relative card-premium p-0 hover:scale-[1.01] transition-all duration-500">
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#FFFBFB] via-white to-pink-soft/20 p-8 flex items-center justify-center overflow-hidden relative">
                <img
                  src="/img/hero.png"
                  alt="BeautyBloom Premium Collection"
                  className="w-full h-full object-contain select-none drop-shadow-md transition-transform duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "/img/design2.jpg"; }}
                />
                {/* Best Seller badge */}
                <span className="absolute top-4 left-4 badge-pink text-[9px] font-extrabold tracking-widest uppercase">
                  ✨ Premium
                </span>
              </div>

              {/* Card Footer */}
              <div className="p-5 bg-white border-t border-pink-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon-gradient-soft">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-pink-utama">Beauty Perks</p>
                      <p className="font-barlow text-xs font-bold text-gray-800 mt-0.5">Kado Eksklusif Menantimu</p>
                    </div>
                  </div>
                  <span className="badge-platinum text-[9px]">
                    Platinum Elite
                  </span>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <div className="absolute -bottom-4 -left-6 card-glass px-4 py-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <p className="font-poppins text-[10px] font-extrabold text-pink-utama uppercase tracking-wider">Flash Deal</p>
              <p className="font-barlow text-xs font-bold text-gray-800 mt-0.5">Diskon s/d 15% 🔥</p>
            </div>
            <div className="absolute -top-4 -right-4 card-glass px-4 py-3 shadow-lg animate-float" style={{ animationDelay: "2.5s" }}>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-sm">★★★★★</span>
              </div>
              <p className="font-barlow text-[10px] font-bold text-gray-600 mt-0.5">2.5K+ Reviews</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}