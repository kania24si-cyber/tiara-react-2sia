import { useState } from "react";
import data from "./services.json";

export default function ServiceSearchFilter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? item.category === category : true) &&
    (level ? item.details.level === level : true)
  );

  return (
    <div className="p-6">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari layanan..."
        className="border p-2 w-full mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        <select onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option value="">Kategori</option>
          <option>Programming</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>

        <select onChange={(e) => setLevel(e.target.value)} className="border p-2">
          <option value="">Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* HASIL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <h2>{item.name}</h2>
            <p>{item.category}</p>
          </div>
        ))}
      </div>

    </div>
  );
}