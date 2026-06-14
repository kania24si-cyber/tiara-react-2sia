import { BsDatabaseExclamation } from "react-icons/bs";

export default function EmptyState({
  text = "Belum ada data",
}) {
  return (
    <div className="bg-white rounded-xl shadow p-10 text-center">

      <div className="text-5xl text-pink-400 flex justify-center mb-3">
        <BsDatabaseExclamation />
      </div>

      <p className="text-gray-500">
        {text}
      </p>

    </div>
  );
}