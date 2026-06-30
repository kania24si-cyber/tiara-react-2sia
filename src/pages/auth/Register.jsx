import { useState } from "react";
import { usersAPI } from "../../services/usersAPI";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
// Import Icons for password toggle
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for button
  const navigate = useNavigate();

  // States to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Confirm Password tidak sama!");
      // Shake animation or scroll to error could be added here
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await usersAPI.createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registrasi berhasil! Menghubungkan ke halaman login...");

      // Clean form
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Assuming api throws error message directly or inside response.data.message
      const errorMsg = err.response?.data?.message || err.message || "Gagal melakukan registrasi.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFFBFB]">
      <div className="card-beauty w-full max-w-md p-8 shadow-lg bg-white border border-pink-100 rounded-3xl animate-fade-in">
        
        {/* LOGO AREA (Image Logo) */}
        <div className="flex justify-center mb-4">
          <img src="/img/bb.png" alt="BeautyBloom Logo" className="w-16 h-16 object-contain rounded-2xl shadow-sm border border-pink-50 p-1" />
        </div>

        {/* TITLE */}
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-poppins text-[#ED346C] tracking-tight">
                Join Us!
            </h2>
            <p className="text-xs font-medium text-gray-400 mt-1">
                Create your BeautyBloom Admin Account
            </p>
        </div>

        {error && <div className="mb-4 animate-shake"><AlertBox type="error">{error}</AlertBox></div>}
        {success && <div className="mb-4"><AlertBox type="success">{success}</AlertBox></div>}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* USERNAME */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-beauty w-full text-xs px-4 py-2.5 focus:ring-1 focus:ring-pink-200"
              placeholder="Example: Admin"
              required
              disabled={loading}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-beauty w-full text-xs px-4 py-2.5 focus:ring-1 focus:ring-pink-200"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          {/* PASSWORD WITH TOGGLE */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Password</label>
            <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-beauty w-full text-xs py-2.5 pl-4 pr-10 focus:ring-1 focus:ring-pink-200"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button
                    type="button"
                    tabIndex="-1"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-[#ED346C] focus:outline-none"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD WITH TOGGLE */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
              Confirm Password
            </label>
            <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-beauty w-full text-xs py-2.5 pl-4 pr-10 focus:ring-1 focus:ring-pink-200"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                    type="button"
                    tabIndex="-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-gray-400 hover:text-[#ED346C] focus:outline-none"
                >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
          </div>

          {/* BUTTON CONTAINER - Widened via CSS nesting */}
          <div className="pt-3 [&>button]:w-full [&>button]:py-3 [&>button]:rounded-xl [&>button]:text-xs [&>button]:font-semibold [&>button]:shadow-sm">
            <Button type="primary" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </Button>
          </div>
        </form>

        {/* EXTRA */}
        <div className="mt-8 border-t border-pink-100 pt-6 text-center">
          <p className="text-xs font-medium text-gray-400">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1.5 font-bold text-[#ED346C] hover:text-[#d62659] transition cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}