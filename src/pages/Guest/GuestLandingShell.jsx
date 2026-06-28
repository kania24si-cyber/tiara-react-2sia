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
    <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-pink-border px-4 py-1 text-[11px] font-poppins font-extrabold uppercase tracking-widest text-[#e11d48]">
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
        benefit: ["Akses penuh ke katalog kecantikan & penawaran khusus", "Potongan harga spesial di bulan kelahiranmu", "Akses awal untuk membaca ulasan produk terbaru"],
        upgradeSyarat: "Melakukan transaksi minimal 1x seminggu atau akumulasi 3 pesanan dalam sebulan.",
        highlight: "Langkah Awal Menuju Pesona Sempurna",
      },
      {
        tier: "Gold",
        discountPct: 10,
        benefit: ["Diskon belanja lebih besar untuk semua produk", "Akses eksklusif ke *flash sale* produk terbatas", "Rekomendasi kurasi *shade* personal berbasis preferensi kulit"],
        upgradeSyarat: "Otomatis naik level setelah menyelesaikan 8 transaksi dalam waktu 2 bulan.",
        highlight: "Keistimewaan Maksimal untuk Loyalitas Terbaik",
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
        berlaku: "15 Juli 2026",
        deskripsi: "Nikmati potongan 10% khusus bagi pemilik keanggotaan Gold (otomatis terpotong saat checkout).",
        is_active: true,
      },
      {
        id: "PRM-0012",
        kode: "FLASH5",
        diskonPct: 5,
        berlaku: "01 Juli 2026",
        deskripsi: "Flash Sale Terbatas: Tambahan potongan 5% bagi seluruh tingkatan member resmi.",
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
        q: "Bagaimana cara bergabung menjadi member?",
        a: "Cukup klik tombol 'Join Club', isi profil kecantikan singkat Anda, dan Anda akan langsung terdaftar di level Silver untuk mulai mengumpulkan benefit.",
      },
      {
        q: "Bagaimana sistem penerapan diskon keanggotaan?",
        a: "Potongan harga eksklusif akan langsung menyesuaikan dengan level keanggotaan aktif Anda (Silver atau Gold) secara otomatis di dalam keranjang belanja Anda.",
      },
      {
        q: "Apakah reward dan poin keanggotaan saya memiliki masa berlaku?",
        a: "Setiap akumulasi *privilege reward* dirancang dengan masa aktif berkala demi kenyamanan Anda, detail masa tenggang tertera transparan pada dasbor akun Anda.",
      },
      {
        q: "Apakah voucher promosi dapat digabungkan dengan diskon level?",
        a: "Sebagian besar penawaran istimewa kami dapat diakumulasikan langsung dengan diskon level keanggotaan Anda untuk keuntungan maksimal, kecuali dinyatakan berbeda pada syarat kupon.",
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
    <div className="text-gray-900 bg-[#fafafa] font-barlow overflow-x-hidden selection:bg-rose-100 selection:text-pink-utama">
      
      {/* 1. Hero Area (Menerima ID internal #home di dalam komponennya) */}
      <div id="home">
        <GuestHeroAttention navigate={navigate} scrollToId={scrollToId} />
      </div>

      {/* 2. Keunggulan Fitur */}
      <GuestFeaturesInterest navigate={navigate} />

      {/* 3. Katalog Produk Terlaris (#products) */}
      <GuestProductsDesire products={products} navigate={navigate} />
      
      {/* 4. Sistem Tingkat Loyalty (#membership) */}
      <GuestMembershipDesire memberships={memberships} navigate={navigate} />
      
      {/* 5. Daftar Kupon Spesial (#promo) */}
      <GuestPromoDesire promos={promos} navigate={navigate} />
      
      {/* 6. Jurnal Ulasan Komunitas (#reviews) */}
      <GuestReviewsDesire reviews={reviews} />

      {/* 7. Pertanyaan Umum */}
      <GuestFAQ faqs={faqs} />

      {/* 8. Undangan Bergabung Akhir (CTA) */}
      <GuestActionCTA navigate={navigate} scrollToId={scrollToId} SoftPill={SoftPill} Container={Container} />

      {/* 9. Hubungi Layanan Concierge (#contact) */}
      <div id="contact">
        <GuestContact navigate={navigate} socials={socials} />
      </div>
    </div>
  );
}

const featuredProducts = [
  {
    id: "lipstick",
    name: "Velvet Lipstick",
    price: 75000,
    image: "/img/lipstick.jpg",
    desc: "Tekstur selembut sutra dengan pigmentasi intens yang tahan lama sepanjang hari.",
  },
  {
    id: "cushion",
    name: "Bloom Cushion",
    price: 125000,
    image: "/img/foundation.jpg",
    desc: "Menghasilkan *coverage* natural dengan sensasi ringan dan hasil akhir yang segar.",
  },
  {
    id: "foundation",
    name: "Soft Matte Foundation",
    price: 145000,
    image: "/img/foundation2.jpg",
    desc: "Alas bedak cair berkarakter halus, menyerap minyak berlebih, dan tidak mudah luntur.",
  },
  {
    id: "serum",
    name: "Glow Serum",
    price: 99000,
    image: "/img/data.jpg",
    desc: "Konsentrat aktif yang membantu mencerahkan, menghidrasi, dan mengembalikan kesehatan kulit.",
  },
  {
    id: "blush",
    name: "Blush in Bloom",
    price: 82000,
    image: "/img/blush.jpg",
    desc: "Perona pipi bergradasi natural untuk rona manis alami yang segar sepanjang hari.",
  },
];