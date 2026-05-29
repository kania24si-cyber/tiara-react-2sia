import customers from "../data/customers.json";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
        <button onClick={() => setShowForm(true)} className="btn-pink">
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

            <button onClick={() => setShowForm(false)} className="btn-outline">
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
              placeholder="Nama Lengkap"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Username"
              className="input-beauty"
            />

            <select className="input-beauty">
              <option>L</option>
              <option>P</option>
            </select>

            <input type="date" className="input-beauty" />

            <input
              type="text"
              placeholder="Nomor HP"
              className="input-beauty"
            />

            <input type="email" placeholder="Email" className="input-beauty" />

            <input type="text" placeholder="Alamat" className="input-beauty" />

            <input
              type="text"
              placeholder="Kota / Provinsi"
              className="input-beauty md:col-span-2"
            />
          </div>

          <div className="mt-5">
            <button className="btn-pink w-full">Save Customer</button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="card-beauty overflow-x-auto rounded-xl">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-poppins text-gray-800">Customer List</h2>

          <span className="badge-pink">{customers.length} Customers</span>
        </div>

        <table className="min-w-[1100px] w-full text-xs">
          <thead className="bg-pink-50 text-gray-700 text-xs">
            <tr>
              <th className="px-3 py-3 text-left">ID</th>
              <th className="px-3 py-3 text-left">Customer</th>
              <th className="px-3 py-3 text-left">Username</th>
              <th className="px-3 py-3 text-left">Gender</th>
              <th className="px-3 py-3 text-left">Birth Date</th>
              <th className="px-3 py-3 text-left">Phone</th>
              <th className="px-3 py-3 text-left">Email</th>
              <th className="px-3 py-3 text-left">Address</th>
              <th className="px-3 py-3 text-left">City</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((item, index) => (
              <tr
                key={item.customer_id}
                className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="px-3 py-2 font-semibold text-pink-600">
                  {item.customer_id}
                </td>

                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                      {item.nama_lengkap.charAt(0)}
                    </div>

                    <Link
                      to={`/customers/${item.customer_id}`}
                      className="font-medium text-sm text-gray-800 hover:text-pink-600"
                    >
                      {item.nama_lengkap}
                    </Link>
                  </div>
                </td>

                <td className="px-3 py-2 text-gray-600">{item.username}</td>

                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      item.jenis_kelamin === "L"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {item.jenis_kelamin}
                  </span>
                </td>

                <td className="px-3 py-2">{item.tanggal_lahir}</td>

                <td className="px-3 py-2">{item.nomor_hp}</td>

                <td className="px-3 py-2 text-gray-500">{item.email}</td>

                <td className="px-3 py-2 max-w-[180px] truncate">
                  {item.alamat}
                </td>

                <td className="px-3 py-2">{item.kota_provinsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
