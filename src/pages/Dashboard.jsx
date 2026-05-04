import { useState } from "react";
import data from "../data/services.json";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

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
    <div className="space-y-6">

      {/* FILTER */}
      <div className="filter-box space-y-5">

        <div className="flex justify-between items-center">
          <h2 className="font-poppins text-2xl text-gray-800">
            Product Filter
          </h2>

          <span className="badge-pink">
            {filtered.length} Items
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search makeup..."
            className="input-beauty"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="input-beauty"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Category</option>
            <option>Lipstick</option>
            <option>Foundation</option>
            <option>Blush</option>
            <option>Eyeshadow</option>
            <option>Mascara</option>
          </select>

          {/* PRICE FILTER */}
          <select
            className="input-beauty"
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="card-beauty">

            <div className="relative">
              <img
                src={item.image}
                className="h-48 w-full object-cover"
              />

              <span className="badge-pink absolute top-3 left-3">
                {item.category}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400">
                {item.brand} • {item.shade}
              </p>

              <p className="text-yellow-500 text-sm mt-2">
                ⭐ {item.rating}
              </p>

              <p className="text-pink-600 font-bold text-xl mt-3">
                Rp {item.price.toLocaleString()}
              </p>

              <button className="cart-btn">
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}