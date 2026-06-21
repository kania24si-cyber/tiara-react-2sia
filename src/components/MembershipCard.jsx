import React from "react";

export default function MembershipCard({ username, level, points, joinDate }) {
  return (
    <div className="bg-gradient-to-br from-purple-950 via-[#ED346C] to-pink-500 rounded-3xl p-6 text-white shadow-md border border-white/10">
      <div className="flex justify-between items-start border-b border-white/20 pb-4">
        <div>
          <span className="text-[9px] font-black tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase">
            BEAUTYBLOOM MEMBER
          </span>
          <h2 className="text-xl font-bold font-[var(--font-poppins)] mt-3">
            {username || "Tiara Kania"}
          </h2>
        </div>
        <span className="text-2xl">💎</span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-pink-200 font-medium text-[10px] uppercase tracking-wider">Level</p>
          <p className="font-bold text-amber-300 mt-0.5">{level}</p>
        </div>
        <div>
          <p className="text-pink-200 font-medium text-[10px] uppercase tracking-wider">Points</p>
          <p className="font-bold mt-0.5">{points.toLocaleString("id-ID")} Points</p>
        </div>
        <div>
          <p className="text-pink-200 font-medium text-[10px] uppercase tracking-wider">Member Since</p>
          <p className="font-semibold mt-0.5">{joinDate}</p>
        </div>
      </div>
    </div>
  );
}