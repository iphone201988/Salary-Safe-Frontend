import React from "react";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-[#1B1035] text-center text-[#F5EDEF]">
      <h2 className="text-3xl font-bold mb-6">Ready to Ensure Pay Equity?</h2>
      <Link
        to="/request-demo"
        className="bg-[#019529] text-white px-6 py-3 rounded-md hover:bg-[#017a22]"
      >
        Request a Demo
      </Link>
    </section>
  );
};

export default CallToAction;
