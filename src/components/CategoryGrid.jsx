import CategoryCard from "./CategoryCard";
import DiscountCard from "./DiscountCard";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <CategoryCard image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300" title="Makeup Line" />
      <CategoryCard image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300" title="Skincare Labs" />
      <DiscountCard title="Voucher Ramadhan" discount="50% OFF" />
      <DiscountCard title="Bundling Cuci Gudang" discount="30% CUT" />
    </div>
  );
}