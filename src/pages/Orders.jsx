import orders from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          Add Transaction
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="filter-box">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-poppins text-pink-600">
              Add Transaction
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
              placeholder="Transaction ID"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Customer ID"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Product Purchased"
              className="input-beauty"
            />

            <select className="input-beauty">
              <option>QRIS</option>
              <option>E-Wallet</option>
              <option>Transfer Bank</option>
              <option>COD</option>
              <option>Kartu Kredit</option>
            </select>

            <input
              type="number"
              placeholder="Total Transaction"
              className="input-beauty"
            />

            <input
              type="date"
              className="input-beauty"
            />

          </div>

          <div className="mt-5">
            <button className="btn-pink w-full">
              Save Transaction
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="card-beauty overflow-x-auto">

        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-poppins text-gray-800">
            Transaction List
          </h2>

          <span className="badge-pink">
            {orders.length} Transactions
          </span>
        </div>

        <table className="min-w-[1200px] w-full text-sm">

          <thead className="bg-pink-50 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">
                Transaction ID
              </th>

              <th className="text-left px-6 py-4">
                Customer ID
              </th>

              <th className="text-left px-6 py-4">
                Product Purchased
              </th>

              <th className="text-left px-6 py-4">
                Payment Method
              </th>

              <th className="text-left px-6 py-4">
                Total Transaction
              </th>

              <th className="text-left px-6 py-4">
                Transaction Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item.transaction_id}
                className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/40"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-pink-600">
                  {item.transaction_id}
                </td>

                <td className="px-6 py-4">
                  <Link
                    to={`/orders/${item.transaction_id}`}
                    className="text-pink-500 hover:text-pink-700 font-medium"
                  >
                    {item.customer_id}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  {item.produk_dibeli}
                </td>

                <td className="px-6 py-4">
                  {item.metode_pembayaran}
                </td>

                <td className="px-6 py-4 font-medium text-pink-600">
                  Rp {item.total_transaksi.toLocaleString("id-ID")}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {item.tanggal_transaksi}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}