import React from "react";

export default function GuestProductsDesire({ products, navigate }) {
  return (
    <section id="products" className="py-12 sm:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              Most Loved Collections
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Produk kosmetik dan perawatan terlaris pilihan komunitas kecantikan dengan ulasan terbaik.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-outline cursor-pointer !py-2.5 !px-6 text-xs font-extrabold uppercase tracking-widest"
          >
            Lihat Semua Katalog
          </button>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="card-beauty p-5 flex flex-col justify-between group">
              <div>
                {/* Image Container */}
                <div className="aspect-[4/3] rounded-2xl bg-pink-soft/20 border border-gray-100 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/img/james3.jpg";
                    }}
                  />
                  {p.rating >= 4.8 && (
                    <span className="absolute top-3 left-3 bg-[#e11d48] text-white font-poppins text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-4 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-poppins text-sm font-bold text-gray-900 group-hover:text-[#e11d48] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="font-poppins text-base font-black text-[#e11d48] mt-1">
                        Rp {p.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="text-right shrink-0">
                      <p className="font-poppins text-[9px] font-extrabold uppercase tracking-widest text-abu">Review</p>
                      <div className="mt-0.5 flex items-center justify-end gap-1">
                        <span className="text-amber-400 font-poppins text-xs">★</span>
                        <span className="font-barlow text-xs font-bold text-gray-900">{p.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="font-barlow text-xs font-medium text-abu mt-2.5 leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-5 w-full btn-pink !rounded-xl cursor-pointer text-xs font-extrabold uppercase tracking-widest shadow-xs"
              >
                Lihat Detail & Shade
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}