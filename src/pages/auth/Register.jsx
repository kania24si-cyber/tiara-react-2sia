import { useState } from "react";
import { usersAPI } from "../../services/usersAPI";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      return;
    }

    try {
      setError("");

      await usersAPI.createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registrasi berhasil! Silakan login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-beauty w-full max-w-md p-8">
        {/* TITLE */}
        <h2 className="text-3xl font-poppins text-pink-600 mb-6 text-center">
          Create Your Account ✨
        </h2>
        {error && <AlertBox type="error">{error}</AlertBox>}

        {success && <AlertBox type="success">{success}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-beauty"
              placeholder="Username"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-beauty"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-beauty"
              placeholder="********"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-beauty"
              placeholder="********"
              required
            />
          </div>

          {/* BUTTON */}
          <Button type="primary">Register</Button>
        </form>

        {/* EXTRA */}
        <div className="mt-6 border-t border-pink-100 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-[#ED346C] hover:text-[#FF7B7B] transition cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
