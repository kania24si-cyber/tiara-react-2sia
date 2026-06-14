export default function SearchBar({
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-pink-100 rounded-full px-5 py-4"
      />
    </div>
  );
}