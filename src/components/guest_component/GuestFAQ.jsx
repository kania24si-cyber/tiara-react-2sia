import React from "react";

export default function GuestFAQ({ faqs }) {
  return (
    <section className="py-12 sm:py-16 bg-[#fafafa]" aria-label="Beauty Q&A">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-poppins text-black tracking-tight">
              Beauty Q&A
            </h2>
            <p className="mt-2 font-barlow text-sm font-medium text-abu">
              Segala hal yang ingin kamu ketahui tentang produk, *shade*, dan keanggotaan eksklusif kami.
            </p>
          </div>
        </div>

        {/* FAQ Wrapper Card */}
        <div className="mt-8 rounded-[32px] border border-pink-border bg-white p-5 sm:p-8 shadow-xs">
          <div className="grid lg:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-gray-100 bg-[#fafafa] p-5 transition-all duration-300 open:border-pink-border open:bg-white open:shadow-xs"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 select-none">
                  <span className="font-poppins text-sm font-bold text-gray-900 group-open:text-pink-utama transition-colors duration-200">
                    {f.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-rose-50 text-pink-utama flex items-center justify-center font-poppins text-xs font-black transition-transform duration-300 group-open:rotate-45 group-open:bg-pink-utama group-open:text-white shrink-0">
                    ＋
                  </div>
                </summary>
                <div className="overflow-hidden transition-all duration-300">
                  <p className="mt-3 font-barlow text-sm font-medium text-abu leading-relaxed border-t border-gray-100/60 pt-3">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}