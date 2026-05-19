export default function Badge({
  children
}) {
  return (
    <span className="bg-pink-600 text-white px-4 py-1 rounded-full text-sm">
      {children}
    </span>
  );
}