import React from "react";

export default function MemberStatsCard({ title, value, color, icon: Icon }) {
  return (
    <div className="flex items-center justify-between p-2 text-left w-full">
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase font-bold text-[var(--color-abu)] tracking-wider">
          {title}
        </p>
        <p className={`${color || "text-gray-800"} font-black tracking-tight font-[var(--font-poppins)]`}>
          {value}
        </p>
      </div>
      
      {Icon && (
        <div className="p-2.5 bg-pink-50/60 rounded-xl text-[var(--color-primary-2)] border border-[var(--color-pink-border)]/30">
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}