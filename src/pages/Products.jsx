import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data/products.json";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  // useEffect example
  const [message, setMessage] = useState("Hello, Beauty Admin 💄");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Welcome Back, Beauty Admin ✨");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const filtered = data.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? item.category === category
      : true;

    const matchPrice =
      price === "low"
        ? item.price < 100000
        : price === "mid"
        ? item.price >= 100000 && item.price <= 200000
        : price === "high"
        ? item.price > 200000
        : true;

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="min-h-screen bg-[#F4DDDD] p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="topbar">
          <div>
            <h2 className="text-xl font-semibold">
              {message}
            </h2>

            <p className="text-sm text-gray-500">
              Manage your products easily
            </p>
          </div>
        </div>

        {/* FILTER */}
        <div className="filter-box space-y-5">

          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-xl text-gray-800">
              Product Filter
            </h2>

            <span className="badge-pink">
              {filtered.length} Items
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-3">

            <input
              type="text"
              placeholder="Search makeup..."
              className="input-beauty rounded-md"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="input-beauty rounded-md"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Category</option>
              <option>Lipstick</option>
              <option>Foundation</option>
              <option>Blush</option>
              <option>Eyeshadow</option>
              <option>Mascara</option>
            </select>

            <select
              className="input-beauty rounded-md"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">All Price</option>
              <option value="low">Under 100K</option>
              <option value="mid">100K - 200K</option>
              <option value="high">Above 200K</option>
            </select>

          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-100 p-3 transition duration-200 hover:shadow-lg hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full object-cover rounded-md"
                />

                <span className="badge-pink absolute top-2 left-2 text-[10px] px-2 py-0.5">
                  {item.category}
                </span>

              </div>

              {/* CONTENT */}
              <div className="mt-3 space-y-1">

                <Link
                  to={`/products/${item.id}`}
                  className="text-pink-500 hover:text-pink-700 font-semibold text-sm line-clamp-1 block"
                >
                  {item.name}
                </Link>

                <p className="text-xs text-gray-400">
                  {item.brand} • {item.shade}
                </p>

                <p className="text-yellow-500 text-xs">
                  ⭐ {item.rating}
                </p>

                <p className="text-pink-600 font-semibold text-sm">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <button className="w-full mt-2 bg-[#FF7B7B] text-white text-xs py-2 rounded-md hover:bg-[#ED346C] transition">
                  Add to Cart
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}