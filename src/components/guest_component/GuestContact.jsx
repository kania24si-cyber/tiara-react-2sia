import React from "react";

export default function GuestContact({ navigate, socials }) {
  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-pink-border bg-white p-8 sm:p-12 shadow-xs relative overflow-hidden">
          {/* Subtle Glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-soft/30 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-10 items-start relative z-10">
            {/* Left Side: Beauty Assistance */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
                Beauty Concierge
              </h2>
              <p className="mt-3 font-barlow text-sm font-medium text-abu leading-relaxed">
                Punya pertanyaan seputar kecocokan *shade*, formulasinya, atau butuh bantuan dengan akun *membership* Anda? Tim *Beauty Expert* kami siap menyambut dan memandu Anda.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="p-4 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#e11d48] shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-[#e11d48]">Layanan Email</p>
                    <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">care@beautybloom.com</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#e11d48] shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.11-6.928-6.927l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-[#e11d48]">WhatsApp Consult</p>
                    <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">+62 811-2222-3333</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#e11d48] shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-[#e11d48]">Boutique Center</p>
                    <p className="font-barlow text-sm font-bold text-gray-800 mt-0.5">Senayan City Mall, Lantai UG — Jakarta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Social Media & Membership Invitation */}
            <div className="space-y-4">
              <div className="p-6 rounded-[24px] bg-[#fafafa] border border-gray-100">
                <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-[#e11d48]">Social Media</p>
                <div className="mt-4 space-y-3">
                  {socials.map((s) => (
                    <div key={s.label} className="flex items-center justify-between border-b border-gray-50 pb-2.5 last:border-none last:pb-0">
                      <span className="font-barlow text-sm font-semibold text-gray-700">{s.label}</span>
                      <span className="font-poppins text-[10px] font-extrabold text-[#e11d48] bg-pink-soft/60 border border-pink-border px-3 py-1 rounded-full">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-gradient-to-br from-white to-pink-soft/20 border border-pink-border">
                <p className="font-poppins text-[10px] font-extrabold uppercase tracking-wider text-[#e11d48]">Special Privilege</p>
                <p className="font-barlow text-sm font-medium text-abu mt-2 leading-relaxed">
                  Siap mengumpulkan *beauty points* pertamamu? Daftarkan dirimu dan rasakan bedanya pelayanan kecantikan eksklusif.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="mt-4 w-full btn-pink cursor-pointer !rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm"
                >
                  Daftar Member Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}