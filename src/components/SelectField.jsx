export default function SelectField({
  options = []
}) {
  return (
    <select className="w-full border border-pink-100 rounded-full px-5 py-4">

      {options.map((option, index) => (
        <option key={index}>
          {option}
        </option>
      ))}

    </select>
  );
}