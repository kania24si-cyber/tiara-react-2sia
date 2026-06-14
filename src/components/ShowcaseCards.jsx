import ProductCard from "./ProductCard";

export default function ShowcaseCards() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">Pratinjau Antarmuka Aplikasi Client</h4>
      <div className="grid md:grid-cols-3 gap-6">
        <ProductCard image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300" title="Lipstick Velvet Cream" brand="BLOOM Lab" color="Pink Pastel" category="Makeup" price="Rp 299.000" />
        <ProductCard image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300" title="Glow Hydra Bright Serum" brand="BLOOM Bio" color="Gold Liquid" category="Skincare" price="Rp 450.000" />
        <ProductCard image="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300" title="Luxury Petal Eau De Perfume" brand="BLOOM Scent" color="Rose Clear" category="Perfume" price="Rp 800.000" />
      </div>
    </div>
  );
}