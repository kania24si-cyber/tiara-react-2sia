// src/pages/Login.jsx
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Button from "../../components/Button";
import { usersAPI } from "../../services/usersAPI";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const users = await usersAPI.loginUser(
        dataForm.email,
        dataForm.password
      );

      if (!users || users.length === 0) {
        setError("Email atau Password salah!");
        return;
      }

      const loggedInUser = users[0];

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "admin",
        JSON.stringify(loggedInUser)
      );

      if (loggedInUser.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/member", { replace: true });
      }

    } catch (err) {
      setError(
        err?.message ||
        "Gagal menghubungkan ke server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="card-beauty w-full max-w-md p-8 rounded-2xl bg-white border border-pink-100/70 shadow-sm">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
            <span className="text-2xl">🌸</span>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-poppins text-[#ED346C] tracking-tight mb-1.5">
            BeautyBloom
          </h2>

          <p className="text-xs font-medium text-gray-400">
            Sign in to access your BeautyBloom Account & Lounge
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 mb-4 p-3.5 text-xs font-semibold text-rose-700 rounded-xl flex items-center gap-2">
            <MdOutlineError className="text-base shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-pink-50/50 border border-pink-100 mb-4 p-3.5 text-xs font-semibold text-[#ED346C] rounded-xl flex items-center gap-2">
            <AiOutlineLoading className="animate-spin text-base shrink-0" />
            <span>Memvalidasi kredensial akun...</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="input-beauty w-full text-xs py-2.5 px-3.5 focus:ring-1 focus:ring-pink-200"
              placeholder="youridentity@beautybloom.com"
              value={dataForm.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
              Password
            </label>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input-beauty w-full text-xs py-2.5 pl-3.5 pr-10 focus:ring-1 focus:ring-pink-200"
                placeholder="••••••••"
                value={dataForm.password}
                onChange={handleChange}
                disabled={loading}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 text-gray-400 hover:text-[#ED346C] transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff size={16} />
                ) : (
                  <FiEye size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 w-full [&>button]:w-full [&>button]:py-3 [&>button]:rounded-xl [&>button]:text-xs [&>button]:font-semibold [&>button]:shadow-sm [&>button]:transition-all">
            <Button
              type="primary"
              disabled={loading}
            >
              Sign In to Account
            </Button>
          </div>

        </form>

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