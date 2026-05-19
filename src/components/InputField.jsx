export default function InputField({
  placeholder
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-pink-100 rounded-full px-5 py-4"
    />
  );
}