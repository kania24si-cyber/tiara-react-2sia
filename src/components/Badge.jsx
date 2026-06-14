export default function Badge({ children, type = "pink" }) {
  const colors =
    type === "pink"
      ? "bg-pink-50 border-pink-100 text-pink-600"
      : "bg-purple-50 border-purple-100 text-purple-600";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${colors}`}
    >
      {children}
    </span>
  );
}
