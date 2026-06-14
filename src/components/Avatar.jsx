export default function Avatar({ name }) {
  return <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white uppercase shadow-sm">{name[0]}</div>;
}