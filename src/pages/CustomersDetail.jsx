import { useParams } from "react-router-dom";
import customers from "../data/customers.json";

export default function CustomersDetail() {
  const { id } = useParams();

  const customer = customers.find(
    (item) => item.customer_id === id
  );

  if (!customer) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Customer not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Customer Detail
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold text-gray-700">Customer ID</h3>
            <p>{customer.customer_id}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Nama Lengkap</h3>
            <p>{customer.nama_lengkap}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Username</h3>
            <p>{customer.username}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Jenis Kelamin</h3>
            <p>{customer.jenis_kelamin}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Tanggal Lahir</h3>
            <p>{customer.tanggal_lahir}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Nomor HP</h3>
            <p>{customer.nomor_hp}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p>{customer.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Alamat</h3>
            <p>{customer.alamat}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700">
              Kota / Provinsi
            </h3>
            <p>{customer.kota_provinsi}</p>
          </div>

        </div>
      </div>
    </div>
  );
}