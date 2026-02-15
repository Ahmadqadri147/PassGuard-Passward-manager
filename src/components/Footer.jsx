import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-500 h-[10vh]  text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left Text */}
        <div className="text-sm leading-tight">
          <p className="text-cyan-200">All rights reserved © 2026</p>
                  <p>
                      <span className="text-pink-400">Created with ❤️ </span>

                <span className="text-purple-800">  Designed and Developed by{" "}</span>
            <span className="font-semibold text-amber-400">Ahmad Qadri</span>
          </p>
        </div>

        {/* Right Logo */}
         < div className='flex  gap-2 items-center'>
                <span className='text-green-700 text-3xl'>&lt;</span>
                <div>
                    <span className='font-bold text-4xl text-fuchsia-800'>Pass</span><span className='font-bold text-red-800 text-2xl'>Guard</span>
                </div>
                <span className='text-green-700 text-3xl'>/&gt;</span>
            </div>

      </div>
    </footer>
  );
};

export default Footer;
