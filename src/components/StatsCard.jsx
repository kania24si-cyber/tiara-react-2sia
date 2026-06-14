export default function StatsCard({ title, value, trend, icon, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-lg sm:text-xl font-black text-gray-800 tracking-tight font-mono">
            {value}
          </h3>
        </div>
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-white text-base shadow-sm`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">
        <span className="w-1 h-1 rounded-full bg-emerald-500 anonymity animate-pulse"></span>
        {trend}
      </div>
    </div>
  );
}
