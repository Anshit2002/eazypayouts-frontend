import React from "react";
import { LogOut, FileText, CreditCard } from "lucide-react";
import { IoDownloadOutline } from "react-icons/io5";
import { VscArrowSwap } from "react-icons/vsc";
import img from "../assets/logo.png";

const Leftbar = () => {
  return (
    <div className="h-screen w-[12%] bg-white flex flex-col justify-between border-r border-gray-200">
      
      {/* Logo + Nav together */}
      <div>
        {/* Logo Section */}
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16">
            <img src={img} alt="EazyPayouts Logo" className="w-full h-full object-contain" />
          </div>
          <p className="font-bold text-lg mt-2 text-gray-800">EazyPayouts</p>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col text-gray-700 gap-3 px-4 mt-2">
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <IoDownloadOutline size={18} />
            <p>Loads</p>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FileText size={18} />
            <p>Statements</p>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <VscArrowSwap size={18} />
            <p>Transactions</p>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer px-4 py-4">
        <LogOut size={18} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Leftbar;
