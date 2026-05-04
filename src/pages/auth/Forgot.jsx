export default function Forgot() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="card-beauty w-full max-w-md p-8 text-center">

        {/* TITLE */}
        <h2 className="text-3xl font-poppins text-pink-600 mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Enter your email and we’ll send you a reset link ✨
        </p>

        {/* FORM */}
        <form className="space-y-5 text-left">

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
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
            className="btn-pink w-full"
          >
            Send Reset Link
          </button>

        </form>

        {/* BACK */}
        <p className="text-sm text-gray-400 mt-6">
          Remember your password?{" "}
          <span className="text-pink-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}