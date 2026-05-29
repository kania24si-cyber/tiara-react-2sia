import memberships from "../data/memberships.json";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Memberships() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Memberships"
        breadcrumb={["Dashboard", "Memberships"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="btn-pink"
        >
          Add Membership
        </button>
      </PageHeader>

      {showForm && (
        <div className="filter-box">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl text-pink-600 font-poppins">
              Add Membership
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
              placeholder="Membership ID"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Customer ID"
              className="input-beauty"
            />

            <input
              type="date"
              className="input-beauty"
            />

            <input
              type="text"
              placeholder="Creator Code"
              className="input-beauty"
            />

            <select className="input-beauty">
              <option>Silver</option>
              <option>Gold</option>
            </select>

            <select className="input-beauty">
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </select>
          </div>

          <div className="mt-5">
            <button className="btn-pink w-full">
              Save Membership
            </button>
          </div>
        </div>
      )}

      <div className="card-beauty overflow-x-auto">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-poppins text-gray-800">
            Membership List
          </h2>

          <span className="badge-pink">
            {memberships.length} Memberships
          </span>
        </div>

        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-pink-50 text-gray-700">
            <tr>
              <th className="px-4 py-4 text-left">Membership ID</th>
              <th className="px-4 py-4 text-left">Customer ID</th>
              <th className="px-4 py-4 text-left">Tanggal Daftar</th>
              <th className="px-4 py-4 text-left">Status Member</th>
              <th className="px-4 py-4 text-left">Level</th>
              <th className="px-4 py-4 text-left">Creator Code</th>
              <th className="px-4 py-4 text-left">Status Aktif</th>
            </tr>
          </thead>

          <tbody>
            {memberships.map((item, index) => (
              <tr
                key={item.membership_id}
                className={`border-t border-gray-100 hover:bg-pink-50 transition ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/40"
                }`}
              >
                <td className="px-4 py-4 font-semibold text-pink-600">
                  {item.membership_id}
                </td>

                <td className="px-4 py-4">
                  <Link
                    to={`/memberships/${item.membership_id}`}
                    className="text-pink-500 hover:text-pink-700 font-medium"
                  >
                    {item.customer_id}
                  </Link>
                </td>

                <td className="px-4 py-4">
                  {item.tanggal_daftar}
                </td>

                <td className="px-4 py-4">
                  {item.status_member}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={
                      item.level_membership === "Gold"
                        ? "badge-pink"
                        : "badge-green"
                    }
                  >
                    {item.level_membership}
                  </span>
                </td>

                <td className="px-4 py-4">
                  {item.creator_code}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={
                      item.status_aktif === "Aktif"
                        ? "badge-green"
                        : "bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs"
                    }
                  >
                    {item.status_aktif}
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