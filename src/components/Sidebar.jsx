import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdError,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = ({ isActive }) =>
    isActive ? "menu-beauty menu-active" : "menu-beauty";

  return (
    <div className="w-[280px] min-h-screen bg-white border-r border-gray-100 p-6 flex flex-col">

      {/* LOGO */}
      <h1 className="text-3xl font-poppins text-pink-500 mb-1">
        BeautyBloom
      </h1>

      <p className="text-gray-400 text-sm mb-10">
        Beauty Admin Dashboard
      </p>

      {/* MENU */}
      <div className="space-y-2">

        <NavLink to="/" className={menu}>
          <MdDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/orders" className={menu}>
          <MdShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/customers" className={menu}>
          <MdPeople />
          Customers
        </NavLink>

        <NavLink to="/400" className={menu}>
          <MdError />
          Error 400
        </NavLink>

        <NavLink to="/401" className={menu}>
          <MdError />
          Error 401
        </NavLink>

        <NavLink to="/403" className={menu}>
          <MdError />
          Error 403
        </NavLink>

        <NavLink to="/404" className={menu}>
          <MdError />
          Error 404
        </NavLink>
      </div>

      {/* CARD */}
      <div className="mt-auto card-beauty p-5">

        <h3 className="font-poppins text-pink-500 mb-2">
          New Collection
        </h3>

        <p className="text-sm text-gray-400">
          Discover premium makeup today.
        </p>

        <button className="btn-pink w-full mt-4">
          Shop Now
        </button>
      </div>
    </div>
  );
}