export default function GenericTable({
  columns,
  data,
  renderRow,
}) {
  return (
    <div className="card-beauty overflow-x-auto">

      <table className="min-w-full w-full text-sm">

        <thead className="bg-pink-50 text-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-4 text-left font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50/40"
              }`}
            >
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}