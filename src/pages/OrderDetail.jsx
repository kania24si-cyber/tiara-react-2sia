import { useParams } from "react-router-dom";
import orders from "../data/orders.json";

export default function OrderDetail() {
  const { id } = useParams();

  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Order not found
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Order Detail
        </h1>

        <div className="space-y-4 text-gray-700">

          <div>
            <span className="font-semibold">
              Order ID:
            </span>
            <p>{order.id}</p>
          </div>

          <div>
            <span className="font-semibold">
              Customer:
            </span>
            <p>{order.customer}</p>
          </div>

          <div>
            <span className="font-semibold">
              Status:
            </span>

            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div>
            <span className="font-semibold">
              Total Payment:
            </span>

            <p>
              Rp {order.total.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <span className="font-semibold">
              Order Date:
            </span>

            <p>{order.date}</p>
          </div>

        </div>
      </div>
    </div>
  );
}