import React, { useContext, useState } from "react";
import { assets } from "../assets/frontendAssets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    SetShowSearch,
    getCartCount,
    navigate,
    token,
    SetToken,
    SetCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    SetToken("");
    SetCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => SetShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {/* DROPDOWN MENU */}
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-2">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon (Visible only on small screens) */}
        <img
          src={assets.menu_icon}
          onClick={() => setOpen(!open)}
          alt=""
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-6 p-6 md:hidden z-50">
          {/* BACK SHOULD NOT BE NavLink */}
          <p onClick={() => setOpen(false)} className="cursor-pointer">
            BACK
          </p>

          <NavLink to="/" onClick={() => setOpen(false)}>
            HOME
          </NavLink>

          <NavLink to="/collection" onClick={() => setOpen(false)}>
            COLLECTION
          </NavLink>

          <NavLink to="/about" onClick={() => setOpen(false)}>
            ABOUT
          </NavLink>

          <NavLink to="/contact" onClick={() => setOpen(false)}>
            CONTACT
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
