import React from "react";

export default function GuestActionCTA({ navigate, scrollToId, SoftPill, Container }) {
  return (
    <section className="py-10 sm:py-16 bg-[#fafafa] relative overflow-hidden">
      <Container>
        <div className="relative rounded-[36px] overflow-hidden p-8 sm:p-14">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 gradient-mesh-pink opacity-70" />

          {/* Decorative orbs */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full animate-pulse-slow pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(237,52,108,0.25) 0%, transparent 70%)" }} />
          <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full animate-pulse-slow pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,123,123,0.2) 0%, transparent 70%)", animationDelay: "3s" }} />

          {/* Glass overlay */}
          <div className="absolute inset-0 rounded-[36px]"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.7)",
            }} />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <SoftPill>Exclusive Invitation ✨</SoftPill>
              <h2 className="mt-5 text-2xl sm:text-3xl font-poppins text-black tracking-tight leading-snug">
                Siap Tampil Memukau{" "}
                <span className="text-gradient-animated">Setiap Hari?</span>
              </h2>
              <p className="mt-3 font-barlow text-sm sm:text-base font-medium text-abu leading-relaxed">
                Bergabunglah dengan <em>Beauty Club</em> kami. Dapatkan akses instan ke penawaran produk terlaris, diskon sesuai level keanggotaanmu, serta ribuan ulasan jujur untuk <em>look</em> impianmu.
              </p>

              {/* Feature pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Diskon Member", "Flash Sale Eksklusif", "Beauty Points", "Review Produk"].map((tag) => (
                  <span key={tag} className="font-barlow text-[10px] font-bold text-pink-utama bg-white/80 border border-pink-100 px-3 py-1 rounded-full">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto btn-pink-premium cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest"
              >
                🌸 Klaim Reward Member
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