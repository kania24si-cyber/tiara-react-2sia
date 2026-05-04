import customers from "../data/customers.json";
import PageHeader from "../components/PageHeader";
import { useState } from "react";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="btn-pink"
        >
          Add Customer
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="filter-box">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl text-pink-600 font-poppins">
              Add Customer
            </h2>

            <button
              onClick={() => setShowForm(false)}
              className="btn-outline"
            >
              Close
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Customer ID"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Customer Name"
              className="input-beauty"
            />

            <input
              type="email"
              placeholder="Email"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Phone"
              className="input-beauty"
            />

            <select className="input-beauty md:col-span-2">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>

          </div>

          <div className="mt-5">
            <button className="btn-pink w-full">
              Save Customer
            </button>
          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="card-beauty overflow-x-auto">

        {/* TOP */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-poppins text-gray-800">
            Customer List
          </h2>

          <span className="badge-pink">
            {customers.length} Customers
          </span>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-pink-50 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">Customer ID</th>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Phone</th>
              <th className="text-left px-6 py-4">Loyalty</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((item, index) => (
              <tr
                key={item.id}
                className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="px-6 py-4 font-medium">{item.id}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                      {item.name.charAt(0)}
                    </div>

                    <span>{item.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {item.email}
                </td>

                <td className="px-6 py-4">
                  {item.phone}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={
                      item.loyalty === "Gold"
                        ? "badge-pink"
                        : item.loyalty === "Silver"
                        ? "badge-green"
                        : "bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                    }
                  >
                    {item.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}