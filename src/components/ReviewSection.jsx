import ReviewCard from "./ReviewCard";

export default function ReviewSection() {

  const reviews = [
    {
      name: "Tiara",
      review: "Lipstick nya bagus banget!",
      rating: 5
    },
    {
      name: "Siti",
      review: "Foundation ringan dipakai.",
      rating: 4
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-5">

      {reviews.map((item, index) => (
        <ReviewCard
          key={index}
          name={item.name}
          review={item.review}
          rating={item.rating}
        />
      ))}

    </div>
  );
}