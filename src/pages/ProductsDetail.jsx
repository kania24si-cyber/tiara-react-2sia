import { useParams } from "react-router-dom";
import products from "../data/products.json";

export default function ProductsDetail() {
  const { id } = useParams();

  const product = products[Number(id) - 1];

  if (!product) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">

        <div className="bg-pink-100 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="p-8 flex flex-col justify-center">

          <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm w-fit mb-4">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {product.name}
          </h1>

          <div className="space-y-4 text-gray-700">

            <div>
              <span className="font-semibold">
                Product ID:
              </span>
              <p>{product.id}</p>
            </div>

            <div>
              <span className="font-semibold">
                Brand:
              </span>
              <p>{product.brand}</p>
            </div>

            <div>
              <span className="font-semibold">
                Shade:
              </span>
              <p>{product.shade}</p>
            </div>

            <div>
              <span className="font-semibold">
                Rating:
              </span>
              <p>⭐ {product.rating}</p>
            </div>

            <div>
              <span className="font-semibold">
                Stock:
              </span>
              <p>{product.stock}</p>
            </div>

            <div>
              <span className="font-semibold">
                Price:
              </span>
              <p className="text-2xl font-bold text-pink-600">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>

          </div>

          <button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition">
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}