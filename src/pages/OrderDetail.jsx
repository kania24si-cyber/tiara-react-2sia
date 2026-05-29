import { useParams } from "react-router-dom";
import orders from "../data/orders.json";

export default function OrderDetail() {
  const { id } = useParams();

  const order = orders.find(
    (item) => item.transaction_id === id
  );

  if (!order) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Transaction not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Transaction Detail
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <h3 className="font-semibold">
              Transaction ID
            </h3>
            <p>{order.transaction_id}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Customer ID
            </h3>
            <p>{order.customer_id}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold">
              Product Purchased
            </h3>
            <p>{order.produk_dibeli}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Payment Method
            </h3>
            <p>{order.metode_pembayaran}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Total Transaction
            </h3>
            <p className="text-pink-600 font-semibold">
              Rp {order.total_transaksi.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Transaction Date
            </h3>
            <p>{order.tanggal_transaksi}</p>
          </div>

        </div>

      </div>
    </div>
  );
}