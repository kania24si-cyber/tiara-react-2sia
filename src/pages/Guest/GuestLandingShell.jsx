import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GuestHeroAttention from "../../components/guest_component/GuestHeroAttention";
import GuestFeaturesInterest from "../../components/guest_component/GuestFeaturesInterest";
import GuestProductsDesire from "../../components/guest_component/GuestProductsDesire";
import GuestMembershipDesire from "../../components/guest_component/GuestMembershipDesire";
import GuestPromoDesire from "../../components/guest_component/GuestPromoDesire";
import GuestReviewsDesire from "../../components/guest_component/GuestReviewsDesire";
import GuestFAQ from "../../components/guest_component/GuestFAQ";
import GuestActionCTA from "../../components/guest_component/GuestActionCTA";
import GuestContact from "../../components/guest_component/GuestContact";

function Container({ children }) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

function SoftPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-200/60 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#ED346C]">
      {children}
    </span>
  );
}

export default function GuestLandingShell() {
  const navigate = useNavigate();

  const products = useMemo(
    () =>
      featuredProducts.map((p) => ({
        ...p,
        rating: ({ lipstick: 5, cushion: 4.7, foundation: 4.8, serum: 4.6, blush: 4.5 }[p.id] ?? 4.5),
      })),
    [],
  );

  const memberships = useMemo(
    () => [
      {
        tier: "Silver",
        discountPct: 5,
        benefit: ["Akses katalog & promo member", "Diskon tambahan di hari spesial", "Prioritas info review produk"],
        upgradeSyarat: "Belanja minimal 1x/minggu atau total 3 transaksi/bulan",
        highlight: "Untuk mulai loyal & hemat",
      },
      {
        tier: "Gold",
        discountPct: 10,
        benefit: ["Diskon lebih besar", "Akses promo flash lebih cepat", "Rekomendasi produk berbasis preferensi"],
        upgradeSyarat: "Naik level setelah memenuhi 8 transaksi dalam 2 months",
        highlight: "Untuk member paling aktif",
      },
    ],
    [],
  );

  const promos = useMemo(
    () => [
      {
        id: "PRM-0007",
        kode: "BLOOM10",
        diskonPct: 10,
        berlaku: "2026-07-15",
        deskripsi: "Diskon 10% untuk member Gold (auto berlaku).",
        is_active: true,
      },
      {
        id: "PRM-0012",
        kode: "FLASH5",
        diskonPct: 5,
        berlaku: "2026-07-01",
        deskripsi: "Flash Sale: diskon 5% untuk semua member (terbatas).",
        is_active: true,
      },
    ],
    [],
  );

  const reviews = useMemo(
    () => [
      {
        id: "REV-0001",
        name: "Tiara",
        rating: 5,
        comment: "Lipstick-nya enak banget dipakai—warna keluar cantik dan tahan lama!",
        product: "Velvet Lipstick",
      },
      {
        id: "REV-0002",
        name: "Siti",
        rating: 4,
        comment: "Foundation-nya ringan, hasilnya natural. Cocok untuk daily makeup.",
        product: "Soft Matte Foundation",
      },
      {
        id: "REV-0003",
        name: "Rani",
        rating: 5,
        comment: "Promo membernya tepat sasaran. Jadi makin rajin reorder.",
        product: "Glow Serum",
      },
      {
        id: "REV-0004",
        name: "Dewi",
        rating: 4,
        comment: "Cushion-nya nyaman, coverage-nya pas.",
        product: "Bloom Cushion",
      },
    ],
    [],
  );

  const faqs = useMemo(
    () => [
      {
        q: "Bagaimana cara menjadi member?",
        a: "Klik tombol “Daftar Member Gratis Sekarang”, isi data, lalu kamu otomatis masuk ke tier Silver sebagai awal loyalty.",
      },
      {
        q: "Bagaimana cara mendapatkan diskon membership?",
        a: "Diskon mengikuti tier kamu (Silver/Gold). Saat syarat kenaikan level terpenuhi, benefit akan naik otomatis di V3.",
      },
      {
        q: "Apakah poin membership bisa hangus?",
        a: "Di roadmap awal, poin akan punya masa berlaku. Untuk V2, informasi ini masih konseptual (dummy) tanpa integrasi backend.",
      },
      {
        q: "Apakah promo dapat digabung dengan diskon membership?",
        a: "Konsepnya: sebagian promo bisa digabung dengan diskon tier, sebagian lain tidak. Pada V2 ini aturan masih dijelaskan secara umum (dummy).",
      },
    ],
    [],
  );

  const socials = useMemo(
    () => [
      { label: "Instagram", value: "@beautybloom.id" },
      { label: "WhatsApp", value: "+62 812-3456-7890" },
    ],
    [],
  );

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="text-slate-800 font-sans overflow-x-hidden">
      {/* Header dan Footer tidak perlu ditulis lagi disini karena 
        sudah dirender otomatis oleh GuestLayout melalui <Outlet /> 
      */}

      {/* Attention / Hero */}
      <GuestHeroAttention navigate={navigate} scrollToId={scrollToId} />

      {/* Interest */}
      <GuestFeaturesInterest navigate={navigate} />

      {/* Desire */}
      <GuestProductsDesire products={products} navigate={navigate} />
      <GuestMembershipDesire memberships={memberships} navigate={navigate} />
      <GuestPromoDesire promos={promos} navigate={navigate} />
      <GuestReviewsDesire reviews={reviews} />

      {/* FAQ */}
      <GuestFAQ faqs={faqs} />

      {/* Action */}
      <GuestActionCTA navigate={navigate} scrollToId={scrollToId} SoftPill={SoftPill} Container={Container} />

      {/* Contact */}
      <GuestContact navigate={navigate} socials={socials} />
    </div>
  );
}

const featuredProducts = [
  {
    id: "lipstick",
    name: "Velvet Lipstick",
    price: 75000,
    image: "/img/lipstick.jpg",
    desc: "Tekstur lembut, warna intens, tahan lama.",
  },
  {
    id: "cushion",
    name: "Bloom Cushion",
    price: 125000,
    image: "/img/foundation.jpg",
    desc: "Coverage natural dengan finishing fresh.",
  },
  {
    id: "foundation",
    name: "Soft Matte Foundation",
    price: 145000,
    image: "/img/foundation2.jpg",
    desc: "Tampilan halus, tidak mudah luntur.",
  },
  {
    id: "serum",
    name: "Glow Serum",
    price: 99000,
    image: "/img/data.jpg",
    desc: "Membantu kulit tampak lebih cerah & sehat.",
  },
  {
    id: "blush",
    name: "Blush in Bloom",
    price: 82000,
    image: "/img/blush.jpg",
    desc: "Pipi berwarna natural untuk look sehari-hari.",
  },
];