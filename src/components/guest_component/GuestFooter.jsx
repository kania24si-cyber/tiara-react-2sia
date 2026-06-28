import React from "react";

export default function GuestFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-poppins text-base font-extrabold tracking-tight text-black">
              Beauty<span className="text-[#e11d48]">Bloom</span>
            </span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <p className="font-barlow text-xs font-medium text-abu">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          {/* Single Contact Line */}
          <div className="flex items-center gap-2 font-barlow text-xs font-medium text-abu">
            <span>Beauty Assistant:</span>
            <a 
              href="mailto:care@beautybloom.com" 
              className="font-poppins font-bold text-[#e11d48] hover:underline transition-colors duration-200"
            >
              care@beautybloom.com
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}