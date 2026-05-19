import Badge from "./Badge";
import Button from "./Button";

export default function ProductCard({
  image,
  title,
  brand,
  color,
  price,
  category
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-xl"
        />

        <div className="absolute top-3 left-3">
          <Badge>
            {category}
          </Badge>
        </div>

      </div>

      <h2 className="text-pink-500 text-xl font-bold mt-4">
        {title}
      </h2>

      <p className="text-gray-400">
        {brand} • {color}
      </p>

      <div className="flex items-center gap-2 mt-2 text-yellow-500">
        ⭐ 4.8
      </div>

      <h3 className="text-pink-600 font-bold text-2xl mt-3">
        {price}
      </h3>

      <div className="flex gap-2 mt-4">

        <Button type="primary">
          Edit
        </Button>

        <Button type="danger">
          Delete
        </Button>

      </div>

    </div>
  );
}