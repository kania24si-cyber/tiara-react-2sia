import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

export default function MemberHeader({ user }) {
  const navigate = useNavigate();
  const displayName = user?.username || "Bloom Member";
  const avatarUrl = useMemo(() => {
    if (user?.avatar_url?.startsWith("http")) return user.avatar_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=FCE7F3&color=ED346C&bold=true`;
  }, [displayName, user?.avatar_url]);

  return (
    <header className="sticky top-16 z-40 border-b border-pink-100/70 bg-white/90 px-5 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
            Welcome back
          </p>
          <h2 className="mt-0.5 text-sm font-extrabold text-slate-900">
            {displayName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/member/wishlist")}
            className="hidden items-center gap-1.5 rounded-full border border-pink-100 bg-pink-50 px-3 py-2 text-xs font-bold text-[var(--color-pink-utama)] transition hover:bg-pink-100 sm:flex"
          >
            <Heart size={14} />
            Wishlist
          </button>
          <button
            type="button"
            onClick={() => navigate("/member/orders")}
            className="hidden items-center gap-1.5 rounded-full bg-[var(--color-pink-utama)] px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700 sm:flex"
          >
            <ShoppingBag size={14} />
            My Bag
          </button>
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-8 w-8 rounded-full border border-pink-100 bg-pink-50 object-cover"
          />
        </div>
      </div>
    </header>
  );
}