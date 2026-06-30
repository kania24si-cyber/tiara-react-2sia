import React from "react";

export default function GuestMembershipDesire({ memberships, navigate }) {
  return (
    <section id="membership" className="py-14 sm:py-20 bg-[#fafafa] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(237,52,108,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="section-pill mb-3">Loyalty Program</span>
          <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
            Glow Tier <span className="text-gradient-pink">Privileges</span>
          </h2>
          <p className="mt-2 font-barlow text-sm font-medium text-abu">
            Raih keuntungan eksklusif dan kumpulkan keistimewaan luar biasa di setiap level kecantikanmu.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {memberships.map((m, i) => {
            const isGold = m.tier.toLowerCase() === "gold";
            return (
              <div
                key={m.tier}
                className={`relative overflow-hidden p-8 animate-fade-up ${
                  isGold ? "card-gold" : "card-premium"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Shimmer overlay for gold card */}
                {isGold && (
                  <>
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
                    <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                      <div className="absolute -top-full left-0 w-full h-full rotate-12 animate-shimmer opacity-20"
                        style={{ background: "linear-gradient(transparent, rgba(255,255,255,0.3), transparent)" }} />
                    </div>
                  </>
                )}

                {/* Header */}
                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div>
                    <span className={isGold ? "badge-gold" : "badge-silver"}>
                      {m.tier} Status
                    </span>
                    <h3 className={`mt-5 text-2xl font-poppins tracking-tight ${isGold ? "text-white" : "text-gray-900"}`}>
                      {m.highlight || `${m.tier} Luxury Tier`}
                    </h3>
                  </div>
                  <div className={`text-4xl filter ${isGold ? "drop-shadow-lg" : ""} animate-float`} style={{ animationDelay: `${i}s` }}>
                    {isGold ? "✨" : "🌸"}
                  </div>
                </div>

                {/* Discount Banner */}
                <div className="mt-7 relative z-10">
                  <div className="flex items-end gap-3">
                    <span className={`font-poppins text-6xl font-black leading-none ${isGold ? "text-white" : "text-pink-utama"}`}>
                      {m.discountPct}%
                    </span>
                    <div className={`pb-1 font-barlow text-xs font-bold uppercase tracking-wider ${isGold ? "text-white/70" : "text-abu"}`}>
                      Special<br />Tier Off
                    </div>
                  </div>
                  {/* Progress bar visual */}
                  <div className="mt-4 progress-bar-track">
                    <div
                      className="progress-bar-fill animate-progress"
                      style={{ "--progress-width": isGold ? "100%" : "50%", width: isGold ? "100%" : "50%" }}
                    />
                  </div>
                  <p className={`mt-1 text-[10px] font-bold ${isGold ? "text-white/60" : "text-abu"}`}>
                    {isGold ? "Level Tertinggi — Platinum Berikutnya!" : "50% menuju Gold Tier"}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="mt-6 relative z-10">
                  <p className={`font-poppins text-[10px] font-extrabold uppercase tracking-wider ${isGold ? "text-white/70" : "text-pink-utama"}`}>
                    Exclusive Perks
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {m.benefit.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 font-barlow text-sm font-medium ${isGold ? "text-white/90" : "text-gray-700"}`}
                      >
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isGold ? "bg-amber-300 shadow-sm" : "bg-pink-utama"}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upgrade Box */}
                <div className={`mt-8 p-4 rounded-2xl relative z-10 ${isGold ? "bg-white/10 border border-white/15" : "bg-pink-50/80 border border-pink-100"}`}>
                  <p className={`font-poppins text-[10px] font-extrabold uppercase tracking-wider ${isGold ? "text-amber-300" : "text-pink-utama"}`}>
                    Privilege Upgrade
                  </p>
                  <p className={`font-barlow text-sm font-semibold mt-1 ${isGold ? "text-white/90" : "text-gray-800"}`}>
                    {m.upgradeSyarat}
                  </p>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className={`mt-6 w-full py-3.5 rounded-full font-poppins text-xs font-extrabold uppercase tracking-widest cursor-pointer transition-all duration-300 relative z-10 ${
                    isGold
                      ? "bg-white text-slate-900 hover:bg-amber-300 hover:text-slate-900 shadow-lg"
                      : "btn-pink-premium"
                  }`}
                >
                  Klaim Benefit {m.tier} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}