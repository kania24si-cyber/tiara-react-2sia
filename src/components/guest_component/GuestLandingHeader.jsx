import React from "react";

export default function GuestLandingHeader({ navigate, scrollToId }) {
  // Fungsi helper untuk mencegah reload halaman default dan menggunakan kelola scroll ID
  const handleScroll = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header className="header-box">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-primary-1 via-pink-utama to-[#ED346C] flex items-center justify-center shadow-xs">
            <span className="text-white font-poppins text-sm font-extrabold tracking-wider">BB</span>
          </div>
          <div className="text-left">
            <p className="font-poppins text-xs font-extrabold uppercase tracking-widest text-pink-utama">
              BeautyBloom
            </p>
            <p className="font-barlow text-[10px] text-abu -mt-0.5 font-bold uppercase tracking-wider">
              Curated Cosmetics
            </p>
          </div>
        </div>

        {/* Premium E-Commerce Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-barlow text-xs font-bold uppercase tracking-wider text-gray-600">
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, "home")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Home
          </a>
          <a 
            href="#products" 
            onClick={(e) => handleScroll(e, "products")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Catalog
          </a>
          <a 
            href="#membership" 
            onClick={(e) => handleScroll(e, "membership")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Beauty Club
          </a>
          <a 
            href="#promo" 
            onClick={(e) => handleScroll(e, "promo")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Offers
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => handleScroll(e, "reviews")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Community
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, "contact")} 
            className="hover:text-pink-utama transition-colors duration-200"
          >
            Concierge
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="hidden sm:inline-flex items-center justify-center btn-outline cursor-pointer !py-2 !px-5 text-xs font-extrabold uppercase tracking-widest"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center btn-pink cursor-pointer !py-2 !px-5 !rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xs"
          >
            Join Club
          </button>
        </div>

      </div>
    </header>
  );
}