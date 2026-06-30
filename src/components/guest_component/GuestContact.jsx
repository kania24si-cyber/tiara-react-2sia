import React from "react";

const CONTACTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Layanan Email",
    value: "care@beautybloom.com",
    sub: "Respons dalam 24 jam",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.11-6.928-6.927l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "WhatsApp Consult",
    value: "+62 811-2222-3333",
    sub: "Senin–Sabtu, 09.00–18.00",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: "Boutique Center",
    value: "Senayan City Mall, Lantai UG",
    sub: "Jakarta Pusat",
  },
];

export default function GuestContact({ navigate, socials }) {
  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 80%, rgba(244,221,221,0.2) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-premium p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle glow bg */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none animate-pulse-slow"
            style={{ background: "radial-gradient(circle, rgba(244,221,221,0.3) 0%, transparent 70%)" }} />

          <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
            {/* Left: Beauty Assistance */}
            <div>
              <span className="section-pill mb-4">Contact Us</span>
              <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-4">
                Beauty <span className="text-gradient-pink">Concierge</span>
              </h2>
              <p className="mt-3 font-barlow text-sm font-medium text-abu leading-relaxed">
                Punya pertanyaan seputar kecocokan <em>shade</em>, formulasinya, atau butuh bantuan akun <em>membership</em>? Tim <em>Beauty Expert</em> kami siap memandu Anda.
              </p>

              <div className="mt-8 space-y-4">
                {CONTACTS.map((c) => (
                  <div key={c.label} className="stat-card flex items-center gap-4">
                    <div className="icon-gradient-soft">
                      {c.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-pink-utama">{c.label}</p>
                      <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">{c.value}</p>
                      {c.sub && <p className="font-barlow text-[11px] font-medium text-abu mt-0.5">{c.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Social + Membership Invitation */}
            <div className="space-y-5">
              {/* Social Media */}
              <div className="card-glass p-6">
                <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-pink-utama mb-4">Social Media</p>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <div key={s.label} className="flex items-center justify-between border-b border-pink-50 pb-3 last:border-none last:pb-0">
                      <span className="font-barlow text-sm font-semibold text-gray-700">{s.label}</span>
                      <span className="font-poppins text-[10px] font-extrabold text-pink-utama bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join Invitation */}
              <div className="relative rounded-[24px] p-6 overflow-hidden">
                <div className="absolute inset-0 gradient-mesh-pink opacity-60" />
                <div className="absolute inset-0 rounded-[24px]"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.7)",
                  }} />
                <div className="relative z-10">
                  <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-pink-utama">Special Privilege</p>
                  <p className="font-barlow text-sm font-medium text-abu mt-2 leading-relaxed">
                    Siap mengumpulkan <em>beauty points</em> pertamamu? Daftarkan dirimu dan rasakan bedanya pelayanan kecantikan eksklusif.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="mt-5 w-full btn-pink-premium cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest"
                  >
                    🌸 Daftar Member Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}