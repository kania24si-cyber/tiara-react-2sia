import React from "react";

export default function GuestProductsDesire({ products, navigate }) {
  return (
    <section id="products" className="py-14 sm:py-20 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #FF7B7B, #ED346C, #FF7B7B)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(255,123,123,0.06) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left mb-10">
          <div>
            <span className="section-pill mb-3">Best Sellers</span>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
              Most Loved <span className="text-gradient-pink">Collections</span>
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Produk kosmetik terlaris pilihan komunitas kecantikan dengan ulasan terbaik.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-outline cursor-pointer !py-2.5 !px-6 text-xs font-extrabold uppercase tracking-widest shrink-0"
          >
            Lihat Semua Katalog →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={p.id}
              className="card-premium p-0 flex flex-col justify-between group animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-pink-50 to-rose-50/30 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  style={{ transition: "transform 0.7s ease" }}
                  onError={(e) => { e.currentTarget.src = "/img/james3.jpg"; }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-center pb-4">
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="btn-pink-premium !py-2 !px-5 text-[10px] font-extrabold uppercase tracking-widest cursor-pointer translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Lihat Detail & Shade
                  </button>
                </div>
                {/* Badges */}
                {p.rating >= 4.8 && (
                  <span className="absolute top-3 left-3 badge-pink text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                    🏆 Best Seller
                  </span>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                  <span className="text-amber-400 text-xs">★</span>
                  <span className="font-barlow text-[11px] font-bold text-gray-900">{p.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 text-left">
                <h3 className="font-poppins text-sm font-bold text-gray-900 group-hover:text-pink-utama transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <p className="font-barlow text-xs font-medium text-abu mt-1.5 leading-relaxed line-clamp-2">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-pink-50 pt-3">
                  <p className="font-poppins text-base font-black text-pink-utama">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="btn-outline cursor-pointer !py-1.5 !px-4 text-[10px] font-extrabold uppercase tracking-widest !rounded-full"
                  >
                    Detail
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