export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-zinc-800 rounded-2xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-center min-h-[160px]">
      <span className="bg-pink-500 text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full w-fit">
        Sistem Kampanye Utama
      </span>
      <h2 className="text-xl sm:text-2xl font-black mt-3 tracking-tight">
        Koleksi Skincare Organik Pro
      </h2>
      <p className="text-[11px] mt-1 text-gray-400 max-w-md leading-relaxed">
        Formulasi klinis laboratorium bersertifikasi internasional terintegrasi
        penuh ke modul promosi digital.
      </p>
    </div>
  );
}
