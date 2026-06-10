import React from 'react';
import { Link } from "react-router-dom";

const NavbarProfileDropdown = ({ user, logout, placeholder }) => {
  return (
    <div className="dropdown dropdown-end">
      {/* Profile Trigger */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user?.ProfileImage || placeholder} alt="Profile" />
        </div>
      </div>
      
      {/* Dropdown Menu */}
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-xl bg-base-100 rounded-box w-72 border border-gray-200">
        <li className="mb-2">
          <Link to={`/profile/${user?.UserName}`} className="flex items-center gap-3 hover:bg-transparent">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user?.ProfileImage || placeholder} className="object-cover w-full h-full" alt="Profile" />
            </div>
            <span className="font-bold text-base truncate">{user?.FullName || user?.UserName}</span>
          </Link>
        </li>
        
        <div className="divider my-1"></div>

        <li><a className="py-3 text-sm font-medium">Settings & privacy</a></li>
        <li><a className="py-3 text-sm font-medium">Help & support</a></li>
        <li><a className="py-3 text-sm font-medium">Report a problem</a></li>
        <li><a className="py-3 text-sm font-medium">Display & accessibility</a></li>
        
        <li className="mt-2">
          <button onClick={logout} className="py-3 text-sm font-medium text-red-600 hover:bg-red-50">
            Log out
          </button>
        </li>

        <div className="text-[10px] text-gray-500 mt-4 px-2">
          Privacy · Terms · Advertising · Cookies · More
        </div>
      </ul>
    </div>
  );
};

export default NavbarProfileDropdown;