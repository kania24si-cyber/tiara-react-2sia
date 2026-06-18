import React from "react";

export default function MemberStatsCard({ title, value, color, icon: Icon }) {
  return (
    <div className="flex items-center justify-between p-2 text-left w-full">
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
          {title}
        </p>
        <p className={`${color || "text-gray-800"} font-black tracking-tight`}>
          {value}
        </p>
      </div>
      
      {Icon && (
        <div className="p-2.5 bg-pink-50/60 rounded-xl text-[#ED346C] border border-pink-100/30">
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}