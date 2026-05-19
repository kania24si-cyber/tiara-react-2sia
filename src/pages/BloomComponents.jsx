// src/pages/BloomComponents.jsx

import Button from "../components/Button";
import Badge from "../components/Badge";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import PromoBanner from "../components/PromoBanner";
import ReviewCard from "../components/ReviewCard";
import ReviewSection from "../components/ReviewSection";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import LoyaltyBadge from "../components/LoyaltyBadge";
import StatsCard from "../components/StatsCard";
import CategoryCard from "../components/CategoryCard";
import DiscountCard from "../components/DiscountCard";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Alert from "../components/Alert";
import Avatar from "../components/Avatar";

export default function BloomComponents() {

  const headers = [
    "No",
    "Product",
    "Category",
    "Price",
    "Action"
  ];

  const products = [
    {
      id: 1,
      name: "Lipstick Velvet",
      category: "Makeup",
      price: "Rp 299.000"
    },
    {
      id: 2,
      name: "Glow Serum",
      category: "Skincare",
      price: "Rp 450.000"
    },
    {
      id: 3,
      name: "Luxury Perfume",
      category: "Perfume",
      price: "Rp 799.000"
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50 p-8">

      {/* HERO SECTION */}
      <HeroSection />

      {/* STATS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

        <StatsCard
          title="Products"
          value="150"
          icon="💄"
        />

        <StatsCard
          title="Orders"
          value="320"
          icon="🛍️"
        />

        <StatsCard
          title="Customers"
          value="1.2K"
          icon="👩"
        />

        <StatsCard
          title="Revenue"
          value="Rp 25M"
          icon="💰"
        />

      </div>

      {/* PROMO BANNER */}
      <div className="mt-8">
        <PromoBanner />
      </div>

      {/* SEARCH & FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

        <SearchBar
          placeholder="Search makeup..."
        />

        <SelectField
          options={[
            "Makeup",
            "Skincare",
            "Perfume",
            "Beauty Tools"
          ]}
        />

      </div>

      {/* CATEGORY CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">

        <CategoryCard
          image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          title="Makeup"
        />

        <CategoryCard
          image="https://images.unsplash.com/photo-1556228578-8c89e6adf883"
          title="Skincare"
        />

        <CategoryCard
          image="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
          title="Perfume"
        />

        <CategoryCard
          image="https://images.unsplash.com/photo-1526045478516-99145907023c"
          title="Beauty Tools"
        />

      </div>

      {/* PRODUCT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

        <ProductCard
          image="https://images.unsplash.com/photo-1586495777744-4413f21062fa"
          title="Lipstick Matte"
          brand="BLOOM"
          color="Pink"
          category="Makeup"
          price="Rp 299.000"
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
          title="Glow Serum"
          brand="BLOOM"
          color="Gold"
          category="Skincare"
          price="Rp 450.000"
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1596755389378-c31d21fd1273"
          title="Luxury Perfume"
          brand="BLOOM"
          color="Rose"
          category="Perfume"
          price="Rp 799.000"
        />

      </div>

      {/* DISCOUNT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

        <DiscountCard
          title="Flash Sale"
          discount="50%"
        />

        <DiscountCard
          title="Special Voucher"
          discount="30%"
        />

      </div>

      {/* PRODUCT MANAGEMENT TABLE */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Product Management
        </h2>

        <Table headers={headers}>

          {products.map((product, index) => (
            <tr
              key={product.id}
              className="border-b hover:bg-pink-50"
            >

              <td className="px-6 py-4">
                {index + 1}
              </td>

              <td className="px-6 py-4">
                {product.name}
              </td>

              <td className="px-6 py-4">

                <Badge>
                  {product.category}
                </Badge>

              </td>

              <td className="px-6 py-4">
                {product.price}
              </td>

              <td className="px-6 py-4">

                <div className="flex gap-3">

                  <Button type="primary">
                    Edit
                  </Button>

                  <Button type="danger">
                    Delete
                  </Button>

                </div>

              </td>

            </tr>
          ))}

        </Table>

      </div>

      {/* FORM COMPONENT */}
      <div className="bg-white rounded-2xl shadow p-8 mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Product Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <InputField
            placeholder="Product Name"
          />

          <InputField
            placeholder="Product Price"
          />

        </div>

        <div className="mt-5">

          <SelectField
            options={[
              "Makeup",
              "Skincare",
              "Perfume",
              "Beauty Tools"
            ]}
          />

        </div>

        {/* BUTTON COMPONENT */}
        <div className="flex flex-wrap gap-5 mt-8">

          <Button type="primary">
            Add Product
          </Button>

          <Button type="secondary">
            Upload Image
          </Button>

          <Button type="success">
            Save Product
          </Button>

          <Button type="danger">
            Delete Product
          </Button>

          <Button type="warning">
            Flash Sale
          </Button>

        </div>

      </div>

      {/* REVIEW CARD */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Review Card
        </h2>

        <ReviewCard
          name="Tiara"
          review="Lipstick nya bagus banget dan tahan lama!"
          rating={5}
        />

      </div>

      {/* REVIEW SECTION */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Review Section
        </h2>

        <ReviewSection />

      </div>

      {/* LOYALTY BADGE */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Loyalty Badge
        </h2>

        <div className="flex gap-5">

          <LoyaltyBadge type="gold" />

          <LoyaltyBadge type="silver" />

          <LoyaltyBadge type="bronze" />

        </div>

      </div>

      {/* ALERT */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Alert Component
        </h2>

        <Alert>
          Product berhasil ditambahkan!
        </Alert>

      </div>

      {/* AVATAR */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-5">
          Avatar Component
        </h2>

        <div className="flex gap-5">

          <Avatar name="Tiara" />

          <Avatar name="Siti" />

          <Avatar name="Alya" />

        </div>

      </div>

    </div>
  );
}