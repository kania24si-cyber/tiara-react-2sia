export default function SearchBar({
  placeholder
}) {
  return (
    <div className="relative">

      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-pink-100 rounded-full px-5 py-4"
      />

      <span className="absolute right-5 top-4">
        🔍
      </span>

    </div>
  );
}