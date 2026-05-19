export default function Alert({
  children
}) {
  return (
    <div className="bg-pink-100 border border-pink-400 text-pink-700 px-5 py-4 rounded-2xl">
      {children}
    </div>
  );
}