import { useEffect, useState } from "react";

export default function LiveChartSimulated({ currentRevenue }) {
  const [bars, setBars] = useState([30, 45, 60, 25, 70, 45, 90, 65, 40, 85, 55, 75]);

  useEffect(() => {
    // Alur grafik berubah dinamis mengikuti detak interval trigger API
    const chartTick = setInterval(() => {
      setBars(prev => [...prev.slice(1), Math.floor(Math.random() * 65) + 30]);
    }, 4000);
    return () => clearInterval(chartTick);
  }, []);

  return (
    <div className="space-y-4">
      <div className="h-36 flex items-end justify-between gap-1.5 pt-4 border-b border-gray-50 px-1">
        {bars.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group relative">
            <div 
              style={{ height: `${height}%` }} 
              className={`w-full rounded-t-md transition-all duration-700 ${
                i === bars.length - 1 
                  ? "bg-gradient-to-t from-pink-600 to-rose-400 animate-pulse" 
                  : "bg-gradient-to-t from-pink-100 to-pink-200 group-hover:from-pink-400 group-hover:to-rose-400"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
        <span>Timeline Operasional Network Pool</span>
        <span className="font-bold text-pink-600">ACC ACCUMULATED: Rp {(currentRevenue/1000000).toFixed(2)} JT</span>
      </div>
    </div>
  );
}