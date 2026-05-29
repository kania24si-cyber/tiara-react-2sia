import { FiSearch } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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
  const headers = ["No", "Product", "Category", "Price", "Action"];

  const products = [
    {
      id: 1,
      name: "Lipstick Velvet",
      category: "Makeup",
      price: "Rp 299.000",
    },
    {
      id: 2,
      name: "Glow Serum",
      category: "Skincare",
      price: "Rp 450.000",
    },
    {
      id: 3,
      name: "Luxury Perfume",
      category: "Perfume",
      price: "Rp 799.000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* HERO + PROMO */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HeroSection />
          </div>

          <div className="space-y-6">
            <PromoBanner />

            <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-80">Monthly Beauty Rewards</p>

              <h2 className="text-4xl font-bold mt-2">1.250 Points</h2>

              <p className="mt-3">Redeem your points for exclusive products.</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard title="Products" value="150" icon="💄" />
          <StatsCard title="Orders" value="320" icon="🛍️" />
          <StatsCard title="Customers" value="1.2K" icon="👩" />
          <StatsCard title="Revenue" value="Rp 25M" icon="💰" />
        </div>

        {/* SEARCH + MEMBERSHIP */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Find products faster</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FiSearch
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search beauty products..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition"
                />
              </div>

              <SelectField
                options={["Makeup", "Skincare", "Perfume", "Beauty Tools"]}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 flex items-center justify-center">
            <div className="flex gap-4">
              <LoyaltyBadge type="gold" />
              <LoyaltyBadge type="silver" />
              <LoyaltyBadge type="bronze" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="basis-full">
                <div className="h-[250px] rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold">Flash Sale 50%</h2>

                    <p className="mt-3">
                      Special discount for all beauty products
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <div className="h-[250px] rounded-3xl bg-gradient-to-r from-rose-500 to-orange-400 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold">New Collection</h2>

                    <p className="mt-3">
                      Discover our latest skincare products
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <div className="h-[250px] rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold">Beauty Voucher</h2>

                    <p className="mt-3">Get exclusive vouchers for members</p>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="left-4 z-50" />
            <CarouselNext className="right-4 z-50" />
          </Carousel>
        </div>

        {/* CATEGORY + DISCOUNT */}
        <div className="grid lg:grid-cols-4 gap-5">
          <CategoryCard
            image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
            title="Makeup"
          />

          <CategoryCard
            image="https://images.unsplash.com/photo-1556228578-8c89e6adf883"
            title="Skincare"
          />

          <DiscountCard title="Flash Sale" discount="50%" />

          <DiscountCard title="Special Voucher" discount="30%" />
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="grid md:grid-cols-3 gap-5">
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
              price="Rp 800.000"
            />
          </div>
        </div>

        {/* COMMUNITY */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex justify-center gap-4 mb-6">
            <Avatar name="Tiara" />
            <Avatar name="Siti" />
            <Avatar name="Alya" />
          </div>

          <ReviewCard
            name="Tiara"
            review="Lipstick nya bagus banget dan tahan lama!"
            rating={5}
          />

          <div className="mt-6">
            <ReviewSection />
          </div>
        </div>

        {/* TABLE + FORM */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6 overflow-x-auto">
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-pink-50">
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">{product.name}</td>

                  <td className="px-6 py-4">
                    <Badge>{product.category}</Badge>
                  </td>

                  <td className="px-6 py-4">{product.price}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button type="primary">Edit</Button>

                      <Button type="danger">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="space-y-4">
              <InputField placeholder="Product Name" />

              <InputField placeholder="Product Price" />

              <SelectField
                options={["Makeup", "Skincare", "Perfume", "Beauty Tools"]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Button type="primary">Add</Button>
              <Button type="success">Save</Button>
              <Button type="secondary">Upload</Button>
              <Button type="warning">Promo</Button>
            </div>
          </div>
        </div>

        {/* FAQ + ALERT */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Apakah produk aman?</AccordionTrigger>

                <AccordionContent>
                  Semua produk BLOOM sudah BPOM.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Apakah tersedia voucher?</AccordionTrigger>

                <AccordionContent>
                  Voucher tersedia saat flash sale.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-4">
            <Alert>Product berhasil ditambahkan!</Alert>

            <Dialog>
              <DialogTrigger className="w-full bg-pink-500 text-white py-3 rounded-xl">
                View Promo
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>BLOOM Makeup Promo</DialogTitle>
                </DialogHeader>

                <p>Dapatkan diskon 50% untuk semua lipstick hari ini.</p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
