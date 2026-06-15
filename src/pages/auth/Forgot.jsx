import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="card-beauty w-full max-w-md p-8 rounded-2xl bg-white border border-pink-100/70 shadow-sm">
        
        {/* LOGO AREA (Small Placeholder) */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
            <span className="text-2xl">🌸</span>
          </div>
        </div>

        {/* BRANDING TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-poppins text-[#ED346C] tracking-tight mb-1.5">
            Forgot Password
          </h2>
          <p className="text-xs font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">
            Masukkan email terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password Anda.
          </p>
        </div>

        {/* FORMULIR UTAMA */}
        <form className="space-y-4">
          <div className="text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="input-beauty w-full text-xs py-2.5 px-3.5 focus:ring-1 focus:ring-pink-200"
                required
              />
            </div>
          </div>

          {/* TOMBOL LOGIN UTAMA (Dilebarkan & Dicocokkan) */}
          <div className="pt-2 w-full">
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white text-xs font-semibold shadow-sm transition-all bg-gradient-to-r from-[#FF7B7B] to-[#ED346C] hover:opacity-95"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        {/* TAUTAN TAMBAHAN (FOOTER CARD) */}
        <div className="mt-6 border-t border-pink-100/60 pt-4 text-center">
          <p className="text-xs font-medium text-gray-400">
            Remember your password?
          </p>
          <Link
            to="/login"
            className="inline-block mt-2 text-xs font-bold text-[#ED346C] hover:text-[#d62659] transition-colors"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}