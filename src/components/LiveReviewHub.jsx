import Avatar from "./Avatar";
import ReviewCard from "./ReviewCard";
import ReviewSection from "./ReviewSection";

export default function LiveReviewHub() {
  return (
    <section className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Log Komentar & Ulasan Masuk</h3>
          <p className="text-xs text-gray-400 mt-0.5">Umpan balik asli dari aplikasi mobile customer.</p>
        </div>
        <div className="flex -space-x-2">
          <Avatar name="Tiara" />
          <Avatar name="Siti" />
          <Avatar name="Alya" />
        </div>
      </div>
      <ReviewCard name="Kurnia Mega" review="Paket serum dikirim cepat, baru coba 3 hari kulit terasa jauh lebih elastis dan cerah ceria! ✨" rating={5} />
      <div className="pt-2 border-t border-gray-50">
        <ReviewSection />
      </div>
    </section>
  );
}