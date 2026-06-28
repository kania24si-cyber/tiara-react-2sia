import React from "react";

export default function GuestPromoDesire({ promos, navigate }) {
  return (
    <section id="promo" className="py-12 sm:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              Exclusive Offers
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Manjakan diri Anda dengan penawaran terbatas dan *beauty reward* spesial yang dikurasi untuk Anda.
            </p>
          </div>
        </div>

        {/* Promo Cards Grid */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {promos.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-pink-border transition-all duration-300 relative overflow-hidden group">
              {/* Card Top Section */}
              <div className="flex items-start justify-between gap-4 text-left">
                <div>
                  <span className={`font-poppins text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                    p.is_active 
                      ? "text-pink-utama bg-rose-50 border border-pink-border" 
                      : "text-gray-400 bg-gray-50 border border-gray-200"
                  }`}>
                    {p.is_active ? "Verified Voucher" : "Expired Offer"}
                  </span>
                  
                  {/* Promo Code Box */}
                  <h3 className="mt-5 font-poppins text-2xl font-black text-gray-900 tracking-wide bg-[#fafafa] border border-dashed border-gray-200 px-4 py-1.5 rounded-xl w-fit uppercase select-all">
                    {p.kode}
                  </h3>
                  <p className="mt-3 font-barlow text-sm font-medium text-abu leading-relaxed">
                    {p.deskripsi}
                  </p>
                </div>

                {/* Discount Badge */}
                <div className="text-right shrink-0">
                  <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-abu">Privilege</p>
                  <div className="mt-1 font-poppins text-4xl font-black text-[#e11d48] tracking-tight">
                    {p.diskonPct}% <span className="text-xs font-bold block text-abu mt-0.5">OFF</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Section */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-pink-soft/20 border border-pink-border/40 text-left w-full">
                <div className="w-full sm:w-auto">
                  <p className="font-poppins text-[9px] font-extrabold uppercase tracking-widest text-pink-utama">Valid Until</p>
                  <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">s/d {p.berlaku}</p>
                </div>
                <div className="w-full sm:w-auto text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    disabled={!p.is_active}
                    className="w-full sm:w-auto btn-pink cursor-pointer !py-2.5 !px-5 !rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Klaim Voucher
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