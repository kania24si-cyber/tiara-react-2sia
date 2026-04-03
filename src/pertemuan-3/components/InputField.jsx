export default function InputField({
  label,
  type,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block font-semibold mb-1">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {/* Error */}
      {error && (
        <div className="mt-1 bg-red-100 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}