import React from "react";

function SoftPill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-pink-border px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-pink-utama shadow-sm animate-pulse">
      <span className="w-1.5 h-1.5 rounded-full bg-pink-utama"></span>
      {children}
    </span>
  );
}

function Container({ children }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

export default function GuestHeroAttention({ navigate, scrollToId }) {
  return (
    <section id="home" className="relative overflow-hidden bg-[#fafafa]">
      {/* Soft Glow Ornaments */}
      <div className="absolute -top-24 -left-24 w-85 h-85 rounded-full bg-pink-soft/60 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-pink-soft/40 blur-3xl pointer-events-none" />

      <Container>
        <div className="py-12 sm:py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left">
            <SoftPill>Curated Beauty Retail</SoftPill>
            
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-poppins text-black tracking-tight leading-[1.15]">
              Temukan Shade &
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-utama to-[#ED346C]">
                Look Terbaikmu
              </span>
            </h1>
            
            <p className="mt-5 font-barlow text-sm sm:text-base font-medium text-abu max-w-xl leading-relaxed">
              Sempurnakan riasan harianmu dengan kurasi produk kosmetik premium berpigmen tinggi. Dapatkan rekomendasi *finish* yang paling pas untuk jenis kulitmu, kumpulkan *beauty points* di setiap transaksi, dan nikmati hak istimewa sebagai member VIP.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto btn-pink cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md shadow-rose-500/20"
              >
                Join Beauty Club — Gratis
              </button>
              <button
                type="button"
                onClick={() => scrollToId("products")}
                className="w-full sm:w-auto btn-outline cursor-pointer text-xs font-extrabold uppercase tracking-widest"
              >
                Eksplorasi Produk
              </button>
            </div>

            {/* Luxury Beauty Perks Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
              {[
                { title: "Personalized Shade", desc: "Temukan kecocokan warna akurat sesuai *undertone* kulitmu." },
                { title: "Glow Tier Reward", desc: "Makin tinggi level keanggotaan, makin melimpah kupon belanja spesial." },
                { title: "Verified Reviews", desc: "Ulasan tekstur, *coverage*, dan ketahanan nyata dari pencinta makeup." }
              ].map((item) => (
                <div 
                  key={item.title} 
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-pink-border hover:shadow-md transition-all duration-300 group"
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
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Soft Ambient Shadow Backdrop */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-pink-soft/40 to-transparent blur-2xl pointer-events-none" />
            
            {/* Showcase Card Luxury */}
            <div className="relative rounded-[32px] border border-gray-100 bg-white shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#FFFBFB] via-white to-pink-soft/20 p-6 flex items-center justify-center">
                <img
                  src="/img/hero.png"
                  alt="BeautyBloom Premium Collection"
                  className="w-full h-full object-contain select-none drop-shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = "/img/design2.jpg";
                  }}
                />
              </div>

              {/* Card Footer: Beauty Perks Status */}
              <div className="p-5 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-pink-utama">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-pink-utama">
                        Beauty Perks
                      </p>
                      <p className="font-barlow text-xs font-bold text-gray-800 mt-0.5">
                        Kado Eksklusif Menantimu
                      </p>
                    </div>
                  </div>
                  <span className="font-poppins px-3 py-1.5 rounded-full bg-pink-soft/50 border border-pink-border text-pink-utama text-[10px] font-extrabold shadow-2xs">
                    Platinum Tier Elite
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}