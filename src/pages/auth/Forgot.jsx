import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-beauty w-full max-w-md p-8 rounded-xl">
        {/* TITLE */}
        <h2 className="text-3xl font-poppins text-center text-[#ED346C] mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          Masukkan email yang terdaftar dan kami akan mengirimkan link untuk
          mengatur ulang password Anda.
        </p>

        {/* FORM */}
        <form className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="input-beauty"
            />
          </div>

          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-xl
            text-white
            font-semibold
            shadow-md
            transition
            hover:opacity-90
            bg-gradient-to-r
            from-[#FF7B7B]
            to-[#ED346C]
          "
          >
            Send Reset Link
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 border-t border-pink-100 pt-5 text-center">
          <p className="text-sm text-gray-500">Remember your password?</p>

          <Link
            to="/login"
            className="
            inline-block mt-2
            text-[#ED346C]
            font-semibold
            hover:text-[#FF7B7B]
            transition
          "
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
