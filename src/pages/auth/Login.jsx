// src/pages/Login.jsx
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Menggunakan ikon mata yang bersih
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { usersAPI } from "../../services/usersAPI";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State pemicu show/hide password
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const user = await usersAPI.loginUser(
        dataForm.email, 
        dataForm.password
      );

      if (!user || user.length === 0) {
        setError("Email atau Password salah!");
        return;
      }

      const loggedInUser = user[0];
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("admin", JSON.stringify(loggedInUser));

      // Dialihkan berdasarkan peran (role) yang masuk
      if (loggedInUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/member"); // Jika rolenya adalah 'member', arahkan ke rute khusus member
      }
    } catch (err) {
      setError(err.message || "Gagal menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const storedUser = JSON.parse(localStorage.getItem("admin") || "{}");
      if (storedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/member");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 font-[var(--font-barlow)]">
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
            BeautyBloom
          </h2>
          <p className="text-xs font-medium text-gray-400">
            Sign in to manage your BeautyBloom Store
          </p>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 mb-4 p-3.5 text-xs font-semibold text-rose-700 rounded-xl flex items-center gap-2">
            <MdOutlineError className="text-base shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* NOTIFIKASI LOADING */}
        {loading && (
          <div className="bg-pink-50/50 border border-pink-100 mb-4 p-3.5 text-xs font-semibold text-[#ED346C] rounded-xl flex items-center gap-2">
            <AiOutlineLoading className="animate-spin text-base shrink-0" />
            <span>Memvalidasi kredensial pengguna...</span>
          </div>
        )}

        {/* FORMULIR UTAMA */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FIELD EMAIL */}
          <div className="text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="input-beauty w-full text-xs py-2.5 px-3.5 focus:ring-1 focus:ring-pink-200"
                placeholder="email@beautybloom.com"
                value={dataForm.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* FIELD PASSWORD (Dengan Fitur Show/Hide) */}
          <div className="text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} // Berubah dinamis sesuai klik mata
                name="password"
                id="password"
                className="input-beauty w-full text-xs py-2.5 pl-3.5 pr-10 focus:ring-1 focus:ring-pink-200"
                placeholder="••••••••"
                value={dataForm.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              {/* Tombol Ikon Mata */}
              <button
                type="button"
                tabIndex="-1"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-[#ED346C] transition-colors focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* TOMBOL LOGIN UTAMA */}
          <div className="pt-2 w-full [&>button]:w-full [&>button]:py-3 [&>button]:rounded-xl [&>button]:text-xs [&>button]:font-semibold [&>button]:shadow-sm [&>button]:transition-all">
            <Button type="primary" disabled={loading}>
              Masuk ke Akun Anda
            </Button>
          </div>
        </form>

        {/* TAUTAN TAMBAHAN (FOOTER CARD) */}
        <div className="mt-6 border-t border-pink-100/60 pt-4 text-center space-y-2.5">
          <p className="text-xs font-medium text-gray-400">
            Forgot your password?
            <Link
              to="/forgot"
              className="ml-1 font-bold text-[#ED346C] hover:text-[#d62659] transition-colors"
            >
              Reset here
            </Link>
          </p>

          <p className="text-xs font-medium text-gray-400">
            Back to Landing?
            <Link
              to="/landing"
              className="ml-1 font-bold text-[#ED346C] hover:text-[#d62659] transition-colors"
            >
              Explore BeautyBloom
            </Link>
          </p>

          <p className="text-xs font-medium text-gray-400">
            Belum punya akun?
            <Link
              to="/register"
              className="ml-1 font-bold text-[#ED346C] hover:text-[#d62659] transition-colors"
            >
              Register sekarang
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}