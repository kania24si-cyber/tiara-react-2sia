import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { useState } from "react";
import Button from "../../components/Button";
import { usersAPI } from "../../services/usersAPI";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

      const user = await usersAPI.loginUser(dataForm.email, dataForm.password);

      if (user.length === 0) {
        setError("Email atau Password salah!");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("admin", JSON.stringify(user[0]));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, []);

  const errorInfo = error ? (
    <div className="bg-red-100 mb-4 p-4 text-sm text-red-600 rounded-xl flex items-center">
      <MdOutlineError className="me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-100 mb-4 p-4 text-sm rounded-xl flex items-center">
      <AiOutlineLoading className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-beauty w-full max-w-md p-8 rounded-xl">
        {/* TITLE */}
        <h2 className="text-3xl font-poppins text-[#ED346C] mb-2 text-center">
          Hi, Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          Sign in to continue
        </p>

        {errorInfo}
        {loadingInfo}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-black-600 mb-1 block text-left">
              Email
            </label>

            <input
              type="text"
              name="email"
              id="email"
              className="input-beauty"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-black-600 mb-1 block text-left">
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              className="input-beauty"
              placeholder="********"
              onChange={handleChange}
            />
          </div>
          <Button type="primary">Login</Button>
        </form>

        {/* EXTRA */}
        <div className="mt-6 border-t border-pink-100 pt-5 text-center space-y-3">
          <p className="text-sm text-gray-500">
            Forgot your password?
            <Link
              to="/forgot"
              className="ml-1 font-semibold text-[#ED346C] hover:text-[#FF7B7B] transition"
            >
              Reset here
            </Link>
          </p>

          <p className="text-sm text-gray-500">
            Belum punya akun?
            <Link
              to="/register"
              className="ml-1 font-semibold text-[#ED346C] hover:text-[#FF7B7B] transition"
            >
              Register sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
