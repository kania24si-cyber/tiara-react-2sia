export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-300 rounded-2xl p-6 text-white h-full flex flex-col justify-between shadow-sm min-h-[160px]">
      <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded w-fit uppercase tracking-wider">
        Flash Sale Aktif
      </span>
      <div>
        <h3 className="text-2xl font-black tracking-tight">
          Diskon 50% Massal
        </h3>
        <p className="text-[10px] opacity-95 mt-1">
          Terbuka otomatis untuk seluruh pelanggan berstatus tier loyalitas
          premium.
        </p>
      </div>
    </div>
  );
}
