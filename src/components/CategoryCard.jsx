export default function CategoryCard({
  image,
  title
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 text-center">

      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-cover rounded-full mx-auto"
      />

      <h2 className="text-xl font-bold mt-4">
        {title}
      </h2>

    </div>
  );
}