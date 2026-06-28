import React from "react";

export default function GuestReviewsDesire({ reviews }) {
  return (
    <section id="reviews" className="py-12 sm:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              The Glow Journal
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Cerita jujur dan impresi nyata dari mereka yang telah merasakan transformasi pesona bersama koleksi kami.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-xs hover:border-pink-border transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Header User Profile */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-pink-border/30 flex items-center justify-center text-pink-utama font-poppins font-extrabold text-sm shrink-0">
                    {r.name?.[0]?.toUpperCase() || "B"}
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm font-bold text-gray-900 line-clamp-1">{r.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="font-barlow text-xs font-bold text-gray-800">{r.rating}</span>
                      <span className="text-gray-300 mx-1">|</span>
                      <span className="font-barlow text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider">Verified Buyer</span>
                    </div>
                  </div>
                </div>

                {/* Tagged Product Box */}
                <div className="mt-4 p-3 rounded-xl bg-pink-soft/10 border border-pink-border/30 text-left">
                  <p className="font-poppins text-[9px] font-extrabold uppercase tracking-widest text-pink-utama">Purchased Item</p>
                  <p className="font-barlow text-xs font-bold text-gray-800 mt-0.5 line-clamp-1">{r.product}</p>
                </div>
              </div>

              {/* User Review Quote */}
              <p className="mt-4 font-barlow text-sm font-medium text-abu leading-relaxed text-left italic">
                "{r.comment}"
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}