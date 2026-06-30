import React, { useState, useEffect } from "react";

export default function GuestLandingHeader({ navigate, scrollToId }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Catalog", id: "products" },
    { label: "Beauty Club", id: "membership" },
    { label: "Offers", id: "promo" },
    { label: "Community", id: "reviews" },
    { label: "Concierge", id: "contact" },
  ];

  return (
    <>
      <header
        className={`header-box transition-all duration-300 ${
          scrolled ? "header-scrolled py-3" : "bg-white/90 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

          {/* Brand Logo & Tagline */}
          <button type="button" onClick={() => scrollToId("home")} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF7B7B] via-pink-utama to-[#ED346C] flex items-center justify-center shadow-md glow-pink-sm">
              <span className="text-white font-poppins text-sm font-extrabold tracking-wider">BB</span>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 animate-shimmer opacity-40" />
              </div>
            </div>
            <div className="text-left">
              <p className="font-poppins text-xs font-extrabold uppercase tracking-widest text-gradient-pink">
                BeautyBloom
              </p>
              <p className="font-barlow text-[10px] text-abu -mt-0.5 font-bold uppercase tracking-wider">
                Curated Cosmetics
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-pink-50/60 rounded-full px-2 py-1.5 border border-pink-100">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="nav-link-animated font-barlow text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
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
              className="btn-pink-premium cursor-pointer !py-2 !px-5 !rounded-full text-xs font-extrabold uppercase tracking-widest"
            >
              Join Club
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-pink-50 transition"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-pink-100 shadow-lg px-6 py-4 z-50">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="block py-3 font-barlow text-sm font-bold text-gray-700 hover:text-pink-utama border-b border-gray-50 last:border-none transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => { navigate("/login"); setMenuOpen(false); }} className="flex-1 btn-outline !py-2.5 text-xs font-extrabold uppercase tracking-widest cursor-pointer">
                Sign In
              </button>
              <button type="button" onClick={() => { navigate("/register"); setMenuOpen(false); }} className="flex-1 btn-pink-premium !py-2.5 text-xs font-extrabold uppercase tracking-widest cursor-pointer">
                Join Club
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}