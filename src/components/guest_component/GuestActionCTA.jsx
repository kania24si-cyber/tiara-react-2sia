import React from "react";

export default function GuestActionCTA({ navigate, scrollToId, SoftPill, Container }) {
  return (
    <section className="py-10 sm:py-16 bg-[#fafafa]">
      <Container>
        <div className="rounded-[32px] bg-gradient-to-r from-pink-soft/30 via-white to-pink-soft/20 border border-pink-border p-8 sm:p-12 shadow-xs relative overflow-hidden">
          {/* Accent Glow Inside Card */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-pink-soft/40 blur-2xl pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <SoftPill>Exclusive Invitation</SoftPill>
              <h2 className="mt-4 text-2xl sm:text-3xl font-poppins text-black tracking-tight">
                Siap Tampil Memukau Setiap Hari?
              </h2>
              <p className="mt-3 font-barlow text-sm sm:text-base font-medium text-abu leading-relaxed">
                Bergabunglah dengan *Beauty Club* kami sekarang. Dapatkan akses instan ke penawaran produk terlaris, diskon khusus sesuai level keanggotaanmu, serta ribuan ulasan jujur untuk *look* impianmu berikutnya.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto btn-pink cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md shadow-rose-500/10"
              >
                Klaim Reward Member
              </button>
              <button
                type="button"
                onClick={() => scrollToId("reviews")}
                className="w-full sm:w-auto btn-outline cursor-pointer text-xs font-extrabold uppercase tracking-widest"
              >
                Baca Ulasan Pemakaian
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}