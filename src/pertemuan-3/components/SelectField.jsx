export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <div className="mt-1 bg-red-100 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}