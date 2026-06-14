export default function SelectField({
  options = [],
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-pink-100 rounded-full px-5 py-4"
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}