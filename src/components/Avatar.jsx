export default function Avatar({
  name
}) {

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xl shadow">

      {firstLetter}

    </div>
  );
}