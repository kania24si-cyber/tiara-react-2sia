import { useParams } from "react-router-dom";
import memberships from "../data/memberships.json";

export default function MembershipsDetail() {
  const { id } = useParams();

  const membership = memberships.find(
    (item) => item.membership_id === id
  );

  if (!membership) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Membership not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Membership Detail
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold text-gray-700">
              Membership ID
            </h3>
            <p>{membership.membership_id}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Customer ID
            </h3>
            <p>{membership.customer_id}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Tanggal Daftar
            </h3>
            <p>{membership.tanggal_daftar}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Status Member
            </h3>
            <p>{membership.status_member}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Level Membership
            </h3>

            <span
              className={
                membership.level_membership === "Gold"
                  ? "badge-pink"
                  : "badge-green"
              }
            >
              {membership.level_membership}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Creator Code
            </h3>
            <p>{membership.creator_code}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700">
              Status Aktif
            </h3>

            <span
              className={
                membership.status_aktif === "Aktif"
                  ? "badge-green"
                  : "bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs"
              }
            >
              {membership.status_aktif}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}