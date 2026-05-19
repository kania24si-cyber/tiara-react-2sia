export default function Table({
  headers,
  children
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow">

      <table className="w-full">

        <thead className="bg-pink-50">

          <tr>

            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left"
              >
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>
          {children}
        </tbody>

      </table>

    </div>
  );
}