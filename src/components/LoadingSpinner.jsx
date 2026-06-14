export default function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="bg-white rounded-xl p-10 shadow text-center">

      <div className="w-10 h-10 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto mb-3">
      </div>

      <p className="text-gray-500">
        {text}
      </p>

    </div>
  );
}