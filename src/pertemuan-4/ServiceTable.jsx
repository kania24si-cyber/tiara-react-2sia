import data from "./services.json";

export default function ServiceTable() {
  return (
    <div className="p-6 overflow-x-auto">

      <h1 className="text-xl font-bold mb-4">Daftar Layanan (Admin)</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Level</th>
            <th>Instructor</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>Rp {item.price}</td>
              <td>{item.details.level}</td>
              <td>{item.instructor.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}