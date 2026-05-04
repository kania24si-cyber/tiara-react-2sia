import { Link } from "react-router-dom";

export default function ErrorPage({
  code,
  description,
  image,
}) {
  return (
    <div className="min-h-screen bg-[#e9d89c] flex flex-col items-center justify-center relative overflow-hidden">

  
      <h1 className="absolute text-[250px] font-bold text-white/20 select-none">
        {code}
      </h1>

      <p className="z-10 text-2xl font-semibold mb-6">
        {description}
      </p>

  
      <img
        src={image}
        className="w-40 z-10 mb-6"
      />

      <Link
        to="/"
        className="z-10 border-2 border-black px-6 py-2 rounded-full bg-white"
      >
        ↩ Go Home
      </Link>
    </div>
  );
}