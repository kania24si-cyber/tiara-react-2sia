export default function Button({
  children,
  type = "primary"
}) {

  const types = {
    primary:
      "bg-pink-500 hover:bg-pink-600 text-white",

    secondary:
      "bg-purple-500 hover:bg-purple-600 text-white",

    success:
      "bg-green-500 hover:bg-green-600 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    warning:
      "bg-yellow-400 hover:bg-yellow-500 text-white",
  };

  return (
    <button
      className={`
        ${types[type]}
        px-5
        py-3
        rounded-xl
        font-semibold
        shadow
        transition
        duration-300
      `}
    >
      {children}
    </button>
  );
}