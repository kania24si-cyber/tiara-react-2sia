import { useParams } from "react-router-dom";
import customers from "../data/customers.json";

export default function CustomersDetail() {
  const { id } = useParams();

  const customer = customers[Number(id) - 1];

  if (!customer) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Customer not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Customer Detail
        </h1>

        <div className="space-y-4 text-gray-700">

          <div>
            <span className="font-semibold">
              Customer ID:
            </span>
            <p>{customer.id}</p>
          </div>

          <div>
            <span className="font-semibold">
              Name:
            </span>
            <p>{customer.name}</p>
          </div>

          <div>
            <span className="font-semibold">
              Email:
            </span>
            <p>{customer.email}</p>
          </div>

          <div>
            <span className="font-semibold">
              Phone:
            </span>
            <p>{customer.phone}</p>
          </div>

          <div>
            <span className="font-semibold">
              Loyalty:
            </span>
            <p>{customer.loyalty}</p>
          </div>

        </div>
      </div>
    </div>
  );
}