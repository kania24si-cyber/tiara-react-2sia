import React from "react";

export default function GuestMembershipDesire({ memberships, navigate }) {
  return (
    <section id="membership" className="py-12 sm:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              Glow Tier Privileges
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Raih keuntungan eksklusif dan kumpulkan keistimewaan luar biasa di setiap level kecantikanmu.
            </p>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {memberships.map((m) => {
            const isGold = m.tier.toLowerCase() === "gold";

            return (
              <div
                key={m.tier}
                className={
                  isGold
                    ? "bg-gradient-to-br from-purple-950 via-[#ED346C] to-[#e11d48] border border-pink-border rounded-[32px] p-8 text-white shadow-lg relative overflow-hidden"
                    : "bg-white border border-gray-100 rounded-[32px] p-8 text-gray-800 shadow-xs relative overflow-hidden"
                }
              >
                {/* Visual Background Accent for Luxury Vibe */}
                {isGold && (
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                )}

                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div>
                    <span
                      className={
                        isGold
                          ? "font-poppins text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white"
                          : "font-poppins text-[10px] font-extrabold uppercase tracking-widest text-pink-utama bg-rose-50 border border-pink-border px-3 py-1 rounded-full"
                      }
                    >
                      {m.tier} Status
                    </span>
                    <h3 className="mt-5 text-2xl font-poppins tracking-tight">
                      {m.highlight || `${m.tier} Luxury Tier`}
                    </h3>
                  </div>
                  <div className={isGold ? "text-3xl filter drop-shadow-md" : "text-2xl"}>
                    {isGold ? "✨" : "🌸"}
                  </div>
                </div>

                {/* Discount Banner */}
                <div className="mt-6 flex items-end gap-2.5 relative z-10">
                  <div className={isGold ? "text-amber-300 font-poppins text-5xl font-black leading-none" : "text-pink-utama font-poppins text-5xl font-black leading-none"}>
                    {m.discountPct}%
                  </div>
                  <div className={isGold ? "text-white/80 font-barlow text-xs font-bold uppercase tracking-wider pb-1" : "text-abu font-barlow text-xs font-bold uppercase tracking-wider pb-1"}>
                    Special Tier Off
                  </div>
                </div>

                {/* Benefits List */}
                <div className="mt-6 relative z-10">
                  <p className={isGold ? "font-poppins text-[10px] font-extrabold uppercase tracking-wider text-white/70" : "font-poppins text-[10px] font-extrabold uppercase tracking-wider text-pink-utama"}>
                    Exclusive Perks
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {m.benefit.map((b) => (
                      <li
                        key={b}
                        className={
                          isGold
                            ? "flex items-center gap-3 font-barlow text-sm font-medium text-white/90"
                            : "flex items-center gap-3 font-barlow text-sm font-medium text-gray-700"
                        }
                      >
                        <span className={isGold ? "w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" : "w-1.5 h-1.5 rounded-full bg-pink-utama shrink-0"} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upgrade Requirement Box */}
                <div className={isGold ? "mt-8 p-4 rounded-xl bg-white/10 border border-white/10" : "mt-8 p-4 rounded-xl bg-[#fafafa] border border-gray-100"}>
                  <p className={isGold ? "font-poppins text-[10px] font-extrabold uppercase tracking-wider text-amber-300" : "font-poppins text-[10px] font-extrabold uppercase tracking-wider text-pink-utama"}>
                    Privilege Upgrade
                  </p>
                  <p className={isGold ? "font-barlow text-sm font-semibold text-white/90 mt-1" : "font-barlow text-sm font-semibold text-gray-800 mt-1"}>
                    {m.upgradeSyarat}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className={
                    isGold
                      ? "mt-6 w-full py-3 rounded-full bg-white text-purple-950 font-poppins text-xs font-extrabold uppercase tracking-widest hover:bg-amber-300 hover:text-purple-950 transition-all duration-300 cursor-pointer shadow-md"
                      : "mt-6 w-full btn-pink !rounded-full text-xs font-extrabold uppercase tracking-widest cursor-pointer shadow-xs"
                  }
                >
                  Klaim Benefit {m.tier}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}