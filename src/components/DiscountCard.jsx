export default function DiscountCard({
  title,
  discount
}) {
  return (
    <div className="bg-pink-500 text-white rounded-2xl p-6">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-5xl font-bold mt-4">
        {discount}
      </p>

    </div>
  );
}