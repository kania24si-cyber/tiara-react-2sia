import React from "react";

export default function MemberHeader({ user }) {
  const isValidUrl = user?.avatar_url && user.avatar_url.startsWith("http");
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || "M")}&background=FCE7F3&color=ED346C&bold=true`;

  return (
    <header className="bg-white border-b border-pink-100/40 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
        <span>Sesi Akses:</span>
        <span className="bg-pink-50 text-[#ED346C] font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide border border-pink-100">
          ✨ {user?.role || "Member"}
        </span>
      </div>

      <div className="flex items-center gap-3 text-right">
        <div>
          <p className="font-bold text-slate-800 text-xs">{user?.username || "Glow Member"}</p>
          <p className="text-[10px] text-gray-400 font-medium">{user?.email}</p>
        </div>
        <img 
          src={isValidUrl ? user.avatar_url : fallbackAvatar} 
          alt="Avatar" 
          className="w-9 h-9 rounded-full object-cover border border-pink-100 bg-slate-50 shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackAvatar;
          }}
        />
      </div>
    </header>
  );
}