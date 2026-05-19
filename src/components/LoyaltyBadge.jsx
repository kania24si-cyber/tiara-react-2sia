export default function LoyaltyBadge({
  type
}) {

  const types = {
    gold: "bg-pink-600 text-white",
    silver: "bg-green-500 text-white",
    bronze: "bg-gray-300 text-gray-700",
  };

  return (
    <span className={`${types[type]} px-4 py-1 rounded-full`}>
      {type}
    </span>
  );
}