import React from "react";

export default function GuestFeaturesInterest({ navigate }) {
  return (
    <section className="py-12 sm:py-16 bg-[#fafafa]" aria-label="Beauty Advantages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              Sentuhan Istimewa BeautyBloom
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Alasan mengapa para pencinta kecantikan memilih mempercayakan *look* mereka bersama kami.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn-outline cursor-pointer !py-2.5 !px-6 text-xs font-extrabold uppercase tracking-widest"
          >
            Mulai Bersinar
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { 
              t: "Personalized Profile", 
              d: "Simpan preferensi *undertone* kulit dan riwayat belanja kecantikanmu dengan aman dalam satu tempat." 
            },
            { 
              t: "Signature Look Catalog", 
              d: "Eksplorasi koleksi kosmetik terkurasi lengkap dengan informasi *shade, coverage,* hingga kecocokan jenis kulit." 
            },
            { 
              t: "Privilege Glow Tier", 
              d: "Nikmati akumulasi poin otomatis dan naikkan status keanggotaanmu untuk membuka diskon belanja yang lebih besar." 
            },
            { 
              t: "Beauty Voucher", 
              d: "Akses penawaran kilat, potongan harga spesial hari raya, hingga kado produk gratis khusus member." 
            },
            { 
              t: "Honest Community Reviews", 
              d: "Bagikan pengalaman pemakaian serum atau kosmetik favoritmu, serta baca ulasan jujur dari sesama pengguna." 
            },
            { 
              t: "Integrated Skin Journey", 
              d: "Sistem cerdas yang mengingat produk kecantikan andalanmu agar proses *restock* bulanan terasa instan." 
            },
          ].map((item) => (
            <div 
              key={item.t} 
              className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:border-pink-border hover:shadow-md transition-all duration-300 group"
            >
              {/* Elegant Icon Box */}
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-pink-utama flex items-center justify-center font-poppins text-sm group-hover:scale-110 transition-transform duration-300">
                ✨
              </div>
              
              <p className="mt-5 font-poppins text-xs font-extrabold uppercase tracking-wider text-pink-utama">
                {item.t}
              </p>
              
              <p className="mt-2 font-barlow text-sm font-medium text-abu leading-relaxed">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}