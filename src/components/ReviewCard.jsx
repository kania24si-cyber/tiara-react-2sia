import Avatar from "./Avatar";
import Button from "./Button";

export default function ReviewCard({
  name,
  review,
  rating
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">

      <div className="flex items-center gap-3">

        <Avatar name={name} />

        <div>

          <h3 className="font-bold">
            {name}
          </h3>

          <p className="text-yellow-500">
            {"⭐".repeat(rating)}
          </p>

        </div>

      </div>

      <p className="text-gray-500 mt-4">
        {review}
      </p>

      <div className="mt-4">
        <Button type="danger">
          Hide Comment
        </Button>
      </div>

    </div>
  );
}