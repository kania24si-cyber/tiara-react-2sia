import data from "./services.json";

export default function ServiceCard() {
  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Daftar Layanan (Guest)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
          >

            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />

              <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow">
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <h3 className="font-semibold text-gray-800 text-sm">
                {item.name}
              </h3>

              <p className="text-indigo-600 font-bold">
                Rp {item.price.toLocaleString()}
              </p>

              <p className="text-yellow-500 text-sm">
                ⭐ {item.rating}
              </p>

              <p className="text-xs text-gray-500">
                Level: {item.details.level}
              </p>

              <button className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs py-2 rounded-lg transition">
                Detail
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}