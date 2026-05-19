export default function StatsCard({
  title,
  value,
  icon
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}