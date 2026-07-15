export default function StatsCard({ title, value, trend, icon, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Dekorasi glow di sudut kanan bawah */}
      {color && (
        <div
          className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${color} opacity-10 blur-xl pointer-events-none group-hover:opacity-20 transition-opacity`}
        />
      )}

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
            {title}
          </p>
          <h3 className="text-lg sm:text-xl font-black text-gray-800 tracking-tight font-mono leading-tight">
            {value}
          </h3>
        </div>

        {/* Ikon dengan warna gradien */}
        {icon && (
          <div
            className={`flex-shrink-0 ml-3 w-10 h-10 rounded-xl bg-gradient-to-br ${color || "from-gray-400 to-gray-500"} flex items-center justify-center text-white shadow-md text-base`}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md relative z-10">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
          {trend}
        </div>
      )}
    </div>
  );
}
