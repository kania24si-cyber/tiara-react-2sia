import orders from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import { useState } from "react";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <PageHeader
        title="Orders"
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="btn-pink"
        >
          Add Orders
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="filter-box">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-poppins text-pink-600">
              Add Order
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
              placeholder="Order ID"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Customer Name"
              className="input-beauty"
            />

            <select className="input-beauty">
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              type="number"
              placeholder="Total Price"
              className="input-beauty"
            />

            <input
              type="date"
              className="input-beauty md:col-span-2"
            />

          </div>

          <div className="mt-5">
            <button className="btn-pink w-full">
              Save Order
            </button>
          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="card-beauty overflow-x-auto">

        {/* TOP */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-poppins text-gray-800">
            Order List
          </h2>

          <span className="badge-pink">
            {orders.length} Orders
          </span>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-pink-50 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">Order ID</th>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Total</th>
              <th className="text-left px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item.id}
                className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="px-6 py-4 font-medium">
                  {item.id}
                </td>

                <td className="px-6 py-4">
                  {item.customer}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={
                      item.status === "Completed"
                        ? "badge-green"
                        : item.status === "Pending"
                        ? "badge-pink"
                        : "bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium text-pink-600">
                  Rp {item.total}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}