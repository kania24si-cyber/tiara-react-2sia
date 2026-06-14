export default function Button({
  children,
  type = "primary",
  onClick,
  disabled = false,
}) {
  const types = {
    primary:
      "bg-gradient-to-r from-[#FF7B7B] to-[#ED346C] hover:opacity-90 text-white",

    secondary: "bg-purple-500 hover:bg-purple-600 text-white",

    success: "bg-green-500 hover:bg-green-600 text-white",

    danger: "bg-red-500 hover:bg-red-600 text-white",

    warning: "bg-yellow-400 hover:bg-yellow-500 text-white",

    info: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${types[type]}
        px-5 py-3 rounded-xl
        font-semibold shadow
        transition duration-300
        disabled:opacity-50
      `}
    >
      {children}
    </button>
  );
}
