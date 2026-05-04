import { FaBell } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div className="header-box">

      {/* WRAPPER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* LOGO */}
          <div>
            <h1 className="text-3xl text-pink-500 font-poppins leading-none">
              BeautyBloom
            </h1>

            <p className="text-xs text-gray-400 mt-1 tracking-wide">
              Admin Dashboard
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* NOTIF */}
          <div className="icon-box relative">
            <FaBell />

            <span className="badge-pink absolute -top-1 -right-1">
              5
            </span>
          </div>

          {/* CHART */}
          <div className="icon-box">
            <FcAreaChart />
          </div>

          {/* SETTINGS */}
          <div className="icon-box">
            <SlSettings />
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">

            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-700">
                Hello,
              </p>
              <p className="text-sm font-semibold text-pink-500">
                Tiara Kania
              </p>
            </div>

            <img
              src="img/james3.jpg"
              alt="profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-pink-200"
            />
          </div>

        </div>
      </div>
    </div>
  );
}