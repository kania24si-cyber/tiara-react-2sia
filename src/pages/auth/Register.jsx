export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="card-beauty w-full max-w-md p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-poppins text-pink-600 mb-6 text-center">
          Create Your Account ✨
        </h2>

        <form className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              className="input-beauty"
              placeholder="you@example.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>

            <input
              type="password"
              id="password"
              className="input-beauty"
              placeholder="********"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              className="input-beauty"
              placeholder="********"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-pink w-full"
          >
            Register
          </button>

        </form>

        {/* EXTRA */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <span className="text-pink-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}