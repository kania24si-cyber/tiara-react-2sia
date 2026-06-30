import React from "react";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 transition-all duration-200 ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function GuestReviewsDesire({ reviews }) {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(255,123,123,0.07) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="section-pill mb-3">Community Voices</span>
          <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
            The Glow <span className="text-gradient-pink">Journal</span>
          </h2>
          <p className="mt-2 font-barlow text-sm font-medium text-abu">
            Cerita jujur dan impresi nyata dari mereka yang telah merasakan transformasi pesona bersama koleksi kami.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="card-premium p-6 flex flex-col justify-between group animate-fade-up relative"
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              {/* Decorative Quote Mark */}
              <div className="absolute top-4 right-5 font-poppins text-6xl font-black text-pink-100 leading-none select-none pointer-events-none group-hover:text-pink-200 transition-colors duration-300">
                "
              </div>

              <div className="relative z-10">
                {/* User Profile */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-poppins font-extrabold text-sm shrink-0 text-white"
                    style={{ background: `linear-gradient(135deg, #FF7B7B ${i * 20}%, #ED346C)` }}>
                    {r.name?.[0]?.toUpperCase() || "B"}
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm font-bold text-gray-900">{r.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={r.rating} />
                      <span className="font-barlow text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider ml-1">
                        Verified ✓
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tagged Product */}
                <div className="mt-4 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 text-left">
                  <p className="font-poppins text-[9px] font-extrabold uppercase tracking-widest text-pink-utama">Purchased</p>
                  <p className="font-barlow text-xs font-bold text-gray-800 mt-0.5 line-clamp-1">{r.product}</p>
                </div>
              </div>

              {/* Review Quote */}
              <p className="mt-4 font-barlow text-sm font-medium text-abu leading-relaxed text-left italic relative z-10">
                "{r.comment}"
              </p>

              {/* Bottom hover accent */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: "linear-gradient(90deg, #FF7B7B, #ED346C)" }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}