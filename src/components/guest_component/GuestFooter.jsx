import React from "react";

export default function GuestFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-pink-100 bg-white">
      {/* Gradient top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, #ED346C, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10">
          <div className="grid sm:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/img/bb.png" alt="BeautyBloom Logo" className="w-9 h-9 object-contain rounded-xl shadow-sm" />
                <span className="font-poppins text-base font-extrabold tracking-tight text-black">
                  Beauty<span className="text-gradient-pink">Bloom</span>
                </span>
              </div>
              <p className="font-barlow text-xs font-medium text-abu leading-relaxed">
                Platform kecantikan eksklusif dengan kurasi produk premium dan program loyalitas member terbaik.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-pink-utama mb-3">Quick Links</p>
              <ul className="space-y-2">
                {["Catalog", "Beauty Club", "Exclusive Offers", "Community Reviews"].map((link) => (
                  <li key={link}>
                    <span className="font-barlow text-xs font-medium text-abu hover:text-pink-utama cursor-pointer transition-colors duration-200">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-poppins text-[10px] font-extrabold uppercase tracking-widest text-pink-utama mb-3">Contact</p>
              <ul className="space-y-2">
                <li className="font-barlow text-xs font-medium text-abu">care@beautybloom.com</li>
                <li className="font-barlow text-xs font-medium text-abu">+62 811-2222-3333</li>
                <li className="font-barlow text-xs font-medium text-abu">Senayan City Mall, Jakarta</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-barlow text-xs font-medium text-abu">
              &copy; {year} BeautyBloom. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <span key={item} className="font-barlow text-[11px] font-medium text-abu hover:text-pink-utama cursor-pointer transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}