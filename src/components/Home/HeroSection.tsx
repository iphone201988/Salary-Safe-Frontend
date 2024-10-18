import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="h-screen bg-[#1B1035] text-[#F5EDEF] flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-4">Ensure Fair Pay. Promote Equity.</h1>
      <p className="text-xl mb-8">Track and close salary gaps effortlessly with real-time insights and reporting tools.</p>
      <div className="flex space-x-4">
        <button className="bg-[#019529] text-white px-6 py-3 rounded-md hover:bg-[#017a22]">Request a Demo</button>
        <button className="border border-[#019529] text-[#019529] px-6 py-3 rounded-md hover:bg-[#019529] hover:text-white">Explore Features</button>
      </div>
    </section>
  );
};

export default HeroSection;
