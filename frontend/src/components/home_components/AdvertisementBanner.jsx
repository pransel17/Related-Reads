import React from 'react';

const AdvertisementBanner = () => {
  return (
    <div className="card w-72 h-150 bg-[#E9E9D4] shadow-xl border border-stone-400/20 p-6 ring-1 ring-black/10 rounded-2xl text-[#1A1A1A]">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <h2 className="text-lg font-bold uppercase text-center">
          Welcome to Related Reads!
        </h2>
        <p className="text-[12px] text-center mt-3 leading-tight px-2 opacity-90">
          Meet your favorite book, find your reading community, and manage your reading life.
        </p>

        {/* Illustration Card Section */}
        <div className="relative mt-6 w-full h-70 aspect-[4/5] bg-[#A7C7E7] rounded-[2rem] overflow-hidden flex flex-col items-center justify-between p-6">
          <div className="text-center">
            <h3 className="text-[#3E2723] font-black text-xl leading-none"> Related Reads</h3>
            <p className="text-[10px] font-bold uppercase tracking-tighter mt-1 opacity-70">Choice Award</p>
            <span className="text-3xl font-black text-[#3E2723]">2026</span>
          </div>


          <p className="text-sm font-bold text-center leading-tight text-[#3E2723] px-2">
            Announcing the Best Books of 2024
          </p>
        </div>

        {/* Footer Links Section */}
        <div className="mt-5 w-full">
          <h4 className="text-center font-bold text-[13px] tracking-widest uppercase mb-3">
            Work With Us
          </h4>
          <ul className="space-y-1 text-center text-sm opacity-80">
            <li className="cursor-pointer hover:underline">Authors</li>
            <li className="cursor-pointer hover:underline">Advertise</li>
            <li className="cursor-pointer hover:underline">Authors & Ads Blog</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;