import React, { useState } from "react";

export default function GuestFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-14 sm:py-20 bg-white relative overflow-hidden" aria-label="Beauty Q&A">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(244,221,221,0.15) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="section-pill mb-3">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight mt-3">
            Beauty <span className="text-gradient-pink">Q&A</span>
          </h2>
          <p className="mt-2 font-barlow text-sm font-medium text-abu">
            Segala hal yang ingin kamu ketahui tentang produk, <em>shade</em>, dan keanggotaan eksklusif kami.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid lg:grid-cols-2 gap-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className={`card-premium overflow-visible transition-all duration-300 ${isOpen ? "ring-1 ring-pink-utama/30" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className={`font-poppins text-sm font-bold transition-colors duration-200 ${isOpen ? "text-pink-utama" : "text-gray-900"}`}>
                    {f.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-poppins text-sm font-black shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-pink-utama text-white rotate-45 glow-pink-sm"
                      : "bg-pink-50 text-pink-utama"
                  }`}>
                    +
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-48" : "max-h-0"}`}>
                  <div className="px-6 pb-5 border-t border-pink-50">
                    <p className="font-barlow text-sm font-medium text-abu leading-relaxed pt-4">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}